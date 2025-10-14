const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para criar uma nova tarefa
const create = async (req, res) => {
    try {
        const { numero, nome } = req.body;  // numero e nome da tarefa

        // Verifica se já existe uma tarefa com o mesmo numero
        const existingTarefa = await prisma.tarefa.findFirst({
            where: { numero: numero }, // Usando findFirst ao invés de findUnique
        });

        // Se já existir, retorna erro 400 (bad request)
        if (existingTarefa) {
            return res.status(400).json({ error: 'Tarefa com esse numero já existe.' });
        }

        // Cria a nova tarefa
        const tarefa = await prisma.tarefa.create({
            data: {
                numero: numero,
                nome: nome, 
            },
        });

        // Retorna a tarefa criada
        return res.status(201).json({ id: tarefa.id, numero: tarefa.numero, nome: tarefa.nome });

    } catch (error) {
        return res.status(400).json({ error: 'Erro ao criar tarefa', details: error.message });
    }
};

// Função para listar todas as tarefas
const read = async (req, res) => {
    try {
        const tarefas = await prisma.tarefa.findMany(); // Busca todas as tarefas
        return res.status(200).json(tarefas); // Retorna todas as tarefas
    } catch (error) {
        // Caso haja erro, retorna status 400
        return res.status(400).json({ error: error.message });
    }
};

// Função para excluir uma tarefa
const remove = async (req, res) => {
    try {
        // Exclui a tarefa com base no id fornecido na URL
        const tarefa = await prisma.tarefa.delete({
            where: { id: parseInt(req.params.id) }
        });

        // Retorna a tarefa excluída
        return res.status(200).json(tarefa);
    } catch (error) {
        // Se houver erro, retorna erro 400
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { create, read, remove };
