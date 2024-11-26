
import { mainBuscar } from "./modulos/formBuscar.js"
import { mainNuevo } from "./modulos/formNuevo.js"
import { mainActualizar } from "./modulos/formActualizar.js";
import { mainConsultaNotas } from "./modulos/formConsultaNotas.js";
import { mainvalprof } from "./modulos/validarProfesor.js";
import { mainCargaNotas } from "./modulos/formCargaNotas.js";

addEventListener("DOMContentLoaded", function () {

    initapp();


});



function initapp() {
    // Ocultar todos los formularios al inicio
    ocultarTodosLosFormularios();



    // Asignar eventos a cada opción del menú
    document.getElementById("opcBuscarAlu").addEventListener("click", () => {
        ocultarTodosLosFormularios();
        mainBuscar();
    });

    document.getElementById("opcNuevoAlu").addEventListener("click", () => {
        ocultarTodosLosFormularios();
        mainNuevo();
    });
    document.getElementById("opcActualizarAlu").addEventListener("click", () => {
        ocultarTodosLosFormularios();
        mainActualizar();
    });
    document.getElementById("opcverNotas").addEventListener("click", () => {
        ocultarTodosLosFormularios();
        mainConsultaNotas();
    });
    document.getElementById("opcloginProfe").addEventListener("click", () => {
        ocultarTodosLosFormularios();
        mainvalprof();
    });
    /*document.getElementById("opcCargaNotas").addEventListener("click", () => {
        ocultarTodosLosFormularios();
        mainCargaNotas();
    });*/

}


function ocultarTodosLosFormularios() {
    // Obtén todos los formularios por sus IDs y ocúltalos
    const formularios = ["formBuscar", "formNuevo", "formActualizar", "formConsultaNotas", "formCargaNotas",
        "alumnoinfo", "actualizacion", "formLoginProfesor", "datoRespuestaAlu", "datoNotasAlu", "formTablaCarga"];
    formularios.forEach(id => {
        document.getElementById(id).style.display = "none";
    });
}


