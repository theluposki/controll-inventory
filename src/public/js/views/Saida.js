import db from "../db.js";

export const Saida = {
  template: `
  <div class="saida">
    <h3>Saída</h3>
    <hr>
  
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
          <span class="l-price">{{ formatCurrency(item.preco) }}</span>
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
    const products = await db.products.toArray();
    this.products = products;
  },
  data() {
    return {
      products: [],
      cart: [],
      name: null,
    };
  },
  methods: {
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
    async addCart(id) {
      const prod = await db.products.get(id);

      if (prod.qtd > 0) {
        this.cart.push(prod);

        prod.qtd = prod.qtd - 1;
        await db.products.put(prod, id);
        const veriProd = await db.products.get(id);

        if (veriProd.qtd === 0) {
          await db.products.delete(id);
          const products = await db.products.toArray();
          this.products = products;
          return;
        }

        const products = await db.products.toArray();
        return (this.products = products);
      }

      console.log(prod);
    },
    removeCart(id) {
      console.log("Remove", id);
    },
    save() {
      console.log("salvou...");
    },
  },
};
