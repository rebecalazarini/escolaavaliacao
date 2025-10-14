// src/controllers/usuarios.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function login(req, res) {
  try {
    const { email, senha } = req.body;

    // Procura o usuário no banco de dados usando o e-mail
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    // Se o usuário existe e a senha bate
    if (usuario && usuario.senha === senha) {
      // Aqui, você apenas retorna uma resposta simples.
      return res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
      // Se falhar, retorna um erro de 'Unauthorized'
      return res.status(401).json({ error: 'E-mail ou senha inválidos' });
    }
  } catch (error) {
    // Se houver erro no banco de dados ou outro erro, retorna erro interno
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

// Função de cadastro (caso necessário)
async function cadastrarUsuario(req, res) {
  const { email, senha, nome } = req.body;

  try {
    // Verifica se o e-mail já está em uso
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: email }
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'E-mail já está em uso' });
    }

    // Criação de usuário (sem encriptação da senha, apenas para fins simples)
    await prisma.usuario.create({
      data: {
        email: email,
        senha: senha,
        nome: nome,
      },
    });

    console.log(`Usuário ${email} cadastrado com sucesso.`);
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
}


// FUNÇÃO DE LOGOUT
function logout(req, res) {
    req.session.destroy(err => {
        if (err) console.error("Erro ao destruir sessão:", err);
        res.redirect('/'); // Redireciona para a tela de login
    });
}

module.exports = {
    login,
    logout,
    cadastrarUsuario 
};