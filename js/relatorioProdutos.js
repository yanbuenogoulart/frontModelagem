const formulario = document.getElementById('formulario7')

function calcularValorFinal(preco, desconto) {
  if (!desconto) return preco
  return preco - (preco * desconto / 100)
}

async function loadData() {
  try {
    const response = await fetch('http://localhost:3000/produtos', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) throw new Error('Erro ao buscar produtos')

    const produtos = await response.json()

    produtos.forEach(produto => {
      const valorFinal = calcularValorFinal(produto.preco, produto.desconto)
      const linha = document.createElement('tr')

      linha.innerHTML = `
        <td>${produto.titulo}</td>
        <td>${produto.categoria}</td>
        <td>${produto.preco.toFixed(2)}</td>
        <td>${produto.desconto ?? 0}</td>
        <td>${valorFinal.toFixed(2)}</td>
      `

      formulario.appendChild(linha)
    })

  } catch (error) {
    console.error(error)
    formulario.innerHTML = '<tr><td colspan="5">Erro ao carregar os dados.</td></tr>'
  }
}

document.addEventListener('DOMContentLoaded', loadData)
