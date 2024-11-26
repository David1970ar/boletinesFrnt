import { httpmethod } from "./utilidades.js";

export async function mainBuscar() {

    
    mostrarFormBuscar();

    btnBuscarAlu.addEventListener("click", buscarAlumno);


}




function mostrarFormBuscar() {

    txtBuscarDNIAlu.value = "";
    txtBuscarDNIAlu.focus();

    formBuscar.style.display = "inline-block";
    
}


async function buscarAlumno() {

    

    let response = await httpmethod(`http://localhost:5000/api/alumnos/${txtBuscarDNIAlu.value}`, "GET", null);

    console.log(response);

    mostrarAlumnos(response);

}


async function mostrarAlumnos(response) {

    if (response.length > 0) {

        datoRespuestaAlu.style.display = "inline-block";

        let encabezado = `<tr class="styled-table">  
                                <th>DNI Alumno</th>
                                <th>Nombre y Apellido</th>
                                <th>eMail alumno</th>
                                <th>Telefono alumno</th>
                                <th>Nombre y Apellido responsable</th>
                                <th>email responsable</th>
                                <th>telefono responsable</th>
                                <th>año de ingreso</th>
                                <th>curso actual</th>
                          </tr>`;

        tableResultadosAlu.innerHTML = encabezado;

        for (let alumnos of response) {

            let fila = `<tbody><tr class="styled-table">
                            <td>${alumnos.DNIAlu ?? '-'}</td>
                            <td>${alumnos.nomApeAlu ?? '-'}</td>
                            <td>${alumnos.mailAlu ?? '-'}</td>
                            <td>${alumnos.telefonoAlu ?? '-'}</td>
                            <td>${alumnos.nomApeResp ?? '-'}</td>
                            <td>${alumnos.mailResp ?? '-'}</td>
                            <td>${alumnos.telefonoResp ?? '-'}</td>
                            <td>${alumnos.añoIngreso ?? '-'}</td>
                            <td>${alumnos.cursoActual ?? '-'}</td>                            
                        </tr></tbody>`;

            tableResultadosAlu.innerHTML += fila;
        }
    }
    else {
        alert("No hay un alumno con ese DNI")
        datoRespuestaAlu.style.display = "none";
    }

    
}
