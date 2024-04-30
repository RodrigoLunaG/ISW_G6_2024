import express from "express"
import routePedidos from './routes/pedido_router.js';
import routeTransportistas from './routes/transportista_router.js';
import cors from 'cors';

const app = express()

app.get("/", (req, res) => {
    res.send("SERVIDOR EN LINEA");
});
app.use(express.json())

// Configuración de rutas

app.use('/', routePedidos);
app.use('/', routeTransportistas);


const port = 3001

app.listen(port, () => {console.log(`escuchando en el servidor en el puerto: ${port}`)})

app.use(cors());

export default app;