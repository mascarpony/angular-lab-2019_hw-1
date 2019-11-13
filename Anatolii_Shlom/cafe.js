var HamburgerSize = {
    SMALL: { price: 50, calories: 20 },
    LARGE: { price: 100, calories: 40 }
};
var HamburgerStuffing = {
    CHEESE: { price: 10, calories: 20 },
    SALAD: { price: 20, calories: 5 },
    POTATO: { price: 15, calories: 10 }
};
var DrinkName = {
    COLA: { price: 50, callories: 40 },
    COFFEE: { price: 80, callories: 20 }
};
var SaladName = {
    OLIVIER: { price: 50, callories: 80 },
    CAESAR: { price: 100, callories: 20 }
};
var Order = /** @class */ (function () {
    function Order() {
        this.items = [];
        this.totalPrice = 0;
        this.totalCalories = 0;
        if (arguments.length) {
            for (var i = 0; i < arguments.length; i++) {
                this.items.push(arguments[i]);
                this.totalCalories += arguments[i].callories;
                this.totalPrice += arguments[i].price;
            }
        }
    }
    Order.prototype.getTotalPrice = function () {
        return console.log("Total cost - " + this.totalPrice + " \u20AE");
    };
    Order.prototype.getTotalCalories = function () {
        return console.log("There is " + this.totalCalories + " calories in your order");
    };
    Order.prototype.add = function (food) {
        if (Object.isFrozen(this.items)) {
            console.log("You cann't edit payed order");
        }
        else {
            this.items.push(food);
            this.totalCalories += food.calories;
            this.totalPrice += food.price;
            console.log("Added " + food.name + " to your order, " + food.calories + " calories, " + food.price + " \u20AE");
        }
    };
    Order.prototype["delete"] = function (food) {
        if (Object.isFrozen(this.items)) {
            console.log("You cann't edit payed order");
        }
        else {
            for (var i = 0; i < this.items.length; i++) {
                if (food === this.items[i]) {
                    this.items.splice(i, 1);
                    this.totalCalories -= food.calories;
                    this.totalPrice -= food.price;
                    console.log(food.name + " removed from your order");
                }
            }
        }
    };
    Order.prototype.show = function () {
        if (this.items.length) {
            console.log("Your order -");
            this.items.forEach(function (elem) {
                if (elem.stuffing) {
                    console.log(elem.name + " hamburger with " + elem.stuffing);
                }
                else {
                    console.log(elem.name);
                }
            });
        }
        else {
            console.log("You haven't ordered anything yet");
        }
    };
    Order.prototype.pay = function () {
        Object.freeze(this.items);
        console.log("Your order was paid");
    };
    return Order;
}());
var Hamburger = /** @class */ (function () {
    function Hamburger(size, stuffing) {
        this.calories = 0;
        this.price = 0;
        this.name = "Hamburger";
        this.size = size.toLowerCase();
        this.stuffing = stuffing.toLowerCase();
        this.setPriceAndCalories();
    }
    Hamburger.prototype.setPriceAndCalories = function () {
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
    };
    return Hamburger;
}());
var Drink = /** @class */ (function () {
    function Drink(name) {
        this.calories = 0;
        this.price = 0;
        this.name = name;
        this.setPriceAndCalories();
    }
    Drink.prototype.setPriceAndCalories = function () {
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
    };
    return Drink;
}());
var Salad = /** @class */ (function () {
    function Salad(name) {
        this.calories = 0;
        this.price = 0;
        this.name = name;
        this.setPriceAndCalories();
    }
    Salad.prototype.setPriceAndCalories = function () {
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
    };
    return Salad;
}());
//Making order
var order1 = new Order();
var hamburger1 = new Hamburger('small', 'salad');
var drink1 = new Drink('cola');
var drink2 = new Drink('coffee');
var salad1 = new Salad('caesar');
order1.show();
order1.add(hamburger1);
order1.add(drink2);
order1.add(salad1);
order1.add(drink1);
order1["delete"](drink1);
order1.show();
order1.getTotalPrice();
order1.getTotalCalories();
order1.pay();
order1.add(drink2);
order1["delete"](drink1);
