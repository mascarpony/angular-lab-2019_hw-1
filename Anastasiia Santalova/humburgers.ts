"use strict"

interface FoodParamsArray {
    reduce(arg0: (acc: number, value: number) => number, arg1: number): number;
    readonly [index: number]: number
}

/**
* * * * * * * ORDER * * * * * * * 
*/

function Order(): void {
    this.products = [];
}

/**
* Accept data from added food
*/

Order.prototype.acceptProduct = function(product): void {
    this.products = this.products.concat(product);
}

/**
* Delete data from order
*/

Order.prototype.deleteProduct = function(name): void {
    this.products = this.products.filter((arg) => arg !== name);
}

/**
 * Get know a price and calories
 */

Order.prototype.calculateProduct = function(): void {
    this.totalPrice = this.products.reduce(function(acc: number, obj): number {
        acc += obj.price;
        return acc;
    }, 0);

    this.totalCalories = this.products.reduce(function(acc: number, obj): number {
        acc += obj.calories;
        return acc;
    }, 0);
}

/**
* Paid order
*/

Order.prototype.paid = function(): void {

    this.products.forEach(Object.freeze);
    Object.freeze(this.products);
    Object.freeze(this);

}


/**
* * * * * * * CLASS FOOD * * * * * * * 
*/

function Food(price: number, calories: number): void {
    this.price = price;
    this.calories = calories;
}


/**
* * * * * * * CLASS HAMBURGER * * * * * * * 
*/

function Hamburger(size: FoodParamsArray, stuffing): void {

    this.size = size;
    this.stuffing = stuffing;

    let hamPrice: number, hamCalories: number, priceOfStuffing: number, caloriesOfStuffing: number;

    if (stuffing[0][0]) {

        priceOfStuffing = stuffing.reduce(function(acc, value) {
            acc += +value[0];
            return acc;
        },0);

        caloriesOfStuffing = stuffing.reduce(function(acc, value) {
            acc += +value[1];
            return acc;
        },0);

    } else {
        priceOfStuffing = +stuffing[0];
        caloriesOfStuffing = +stuffing[1];
    }

    hamPrice = +size[0] + priceOfStuffing;
    hamCalories = +size[1] + caloriesOfStuffing;

    Food.call(this, hamPrice, hamCalories);

} 


/**
* Sizes and types of stuffing 
*/
const sizeSmall: FoodParamsArray = Hamburger.SIZE_SMALL = [50, 20];
const sizeLarge: FoodParamsArray = Hamburger.SIZE_LARGE = [100, 40];
const stuffingCheese: FoodParamsArray = Hamburger.STUFFING_CHEESE = [10, 20];
const stuffingSalad: FoodParamsArray = Hamburger.STUFFING_SALAD = [20, 5];
const stuffingPotato: FoodParamsArray = Hamburger.STUFFING_POTATO = [15, 10];

Hamburger.prototype = Object.create(Food.prototype);


/**
* * * * * * * CLASS SALAD * * * * * * *
*/

function Salad(name: FoodParamsArray): void {
    
    this.name = name;

    let saladPrice, saladCalories;

    saladPrice = name[0];
    saladCalories = name[1];

    Food.call(this, saladPrice, saladCalories);
} 

/**
* Types of salads 
*/
const caesarSalad: FoodParamsArray = Salad.CAESAR = [100, 20];
const russianSalad: FoodParamsArray = Salad.RUSSIAN_SALAD = [50, 80];


/**
* * * * * * * CLASS DRINK * * * * * * * 
*/

function Drink(type: FoodParamsArray): void {

    this.type = type;

    let drinkPrice, drinkCalories;

    drinkPrice = type[0];
    drinkCalories = type[1];

    Food.call(this, drinkPrice, drinkCalories);
} 

/** 
* Types of drinks 
*/
const cola: FoodParamsArray = Drink.COLA = [50, 40];
const coffee: FoodParamsArray = Drink.COFFEE = [80, 20];





//*********************************************************************************//

// let food = new Food();
let order = new Order();

let H1 = new Hamburger (sizeSmall, [stuffingCheese, stuffingPotato]);
let H2 = new Hamburger (sizeLarge, stuffingSalad);
let drink = new Drink(cola);
let salad = new Salad(russianSalad);
let salad1 = new Salad(caesarSalad);

order.acceptProduct(H1);
order.acceptProduct(H2);
order.acceptProduct(drink);
order.acceptProduct(salad);

order.deleteProduct(H1);

order.calculateProduct();

order.paid();

try {
    order.deleteProduct(salad);
} catch(e) {
    console.log("Изменение невозможно. Заказ оплачен.")
}

try {
    order.acceptProduct(salad1);
} catch(e) {
    console.log("Изменение невозможно. Заказ оплачен.")
}

console.log(order);
