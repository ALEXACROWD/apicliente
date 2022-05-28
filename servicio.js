//Pasos para consumir un api

//1.Conocer tecnicamente la uri del servicio o api a consumir (¿Para dónde voy?)
const URI = 'https://api.spotify.com/v1/artists/3fMbdgg4jU18AjLCKBhRSm/top-tracks?market=US'

//2.Armo la petición(¿Qué vas a hacer?)
const TOKEN = 'Bearer BQC1CTaSj1Qv9jmZqWUuGHEaRPkgYzk6XYf_E9i4lg29WR6VxTrljgj5qLXkdR3jpUJ92uZUn_RdSXP1xiGdN5hT1vTlyPHLM7JCgYhwv9akJ5dcco5LQtV6l9rpiGYgxK0wu8jjhxO7UoG-V6eVUKzeriHR1HJCYTA'
const PETICION = {
    method: "GET",
    headers: {Authorization: TOKEN}
}

//3.Consumir el api (Ir al servidor)
fetch(URI,PETICION)//Esto es lo que se conoce como promesa, pero hay que esperar y controlar la respuesta, sea exitosa o con error
.then(function(respuesta){
    return(respuesta.json())//garantizar que la respuesta tenga un formato, en este caso json
})//then es ¿qué hago si todo sale bien?
.then(function(respuesta){
    pintarCanciones(respuesta)//tengo la respuesta a disposición y puedo imprimirla o hacer lo que requiera
})
.catch(function(respuesta){
    //console.log(respuesta)//capturo la respuesta y muestro el error capturado
})//catch es ¿qué hago si algo sale mal?

//Función para pintar la información que llega de la api
function pintarCanciones(canciones){
    console.log(canciones)//objeto
    //console.log(canciones.tracks)//arreglo
    let fila = document.getElementById("fila")

    //Recorro el arreglo de canciones
    canciones.tracks.forEach(function(cancion){
        console.log(cancion.name)
        console.log(cancion.preview_url)
        console.log(cancion.album.images[0].url)

        //Crear una columna para cada canción
        let columna = document.createElement("div")
        columna.classList.add("col")

        //Crear la tarjeta
        let tarjeta = document.createElement("div")
        tarjeta.classList.add("card","h-100")

        //crear la foto
        let foto = document.createElement("img")
        foto.src=cancion.album.images[0].url
        foto.classList.add("card-img-top")

        //Crear el título
        let titulo = document.createElement("h5")
        titulo.classList.add("card-tittle", "text-center")
        titulo.textContent=cancion.name

        //Crear la popularidad
        let populi = document.createElement("p")
        populi.classList.add("text-center")
        populi.textContent="Puntos de popularidad: " + cancion.popularity

        //creo el audio
        let audio = document.createElement("audio")
        audio.src=cancion.preview_url
        audio.classList.add("w-100")
        audio.setAttribute("controls","controls")

        //PADRES E HIJOS
        tarjeta.appendChild(titulo)
        tarjeta.appendChild(foto)
        tarjeta.appendChild(populi)
        tarjeta.appendChild(audio)
        columna.appendChild(tarjeta)
        fila.appendChild(columna)
    })
}
