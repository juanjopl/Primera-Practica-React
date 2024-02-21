import React, { useEffect, useState } from 'react';
import '../estilos/Tabla.css';

function Tabla({ filtro }) {
  const [personajes, setPersonajes] = useState([]);
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);

  useEffect(() => {
    let url = 'https://rickandmortyapi.com/api/character';
    let filtroURL = Object.entries(filtro)
      .map(([clave, valor]) => valor && `${clave}=${valor}`)
      .filter(Boolean)
      .join('&');
    if (filtroURL) {
      url += `?${filtroURL}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const personajesData = data.results.map((resultado) => ({
          id: resultado.id,
          nombre: resultado.name,
          estado: resultado.status,
          especie: resultado.species,
          genero: resultado.gender,
          origen: resultado.origin.name,
          localizacion: resultado.location.name,
          imagen: resultado.image,
          tipo: resultado.type
        }));
        setPersonajes(personajesData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [filtro]);

  const personajesFiltrados = personajes.filter((personaje) => {
    return (
      (!filtro.ciudad || personaje.localizacion === filtro.ciudad) &&
      (!filtro.especie || personaje.especie === filtro.especie) &&
      (!filtro.origen || personaje.origen === filtro.origen) &&
      (!filtro.genero || personaje.genero === filtro.genero) &&
      (!filtro.estado || personaje.estado === filtro.estado) &&
      (!filtro.buscador ||
        personaje.nombre.toLowerCase().startsWith(filtro.buscador.toLowerCase()))
    );
  });

  const mostrarInfo = (personaje) => {
    setPersonajeSeleccionado(personaje);
  }
  const cerrarPopup = () => {
    setPersonajeSeleccionado(null);
}

  const checkEstado = (estado) => {
    switch (estado) {
      case 'Alive':
        return {color: 'green'};
      case 'Dead':
        return {color: 'red'};
      case 'unknown':
        return {color: 'darkgrey'};
    }
  }

  const checkType = (tipo) => {
    if(tipo == "") {
      return "No declarado";
    }

    return tipo;
  }

  return (
    <div id="personajes">
        {personajesFiltrados.length === 0 ? (
            <h1>No se encontraron personajes</h1>
        ) : (
            personajesFiltrados.map((personaje) => (
              <article key={personaje.id} onClick={() => mostrarInfo(personaje)}>
                <img src={personaje.imagen} alt={personaje.nombre} />
                <h3>{personaje.nombre}</h3>
                <span>Estado: {personaje.estado}</span>
                <br />
                <span>Especie: {personaje.especie}</span>
                <br />
                <span>Género: {personaje.genero}</span>
                <br />
                <span>Origen: {personaje.origen}</span>
                <br />
                <span>Localizacion: {personaje.localizacion}</span>
              </article>
            ))
        )}

    {personajeSeleccionado && (
      <>
        <div className="fondo"></div>
        <div className='popup'>
        <span className="cerrar" onClick={cerrarPopup}>
              X
        </span>
        <div className="contenido-popup">
            <div className="foto">
              <img src={personajeSeleccionado.imagen} alt={personajeSeleccionado.nombre} />
            </div>
            <div className="personaje">
              <h2>{personajeSeleccionado.nombre}</h2>
              <div className="informacion">
                <h4>Estado: <span style={checkEstado(personajeSeleccionado.estado)}>{personajeSeleccionado.estado}</span></h4>
                <h4>Especie: <span>{personajeSeleccionado.especie}</span></h4>
                <h4>Género: <span>{personajeSeleccionado.genero}</span></h4>
                <h4>Tipo: <span>{checkType(personajeSeleccionado.tipo)}</span></h4>
                <h4>Origen: <span>{personajeSeleccionado.origen}</span></h4>
                <h4>Localizacion: <span>{personajeSeleccionado.localizacion}</span></h4>
              </div>
            </div>
        </div>
        </div>
      </>
    )}

    </div>
  );
}

export default Tabla;
