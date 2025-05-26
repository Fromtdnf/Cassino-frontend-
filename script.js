const apiUrl = "https://cassino-ckca.onrender.com";

// Cadastro
document.getElementById("form-cadastro").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("cadastro-nome").value;
  const email = document.getElementById("cadastro-email").value;
  const senha = document.getElementById("cadastro-senha").value;

  try {
    const resposta = await fetch(`${apiUrl}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    });

    const data = await resposta.json();
    alert(data.mensagem || "Cadastro realizado!");
  } catch (erro) {
    alert("Erro no cadastro.");
  }
});

// Login
document.getElementById("form-login").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const senha = document.getElementById("login-senha").value;

  try {
    const resposta = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await resposta.json();
    if (resposta.ok) {
      alert("Login realizado!");
      localStorage.setItem("usuarioId", data.usuario._id);
    } else {
      alert(data.mensagem || "Erro no login.");
    }
  } catch (erro) {
    alert("Erro ao fazer login.");
  }
});

// Histórico de jogos
async function carregarHistorico() {
  const usuarioId = localStorage.getItem("usuarioId");
  if (!usuarioId) return;

  try {
    const resposta = await fetch(`${apiUrl}/historico/${usuarioId}`);
    const historico = await resposta.json();
    const lista = document.getElementById("historico-lista");
    lista.innerHTML = "";

    historico.forEach((jogo) => {
      const item = document.createElement("li");
      item.textContent = `Jogo: ${jogo.tipo}, Resultado: ${jogo.resultado}, Data: ${new Date(jogo.data).toLocaleString()}`;
      lista.appendChild(item);
    });
  } catch (erro) {
    console.error("Erro ao carregar histórico.");
  }
}

// Chame isso onde for necessário no HTML para carregar o histórico
// carregarHistorico();
