import React, {createContext, useEffect, useState} from 'react';
import {View} from "../components/Themed";
import {onValue} from 'firebase/database'
import {Buyers} from "../database/modules/organizations";
import {BuyerObj} from "../database/modules/organizations/Buyer";

export type BuyersList = { [index: string]: BuyerObj }

interface BuyerState {
    buyers: BuyersList
}

export const BuyerInfoContext = createContext<BuyerState>({} as BuyerState);


export function BuyerInfoContextProvider({children}: { children: React.ReactNode }) {

    const [buyers, setBuyers] = useState<BuyersList>();

    useEffect(() => {
        return onValue(Buyers.ref, (snap) => {
            setBuyers(snap.val());
        });
    }, []);


    return (
        children
    );
}

