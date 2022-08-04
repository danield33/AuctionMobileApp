import {PORT} from "../../../constants/Ports";

export interface BuyerObj {
    name: string;
    id: string;
    description: string;
}

export class Buyer implements BuyerObj {

    name: string;
    id: string;
    description: string;

    constructor(organization: BuyerObj) {
        this.name = organization.name;
        this.id = organization.id;
        this.description = organization.description;
    }


    async getImage(): Promise<string | null> {
        return await fetch(PORT + "/images?id=" + this.id, {mode: "cors"}).then(async (res) => {
            return await res.json();
        });
    }

}
