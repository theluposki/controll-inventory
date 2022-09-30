const db = new Dexie("controll-inventory");

db.version(1).stores({
  products:
 `
    ++id,
    name,
    preco,
    category
`,
});

export default db
