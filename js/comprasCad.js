const cadCom = document.getElementById('cadCom')
const resCadCom = document.getElementById('resCadCom')

async function cadastrarCom(e) {
    e.preventDefault()
    try {
        const dados = {
            idUsuario: document.getElementById('idUserCom').value,
            idProduto: document.getElementById('idProdCom').value,
            quantidade: document.getElementById('quantidadeCom').value,
            dataCompra: document.getElementById('dataCompraCom').value,
            precoUnitario: 0, 
            descontoAplicado: 0, 
            precoFinal: 0,
            formaPagamento: document.getElementById('formaPagamentoCom').value,
            statusCompra: document.getElementById('statusCompraCom').value,
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
        dados.precoFinal = ((produto.preco - (produto.preco * (produto.desconto / 100))) * dados.quantidade).toFixed(2);


        const response = await fetch('http://localhost:3000/compras', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })

        if (!response.ok) {
            alert(`Erro ao cadastrar compra: ${response.status}`)
            return
        }
        const compras = await response.json()
        resCadCom.innerHTML = `
        Compra cadastrada com sucesso!<br>
            <td>${compras.idCompras}</td>
            <td>${compras.idUsuario}</td>
            <td>${compras.idProduto}</td>
            <td>${compras.quantidade}</td>
            <td>R$${compras.dataCompra}</td>
            <td>${compras.precoUnitario}%</td>
            <td>${compras.descontoAplicado}</td>
            <td>${compras.precoFinal}</td>
            <td>${compras.formaPagamento}</td>
            <td>${compras.statusCompra}</td>
            `
    } catch (error) {
        console.error(error)
    }
}

cadCom.addEventListener('click', cadastrarCom)