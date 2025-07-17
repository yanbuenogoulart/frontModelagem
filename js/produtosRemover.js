const cadUser = document.getElementById('removeProduto')
const resCad = document.getElementById('resDeleteProduto')

async function removerUser(e) {
    e.preventDefault()
    try {
        const id = document.getElementById('produtosRemoveID').value
        if (!id) {
            alert('Insira um ID válido ou existente!')
        }
        const response = await fetch(`http://localhost:3000/produtos/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
        if (!response) {
            alert('404! Usuáric com esse ID não existe!')
        }
        resCad.innerHTML = `Produto foi deletado com sucesso!`
        alert(`Produto foi deletado com sucesso!`)
        
    } catch (error) {
        console.error(error)
    }
}

cadUser.addEventListener('click', removerUser)