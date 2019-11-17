import { Product, IProduct, IProductParams } from './Product';

export default class Hamburger extends Product {
  static readonly SIZE_SMALL = { price: 50, calories: 20 };
  static readonly SIZE_LARGE = { price: 100, calories: 40 };
  static readonly STUFFING_CHEESE = { price: 10, calories: 20 };
  static readonly STUFFING_SALAD = { price: 20, calories: 5 };
  static readonly STUFFING_POTATO = { price: 15, calories: 10 };

  constructor(product: IProduct) {
    super(product.type, product.options, product.quantity);
  }

  private paramsBySize = this.getParamsBySize(this.options.size!);
  private paramsByStuffing = this.getParamsByStuffing(this.options.stuffing!);

  getPrice(): number {
    const price = this.paramsBySize.price + this.paramsByStuffing.price;
    return price * this.quantity;
  }

  getCalories(): number {
    const calories = this.paramsBySize.calories + this.paramsByStuffing.calories;
    return calories * this.quantity;
  }

  getParamsBySize(size: string): IProductParams {
    switch (size) {
      case 'SIZE_SMALL':
        return Hamburger.SIZE_SMALL;
      case 'SIZE_LARGE':
        return Hamburger.SIZE_LARGE;
      default:
        return Hamburger.SIZE_SMALL;
    }
  }

  getParamsByStuffing(stuffing: string): IProductParams {
    switch (stuffing) {
      case 'STUFFING_CHEESE':
        return Hamburger.STUFFING_CHEESE;
      case 'STUFFING_SALAD':
        return Hamburger.STUFFING_SALAD;
      case 'STUFFING_POTATO':
        return Hamburger.STUFFING_POTATO;
      default:
        return Hamburger.STUFFING_CHEESE;
    }
  }
}
