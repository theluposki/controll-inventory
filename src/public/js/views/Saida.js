import db from "../db.js";

export const Saida = {
  template: `
  <div class="saida">
    <h3>Saída</h3>
    <hr>

    <div class="resume">
      <router-link to="/cart">ir para Carrinho</router-link>
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

      <h3>Estoque</h3>

      <ul class="list">
        <li class="l-item" v-for="(item, i) in products" :key="i">
          <div class="named">
            <i>#{{item.id}}</i>&nbsp;
            <h4>{{ item.name }}</h4>&nbsp;
            <span v-if="item.qtd">{{ item.qtd }}x</span>
          </div>
          <span class="l-price">{{ formatCurrency(item.preco) }}</span>
          
          <div class="group-opt">
            <button @click.prevent="removeCart(item.id)">
              <i class="ai-minus"></i>
            </button>
              <h2>&nbsp;0&nbsp;</h2>
            <button @click.prevent="addCart(item.id)">
              <i class="ai-plus"></i>
            </button>
          </div>

        </li>
      </ul>
    </form>
  </div>
  `,
  async mounted() {
    this.getAllProducts();
    this.getAllCarts();
  },
  data() {
    return {
      products: [],
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
    async getAllProducts() {
      const products = await db.products.toArray();
      this.products = products;
    },
    async getAllCarts() {
      const carts = await db.carts.toArray();

      const lastItem = carts.length - 1;

      if (carts.length >= 3) {
        const nArray = [
          carts[lastItem - 2],
          carts[lastItem - 1],
          carts[lastItem],
        ];

        this.cart = nArray;
      } else {
        const carts = await db.carts.toArray();
        this.cart = carts;
      }
    },
    sumPriceItem(qtd, preco) {
      return qtd * preco;
    },
    async addCart(id) {
      const prod = await db.products.get(id);
      const prodCart = await db.carts.get({ name: prod.name });

      if (prod.qtd != 0) {
        if (prodCart) {
          prodCart.qtd = prodCart.qtd + 1;
          await db.carts.put(prodCart, prodCart.id);
          prod.qtd = prod.qtd - 1;
          await db.products.put(prod, id);

          const verifyProd = await db.products.get(id);

          if (verifyProd.qtd === 0) {
            await db.products.delete(id);
            this.getAllCarts();
            this.getAllProducts();
            return;
          }

          this.getAllCarts();
          this.getAllProducts();
        } else {
          prod.qtd = prod.qtd - 1;
          await db.products.put(prod, id);

          await db.carts.add({
            name: prod.name,
            preco: prod.preco,
            qtd: 1,
            category: prod.category,
          });

          this.getAllProducts();
          this.getAllCarts();
          return;
        }
      } else {
        await db.products.delete(id);
        this.getAllProducts();
      }
    },
    async removeCart(id) {
      const prod = await db.products.get(id);

      const prodCart = await db.carts.get({ name: prod.name });

      if (prodCart === undefined) return;

      if (prodCart.qtd != 0) {
        prodCart.qtd = prodCart.qtd - 1;
        await db.carts.put(prodCart, prodCart.id);

        prod.qtd = prod.qtd + 1;
        await db.products.put(prod, id);

        const verifyProd = await db.carts.get(prodCart.id);

        if (verifyProd.qtd === 0) {
          await db.carts.delete(prodCart.id);
          this.getAllCarts();
          this.getAllProducts();
          return;
        }

        this.getAllCarts();
        this.getAllProducts();
      } else {
        await db.carts.delete(prodCart.id);
        this.getAllProducts();
        this.getAllCarts();
      }
    },
    save() {
      console.log("salvou...");
    },
  },
};
