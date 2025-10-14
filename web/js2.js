 let turmas = [];

        async function carregarTurmas() {
            try {
                const response = await fetch('http://localhost:3000/turma');
                if (response.ok) {
                    turmas = await response.json();
                    renderTurmas();
                } else {
                    alert('Erro ao carregar turmas');
                }
            } catch (error) {
                console.error('Erro ao carregar turmas:', error);
                alert('Erro ao carregar turmas');
            }
        }

        function renderTurmas() {
            const turmaTable = document.getElementById('turmaTable');
            turmaTable.innerHTML = '';
            turmas.forEach(turma => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${turma.numero}</td>
                    <td>${turma.nome}</td>
                    <td class="actions">
                        <button class="button view" onclick="visualizarTurma(${turma.id})">Visualizar</button>
                        <button class="button delete" onclick="excluirTurma(${turma.id})">Excluir</button>
                    </td>
                `;
                turmaTable.appendChild(row);
            });
        }

        document.getElementById('turmaForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const numero = document.getElementById('numero').value;
            const nome = document.getElementById('nome').value;
            try {
                const response = await fetch('http://localhost:3000/turma', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ numero, nome })
                });
                if (response.ok) {
                    alert('Turma cadastrada com sucesso!');
                    document.getElementById('modal').style.display = 'none';
                    carregarTurmas();
                } else {
                    const erro = await response.text();
                    alert('Erro ao cadastrar turma: ' + erro);
                }
            } catch (error) {
                console.error('Erro no cadastro da turma:', error);
                alert('Erro ao cadastrar turma');
            }
        });

        window.visualizarTurma = function(id) {
            window.location.href = `tarefas.html?id=${id}`;
        }

        window.excluirTurma = async function(id) {
            const confirmacao = confirm('Tem certeza que deseja excluir esta turma?');
            if (confirmacao) {
                try {
                    const response = await fetch(`http://localhost:3000/turma/${id}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        alert('Turma excluída com sucesso!');
                        carregarTurmas();
                    } else {
                        alert('Erro ao excluir turma');
                    }
                } catch (error) {
                    alert('Erro ao excluir turma');
                }
            }
        }

        document.getElementById('cadastrarTurmaButton').addEventListener('click', () => {
            document.getElementById('modal').style.display = 'block';
        });

        document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('modal').style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === document.getElementById('modal')) {
                document.getElementById('modal').style.display = 'none';
            }
        });

        document.getElementById('logoutButton').addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        carregarTurmas();