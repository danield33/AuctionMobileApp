import {Organizations} from "./modules/organizations";
import {OrganizationObj} from "./modules/organizations/Organization";
import {PORT} from "../constants/Ports";

const io = require("socket.io-client");

class Auction {

    readonly socket;
    organizations?: Organizations;

    constructor() {
        this.socket = io("ws://"+ PORT.substring(7));
    }

    private _isInitialized: boolean = false;

    get isInitialized(): boolean {
        return this._isInitialized;
    }

    init(data: { participants: { [index: string]: OrganizationObj } }) {
        this.organizations = new Organizations(data.participants);
        this._isInitialized = true;
    }
}

export const db = new Auction();
