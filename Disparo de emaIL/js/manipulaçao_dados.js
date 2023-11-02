const atualizar_lista = document.querySelector('#atualizar_lista');

atualizar_lista.addEventListener('click', () => {
    atualizarTabela();
});

function atualizarTabela() {
    // Remova o elemento 'article' existente, se ele existir
    const existing_article = document.querySelector("article");
    if (existing_article) {
        document.body.removeChild(existing_article);
    }

    // Crie um novo elemento 'article'
    const article = document.createElement("article");
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Cabeçalho da tabela
    const headerRow = document.createElement("tr");
    const headerCellNome = document.createElement("th");
    const headerCellEmail = document.createElement("th");
    const tituloAcao = document.createElement("th");
    tituloAcao.textContent = "Ação";
    tituloAcao.id = 'tituloAcao';
    headerCellNome.textContent = "Nome";
    headerCellEmail.textContent = "Email";

    headerRow.appendChild(headerCellNome);
    headerRow.appendChild(headerCellEmail);
    headerRow.appendChild(tituloAcao);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Consulte a coleção do Firestore e popule a tabela
    db.collection("dados_para_salva").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const nome = data.nome;
                const email = data.email;
                const itemID = doc.id;

                const row = document.createElement("tr");
                const cellNome = document.createElement("td");
                const cellEmail = document.createElement("td");
                const cellAcao = document.createElement("td");
                const divBotoes = document.createElement("div");
                divBotoes.id = 'divBotoes'

                cellNome.textContent = nome;
                cellEmail.textContent = email;

                // Botão de editar
                const btnEditar = document.createElement("button");
                btnEditar.id = "btnEditar";
                btnEditar.textContent = "Editar";
                btnEditar.addEventListener("click", () => {
                    editarItem(itemID, nome, email);
                });

                // Botão de excluir
                const btnExcluir = document.createElement("button");
                btnExcluir.id = 'btnExcluir';
                btnExcluir.textContent = "Excluir";
                btnExcluir.addEventListener("click", () => {
                    excluirItem(itemID);
                });

                // Adicione os botões à div de botões
                divBotoes.appendChild(btnEditar);
                divBotoes.appendChild(btnExcluir);

                // Adicione a div de botões à célula de ação
                cellAcao.appendChild(divBotoes);

                row.appendChild(cellNome);
                row.appendChild(cellEmail);
                row.appendChild(cellAcao);
                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            article.appendChild(table);
            document.body.appendChild(article);
        })
        .catch((error) => {
            console.error("Erro ao recuperar os dados:", error);
        });
}

// Função para excluir um item pelo seu ID
function excluirItem(itemID) {
    db.collection("dados_para_salva").doc(itemID).delete()
        .then(() => {
            console.log("Item excluído com sucesso!");
            atualizarTabela();
        })
        .catch((error) => {
            console.error("Erro ao excluir item: ", error);
        });
}

// Função para abrir um formulário de edição
function editarItem(itemID, nomeAntigo, emailAntigo) {
    const novoNome = prompt("Novo nome:", nomeAntigo);
    const novoEmail = prompt("Novo email:", emailAntigo);

    if (novoNome !== null && novoEmail !== null) {
        db.collection("dados_para_salva").doc(itemID).update({
            nome: novoNome,
            email: novoEmail
        })

    }
}
