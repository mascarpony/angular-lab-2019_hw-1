import { isEqual } from 'lodash';
import { IProduct } from './Product';

interface ICart {
  add: (product: IProduct) => void,
  remove: (product: IProduct) => void,
  getProducts: () => IProduct[],
}

export default class Cart implements ICart {
  private cart: IProduct[] = [];

  add(product: IProduct): void {
    const sameProductInCart = this.cart.find(inCartProduct => {
      if (product.type === inCartProduct.type && isEqual(product.options, inCartProduct.options)) {
        return inCartProduct;
      }
    });

    if (sameProductInCart) {
      sameProductInCart.quantity += product.quantity;
    } else {
      this.cart.push(product);
    }
  }

  remove(product: IProduct): void {
    const sameProductInCart = this.cart.find(inCartProduct => {
      if (product.type === inCartProduct.type && isEqual(product.options, inCartProduct.options)) {
        return inCartProduct;
      }
    });

    if (!sameProductInCart) {
      return;
    }

    const diff = sameProductInCart.quantity - product.quantity;

    if (diff > 0) {
      sameProductInCart.quantity = diff;
    } else {
      this.cart = this.cart.filter(inCartProduct => inCartProduct !== sameProductInCart);
    }
  }

  getProducts(): IProduct[] {
    return this.cart;
  }
}