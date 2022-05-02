import { ICartProduct } from "../../../../types";

export interface ShoppingCartProps {
    cartProducts: ICartProduct[],
     currency: string,
     handleUpdateCart: (params: {id: string, option: 'add' | 'remove'}) => void;
}
  