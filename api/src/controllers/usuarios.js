// src/controllers/usuarios.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (usuario && usuario.senha === senha) {
      req.session.isAuthenticated = true;
      return res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
      return res.status(401).json({ error: 'E-mail ou senha inválidos' });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}


// FUNÇÃO DE CADASTRO SIMPLIFICADA
async function cadastrarUsuario(req, res) {
    const { email, senha, nome } = req.body; // Assume que você está enviando nome, email, senha

    try {
        // 1. Verifica se o e-mail já está sendo usado
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { email: email },
        });

        if (usuarioExistente) {
            return res.redirect('/cadastro?error=email_exists');
        }

        // 2. CRIA O USUÁRIO (Salva a senha em texto simples, para fins do projeto fictício)
        await prisma.usuario.create({
            data: {
                email: email,
                senha: senha,
                nome: nome,
            },
        });

        console.log(`Usuário ${email} cadastrado com sucesso.`);
        
        // Redireciona para o login após o cadastro
        return res.redirect('/'); 

    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return res.redirect('/cadastro?error=server_error');
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