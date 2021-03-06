import {Organization, OrganizationObj} from "./Organization";

export class Organizations {

    readonly orgs = new Map<string, Organization>();

    constructor(orgs: { [index: string]: OrganizationObj }) {
        this.orgs = this.convert(orgs as unknown as { [id: string]: typeof Organization.prototype });
    }

    private _winners: string[] = [];

    get winners(): string[] {
        return this._winners;
    }

    set winners(value: string[]) {
        this._winners = value;
    }

    convert(orgObj: { [id: string]: OrganizationObj }): Map<string, Organization> {
        const entries: Array<any> = Object.entries(orgObj)
            .map(i => [i[0], new Organization(i[1])]);
        return new Map(entries);
    }

}
