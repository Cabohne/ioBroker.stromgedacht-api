
# ioBroker.stromgedacht

<img src="admin/stromgedacht.png" width="100" height="100">
    
Adapter für die StromGedacht API.  
Dieser Adapter nutzt öffentliche Daten, die von StromGedacht / TransnetBW GmbH [https://api.stromgedacht.de](https://api.stromgedacht.de) bereitgestellt werden.  
StromGedacht ist eine Marke der TransnetBW GmbH.  
Die Nutzung der API und mittels der API bereitgestellten Daten ist kostenfrei und nur zu privaten Zwecken ohne Gewinnerzielungsabsicht gestattet.  
Dieses Projekt steht in keiner offiziellen Verbindung zu TransnetBW und wird von TransnetBW nicht unterstützt.
Weitere Infos, siehe auch [stromgedacht.de](https://www.stromgedacht.de/)

## Adapter Features
- Aktueller Status des Stromnetzes
- verbleibende Zeit vom aktuellen Status
- Vorhersage Daten für den Status
- Konfigurierbare Dauer für die Vorhersage
- Konfigurierbares Intervall für Datenabfrage
- JSON Datenpunkt z.B. zur Darstellung in VIS

## Adapter Installation
1. iobroker GUI mit Expertenmodus aktiv
2. Adapter Installation "Installieren aus eigener URL" (Katze)
3. Benutzerdefiniert -> URL: https://github.com/Cabohne/iobroker.stromgedacht
4. Instanz hinzufügen
5. Instanz konfigurieren

## Instanz Konfiguration
1. Postleitzahl eintragen (die StromGedacht-API stellt für fast alle Postleitzahlgebiete in Baden-Württemberg Daten bereit)
2. Update Intervall zwischen 10 und 600 Minuten möglich.
3. Forecast-Stunden zwischen 1 und 48 Stunden möglich (API bedingt).

## Objekte
<details>
<summary>JSON Export der Objekte</summary>
 
```json
{
  "stromgedacht.0.current.color": {
    "type": "state",
    "common": {
      "name": "Color",
      "type": "string",
      "role": "text",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779085321425,
    "_id": "stromgedacht.0.current.color",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.current.from": {
    "type": "state",
    "common": {
      "name": "Current phase start",
      "type": "string",
      "role": "date",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779085321453,
    "_id": "stromgedacht.0.current.from",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.current.fromTimestamp": {
    "type": "state",
    "common": {
      "name": "From timestamp",
      "type": "number",
      "role": "value.time",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779085321433,
    "_id": "stromgedacht.0.current.fromTimestamp",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.current.remainingMinutes": {
    "type": "state",
    "common": {
      "name": "Remaining minutes",
      "type": "number",
      "role": "value.interval",
      "read": true,
      "write": false,
      "unit": "min"
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779085321466,
    "_id": "stromgedacht.0.current.remainingMinutes",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.current.state": {
    "type": "state",
    "common": {
      "name": "Current state",
      "type": "number",
      "role": "value",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779085321408,
    "_id": "stromgedacht.0.current.state",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.current.stateText": {
    "type": "state",
    "common": {
      "name": "State text",
      "type": "string",
      "role": "text",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779085321417,
    "_id": "stromgedacht.0.current.stateText",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.current.to": {
    "type": "state",
    "common": {
      "name": "Current phase end",
      "type": "string",
      "role": "date",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779085321460,
    "_id": "stromgedacht.0.current.to",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.current.toTimestamp": {
    "type": "state",
    "common": {
      "name": "To timestamp",
      "type": "number",
      "role": "value.time",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779085321443,
    "_id": "stromgedacht.0.current.toTimestamp",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.info.apiUrl": {
    "type": "state",
    "common": {
      "name": "Current API URL",
      "type": "string",
      "role": "text.url",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779085321387,
    "_id": "stromgedacht.0.info.apiUrl",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.info.forecastHours": {
    "type": "state",
    "common": {
      "name": "Configured forecast hours",
      "type": "number",
      "role": "info",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779085321375,
    "_id": "stromgedacht.0.info.forecastHours",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.info.timelineJson": {
    "type": "state",
    "common": {
      "name": "Timeline JSON",
      "type": "string",
      "role": "json",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779085321398,
    "_id": "stromgedacht.0.info.timelineJson",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.info.zip": {
    "type": "state",
    "common": {
      "name": "Configured ZIP code",
      "type": "string",
      "role": "info",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779085321350,
    "_id": "stromgedacht.0.info.zip",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.0.color": {
    "type": "state",
    "common": {
      "name": "Color",
      "type": "string",
      "role": "text",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822589,
    "_id": "stromgedacht.0.phases.0.color",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.0.from": {
    "type": "state",
    "common": {
      "name": "From",
      "type": "string",
      "role": "date",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822603,
    "_id": "stromgedacht.0.phases.0.from",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.0.fromTimestamp": {
    "type": "state",
    "common": {
      "name": "From timestamp",
      "type": "number",
      "role": "value.time",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822593,
    "_id": "stromgedacht.0.phases.0.fromTimestamp",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.0.state": {
    "type": "state",
    "common": {
      "name": "State",
      "type": "number",
      "role": "value",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822580,
    "_id": "stromgedacht.0.phases.0.state",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.0.stateText": {
    "type": "state",
    "common": {
      "name": "State text",
      "type": "string",
      "role": "text",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822584,
    "_id": "stromgedacht.0.phases.0.stateText",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.0.to": {
    "type": "state",
    "common": {
      "name": "To",
      "type": "string",
      "role": "date",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822608,
    "_id": "stromgedacht.0.phases.0.to",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.0.toTimestamp": {
    "type": "state",
    "common": {
      "name": "To timestamp",
      "type": "number",
      "role": "value.time",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822598,
    "_id": "stromgedacht.0.phases.0.toTimestamp",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.1.color": {
    "type": "state",
    "common": {
      "name": "Color",
      "type": "string",
      "role": "text",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822681,
    "_id": "stromgedacht.0.phases.1.color",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.1.from": {
    "type": "state",
    "common": {
      "name": "From",
      "type": "string",
      "role": "date",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822696,
    "_id": "stromgedacht.0.phases.1.from",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.1.fromTimestamp": {
    "type": "state",
    "common": {
      "name": "From timestamp",
      "type": "number",
      "role": "value.time",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822685,
    "_id": "stromgedacht.0.phases.1.fromTimestamp",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.1.state": {
    "type": "state",
    "common": {
      "name": "State",
      "type": "number",
      "role": "value",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822671,
    "_id": "stromgedacht.0.phases.1.state",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.1.stateText": {
    "type": "state",
    "common": {
      "name": "State text",
      "type": "string",
      "role": "text",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822676,
    "_id": "stromgedacht.0.phases.1.stateText",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.1.to": {
    "type": "state",
    "common": {
      "name": "To",
      "type": "string",
      "role": "date",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822700,
    "_id": "stromgedacht.0.phases.1.to",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.1.toTimestamp": {
    "type": "state",
    "common": {
      "name": "To timestamp",
      "type": "number",
      "role": "value.time",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822691,
    "_id": "stromgedacht.0.phases.1.toTimestamp",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.2.color": {
    "type": "state",
    "common": {
      "name": "Color",
      "type": "string",
      "role": "text",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822741,
    "_id": "stromgedacht.0.phases.2.color",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.2.from": {
    "type": "state",
    "common": {
      "name": "From",
      "type": "string",
      "role": "date",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822759,
    "_id": "stromgedacht.0.phases.2.from",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.2.fromTimestamp": {
    "type": "state",
    "common": {
      "name": "From timestamp",
      "type": "number",
      "role": "value.time",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822746,
    "_id": "stromgedacht.0.phases.2.fromTimestamp",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.2.state": {
    "type": "state",
    "common": {
      "name": "State",
      "type": "number",
      "role": "value",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822729,
    "_id": "stromgedacht.0.phases.2.state",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.2.stateText": {
    "type": "state",
    "common": {
      "name": "State text",
      "type": "string",
      "role": "text",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822736,
    "_id": "stromgedacht.0.phases.2.stateText",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.2.to": {
    "type": "state",
    "common": {
      "name": "To",
      "type": "string",
      "role": "date",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822767,
    "_id": "stromgedacht.0.phases.2.to",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.0.phases.2.toTimestamp": {
    "type": "state",
    "common": {
      "name": "To timestamp",
      "type": "number",
      "role": "value.time",
      "read": true,
      "write": false
    },
    "native": {},
    "from": "system.adapter.stromgedacht.0",
    "user": "system.user.admin",
    "ts": 1779261822751,
    "_id": "stromgedacht.0.phases.2.toTimestamp",
    "acl": {
      "object": 1636,
      "state": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  },
  "stromgedacht.admin": {
    "type": "meta",
    "common": {
      "name": "admin",
      "type": "admin"
    },
    "from": "system.host.dahoim.cli",
    "ts": 1778700018469,
    "native": {},
    "_id": "stromgedacht.admin",
    "acl": {
      "object": 1636,
      "owner": "system.user.admin",
      "ownerGroup": "system.group.administrator"
    }
  }
}
```
</details>
<details>
<summary>Screenshot der Objekte</summary>
    <img src="admin/ScreenshotObjects.png">
</details>

## Vis Beispiel
<img src="admin/VisExample.png">

## Version
0.2.0
