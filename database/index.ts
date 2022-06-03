import { Organizations } from "./modules/organizations";
import {OrganizationObj} from "./modules/organizations/Organization";

const io = require("socket.io-client");

class Auction {

    readonly socket;
    organizations?: Organizations;
    private _isInitialized: boolean = false;

    constructor() {
        this.socket = io("ws://localhost:8080");
    }

    init(data: {participants: {[index: string] : OrganizationObj}}) {
        this.organizations = new Organizations(data.participants);
        this._isInitialized = true;
    }


    get isInitialized(): boolean {
        return this._isInitialized;
    }
}

export const db = new Auction();
