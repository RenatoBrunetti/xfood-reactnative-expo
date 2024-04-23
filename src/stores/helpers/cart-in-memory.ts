import { ProductCartProps } from "../cart-stores";
import { ProductProps } from "@/utils/data/products";

export function add(products: ProductCartProps[], newProduct: ProductProps) {
  const existingProduct = products.find(({ id }) => newProduct.id === id);
  if (existingProduct) {
    return products.map((product) =>
      product.id === existingProduct.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
  }
  return [...products, { ...newProduct, quantity: 1 }];
}

export function remove(products: ProductCartProps[], product: ProductProps) {
  const updatedProducts = products.map((currentProduct) =>
    currentProduct.id === product.id
      ? {
          ...currentProduct,
          quantity:
            currentProduct.quantity > 1 ? currentProduct.quantity - 1 : 0,
        }
      : currentProduct
  );
  return updatedProducts.filter(
    (currentProduct) => currentProduct.quantity > 0
  );
  // Remove All
  // const existingProduct = products.find(({ id }) => product.id === id);
  // if (existingProduct) {
  //   return products.filter((product) => product.id !== existingProduct.id);
  // }
  // return [...products];
}
