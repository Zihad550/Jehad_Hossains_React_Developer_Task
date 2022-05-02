import { NavigateFunction } from "react-router-dom";
import { Currency, ICartProduct } from "../../../types";

export interface HeaderProps {
    handleCategory: (name: string) => void,
    navigate: NavigateFunction,
    handleCurrency: (e: string) => void,
    cartProducts: ICartProduct[],
    currency: string,
    handleUpdateCart: (params: {id: string, option: 'add' | 'remove'}) => void;
}
  
export interface HeaderStates {
    currencies: Currency[],
    loading: boolean,
    showCart: boolean
  }