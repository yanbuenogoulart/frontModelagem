const cadUser = document.getElementById('editUser')
const resCad = document.getElementById('resEditUser')

function formatarData(data) {
    return data.slice(0,10)
}


async function editarUser(e) {
    e.preventDefault()
    try {
        const dados = {
            idUser: document.getElementById('userIdEdit').value,
            primeiroNome: document.getElementById('primeiroNomeEdit').value,
            sobreNome: document.getElementById('sobreNomeEdit').value,
            idade: document.getElementById('idadeEdit').value,
            email: document.getElementById('emailEdit').value,
            telefone: document.getElementById('telefoneEdit').value,
            endereco: document.getElementById('enderecoEdit').value,
            cidade: document.getElementById('cidadeEdit').value,
            estado: document.getElementById('estadoEdit').value,
            nascimento: document.getElementById('nascimentoEdit').value
        }

        const response = await fetch(`http://localhost:3000/usuarios/${dados.idUser}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })

        const user = response.json()
        resCad.innerHTML = `
            Usuário editado com sucesso!<br>
            <br>Id: ${dados.idUser}
            <br>Nome: ${dados.primeiroNome}
            <br>Sobrenome: ${dados.sobreNome}
            <br>Idade: ${dados.idade}
            <br>Email: ${dados.email}
            <br>Endereço: ${dados.endereco}
            <br>Cidade: ${dados.cidade}
            <br>Estado: ${dados.estado}
            <br>Nascimento: ${formatarData(dados.nascimento)}
            `
    } catch (error) {
        console.error(error)
    }
}

cadUser.addEventListener('click', editarUser)