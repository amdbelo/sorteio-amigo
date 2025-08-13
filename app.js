const listaAmigos = [];
const ulLista = document.getElementById("listaAmigos");
const ulResultado = document.getElementById("resultado");

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();

    if (nome === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }

    if (listaAmigos.includes(nome)) {
        alert("Esse nome já foi adicionado.");
        input.value = "";
        return;
    }

    listaAmigos.push(nome);
    input.value = "";
    atualizarLista();
}

function atualizarLista() {
    ulLista.innerHTML = "";
    listaAmigos.forEach(nome => {
        const li = document.createElement("li");
        li.textContent = nome;
        ulLista.appendChild(li);
    });
}

function embaralhar(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("É necessário pelo menos 2 participantes para sortear.");
        return;
    }

    let sorteados;
    let tentativas = 0;

    do {
        sorteados = embaralhar(listaAmigos);
        tentativas++;
    } while (listaAmigos.some((nome, i) => nome === sorteados[i]) && tentativas < 100);

    if (tentativas >= 100) {
        alert("Não foi possível sortear sem repetir. Tente novamente.");
        return;
    }

    exibirResultado(sorteados);
}

function exibirResultado(sorteados) {
    ulResultado.innerHTML = "";
    listaAmigos.forEach((nome, i) => {
        const li = document.createElement("li");
        li.textContent = `${nome} → ${sorteados[i]}`;
        ulResultado.appendChild(li);
    });
}
