
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
        await this.setStateAsync(
            "info.zip",
            (this.config as any).zip || "70173",
            true
        );
        await this.updateData();

        const interval = ((this.config as any).updateInterval || 5) * 60 * 1000;
        this.interval = setInterval(() => this.updateData(), interval);
    }

    async cleanupOldForecast() {

            try {
        
                const objects = await this.getForeignObjectsAsync(
                    `${this.namespace}.forecast.*`
                );
        
                for (const id of Object.keys(objects)) {
        
                    await this.delObjectAsync(
                        id.replace(`${this.namespace}.`, ""),
                        { recursive: true }
                    );
                }
        
                await this.delObjectAsync("current.level");
                await this.delObjectAsync("current.text");
        
            } catch (e) {
        
                this.log.warn("Could not cleanup old forecast objects: " + e);
            }
        }
    
    async createStates() {
        await this.setObjectNotExistsAsync("info.zip",{type:"state",common:{name:"Configured ZIP code",type:"string",role:"info",read: true,write: false},native:{}});

        await this.setObjectNotExistsAsync("info.forecastHours", {
            type: "state",
            common: {
                name: "Configured forecast hours",
                type: "number",
                role: "info",
                read: true,
                write: false
            },
            native: {}
        });
        
        await this.setObjectNotExistsAsync("info.apiUrl", {
            type: "state",
            common: {
                name: "Current API URL",
                type: "string",
                role: "text.url",
                read: true,
                write: false
            },
            native: {}
        });
        
        await this.setObjectNotExistsAsync("current.state", {
            type: "state",
            common: {
                name: "Current state",
                type: "number",
                role: "value",
                read: true,
                write: false
            },
            native: {}
        });
        
        await this.setObjectNotExistsAsync("current.name", {
            type: "state",
            common: {
                name: "Current state name",
                type: "string",
                role: "text",
                read: true,
                write: false
            },
            native: {}
        });
        
        await this.setObjectNotExistsAsync("current.from", {
            type: "state",
            common: {
                name: "Current phase start",
                type: "string",
                role: "date",
                read: true,
                write: false
            },
            native: {}
        });
        
        await this.setObjectNotExistsAsync("current.to", {
            type: "state",
            common: {
                name: "Current phase end",
                type: "string",
                role: "date",
                read: true,
                write: false
            },
            native: {}
        });
        
        await this.setObjectNotExistsAsync("current.remainingMinutes", {
            type: "state",
            common: {
                name: "Remaining minutes",
                type: "number",
                role: "value.interval",
                read: true,
                write: false,
                unit: "min"
            },
            native: {}
        });
    }

    async updateData() {
         try {
        
                const zip = (this.config as any).zip || "70173";
                const hours = (this.config as any).forecastHours || 24;
        
                const apiUrl =
                    `https://api.stromgedacht.de/v1/statesRelative?zip=${zip}&hoursInFuture=${hours}&hoursInPast=0`;
        
                await this.setStateAsync("info.zip", zip, true);
                await this.setStateAsync("info.forecastHours", hours, true);
                await this.setStateAsync("info.apiUrl", apiUrl, true);
        
                const res = await axios.get(apiUrl, {
                    headers: {
                        accept: "application/json"
                    }
                });
        
                const phases = res.data;
                const now = new Date();
        
                for (let i = 0; i < phases.length; i++) {
        
                    const item = phases[i];
                    const base = `phases.${i}`;
        
                    await this.setObjectNotExistsAsync(base + ".state", {
                        type: "state",
                        common: {
                            name: "State",
                            type: "number",
                            role: "value",
                            read: true,
                            write: false
                        },
                        native: {}
                    });
        
                    await this.setObjectNotExistsAsync(base + ".name", {
                        type: "state",
                        common: {
                            name: "State name",
                            type: "string",
                            role: "text",
                            read: true,
                            write: false
                        },
                        native: {}
                    });
        
                    await this.setObjectNotExistsAsync(base + ".from", {
                        type: "state",
                        common: {
                            name: "From",
                            type: "string",
                            role: "date",
                            read: true,
                            write: false
                        },
                        native: {}
                    });
        
                    await this.setObjectNotExistsAsync(base + ".to", {
                        type: "state",
                        common: {
                            name: "To",
                            type: "string",
                            role: "date",
                            read: true,
                            write: false
                        },
                        native: {}
                    });
        
                    let stateName = "unknown";
        
                    switch (item.state) {
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
        
                    await this.setStateAsync(base + ".state", item.state, true);
                    await this.setStateAsync(base + ".name", stateName, true);
                    await this.setStateAsync(base + ".from", item.from, true);
                    await this.setStateAsync(base + ".to", item.to, true);
        
                    const from = new Date(item.from);
                    const to = new Date(item.to);
        
                    if (now >= from && now < to) {
        
                        const remainingMinutes =
                            Math.round((to.getTime() - now.getTime()) / 60000);
        
                        await this.setStateAsync("current.state", item.state, true);
                        await this.setStateAsync("current.name", stateName, true);
                        await this.setStateAsync("current.from", item.from, true);
                        await this.setStateAsync("current.to", item.to, true);
                        await this.setStateAsync(
                            "current.remainingMinutes",
                            remainingMinutes,
                            true
                        );
                    }
                }
        
            } 
             catch (e) {
        
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
