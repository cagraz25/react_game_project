/*
window.onload = function() {
    setGame();
}

*/

import React from "react";

export default function Game (){

    return(setGame());
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        document.getElementById("board").appendChild(tile);
    }
}