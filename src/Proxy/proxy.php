<?php
    $filtro = $_GET['filtro'];
    switch ($filtro) {
        case 'personajes':
            $url = 'https://rickandmortyapi.com/api/character';
            break;
        case 'localizaciones':
            $url = 'https://rickandmortyapi.com/api/location';
            break;
        case 'episodios':
            $url = 'https://rickandmortyapi.com/api/episode';
            break;
        default:
            $url = '';
            break;
    }
    $response = file_get_contents($url);
    header('Content-Type: application/json');
    echo $response;
?>