export interface HomeContract {
    id: string;
    name: string;
    dateCreated: Date | string;
}

export class Home implements HomeContract {
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

    toJSON(): HomeContract {
        const convertedToObject: HomeContract = {
            id: this.id,
            name: this.name,
            dateCreated: this.dateCreated.toISOString()
        };
        return convertedToObject;
    }

    static fromObject(obj: HomeContract): Home {
        let parsedDate: Date;
        if (obj.dateCreated instanceof Date) {
            parsedDate = <Date>obj.dateCreated;
        } else if (typeof obj.dateCreated === "string") {
            parsedDate = new Date(<string>obj.dateCreated);
        }
        return new Home(obj.id, obj.name, parsedDate);
    }
}
