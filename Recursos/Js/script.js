
/*================ FUNCIÓN PARA GENERAR PERFILES ALEATORIOS =============*/
/*=======================================================*/

const nombreUno = document.querySelector('#nombre-nav');
const nombreDos = document.querySelector('#nombre-inicio');
const nombreTres = document.querySelector('#nombre-perfil');

const fotoUno = document.querySelector('#foto-nav');
const fotoDos = document.querySelector('#foto-perfil');

const correo = document.querySelector('#correo');
const telefono = document.querySelector('#telefono');
const direccion = document.querySelector('#direccion');

const generarUsuario = async() => {
    try {
        const url = 'https://randomuser.me/api/';
        const respuesta = await fetch(url);
        const {results} = await respuesta.json();
        const datos = results[0];

        nombreUno.textContent = datos.name.first + ' '+datos.name.last;
        nombreDos.textContent = datos.name.first + ' '+datos.name.last;
        nombreTres.textContent = datos.name.first + ' '+datos.name.last;

        fotoUno.src = datos.picture.large;
        fotoDos.src = datos.picture.large;

        correo.textContent = datos.email;
        telefono.textContent = datos.phone;
        direccion.textContent = datos.location.street.number+' '+datos.location.street.name
                                +', '+datos.location.city+' '+datos.location.state+' '+datos.location.country;

        console.log(datos);
    } catch (error) {
        console.log(error);
    }
};

/*------------- GENERA UN USUARIO AL CARGAR LA PAGINA ========*/

document.addEventListener('DOMContentLoaded', generarUsuario);

/*==================== FUNCIÓN EFECTO TIPEO DE LA SECCIÓN DE INICIO ====================*/

const typed = new Typed('#typed', {
    
    strings: ['Desarrollo Web', 'Diseño Web','Desarrollo UI/UX', 'Freelance'],
    stringsElement: null,
    typeSpeed: 75,
    startDelay: 2000,
    backSpeed: 75,
    smartBackspace: false,
    backDelay: 700,
    loop: true,
    loopCount: Infinity,
    showCursor: false,
    contentType: 'html',

});

/*==================== BOTÓN VOLVER AL INICIO ====================*/

function volverInicio(){
    const scrollTop = document.getElementById('boton-volver');
    
    if(this.scrollY >= 800) scrollTop.classList.remove('boton-oculto'); else scrollTop.classList.add('boton-oculto');
}

window.addEventListener('scroll', volverInicio);


/*==================== FUNCIÓN PARA REMOVER EL MENU AL HACER CLICK ====================*/

const navLink = document.querySelectorAll('.nav_link');

function linkAction(){

    document.getElementById('checkbox').checked = false; 
}
/*Cambia el estado del checkbox con cada click, asi cambia el estilo en css*/
navLink.forEach(n => n.addEventListener('click', linkAction));


/*================ Validación de formulario =============*/
/*=======================================================*/

let errorNombre = document.getElementById('error-nombre');
let errorEmail = document.getElementById('error-email');
let errorAsunto = document.getElementById('error-asunto');
let errorMensaje = document.getElementById('error-mensaje');
let errorEnviar = document.getElementById('error-enviar');

