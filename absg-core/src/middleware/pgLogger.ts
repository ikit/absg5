import * as Transport from "winston-transport";
import { getRepository } from "typeorm";
import { LogSystem, LogSeverity } from "../entities";
import { websocketService, WSMessageType } from "../services/WebsocketService";

export class PgLogger extends Transport {
    constructor(opts) {
        super(opts);
    }

    log(info, callback) {
        setImmediate(() => {
            this.emit("logged", info);
        });
        if (info.level != "debug" && info.metadata.module) {
            // On enregistre l'entrée en base de donnée
            const logRepo = getRepository(LogSystem);
            const log = new LogSystem();
            log.message = info.message;
            log.datetime = info.timestamp;
            log.severity = info.level;
            if (Object.keys(info.metadata).length !== 0) {
                log.module = info.metadata.module;
                log.userId = info.metadata.userId ? info.metadata.userId : null;
                log.data = info.metadata.data;
            }

            logRepo.save(log);

            if (info.level === LogSeverity.notice) {
                websocketService.broadcast({
                    message: WSMessageType.notification,
                    payload: log
                });
            }
        }
        callback();
    }
}
