import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import { useStorage } from "@vueuse/core"
export const useProductStore = defineStore({
  id: "store",
  state: () => ({
    products: [],
    cart: useStorage("cart", []),
    loading: false,
  }),

  getters: {
    cartQuantity: (state) => {
      return state.cart?.length;
    },

    itemQuantity: (state) => (product) => {
      const item = state.cart.find((item) => item.id === product.id);
      return item?.quantity;
    },

    productTotal: (state) => {
      return state.cart.reduce((val, item) => val + item.quantity * item.price, 0)
    }
  },

  actions: {
    async fetchProducts() {
      this.loading = true;
      const response = await axios.get("https://fakestoreapi.com/products");
      this.loading = false;
      response.data.map((product) => {
        this.products.push(product);
      });
    },

    addToCart(product) {
      const item = this.cart.find((item) => item.id === product.id);
      if ( item ) {
        item.quantity++;
      } else {
        this.cart.push({...product, quantity: 1});
      };
    },

    removeFromCart(product) {
      const item = this.cart.find((item) => item.id === product.id);
      if(item) {
        if( item.quantity > 1) {
          item.quantity--;
        } else {
          this.cart = this.cart.filter((item) => item.id !== product.id);
        }
      };
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
