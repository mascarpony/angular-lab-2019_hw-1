const MESSAGE_PAID = 'Your order is already paid';

interface IItem {
    title: string;
    price: number;
    calories: number;
    additives?: IAdditive[];
}

interface IAdditive {
    title: string;
    price: number;
    calories: number;
}

interface ExtendedIItem extends IItem {
    id: number;
    productPrice: number;
    productCalories: number;
}

class Item implements IItem {
    id: number;
    title: string;
    price: number;
    calories: number;
    additives?: IAdditive[];

    constructor(item: IItem, ...additives: IAdditive[]) {
        this.id = this.generateId();
        this.title = item.title;
        this.price = item.price;
        this.calories = item.calories;
        this.additives = additives;
    }

    get productPrice(): number {
        return (this.additives.length) ?
            this.price + this.additives.reduce((sum, cur) => sum += cur.price, 0) :
            this.price;
    }

    get productCalories(): number {
        return (this.additives.length) ?
            this.calories + this.additives.reduce((sum, cur) => sum += cur.calories, 0) :
            this.calories;
    }

    generateId() {
        return Math.floor(10000 + Math.random() * 90001)
    }
}

class Hamburger extends Item {
    static SMALL: IItem = {
        title: 'SMALL',
        price: 50,
        calories: 20,
    }
    static BIG: IItem = {
        title: 'BIG',
        price: 100,
        calories: 40,
    }
    static CHEESE: IAdditive = {
        title: 'CHEESE',
        price: 10,
        calories: 20,
    }
    static SALAD: IAdditive = {
        title: 'SALAD',
        price: 20,
        calories: 5,
    }
    static POTATO_FRIES: IAdditive = {
        title: 'POTATO_FRIES',
        price: 15,
        calories: 10,
    }

    constructor(item: IItem, ...additives: IAdditive[]) {
        super(item, ...additives)
    }
}

class Salad extends Item {
    static CEASAR: IItem = {
        title: 'CEASAR',
        price: 100,
        calories: 20,
    }
    static OLIVIER: IItem = {
        title: 'OLIVIER',
        price: 50,
        calories: 80,
    }

    constructor(item: IItem) {
        super(item)
    }
}

class Drink extends Item {
    static COKE: IItem = {
        title: 'COKE',
        price: 50,
        calories: 40,
    }
    static COFFEE: IItem = {
        title: 'COFFEE',
        price: 80,
        calories: 20,
    }

    constructor(item: IItem) {
        super(item)
    }
}

interface IOrder {
    items: IItem[];
    isPaid: boolean;
}

class Order implements IOrder {
    items: ExtendedIItem[];
    isPaid: boolean;

    constructor(...items: ExtendedIItem[]) {
        this.items = items || [];
        this.isPaid = false;
    }

    addToOrder(newItem: ExtendedIItem): IItem[] | void {
        if (!this.isPaid) {
            this.items.push(newItem);
            return this.items;
        } else {
            console.log(MESSAGE_PAID);
        }
    }

    deleteFromOrder(delId: number): IItem[] | void {
        if (!this.isPaid) {
            return this.items = this.items.filter(item => item.id !== delId);
        } else {
            console.log(MESSAGE_PAID)
        }
    }

    toPayForOrder(): void {
        this.isPaid = true;
    }

    get totalPrice(): number {
        return this.items.reduce((sum, item) => sum += item.productPrice, 0)
    }

    get totalCalories(): number {
        return this.items.reduce((sum, item) => sum += item.productCalories, 0)
    }
}

// TESTING
const order = new Order(new Hamburger(Hamburger.BIG));
order.addToOrder(new Salad(Salad.CEASAR));
const hamburgerFriesCheese = new Hamburger(Hamburger.SMALL, Hamburger.CHEESE, Hamburger.POTATO_FRIES);
order.addToOrder(hamburgerFriesCheese);

console.log(`order total price: ${order.totalPrice}`);
console.log(`order total calories: ${order.totalCalories}`);
order.deleteFromOrder(hamburgerFriesCheese.id);
console.log(`order total price after deleting: ${order.totalPrice}`);
console.log(`order total calories after deleting: ${order.totalCalories}`);
order.toPayForOrder();
order.addToOrder(hamburgerFriesCheese)