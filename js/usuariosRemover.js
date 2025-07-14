const cadUser = document.getElementById('removeUser')
const resCad = document.getElementById('resEditUser')

async function removerUser(e) {
    e.preventDefault()
    try {
        const id = document.getElementById('userRemoveID').value
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
        resCad.innerHTML = `usuário deletado com sucesso`

        
    } catch (error) {
        console.error(error)
    }
}

cadUser.addEventListener('click', removerUser)