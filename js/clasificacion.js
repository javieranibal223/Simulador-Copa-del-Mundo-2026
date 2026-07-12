//====================================================
// clasificacion.js
// World Cup Simulator 2026
// Clasificación a Eliminatorias
//====================================================

class Clasificacion {

    //====================================================
    // Constructor
    //====================================================

    constructor(tablas) {

        this.tablas = tablas;

        this.primeros = [];

        this.segundos = [];

        this.terceros = [];

        this.mejoresTerceros = [];

        this.clasificados = [];

    }

    //====================================================
    // Generar clasificación
    //====================================================

    generar() {

        this.obtenerClasificados();

        this.obtenerMejoresTerceros();

        this.generarListaFinal();

        this.guardar();

        console.log("");

        console.log("==============================");

        console.log("CLASIFICACIÓN GENERADA");

        console.log("==============================");

        console.log(

            "Clasificados:",

            this.clasificados.length

        );

    }

    //====================================================
    // Obtener primeros, segundos y terceros
    //====================================================

    obtenerClasificados() {

        this.tablas.forEach(

            tabla => {

                this.primeros.push(

                    tabla.equipos[0]

                );

                this.segundos.push(

                    tabla.equipos[1]

                );

                this.terceros.push(

                    tabla.equipos[2]

                );

            }

        );

    }

        //====================================================
    // Obtener los 8 mejores terceros
    //====================================================

    obtenerMejoresTerceros() {

        this.terceros.sort(

            (a, b) => {

                if (b.pts !== a.pts) {

                    return b.pts - a.pts;

                }

                if (b.dg !== a.dg) {

                    return b.dg - a.dg;

                }

                if (b.gf !== a.gf) {

                    return b.gf - a.gf;

                }

                return a.equipo.ranking -

                       b.equipo.ranking;

            }

        );

        this.mejoresTerceros =

            this.terceros.slice(

                0,

                8

            );

    }

    //====================================================
    // Generar lista final de clasificados
    //====================================================

    generarListaFinal() {

        this.clasificados = [];

        this.primeros.forEach(

            equipo => {

                this.clasificados.push(

                    equipo

                );

            }

        );

        this.segundos.forEach(

            equipo => {

                this.clasificados.push(

                    equipo

                );

            }

        );

        this.mejoresTerceros.forEach(

            equipo => {

                this.clasificados.push(

                    equipo

                );

            }

        );

    }

        //====================================================
    // Mostrar clasificados
    //====================================================

    mostrarClasificados() {

        console.log("");

        console.log("==============================");

        console.log("CLASIFICADOS");

        console.log("==============================");

        this.clasificados.forEach(

            (equipo, indice) => {

                console.log(

                    (indice + 1) +

                    ". " +

                    equipo.equipo.nombre +

                    " (" +

                    equipo.pts +

                    " pts)"

                );

            }

        );

    }

    //====================================================
    // Guardar clasificación
    //====================================================

    guardar() {

        Guardar.guardar(

            "clasificados",

            this.clasificados

        );

    }

}