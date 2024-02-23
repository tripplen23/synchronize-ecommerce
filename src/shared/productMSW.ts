// TODO: Stablize/normalize the shape of data
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

import { ModifiedProductType, ProductType } from "../misc/productType";
import { mockProducts } from "../data/mockProducts";

const productsUrl = "https://fakestoreapi.com/";

export const handler = [
  http.get(productsUrl, () => {
    console.log("Number item in mock products: ", mockProducts.length);
    return HttpResponse.json(mockProducts, { status: 200 });
  }),
  http.post(productsUrl, async ({ request }) => {
    const product = (await request.json()) as ModifiedProductType;
    const createdProduct: ProductType = {
      ...product,
      id: 21,
    };
    return HttpResponse.json(createdProduct, { status: 201 });
  }),
];

export const productMSW = setupServer(...handler);
