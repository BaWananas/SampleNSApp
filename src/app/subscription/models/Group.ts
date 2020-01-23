export class Group {

    id: number;
    assoId: number;
    name: string;
    description: string;

    constructor(assoId: number, name: string, description: string, id: number = null) {
        this.assoId = assoId;
        this.name = name;
        this.description = description;
        this.id = id;
    }
}
