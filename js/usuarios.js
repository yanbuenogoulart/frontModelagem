const formulario = document.getElementById('formulario')

async function loadData() {
    try {
        console.log("iniciando")
        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        
        if (!response.ok) {
            console.error('erro')
        }
    
        const users = await response.json()
        
        users.forEach(user => {
            const newRow = document.createElement('tr') 
            newRow.innerHTML = `
            <td>${user.idUser}</td>
            <td>${user.primeiroNome}</td>
            <td>${user.sobreNome}</td>
            <td>${user.idade}</td>
            <td>${user.email}</td>
            <td>${user.endereco}</td>
            <td>${user.cidade}</td>
            <td>${user.estado}</td>
            <td>${user.nascimento}</td>
            `
            formulario.appendChild(newRow)
        })
    } catch (error) {
        console.error(error)
        innerHTML = 'erro!!'
    }
} 



// rodar a funçao quando a página carregar
document.addEventListener("DOMContentLoaded", loadData())