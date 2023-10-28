import "./../styles/app.css";
import "./../styles/appStyles.scss";

import { createApp } from "./canvas.js";

console.log("Running Webpack Boilerplate");

createApp();


const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");

menuToggle.addEventListener("click", function() {
    if (sideMenu.style.left === "-300px" || sideMenu.style.left === "") {
        sideMenu.style.left = "0";
        menuToggle.innerHTML = `<div class="bar" style="transform: rotate(45deg) translate(5px, 5px);"></div>
                                <div class="bar" style="opacity: 0;"></div>
                                <div class="bar" style="transform: rotate(-45deg) translate(5px, -5px);"></div>`;
    } else {
        sideMenu.style.left = "-300px";
        menuToggle.innerHTML = `<div class="bar"></div>
                                <div class="bar"></div>
                                <div class="bar"></div>`;
    }
});