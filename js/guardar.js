//====================================================
// guardar.js
//====================================================

class Guardar {

    static guardar(

        clave,

        datos

    ) {

        localStorage.setItem(

            clave,

            JSON.stringify(datos)

        );

    }

    static cargar(clave) {

        const datos =

            localStorage.getItem(

                clave

            );

        if (datos == null) {

            return null;

        }

        return JSON.parse(datos);

    }

}