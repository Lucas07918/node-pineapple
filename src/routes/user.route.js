const { Router } = require("express");
const userRoute = Router();
let dbMock = [];

userRoute.get("/user", (_request, response) => {
  return response.status(200).json(dbMock);
});

/**
 * Param exemple.
 * @param {number} id - The title of the book.
 */
userRoute.get("/user/:id", (request, response) => {
  const { id } = request.params;

  if (id) {
    const filter = dbMock.filter((item) => Number.parseInt(id) === item.id);
    return response.status(200).json(filter);
  }
  return response.status(200).json(dbMock);
});

/**
 * Param exemple.
 * @param {number} id - The title of the book.
 */
userRoute.put("/user/:id", (request, response) => {
  const { id } = request.params;
  const { nome, email, senha, data_nasc, cpf, cep, telefone, genero } =
    request.body;
  dbMock = dbMock.map((item) => {
    if (Number.parseInt(id) === item.id) {
      item.nome = nome;
      item.email = email;
      item.senha = senha;
      item.data_nasc = data_nasc;
      item.cpf = cpf;
      item.cep = cep;
      item.telefone = telefone;
      item.genero = genero;
    }
    return item;
  });
  return response.status(200).json({ message: "Atualizado com sucesso!" });
});

userRoute.post("/user", (request, response) => {
  const { nome, email, senha, data_nasc, cpf, cep, telefone, genero } =
    request.body;
  const id = dbMock.length;
  dbMock.push({
    id,
    nome,
    email,
    senha,
    data_nasc,
    cpf,
    cep,
    telefone,
    genero,
  });
  return response.status(201).json({ message: "Adicionado com sucesso!" });
});

/**
 * Param exemple.
 * @param {number} id - The title of the book.
 */
userRoute.delete("/user/:id", (request, response) => {
  const { id } = request.params;
  dbMock = dbMock.filter((item, index) => Number.parseInt(id) !== item.id);
  return response.status(200).json({ message: "Deletado com sucesso!" });
});

module.exports = { userRoute };
