const cadProd = document.getElementById('searchProd')
const resCad = document.getElementById('resSearchProd')
const formulario = document.getElementById('formulario2')

function formatarData(data) {
    return data.slice(0,10)
}


async function buscarProdID(e) {
    e.preventDefault()
    try {
        formulario.innerHTML = ''
        const selection = document.getElementById('selectProd').value
        let api = null
        const id = document.getElementById('searchProdID').value
        if (selection == 'bscIDProd') {
            api = `http://localhost:3000/produtos/id/${id}`
            
        }else {
            api = `http://localhost:3000/produtos/nome/${id}`
        }
        console.log(selection)
        const response = await fetch(`${api}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })

        if (!response.ok) {
            if (response.status === 404) {
                alert('Produto com esse ID/NOME não existe!')
            } else {
                alert(`Erro ao buscar produto: ${response.status}`)
            }
            return
        }
        const dados = await response.json()
        const newRow = document.createElement('tr') 
        if (selection == "bscIDProd") {
            newRow.innerHTML = `
            <td>${dados.idProd}</td>
            <td>${dados.titulo}</td>
            <td>${dados.descricao}</td>
            <td>${dados.categoria}</td>
            <td>R$${dados.preco}</td>
            <td>${dados.desconto}%</td>
            <td>${dados.estoque}</td>
            <td>${dados.marca}</td>
            <td><img src="${dados.thumbnail}" alt="${dados.titulo}" style="max-width: 80px; border-radius: 4px;"></td>
            `
            formulario.appendChild(newRow)
        } else {
            for (i = 0; i < dados.length; i++) {
                const newRow2 = document.createElement('tr')
                newRow2.innerHTML = `
                    <td>${dados[i].idProd}</td>
                    <td>${dados[i].titulo}</td>
                    <td>${dados[i].descricao}</td>
                    <td>${dados[i].categoria}</td>
                    <td>R$${dados[i].preco}</td>
                    <td>${dados[i].desconto}%</td>
                    <td>${dados[i].estoque}</td>
                    <td>${dados[i].marca}</td>
                    <td><img src="${dados[i].thumbnail}" alt="${dados[i].titulo}" style="max-width: 80px; border-radius: 4px;"></td>
                `
                formulario.appendChild(newRow2)
            }
        }

        
    } catch (error) {
        console.error(error)
    }
}

cadProd.addEventListener('click', buscarProdID)