import db from "../db.js";

export const Cart = {
  template: `
  <div class="cart">
    <h3>Carrinho</h3>
    <hr>
    
    <div class="resume">
        <router-link to="/saida">ir para Saida</router-link>
        <h1>{{ getTotal() }}</h1>
    </div>

    <form autocomplete="off">
  
      <div class="form-controll">
        <label for="name">
         *Nome produto
         <div class="group">
            <input @keyup.prevent="search()" tabindex="1" v-model="name" id="name" type="text" placeholder="Pesquise o nome do produto."/>
            <button @click.prevent="search()">
              <i class="ai-search"></i>
            </button>
         </div>

        </label>
      </div>

      <h3>Carrinho</h3>

      <ul class="list">
        <li class="l-item" v-for="(item, i) in cart" :key="i">
          <div class="named">
            <i>#{{item.id}}</i>&nbsp;
            <h4>{{ item.name }}</h4>&nbsp;
            <span v-if="item.qtd">{{ item.qtd }}x</span>
          </div>
          <span class="l-price">{{ formatCurrency(sumPriceItem(item.qtd, item.preco)) }}</span>
        </li>
      </ul>
    </form>
  </div>
  `,
  async mounted() {
    this.getAllCarts();
  },
  data() {
    return {
      cart: [],
      name: null,
    };
  },
  methods: {
    getTotal() {
      const result = this.cart.reduce((a, b) => a + b.preco * b.qtd, 0);

      return this.formatCurrency(result);
    },
    async search() {
      const products = await db.products.toArray();

      const str = this.name;
      const reg = new RegExp(str, "ig");

      const arr = products.filter((item) => {
        return item.name.match(reg);
      });

      if (str !== "") {
        this.products = arr;
      } else {
        this.products = products;
      }
    },
    formatCurrency(number) {
      return new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(number);
    },
    async getAllCarts() {
      const carts = await db.carts.toArray();
      this.cart = carts;
    },
    sumPriceItem(qtd, preco) {
      return qtd * preco;
    },
    save() {
      console.log("salvou...");
    },
  },
};
