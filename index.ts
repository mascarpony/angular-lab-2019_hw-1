type tugric = number;
type calories = number;
type foodItem = Burger | Salad | Drink;

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

class Order {
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

class Food {
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
  protected HAMBURGER_SIZES: HamburgerSizes = {
    SMALL: { TYPE: 'Small', COST: 50, CALORIES: 20 },
    BIG: { TYPE: 'Big', COST: 100, CALORIES: 40 }
  };

  protected HAMBURGER_STUFFING: HamburgerStuffing = {
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
      case this.HAMBURGER_SIZES.SMALL.TYPE:
        this.sizeValues = this.HAMBURGER_SIZES.SMALL;
        break;
      case this.HAMBURGER_SIZES.BIG.TYPE:
        this.sizeValues = this.HAMBURGER_SIZES.BIG;
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
      case this.HAMBURGER_STUFFING.CHEESE.TYPE:
        this.stuffingValues = this.HAMBURGER_STUFFING.CHEESE;
        break;
      case this.HAMBURGER_STUFFING.POTATO.TYPE:
        this.stuffingValues = this.HAMBURGER_STUFFING.POTATO;
        break;
      case this.HAMBURGER_STUFFING.SALAD.TYPE:
        this.stuffingValues = this.HAMBURGER_STUFFING.SALAD;
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
  protected SALAD_TYPES: SaladTypes = {
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
      case this.SALAD_TYPES.CAESAR.TYPE:
        this.stuffingValues = this.SALAD_TYPES.CAESAR;
        break;
      case this.SALAD_TYPES.OLIVIER.TYPE:
        this.stuffingValues = this.SALAD_TYPES.OLIVIER;
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
class Drink extends Food {}

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
salad2.chooseWeight(89);

// You might use 'npm run result' to automatically compile index.ts and run index.js

console.log(salad1.getFullFoodName(), salad1.getCost()+ ' tugrics.', salad1.getCalories()+ ' calories.');
console.log(salad2.getFullFoodName(), salad2.getCost()+ ' tugrics.', salad2.getCalories()+ ' calories.');

// console.log(
//   order1.addToOrder(burger1, burger2),
//   order1.getTotalCost(),
//   order1.getTotalCalories()
// );
// console.log(
//   order1.deleteFromOrder(burger1.getFullFoodName()),
//   order1.getTotalCost(),
//   order1.getTotalCalories()
// );
// console.log(
//   order1.deleteFromOrder(burger2.getFullFoodName()),
//   order1.getTotalCost(),
//   order1.getTotalCalories()
// );
