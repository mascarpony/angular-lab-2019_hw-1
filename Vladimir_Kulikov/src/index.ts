import Order from './Order';

const order = new Order();

order
  .add({ type: 'Hamburger', options: { size: 'SIZE_SMALL', stuffing: 'STUFFING_CHEESE' }, quantity: 2 })
  .remove({ type: 'Hamburger', options: { size: 'SIZE_SMALL', stuffing: 'STUFFING_CHEESE' }, quantity: 1 })
  .checkout()
  .printReceipt();
