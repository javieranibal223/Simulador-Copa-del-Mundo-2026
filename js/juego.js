//====================================================
// juego.js
//====================================================

class Juego {

    constructor() {

        this.selecciones = [];

        this.motorSorteo = null;

    }

    async iniciar() {

    await this.cargarSelecciones();

    this.motorSorteo =

        new MotorSorteo(

            this.selecciones

        );

    console.log(

        "Juego iniciado."

    );

    const generado =

        this.motorSorteo.generar();

    if (generado) {

        this.motorSorteo.mostrarGrupos();

    } else {

        console.error(

            "No se pudo generar el sorteo."

        );

    }

}

    async cargarSelecciones() {

        const respuesta =

            await fetch(

                "data/selecciones.json"

            );

        this.selecciones =

            await respuesta.json();

    }

}