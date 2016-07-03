namespace PcPortal.Utils {
    /**
     * Returns the value passed in if the value passed is truthy. If the value is falsey, returns the defaultValue.
     * @param value Value to check
     * @param defaultValue Default value to return if value is falsey
     * @returns {any} Value if truthy, defaultValue otherwise
     */
    export function getValueOrDefault(value: any, defaultValue: any) {
        return value ? value : defaultValue;
    }
}
