import db from '../config/db.js'

export const listarVendas = (req, res) => {
  const sql = `
    SELECT v.id, p.nome AS produto_nome, v.quantidade, v.data
    FROM vendas v
    JOIN produtos p ON v.produto_id = p.id
    ORDER BY v.data DESC
  `;

  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ erro: 'Erro ao buscar vendas' });
    }
    res.json(results);
  });
};

export const registrarVenda = (req, res) => {
  const { produto_id, quantidade } = req.body;
  if (!produto_id || !quantidade) {
    return res.status(400).json({ erro: 'Dados incompletos' });
  }

  const insertSql = 'INSERT INTO vendas (produto_id, quantidade, data) VALUES (?, ?, NOW())';
  const updateSql = 'UPDATE produtos SET quantidade = quantidade - ? WHERE id = ?';

  db.query(insertSql, [produto_id, quantidade], (error) => {
    if (error) {
      return res.status(500).json({ erro: 'Erro ao registrar venda' });
    }

    db.query(updateSql, [quantidade, produto_id], (error) => {
      if (error) {
        return res.status(500).json({ erro: 'Erro ao atualizar estoque' });
      }

      res.status(201).json({ mensagem: 'Venda registrada' });
    });
  });
};
