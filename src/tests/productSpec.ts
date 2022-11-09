import { ProductStore } from '../Models/product'

const product = new ProductStore();

describe("Test user model functions", () => {

  it("GET all products in the database", async () => {
    expect(product.index).toBeDefined();
  });

  it ("GET should return a list of products", async () => {
    const products = await product.index();
    expect(products).toEqual([]);
  });
});