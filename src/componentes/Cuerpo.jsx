import React, { useState } from 'react';
import Filtros from "./Filtros.jsx";
import Tabla from './Tabla.jsx';
import '../estilos/Cuerpo.css';

function Cuerpo() {
    const [filtro, setFiltro] = useState("");

    const recogerFiltro = (nuevoFiltro) => {
        setFiltro(nuevoFiltro);
    };

    return (
        <>
        <div className="cuerpo">
            <div className="filtros">
                <Filtros onFiltroChange={recogerFiltro} />
            </div>
            <div className="tabla">
                <Tabla filtro={filtro} />
            </div>
        </div>
        </>
    );
}

export default Cuerpo;