function validarNombre(){
    let nombre = document.getElementById('nombre').value;

        if ( nombre == '') {
            errorNombre.innerHTML = 'Por favor escribe tu nombre.';
            return false;
        }
        errorNombre.innerHTML = "<i class='bx bxs-check-circle'></i>";
        return true;
}
function validarEmail(){
    let email = document.getElementById('email').value;

        if ( email == 0) {
            errorEmail.innerHTML = 'Por favor escribe tu dirección de correo.';
            return false;
        }
        if ( !email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
            errorEmail.innerHTML = 'Por favor escribe una dirección de correo valida';
            return false;
        }

        errorEmail.innerHTML = "<i class='bx bxs-check-circle'></i>";
        return true;
}
function validarAsunto(){
    let asunto = document.getElementById('asunto').value;

        if ( asunto =='') {
            errorAsunto.innerHTML = 'Por favor escribe un asunto para tu mensaje.';
            return false;
        }
        errorAsunto.innerHTML = "<i class='bx bxs-check-circle'></i>";
        return true;
}
function validarMensaje(){
    let mensaje = document.getElementById('mensaje').value;
        if ( mensaje.length < 15) {
            errorMensaje.innerHTML ='Por favor expláyate un poco más.';
            return false;
        }
        errorMensaje.innerHTML = "<i class='bx bxs-check-circle'></i>";
        return true;
}
function validarEnviar(){
        if ( !validarNombre() || !validarEmail() || !validarAsunto() || !validarMensaje()) {
            errorEnviar.innerHTML ='Por favor completa el formulario antes de enviarlo.';
            setTimeout(function(){errorEnviar.style.display ='none';}, 5000);
            return false;
        }
}

/*============ FUNCIÓN PARA ENVIAR FORMULARIO COM SMTPJS =========*/
/*=================================================================*/
/*----------- Función que resetéa los advertencias-------*/

function resetearAlertas (){

    errorNombre.innerHTML = '';
    errorEmail.innerHTML = '';
    errorAsunto.innerHTML = '';
    errorMensaje.innerHTML = '';
}
function enviarMail () {
    Email.send({
        SecureToken : '991419df-010b-464e-abc7-92da77e27c67',
        To : 'srmmoto@gmail.com',
        From : 'srmmoto@gmail.com',
        Subject : 'Mensaje enviado desde el formulario de la página CV',
        Body : "Nombre: " + document.getElementById('nombre').value
                +"<br>Correo: " + document.getElementById('email').value
                +"<br>Asunto: " + document.getElementById('asunto').value
                +"<br>Mensaje: " + document.getElementById('mensaje').value
    }).then(
        message => alert(message)
    );
}

/*==================== FUNCIÓN PARA CAMBIAR TEMA CLARO/OSCURO ====================*/ 

const botonTema = document.getElementById('boton-tema');
const contenedor = document.getElementById('contenedor');
const contenedorCv = document.getElementById('contenedor-cv');
const encabezado = document.getElementById('encabezado');
const botonVolver = document.getElementById('boton-inicio');
const footer = document.getElementById('pie-pagina');

const temaDark = 'tema-dark';
const iconoTema = 'bx-sun';

// buscar si hay un tema y un icono seleccionado ya guardado, y aplica a una const
const temaSeleccionado = localStorage.getItem('tema-seleccionado');

const iconoSeleccionado = localStorage.getItem('icono-seleccionado');

// Función para cambiar el tema
function cambiarTema() {
    botonTema.classList.toggle(iconoTema);
    contenedor.classList.toggle(temaDark);
    contenedorCv.classList.toggle(temaDark);
    encabezado.classList.toggle(temaDark);
    footer.classList.toggle(temaDark);
    botonVolver.classList.toggle(temaDark);
    
    //------Guardar el tema y el icono seleccionados en localStorage
    const temaActual = contenedor.classList.contains(temaDark) ? 'dark' : 'light';
    const iconoActual = contenedor.classList.contains(temaDark) ? "dark" : "light";
    localStorage.setItem('tema-seleccionado', temaActual);
    localStorage.setItem('icono-seleccionado', iconoActual);
}

// Agregar evento al botón de cambio de tema
botonTema.addEventListener('click', cambiarTema);

// Aplicar el tema y el icono seleccionados del localStorage al cargar la página
if (temaSeleccionado && iconoSeleccionado) {
    if (temaSeleccionado === 'dark' && iconoSeleccionado === 'dark') {
        cambiarTema(); // Aplicar el tema oscuro si está seleccionado
    };
}

/*==================== DECLARACIÓN EL SERVICE WORKER ====================*/ 

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("./serviceworker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}
