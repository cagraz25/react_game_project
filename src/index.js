import { StrictMode } from "react";
import { createRoot } from "react-dom/client";


import "./bruin.css";
import Game from "./bruin";

const root = createRoot(document.getElementById("board"));
root.render(
 <StrictMode>
    <Game />
  </StrictMode>

);
