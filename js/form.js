document.addEventListener("DOMContentLoaded", function() {
    // Datos simulados de la consulta SQL (deberías reemplazar esto con los datos reales obtenidos del servidor)
    const datos = [
        {
            "Asignatura": "MATEMÁTICA",
            "Año de Cursada": 2024,
            "Calificación": "6",
            "Curso Actual": "1AB",
            "Nombre del Alumno": "Alarcon Vargas Josué Alejandro",
            "Periodo": "1er cuatrimestre"
        },
        {
            "Asignatura": "NTICX",
            "Año de Cursada": 2024,
            "Calificación": "5",
            "Curso Actual": "1AB",
            "Nombre del Alumno": "Alarcon Vargas Josué Alejandro",
            "Periodo": "1er cuatrimestre"
        }
    ];

    // Obtener y mostrar los datos del alumno (suponiendo que los datos del alumno son los mismos en todas las entradas)
    const alumnoInfo = datos[0];
    document.getElementById("nombre-alumno").innerText = `Alumno: ${alumnoInfo["Nombre del Alumno"]}`;
    document.getElementById("curso-alumno").innerText = `Curso: ${alumnoInfo["Curso Actual"]}`;
    document.getElementById("año-cursada").innerText = `Año de Cursada: ${alumnoInfo["Año de Cursada"]}`;

    // Obtener referencias a los elementos de la tabla
    const tableHead = document.querySelector("#calificaciones-table thead tr");
    const tableBody = document.querySelector("#calificaciones-table tbody");

    // Obtener los periodos únicos y ordenar
    const periodosUnicos = [...new Set(datos.map(item => item["Periodo"]))].sort();

    // Crear encabezados para cada periodo
    periodosUnicos.forEach(periodo => {
        const th = document.createElement("th");
        th.innerText = periodo;
        tableHead.appendChild(th);
    });

    // Agrupar calificaciones por asignatura
    const calificacionesPorAsignatura = datos.reduce((acc, item) => {
        const materia = item["Asignatura"];
        const periodo = item["Periodo"];
        const calificacion = item["Calificación"];

        if (!acc[materia]) acc[materia] = {};
        acc[materia][periodo] = calificacion;
        return acc;
    }, {});

    // Generar filas de la tabla
    for (const [asignatura, calificaciones] of Object.entries(calificacionesPorAsignatura)) {
        const tr = document.createElement("tr");
        
        // Columna de asignatura
        const tdAsignatura = document.createElement("td");
        tdAsignatura.innerText = asignatura;
        tr.appendChild(tdAsignatura);

        // Columnas de calificación por periodo
        periodosUnicos.forEach(periodo => {
            const tdCalificacion = document.createElement("td");
            tdCalificacion.innerText = calificaciones[periodo] || "-"; // Mostrar "-" si no hay calificación
            tr.appendChild(tdCalificacion);
        });

        tableBody.appendChild(tr);
    }
});