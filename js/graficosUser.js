const ctx = document.getElementById('graficoIdades').getContext('2d')
let grafico = null

async function buscarUsuarios() {
    const idInicio = parseInt(document.getElementById('idInicio').value)
    const idFim = parseInt(document.getElementById('idFim').value)

    try {
        const resposta = await fetch('http://localhost:3000/usuarios')
        if (!resposta.ok) {
            throw new Error(`Erro ao buscar usuários: ${resposta.status}`)
        }

        const usuarios = await resposta.json()

        // Filtra os usuários pelo intervalo de ID
        const filtrados = usuarios.filter(user =>
            user.idUser >= idInicio && user.idUser <= idFim
        )

        if (filtrados.length === 0) {
            alert('Nenhum usuário encontrado nesse intervalo de ID.')
            return
        }

        const labels = filtrados.map(user => `${user.primeiroNome} ${user.sobreNome} (ID: ${user.idUser})`)
        const idades = filtrados.map(user => user.idade)

        // Destroi gráfico anterior se existir
        if (grafico) {
            grafico.destroy()
        }

        // Cria novo gráfico
        grafico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Idade dos Usuários',
                    data: idades,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Idade'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Usuários (por ID)'
                        }
                    }
                }
            }
        })

    } catch (erro) {
        console.error(erro)
        alert('Erro ao buscar os dados da API.')
    }
}

// Eventos
document.getElementById('filtrarBtn').addEventListener('click', buscarUsuarios)
window.addEventListener('load', buscarUsuarios)
