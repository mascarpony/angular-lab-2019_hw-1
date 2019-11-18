var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var MESSAGE_PAID = 'Your order is already paid';
var Item = /** @class */ (function () {
    function Item(item) {
        var additives = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            additives[_i - 1] = arguments[_i];
        }
        this.id = this.generateId();
        this.title = item.title;
        this.price = item.price;
        this.calories = item.calories;
        this.additives = additives;
    }
    Object.defineProperty(Item.prototype, "productPrice", {
        get: function () {
            return (this.additives.length) ?
                this.price + this.additives.reduce(function (sum, cur) { return sum += cur.price; }, 0) :
                this.price;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "productCalories", {
        get: function () {
            return (this.additives.length) ?
                this.calories + this.additives.reduce(function (sum, cur) { return sum += cur.calories; }, 0) :
                this.calories;
        },
        enumerable: true,
        configurable: true
    });
    Item.prototype.generateId = function () {
        return Math.floor(10000 + Math.random() * 90001);
    };
    return Item;
}());
var Hamburger = /** @class */ (function (_super) {
    __extends(Hamburger, _super);
    function Hamburger(item) {
        var additives = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            additives[_i - 1] = arguments[_i];
        }
        return _super.apply(this, __spreadArrays([item], additives)) || this;
    }
    Hamburger.SMALL = {
        title: 'SMALL',
        price: 50,
        calories: 20
    };
    Hamburger.BIG = {
        title: 'BIG',
        price: 100,
        calories: 40
    };
    Hamburger.CHEESE = {
        title: 'CHEESE',
        price: 10,
        calories: 20
    };
    Hamburger.SALAD = {
        title: 'SALAD',
        price: 20,
        calories: 5
    };
    Hamburger.POTATO_FRIES = {
        title: 'POTATO_FRIES',
        price: 15,
        calories: 10
    };
    return Hamburger;
}(Item));
var Salad = /** @class */ (function (_super) {
    __extends(Salad, _super);
    function Salad(item) {
        return _super.call(this, item) || this;
    }
    Salad.CEASAR = {
        title: 'CEASAR',
        price: 100,
        calories: 20
    };
    Salad.OLIVIER = {
        title: 'OLIVIER',
        price: 50,
        calories: 80
    };
    return Salad;
}(Item));
var Drink = /** @class */ (function (_super) {
    __extends(Drink, _super);
    function Drink(item) {
        return _super.call(this, item) || this;
    }
    Drink.COKE = {
        title: 'COKE',
        price: 50,
        calories: 40
    };
    Drink.COFFEE = {
        title: 'COFFEE',
        price: 80,
        calories: 20
    };
    return Drink;
}(Item));
var Order = /** @class */ (function () {
    function Order() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        this.items = items || [];
        this.isPaid = false;
    }
    Order.prototype.addToOrder = function (newItem) {
        if (!this.isPaid) {
            this.items.push(newItem);
            return this.items;
        }
        else {
            console.log(MESSAGE_PAID);
        }
    };
    Order.prototype.deleteFromOrder = function (delId) {
        if (!this.isPaid) {
            return this.items = this.items.filter(function (item) { return item.id !== delId; });
        }
        else {
            console.log(MESSAGE_PAID);
        }
    };
    Order.prototype.toPayForOrder = function () {
        this.isPaid = true;
    };
    Object.defineProperty(Order.prototype, "totalPrice", {
        get: function () {
            return this.items.reduce(function (sum, item) { return sum += item.productPrice; }, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "totalCalories", {
        get: function () {
            return this.items.reduce(function (sum, item) { return sum += item.productCalories; }, 0);
        },
        enumerable: true,
        configurable: true
    });
    return Order;
}());
// TESTING
var order = new Order(new Hamburger(Hamburger.BIG));
order.addToOrder(new Salad(Salad.CEASAR));
var hamburgerFriesCheese = new Hamburger(Hamburger.SMALL, Hamburger.CHEESE, Hamburger.POTATO_FRIES);
order.addToOrder(hamburgerFriesCheese);
console.log("order total price: " + order.totalPrice);
console.log("order total calories: " + order.totalCalories);
order.deleteFromOrder(hamburgerFriesCheese.id);
console.log("order total price after deleting: " + order.totalPrice);
console.log("order total calories after deleting: " + order.totalCalories);
order.toPayForOrder();
order.addToOrder(hamburgerFriesCheese);
