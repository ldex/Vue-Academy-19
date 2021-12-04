import { httpClient } from "./HttpClientService";

const RESOURCE_NAME = 'products';

export default {
  clearCache: false,

  getProducts() {
    let sortParams = `?$orderby=ModifiedDate%20desc`;
    let forceUpdate = this.clearCache;
    this.clearCache = false;
    return httpClient.get(RESOURCE_NAME + sortParams, { forceUpdate: forceUpdate })
  },

  getProduct(id) {
    return httpClient.get(`${RESOURCE_NAME}/${id}`)
  },

  insertProduct(product) {
    this.clearCache = true;
    return httpClient.post(RESOURCE_NAME, product)
  },

  deleteProduct(product) {
    this.clearCache = true;
    return httpClient.delete(`${RESOURCE_NAME}/${product.id}`)
  },
}