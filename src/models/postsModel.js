import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão fornecida
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
  // Obtém o banco de dados 'imersao-backend' e a coleção 'posts'
  const db = conexao.db("imersao-backend");
  const colecao = db.collection("posts");
  // Retorna um array com todos os documentos da coleção
  return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-backend");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  const db = conexao.db("imersao-backend");
  const colecao = db.collection("posts");
  const objId = ObjectId.createFromHexString(id)
  return colecao.updateOne({_id: new ObjectId(objId)},{$set: novoPost});
}