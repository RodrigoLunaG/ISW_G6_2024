import express from "express"
import router from "./routes/pedido.router.js"
const app = express()

app.get("/", (req, res) => {
    res.send("SERVIDOR EN LINEA");
});
app.use(express.json())
app.use(router)



export default app;