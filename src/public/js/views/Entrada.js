import db from "../db.js"

export const Entrada = {
    template: 
`
<div class="home">
  <h3>Entrada</h3>
  <hr>

  <form autocomplete="off">

    <div class="form-controll">
      <label for="name">
       *Nome
       <input tabindex="1" v-model="name" id="name" type="text" placeholder="Digite o nome do produto."/>
      </label>
    </div>
   
   <div class="form-controll">
      <label for="preco">
       *Preço
       <input tabindex="2" v-model.number="preco"  id="preco" type="number" placeholder="Digite o preço.">
      </label>
    </div> 

   <div class="form-controll">
      <label for="category">
       *Categoria
       <!--
       <input tabindex="3" v-model="category" id="category" type="text" placeholder="Digite a categoria.">
       -->
       <select tabindex="3" v-model="category">
       <option value="" selected>Selecione uma categoria</option>
        <option v-for="(item, index) in categories" :key="index" :value="item">{{ item }}</option>
       </select>      
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
   category: "",

   categories: ["Mercado", "Bar"]
  }
 },
async mounted() {
  const products = await db.products.toArray()
  //alert(JSON.stringify(products, null, 2))
},
methods: {
  clear() {
    this.name = null
    this.preco = null
    this.category = null
  },
  async save() {
     if(this.name !== null && this.preco !== null && this.category !== "") {
       const product = await db.products.add({
         name: this.name,
         preco: this.preco,
         category: this.category
     })
      
     alert(product)
     this.clear()
     this.$router.push("/about")
     } else {
      alert("Insira os dados corretamente!...")
     }
  }
}
}

