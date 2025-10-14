 function Voltar() {
        window.location.href = "telaprof.html"
    }

    const params = new URLSearchParams(window.location.search);
    const turmaId = params.get('id');
    let tarefas = [];
    const modal = document.getElementById("modal");
    const openModalButton = document.getElementById("openModalButton");
    const closeModalButton = document.getElementById("closeModalButton");

    openModalButton.onclick = function () {
        modal.style.display = "block";
    }

    closeModalButton.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    async function carregarTarefas() {
        try {
            const response = await fetch(`http://localhost:3000/tarefa?turmaId=${turmaId}`);
            if (response.ok) {
                tarefas = await response.json();
                renderTarefas();
            } else {
                alert('Erro ao carregar tarefas');
            }
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
            alert('Erro ao carregar tarefas');
        }
    }
    function renderTarefas() {
        const tarefaTable = document.getElementById('tarefaTable');
        tarefaTable.innerHTML = '';

        tarefas.forEach(tarefa => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${tarefa.numero}</td>
                <td>${tarefa.nome}</td>
                <td>${tarefa.turmaId}</td>
                <td class="actions">
                    <button class="button delete" onclick="excluirTarefa(${tarefa.id})">Excluir</button>
                </td>
            `;
            tarefaTable.appendChild(row);
        });
    }
    async function excluirTarefa(id) {
        const confirmacao = confirm('Tem certeza que deseja excluir esta tarefa?');
        if (confirmacao) {
            try {
                const response = await fetch(`http://localhost:3000/tarefa/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert('Tarefa excluída com sucesso!');
                    carregarTarefas();
                } else {
                    alert('Erro ao excluir tarefa');
                }
            } catch (error) {
                alert('Erro ao excluir tarefa');
            }
        }
    }
    document.getElementById('saveTarefaButton').onclick = async function () {
        const numeroTarefa = document.getElementById('numeroTarefa').value;
        const nomeTarefa = document.getElementById('nomeTarefa').value;

        if (!numeroTarefa || !nomeTarefa) {
            alert("Preencha todos os campos!");
            return;
        }

        const novaTarefa = {
            numero: numeroTarefa,
            nome: nomeTarefa,
            turmaId: parseInt(turmaId)
        };

        try {
            const response = await fetch('http://localhost:3000/tarefa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novaTarefa),
            });

            if (response.ok) {
                alert('Tarefa cadastrada com sucesso!');
                modal.style.display = 'none';
                carregarTarefas();
            } else {
                alert('Erro ao cadastrar tarefa');
            }
        } catch (error) {
            console.error('Erro ao salvar tarefa:', error);
            alert('Erro ao salvar tarefa');
        }
    };

    document.getElementById('logoutButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    carregarTarefas();