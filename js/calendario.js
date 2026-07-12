//====================================================
// calendario.js
// World Cup Simulator 2026
// Calendario Fase de Grupos
//====================================================

class Calendario {

    //====================================================
    // Constructor
    //====================================================

    constructor(grupos) {

        this.grupos = grupos;

        this.partidos = [];

    }

    //====================================================
    // Generar calendario completo
    //====================================================

    generar() {

        this.partidos = [];

        this.grupos.forEach(

            grupo => {

                this.generarGrupo(

                    grupo

                );

            }

        );

        this.guardar();

        console.log(

            "Calendario generado."

        );

        console.log(

            "Partidos: " +

            this.partidos.length

        );

        return this.partidos;

    }

    //====================================================
    // Generar un grupo
    //====================================================

    generarGrupo(grupo) {

        const equipos =

            grupo.equipos;

        if (

            equipos.length !== 4

        ) {

            return;

        }

        const A = equipos[0];
        const B = equipos[1];
        const C = equipos[2];
        const D = equipos[3];

        // Fecha 1

        this.crearPartido(

            grupo.nombre,
            1,
            A,
            B

        );

        this.crearPartido(

            grupo.nombre,
            1,
            C,
            D

        );

        // Fecha 2

        this.crearPartido(

            grupo.nombre,
            2,
            A,
            C

        );

        this.crearPartido(

            grupo.nombre,
            2,
            B,
            D

        );

        // Fecha 3

        this.crearPartido(

            grupo.nombre,
            3,
            A,
            D

        );

        this.crearPartido(

            grupo.nombre,
            3,
            B,
            C

        );

    }

    //====================================================
    // Crear partido
    //====================================================

    crearPartido(

        grupo,
        fecha,
        local,
        visitante

    ) {

        this.partidos.push({

            grupo: grupo,

            fecha: fecha,

            local: local,

            visitante: visitante,

            golesLocal: 0,

            golesVisitante: 0,

            jugado: false

        });

    }

    //====================================================
    // Guardar
    //====================================================

    guardar() {

        Guardar.guardar(

            "partidos",

            this.partidos

        );

    }

}