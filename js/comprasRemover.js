const cadUser = document.getElementById('removeCom')
const resCad = document.getElementById('resDeleteCom')

async function removerUser(e) {
    e.preventDefault()
    try {
        const id = document.getElementById('comRemoveID').value
        if (!id) {
            alert('Insira um ID válido ou existente!')
        }
        const response = await fetch(`http://localhost:3000/compras/${id}`, {
            method: 'DELETE',
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

        resCad.innerHTML = `Compra foi deletada com sucesso!`
        alert(`Compra foi deletada com sucesso!`)
        
    } catch (error) {
        console.error(error)
    }
}

cadUser.addEventListener('click', removerUser)