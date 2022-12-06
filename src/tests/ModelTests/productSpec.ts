import { Product, ProductStore } from '../../Models/product';

const product = new ProductStore();

describe('Test product model functions', () => {
  const newProduct: Product = {
    id: 1,
    name: 'Nike Air Force 1',
    price: 135,
    category: 'Trainers',
    quantity: 1
  };
  fit('Checks product index method correctly defined', async () => {
    expect(product.index).toBeDefined();
  });

  fit('Checks product create function correctly been defined', () => {
    expect(product.create).toBeDefined();
  });

  fit('Checks product show function correctly been defined', () => {
    expect(product.show).toBeDefined();
  });

  fit('Should return a list of products', async () => {
    const products = await product.index();
    expect(products).toEqual([{ id: 1, name: 'Nike Air Force 1', price: 135, category: 'Trainers', quantity: 1 }]);
  });

  fit('Should return a list of products', async () => {
    const newP = await product.index();
    expect(newP).toEqual([newProduct]);
  });

  fit('Should return product by id', async () => {
    const newP = await product.show(1);
    expect(newP).toEqual({
      id: 1,
      name: 'Nike Air Force 1',
      price: 135,
      category: 'Trainers',
      quantity: 1
    });
  });

  it('Insert a product entry successfully ', async () => {
    const newP = await product.create(newProduct);
    expect(newP).toEqual({
      id: 1,
      name: 'Nike Air Force 1',
      price: 135,
      category: 'Trainers',
      quantity: 1
    });
  });
});
