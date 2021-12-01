<template>
    <div>
        <section v-if="error">
            {{error.message}}
        </section>
        <section v-else>
        <div v-if="loading">
            <h2 class="loading">Loading products</h2>
        </div>
        <div v-else>
        <product-list :products="products" :page-size="5">
            <template v-slot="props">
              <span>{{ props.product.name }}</span>
            </template>
        </product-list>
        <product-list  :products="products" :page-size="5">
            <template v-slot="props">
              <span>{{ props.product.modifiedDate }}</span>
              <span>{{ props.product.name }}</span>
              <span>({{ props.product.price }}$)</span>
            </template>
        </product-list>
        </div>

        </section>
    </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import ProductService from '@/services/ProductService.js';

export default {
  name: 'app',
  components: {
    ProductList
  },
  errorCaptured: function(error) {
      console.error('Error in component: ', error.message);
      return false;
  },
  data() {
    return {
      products: [],
      error: null,
      loading: false
    }
  },
  created () {
    this.loading = true;
    ProductService.getProducts()
      .then(response => {
        this.products = response.data;
      })
      .catch(error => {
        this.error = error;
      })
      .finally(() => this.loading = false);
  },
}
</script>

<style lang="scss" scoped>

</style>