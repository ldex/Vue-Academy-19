<template>
  <div>
    <form @submit.prevent="onSubmit" novalidate>
      <h2>Add product</h2>
      <div v-if="errors.length" class="errorMessage">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
      <div>
        <label for="productName">Name:</label>
        <input
          type="text"
          v-model.trim="product.name"
          class="form-control"
          id="productName"
        />
      </div>
      <div>
        <label for="productDescription"
          >Description:<small class="text-muted">(optional)</small></label
        >
        <textarea
          class="form-control"
          v-model.trim="product.description"
          id="productDescription"
        ></textarea>
      </div>
      <div>
        <label for="price">Price:</label>
        <input
          type="number"
          v-model.number="product.price"
          class="form-control"
          id="price"
        />
      </div>
      <div>
        <label for="imageUrl">Image url:</label>
        <input
          type="text"
          v-model="product.imageUrl"
          class="form-control"
          id="imageUrl"
        />
      </div>
      <div>
        <label for="discontinued">Discontinued?</label>
        <input
          type="checkbox"
          v-model="product.discontinued"
          class="form-control"
          id="discontinued"
        />
      </div>
      <div>
        <label for="fixedPrice">Fixed price?</label>
        <input
          type="checkbox"
          v-model="product.fixedPrice"
          class="form-control"
          id="fixedPrice"
        />
      </div>

      <div style="margin: 10px">
        <button type="submit">Save product</button>
      </div>

      <img :src="product.imageUrl" width="200" />
    </form>
  </div>
</template>

<script>
import ProductService from '@/services/ProductService.js';

export default {
  data () {
    return {
        product: {},
        errors: []
    }
  },
  methods: {
    onSubmit () {
      if(this.product.name && this.product.price) {
        let newProduct = {
          name: this.product.name,
          price: this.product.price,
          description: this.product.description || '',
          imageUrl: this.product.imageUrl,
          discontinued: this.product.discontinued,
          fixedPrice: this.product.fixedPrice
        }
        ProductService.insertProduct(newProduct)
          .then(() => {
            this.$router.push({ name: "products" });
          })
          .catch(error => {
            console.log("There was an error:", error.response);
          });
      } else {
        this.errors = [];
        if(!this.product.name) this.errors.push("Name required.")
        if(!this.product.price) this.errors.push("Price required.")
      }
    }
  }
}
</script>

<style lang="css" scoped>
input:active,
input:focus,
input:hover,
textarea:active,
textarea:focus,
textarea:hover {
  background-color: lightyellow;
  border-color: yellow;
}

label {
    clear: both;
    float:left;
    width: 120px;
}

.errorMessage {
    color: red;
}
</style>