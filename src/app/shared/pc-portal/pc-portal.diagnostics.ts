import { PcResources } from "./pc-portal.resources";

export module PcDiagnostics {
    const DiagnosticsStrings = PcResources.Strings.Internal.Diagnostics;

    export enum LogType {
        Info,
        Warn,
        Error
    };

    /**
     * Logs a message to the browser's console window
     * @param logType The log type of this message
     * @param context Information about from where this error is originating
     * @param message The error message
     * @param additionalInfo Additional objects to log. If more than 1 object is provided, the objects
     * are logged in an array.
     */
    export function Log(logType: LogType, context: string, message: string, ...additionalInfo: any[]): void {
        const timestamp = new Date(Date.now());
        const baseText = `%c[${context}] ${timestamp.toLocaleTimeString()} - ${message}`;
        const additionalText = `\n ${DiagnosticsStrings.AdditionalInfo} %O`;
        const textFormatting = "line-height: 16px";

        let textToPrint = baseText;
        let additionalObject: any = null;

        if (additionalInfo) {
            textToPrint += additionalText;
            additionalObject = additionalInfo.length === 1 ? additionalInfo[0] : additionalInfo;
        }

        if (logType === LogType.Info) {
            console.log.call(console, textToPrint, textFormatting, additionalObject);
        } else if (logType === LogType.Warn) {
            console.warn.call(console, textToPrint, textFormatting, additionalObject);
        } else if (logType === LogType.Error) {
            console.error.call(console, textToPrint, textFormatting, additionalObject);
        } else {
            console.warn(DiagnosticsStrings.InvalidLogType.format(logType));
            console.log.call(console, textToPrint, textFormatting, additionalObject);
        }
    }
}
