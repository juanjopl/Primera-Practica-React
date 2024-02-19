import '../estilos/Filtros.css';
import React, { useState, useEffect } from 'react';

function Filtros({onFiltroChange}) {
    const [ciudades, setCiudades] = useState([]);
    const [especies, setEspecies] = useState([]);
    const [origenes, setOrigenes] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [estados, setEstados] = useState([]);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState({
        ciudad: '',
        especie: '',
        origen: '',
        genero: '',
        estado: '',
        buscador: ''
    });

    useEffect(() => {
        const url = 'https://rickandmortyapi.com/api/character';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let resultados = data.results;
                let ciudades = [];
                let especies = [];
                let origenes = [];
                let generos = [];
                let estados = [];

                resultados.forEach(resultado => {
                    let nombre = resultado.location.name;
                    if (!ciudades.includes(nombre)) {
                        ciudades.push(nombre);
                    }
                    let especie = resultado.species;
                    if (!especies.includes(especie)) {
                        especies.push(especie);
                    }
                    let origen = resultado.origin.name;
                    if (!origenes.includes(origen)) {
                        origenes.push(origen);
                    }
                    let genero = resultado.gender;
                    if(!generos.includes(genero)) {
                        generos.push(genero);
                    }
                    let estado = resultado.status;
                    if(!estados.includes(estado)) {
                        estados.push(estado);
                    }
                });

                setCiudades(ciudades);
                setEspecies(especies);
                setOrigenes(origenes);
                setGeneros(generos);
                setEstados(estados);

            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleChange = (event, filtroKey) => {
        const nuevoFiltro = filtroKey === 'buscador' ? event.target.value : event.target.value;
        setFiltroSeleccionado(prevState => ({
            ...prevState,
            [filtroKey]: nuevoFiltro,
          }));
        if(onFiltroChange) {
            onFiltroChange({
                ...filtroSeleccionado,
                [filtroKey]:nuevoFiltro,
            });
        }
    };

    return (
        <>  
            <table>
                <tbody>
                <tr>
                    <td colSpan={2}>
                        <input type="search" name="buscador" id="buscador" placeholder='Buscar...' onChange={(e) => handleChange(e, 'buscador')}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Localizacion:
                    </td>
                    <td>
                        <select id="localizaciones" onChange={(e) => handleChange(e,'ciudad')}>
                        <option value="">...</option>
                            {ciudades.map((ciudad, index) => (
                                <option key={index} value={ciudad}>
                                {ciudad}
                                </option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        Origen:
                    </td>
                    <td>
                    <select id="origen" onChange={(e) => handleChange(e,'origen')}>
                    <option value="">...</option>
                        {origenes.map((origen, index) => (
                            <option key={index} value={origen}>
                            {origen}
                            </option>
                        ))}
                    </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        Especie:
                    </td>
                    <td>
                    <select id="especie" onChange={(e) => handleChange(e,'especie')}>
                    <option value="">...</option>
                        {especies.map((especie, index) => (
                            <option key={index} value={especie}>
                            {especie}
                            </option>
                        ))}
                    </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        Género:
                    </td>
                    <td>
                    <select id="genero" onChange={(e) => handleChange(e,'genero')}>
                    <option value="">...</option>
                        {generos.map((genero, index) => (
                            <option key={index} value={genero}>
                            {genero}
                            </option>
                        ))}
                    </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        Estado
                    </td>
                    <td>
                    <select id="estado" onChange={(e) => handleChange(e,'estado')}>
                    <option value="">...</option>
                        {estados.map((estado, index) => (
                            <option key={index} value={estado}>
                            {estado}
                            </option>
                        ))}
                    </select>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    )
}
export default Filtros;