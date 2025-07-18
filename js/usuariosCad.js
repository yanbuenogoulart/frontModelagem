const cadUser = document.getElementById('cadUser')
const resCad = document.getElementById('resCad')

function formatarData(data) {
    return data.slice(0,10)
}

async function cadastrarUser(e) {
    e.preventDefault()
    try {
        const dados = {
            primeiroNome: document.getElementById('primeiroNome').value,
            sobreNome: document.getElementById('sobreNome').value,
            idade: document.getElementById('idade').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            endereco: document.getElementById('endereco').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value,
            nascimento: document.getElementById('nascimento').value
        }

        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })

        const user = response.json()
        resCad.innerHTML = `
        Usuário cadastrado com sucesso!<br>
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

cadUser.addEventListener('click', cadastrarUser)