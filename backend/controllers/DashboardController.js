import db from '../config/db.js';

export const resumoDashboard = (req, res) => {
  const dados = { totalVendas: 0, faturamento: 0, produtos: 0, maisVendidos: [], estoqueDistribuido: [] };

  db.query('SELECT COUNT(*) AS total FROM vendas', (err, vendas) => {
    if (err) return res.status(500).json({ erro: 'Erro total de vendas' });
    dados.totalVendas = vendas[0]?.total || 0;

    db.query(`
      SELECT SUM(p.preco * v.quantidade) AS total
      FROM vendas v JOIN produtos p ON v.produto_id = p.id
    `, (err, fat) => {
      if (err) return res.status(500).json({ erro: 'Erro no faturamento' });
      dados.faturamento = fat[0]?.total || 0;

      db.query('SELECT COUNT(*) AS total FROM produtos', (err, produtos) => {
        if (err) return res.status(500).json({ erro: 'Erro total produtos' });
        dados.produtos = produtos[0]?.total || 0;

        db.query(`
          SELECT p.nome, SUM(v.quantidade) as quantidade
          FROM vendas v
          JOIN produtos p ON v.produto_id = p.id
          GROUP BY p.nome
          ORDER BY quantidade DESC
          LIMIT 5
        `, (err, maisVendidos) => {
          if (err) return res.status(500).json({ erro: 'Erro nos mais vendidos' });
          dados.maisVendidos = maisVendidos;

          db.query(`
            SELECT nome, quantidade FROM produtos WHERE quantidade > 0
          `, (err, estoque) => {
            if (err) return res.status(500).json({ erro: 'Erro no estoque' });
            dados.estoqueDistribuido = estoque;

            console.log('📊 Resumo gerado:', dados);
            res.json(dados);
          });
        });
      });
    });
  });
};
