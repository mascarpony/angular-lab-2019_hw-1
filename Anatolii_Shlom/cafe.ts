//original version https://github.com/AMSHL/js-2
//now with ES6 and TS

interface Food {
    name: string;
    price: number;
    calories: number;
    size?: string;
    stuffing?: string;
    setPriceAndCalories(): void;
}

const HamburgerSize: any = {
    SMALL: { price: 50, calories: 20 },
    LARGE: { price: 100, calories: 40 }
};
const HamburgerStuffing: any = {
    CHEESE: { price: 10, calories: 20 },
    SALAD: { price: 20, calories: 5 },
    POTATO: { price: 15, calories: 10 }
};
const DrinkName: any = {
    COLA: { price: 50, callories: 40 },
    COFFEE: { price: 80, callories: 20 }
};
const SaladName: any = {
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
    getTotalPrice(): void {
        return console.log(`Total cost - ${this.totalPrice} ₮`);
    }
    getTotalCalories(): void {
        return console.log(`There is ${this.totalCalories} calories in your order`);
    }
    add(food: Food) {
        if (Object.isFrozen(this.items)) {
            console.log("You cann't edit payed order");
        } else {
            this.items.push(food);
            this.totalCalories += food.calories;
            this.totalPrice += food.price;
            console.log(`Added ${food.name} to your order, ${food.calories} calories, ${food.price} ₮`);
        }
    }
    delete(food: Food) {
        if (Object.isFrozen(this.items)){
            console.log("You cann't edit payed order");
        } else {
            for (let i = 0; i < this.items.length; i++) {
                if (food === this.items[i]) {
                    this.items.splice(i, 1);
                    this.totalCalories -= food.calories;
                    this.totalPrice -= food.price;
                    console.log(`${food.name} removed from your order`);
                }
            }
        }
    }
    show(): void {
        if (this.items.length) {
            console.log("Your order -");
            this.items.forEach(elem => {
            if (elem.stuffing) {
                console.log(`${elem.name} hamburger with ${elem.stuffing}`)
            } else {
                console.log(elem.name);
            }
        });
        } else {
            console.log("You haven't ordered anything yet");
        }
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
    getPrice: () => number;
    getCalories: () => number;
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
    getPrice: () => number;
    getCalories: () => number;
    constructor(name: string) {
        this.name = name;
        this.setPriceAndCalories();
    }  
    setPriceAndCalories() {
        switch (this.name.toLowerCase()) {
            case "cola":
                this.price = DrinkName.COLA.price;
                this.calories = DrinkName.COLA.callories;
                break;
            case "coffee":
                this.price = DrinkName.COFFEE.price;
                this.calories = DrinkName.COFFEE.callories;
                break;
        }
    }
}

class Salad implements Food {
    calories: number = 0;
    price: number = 0;
    name: string;
    getPrice: () => number;
    getCalories: () => number;
    constructor(name: string) {
        this.name = name;
        this.setPriceAndCalories();
    }
    setPriceAndCalories() {
        switch (this.name.toLowerCase()) {
            case "olivier":
                this.price = SaladName.OLIVIER.price;
                this.calories = SaladName.OLIVIER.callories;
            break;
            case "caesar":
                this.price = SaladName.CAESAR.price;
                this.calories = SaladName.CAESAR.callories;
            break;
        }
    }
}


//Making order
let order1 = new Order();
let hamburger1 = new Hamburger('small','salad');
let drink1 = new Drink('cola');
let drink2 = new Drink('coffee');
let salad1 = new Salad('caesar');

order1.show();
order1.add(hamburger1);
order1.add(drink2);
order1.add(salad1);
order1.add(drink1);
order1.delete(drink1);
order1.show();
order1.getTotalPrice();
order1.getTotalCalories();
order1.pay();

order1.add(drink2);
order1.delete(drink1);
