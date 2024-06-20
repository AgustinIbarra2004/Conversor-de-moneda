const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    const importe = document.getElementById("importe").value;
    const de = document.getElementById("de").value;
    const a = document.getElementById("a").value;

    console.log("Importe: " + importe);
    console.log("De: " + de);
    console.log("A: " + a);
    
    const apiKey = "aa949108a5d524dfcf7d298c";
    const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${de}`;
    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        const tasaConversion = data.conversion_rates[a];
        if (tasaConversion) {
          const resultado = importe * tasaConversion;
          console.log(`Resultado: ${resultado}`);
          document.querySelector(".Resultado").innerHTML = `
            <p>${importe} ${de} = ${resultado.toFixed(6)} ${a}</p>
            <h2>${(1 / tasaConversion).toFixed(6)} ${de} = 1 ${a}</h2>
            <p>1 ${a} = ${tasaConversion.toFixed(6)} ${de}</p>
          `;
        } else {
          console.error('Error: tasa de conversión no encontrada.');
        }
      })
      .catch(error => console.error('Error:', error));
});
