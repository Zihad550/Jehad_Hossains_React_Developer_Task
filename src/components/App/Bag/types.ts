import { ICartProduct } from '../../../types';

export default interface BagProps {
    cartProducts: ICartProduct[],
   /*  handleAddToCart: (params: ICartProduct) => void,
    handleUpdateCart: (params: {id: string, option: 'add' | 'remove'}) => void, */
    handleAddToCart: () => void,
    handleUpdateCart: () => void,
  };
