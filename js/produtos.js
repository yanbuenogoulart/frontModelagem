const formulario = document.getElementById('formulario')

function formatarData(data) {
    return data.slice(0,10)
}

async function loadData() {
    try {
        console.log("iniciando")
        const response = await fetch('http://localhost:3000/produtos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        
        if (!response.ok) {
            console.error('erro')
        }
    
        const produtos = await response.json()
        
        produtos.forEach(produto => {
            const newRow = document.createElement('tr') 
            newRow.innerHTML = `
            <td>${produto.idProd}</td>
            <td>${produto.titulo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.categoria}</td>
            <td>R$${produto.preco}</td>
            <td>${produto.desconto}%</td>
            <td>${produto.estoque}</td>
            <td>${produto.marca}</td>
            <td><img src="${produto.thumbnail}" alt="${produto.titulo}" style="max-width: 80px; border-radius: 4px;"></td>
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