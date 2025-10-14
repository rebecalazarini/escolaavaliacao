const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { numero, nome, turmaId } = req.body;  // Recebe o ID da turma no corpo da requisição

        // Verifica se já existe uma tarefa com o mesmo número
        const existingTarefa = await prisma.tarefa.findFirst({
            where: { numero: numero },
        });
        if (existingTarefa) {
            return res.status(400).json({ error: 'Tarefa com esse número já existe.' });
        }

        // Criação da tarefa, associando diretamente o turmaId
        const tarefa = await prisma.tarefa.create({
            data: {
                numero: numero,   // Número da tarefa
                nome: nome,       // Nome da tarefa
                turmaId: turmaId,  // Associando à turma com o ID
            },
        });

        return res.status(201).json({
            id: tarefa.id,
            numero: tarefa.numero,
            nome: tarefa.nome,
            turmaId: tarefa.turmaId,  // Devolva o ID da Turma associada
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Erro ao criar tarefa', details: error.message });
    }
};
const read = async (req, res) => {
    try {
        const tarefas = await prisma.tarefa.findMany(); 
        return res.status(200).json(tarefas); 
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const tarefa = await prisma.tarefa.delete({
            where: { id: parseInt(req.params.id) }
        });

        return res.status(200).json(tarefa);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { create, read, remove };
