import {Buyer, BuyerObj} from "./Buyer";
import {DatabaseReference, getDatabase, ref} from "firebase/database";

export class Buyers {

    readonly orgs = new Map<string, Buyer>();
    static readonly ref = ref(getDatabase(), 'buyers')

    constructor(orgs: { [index: string]: BuyerObj }) {
        this.orgs = this.convert(orgs);
    }

    private _winners: string[] = [];

    get winners(): string[] {
        return this._winners;
    }

    set winners(value: string[]) {
        this._winners = value;
    }

    create(){

    }

    convert(orgObj: { [id: string]: BuyerObj }): Map<string, Buyer> {
        const entries: Array<any> = Object.entries(orgObj)
            .map(i => [i[0], new Buyer(i[1])]);
        return new Map(entries);
    }

}
