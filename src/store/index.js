import { createStore } from 'vuex'
import ProductService from '@/services/ProductService.js';

export default createStore({
  state: {
    isLoading: false,
    products: []
  },
  mutations: {
    SET_LOADING_STATUS(state) {
      state.isLoading = !state.isLoading;
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    }
  },
  actions: {
    fetchProducts({commit}) {
      commit('SET_LOADING_STATUS');
      return ProductService.getProducts()
        .then(response => {
          commit('SET_PRODUCTS', response.data);
        })
        .finally(() => commit('SET_LOADING_STATUS'));
    }
  },
  modules: {
  }
})
