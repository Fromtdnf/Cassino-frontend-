const API_BASE_URL = 'https://cassino-ckca.onrender.com';

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("jogar").addEventListener("click", () => {
    const resultado = Math.floor(Math.random() * 10) + 1;
    document.getElementById("resultado").textContent = `Resultado: ${resultado}`;

    fetch(`${API_BASE_URL}/jogar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resultado }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Jogo salvo:", data))
      .catch((err) => console.error("Erro ao salvar jogo:", err));
  });

  fetch(`${API_BASE_URL}/historico`)
    .then((res) => res.json())
    .then((data) => {
      const historico = document.getElementById("historico");
      historico.innerHTML = data.map((j) => `<li>${j.resultado}</li>`).join("");
    })
    .catch((err) => console.error("Erro ao carregar histórico:", err));
});
