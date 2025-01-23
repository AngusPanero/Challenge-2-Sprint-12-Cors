const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 4001;
const cors = require("cors")

app.use(cors())

app.get("/", async (req, res) => {
    const url = `https://rickandmortyapi.com/api/character`
    
    try{
        const response = await axios.get(url)
        const personajes = response.data.results;
        const todosLosPersonajes = personajes.map(({ id, image, name, status, species, gender }) => 
            ({ id, image, name, status, species, gender }))

        res.json(todosLosPersonajes);

    } catch(error){
        res.status(404).json({ mensaje: `404 - Personaje No Encontrado`})
    }
})

app.get("/:personaje", async (req, res) => {
    const nombrePersonaje = decodeURIComponent(req.params.personaje)
    const url2 = `https://rickandmortyapi.com/api/character?name=${nombrePersonaje}`

    try{
        const response = await axios.get(url2)
        const personaje = response.data.results[0]
        res.json({ personaje })

    } catch(error){
        res.status(404).json({ Mensaje: `Personaje No Encontrado` })
    }
})

app.use((req, res) => {
    res.send(`<h1>404 - Página No Encontrada</h1>`)
})

app.listen(PORT, () => {
    console.log(`Server Listening On Port http://localhost:${PORT}`)
})