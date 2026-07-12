//====================================================
// eliminatorias.js
// World Cup Simulator 2026
// Eliminatorias
//====================================================

class Eliminatorias {

    //====================================================
    // Constructor
    //====================================================

    constructor(clasificados) {

        this.clasificados = clasificados;

        this.dieciseisavos = [];

        this.octavos = [];

        this.cuartos = [];

        this.semifinales = [];

        this.tercerPuesto = null;

        this.final = null;

        this.campeon = null;

    }

    //====================================================
    // Generar cuadro
    //====================================================

    generar() {

        this.generarDieciseisavos();

        this.guardar();

        console.log("");

        console.log("==============================");

        console.log("CUADRO ELIMINATORIO");

        console.log("==============================");

        console.log(

            "Partidos:",

            this.dieciseisavos.length

        );

    }

    //====================================================
    // Generar dieciseisavos
    //====================================================

    generarDieciseisavos() {

        this.dieciseisavos = [];

        for (

            let i = 0;

            i < this.clasificados.length;

            i += 2

        ) {

            this.dieciseisavos.push({

                local:

                    this.clasificados[i],

                visitante:

                    this.clasificados[i + 1],

                golesLocal: 0,

                golesVisitante: 0,

                jugado: false

            });

        }

    }

        //====================================================
    // Simular una ronda eliminatoria
    //====================================================

    simularRonda(ronda) {

        const ganadores = [];

        ronda.forEach(

            partido => {

                while (

                    partido.golesLocal ===

                    partido.golesVisitante

                ) {

                    partido.golesLocal =

                        Math.floor(

                            Math.random() * 6

                        );

                    partido.golesVisitante =

                        Math.floor(

                            Math.random() * 6

                        );

                }

                partido.jugado = true;

                if (

                    partido.golesLocal >

                    partido.golesVisitante

                ) {

                    ganadores.push(

                        partido.local

                    );

                }

                else {

                    ganadores.push(

                        partido.visitante

                    );

                }

            }

        );

        return ganadores;

    }

    //====================================================
    // Generar siguiente ronda
    //====================================================

    generarSiguienteRonda(equipos) {

        const ronda = [];

        for (

            let i = 0;

            i < equipos.length;

            i += 2

        ) {

            ronda.push({

                local:

                    equipos[i],

                visitante:

                    equipos[i + 1],

                golesLocal: 0,

                golesVisitante: 0,

                jugado: false

            });

        }

        return ronda;

    }

    //====================================================
    // Generar octavos de final
    //====================================================

    generarOctavos() {

        const ganadores =

            this.simularRonda(

                this.dieciseisavos

            );

        this.octavos =

            this.generarSiguienteRonda(

                ganadores

            );

    }

        //====================================================
    // Generar cuartos de final
    //====================================================

    generarCuartos() {

        const ganadores =

            this.simularRonda(

                this.octavos

            );

        this.cuartos =

            this.generarSiguienteRonda(

                ganadores

            );

    }

    //====================================================
    // Generar semifinales
    //====================================================

    generarSemifinales() {

        const ganadores =

            this.simularRonda(

                this.cuartos

            );

        this.semifinales =

            this.generarSiguienteRonda(

                ganadores

            );

    }

    //====================================================
    // Generar final
    //====================================================

    generarFinal() {

        const finalistas =

            this.simularRonda(

                this.semifinales

            );

        this.final =

            this.generarSiguienteRonda(

                finalistas

            );

    }

    //====================================================
    // Obtener campeón
    //====================================================

    obtenerCampeon() {

        const ganador =

            this.simularRonda(

                this.final

            );

        this.campeon =

            ganador[0];

    }

    //====================================================
    // Mostrar campeón
    //====================================================

    mostrarCampeon() {

        console.log("");

        console.log("==============================");

        console.log("CAMPEÓN DEL MUNDIAL");

        console.log("==============================");

        console.log(

            this.campeon.equipo.nombre

        );

    }

    //====================================================
    // Guardar eliminatorias
    //====================================================

    guardar() {

        Guardar.guardar(

            "eliminatorias",

            {

                dieciseisavos:

                    this.dieciseisavos,

                octavos:

                    this.octavos,

                cuartos:

                    this.cuartos,

                semifinales:

                    this.semifinales,

                final:

                    this.final,

                campeon:

                    this.campeon

            }

        );

    }

}