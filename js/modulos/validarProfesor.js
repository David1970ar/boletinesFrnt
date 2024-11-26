import { httpmethod } from "./utilidades.js";
import { mainCargaNotas } from "./formCargaNotas.js";

export async function mainvalprof() {
    mostrarFormlogin();
}

function mostrarFormlogin() {
    // Reseteamos los campos del formulario y le damos foco al email
    txtemailProf.value = "";
    txtpassProf.value = "";
    txtemailProf.focus();

    // Mostramos el formulario de login del profesor
    formLoginProfesor.style.display = "inline-block";

    // Añadimos el evento de clic al botón de login
    btnLogin.addEventListener("click", () => validarProfesor());
}

async function validarProfesor() {
    // genero JSON con los valores de los inputs
    const valProf = {
        mailProf: txtemailProf.value,
        password: txtpassProf.value
    };

    try {
        // Envio la solicitud POST a la API
        const response = await httpmethod(`http://localhost:5000/api/validarProfesor`, "POST", valProf);
        
        // Verificamos la respuesta
        if (response.success) {
            
            alert ("Profesor validado correctamente");
            // ya verificado llama a la función que carga el formulario de notas
            mainCargaNotas();
            // si no se verifica devuelve los mensajes de error correspondientes
        } else {
            console.log("Error en la validación del profesor");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}

