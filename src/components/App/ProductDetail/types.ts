import { Params } from "react-router-dom"
import { ICartProduct, IProduct } from "../../../types"

export interface ProductDetailProps {
    params: Params<string>,
    handleAddToCart:(params: ICartProduct ) => void,
    currency: string
  }
  
export interface ProductDetailStates {
    product: IProduct,
     isLoading: boolean
  }
  