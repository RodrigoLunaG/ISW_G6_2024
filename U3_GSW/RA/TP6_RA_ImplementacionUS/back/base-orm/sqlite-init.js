// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/tangoapp.db");

  let existe = false;
  let res = null;

  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'pedidos'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
        `CREATE TABLE pedidos(
            IdPedido INTEGER PRIMARY KEY AUTOINCREMENT,
            TipoCarga TEXT NOT NULL,
            DomicilioRetiro TEXT not null,
            FechaRetiro TEXT NOT NULL,
            DomicilioEntrega TEXT NOT NULL,
            FechaEntrega TEXT NOT NULL,
            Observacion TEXT,
            Fotos TEXT
            );`
    );
    console.log("tabla pedidos de envio creada!");
  }

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;