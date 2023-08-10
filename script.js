function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const roleTitles = ["Aspiring Data Scientist", "Python Enthusiast", "Full-Stack Web Developer", "Programmer"];
const roleTitleElement = document.getElementById("role-title");

let index = 0;
let roleIndex = 0;

function updateRoleTitle() {
  if (roleIndex >= roleTitles[index].length) {
    roleIndex = 0;
    index = (index + 1) % roleTitles.length;
  }
  roleTitleElement.textContent = roleTitles[index].substring(0, roleIndex + 1);
  roleIndex++;
}

setInterval(updateRoleTitle, 205);
