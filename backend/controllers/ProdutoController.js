import connection from '../config/db'

export const create = (req, res) => {
  const { nome, preco, quantidade, descricao } = req.body;
  const sql = "INSERT INTO produtos (nome, preco, quantidade, descricao) VALUES (?, ?, ? ,?)";
  
  connection.query(sql, [nome, preco, quantidade, descricao], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      res.status(201).send({ message: 'Produto incluído com sucesso', id: result.insertId });
    }
  });
};

export const readOne = (req, res) => {
    const id = req.params.id
    const sql = "SELECT * FROM produtos WHERE id = " + id;
    connection.query(sql, (error, rows) => {
        if(error) res.status(500).send(error);
        else res.status(200).send(rows);
    });
}

export const readAll = (req, res) => {
    const sql = "SELECT * FROM produtos"
    connection.query(sql, (error, rows) => {
        if(error) res.status(500).send(error);
        else res.status(200).send(rows)
    })
}

export const update = (req, res) => {
    const id = req.params.id;
    const { nome, preco, quantidade, descricao } = req.body;
    const sql = "UPDATE produtos SET nome = ?, preco = ?, quantidade = ?, descricao = ? WHERE id = ?";

    connection.query(sql, [nome, preco, quantidade, descricao, id], (error, result) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send({ message: 'Produto atualizado com sucesso', affectedRows: result.affectedRows });
        }
    });
};

export const remove = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM produtos\ WHERE id = ?";

    connection.query(sql, [id], (error, result) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send({ message: 'Produto removido com sucesso', affectedRows: result.affectedRows });
        }
    });
};