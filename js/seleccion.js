let selecciones = [];

const contenedor =
document.getElementById("equipos");

async function cargarSelecciones(){

    const respuesta =
    await fetch("data/selecciones.json");

    selecciones =
    await respuesta.json();

    mostrarEquipos(selecciones);

}

function mostrarEquipos(lista){

    contenedor.innerHTML="";

    lista.forEach(equipo=>{

        contenedor.innerHTML += `

<div class="card">

<div class="top">

    <img
        class="bandera"
        src="${equipo.bandera}"
        alt="${equipo.nombre}">

    <div>

        <div class="nombre">
            ${equipo.nombre}
        </div>

        <div class="ranking">
            Ranking FIFA #${equipo.ranking}
        </div>

    </div>

</div>

<div class="stats">

Ataque

<div class="barra">

<div
class="progreso ataque"
style="width:${equipo.ataque}%">

</div>

</div>

Defensa

<div class="barra">

<div
class="progreso defensa"
style="width:${equipo.defensa}%">

</div>

</div>

Media

<div class="barra">

<div
class="progreso media"
style="width:${equipo.media}%">

</div>

</div>

</div>

<button
onclick="seleccionar('${equipo.nombre}')">

Seleccionar

</button>

</div>

`;

    });

}

function seleccionar(nombre){

    localStorage.setItem(
        "seleccion",
        nombre);

    alert(
        "Elegiste " +
        nombre);

}

document
.getElementById("buscador")
.addEventListener("input",
function(){

    const texto =
    this.value.toLowerCase();

    const filtrados =
    selecciones.filter(

    equipo=>

    equipo.nombre
    .toLowerCase()
    .includes(texto)

    );

    mostrarEquipos(filtrados);

});

document
.getElementById("orden")
.addEventListener("change",
function(){

    if(this.value==="alfabetico"){

        selecciones.sort(

        (a,b)=>

        a.nombre.localeCompare(b.nombre)

        );

    }else{

        selecciones.sort(

        (a,b)=>

        a.ranking-b.ranking

        );

    }

    mostrarEquipos(selecciones);

});

cargarSelecciones();