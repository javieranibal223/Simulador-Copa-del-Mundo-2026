//====================================================
// utilidades.js
//====================================================

class Utilidades {

    static mezclar(arreglo) {

        for (

            let i = arreglo.length - 1;

            i > 0;

            i--

        ) {

            const j = Math.floor(

                Math.random() *

                (i + 1)

            );

            [

                arreglo[i],

                arreglo[j]

            ] = [

                arreglo[j],

                arreglo[i]

            ];

        }

    }

}