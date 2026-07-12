//====================================================
// estadisticas.js
// World Cup Simulator 2026
// Estadísticas del Mundial
//====================================================

class Estadisticas {

    //====================================================
    // Constructor
    //====================================================

    constructor(partidos, campeon) {

        this.partidos = partidos;

        this.campeon = campeon;

        this.partidosJugados = 0;

        this.goles = 0;

        this.promedio = 0;

        this.equipoMasGoleador = null;

        this.equipoMenosGoleado = null;

    }

    //====================================================
    // Generar estadísticas
    //====================================================

    generar() {

        this.calcularPartidos();

        this.calcularGoles();

        this.calcularPromedio();

        this.guardar();

        console.log("");

        console.log("==============================");

        console.log("ESTADÍSTICAS");

        console.log("==============================");

        console.log(

            "Partidos:",

            this.partidosJugados

        );

        console.log(

            "Goles:",

            this.goles

        );

        console.log(

            "Promedio:",

            this.promedio

        );

    }

    //====================================================
    // Calcular partidos
    //====================================================

    calcularPartidos() {

        this.partidosJugados =

            this.partidos.filter(

                partido => partido.jugado

            ).length;

    }

    //====================================================
    // Calcular goles
    //====================================================

    calcularGoles() {

        this.goles = 0;

        this.partidos.forEach(

            partido => {

                if (partido.jugado) {

                    this.goles +=

                        partido.golesLocal +

                        partido.golesVisitante;

                }

            }

        );

    }

        //====================================================
    // Calcular promedio de goles
    //====================================================

    calcularPromedio() {

        if (

            this.partidosJugados > 0

        ) {

            this.promedio = (

                this.goles /

                this.partidosJugados

            ).toFixed(2);

        }

        else {

            this.promedio = 0;

        }

    }

    //====================================================
    // Equipo más goleador
    //====================================================

    calcularEquipoMasGoleador() {

        const equipos = {};

        this.partidos.forEach(

            partido => {

                if (!partido.jugado) {

                    return;

                }

                if (

                    !equipos[

                        partido.local.nombre

                    ]

                ) {

                    equipos[

                        partido.local.nombre

                    ] = 0;

                }

                if (

                    !equipos[

                        partido.visitante.nombre

                    ]

                ) {

                    equipos[

                        partido.visitante.nombre

                    ] = 0;

                }

                equipos[

                    partido.local.nombre

                ] +=

                    partido.golesLocal;

                equipos[

                    partido.visitante.nombre

                ] +=

                    partido.golesVisitante;

            }

        );

        let mayor = -1;

        let nombre = "";

        for (

            const equipo in equipos

        ) {

            if (

                equipos[equipo] >

                mayor

            ) {

                mayor =

                    equipos[equipo];

                nombre =

                    equipo;

            }

        }

        this.equipoMasGoleador = {

            nombre: nombre,

            goles: mayor

        };

    }

    //====================================================
    // Equipo menos goleado
    //====================================================

    calcularEquipoMenosGoleado() {

        const equipos = {};

        this.partidos.forEach(

            partido => {

                if (!partido.jugado) {

                    return;

                }

                if (

                    !equipos[

                        partido.local.nombre

                    ]

                ) {

                    equipos[

                        partido.local.nombre

                    ] = 0;

                }

                if (

                    !equipos[

                        partido.visitante.nombre

                    ]

                ) {

                    equipos[

                        partido.visitante.nombre

                    ] = 0;

                }

                equipos[

                    partido.local.nombre

                ] +=

                    partido.golesVisitante;

                equipos[

                    partido.visitante.nombre

                ] +=

                    partido.golesLocal;

            }

        );

        let menor = Infinity;

        let nombre = "";

        for (

            const equipo in equipos

        ) {

            if (

                equipos[equipo] <

                menor

            ) {

                menor =

                    equipos[equipo];

                nombre =

                    equipo;

            }

        }

        this.equipoMenosGoleado = {

            nombre: nombre,

            goles: menor

        };

    }

        //====================================================
    // Mostrar resumen
    //====================================================

    mostrarResumen() {

        console.log("");

        console.log("==============================");

        console.log("RESUMEN DEL MUNDIAL");

        console.log("==============================");

        console.log(

            "Partidos:",

            this.partidosJugados

        );

        console.log(

            "Goles:",

            this.goles

        );

        console.log(

            "Promedio:",

            this.promedio

        );

        if (

            this.equipoMasGoleador

        ) {

            console.log(

                "Más goleador:",

                this.equipoMasGoleador.nombre +

                " (" +

                this.equipoMasGoleador.goles +

                " goles)"

            );

        }

        if (

            this.equipoMenosGoleado

        ) {

            console.log(

                "Menos goleado:",

                this.equipoMenosGoleado.nombre +

                " (" +

                this.equipoMenosGoleado.goles +

                " goles recibidos)"

            );

        }

        if (

            this.campeon

        ) {

            console.log(

                "Campeón:",

                this.campeon.equipo.nombre

            );

        }

    }

    //====================================================
    // Guardar estadísticas
    //====================================================

    guardar() {

        Guardar.guardar(

            "estadisticas",

            {

                partidos:

                    this.partidosJugados,

                goles:

                    this.goles,

                promedio:

                    this.promedio,

                equipoMasGoleador:

                    this.equipoMasGoleador,

                equipoMenosGoleado:

                    this.equipoMenosGoleado,

                campeon:

                    this.campeon

            }

        );

    }

}