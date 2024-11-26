import { httpmethod } from "./utilidades.js";

export async function mainCargaNotas() {
    mostrarFormCargaNotas();
    document.getElementById('btnlistaAlumxCursoMat').addEventListener('click', obtenerAlumnosCursoMateria);

}
function mostrarFormCargaNotas() {
    formLoginProfesor.style.display = "none";
    formCargaNotas.style.display = "inline-block";
}

async function obtenerAlumnosCursoMateria() {
    console.log("Entrando a buscar lista");

    const generaLista = {
        "cursoActual": listaCurso.value,
        "materia": listaMateria.value
    };

    try {
        const response = await httpmethod(`http://localhost:5000/api/alumnos_calificaciones?cursoActual=${listaCurso.value}&materia=${listaMateria.value}`, "GET");
        console.log(response);

        /*//Filtrar valores únicos de alumnos por DNI
        const alumnosUnicos = response.filter((alumno, index, self) => 
            index === self.findIndex(a => a.DNIAlu === alumno.DNIAlu)
        );
*/
        mostrarTablaAlumnos(response);
    } catch (error) {
        console.error("Error al obtener alumnos:", error);
        alert("No se pudieron cargar los alumnos del curso.");
    }
}

async function mostrarTablaAlumnos(alumnos) {
    formTablaCarga.style.display = "block";

    // Mostrar los datos comunes fuera de la tabla
    if (alumnos.length > 0) {
        const primerAlumno = alumnos[0];
        document.getElementById("InfcomDniProfesor").textContent = primerAlumno["DNI Profesor"] || '';
        document.getElementById("InfcomMateria").textContent = primerAlumno["Materia"] || '';
        document.getElementById("InfcomAño").textContent = primerAlumno["Año"] || '';
    }

    // Limpiar el contenido anterior de la tabla
    const tablaBody = document.querySelector('#tabla-calificaciones tbody');
    tablaBody.innerHTML = ''; // Limpia la tabla antes de llenar

    // Generar filas para cada alumno con campos editables de periodo y calificación
    alumnos.forEach(alumno => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${alumno["DNI Alumno"] || ''}</td>
            <td>${alumno["Nombre del Alumno"] || ''}</td>
            <!-- Selector de Periodo -->
            <td>
                <select name="periodo">
                    <option value="">Seleccionar Periodo</option>
                    <option value="1er Reporte">1er Reporte</option>
                    <option value="1er Cuatrimestre">1er Cuatrimestre</option>
                    <option value="2do Reporte">2do Reporte</option>
                    <option value="2do Cuatrimestre">2do Cuatrimestre</option>
                    <option value="Intensificacion">Intensificacion</option>
                    <option value="Final">Final</option>
                </select>
            </td>
            
            <!-- Selector de Calificación -->
            <td>
                <select name="calificacion">
                    <option value="">Seleccionar Calificación</option>
                    <option value="TEA">TEA</option>
                    <option value="TEP">TEP</option>
                    <option value="TED">TED</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </td>
        `;

        tablaBody.appendChild(fila);
    });

    // Asignar el evento de envío de calificaciones al botón
    document.getElementById('btnEnviarCalificaciones').addEventListener('click', guardarCalificaciones);

}


// Función para guardar las calificaciones
async function guardarCalificaciones() {
    const filas = document.querySelectorAll('#tabla-calificaciones tbody tr');

    // Obtener los valores comunes desde los elementos
    const dniProfesor = document.getElementById("InfcomDniProfesor")?.textContent.trim() || "";
    const materia = document.getElementById("InfcomMateria")?.textContent.trim() || "";
    const curso = document.getElementById("listaCurso")?.textContent.trim() || "";
    const año = document.getElementById("InfcomAño")?.textContent.trim() || "";

    // Crear el arreglo de calificaciones
    const calificaciones = Array.from(filas).map(fila => ({
        "DNI Alumno": fila.cells[0].textContent.trim(),
        "DNI Profesor": dniProfesor,
        "Materia": materia,
        "Curso Actual": curso,
        "Año": año,
        "Calificacion": fila.querySelector('select[name="calificacion"]').value,
        "Periodo": fila.querySelector('select[name="periodo"]').value
    }));

    try {
        // Enviar las calificaciones al servidor
        const response = await httpmethod('http://localhost:5000/api/cargarCalificaciones', 'POST', { calificaciones });

        alert(response.success ? "Calificaciones guardadas exitosamente." : "Error al guardar las calificaciones.");
    } catch (error) {
        console.error("Error al enviar calificaciones:", error);
        alert("Hubo un error al intentar guardar las calificaciones.");
    }
}
