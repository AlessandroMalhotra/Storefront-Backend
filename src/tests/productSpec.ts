import { ProductStore } from '../Models/product';

const product = new ProductStore();

describe('Test user model functions', () => {
  it('Checks id index method correctly defined', async () => {
    expect(product.index).toBeDefined();
  });

  it('Checks create function correctly been defined', () => {
    expect(product.create).toBeDefined();
  });

  it('Checks show function correctly been defined', () => {
    expect(product.show).toBeDefined();
  });

  it('Should return a list of products', async () => {
    const products = await product.index();
    expect(products).toEqual([]);
  });

  // it('Should return product by id', async () => {
  //   const users = await product.show(1);
  //   expect(users).toEqual([{
  //     id: 1,
  //     firstName: 'sandro',
  //     lastName: 'malhotra',
  //     password: 'password',
  //   }])
  // });
});
