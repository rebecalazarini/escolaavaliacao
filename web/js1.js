document.addEventListener('DOMContentLoaded', () => {
			const form = document.getElementById('loginForm');

			form.addEventListener('submit', async (event) => {
				event.preventDefault(); 

				const email = document.getElementById('Email').value;
				const password = document.getElementById('password').value;
				const response = await fetch('http://localhost:3000/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, senha: password })
				});

				if (response.ok) {
					window.location.href = 'telaprof.html'; 
				} else {
					alert('Erro no login, tente novamente.');
				}
			});
		});