export interface IProduct {
  type: string,
  options: IProductOptions,
  quantity: number,
}

export interface IProductOptions {
  size?: string,
  stuffing?: string,
  name?: string,
}

export interface IProductParams {
  price: number,
  calories: number,
}

export abstract class Product implements IProduct {
  constructor(
    public type: string,
    public options: IProductOptions,
    public quantity: number = 1,
  ) { }

  abstract getPrice(): number;
  abstract getCalories(): number;
}