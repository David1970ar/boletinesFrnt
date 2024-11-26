import { httpmethod } from "./utilidades.js";

export async function mainActualizar() {

    mostrarFormActualizar();

    btnBuscaActualizar.addEventListener("click", buscaactualizarAlumno);
    btnActualizar.addEventListener("click", actualizaAlumno);



}


function mostrarFormActualizar() {


    formActualizar.style.display = "inline-block";

}


async function buscaactualizarAlumno() {


    actualizacion.style.display = "none";

    const response = await httpmethod(`http://localhost:5000/api/alumnos/${txtActualizarDNIAlu.value}`, "GET", null);

    console.log(response);

    if (response.length > 0) {

        actualizacion.style.display = "inline-block";

        txtActualizarnomApeAlu.value = response[0].nomApeAlu;
        txtActualizarmail.value = response[0].mailAlu;
        txtActualizarTel.value = response[0].telefonoAlu;
        txtActualizarnomApeResp.value = response[0].nomApeResp;
        txtActualizarMailResp.value = response[0].mailResp;
        txtActualizartelefonoResp.value = response[0].telefonoResp;
        txtActualizarAñoIng.value = response[0].añoIngreso;
        txtActualizarCursoAct.value = response[0].cursoActual;
    }
    else
        alert("el alumno solicitado no existe")

}


async function actualizaAlumno() {

    const alumnoAct = {
        "DNIAlu": txtActualizarDNIAlu.value,
        "nomApeAlu": txtActualizarnomApeAlu.value,
        "mailAlu": txtActualizarmail.value,
        "telefonoAlu": txtActualizarTel.value,
        "nomApeResp": txtActualizarnomApeResp.value,
        "mailResp": txtActualizarMailResp.value,
        "telefonoResp": txtActualizartelefonoResp.value,
        "añoIngreso": txtActualizarAñoIng.value,
        "cursoActual": txtActualizarCursoAct.value,
    };

    console.log(alumnoAct)

    let response = await httpmethod(`http://localhost:5000/api/alumnoModif/`, "PUT", alumnoAct);

    console.log(response);

    txtActualizarDNIAlu.value = "";
    actualizacion.style.display = "none";

};
