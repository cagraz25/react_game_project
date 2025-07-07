/*
window.onload = function() {
    setGame();
}

*/

import React from 'react';
import { useState, useEffect } from 'react';

export default function Game() {
    const [tiles, setTiles] = useState([]);

    useEffect(() => {
        setGame();
    }, []);

    function setGame() {
        const newTiles = [];
        for (let i = 0; i < 9; i++) {
            newTiles.push({ id: i.toString() });
        }
        setTiles(newTiles);
    }

    return (
        <div id="trees">
            {tiles.map(tile => (
                <div key={tile.id} id={tile.id}></div>
            ))}
        </div>
    );
}

