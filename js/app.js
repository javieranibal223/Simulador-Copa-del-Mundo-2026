//====================================================
// app.js
// World Cup Simulator 2026
// Interfaz principal
//====================================================

class App {

    //====================================================
    // Constructor
    //====================================================

    constructor() {

        this.app = document.getElementById("app");

    }

    //====================================================
    // Iniciar aplicación
    //====================================================

    iniciar() {

        this.mostrarInicio();

    }

    //====================================================
    // Pantalla inicial
    //====================================================

    mostrarInicio() {

        this.app.innerHTML =

        `

        <section class="inicio">

            <h2>World Cup Simulator 2026</h2>

            <p>

                Simulador completo del Mundial FIFA 2026.

            </p>

            <button id="btnNuevo">

                Nuevo Mundial

            </button>

        </section>

        `;

        document

            .getElementById("btnNuevo")

            .addEventListener(

                "click",

                () => {

                    this.nuevoMundial();

                }

            );

    }

    //====================================================
    // Nuevo Mundial
    //====================================================

    async nuevoMundial() {

        console.clear();

        console.log("");

        console.log("==============================");

        console.log("INICIANDO MUNDIAL");

        console.log("==============================");

        const juego = new Juego();

        await juego.iniciar();

        juego.motorSorteo.generar();

        juego.motorSorteo.mostrarGrupos();

        juego.calendario =

            new Calendario(

                juego.motorSorteo.grupos

            );

        juego.calendario.generar();

        this.mostrarCalendario(

            juego.calendario.partidos

        );

    }

    //====================================================
    // Mostrar grupos
    //====================================================

    mostrarGrupos(grupos) {

        let html =

        `

        <section class="grupos">

            <h2>

                Fase de grupos

            </h2>

        `;

        grupos.forEach(

            grupo => {

                html +=

                `

                <div class="grupo">

                    <h3>

                        Grupo ${grupo.nombre}

                    </h3>

                    <ul>

                `;

                grupo.equipos.forEach(

                    equipo => {

                        html +=

                        `

                        <li>

                            <img

                                src="${equipo.bandera}"

                                width="24">

                            ${equipo.nombre}

                        </li>

                        `;

                    }

                );

                html +=

                `

                    </ul>

                </div>

                `;

            }

        );

        html +=

        `

        </section>

        `;

        this.app.innerHTML = html;

    }

    //====================================================
    // Mostrar calendario
    //====================================================

    mostrarCalendario(partidos) {

        let html =

        `

        <section class="calendario">

            <h2>

                Calendario

            </h2>

        `;

        partidos.forEach(

            (partido, indice) => {

                html +=

                `

                <div class="partido">

                    <div class="encabezado">

                        Partido ${indice + 1}

                    </div>

                    <div class="equipos">

                        <span>

                            ${partido.local.nombre}

                        </span>

                        <strong>

                            VS

                        </strong>

                        <span>

                            ${partido.visitante.nombre}

                        </span>

                    </div>

                </div>

                `;

            }

        );

        html +=

        `

            <button id="btnSimular">

                Simular Mundial

            </button>

        </section>

        `;

        this.app.innerHTML = html;

        document

            .getElementById("btnSimular")

            .addEventListener(

                "click",

                () => {

                    this.simularMundial();

                }

            );

    }

    ////====================================================
// Simular Mundial
//====================================================

simularMundial() {

    console.clear();

    console.log("");

    console.log("==============================");

    console.log("SIMULANDO MUNDIAL");

    console.log("==============================");

    // Simular partidos

    const partidos =

        Guardar.cargar(

            "partidos"

        );

    const simulador =

        new Simulador(

            partidos

        );

    simulador.simularTodos();

    simulador.mostrarResultados();

    // Crear tablas

    const grupos =

        Guardar.cargar(

            "grupos"

        );

    const tabla =

        new Tabla(

            grupos

        );

    tabla.crearTablas();

    tabla.actualizar(partidos);

    tabla.ordenarTodas();

    // Clasificación

    const clasificacion =

        new Clasificacion(

            tabla.tablas

        );

    clasificacion.generar();

    clasificacion.mostrarClasificados();

    // Eliminatorias

    const eliminatorias =

        new Eliminatorias(

            clasificacion.clasificados

        );

    eliminatorias.simular();

    eliminatorias.mostrarCampeon();

    // Mostrar campeón en pantalla

    this.mostrarCampeon(

        eliminatorias.campeon

    );

}

    //====================================================
// Mostrar campeón
//====================================================

mostrarCampeon(campeon) {

    this.app.innerHTML =

    `

    <section class="campeon">

        <h2>

            🏆 CAMPEÓN DEL MUNDIAL 2026

        </h2>

        <img

            src="${campeon.equipo.bandera}"

            class="bandera-campeon"

        >

        <h1>

            ${campeon.equipo.nombre}

        </h1>

        <p>

            Ranking FIFA #${campeon.equipo.ranking}

        </p>

        <br>

        <button

            id="btnNuevo">

            Nuevo Mundial

        </button>

    </section>

    `;

    document

        .getElementById(

            "btnNuevo"

        )

        .addEventListener(

            "click",

            () => {

                location.reload();

            }

        );

}

}

