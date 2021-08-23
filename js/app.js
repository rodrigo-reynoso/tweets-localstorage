// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Eventos
eventsListeners()
function eventsListeners(){
    formulario.addEventListener('submit',agregarTweets);
    document.addEventListener('DOMContentLoaded',()=>{
        tweets = JSON.parse(localStorage.getItem('tweet'))|| [];
        mostrarTweetsEnHTML();
    })
}
// Funciones
function agregarTweets(e){
     e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    if(tweet === ''){
        agregarError('No puede guardar un mensaje vacio, escribe un mensaje');
        return;
    }
    const tweetObj = {
        id: Date.now(),
        texto: tweet
    }
    tweets = [...tweets, tweetObj];    
    // console.log(tweet)
     mostrarTweetsEnHTML();
     formulario.reset();
}
function mostrarTweetsEnHTML(){
    limpiarHTML();

    console.log(tweets)
    if(tweets.length> 0){
    tweets.forEach((tweet)=>{
        const li = document.createElement('li');
        li.textContent = tweet.texto;
        const btnBorrar = document.createElement('a');
        btnBorrar.textContent = 'X';
        btnBorrar.classList = 'borrar-tweet';
        btnBorrar.onclick = () =>{ // arrow es la unica manera de pasarle un parametro, con function no se puede pasar parametros en onclick escribiendo solo la funcion ---  IMPORTANTE -----
             eliminarTweet(tweet.id);
            
        }
        listaTweets.appendChild(li);
        li.appendChild(btnBorrar);   
        })
    }
    // Sincronizar con localstorage
    localStorage.setItem('tweet',JSON.stringify(tweets));
    
}
function eliminarTweet(idDelTweet){
     tweets = tweets.filter(tweet => tweet.id !== idDelTweet);
     mostrarTweetsEnHTML();
}
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}
function agregarError(mensaje){
    const error = document.createElement('p');
    error.innerHTML = mensaje;
    error.classList.add('error');
    const contenedor = document.querySelector('#contenido');
    contenedor.appendChild(error);
    setTimeout(()=>{
        error.remove();
    },3000)

}