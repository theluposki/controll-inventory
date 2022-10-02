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
      <label for="qtd">
       *Quantidade
       <input tabindex="3" v-model.number="qtd"  id="qtd" type="number" placeholder="Digite a quantidade.">
      </label>
    </div>

   <div class="form-controll">
      <label for="category">
       *Categoria
       <select tabindex="4" v-model="category">
       <option value="" selected disabled>Selecione uma categoria</option>
        <option v-for="(item, index) in categories" :key="index" :value="item">{{ item }}</option>
       </select>      
      </label>
    </div> 

    <button tabindex="5" @keydown.prevent="save()" @click.prevent="save()">Salvar</button>
  </form>

</div>
`,
data() {
  return {
   name: null,
   preco: null,
   qtd: 1,
   category: "",
   categories: ["Mercado", "Bar"]
  }
 },
async mounted() {

},
methods: {
  clear() {
    this.name = null
    this.preco = null
    this.category = null
    this.qtd = null
  },
  async save() {
     if(this.name !== null && this.preco !== null && this.qtd && this.category !== "") {
       const product = await db.products.add({
         name: this.name,
         preco: this.preco,
         qtd: this.qtd,
         category: this.category
     })
      
     alert(product)
     this.clear()
     this.$router.push("/products")
     } else {
      alert("Insira os dados corretamente!...")
     }
  }
}
}

