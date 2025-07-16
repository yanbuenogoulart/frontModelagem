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
        const user = await response.json()
        if (!response) {
            alert('404! Usuáric com esse ID não existe!')
        }
        resCad.innerHTML = `Usuário ${user.primeiroNome} ${user.sobreNome} foi deletado com sucesso!`
        alert(`Usuário ${user.primeiroNome} ${user.sobreNome} foi deletado com sucesso!`)
        
    } catch (error) {
        console.error(error)
    }
}

cadUser.addEventListener('click', removerUser)