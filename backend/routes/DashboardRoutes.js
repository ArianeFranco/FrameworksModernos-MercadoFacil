import express from 'express';
import { resumoDashboard } from '../controllers/DashboardController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Endpoints relacionados ao resumo de vendas e estoque
 */

/**
 * @swagger
 * /dashboard/resumo:
 *   get:
 *     summary: Obtém o resumo do dashboard (vendas, faturamento, produtos, etc.)
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Retorna os dados agregados do sistema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalVendas:
 *                   type: integer
 *                   example: 20
 *                 faturamento:
 *                   type: number
 *                   format: float
 *                   example: 1599.99
 *                 produtos:
 *                   type: integer
 *                   example: 12
 *                 maisVendidos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nome:
 *                         type: string
 *                         example: "Arroz"
 *                       quantidade:
 *                         type: integer
 *                         example: 35
 *                 estoqueDistribuido:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nome:
 *                         type: string
 *                         example: "Feijão"
 *                       quantidade:
 *                         type: integer
 *                         example: 42
 *       500:
 *         description: Erro interno ao processar os dados
 */

router.get('/resumo', resumoDashboard);

export default router;
