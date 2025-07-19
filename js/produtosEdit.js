const cadUser = document.getElementById('editProd')
const resCad = document.getElementById('resEditProd')

function formatarData(data) {
    return data.slice(0,10)
}


async function editarProd(e) {
    e.preventDefault()
    try {
        const dados = {
            idProd: document.getElementById('idProdEdit').value,
            titulo: document.getElementById('tituloProdEdit').value,
            descricao: document.getElementById('descricaoProdEdit').value,
            categoria: document.getElementById('categoriaProdEdit').value,
            preco: document.getElementById('precoProdEdit').value,
            desconto: document.getElementById('descontoProdEdit').value,
            estoque: document.getElementById('estoqueProdEdit').value,
            marca: document.getElementById('marcaProdEdit').value,
            thumbnail: document.getElementById('thumbnailProdEdit').value,
        }

        const response = await fetch(`http://localhost:3000/produtos/${dados.idProd}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })

        if (!response.ok) {
            if (response.status === 404) {
                alert('Produto com esse ID não existe!')
            } else {
                alert(`Erro ao buscar produto: ${response.status}`)
            }
            return
        }

        resCad.innerHTML = `
            Produto editado com sucesso!<br>
        <br>Id: ${dados.idProd}
        <br>Título: ${dados.titulo}
        <br>Descrição: ${dados.descricao}
        <br>Categoria: ${dados.categoria}
        <br>Preço: ${dados.preco}
        <br>Desconto: ${dados.desconto}
        <br>Estoque: ${dados.estoque}
        <br>Marca: ${dados.marca}
        <br>Thumbnail: ${dados.thumbnail}
            `
    } catch (error) {
        console.error(error)
    }
}

cadUser.addEventListener('click', editarProd)