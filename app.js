let tarefas = []; 
let tarefaAtual = null;

// Carrega algumas tarefas de exemplo
function carregarTarefas() {
    tarefas = [
        { id: 1, nome: "Tarefa 1", custo: 500, dataLimite: "2023-12-31", ordem: 1 },
        { id: 2, nome: "Tarefa 2", custo: 1500, dataLimite: "2023-11-30", ordem: 2 }
    ];
    renderizarTarefas();
}

// Renderiza as tarefas na tabela
function renderizarTarefas() {
    const tbody = document.querySelector('#tabela-tarefas tbody');
    tbody.innerHTML = '';
    tarefas.sort((a, b) => a.ordem - b.ordem).forEach(tarefa => {
        const tr = document.createElement('tr');
        if (tarefa.custo >= 1000) {
            tr.classList.add('custo-alto');
        }
        tr.innerHTML = `
            <td>
                <button class="upedown" onclick="moverTarefa(${tarefa.id}, 'up')"><i class="fas fa-arrow-up"></i></button>
                <button class="upedown" onclick="moverTarefa(${tarefa.id}, 'down')"><i class="fas fa-arrow-down"></i></button>
                ${tarefa.ordem}
            </td>
            <td>${tarefa.id}</td>
            <td>${tarefa.nome}</td>
            <td>R$ ${tarefa.custo}</td>
            <td>${tarefa.dataLimite}</td>
            <td>
                <button class="btn" onclick="modalEditar(${tarefa.id})"><i class="fas fa-edit"></i></button>
                <button class="btn" onclick="modalExcluir(${tarefa.id})"><i id="lixeira" class="fas fa-trash-alt"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Abre a modal para adicionar tarefa
function modalAdicionar() {
    document.getElementById('modalAdicionar').style.display = "block";
}

// Adiciona uma nova tarefa
function adicionarTarefa() {
    const nome = document.getElementById('nome').value;
    const custo = document.getElementById('custo').value;
    const dataLimite = document.getElementById('dataLimite').value;
    const novaTarefa = {
        id: tarefas.length + 1,
        nome: nome,
        custo: parseFloat(custo),
        dataLimite: dataLimite,
        ordem: tarefas.length + 1
    };
    tarefas.push(novaTarefa);
    renderizarTarefas();
    fecharModal('modalAdicionar');
    limparCampos();
}

// Abre a modal para editar tarefa
function modalEditar(id) {
    tarefaAtual = tarefas.find(t => t.id === id);
    document.getElementById('nomeEditar').value = tarefaAtual.nome;
    document.getElementById('custoEditar').value = tarefaAtual.custo;
    document.getElementById('dataLimiteEditar').value = tarefaAtual.dataLimite;
    document.getElementById('modalEditar').style.display = "block";
}

// Edita a tarefa atual
function editarRegistro() {
    tarefaAtual.nome = document.getElementById('nomeEditar').value;
    tarefaAtual.custo = parseFloat(document.getElementById('custoEditar').value);
    tarefaAtual.dataLimite = document.getElementById('dataLimiteEditar').value;
    renderizarTarefas();
    fecharModal('modalEditar');
}

// Abre a modal para excluir tarefa
function modalExcluir(id) {
    tarefaAtual = tarefas.find(t => t.id === id);
    document.getElementById('modalExcluir').style.display = "block";
}

// Fecha as modals
function fecharModal(modalId) {
    if (modalId) {
        document.getElementById(modalId).style.display = "none";
    } else {
        document.getElementById('modalAdicionar').style.display = "none";
        document.getElementById('modalEditar').style.display = "none";
        document.getElementById('modalExcluir').style.display = "none";
    }
}

// Exclui a tarefa
function excluirTarefa() {
    tarefas = tarefas.filter(t => t.id !== tarefaAtual.id);
    renderizarTarefas();
    fecharModal('modalExcluir');
}

// Move as tarefas para cima ou para baixo
function moverTarefa(id, direction) {
    const index = tarefas.findIndex(t => t.id === id);
    if (index !== -1) {
        if (direction === 'up' && index > 0) {
            [tarefas[index], tarefas[index - 1]] = [tarefas[index - 1], tarefas[index]];
        } else if (direction === 'down' && index < tarefas.length - 1) {
            [tarefas[index], tarefas[index + 1]] = [tarefas[index + 1], tarefas[index]];
        }
        tarefas.forEach((t, i) => t.ordem = i + 1);
        renderizarTarefas();
    }
}

carregarTarefas();