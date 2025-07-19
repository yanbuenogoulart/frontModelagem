const ctx = document.getElementById('graficoEstoque').getContext('2d')
let grafico = null

async function buscarProdutos() {
    const idInicio = Number(document.getElementById('idInicio').value)
    const idFim = Number(document.getElementById('idFim').value)

    if (isNaN(idInicio) || isNaN(idFim)) {
        alert('Informe corretamente o intervalo de IDs.')
        return
    }

    try {
        const resposta = await fetch('http://localhost:3000/produtos')
        if (!resposta.ok) throw new Error(`Erro na requisição: ${resposta.status}`)

        const produtos = await resposta.json()

        // CONFIRA AQUI: Filtrar com base em idProd
        const filtrados = produtos.filter(prod =>
            prod.idProd >= idInicio && prod.idProd <= idFim
        )

        if (filtrados.length === 0) {
            alert('Nenhum produto encontrado nesse intervalo de ID.')
            return
        }

        const labels = filtrados.map(prod => `${prod.titulo} (ID ${prod.idProd})`)
        const estoques = filtrados.map(prod => prod.estoque)

        // Destrói gráfico anterior se existir
        if (grafico) grafico.destroy()

        grafico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Estoque por Produto',
                    data: estoques,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Estoque'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Produtos (por ID)'
                        }
                    }
                }
            }
        })

    } catch (erro) {
        console.error(erro)
        alert('Erro ao buscar os produtos.')
    }
}

document.getElementById('filtrarBtn').addEventListener('click', buscarProdutos)
window.addEventListener('load', buscarProdutos)
