var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Order = (function () {
    function Order(orderOwner) {
        this.orderOwner = orderOwner;
        this.orderList = [];
        this.totalCost = 0;
        this.totalCalories = 0;
    }
    Order.prototype.getTotalCost = function () {
        this.totalCost = this.orderList.reduce(function (sum, item) {
            return sum + item.getCost();
        }, 0);
        return "Total cost is: " + this.totalCost + " tugrics.";
    };
    Order.prototype.getTotalCalories = function () {
        this.totalCalories = this.orderList.reduce(function (sum, item) {
            return sum + item.getCalories();
        }, 0);
        return "Calories provided in total: " + this.totalCalories + ".";
    };
    Order.prototype.getOrderList = function () {
        return this.orderList;
    };
    Order.prototype.addToOrder = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        this.orderList = this.orderList.concat(items);
        return items.map(function (item) { return item.getFoodName(); }).slice().join(', ') + " " + (items.length > 1 ? 'were' : 'was') + " added to your order!";
    };
    Order.prototype.deleteFromOrder = function (fullFoodName) {
        this.totalCost =
            this.totalCost -
                this.orderList
                    .filter(function (item) { return item.getFullFoodName() == fullFoodName; })[0]
                    .getCost();
        this.totalCalories =
            this.totalCost -
                this.orderList
                    .filter(function (item) { return item.getFullFoodName() == fullFoodName; })[0]
                    .getCalories();
        this.orderList = this.orderList.filter(function (item) { return item.getFullFoodName() != fullFoodName; });
        return fullFoodName + " was deleted from your order!";
    };
    return Order;
})();
var Food = (function () {
    function Food(foodName) {
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
    Food.prototype.setFullFoodName = function () {
        if (typeof this.size == 'string') {
            this.fullFoodName = (this.foodName || '[Choose item]') + " with " + (this
                .stuffing || '[Choose item]') + " of " + (this.size || '[Choose item]') + " size";
        }
        else if (typeof this.stuffing == 'string') {
            this.fullFoodName = (this.foodName || '[Choose item]') + " of type " + (this
                .stuffing || '[Choose item]');
        }
        else if (typeof this.size == 'number') {
            this.fullFoodName = (this.foodName || '[Choose item]') + " of type " + (this.stuffing || '[Choose item]') + ". " + (this.size || '[Choose amount]') + " gramms.";
        }
    };
    Food.prototype.chooseSize = function (size) {
        this.size = size;
        this.setFullFoodName();
    };
    Food.prototype.chooseStuffing = function (stuffing) {
        this.stuffing = stuffing;
        this.setFullFoodName();
    };
    Food.prototype.getCost = function () {
        return this.cost;
    };
    Food.prototype.getCalories = function () {
        return this.calories;
    };
    Food.prototype.getFoodName = function () {
        return this.foodName;
    };
    Food.prototype.getFullFoodName = function () {
        return this.fullFoodName;
    };
    return Food;
})();
var Burger = (function (_super) {
    __extends(Burger, _super);
    function Burger() {
        _super.apply(this, arguments);
    }
    Burger.prototype.calculateCost = function () {
        this.cost = this.sizeValues.COST + this.stuffingValues.COST;
    };
    Burger.prototype.calculateCalories = function () {
        this.calories = this.sizeValues.CALORIES + this.stuffingValues.CALORIES;
    };
    Burger.prototype.chooseSize = function (type) {
        if (this.size === type) {
            return type + " is already set.";
        }
        _super.prototype.chooseSize.call(this, type);
        switch (this.size) {
            case Burger.HAMBURGER_SIZES.SMALL.TYPE:
                this.sizeValues = Burger.HAMBURGER_SIZES.SMALL;
                break;
            case Burger.HAMBURGER_SIZES.BIG.TYPE:
                this.sizeValues = Burger.HAMBURGER_SIZES.BIG;
                break;
            default:
                console.log("Sorry, we have no such sizes.");
                break;
        }
        this.calculateCost();
        this.calculateCalories();
    };
    Burger.prototype.chooseStuffing = function (type) {
        if (this.stuffing === type) {
            return type + " is already set.";
        }
        _super.prototype.chooseStuffing.call(this, type);
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
                console.log("Sorry, we have no such stuffing.");
                break;
        }
        this.calculateCost();
        this.calculateCalories();
    };
    Burger.HAMBURGER_SIZES = {
        SMALL: { TYPE: 'Small', COST: 50, CALORIES: 20 },
        BIG: { TYPE: 'Big', COST: 100, CALORIES: 40 }
    };
    Burger.HAMBURGER_STUFFING = {
        CHEESE: { TYPE: 'Cheese', COST: 10, CALORIES: 20 },
        SALAD: { TYPE: 'Salad', COST: 20, CALORIES: 5 },
        POTATO: { TYPE: 'Potato', COST: 15, CALORIES: 10 }
    };
    return Burger;
})(Food);
// To-Do
var Salad = (function (_super) {
    __extends(Salad, _super);
    function Salad(foodName) {
        _super.call(this, foodName);
        this.size = 0;
    }
    Salad.prototype.calculateCost = function (grammAmount) {
        this.cost = Number(((this.stuffingValues.COST * grammAmount) / 100).toFixed());
    };
    Salad.prototype.calculateCalories = function (grammAmount) {
        this.calories = Number(((this.stuffingValues.CALORIES * grammAmount) / 100).toFixed());
    };
    Salad.prototype.chooseSaladType = function (salad) {
        if (this.stuffing === salad) {
            console.log(salad + " is already set.");
        }
        _super.prototype.chooseStuffing.call(this, salad);
        switch (this.stuffing) {
            case Salad.SALAD_TYPES.CAESAR.TYPE:
                this.stuffingValues = Salad.SALAD_TYPES.CAESAR;
                break;
            case Salad.SALAD_TYPES.OLIVIER.TYPE:
                this.stuffingValues = Salad.SALAD_TYPES.OLIVIER;
                break;
            default:
                console.log("Sorry, we have no such stuffing.");
                break;
        }
    };
    Salad.prototype.chooseWeight = function (grammAmount) {
        if (grammAmount <= 0)
            return 'Type a positive amount of gramms';
        _super.prototype.chooseSize.call(this, grammAmount);
        this.calculateCost(grammAmount);
        this.calculateCalories(grammAmount);
    };
    Salad.SALAD_TYPES = {
        CAESAR: { TYPE: 'Caesar', COST: 100, CALORIES: 20 },
        OLIVIER: { TYPE: 'Olivier', COST: 50, CALORIES: 80 }
    };
    return Salad;
})(Food);
var Drink = (function (_super) {
    __extends(Drink, _super);
    function Drink() {
        _super.apply(this, arguments);
    }
    Drink.prototype.calculateCost = function () {
        this.cost = this.stuffingValues.COST;
    };
    Drink.prototype.calculateCalories = function () {
        this.calories = this.stuffingValues.CALORIES;
    };
    Drink.prototype.chooseDrinkType = function (drink) {
        if (this.stuffing === drink) {
            return console.log(drink + " is already set.");
        }
        _super.prototype.chooseStuffing.call(this, drink);
        switch (this.stuffing) {
            case Drink.DRINK_TYPES.COLA.TYPE:
                this.stuffingValues = Drink.DRINK_TYPES.COLA;
                break;
            case Drink.DRINK_TYPES.COFFEE.TYPE:
                this.stuffingValues = Drink.DRINK_TYPES.COFFEE;
                break;
            default:
                console.log("Sorry, we have no such drink.");
                break;
        }
        this.calculateCost();
        this.calculateCalories();
    };
    Drink.DRINK_TYPES = {
        COLA: { TYPE: 'Cola', COST: 50, CALORIES: 40 },
        COFFEE: { TYPE: 'Coffee', COST: 80, CALORIES: 20 }
    };
    return Drink;
})(Food);
var order1 = new Order('Tigran');
var burger1 = new Burger('Veganburger');
burger1.chooseSize('Small');
burger1.chooseStuffing('Potato');
var burger2 = new Burger('Freshburger');
burger2.chooseSize('Big');
burger2.chooseStuffing('Salad');
var salad1 = new Salad('Delicios salad');
salad1.chooseSaladType('Caesar');
salad1.chooseWeight(89);
var salad2 = new Salad('Tasty salad');
salad2.chooseSaladType('Olivier');
salad2.chooseWeight(150);
var drink1 = new Drink('Precious drink');
drink1.chooseDrinkType('Coffee');
var drink2 = new Drink('Fascinating drink');
drink2.chooseDrinkType('Cola');
// You might use 'npm run result' to automatically compile index.ts and run index.js
// console.log(drink1.getFullFoodName(), drink1.getCost()+' tugrics.', drink1.getCalories()+' calories.');
// console.log(drink2.getFullFoodName(), drink2.getCost()+' tugrics.', drink2.getCalories()+' calories.');
// console.log(salad1.getFullFoodName(), salad1.getCost()+ ' tugrics.', salad1.getCalories()+ ' calories.');
// console.log(salad2.getFullFoodName(), salad2.getCost()+ ' tugrics.', salad2.getCalories()+ ' calories.');
console.log(order1.addToOrder(burger1, burger2, salad1, salad2, drink1, drink2), order1.getTotalCost(), order1.getTotalCalories());
console.log(order1.deleteFromOrder(burger1.getFullFoodName()), order1.getTotalCost(), order1.getTotalCalories());
console.log(order1.deleteFromOrder(salad2.getFullFoodName()), order1.getTotalCost(), order1.getTotalCalories());
