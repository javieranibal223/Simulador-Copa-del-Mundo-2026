//====================================================
// sorteo.js
// World Cup Simulator 2026
// Motor de Sorteo
//====================================================

class MotorSorteo {

    //====================================================
    // Constructor
    //====================================================

    constructor(selecciones) {

        this.selecciones = selecciones;

        this.torneo = {
            grupos: []
        };

        this.grupos = [];

        this.bombo1 = [];
        this.bombo2 = [];
        this.bombo3 = [];
        this.bombo4 = [];

        this.MAX_INTENTOS = 100;

    }

    //====================================================
    // Método principal
    //====================================================

    generar() {

        let intento = 1;

        while (intento <= this.MAX_INTENTOS) {

            this.reiniciar();

            this.crearGrupos();

            this.crearBombos();

            this.asignarCabezasSerie();

            const sorteoValido =
                this.sortearBombos();

            if (
                sorteoValido &&
                this.validarGrupos()
            ) {

                this.torneo.grupos =
                    this.grupos;

                this.guardar();

                console.log(
                    "Sorteo generado correctamente."
                );

                console.log(
                    "Intento: " + intento
                );

                return true;

            }

            intento++;

        }

        console.error(
            "No fue posible generar un sorteo válido."
        );

        return false;

    }

    //====================================================
    // Reiniciar
    //====================================================

    reiniciar() {

        this.grupos = [];

        this.bombo1 = [];

        this.bombo2 = [];

        this.bombo3 = [];

        this.bombo4 = [];

        this.torneo = {

            grupos: []

        };

        this.selecciones.forEach(

            equipo => {

                equipo.grupo = null;

            }

        );

    }

    //====================================================
    // Crear grupos
    //====================================================

    crearGrupos() {

        for (let i = 0; i < 12; i++) {

            this.grupos.push({

                nombre:
                    String.fromCharCode(
                        65 + i
                    ),

                equipos: [],

                confederaciones: {

                    UEFA: 0,

                    CONMEBOL: 0,

                    CONCACAF: 0,

                    CAF: 0,

                    AFC: 0,

                    OFC: 0

                }

            });

        }

    }

    //====================================================
    // Buscar selección
    //====================================================

    buscar(nombre) {

        return this.selecciones.find(

            equipo =>

                equipo.nombre === nombre

        );

    }

    //====================================================
    // Crear bombos
    //====================================================

    crearBombos() {

        this.bombo1 = [];

        this.bombo2 = [];

        this.bombo3 = [];

        this.bombo4 = [];

        const cabezasSerie = [

            "Canadá",
            "Estados Unidos",
            "México",
            "Argentina",
            "España",
            "Francia",
            "Inglaterra",
            "Portugal",
            "Brasil",
            "Marruecos",
            "Países Bajos",
            "Bélgica"

        ];

        // Bombo 1
        cabezasSerie.forEach(

            nombre => {

                const equipo =
                    this.buscar(nombre);

                if (equipo) {

                    this.bombo1.push(
                        equipo
                    );

                }

            }

        );

        // Restantes
        const restantes =
            this.selecciones.filter(

                equipo =>

                    !cabezasSerie.includes(
                        equipo.nombre
                    )

            );

        // Ranking FIFA
        restantes.sort(

            (a, b) =>

                a.ranking -
                b.ranking

        );

        this.bombo2 =
            restantes.slice(0, 12);

        this.bombo3 =
            restantes.slice(12, 24);

        this.bombo4 =
            restantes.slice(24, 36);

        Utilidades.mezclar(
            this.bombo2
        );

        Utilidades.mezclar(
            this.bombo3
        );

        Utilidades.mezclar(
            this.bombo4
        );

    }

    //====================================================
    // Asignar cabezas de serie
    //====================================================

    asignarCabezasSerie() {

        const gruposFijos = [

            {
                grupo: "A",
                equipo: "Canadá"
            },

            {
                grupo: "B",
                equipo: "Estados Unidos"
            },

            {
                grupo: "C",
                equipo: "México"
            },

            {
                grupo: "D",
                equipo: "Argentina"
            },

            {
                grupo: "E",
                equipo: "España"
            },

            {
                grupo: "F",
                equipo: "Francia"
            },

            {
                grupo: "G",
                equipo: "Inglaterra"
            },

            {
                grupo: "H",
                equipo: "Portugal"
            },

            {
                grupo: "I",
                equipo: "Brasil"
            },

            {
                grupo: "J",
                equipo: "Marruecos"
            },

            {
                grupo: "K",
                equipo: "Países Bajos"
            },

            {
                grupo: "L",
                equipo: "Bélgica"
            }

        ];

        gruposFijos.forEach(

            item => {

                const grupo =
                    this.grupos.find(

                        g =>

                            g.nombre ===
                            item.grupo

                    );

                const equipo =
                    this.buscar(

                        item.equipo

                    );

                this.agregarEquipo(

                    grupo,

                    equipo

                );

            }

        );

    }

