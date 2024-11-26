import { httpmethod } from "./utilidades.js";
import {validarTexto} from "./validadores.js";

export function mainNuevo() {

    mostrarFormNuevo ();

    btnCrear.addEventListener("click", nuevoAlumno);

}
async function mostrarFormNuevo() {
    

    formNuevo.style.display = "inline-block";
    
    
    txtDNIAlu.addEventListener("focusout", () => validarTexto(txtDNIAlu.value));
    

}


async function nuevoAlumno() {

    const nuevoAlumno = {
        "DNIAlu" :txtDNIAlu.value,
        "nomApeAlu" :txtnomApeAlu.value,
        "mailAlu" :txtmailAlu.value,
        "telefonoAlu" :txttelefonoAlu.value,
        "nomApeResp" :txtnomApeResp.value,
        "mailResp" :txtmailResp.value,
        "telefonoResp" :txttelefonoResp.value,
        "añoIngreso" :txtañoIngreso.value,
        "cursoActual" :txtcursoActual.value,
    };

    console.log(nuevoAlumno)

    let response = await httpmethod(`http://localhost:5000/api/nuevoAlumno`, "POST", nuevoAlumno);

    alert(response.message);

    
    txtDNIAlu.value = "";
    txtnomApeAlu.value = "";
    txtmailAlu.value = "";
    txttelefonoAlu.value = "";
    txtnomApeResp.value = "";
    txtmailResp.value = "";
    txttelefonoResp.value = "";
    txtañoIngreso.value = "";
    txtcursoActual.value = "";
}
