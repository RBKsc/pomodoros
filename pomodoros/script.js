const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque= document.querySelector('.app__card-button--enfoque');
const botonDescansoLargo =document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo= document.querySelector('.app__title');
const botones=document.querySelectorAll('.app__card-button');
const enfoqueMusica= document.querySelector('#alternar-musica');
const iniciarPausarTexto = document.querySelector('#start-pause span');
const botonIniciarPausar= document.querySelector('#start-pause');
const iconoInicioPausar=document.querySelector('.app__card-primary-butto-icon');
const tiempoPantalla=document.querySelector('#timer');

const beepCero =new Audio('sonidos/beep.mp3');
const playInicio =new Audio('sonidos/play.wav');
const pausa = new Audio ('sonidos/pause.mp3');
const musica=new Audio ('sonidos/luna-rise-part-one.mp3');

let tiempoSegundos= 1500;
let idIntervalo=null; //Es null para indicar q no hay animación en curso.
//Cuando se inicia la animación, idInterval se actualiza con el valor devuelto por setInterval
//deteniendo la animación usando clearInterval con ese valor

musica.loop=true;

enfoqueMusica.addEventListener('change', ()=>{
    if (musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

botonCorto.addEventListener('click', ()=>{
    tiempoSegundos = 300;
    cambiarContexto ('descanso-corto');
    botonCorto.classList.add('active');
})

botonEnfoque.addEventListener('click', ()=> {
    tiempoSegundos=1500;
    cambiarContexto ('enfoque');
    botonEnfoque.classList.add('active');
})

botonDescansoLargo.addEventListener('click', ()=>{
    tiempoSegundos=900;
    cambiarContexto ('descanso-largo');
    botonDescansoLargo.classList.add('active');
})

function cambiarContexto (contexto){

    mostrarTiempo()
    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute ('data-contexto', contexto);
    banner.setAttribute('src', `imagenes/${contexto}.png`);

    switch (contexto){
        case "enfoque":
            titulo.innerHTML=`Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`

            break;
        case "descanso-corto":
            titulo.innerHTML=`¿Qué tal tomar un respiro?
            <strong class="app__title-strong"> ¡Realiza una pausa corta!
            </strong>`

            break;
        case "descanso-largo":
            titulo.innerHTML=`Es el momento de un descanso.
            <strong class="app__title-strong">Realiza una pausa larga.
            </strong>`

        default:
            break;
    }
}

const cuentaRegresiva = () =>{
  if (tiempoSegundos <= 0){
    beepCero.play();
    alert ("tiempo final");
     reiniciar();
    return
  }
    tiempoSegundos -= 1;
    mostrarTiempo ()
}

botonIniciarPausar.addEventListener('click', iniciarPausa);

function iniciarPausa (){
    if (idIntervalo){
        pausa.play();
        reiniciar();
        return
    }
    playInicio.play();
    idIntervalo=setInterval(cuentaRegresiva, 1000);
    iniciarPausarTexto.textContent = "Pausar";
    iconoInicioPausar.setAttribute('src', `imagenes/pause.png`);
}

function reiniciar (){
    clearInterval(idIntervalo); //detiene la ejecución de setInterval
    iniciarPausarTexto.textContent="Comenzar";
    iconoInicioPausar.setAttribute('src', `imagenes/play_arrow.png`);
    idIntervalo=null;
}

function mostrarTiempo (){
    const tiempo = new Date(tiempoSegundos * 1000);//date es un objeto de JS, para fechas y horas
    const tiempoFormateado =tiempo.toLocaleTimeString("es-MX", {minute:'2-digit', second:'2-digit'})
    tiempoPantalla.innerHTML =`${tiempoFormateado}`
}

mostrarTiempo ()