        //====================================================
    // Actualizar contadores
    //====================================================

    actualizarContadores(grupo, equipo) {

        grupo.confederaciones[
            equipo.confederacion
        ]++;

    }

    //====================================================
    // Agregar equipo a grupo
    //====================================================

    agregarEquipo(grupo, equipo) {

        grupo.equipos.push(
            equipo
        );

        equipo.grupo =
            grupo.nombre;

        this.actualizarContadores(
            grupo,
            equipo
        );

    }

    //====================================================
    // Verificar si un equipo puede entrar
    //====================================================

    puedeEntrar(grupo, equipo) {

        // Grupo completo
        if (
            grupo.equipos.length >= 4
        ) {

            return false;

        }

        const cantidad =

            grupo.confederaciones[
                equipo.confederacion
            ];

        // UEFA puede tener hasta 2
        if (
            equipo.confederacion ===
            "UEFA"
        ) {

            return cantidad < 2;

        }

        // Resto máximo 1
        return cantidad < 1;

    }

    //====================================================
    // Obtener grupos válidos
    //====================================================

    obtenerGruposValidos(equipo) {

        const gruposValidos = [];

        this.grupos.forEach(

            grupo => {

                if (
                    this.puedeEntrar(
                        grupo,
                        equipo
                    )
                ) {

                    gruposValidos.push(
                        grupo
                    );

                }

            }

        );

        return gruposValidos;

    }

    //====================================================
    // Elegir grupo
    //====================================================

    elegirGrupo(gruposValidos) {

        if (
            gruposValidos.length === 1
        ) {

            return gruposValidos[0];

        }

        // Ordenar por cantidad de equipos
        gruposValidos.sort(

            (a, b) =>

                a.equipos.length -
                b.equipos.length

        );

        const menorCantidad =

            gruposValidos[0]
                .equipos.length;

        const candidatos =

            gruposValidos.filter(

                grupo =>

                    grupo.equipos.length ===
                    menorCantidad

            );

        const indice =

            Math.floor(

                Math.random() *
                candidatos.length

            );

        return candidatos[
            indice
        ];

    }

    //====================================================
    // Sortear bombos
    //====================================================

    sortearBombos() {

        const bombos = [

            this.bombo2,

            this.bombo3,

            this.bombo4

        ];

        for (

            const bombo

            of bombos

        ) {

            Utilidades.mezclar(
                bombo
            );

            for (

                const equipo

                of bombo

            ) {

                const gruposValidos =

                    this.obtenerGruposValidos(
                        equipo
                    );

                // No existe grupo válido
                if (
                    gruposValidos.length === 0
                ) {

                    return false;

                }

                const grupo =

                    this.elegirGrupo(
                        gruposValidos
                    );

                this.agregarEquipo(

                    grupo,

                    equipo

                );

            }

        }

        return true;

    }

        //====================================================
    // Validar grupos
    //====================================================

    validarGrupos() {

        for (const grupo of this.grupos) {

            // Debe tener 4 equipos
            if (grupo.equipos.length !== 4) {

                return false;

            }

            // Debe tener al menos 1 UEFA
            if (
                grupo.confederaciones.UEFA < 1
            ) {

                return false;

            }

            // Máximo 2 UEFA
            if (
                grupo.confederaciones.UEFA > 2
            ) {

                return false;

            }

            // Máximo 1 del resto
            if (
                grupo.confederaciones.CONMEBOL > 1
            ) {

                return false;

            }

            if (
                grupo.confederaciones.CONCACAF > 1
            ) {

                return false;

            }

            if (
                grupo.confederaciones.CAF > 1
            ) {

                return false;

            }

            if (
                grupo.confederaciones.AFC > 1
            ) {

                return false;

            }

            if (
                grupo.confederaciones.OFC > 1
            ) {

                return false;

            }

        }

        return true;

    }

    //====================================================
    // Guardar torneo
    //====================================================

    guardar() {

        Guardar.guardar(

            "torneo",

            this.torneo

        );

    }

    //====================================================
    // Mostrar grupos
    //====================================================

    mostrarGrupos() {

        console.clear();

        this.grupos.forEach(

            grupo => {

                console.log("");

                console.log(
                    "========================"
                );

                console.log(
                    "GRUPO " +
                    grupo.nombre
                );

                console.log(
                    "========================"
                );

                grupo.equipos.forEach(

                    equipo => {

                        console.log(

                            equipo.bandera +

                            " " +

                            equipo.nombre +

                            " (" +

                            equipo.confederacion +

                            ")"

                        );

                    }

                );

            }

        );

    }

}