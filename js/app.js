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

        this.app =

            document.getElementById(

                "app"

            );

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

            <h2>

                World Cup Simulator 2026

            </h2>

            <p>

                Simulador completo del Mundial FIFA 2026.

            </p>

            <button id="btnNuevo">

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

                    this.nuevoMundial();

                }

            );

    }

    //====================================================
    // Nuevo Mundial
    //====================================================

        //====================================================
    // Nuevo Mundial
    //====================================================

    async nuevoMundial() {

        console.clear();

        console.log("");

        console.log("==============================");

        console.log("INICIANDO MUNDIAL");

        console.log("==============================");

        const juego =

            new Juego();

        await juego.iniciar();

        juego.motorSorteo.generar();

        juego.motorSorteo.mostrarGrupos();

        juego.calendario =

            new Calendario(

                juego.motorSorteo.grupos

            );

        juego.calendario.generar();

        this.mostrarGrupos(

            juego.motorSorteo.grupos

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

                Fase de Grupos

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

}