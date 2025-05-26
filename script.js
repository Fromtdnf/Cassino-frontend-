function testarAPI() {
  fetch('https://cassino-ckca.onrender.com/')
    .then(res => res.text())
    .then(texto => {
      document.getElementById('resultado').innerText = texto;
    })
    .catch(() => {
      document.getElementById('resultado').innerText = 'Erro ao conectar com a API';
    });
}