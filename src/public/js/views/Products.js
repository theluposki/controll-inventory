import db from "../db.js"

export const Products = {
    template: 
`
<div class="products">
  <ul class="list">
    <li v-for="(item, index) in list" class="l-item" :key="index">
      <div class="named">
        <i>#{{item.id}}</i>&nbsp;
        <h4>{{ item.name }}</h4>&nbsp;
        <span v-if="item.qtd">{{ item.qtd }}x</span>
      </div>
      <span class="l-price">{{ formatCurrency(item.preco) }}</span>
    </li>
  </ul>
</div>
`,
data() {
  return {
    list: []
  }
},
async mounted() {
 const products = await db.products.toArray()
 this.list = products
},
methods: {
  formatCurrency(number) {
    return new Intl.NumberFormat('pt-br', { 
        style: 'currency', currency: 'BRL' 
    }).format(number)
  }
}
}
