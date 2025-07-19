const editCom = document.getElementById('editCom')
const resEditCom = document.getElementById('resEditCom')

function formatarData(data) {
    return data.slice(0,10)
}

async function editarCom(e) {
    e.preventDefault()
    try {
        const dados = {
            idCompras: document.getElementById('idComEdit').value,
            idUsuario: document.getElementById('idUserComEdit').value,
            idProduto: document.getElementById('idProdComEdit').value,
            quantidade: document.getElementById('quantidadeComEdit').value,
            dataCompra: document.getElementById('dataCompraComEdit').value,
            precoUnitario: 0, 
            descontoAplicado: 0, 
            precoFinal: 0,
            formaPagamento: document.getElementById('formaPagamentoComEdit').value,
            statusCompra: document.getElementById('statusCompraComEdit').value,
        }
        console.log(dados)

        const responseProd = await fetch(`http://localhost:3000/produtos/id/${dados.idProduto}`, {
            method: 'GET',
        })
        if (!responseProd.ok) {
            if (responseProd.status === 404) {
                alert('Produto com esse ID não existe!')
            } else {
                alert(`Erro ao buscar produto: ${responseProd.status}`)
            }
            return
        }

        const responseUser = await fetch(`http://localhost:3000/usuarios/id/${dados.idUsuario}`, {
            method: 'GET',
        })
        if (!responseUser.ok) {
            if (responseUser.status === 404) { 
                alert('Usuário com esse ID não existe!')
            } else {
                alert(`Erro ao buscar usuário: ${responseUser.status}`)
            }
            return
        }
            
        const produto = await responseProd.json()
        dados.precoUnitario = produto.preco
        dados.descontoAplicado = produto.desconto
        dados.precoFinal = parseFloat((produto.preco - (produto.preco * (produto.desconto / 100))).toFixed(2))
        console.log(dados)

        const response = await fetch(`http://localhost:3000/compras/${dados.idCompras}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })

        if (!response.ok) {
            if (response.status === 404) {
                alert('Compra com esse ID não existe!')
            } else {
                alert(`Erro ao editar compra: ${response.status}`)
            }
            return
        }

        // Aqui você mostra os dados da compra editada, não do produto
        resEditCom.innerHTML = `
            Compra editada com sucesso!<br>
            <br>ID Compra: ${dados.idCompras}
            <br>ID Usuário: ${dados.idUsuario}
            <br>ID Produto: ${dados.idProduto}
            <br>Quantidade: ${dados.quantidade}
            <br>Data da Compra: ${formatarData(dados.dataCompra)}
            <br>Preço Unitário: R$ ${dados.precoUnitario.toFixed(2)}
            <br>Desconto Aplicado: ${dados.descontoAplicado}%
            <br>Preço Final: R$ ${dados.precoFinal.toFixed(2)}
            <br>Forma de Pagamento: ${dados.formaPagamento}
            <br>Status: ${dados.statusCompra}
        `
    } catch (error) {
        console.error(error)
    }
}

editCom.addEventListener('click', editarCom)
