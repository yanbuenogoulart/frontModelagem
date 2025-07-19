const formulario = document.getElementById('formulario5')

function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR')
}

async function loadData() {
  try {
    const response = await fetch('http://localhost:3000/compras', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (!response.ok) throw new Error('Erro ao buscar compras')
        
        const compras = await response.json()
        console.log(compras)

    compras.forEach( async compra => {
        const responseUser = await fetch(`http://localhost:3000/usuarios/id/${compra.idUsuario}`)
        const responseProd = await fetch(`http://localhost:3000/produtos/id/${compra.idProduto}`)
        const usuario = await responseUser.json()
        const produto = await responseProd.json()
        console.log(usuario, produto)
      const linha = document.createElement('tr')
      linha.innerHTML += `
        <td>${compra.idCompras}</td>
        <td>${usuario.primeiroNome} ${usuario.sobreNome}</td>
        <td>${produto.titulo}</td>
        <td>${compra.quantidade}</td>
        <td>${formatarData(compra.dataCompra)}</td>
        <td>R$ ${compra.precoFinal.toFixed(2)}</td>
      `
      formulario.appendChild(linha)
    })

  } catch (error) {
    console.error(error)
    formulario.innerHTML = '<tr><td colspan="6">Erro ao carregar os dados.</td></tr>'
  }
}

document.addEventListener('DOMContentLoaded', loadData)
