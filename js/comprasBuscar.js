const cadCom = document.getElementById('searchCom')
const resCad = document.getElementById('resSearchCom')
const formulario = document.getElementById('formulario4')

function formatarData(data) {
    return data.slice(0,10)
}


async function buscarComID(e) {
    e.preventDefault()
    try {
        formulario.innerHTML = ''
        const id = document.getElementById('searchComID').value
        let api = `http://localhost:3000/compras/id/${id}`
        const response = await fetch(`${api}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })

        if (!response.ok) {
            if (response.status === 404) {
                alert('Compra com esse ID não existe!')
            } else {
                alert(`Erro ao deletar compra: ${response.status}`)
            }
            return
        }
        const compras = await response.json()
        const newRow = document.createElement('tr') 

            newRow.innerHTML = `
            <td>${compras.idCompras}</td>
            <td>${compras.idUsuario}</td>
            <td>${compras.idProduto}</td>
            <td>${compras.quantidade}</td>
            <td>${formatarData(compras.dataCompra)}</td>
            <td>R$${compras.precoUnitario}</td>
            <td>${compras.descontoAplicado}%</td>
            <td>R$${compras.precoFinal}</td>
            <td>${compras.formaPagamento}</td>
            <td>${compras.statusCompra}</td>
            `
            formulario.appendChild(newRow)
        } catch (error) {
        console.error(error)
    }
}

cadCom.addEventListener('click', buscarComID)