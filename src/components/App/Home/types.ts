import { Params } from "react-router-dom";
import { ICartProduct, IProduct } from "../../../types";

export interface HomeProps {
    category: string,
    currency: string,
    cartProducts: ICartProduct[],
    handleAddToCart: (props: ICartProduct) => void,
    params: Params<string>
  }
  
export interface HomeStates {
    productsLoading: boolean  , 
    products : IProduct[],
    showToast: boolean,
    category: string,
  }