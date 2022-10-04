const db = new Dexie("controll-inventory");

db.version(1.3).stores({
  products:
 `
    ++id,
    name,
    preco,
    category
`,
  carts: 
  `
   ++id,
   name,
   preco,
   category
  `
});

export default db
