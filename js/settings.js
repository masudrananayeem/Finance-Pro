const darkMode =
document.getElementById("darkMode");

if(darkMode){

darkMode.checked =
localStorage.getItem("darkMode")
=== "true";

darkMode.addEventListener("change",()=>{

document.body.classList.toggle(
"dark-theme"
);

localStorage.setItem(
"darkMode",
darkMode.checked
);

});

}

if(
localStorage.getItem("darkMode")
=== "true"
){

document.body.classList.add(
"dark-theme"
);

}