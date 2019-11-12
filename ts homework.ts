interface Food {
  price: number;
  calories: number;
  name: string;
  size?: string;
  stuffing?: string;
  setPriceAndCalories(): void;
}

const HamburgerSize = {
  SMALL: { price: 50, calories: 20 },
  LARGE: { price: 100, calories: 40 }
};

const HamburgerStuffing = {
  CHEESE: { price: 10, calories: 20 },
  SALAD: { price: 20, calories: 5 },
  POTATO: { price: 15, calories: 10 }
};

const DrinkName = {
  COLA: { price: 50, callories: 40 },
  COFFEE: { price: 80, callories: 20 }
};

const SaladName = {
  OLIVIER: { price: 50, callories: 80 },
  CAESAR: { price: 100, callories: 20 }
};

class Order {
  items: Food[] = [];
  totalPrice: number = 0;
  totalCalories: number = 0;

  constructor() {
    if (arguments.length) {
      for (let i = 0; i < arguments.length; i++) {
        this.items.push(arguments[i]);
        this.totalCalories += arguments[i].callories;
        this.totalPrice += arguments[i].price;
      }
    }
  }

  getPrice(): number {
    return this.totalPrice;
  }

  getCalories(): number {
    return this.totalCalories;
  }

  add(food: Food) {
    if (Object.isFrozen(this.items))
      throw new Error("You've already paid this oreder");
    this.items.push(food);
    this.totalCalories += food.calories;
    this.totalPrice += food.price;
    console.log(`${food.name} was added`);
  }

  delete(food: Food) {
    if (Object.isFrozen(this.items))
      throw new Error("You've already paid this oreder");
    for (let i = 0; i < this.items.length; i++) {
      if (food === this.items[i]) {
        this.items.splice(i, 1);
        this.totalCalories -= food.calories;
        this.totalPrice -= food.price;
        console.log(`${food.name} was deleted`);
      }
    }
  }

  show(): void {
    if (this.items.length) {
      console.log("Your order:");
      this.items.forEach(elem => {
        if (elem.stuffing) {
          console.log(`${elem.size} ${elem.name} with ${elem.stuffing}`);
        } else console.log(elem.name);
      });
    } else console.log("Order is empty. Add something tasty!");
  }

  pay(): void {
    Object.freeze(this.items);
    console.log("Your order was paid");
  }
}

class Hamburger implements Food {
  calories: number = 0;
  price: number = 0;
  name: string = "Hamburger";
  size: string;
  stuffing: string;
  constructor(size: string, stuffing: string) {
    this.size = size.toLowerCase();
    this.stuffing = stuffing.toLowerCase();
    this.setPriceAndCalories();
  }
  setPriceAndCalories() {
    switch (this.size) {
      case "small":
        this.price = HamburgerSize.SMALL.price;
        this.calories = HamburgerSize.SMALL.calories;
        break;
      case "large":
        this.price = HamburgerSize.LARGE.price;
        this.calories = HamburgerSize.LARGE.calories;
        break;
    }
    switch (this.stuffing.toLowerCase()) {
      case "cheese":
        this.price += HamburgerStuffing.CHEESE.price;
        this.calories += HamburgerStuffing.CHEESE.calories;
        break;
      case "salad":
        this.price += HamburgerStuffing.SALAD.price;
        this.calories += HamburgerStuffing.SALAD.calories;
        break;
      case "potato":
        this.price += HamburgerStuffing.POTATO.price;
        this.calories += HamburgerStuffing.POTATO.calories;
        break;
    }
  }
}

class Drink implements Food {
  calories: number = 0;
  price: number = 0;
  name: string;
  constructor(name: string) {
    this.name = name;
    this.setPriceAndCalories();
  }

  setPriceAndCalories() {
    switch (this.name.toLowerCase()) {
      case "cola":
        this.price = DrinkName.COLA.price;
        this.calories = DrinkName.COLA.callories;
      case "coffee":
        this.price = DrinkName.COFFEE.price;
        this.calories = DrinkName.COFFEE.callories;
    }
  }
}

class Salad implements Food {
  calories: number = 0;
  price: number = 0;
  name: string;
  constructor(name: string) {
    this.name = name;
    this.setPriceAndCalories();
  }
  setPriceAndCalories() {
    switch (this.name.toLowerCase()) {
      case "olivier":
        this.price = SaladName.OLIVIER.price;
        this.calories = SaladName.OLIVIER.callories;
      case "caesar":
        this.price = SaladName.CAESAR.price;
        this.calories = SaladName.CAESAR.callories;
    }
  }
}

let myOrder = new Order();
myOrder.show();
