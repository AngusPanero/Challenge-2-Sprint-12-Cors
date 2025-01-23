const traerPersonajes = () => {
    const inputRM = document.getElementById("inputRM");
    const cargarRM = document.getElementById("cargarPersonaje");

    const valueRM = decodeURIComponent(inputRM.value.toLowerCase())

    fetch(`http://localhost:4001/${valueRM}`)
        .then(response => response.json())
        .then(data => {
            cargarRM.innerHTML = "";
            
            const { personaje } = data;
            console.log("Esta es la DATA", data);
            const { id, image, name, status, species, gender } = personaje;
            cargarRM.innerHTML = `
                <h2>${name}</h2>
                <img src="${image}" alt="${name}" />
                <p>ID: ${id}</p>
                <p>Tipo: ${species}</p>
                <p>Género: ${gender}</p>
                <p>Estado: ${status}</p>
            `;
        })
    .catch(error => cargarRM.innerHTML = `<p>404 - Personaje No Encontrado</p>`)
}
