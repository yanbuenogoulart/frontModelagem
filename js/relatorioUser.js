const formulario = document.getElementById('formulario6')

async function loadData() {
  try {
    const response = await fetch('http://localhost:3000/usuarios', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    if (!response.ok) throw new Error('Erro ao buscar usuários')

    const usuarios = await response.json()

    usuarios.forEach(usuario => {
      const linha = document.createElement('tr')
      linha.innerHTML = `
        <td>${usuario.primeiroNome} ${usuario.sobreNome}</td>
        <td>${usuario.idade}</td>
        <td>${usuario.email}</td>
        <td>${usuario.cidade ?? '-'}</td>
        <td>${usuario.estado ?? '-'}</td>
      `
      formulario.appendChild(linha)
    })

  } catch (error) {
    console.error(error)
    formulario.innerHTML = '<tr><td colspan="5">Erro ao carregar os dados.</td></tr>'
  }
}

document.addEventListener('DOMContentLoaded', loadData)
