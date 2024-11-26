import { httpmethod } from "./utilidades.js";

document.addEventListener("DOMContentLoaded", () => {
    mainConsultaNotas();
});

export async function mainConsultaNotas() {
    mostrarFormConsultaNotas();

    btnNotasAlu.addEventListener("click", buscarNotasAlumno);
}

export function mostrarFormConsultaNotas() {
    
    txtNotasDNIAlu.value = "";
    txtNotasYear.value = "";
    txtNotasDNIAlu.focus();

    formConsultaNotas.style.display = "inline-block";
}

async function buscarNotasAlumno() {
    console.log("Iniciando búsqueda de notas...");

    try {
        const response = await httpmethod(`http://localhost:5000/api/notas/${txtNotasDNIAlu.value}/${txtNotasYear.value}`, "GET", null);
        console.log(response);
        mostrarNotasAlumnos(response);
    } catch (error) {
        console.error("Error al buscar notas del alumno:", error);
        alert("Hubo un error al buscar las notas del alumno.");
    }
}

async function mostrarNotasAlumnos(response) {
    const ordenPeriodos = ["1er Reporte", "1er Cuatrimestre", "2do Reporte", "2do Cuatrimestre", "Intensificacion", "Final"];

    if (response.length > 0) {
        datoNotasAlu.style.display = "block";
        alumnoinfo.style.display = "block";

        const alumnoInfo = response[0];
        document.getElementById("nombre-alumno").innerText = `Alumno: ${alumnoInfo["Nombre del Alumno"]}`;
        document.getElementById("curso-alumno").innerText = `Curso: ${alumnoInfo["Curso Actual"]}`;
        document.getElementById("año-cursada").innerText = `Año de Cursada: ${alumnoInfo["Año de Cursada"]}`;

        const tableHead = document.querySelector("#calificaciones-table thead tr");
        const tableBody = document.querySelector("#calificaciones-table tbody");

        tableHead.innerHTML = ''; // Limpiar encabezado
        tableBody.innerHTML = ''; // Limpiar cuerpo

        // Mantener la columna "Materia" en el encabezado
        const thMateria = document.createElement("th");
        thMateria.innerText = "Materia";
        tableHead.appendChild(thMateria);

        // Obtener periodos únicos y ordenar según el orden especificado en ordenPeriodos
        const periodosUnicos = [...new Set(response.map(item => item["Periodo"]))]
            
        periodosUnicos.sort((a, b) => {
            const indexA = ordenPeriodos.indexOf(a);
            const indexB = ordenPeriodos.indexOf(b);
            return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
        });
        

        // Crear las columnas de los periodos en el encabezado
        periodosUnicos.forEach(periodo => {
            const th = document.createElement("th");
            th.innerText = periodo;
            tableHead.appendChild(th);
        });

        // Crear un objeto con las calificaciones por asignatura y periodo
        const calificacionesPorAsignatura = response.reduce((acc, item) => {
            const materia = item["Asignatura"];
            const periodo = item["Periodo"];
            const calificacion = item["Calificación"];

            if (!acc[materia]) acc[materia] = {};
            acc[materia][periodo] = calificacion;
            return acc;
        }, {});

        // Llenar la tabla con asignaturas y calificaciones
        for (const [asignatura, calificaciones] of Object.entries(calificacionesPorAsignatura)) {
            const tr = document.createElement("tr");

            // Columna de "Materia"
            const tdMateria = document.createElement("td");
            tdMateria.innerText = asignatura;
            tr.appendChild(tdMateria);

            // Columnas de calificaciones por periodo
            periodosUnicos.forEach(periodo => {
                const td = document.createElement("td");
                td.innerText = calificaciones[periodo] || "-"; // Muestra "-" si no hay calificación
                tr.appendChild(td);
            });

            tableBody.appendChild(tr);
        }
    }
}

