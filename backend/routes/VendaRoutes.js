import express from 'express';
import * as vendaController from '../controllers/VendaController.js';
import verificarToken from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /vendas:
 *   get:
 *     summary: Lista todas as vendas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vendas
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao buscar vendas
 */
router.get('/', verificarToken, vendaController.listarVendas);

/**
 * @swagger
 * /vendas:
 *   post:
 *     summary: Registra uma nova venda
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               produto_id:
 *                 type: integer
 *               quantidade:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Venda registrada
 *       400:
 *         description: Dados incompletos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao registrar venda
 */
router.post('/', verificarToken, vendaController.registrarVenda);

export default router;
