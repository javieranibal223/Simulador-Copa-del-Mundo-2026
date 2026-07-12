//====================================================
// simulador.js
// World Cup Simulator 2026
// Motor de Simulación
//====================================================

class Simulador {

    //====================================================
    // Constructor
    //====================================================

    constructor(partidos) {

        this.partidos = partidos;

    }

    //====================================================
    // Simular todos los partidos
    //====================================================

    simularTodos() {

        this.partidos.forEach(

            partido => {

                this.simularPartido(

                    partido

                );

            }

        );

        this.guardarResultados();

        const estadisticas =

            this.obtenerEstadisticas();

        console.log("");

        console.log("==============================");

        console.log("SIMULACIÓN COMPLETADA");

        console.log("==============================");

        console.log(

            "Partidos jugados:",

            estadisticas.partidos

        );

        console.log(

            "Goles:",

            estadisticas.goles

        );

        console.log(

            "Promedio:",

            estadisticas.promedio

        );

    }

    //====================================================
    // Simular una fecha
    //====================================================

    simularFecha(numeroFecha) {

        const partidosFecha =

            this.partidos.filter(

                partido =>

                    partido.fecha ===

                    numeroFecha

            );

        partidosFecha.forEach(

            partido => {

                this.simularPartido(

                    partido

                );

            }

        );

        console.log(

            "Fecha " +

            numeroFecha +

            " simulada."

        );

    }

    //====================================================
    // Simular un grupo
    //====================================================

    simularGrupo(nombreGrupo) {

        const partidosGrupo =

            this.partidos.filter(

                partido =>

                    partido.grupo ===

                    nombreGrupo

            );

        partidosGrupo.forEach(

            partido => {

                this.simularPartido(

                    partido

                );

            }

        );

        console.log(

            "Grupo " +

            nombreGrupo +

            " simulado."

        );

    }

    //====================================================
    // Mostrar resultado
    //====================================================

    mostrarResultado(partido) {

        console.log(

            partido.local.nombre +

            " " +

            partido.golesLocal +

            " - " +

            partido.golesVisitante +

            " " +

            partido.visitante.nombre

        );

    }

    //====================================================
    // Mostrar todos los resultados
    //====================================================

    mostrarResultados() {

        console.log("");

        console.log("==============================");

        console.log("RESULTADOS");

        console.log("==============================");

        this.partidos.forEach(

            partido => {

                this.mostrarResultado(

                    partido

                );

            }

        );

    }

        //====================================================
    // Guardar resultados
    //====================================================

    guardarResultados() {

        Guardar.guardar(

            "partidos",

            this.partidos

        );

    }

    //====================================================
    // Obtener estadísticas
    //====================================================

    obtenerEstadisticas() {

        let goles = 0;

        let jugados = 0;

        this.partidos.forEach(

            partido => {

                if (partido.jugado) {

                    goles +=

                        partido.golesLocal +

                        partido.golesVisitante;

                    jugados++;

                }

            }

        );

        return {

            partidos: jugados,

            goles: goles,

            promedio:

                jugados > 0

                    ? (goles / jugados).toFixed(2)

                    : 0

        };

    }

    //====================================================
    // Simular un partido
    //====================================================

    simularPartido(partido) {

        if (partido.jugado) {

            return;

        }

        const fuerzaLocal =

            this.calcularFuerza(

                partido.local

            );

        const fuerzaVisitante =

            this.calcularFuerza(

                partido.visitante

            );

        partido.golesLocal =

            this.generarGoles(

                fuerzaLocal,

                fuerzaVisitante

            );

        partido.golesVisitante =

            this.generarGoles(

                fuerzaVisitante,

                fuerzaLocal

            );

        partido.jugado = true;

    }

    //====================================================
    // Calcular fuerza
    //====================================================

    calcularFuerza(equipo) {

        // Ranking FIFA
        // Menor ranking = mayor fuerza

        const ranking =

            equipo.ranking;

        const fuerzaBase =

            250 - ranking;

        const aleatorio =

            Math.random() * 20;

        return (

            fuerzaBase +
            aleatorio

        );

    }

    //====================================================
    // Generar goles
    //====================================================

    generarGoles(

        fuerzaPropia,

        fuerzaRival

    ) {

        const diferencia =

            fuerzaPropia -
            fuerzaRival;

        let maximo = 2;

        if (diferencia > 30) {

            maximo = 5;

        }

        else if (diferencia > 15) {

            maximo = 4;

        }

        else if (diferencia > 5) {

            maximo = 3;

        }

        return Math.floor(

            Math.random() *

            (maximo + 1)

        );

    }

}