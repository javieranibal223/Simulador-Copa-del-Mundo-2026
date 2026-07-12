//====================================================
// tabla.js
// World Cup Simulator 2026
// Tabla de Posiciones
//====================================================

class Tabla {

    //====================================================
    // Constructor
    //====================================================

    constructor(grupos) {

        this.grupos = grupos;

        this.tablas = [];

    }

    //====================================================
    // Crear tablas
    //====================================================

    crearTablas() {

        this.tablas = [];

        this.grupos.forEach(

            grupo => {

                const tabla = {

                    grupo: grupo.nombre,

                    equipos: []

                };

                grupo.equipos.forEach(

                    equipo => {

                        tabla.equipos.push({

                            equipo: equipo,

                            pj: 0,

                            pg: 0,

                            pe: 0,

                            pp: 0,

                            gf: 0,

                            gc: 0,

                            dg: 0,

                            pts: 0

                        });

                    }

                );

                this.tablas.push(

                    tabla

                );

            }

        );

    }

    //====================================================
    // Buscar equipo en una tabla
    //====================================================

    buscarEquipo(tabla, nombre) {

        return tabla.equipos.find(

            registro =>

                registro.equipo.nombre ===

                nombre

        );

    }

    //====================================================
    // Procesar partidos
    //====================================================

    procesarPartidos(partidos) {

        partidos.forEach(

            partido => {

                if (!partido.jugado) {

                    return;

                }

                const tabla =

                    this.tablas.find(

                        t =>

                            t.grupo ===

                            partido.grupo

                    );

                if (!tabla) {

                    return;

                }

                const local =

                    this.buscarEquipo(

                        tabla,

                        partido.local.nombre

                    );

                const visitante =

                    this.buscarEquipo(

                        tabla,

                        partido.visitante.nombre

                    );

                this.actualizarEquipo(

                    local,

                    partido.golesLocal,

                    partido.golesVisitante

                );

                this.actualizarEquipo(

                    visitante,

                    partido.golesVisitante,

                    partido.golesLocal

                );

            }

        );

    }

        //====================================================
    // Actualizar estadísticas de un equipo
    //====================================================

    actualizarEquipo(equipo, golesFavor, golesContra) {

        equipo.pj++;

        equipo.gf += golesFavor;

        equipo.gc += golesContra;

        equipo.dg =

            equipo.gf -

            equipo.gc;

        if (golesFavor > golesContra) {

            equipo.pg++;

            equipo.pts += 3;

        }

        else if (golesFavor === golesContra) {

            equipo.pe++;

            equipo.pts++;

        }

        else {

            equipo.pp++;

        }

    }

    //====================================================
    // Ordenar un grupo
    //====================================================

    ordenarGrupo(tabla) {

        tabla.equipos.sort(

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

    }

    //====================================================
    // Ordenar todas las tablas
    //====================================================

    ordenarTodas() {

        this.tablas.forEach(

            tabla => {

                this.ordenarGrupo(

                    tabla

                );

            }

        );

    }

        //====================================================
    // Obtener clasificados
    //====================================================

    obtenerClasificados() {

        const clasificados = [];

        this.tablas.forEach(

            tabla => {

                if (tabla.equipos.length >= 2) {

                    clasificados.push(

                        tabla.equipos[0].equipo

                    );

                    clasificados.push(

                        tabla.equipos[1].equipo

                    );

                }

            }

        );

        return clasificados;

    }

    //====================================================
    // Mostrar una tabla
    //====================================================

    mostrarGrupo(tabla) {

        console.log("");

        console.log("==============================");

        console.log(

            "GRUPO " +

            tabla.grupo

        );

        console.log("==============================");

        tabla.equipos.forEach(

            (equipo, indice) => {

                console.log(

                    (indice + 1) +

                    ". " +

                    equipo.equipo.nombre +

                    " | Pts: " +

                    equipo.pts +

                    " | PJ: " +

                    equipo.pj +

                    " | PG: " +

                    equipo.pg +

                    " | PE: " +

                    equipo.pe +

                    " | PP: " +

                    equipo.pp +

                    " | GF: " +

                    equipo.gf +

                    " | GC: " +

                    equipo.gc +

                    " | DG: " +

                    equipo.dg

                );

            }

        );

    }

    //====================================================
    // Mostrar todas las tablas
    //====================================================

    mostrarTablas() {

        this.tablas.forEach(

            tabla => {

                this.mostrarGrupo(

                    tabla

                );

            }

        );

    }

    //====================================================
    // Guardar tablas
    //====================================================

    guardar() {

        Guardar.guardar(

            "tablas",

            this.tablas

        );

    }

}