interface Food {
  price: number;
  calories: number;
  name: string;
  size?: string;
  stuffing?: string;
  setPriceAndCalories(): void;
}

enum HamburgerStuffing {
  SALAD = 'salad',
  POTATO = 'potato',
  CHEESE = 'cheese'
}

enum HamburgerSize {
  SMALL = 'small',
  LARGE = 'large'
}

enum DrinkName {
  COLA = 'cola',
  COFFEE = 'coffee'
}

enum SaladName {
  OLIVIER = 'olivier',
  CAESAR = 'caesar'
}

const HamburgerSizeChar = {
  SMALL: { price: 50, calories: 20 },
  LARGE: { price: 100, calories: 40 }
};

const HamburgerStuffingChar = {
  CHEESE: { price: 10, calories: 20 },
  SALAD: { price: 20, calories: 5 },
  POTATO: { price: 15, calories: 10 }
};

const DrinkNameChar = {
  COLA: { price: 50, callories: 40 },
  COFFEE: { price: 80, callories: 20 }
};

const SaladNameChar = {
  OLIVIER: { price: 50, callories: 80 },
  CAESAR: { price: 100, callories: 20 }
};

class Order {
  items: Food[] = [];
  totalPrice: number = 0;
  totalCalories: number = 0;

  constructor(...items: Food[]) {
    if (items.length) {
      items.forEach((element: Food) => {
        this.items.push(element);
        this.totalCalories += element.calories;
        this.totalPrice += element.price;
      });
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
      console.log('Your order:');
      this.items.forEach(elem => {
        if (elem.stuffing) {
          console.log(`${elem.size} ${elem.name} with ${elem.stuffing}`);
        } else console.log(elem.name);
      });
    } else console.log('Order is empty. Add something tasty!');
  }

  pay(): void {
    Object.freeze(this.items);
    console.log('Your order was paid');
  }
}

class Hamburger implements Food {
  calories: number = 0;
  price: number = 0;
  name: string = 'Hamburger';
  size: HamburgerSize;
  stuffing: HamburgerStuffing;
  constructor(size: string, stuffing: string) {
    this.size = HamburgerSize[size.toUpperCase()];
    this.stuffing = HamburgerStuffing[stuffing.toUpperCase()];
    this.setPriceAndCalories();
  }
  setPriceAndCalories() {
    switch (this.size) {
      case 'small':
        this.price = HamburgerSizeChar.SMALL.price;
        this.calories = HamburgerSizeChar.SMALL.calories;
        break;
      case 'large':
        this.price = HamburgerSizeChar.LARGE.price;
        this.calories = HamburgerSizeChar.LARGE.calories;
        break;
    }
    switch (this.stuffing) {
      case 'cheese':
        this.price += HamburgerStuffingChar.CHEESE.price;
        this.calories += HamburgerStuffingChar.CHEESE.calories;
        break;
      case 'salad':
        this.price += HamburgerStuffingChar.SALAD.price;
        this.calories += HamburgerStuffingChar.SALAD.calories;
        break;
      case 'potato':
        this.price += HamburgerStuffingChar.POTATO.price;
        this.calories += HamburgerStuffingChar.POTATO.calories;
        break;
    }
  }
}

class Drink implements Food {
  calories: number = 0;
  price: number = 0;
  name: DrinkName;
  constructor(name: string) {
    this.name = DrinkName[name.toUpperCase()];
    this.setPriceAndCalories();
  }

  setPriceAndCalories() {
    switch (this.name.toLowerCase()) {
      case 'cola':
        this.price = DrinkNameChar.COLA.price;
        this.calories = DrinkNameChar.COLA.callories;
      case 'coffee':
        this.price = DrinkNameChar.COFFEE.price;
        this.calories = DrinkNameChar.COFFEE.callories;
    }
  }
}

class Salad implements Food {
  calories: number = 0;
  price: number = 0;
  name: SaladName;
  constructor(name: string) {
    this.name = SaladName[name.toUpperCase()];
    this.setPriceAndCalories();
  }
  setPriceAndCalories() {
    switch (this.name.toLowerCase()) {
      case 'olivier':
        this.price = SaladNameChar.OLIVIER.price;
        this.calories = SaladNameChar.OLIVIER.callories;
      case 'caesar':
        this.price = SaladNameChar.CAESAR.price;
        this.calories = SaladNameChar.CAESAR.callories;
    }
  }
}
