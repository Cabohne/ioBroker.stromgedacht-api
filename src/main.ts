
import * as utils from "@iobroker/adapter-core";
import axios from "axios";

class StromGedacht extends utils.Adapter {
    private interval: any;

    constructor(options: Partial<utils.AdapterOptions> = {}) {
        super({ ...options, name: "stromgedacht-api" });
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

    async cleanupPhases() {
    
        try {
    
            const objects = await this.getForeignObjectsAsync(
                `${this.namespace}.phases.*`
            );
    
            for (const id of Object.keys(objects)) {
    
                await this.delObjectAsync(
                    id.replace(`${this.namespace}.`, ""),
                    { recursive: true }
                );
            }
    
        } catch (e) {
    
            this.log.warn("Could not cleanup phases: " + e);
        }
    }    
    
    async ) {
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

        await this.setObjectNotExistsAsync("info.timelineJson", {
            type: "state",
            common: {
                name: "Timeline JSON",
                type: "string",
                role: "json",
                read: true,
                write: false
            },
            native: {}
        });

        await this.setObjectNotExistsAsync("info.phasesCounter", {
            type: "state",
            common: {
                name: "Number of forecast phases",
                type: "number",
                role: "value",
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
        
        await this.setObjectNotExistsAsync("current.stateText", {
            type: "state",
            common: {
                name: "State text",
                type: "string",
                role: "text",
                read: true,
                write: false
            },
            native: {}
        });
        
        await this.setObjectNotExistsAsync("current.color", {
            type: "state",
            common: {
                name: "Color",
                type: "string",
                role: "text",
                read: true,
                write: false
            },
            native: {}
        });
        
        await this.setObjectNotExistsAsync("current.fromTimestamp", {
            type: "state",
            common: {
                name: "From timestamp",
                type: "number",
                role: "value.time",
                read: true,
                write: false
            },
            native: {}
        });
        
        await this.setObjectNotExistsAsync("current.toTimestamp", {
            type: "state",
            common: {
                name: "To timestamp",
                type: "number",
                role: "value.time",
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
    
    private formatDateGerman(date: Date): string {
    
        const weekdays = [
            "Sonntag",
            "Montag",
            "Dienstag",
            "Mittwoch",
            "Donnerstag",
            "Freitag",
            "Samstag"
        ];
    
        const weekday = weekdays[date.getDay()];
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");
    
        return `${weekday}, ${day}.${month}., ${hour}:${minute} Uhr`;
    }
    
    async updateData() {
         try {
             await this.cleanupPhases();
        
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
        
                const phases = res.data.states;

                 await this.setStateAsync(
                    "info.phasesCounter",
                    phases.length,
                    true
                 );
             
                const now = new Date();

                const timeline: any[] = [];
        
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

                    await this.setObjectNotExistsAsync(base + ".stateText", {
                        type: "state",
                        common: {
                            name: "State text",
                            type: "string",
                            role: "text",
                            read: true,
                            write: false
                        },
                        native: {}
                    });
                    
                    await this.setObjectNotExistsAsync(base + ".color", {
                        type: "state",
                        common: {
                            name: "Color",
                            type: "string",
                            role: "text",
                            read: true,
                            write: false
                        },
                        native: {}
                    });
                    
                    await this.setObjectNotExistsAsync(base + ".fromTimestamp", {
                        type: "state",
                        common: {
                            name: "From timestamp",
                            type: "number",
                            role: "value.time",
                            read: true,
                            write: false
                        },
                        native: {}
                    });
                    
                    await this.setObjectNotExistsAsync(base + ".toTimestamp", {
                        type: "state",
                        common: {
                            name: "To timestamp",
                            type: "number",
                            role: "value.time",
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
        
                    let stateText = "unbekannt";
                    let color = "#9e9e9e";
        
                    switch (item.state) {

                            case -1:
                                stateText = "supergrün";
                                color = "#00c853";
                                break;
                        
                            case 1:
                                stateText = "grün";
                                color = "#64dd17";
                                break;
                        
                            case 3:
                                stateText = "orange";
                                color = "#ff9800";
                                break;
                        
                            case 4:
                                stateText = "rot";
                                color = "#d50000";
                                break;
                    }

                    const fromString = item.from.replace(
                        /(\.\d{3})\d+/,
                        "$1"
                    );
                    
                    const toString = item.to.replace(
                        /(\.\d{3})\d+/,
                        "$1"
                    );
                    
                    const from = new Date(fromString);
                    const to = new Date(toString);
                    
                    await this.setStateAsync(base + ".state", item.state, true);
                    await this.setStateAsync(base + ".stateText", stateText, true);
                    await this.setStateAsync(base + ".color", color, true);
                    await this.setStateAsync(base + ".from", this.formatDateGerman(from), true);
                    await this.setStateAsync(base + ".to", this.formatDateGerman(to), true);                    
                    await this.setStateAsync(base + ".fromTimestamp", from.getTime(), true);
                    await this.setStateAsync(base + ".toTimestamp", to.getTime(), true);
                    
                    timeline.push({
                        from: from.getTime(),
                        to: to.getTime(),
                        state: item.state,
                        stateText: stateText,
                        color: color
                    });
        
                    if (now >= from && now < to) {
        
                        const remainingMinutes =
                            Math.round((to.getTime() - now.getTime()) / 60000);
        
                        await this.setStateAsync("current.state", item.state, true);
                        await this.setStateAsync("current.stateText", stateText, true);
                        await this.setStateAsync("current.color", color, true);
                        await this.setStateAsync("current.fromTimestamp", from.getTime(), true);
                        await this.setStateAsync("current.toTimestamp", to.getTime(), true);
                        await this.setStateAsync("current.from", this.formatDateGerman(from), true);
                        await this.setStateAsync("current.to", this.formatDateGerman(to), true);
                        await this.setStateAsync("current.remainingMinutes", remainingMinutes, true);
                    }
                }
                await this.setStateAsync(
                    "info.timelineJson",
                    JSON.stringify(timeline),
                    true
                );
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
