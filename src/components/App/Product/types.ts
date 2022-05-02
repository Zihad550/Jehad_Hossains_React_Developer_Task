import { NavigateFunction } from "react-router-dom";
import { ICartProduct, IProduct } from "../../../types";

export interface ProductProps {
    product: IProduct,
     handleAddToCart: ({}: ICartProduct) => void,
      currency: string ,
      navigate: NavigateFunction
  }
  