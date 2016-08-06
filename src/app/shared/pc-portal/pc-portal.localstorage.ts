import ls = require("local-storage");
import { PcDiagnostics } from "./pc-portal.diagnostics";

export module PcLocalStorage {

    export function set(key: string, value: any) {
        const success = ls.set(key, value);
        if (!success) {
            PcDiagnostics.Log(
                PcDiagnostics.LogType.Error,
                "PcLocalStorage.set",
                "Unable to set a value in local storage. This could possibly be due to a QuotaExceededError being thrown."
            );
        }
    }

    export function get(key: string): any {
        return ls.get(key);
    }

}
