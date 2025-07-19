const cadUser = document.getElementById('searchUser')
const resCad = document.getElementById('resSearchUser')
const formulario = document.getElementById('formulario2')

function formatarData(data) {
    return data.slice(0,10)
}


async function buscarUserID(e) {
    e.preventDefault()
    try {
        formulario.innerHTML = ''
        const selection = document.getElementById('selectUser').value
        let api = null
        const id = document.getElementById('searchUserID').value
        if (selection == 'bscID') {
            api = `http://localhost:3000/usuarios/id/${id}`
            
        }else {
            api = `http://localhost:3000/usuarios/nome/${id}`
        }
        console.log(selection)
        const response = await fetch(`${api}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })

        if (!response.ok) {
            if (response.status === 404) {
                alert('Usuário com esse ID/NOME não existe!')
            } else {
                alert(`Erro ao buscar Usuário: ${response.status}`)
            }
            return
        }
        const user = await response.json()
        console.log(user)
        const newRow = document.createElement('tr') 
        if (selection == "bscID") {
            newRow.innerHTML = `
            <td>${user.idUser}</td>
            <td>${user.primeiroNome}</td>
            <td>${user.sobreNome}</td>
            <td>${user.idade}</td>
            <td>${user.email}</td>
            <td>${user.endereco}</td>
            <td>${user.cidade}</td>
            <td>${user.estado}</td>
            <td>${formatarData(user.nascimento)}</td>
            `
            formulario.appendChild(newRow)
        } else {
            console.log(user.length)
            for (i = 0; i < user.length; i++) {
                const newRow2 = document.createElement('tr')
                newRow2.innerHTML = `
                    <td>${user[i].idUser}</td>
                    <td>${user[i].primeiroNome}</td>
                    <td>${user[i].sobreNome}</td>
                    <td>${user[i].idade}</td>
                    <td>${user[i].email}</td>
                    <td>${user[i].endereco}</td>
                    <td>${user[i].cidade}</td>
                    <td>${user[i].estado}</td>
                    <td>${formatarData(user[i].nascimento)}</td>
                `
                formulario.appendChild(newRow2)
            }
        }

        
    } catch (error) {
        console.error(error)
    }
}

cadUser.addEventListener('click', buscarUserID)