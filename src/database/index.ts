import {Buyers} from "./modules/organizations";
import {OrganizationObj} from "./modules/organizations/Organization";
import {PORT} from "../constants/Ports";

const io = require("socket.io-client");

class Auction {

    buyers?: Buyers;

    constructor() {
        this.socket = io("ws://" + PORT.substring(8));
    }

    private _isInitialized: boolean = false;

    init(data: { participants: { [index: string]: OrganizationObj } }) {
        this.buyers = new Buyers(data.participants);
        this._isInitialized = true;
    }
}

export const db = new Auction();
