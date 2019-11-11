type tugric = number;
type calories = number;
type foodItem = Burger | Salad | Drink;

interface IOrder {
  getTotalCost(): string;
  getTotalCalories(): string;
  getOrderList(): Array<foodItem>;
  addToOrder(...items: Array<foodItem>): string;
  deleteFromOrder(fullFoodName: string): string;
}

interface IFood {
  chooseSize(size: string | number): void;
  chooseStuffing(stuffing: string): void;
  getCost(): tugric;
  getCalories(): calories;
  getFoodName(): string;
  getFullFoodName(): string;
}

interface TypeCostCalories {
  TYPE: string;
  COST: tugric;
  CALORIES: calories;
}

interface HamburgerSizes {
  SMALL: TypeCostCalories;
  BIG: TypeCostCalories;
}

interface HamburgerStuffing {
  CHEESE: TypeCostCalories;
  SALAD: TypeCostCalories;
  POTATO: TypeCostCalories;
}

interface SaladTypes {
  CAESAR: TypeCostCalories,
  OLIVIER: TypeCostCalories
}

interface DrinkTypes {
  COLA: TypeCostCalories,
  COFFEE: TypeCostCalories
}

class Order implements IOrder {
  protected orderOwner: string;
  protected orderList: Array<foodItem>;
  protected totalCost: tugric;
  protected totalCalories: calories;

  constructor(orderOwner: string) {
    this.orderOwner = orderOwner;
    this.orderList = [];
    this.totalCost = 0;
    this.totalCalories = 0;
  }

  getTotalCost(): string {
    this.totalCost = this.orderList.reduce((sum: tugric, item: foodItem) => {
      return sum + item.getCost();
    }, 0);
    return `Total cost is: ${this.totalCost} tugrics.`;
  }

  getTotalCalories(): string {
    this.totalCalories = this.orderList.reduce(
      (sum: tugric, item: foodItem) => {
        return sum + item.getCalories();
      },
      0
    );
    return `Calories provided in total: ${this.totalCalories}.`;
  }

  getOrderList(): Array<foodItem> {
    return this.orderList;
  }

  addToOrder(...items: Array<foodItem>): string {
    this.orderList = [...this.orderList, ...items];
    return `${[...items.map((item: foodItem) => item.getFoodName())].join(', ')} ${
      items.length > 1 ? 'were' : 'was'
    } added to your order!`;
  }

  deleteFromOrder(fullFoodName: string): string {
    this.totalCost =
      this.totalCost -
      this.orderList
        .filter((item: foodItem) => item.getFullFoodName() == fullFoodName)[0]
        .getCost();
    this.totalCalories =
      this.totalCost -
      this.orderList
        .filter((item: foodItem) => item.getFullFoodName() == fullFoodName)[0]
        .getCalories();
    this.orderList = this.orderList.filter(
      (item: foodItem) => item.getFullFoodName() != fullFoodName
    );
    return `${fullFoodName} was deleted from your order!`;
  }
}

class Food implements IFood {
  protected stuffingValues: TypeCostCalories;
  protected sizeValues: TypeCostCalories;
  protected foodName: string;
  protected fullFoodName: string;
  protected stuffing: string;
  protected size: string | number;
  protected cost: tugric;
  protected calories: calories;

  constructor(foodName: string) {
    this.foodName = foodName;
    this.fullFoodName;
    this.stuffing;
    this.stuffingValues = {
      TYPE: null,
      COST: 0,
      CALORIES: 0
    };
    this.size;
    this.sizeValues = {
      TYPE: null,
      COST: 0,
      CALORIES: 0
    };
    this.cost = 0;
    this.calories = 0;
  }

  private setFullFoodName(): void {
    if(typeof this.size == 'string') {
      this.fullFoodName = `${this.foodName || '[Choose item]'} with ${this
        .stuffing || '[Choose item]'} of ${this.size || '[Choose item]'} size`;
    } else if(typeof this.stuffing == 'string') {
      this.fullFoodName = `${this.foodName || '[Choose item]'} of type ${this
        .stuffing || '[Choose item]'}`;
    } else if(typeof this.size == 'number') {
      this.fullFoodName = `${this.foodName || '[Choose item]'} of type ${this.stuffing || '[Choose item]'}. ${this.size || '[Choose amount]'} gramms.`;
    }
  }

  chooseSize(size: string | number): void {
    this.size = size;
    this.setFullFoodName();
  }

  chooseStuffing(stuffing: string): void {
    this.stuffing = stuffing;
    this.setFullFoodName();
  }

  getCost(): tugric {
    return this.cost;
  }

  getCalories(): calories {
    return this.calories;
  }

  getFoodName(): string {
    return this.foodName;
  }

  getFullFoodName(): string {
    return this.fullFoodName;
  }
}

class Burger extends Food {
  static HAMBURGER_SIZES: HamburgerSizes = {
    SMALL: { TYPE: 'Small', COST: 50, CALORIES: 20 },
    BIG: { TYPE: 'Big', COST: 100, CALORIES: 40 }
  };

  static HAMBURGER_STUFFING: HamburgerStuffing = {
    CHEESE: { TYPE: 'Cheese', COST: 10, CALORIES: 20 },
    SALAD: { TYPE: 'Salad', COST: 20, CALORIES: 5 },
    POTATO: { TYPE: 'Potato', COST: 15, CALORIES: 10 }
  };

  private calculateCost(): void {
    this.cost = this.sizeValues.COST + this.stuffingValues.COST;
  }

  private calculateCalories(): void {
    this.calories = this.sizeValues.CALORIES + this.stuffingValues.CALORIES;
  }

