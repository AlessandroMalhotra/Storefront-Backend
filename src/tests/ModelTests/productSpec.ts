import { BadRequestError, NotFoundError } from '../../ErrorClasses/UserFacingErrors/userFacingError';
import { Product, ProductStore } from '../../Models/product';

const product = new ProductStore();

describe('Test product model functions', () => {
  const newProduct: Product = {
    id: 1,
    name: 'Nike Air Force 1',
    price: 135,
    category: 'Trainers',
    quantity: 1,
  };
  it('Checks product index method correctly defined', async () => {
    expect(product.index).toBeDefined();
  });

  it('Checks product create function correctly been defined', () => {
    expect(product.create).toBeDefined();
  });

  it('Checks product show function correctly been defined', () => {
    expect(product.show).toBeDefined();
  });

  it('Should return a list of products', async () => {
    const newP = await product.index();
    expect(newP).toEqual([
      {
        id: 1,
        name: 'Nike Air Force 1',
        price: 135,
        category: 'Trainers',
        quantity: 1
      }
    ])
  });

  it('Should return product by id', async () => {
    const newP = await product.show(1);
    expect(newP).toEqual({
      id: 1,
      name: 'Nike Air Force 1',
      price: 135,
      category: 'Trainers',
      quantity: 1,
    });
  });

  it('Insert a product entry successfully ', async () => {
    const newP = await product.create({
      name: 'Nike Dunk Low Disrupt',
      price: 115,
      category: 'Trainers',
      quantity: 2,
    });
    expect(newP).toEqual({
      id: 2,
      name: 'Nike Dunk Low Disrupt',
      price: 115,
      category: 'Trainers',
      quantity: 2,
    });
  });
});
