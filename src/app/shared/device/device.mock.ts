import { ServerDevice } from "./device.model";

const MOCK_NAMES = [
    "Johnny",
    "Jimmy",
    "Jenny",
    "Justin",
    "P-Hizzy",
    "J-Drizzy"
];

export function generateMockDevices(count: number): ServerDevice[] {
    const generatedObjects = [];

    let obj: ServerDevice;
    for (let i = 0; i < count; i++) {
        obj = {
            id: "" + i,
            name: selectRandom(MOCK_NAMES),
            description: "Device description",
            homeId: "0",
            deviceDefinitionId: "0"
        };
        generatedObjects.push(obj);
    }

    return generatedObjects;
}

function selectRandom(arr: any[]): any {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}
