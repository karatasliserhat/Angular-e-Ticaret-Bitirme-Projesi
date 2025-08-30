export interface productModel {

  "id": string,
  "name": string,
  "imageUrl": string,
  "price": number,
  "stock": number,
  "categoryId": string,
  "categoryName": string,
  "categoryUrl":string,
}
export const initalizeProduct: productModel = {
  id: "",
  name: "",
  imageUrl: "",
  price: 0,
  stock: 0,
  categoryId: "",
  categoryName: "",
  categoryUrl:""
}