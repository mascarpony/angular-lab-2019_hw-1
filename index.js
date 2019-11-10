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
        return items.map(function (item) { return item.foodName; }).slice().join(', ') + " " + (items.length > 1 ? 'were' : 'was') + " added to your order!";
    };
    Order.prototype.deleteFromOrder = function (fullFoodName) {
        this.totalCost =
            this.totalCost -
                this.orderList
                    .filter(function (item) { return item.fullFoodName == fullFoodName; })[0]
                    .getCost();
        this.totalCalories =
            this.totalCost -
                this.orderList
                    .filter(function (item) { return item.fullFoodName == fullFoodName; })[0]
                    .getCalories();
        this.orderList = this.orderList.filter(function (item) { return item.fullFoodName != fullFoodName; });
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
        this.fullFoodName = (this.foodName || '[Choose item]') + " with " + (this
            .stuffing || '[Choose item]') + " of " + (this.size || '[Choose item]') + " size";
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
    return Food;
})();
var Burger = (function (_super) {
    __extends(Burger, _super);
    function Burger(foodName) {
        _super.call(this, foodName);
        this.HAMBURGER_SIZES = {
            SMALL: { TYPE: 'Small', COST: 50, CALORIES: 20 },
            BIG: { TYPE: 'Big', COST: 100, CALORIES: 40 }
        };
        this.HAMBURGER_STUFFING = {
            CHEESE: { TYPE: 'Cheese', COST: 10, CALORIES: 20 },
            SALAD: { TYPE: 'Salad', COST: 20, CALORIES: 5 },
            POTATO: { TYPE: 'Potato', COST: 15, CALORIES: 10 }
        };
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
            case this.HAMBURGER_SIZES.SMALL.TYPE:
                this.sizeValues = this.HAMBURGER_SIZES.SMALL;
                break;
            case this.HAMBURGER_SIZES.BIG.TYPE:
                this.sizeValues = this.HAMBURGER_SIZES.BIG;
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
                console.log("Sorry, we have no such stuffing.");
                break;
        }
        this.calculateCost();
        this.calculateCalories();
    };
    return Burger;
})(Food);
var Salad = (function (_super) {
    __extends(Salad, _super);
    function Salad() {
        _super.apply(this, arguments);
    }
    return Salad;
})(Food);
var Drink = (function (_super) {
    __extends(Drink, _super);
    function Drink() {
        _super.apply(this, arguments);
    }
    return Drink;
})(Food);
var order1 = new Order('Tigran');
var burger1 = new Burger('Veganburger');
burger1.chooseSize('Small');
burger1.chooseStuffing('Potato');
var burger2 = new Burger('Freshburger');
burger2.chooseSize('Big');
burger2.chooseStuffing('Salad');
// You might use 'npm run result' to automatically compile index.ts and run index.js
console.log(order1.addToOrder(burger1, burger2), order1.getTotalCost(), order1.getTotalCalories());
console.log(order1.deleteFromOrder(burger1.fullFoodName), order1.getTotalCost(), order1.getTotalCalories());
console.log(order1.deleteFromOrder(burger2.fullFoodName), order1.getTotalCost(), order1.getTotalCalories());
