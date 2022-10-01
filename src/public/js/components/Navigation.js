export const Navigation = {
    template: 
`
<div class="navigation">
  
  <router-link to="/" class="nav-link" exact-active-class="active" exact>
     <i class="ai-home"></i>
     Home
   </router-link>
   <router-link to="/saida" class="nav-link" exact-active-class="active" exact>
   <i class="ai-arrow-up"></i>
   Saída
   </router-link>
   <router-link to="/entrada" class="nav-link" exact-active-class="active" exact>
   <i class="ai-arrow-down"></i>
   Entrada
   </router-link>
   <router-link to="/products" class="nav-link" exact-active-class="active" exact>
   <i class="ai-grid"></i>
     Produtos
   </router-link>
</div>
`
}
