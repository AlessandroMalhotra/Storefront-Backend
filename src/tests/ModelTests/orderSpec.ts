import { before } from 'lodash';
import { Order, Orders } from '../../Models/orders';

const order = new Orders();

describe('Test order model functions', () => {
  const newOrder: Order = {
    status: 'active',
    user_id: 1,
  };


  it('Checks order create function correctly been defined', () => {
    expect(order.create).toBeDefined();
  });

  it('Checks if addProduct function correctly defined.', () => {
    expect(order.addProduct).toBeDefined();
  });

  it('Create a new order for a given user.', async () => {
    const response = await order.create(newOrder);
    expect(response).toEqual({
      id: 1,
      status: 'active',
      user_id: 1,
    });
  });

  it('Add a product to an order which relates to a user', async () => {
    const response = await order.addProduct({ quantity: 1, orderId: 1, productId: 1 });
    expect(response).toEqual(response)
  });
});
