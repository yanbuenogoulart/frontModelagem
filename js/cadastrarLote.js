const botao = document.getElementById('botaoDB');
const cadUser = document.getElementById('cadUser')
const resLote = document.getElementById('resLote')

botao.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        // puxar os dados
        const responseUser = await fetch('https://dummyjson.com/users');
        //  transformar dados em json
        const { users } = await responseUser.json();
        console.log('iniciando')

        // percorrer os dados e enviar para o banco de dados
        for (let i = 0; i < users.length; i++) {
            const dadosUser = {
                primeiroNome: users[i].firstName,
                sobreNome: users[i].lastName,
                idade: users[i].age,
                email: users[i].email,
                telefone: users[i].phone,
                endereco: users[i].address.address,
                cidade: users[i].address.city,
                estado: users[i].address.state,
                nascimento: users[i].birthDate
            };

            await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosUser)
            });

            
        }
        // percorrer os dados de produtos e enviar para o banco de dados
        const responseProduct = await fetch('https://dummyjson.com/products');
        const { products } = await responseProduct.json();
        for (let i = 0; i < products.length; i++) {
            const dadosProducts = {
                titulo: products[i].title,
                descricao: products[i].description,
                categoria: products[i].category,
                preco: products[i].price,
                desconto: products[i].discountPercentage,
                estoque: products[i].stock,
                marca: products[i].brand,
                thumbnail: products[i].thumbnail
            }
            await fetch('http://localhost:3000/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosProducts)
            });
        }
        resLote.innerHTML = 'Banco de dados populado!'
        alert('Banco de dados populado com sucesso!');
    } catch (error) {
        console.error('Erro ao povoar o banco de dados:', error);
        alert('Ocorreu um erro ao tentar povoar o banco de dados.');
    }
});

