const formulario = document.getElementById('formulario7')

async function loadData() {
  try {
    const response = await fetch('http://localhost:3000/produtos', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) throw new Error('Erro ao buscar produtos')

    const produtos = await response.json()

    // Filtra produtos com estoque < 10
    const produtosBaixoEstoque = produtos.filter(p => p.estoque < 10)

    if (produtosBaixoEstoque.length === 0) {
      formulario.innerHTML = '<tr><td colspan="3">Nenhum produto com estoque baixo.</td></tr>'
      return
    }

    produtosBaixoEstoque.forEach(produto => {
      const linha = document.createElement('tr')
      linha.innerHTML = `
        <td>${produto.titulo}</td>
        <td>${produto.estoque}</td>
        <td>${produto.categoria}</td>
      `
      formulario.appendChild(linha)
    })

  } catch (error) {
    console.error(error)
    formulario.innerHTML = '<tr><td colspan="3">Erro ao carregar os dados.</td></tr>'
  }
}

document.addEventListener('DOMContentLoaded', loadData)
