type Hash = number;
const hashes: Hash[] = [
  1213,
  12134,
  4353,
  42331,
  5656747,
  23123,
  12315,
  645647,
  23131231154
];

type FoodItem = Map<Hash, Food>;
//Order
interface IOrder {
  item: FoodItem;
  isEditable: boolean;
  addOrder: (hash: Hash, food: Food) => string;
  deleteOrder: (hash: Hash) => string;
  finishOrder: () => string;
}

class Order implements IOrder {
  item: FoodItem = new Map();
  isEditable: boolean = true;

  addOrder(hash: Hash, food: Food): string {
    if (this.isEditable) {
      this.item.set(hash, food);
    } else {
      return "You have already finished your order, please create a new one";
    }
  }

  deleteOrder(hash: Hash): string {
    if (this.isEditable) {
      if (this.item.has(hash)) {
        this.item.delete(hash);
      } else {
        return "There is no such product in your order";
      }
    } else {
      return "You have already finished your order, please create a new one";
    }
  }

  finishOrder(): string {
    this.isEditable = false;
    return "Transaction completed";
  }

  previewPriceAndCalories(): string {
    return `Your order total: ${this.showPrice(this.item)}. 
    Calories: ${this.showCalories(this.item)}`;
  }

  private showPrice(item: FoodItem): number {
    return [...item.values()].reduce(
      (orderPrice, item) => orderPrice + item.price,
      0
    );
  }

  private showCalories(item: FoodItem): number {
    return [...item.values()].reduce(
      (orderPrice, item) => orderPrice + item.calories,
      0
    );
  }
}

//Food
interface FoodConstuctor {
  new (type: IFoodInfo, filling?: IFoodInfo[][]): IFood;
}

type Price = number;
type Calories = number;
interface IFood {
  price: Price;
  calories: Calories;
}
type IFoodInfo = [Price, Calories];

function createFood(
  ctor: FoodConstuctor,
  type: IFoodInfo,
  filling?: IFoodInfo[][]
): IFood {
  return new ctor(type, filling);
}

class Food implements IFood {
  protected type: IFoodInfo;
  protected filling: IFoodInfo[];
  price: Price;
  calories: Calories;
  constructor(type: IFoodInfo, filling?: IFoodInfo[]) {
    this.type = type;
    this.filling = filling;
    [this.price, this.calories] = type;
  }
}

//Hamburger
class Hamburger extends Food {
  static SMALL: IFoodInfo = [50, 20];
  static BIG: IFoodInfo = [100, 40];
  static CHEESE: IFoodInfo = [10, 20];
  static EXTRA: IFoodInfo = [20, 5];
  static FRIES: IFoodInfo = [15, 10];

  constructor(type: IFoodInfo, filling: IFoodInfo[]) {
    super(type, filling);
    this.price = this.type[0] + this.calculateFillingPrice();
    this.calories = this.type[1] + this.calculateFillingCalories();
  }

  private calculateFillingCalories(): number {
    return this.filling.reduce(
      (sumOfCalories, item) => sumOfCalories + item[1],
      0
    );
  }

  private calculateFillingPrice(): number {
    return this.filling.reduce((sumOfPrice, item) => sumOfPrice + item[0], 0);
  }
}

//Salads

class Salad extends Food {
  static CESAR: IFoodInfo = [100, 20];
  static OLIVIE: IFoodInfo = [50, 80];
  constructor(type: IFoodInfo) {
    super(type);
  }
}

//Drinks

class Drink extends Food {
  static COFE: IFoodInfo = [80, 20];
  static COLA: IFoodInfo = [50, 40];
  constructor(type: IFoodInfo) {
    super(type);
  }
}

//Final Result
const order1 = new Order();
const order2 = new Order();
const HBig = new Hamburger(Hamburger.BIG, [Hamburger.CHEESE]);
const HSmall = new Hamburger(Hamburger.SMALL, [
  Hamburger.FRIES,
  Hamburger.EXTRA
]);
const Cofe = new Drink(Drink.COFE);
const Cola = new Drink(Drink.COLA);
const Cesar = new Salad(Salad.CESAR);
const Olivie = new Salad(Salad.OLIVIE);

// console.log(HBig);
// console.log(HSmall);
// console.log(Cola);
// console.log(Cofe);
// console.log(Cesar);
// console.log(Olivie);
order1.addOrder(1213, HBig);
order1.addOrder(12134, HSmall);
order2.addOrder(645647, Olivie);
console.log(order1);
console.log(order1.previewPriceAndCalories());
console.log(order1.finishOrder());
console.log(order1.deleteOrder(1213));
console.log(order1.addOrder(121343, Cofe));
