import {Buyers} from "./modules/organizations";
import {BuyerObj} from "./modules/organizations/Buyer";
import {PORT} from "../constants/Ports";

const io = require("socket.io-client");

class Auction {

    buyers?: Buyers;

    private _isInitialized: boolean = false;

    init(data: { participants: { [index: string]: BuyerObj } }) {
        this.buyers = new Buyers(data.participants);
        this._isInitialized = true;
    }
}

export const db = new Auction();
