export function validarTexto(texto) {

    // && es AND
    // || es OR
    // ! es NOT

    let error = false;
    for (letra in texto.value) {
        if (!(letra.toLowerCase() >= 'a' && letra.toLowerCase() <= 'z' || letra == ' ')) {
            error = true;
        }
    }

    if (error == true) alert("el texto ingresado no es valido");
}

