const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTurma = async (req, res) => {
  const { numero, nome } = req.body;

  // Verifique se os dados estão sendo passados corretamente
  if (!numero || !nome) {
    return res.status(400).json({ error: 'Número e nome da turma são obrigatórios' });
  }

  try {
    const novaTurma = await prisma.turma.create({
      data: {
        numero: numero,
        nome: nome,
      },
    });
    res.status(201).json(novaTurma); // Resposta com a turma criada
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cadastrar turma', details: error.message });
  }
};


// Função para listar todas as turmas
const read = async (req, res) => {
    try {
        const turmas = await prisma.turma.findMany(); // Busca todas as turmas
        return res.status(200).json(turmas); // Retorna todas as turmas
    } catch (error) {
        // Caso haja erro, retorna status 400
        return res.status(400).json({ error: error.message });
    }
};

// Função para excluir uma turma
const remove = async (req, res) => {
    try {
        // Exclui a turma com base no id fornecido na URL
        const turma = await prisma.turma.delete({
            where: { id: parseInt(req.params.id) }
        });

        // Retorna a turma excluída
        return res.status(200).json(turma);
    } catch (error) {
        // Se houver erro, retorna erro 400
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { createTurma, read, remove };
