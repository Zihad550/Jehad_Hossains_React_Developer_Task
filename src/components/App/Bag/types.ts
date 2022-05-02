import { ICartProduct } from "../../../types";

export interface BagProps {
    cartProducts: ICartProduct[],
    handleAddToCart: (params: ICartProduct) => void,
    handleUpdateCart: (params: {id: string, option: 'add' | 'remove'}) => void,
  }
  