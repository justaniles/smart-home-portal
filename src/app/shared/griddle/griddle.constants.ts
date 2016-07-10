/**
 * Export the RequestMethod enum so that external classes can easily import it
 */
export { RequestMethod } from "@angular/http";

export class GriddleConstants {

    public static ApiUrls = {
        Get: {
            Test: "test",
            Device: "device/{home}",
            DeviceDefinitions: "device/definitions"
        },
        Post: {
            Device: "device"
        },
        Put: {
            ExecuteDeviceFunction: "device/exec/{device}/{func}"
        }
    };

    public static BaseUrl = "http://hh-svcfe.azurewebsites.net/";

}
