import {useContext} from "react";
import {BuyerInfoContext} from "../contexts/BuyerInfoContext";

export function useBuyerHook(){
    return useContext(BuyerInfoContext);
}
