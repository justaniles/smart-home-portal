export class Home {
    constructor(private _id: string, private _name: string, private _dateCreated: Date) {
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get dateCreated(): Date {
        return this._dateCreated;
    }

    static fromObject(obj: any): Home {
        return new Home(obj.id, obj.name, obj.dateCreated);
    }
}
