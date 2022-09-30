import db from "../db.js"

export const Home = {
    template: 
`
<div class="home">
  <h3>Home</h3>
  <hr>

  <form autocomplete="off">
 
    <div class="form-controll">
      <label for="name">
       *Nome
       <input tabindex="0" v-model="name" id="name" type="text" placeholder="Digite o nome do produto."/>
      </label>
    </div>
   
   <div class="form-controll">
      <label for="preco">
       *Preço
       <input tabindex="1" v-model.number="preco"  id="preco" type="number" placeholder="Digite o preço.">
      </label>
    </div> 

   <div class="form-controll">
      <label for="category">
       *Categoria
       <input tabindex="2" v-model="category" id="category" type="text" placeholder="Digite a categoria.">
      </label>
    </div> 

    <button @click.prevent="save()">Salvar</button>
  </form>

</div>
`,
data() {
  return {
   name: null,
   preco: null,
   category: null
  }
 },
async mounted() {
  const products = await db.products.toArray()
  //alert(JSON.stringify(products, null, 2))
},
methods: {
  async save() {
     const product = await db.products.add({
       name: this.name,
       preco: this.preco,
       category: this.category
     })
    
   alert(product)
  }
}
}

