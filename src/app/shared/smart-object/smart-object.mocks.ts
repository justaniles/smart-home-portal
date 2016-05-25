import { SmartObject } from "./smart-object.interfaces.ts";

const MOCK_TYPES = [
    "Lightbulb",
    "Smart outlet",
    "Nest",
    "Smart lock"
];

const MOCK_NAMES = [
    "Johnny",
    "Jimmy",
    "Jenny",
    "Justin",
    "P-Hizzy",
    "J-Drizzy"
];

const MOCK_FUNCTIONS = [
    "On",
    "Off",
    "SetColor",
    "SetTemperature",
    "SetHairColor"
];

export function generateMockSmartObjects(count: number): SmartObject[] {
    const generatedObjects = [];

    let obj: SmartObject;
    for (let i = 0; i < count; i++) {
        obj = {
            id: "" + i,
            name: selectRandom(MOCK_NAMES),
            type: selectRandom(MOCK_TYPES),
            supportedFunctions: [selectRandom(MOCK_FUNCTIONS), selectRandom(MOCK_FUNCTIONS)]
        };
        generatedObjects.push(obj);
    }

    return generatedObjects;
}

function selectRandom(arr: any[]): any {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}
