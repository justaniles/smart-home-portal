namespace PcPortal.Diagnostics {
    const DiagnosticsStrings = PcPortal.Resources.Strings.Internal.Diagnostics;
    
    export enum LogType {
        Info,
        Warn,
        Error
    };

    /**
     * Logs an error to the browser's console window
     * @param logType The log type of this message
     * @param context Information about from where this error is originating
     * @param message The error message
     * @param additionalInfo Additional objects to log. If more than 1 object is provided, the objects
     * are logged in an array.
     */
    export function Log(logType: LogType, context: string, message: string, ...additionalInfo: any[]): void {
        const timestamp = new Date(Date.now());
        const additionalText = `\n ${DiagnosticsStrings.AdditionalInfo} %O`;

        let textToPrint = `[${context}] ${timestamp.toString()} ${message}`;
        let additionalObject: any = null;

        if (additionalInfo) {
            textToPrint += additionalText;
            additionalObject = additionalInfo.length === 1 ? additionalInfo[0] : additionalInfo;
        }

        if (logType === LogType.Info) {
            console.log.call(this, textToPrint, additionalObject);
        } else if (logType === LogType.Warn) {
            console.warn.call(this, textToPrint, additionalObject);
        } else if (logType === LogType.Error) {
            console.error.call(this, textToPrint, additionalObject);
        } else {
            console.warn(DiagnosticsStrings.InvalidLogType);
            console.log.call(this, textToPrint, additionalObject);
        }
    }
}
