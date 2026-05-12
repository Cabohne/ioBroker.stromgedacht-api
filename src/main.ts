
import * as utils from "@iobroker/adapter-core";
import axios from "axios";

class StromGedacht extends utils.Adapter {
    private interval: any;

    constructor(options: Partial<utils.AdapterOptions> = {}) {
        super({ ...options, name: "stromgedacht" });
        this.on("ready", this.onReady.bind(this));
        this.on("unload", this.onUnload.bind(this));
    }

    async onReady() {
        await this.createStates();
        await this.updateData();

        const interval = ((this.config as any).updateInterval || 5) * 60 * 1000;
        this.interval = setInterval(() => this.updateData(), interval);
    }

    async createStates() {
        await this.setObjectNotExistsAsync("current.level",{type:"state",common:{name:"Level",type:"number",role:"indicator",read:true,write:false},native:{}});
        await this.setObjectNotExistsAsync("current.name",{type:"state",common:{name:"Name",type:"string",role:"text",read:true,write:false},native:{}});
        await this.setObjectNotExistsAsync("current.text",{type:"state",common:{name:"Text",type:"string",role:"text",read:true,write:false},native:{}});
    }

    async updateData() {
        try {
            const res = await axios.get(
                "https://api.stromgedacht.de/v1/now?zip=70173",
                {
                    headers: {
                        accept: "application/json"
                    }
                }
            );
            const data = res.data;

            await this.setStateAsync("current.level", data.state, true);

            let stateName = "unknown";
            
            switch (data.state) {
                case -1:
                    stateName = "supergreen";
                    break;
                case 1:
                    stateName = "green";
                    break;
                case 3:
                    stateName = "orange";
                    break;
                case 4:
                    stateName = "red";
                    break;
            }
            
            await this.setStateAsync("current.name", stateName, true);
            await this.setStateAsync("current.text", `Current state is ${stateName}`, true);

            if (data.forecast) {
                for (let i=0;i<Math.min(data.forecast.length, (this.config as any).forecastHours || 24);i++){
                    const f = data.forecast[i];
                    const base = `forecast.${i}`;

                    await this.setObjectNotExistsAsync(base+".level",{type:"state",common:{name:"Level",type:"number",role:"value",read:true,write:false},native:{}});
                    await this.setObjectNotExistsAsync(base+".from",{type:"state",common:{name:"From",type:"string",role:"date",read:true,write:false},native:{}});
                    await this.setObjectNotExistsAsync(base+".to",{type:"state",common:{name:"To",type:"string",role:"date",read:true,write:false},native:{}});

                    await this.setStateAsync(base+".level", f.level, true);
                    await this.setStateAsync(base+".from", f.from, true);
                    await this.setStateAsync(base+".to", f.to, true);
                }
            }

        } catch (e) {
            this.log.error("API error: " + e);
        }
    }

    onUnload(callback: () => void) {
        if (this.interval) clearInterval(this.interval);
        callback();
    }
}

if (module.parent) {
    module.exports = (options: Partial<utils.AdapterOptions>) => new StromGedacht(options);
} else {
    new StromGedacht();
}
