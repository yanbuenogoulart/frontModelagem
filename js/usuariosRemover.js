const cadUser = document.getElementById('removeUser')
const resCad = document.getElementById('resDeleteUser')

async function removerUser(e) {
    e.preventDefault()
    try {
        const id = document.getElementById('userRemoveID').value
        if (!id) {
            alert('Insira um ID válido ou existente!')
        }
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
        
        if (!response.ok) {
            if (response.status === 404) {
                alert('Usuário com esse ID não existe!')
            } else {
                alert(`Erro ao deletar Usuário: ${response.status}`)
            }
            return
        }
        resCad.innerHTML = `Usuário foi deletado com sucesso!`
        alert(`Usuário foi deletado com sucesso!`)
        
    } catch (error) {
        console.error(error)
    }
}

cadUser.addEventListener('click', removerUser)