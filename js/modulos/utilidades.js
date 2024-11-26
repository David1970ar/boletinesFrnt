
export async function httpmethod(url, method, body) {

    if (body != null)
        body = JSON.stringify(body);



    const ret = await fetch(url, {
        method: method,
        body: body,
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    const response = await ret.json();

    mostrar(response);

    return response;

}

function mostrar(mensaje) {

    console.log(mensaje);
}