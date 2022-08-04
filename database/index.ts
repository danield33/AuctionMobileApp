import {Buyers} from "./modules/organizations";
import {OrganizationObj} from "./modules/organizations/Organization";
import {PORT} from "../constants/Ports";

const io = require("socket.io-client");

class Auction {

    readonly socket;
    organizations?: Buyers;

    constructor() {
        this.socket = io("ws://" + PORT.substring(8));
    }

    private _isInitialized: boolean = false;

    get isInitialized(): boolean {
        return this._isInitialized;
    }

    init(data: { participants: { [index: string]: OrganizationObj } }) {
        this.organizations = new Buyers(data.participants);
        this._isInitialized = true;
    }
}

export const db = new Auction();
