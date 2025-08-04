const participantes = [];

function adicionarParticipante() {
  const nomeInput = document.getElementById("nome");
  const nome = nomeInput.value.trim();
  if (nome && !participantes.includes(nome)) {
    participantes.push(nome);
    atualizarLista();
    nomeInput.value = "";
    nomeInput.focus();
  }
}

function atualizarLista() {
  const lista = document.getElementById("listaParticipantes");
  lista.innerHTML = "";
  participantes.forEach(nome => {
    const li = document.createElement("li");
    li.textContent = nome;
    lista.appendChild(li);
  });
}

function embaralhar(lista) {
  for (let i = lista.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lista[i], lista[j]] = [lista[j], lista[i]];
  }
}

function sortearAmigoSecreto() {
  if (participantes.length < 2) {
    alert("Adicione pelo menos 2 participantes.");
    return;
  }

  let sorteados = [...participantes];
  let tentativas = 0;

  do {
    embaralhar(sorteados);
    tentativas++;
  } while (temAutoSorteio(participantes, sorteados) && tentativas < 100);

  if (tentativas === 100) {
    alert("Não foi possível sortear sem repetições. Tente novamente.");
    return;
  }

  const resultadoUl = document.getElementById("resultado");
  resultadoUl.innerHTML = "";

  participantes.forEach((nome, i) => {
    const li = document.createElement("li");
    li.textContent = `${nome} tirou ${sorteados[i]}`;
    resultadoUl.appendChild(li);
  });
}

function temAutoSorteio(originais, sorteados) {
  return originais.some((nome, i) => nome === sorteados[i]);
}
