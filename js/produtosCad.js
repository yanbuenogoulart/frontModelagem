const cadUser = document.getElementById('cadProd')
const resCadProd = document.getElementById('resCadProd')

async function cadastrarProd(e) {
    e.preventDefault()
    try {
        const dados = {
            titulo: document.getElementById('tituloProd').value,
            descricao: document.getElementById('descricaoProd').value,
            categoria: document.getElementById('categoriaProd').value,
            preco: document.getElementById('precoProd').value,
            desconto: document.getElementById('descontoProd').value,
            estoque: document.getElementById('estoqueProd').value,
            marca: document.getElementById('marcaProd').value,
            thumbnail: document.getElementById('thumbnailProd').value,
        }

        const response = await fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })

        resCadProd.innerHTML = `
        Usuário cadastrado com sucesso!<br>
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

cadProd.addEventListener('click', cadastrarProd)