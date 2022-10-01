import { Home } from "./views/Home.js"
import { About } from "./views/About.js"
import { Entrada } from "./views/Entrada.js"
import { Saida } from "./views/Saida.js"
import { Products } from "./views/Products.js"

export const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/entrada", component: Entrada },
  { path: "/saida", component: Saida },
  { path: "/products", component: Products },
];
