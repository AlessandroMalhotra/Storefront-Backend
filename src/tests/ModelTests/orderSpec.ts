import { Order, Orders } from '../../Models/orders';

const order = new Orders();

describe('Test order model functions', () => {
  const newOrder: Order = {
    status: 'active',
    user_id: 2,
  };

  fit('Checks order create function correctly been defined', () => {
    expect(order.create).toBeDefined();
  });

  fit('Checks if addProduct function correctly defined.', () => {
    expect(order.addProduct).toBeDefined();
  });

  fit('Create a new order for a given user.', async () => {
    const response = await order.create(newOrder);
    expect(response).toEqual({
      id: 2,
      status: 'active',
      user_id: 2,
    });
  });

  it('Add a product to an order which relates to a user', async () => {
    const response = await order.addProduct({ quantity: 1, orderId: 1, productId: 1 });
    // come back for this too see what need to return
  });
});
