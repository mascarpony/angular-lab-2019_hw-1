var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hashes = [
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
var Order = (function () {
    function Order() {
        this.isEditable = true;
        this.orders = new Map();
    }
    Order.prototype.addOrder = function (hash, food) {
        if (this.isEditable) {
            this.orders.set(hash, food);
        }
        else {
            return "You have already finished your order, please create a new one";
        }
    };
    Order.prototype.deleteOrder = function (hash) {
        if (this.isEditable) {
            if (this.orders.has(hash)) {
                this.orders.delete(hash);
            }
            else {
                return "There is no such product in your order";
            }
        }
        else {
            return "You have already finished your order, please create a new one";
        }
    };
    Order.prototype.finishOrder = function () {
        this.isEditable = false;
        return "Transaction completed";
    };
    Order.prototype.previewPriceAndCalories = function () {
        return "Your order total: " + this.showPrice(this.orders) + ". \n    Calories: " + this.showCalories(this.orders);
    };
    Order.prototype.showPrice = function (orders) {
        return orders.values().slice().reduce(function (orderPrice, item) { return orderPrice + item.price; }, 0);
    };
    Order.prototype.showCalories = function (orders) {
        return orders.values().slice().reduce(function (orderPrice, item) { return orderPrice + item.calories; }, 0);
    };
    return Order;
})();
function createFood(ctor, type, filling) {
    return new ctor(type, filling);
}
var Food = (function () {
    function Food(type, filling) {
        this.type = type;
        this.filling = filling;
        this.calories = this.type[1];
        this.price = this.type[0];
    }
    return Food;
})();
//Hamburger
var Hamburger = (function (_super) {
    __extends(Hamburger, _super);
    function Hamburger(type, filling) {
        _super.call(this, type, filling);
        this.price = this.type[0] + this.calculateFillingPrice();
        this.calories = this.type[1] + this.calculateFillingCalories();
    }
    Hamburger.prototype.calculateFillingCalories = function () {
        return this.filling.reduce(function (sumOfCalories, item) { return sumOfCalories + item[1]; }, 0);
    };
    Hamburger.prototype.calculateFillingPrice = function () {
        return this.filling.reduce(function (sumOfPrice, item) { return sumOfPrice + item[0]; }, 0);
    };
    Hamburger.SMALL = [50, 20];
    Hamburger.BIG = [100, 40];
    Hamburger.CHEESE = [10, 20];
    Hamburger.EXTRA = [20, 5];
    Hamburger.FRIES = [15, 10];
    return Hamburger;
})(Food);
//Salads
var Salad = (function (_super) {
    __extends(Salad, _super);
    function Salad(type) {
        _super.call(this, type);
    }
    Salad.CESAR = [100, 20];
    Salad.OLIVIE = [50, 80];
    return Salad;
})(Food);
//Drinks
var Drink = (function (_super) {
    __extends(Drink, _super);
    function Drink(type) {
        _super.call(this, type);
    }
    Drink.COFE = [80, 20];
    Drink.COLA = [50, 40];
    return Drink;
})(Food);
//Final Result
var order1 = new Order();
var order2 = new Order();
var HBig = new Hamburger(Hamburger.BIG, [Hamburger.CHEESE]);
var HSmall = new Hamburger(Hamburger.SMALL, [
    Hamburger.FRIES,
    Hamburger.EXTRA
]);
var Cofe = new Drink(Drink.COFE);
var Cola = new Drink(Drink.COLA);
var Cesar = new Salad(Salad.CESAR);
var Olivie = new Salad(Salad.OLIVIE);
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
