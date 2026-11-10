import { calculateProgress } from "./logic.js";

const completed = 7;
const total = 10;
const progress = calculateProgress(completed, total);

document.querySelector("#completed").textContent = completed;
document.querySelector("#total").textContent = total;
document.querySelector("#progress").textContent = `${progress}%`;
document.querySelector("#bar").style.width = `${progress}%`;
