/**
 * Export the RequestMethod enum so that external classes can easily import it
 */
export { RequestMethod } from "@angular/http";

export module GriddleConstants {

    export const ApiUrls = {
        Get: {
            Device: "device/{home}",
            DeviceDefinitions: "device/definitions",
            Homes: "homes",
            Test: "test"
        },
        Post: {
            CreateHome: "homes",
            CreateUser: "auth/create-home",
            Device: "device",
            LoginUser: "auth/login"
        },
        Put: {
            ExecuteDeviceFunction: "device/exec/{device}/{func}"
        }
    };

    export const BaseUrl = "http://hh-svcfe.azurewebsites.net/";

    export module ResponseObjects {
        export interface LoginUserResponse {
            /**
             * The authentication token for the user.
             */
            Token: string;

            /**
             * The list of claims for the user.
             */
            Claims: string[];
        }
    }

    export const ResponseStatus = {
        Unauthorized: 401
    };
}
