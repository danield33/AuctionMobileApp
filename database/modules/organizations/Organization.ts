import {PORT} from "../../../constants/Ports";

export interface OrganizationObj {
    name: string;
    id: string;
    description: string;
}

export class Organization implements OrganizationObj {

    name: string;
    id: string;
    description: string;

    constructor(organization: OrganizationObj) {
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
