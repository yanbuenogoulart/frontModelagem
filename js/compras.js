const formulario = document.getElementById('formulario3')

function formatarData(data) {
    return data.slice(0,10)
}

async function loadData() {
    try {
        console.log("iniciando")
        const response = await fetch('http://localhost:3000/compras', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        
        if (!response.ok) {
            console.error('erro')
        }
    
        const compras = await response.json()
        
        compras.forEach(compras => {
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
        })
    } catch (error) {
        console.error(error)
        innerHTML = 'erro!!'
    }
} 



// rodar a funçao quando a página carregar
document.addEventListener("DOMContentLoaded", loadData())