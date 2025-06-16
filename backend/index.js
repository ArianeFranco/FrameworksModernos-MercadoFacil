import express from 'express'
import ProductRoutes from './routes/ProdutoRoutes.js'
import 'dotenv/config'
import { swaggerUi, specs } from './config/swagger'
import cors from 'cors'
import VendaRoutes from './routes/VendaRoutes.js'
import DashboardRoutes from './routes/DashboardRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Rotas
app.use('/produtos', ProductRoutes)
app.use('/vendas', VendaRoutes)
app.use('/dashboard', DashboardRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
  console.log(`📘 Documentação Swagger: http://localhost:${PORT}/api-docs`)
})
