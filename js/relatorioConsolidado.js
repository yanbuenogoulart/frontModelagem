const formulario = document.getElementById('formulario7')

function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR')
}

async function loadData() {
  try {
    const response = await fetch('http://localhost:3000/compras', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) throw new Error('Erro ao buscar compras')

    const compras = await response.json()

    for (const compra of compras) {
      // Busca usuário e produto para cada compra
      const [resUser, resProd] = await Promise.all([
        fetch(`http://localhost:3000/usuarios/id/${compra.idUsuario}`),
        fetch(`http://localhost:3000/produtos/id/${compra.idProduto}`)
      ])

      if (!resUser.ok || !resProd.ok) {
        console.warn('Erro ao buscar dados relacionados para compra id:', compra.idCompras)
        continue
      }

      const usuario = await resUser.json()
      const produto = await resProd.json()

      const linha = document.createElement('tr')
      linha.innerHTML = `
        <td>${usuario.primeiroNome} ${usuario.sobreNome}</td>
        <td>${produto.titulo}</td>
        <td>${compra.quantidade}</td>
        <td>${formatarData(compra.dataCompra)}</td>
        <td>R$ ${compra.precoFinal.toFixed(2)}</td>
        <td>${compra.formaPagamento}</td>
        <td>${compra.statusCompra}</td>
      `

      formulario.appendChild(linha)
    }
  } catch (error) {
    console.error(error)
    formulario.innerHTML = '<tr><td colspan="7">Erro ao carregar os dados.</td></tr>'
  }
}

document.addEventListener('DOMContentLoaded', loadData)
