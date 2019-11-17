import { Product, IProduct } from './Product';
import Cart from './Cart';
import Hamburger from './Hamburger';

interface IOrder {
  productFactory: (product: IProduct) => IProduct,
  add: (product: Product) => Order,
  remove: (product: IProduct) => Order,
  checkout: () => Order,
  printReceipt: () => Order,
}

export default class Order implements IOrder {
  static readonly errors = {
    checkoutError: 'You can not add or remove products after checkout',
    quantityError: 'You can not add or remove a negative quantity of products',
    productTypeError: 'This type of product doesn\'t exist',
  }

  private cart = new Cart();
  private isCheckout = false;

  productFactory(productData: IProduct): IProduct {
    switch (productData.type) {
      case 'Hamburger':
        return new Hamburger(productData);
      // case 'Salad':
      //   return new Salad(product);
      // case 'Drink':
      //   return new Drink(product);
      default:
        throw new Error(Order.errors.productTypeError);
    }
  }

  add(productData: IProduct): Order {
    if (this.isCheckout) {
      throw new Error(Order.errors.checkoutError);
    }
    if (productData.quantity <= 0) {
      throw new Error(Order.errors.quantityError);
    }
    const product = this.productFactory(productData);
    this.cart.add(product);
    return this;
  }

  remove(productData: IProduct): Order {
    if (this.isCheckout) {
      throw new Error(Order.errors.checkoutError);
    }
    if (productData.quantity <= 0) {
      throw new Error(Order.errors.quantityError);
    }
    this.cart.remove(productData);
    return this;
  }

  checkout(): Order {
    this.isCheckout = true;
    return this;
  }

  printReceipt(): Order {
    const products = this.cart.getProducts();
    console.log(products);
    return this;
  }
}