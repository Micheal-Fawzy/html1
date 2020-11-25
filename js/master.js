// Check for saved color
const colorsLi = document.querySelectorAll(".colors-list li");
let mainColor = localStorage.getItem("color-option") ;
if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color",mainColor);
    activeColorRemove();
    let tempcolor = document.body.querySelector('.colors-box li[data-color="'+ mainColor +'"]')
    tempcolor.classList.add("active");
};

// Toggle spining class on icon
let GearIcon = document.querySelector(".toggle-settings .fa-cog"),
    settingsBox = document.querySelector(".settings-box");
function GearIconClcik() {
    GearIcon.classList.toggle("fa-spin");
    settingsBox.classList.toggle("open");
}
GearIcon.addEventListener ("click", GearIconClcik );

// Switch Colors
function activeColorRemove() {
    for (color of colorsLi){
        color.classList.remove("active");
    }
}
for (color of colorsLi) {
    color.addEventListener("click",(e) => {
        // color.classList;
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
        mainColor = localStorage.setItem("color-option", e.target.dataset.color);
        activeColorRemove();
        e.target.classList.add("active");
    });
}


// Select Landing page Element
let landingPage = document.querySelector(".landing-page");

// get array of imgs

let imgArray = ["01.png", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// change background

setInterval(changeBGI, 10000);
function changeBGI() {
    let randomNum = Math.floor(Math.random() * imgArray.length);
    landingPage.style.backgroundImage = 'url("img/' + imgArray[randomNum]+'")';
}

