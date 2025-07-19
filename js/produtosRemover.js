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
        if (!response.ok) {
            if (response.status === 404) {
                alert('Produto com esse ID não existe!')
            } else {
                alert(`Erro ao deletar Produto: ${response.status}`)
            }
            return
        }
        resCad.innerHTML = `Produto foi deletado com sucesso!`
        alert(`Produto foi deletado com sucesso!`)
        
    } catch (error) {
        console.error(error)
    }
}

cadUser.addEventListener('click', removerUser)