  chooseSize(type: string): string {
    if (this.size === type) {
      return `${type} is already set.`;
    }
    super.chooseSize(type);
    switch (this.size) {
      case Burger.HAMBURGER_SIZES.SMALL.TYPE:
        this.sizeValues = Burger.HAMBURGER_SIZES.SMALL;
        break;
      case Burger.HAMBURGER_SIZES.BIG.TYPE:
        this.sizeValues = Burger.HAMBURGER_SIZES.BIG;
        break;
      default:
        console.log(`Sorry, we have no such sizes.`);
        break;
    }
    this.calculateCost();
    this.calculateCalories();
  }

  chooseStuffing(type: string): string {
    if (this.stuffing === type) {
      return `${type} is already set.`;
    }
    super.chooseStuffing(type);
    switch (this.stuffing) {
      case Burger.HAMBURGER_STUFFING.CHEESE.TYPE:
        this.stuffingValues = Burger.HAMBURGER_STUFFING.CHEESE;
        break;
      case Burger.HAMBURGER_STUFFING.POTATO.TYPE:
        this.stuffingValues = Burger.HAMBURGER_STUFFING.POTATO;
        break;
      case Burger.HAMBURGER_STUFFING.SALAD.TYPE:
        this.stuffingValues = Burger.HAMBURGER_STUFFING.SALAD;
        break;
      default:
        console.log(`Sorry, we have no such stuffing.`);
        break;
    }
    this.calculateCost();
    this.calculateCalories();
  }
}

// To-Do
class Salad extends Food {
  static SALAD_TYPES: SaladTypes = {
    CAESAR: {TYPE: 'Caesar', COST: 100, CALORIES: 20},
    OLIVIER: {TYPE: 'Olivier', COST: 50, CALORIES: 80}
  };

  constructor(foodName: string) {
    super(foodName);
    this.size = 0;
  }
  
  private calculateCost(grammAmount: number): void {
    this.cost = Number(((this.stuffingValues.COST * grammAmount) / 100).toFixed());
  }

  private calculateCalories(grammAmount: number): void {
    this.calories = Number(((this.stuffingValues.CALORIES * grammAmount) / 100).toFixed());
  }

  chooseSaladType(salad: string): void {
    if (this.stuffing === salad) {
      console.log(`${salad} is already set.`);
    }
    super.chooseStuffing(salad);
    switch (this.stuffing) {
      case Salad.SALAD_TYPES.CAESAR.TYPE:
        this.stuffingValues = Salad.SALAD_TYPES.CAESAR;
        break;
      case Salad.SALAD_TYPES.OLIVIER.TYPE:
        this.stuffingValues = Salad.SALAD_TYPES.OLIVIER;
        break;
      default:
        console.log(`Sorry, we have no such stuffing.`);
        break;
    }
  }

  chooseWeight(grammAmount: number): string {
    if(grammAmount <= 0) return 'Type a positive amount of gramms';
    super.chooseSize(grammAmount);
    this.calculateCost(grammAmount);
    this.calculateCalories(grammAmount);
  }

}
class Drink extends Food {
  static DRINK_TYPES: DrinkTypes = {
    COLA: { TYPE: 'Cola', COST: 50, CALORIES: 40 },
    COFFEE: { TYPE: 'Coffee', COST: 80, CALORIES: 20 }
  };

  private calculateCost(): void {
    this.cost = this.stuffingValues.COST;
  }

  private calculateCalories(): void {
    this.calories = this.stuffingValues.CALORIES;
  }

  chooseDrinkType(drink: string): void {
    if (this.stuffing === drink) {
      return console.log(`${drink} is already set.`);
    }
    super.chooseStuffing(drink);
    switch (this.stuffing) {
      case Drink.DRINK_TYPES.COLA.TYPE:
        this.stuffingValues = Drink.DRINK_TYPES.COLA;
        break;
      case Drink.DRINK_TYPES.COFFEE.TYPE:
        this.stuffingValues = Drink.DRINK_TYPES.COFFEE;
        break;
      default:
        console.log(`Sorry, we have no such drink.`);
        break;
    }
    this.calculateCost();
    this.calculateCalories();
  }
}

const order1 = new Order('Tigran');

const burger1 = new Burger('Veganburger');
burger1.chooseSize('Small');
burger1.chooseStuffing('Potato');

const burger2 = new Burger('Freshburger');
burger2.chooseSize('Big');
burger2.chooseStuffing('Salad');

const salad1 = new Salad('Delicios salad');
salad1.chooseSaladType('Caesar');
salad1.chooseWeight(89);

const salad2 = new Salad('Tasty salad');
salad2.chooseSaladType('Olivier');
salad2.chooseWeight(150);

const drink1 = new Drink('Precious drink');
drink1.chooseDrinkType('Coffee');

const drink2 = new Drink('Fascinating drink')
drink2.chooseDrinkType('Cola');

// You might use 'npm run result' to automatically compile index.ts and run index.js

// console.log(drink1.getFullFoodName(), drink1.getCost()+' tugrics.', drink1.getCalories()+' calories.');
// console.log(drink2.getFullFoodName(), drink2.getCost()+' tugrics.', drink2.getCalories()+' calories.');

// console.log(salad1.getFullFoodName(), salad1.getCost()+ ' tugrics.', salad1.getCalories()+ ' calories.');
// console.log(salad2.getFullFoodName(), salad2.getCost()+ ' tugrics.', salad2.getCalories()+ ' calories.');

console.log(
  order1.addToOrder(burger1, burger2, salad1, salad2, drink1, drink2),
  order1.getTotalCost(),
  order1.getTotalCalories()
);
console.log(
  order1.deleteFromOrder(burger1.getFullFoodName()),
  order1.getTotalCost(),
  order1.getTotalCalories()
);
console.log(
  order1.deleteFromOrder(salad2.getFullFoodName()),
  order1.getTotalCost(),
  order1.getTotalCalories()
);
