import { httpmethod } from "./utilidades.js";
const API_KEY = "";

addEventListener("DOMContentLoaded", function(){


    btnConsultar.addEventListener("click", consultarAccion);

});


async function consultarAccion() {

    url = `https://yfapi.net/v8/finance/spark?interval=1d&range=1mo&symbols=${txtAccion.value}`;

    let respuesta = await httpMethod (url, "GET", null, API_KEY);

    let timestamps = respuesta[txtAccion.value].timestamp;
    let quotesY = respuesta[txtAccion.value].close;

    fechasX = [];

    for (let timestamp of timestamps) {
        fechasX = [...fechasX, convertirFecha(timestamp)];
    }

    generarGrafico (fechasX, quotesY);
}

function generarGrafico (ejeX, ejeY) {

    var barColors = "red";
    
    new Chart("grafico", {
      type: "line",
      data: {
        labels: ejeX,
        datasets: [{
            fill: "false",
            borderColor: "blue",
          data: ejeY
        }]
      },
      options: {}
    });


}

async function httpMethod(url, method, body, apiKey){
    
    headers = {"Content-type": "application/json; charset=UTF-8",
                "x-api-key": apiKey};

    if (body != null)
        body = JSON.stringify(body);

    const ret = await fetch(url, {
        method: method,
        body: body,
        headers: headers
    });
    
    const response = await ret.json();

    return response;
}

function convertirFecha(timestamp) {

    // Multiplica por 1000 para convertir a milisegundos
    const date = new Date(timestamp * 1000);

    // Extraer año, mes y día
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Sumar 1 al mes y añadir ceros a la izquierda
    const day = String(date.getDate()).padStart(2, '0');

    // Formatear como 'YYYY-MM-DD'
    return `${year}-${month}-${day}`;

}

