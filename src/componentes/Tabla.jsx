import React, { useEffect, useState } from 'react';
import '../estilos/Tabla.css';

function Tabla({ filtro }) {
  const [personajes, setPersonajes] = useState([]);

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
      (!filtro.buscador || personaje.nombre === filtro.buscador)
    );
  });

  return (
    <div id="personajes">
      {
      personajesFiltrados.map((personaje) => (
        <article key={personaje.id}>
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
      ))}
    </div>
  );
}

export default Tabla;
