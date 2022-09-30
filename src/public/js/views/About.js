import db from "../db.js"

export const About = {
    template: 
`
<div class="about">
  <ul class="list">
    <li v-for="(item, index) in list" class="l-item" :key="index">
       <h4>{{ item.name }}</h4>
       <span>{{ formatCurrency(item.preco) }}</span>
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
