// Select Landing page Element
let landingPage = document.querySelector(".landing-page");
// get array of imgs
let imgArray = ["01.png", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let iCounter;
const colorsLi = document.querySelectorAll(".colors-list li");
let BGI_value;
let BGI_Radio = document.forms[0];
let time = 10 ;
GBI_interval = setInterval(changeSteadyBGI, time*1000);
BGI_Range = BGI_Radio[3];
let BGI_img = localStorage.getItem("background-img") ;
let mainColor = localStorage.getItem("color-option") ;
let BGI = localStorage.getItem("background-radio") ;
let BGI_Range_local = localStorage.getItem("range-value") ;

// Check for saved data
if (BGI !== null) {
    for (let i = 0; i < BGI_Radio.length-1; i++) {
        if (BGI_Radio[i].value === BGI ) {
            BGI_Radio[i].checked = true;
            if (BGI === "Stop") {
                clearInterval(GBI_interval);
                landingPage.style.backgroundImage = 'url("img/' + imgArray[BGI_img]+'")';
                document.querySelector("div.range-wrap").style.display = "none";
            } else if (BGI === "Random") {
                clearInterval(GBI_interval);
                GBI_interval = setInterval(changeRandomBGI, time*1000);
                document.querySelector("div.range-wrap").style.display = "block";
            } else if (BGI === "Steady") {
                clearInterval(GBI_interval);
                GBI_interval = setInterval(changeSteadyBGI, time*1000);
                document.querySelector("div.range-wrap").style.display = "block";
            }
        }
    }
}
if (BGI_Range_local !== null) {
    BGI_Range.value = BGI_Range_local;
    time = BGI_Range.value ;
    clearInterval(GBI_interval);
    radio_bgi();
}
if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color",mainColor);
    activeColorRemove();
    let tempcolor = document.body.querySelector('.option-box li[data-color="'+ mainColor +'"]')
    tempcolor.classList.add("active");
}

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




// change background
function changeRandomBGI() {
    let randomNum = Math.floor(Math.random() * imgArray.length);
    landingPage.style.backgroundImage = 'url("img/' + imgArray[randomNum]+'")';
}
GBI_interval;

// Background
BGI_Radio.addEventListener("change", radio_bgi);
function radio_bgi() {
    for (let i = 0; i < BGI_Radio.length-1; i++) {
        if (BGI_Radio[i].checked) {
            BGI_value = BGI_Radio[i].value;
        }
    }
    if (BGI_value === "Stop") {
        clearInterval(GBI_interval);
        BGI = localStorage.setItem("background-radio", BGI_value) ;
        document.querySelector("div.range-wrap").style.display = "none";
    } else if (BGI_value === "Random") {
        clearInterval(GBI_interval);
        GBI_interval = setInterval(changeRandomBGI, time*1000);
        document.querySelector("div.range-wrap").style.display = "block";
        BGI = localStorage.setItem("background-radio", BGI_value) ;
    } else if (BGI_value === "Steady") {
        clearInterval(GBI_interval);
        GBI_interval = setInterval(changeSteadyBGI, time*1000);
        document.querySelector("div.range-wrap").style.display = "block";
        BGI = localStorage.setItem("background-radio", BGI_value) ;
    }
}
iCounter = 0;
function changeSteadyBGI() {
    let Counter = iCounter % 5 ;
    landingPage.style.backgroundImage = 'url("img/' + imgArray[Counter]+'")';
    BGI_img = localStorage.setItem("background-img", Counter) ;
    iCounter = iCounter + 1;
}
BGI_Range.addEventListener("input", (e) => {
    time = BGI_Range.value ;
    radio_bgi();
    BGI_Range_local = localStorage.setItem("range-value",BGI_Range.value ) ;
});

const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
    const range = wrap.querySelector(".range");
    const bubble = wrap.querySelector(".bubble");
    range.addEventListener("input", () => {
        setBubble(range, bubble);
    });
    setBubble(range, bubble);
});

function setBubble(range, bubble) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val;
    // Sorta magic numbers based on size of the native UI thumb
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}

// Skills
let ourSkills = document.querySelector(".skills");
var executed = false;

window.onscroll = function () {
    // skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;

    // outer height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // Window Scroll top
    let windowScrollTop = this.pageYOffset;
    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight) && !executed){
        let allSkills = document.querySelectorAll('.skills span');
        for (skill of allSkills) {
            let dataSkill = skill.dataset.progress;
            skill.style.width = dataSkill;
        }
        let bMusic = new Audio("https://raw.githubusercontent.com/Micheal-Fawzy/html1/main/anxious-586.mp3");
        bMusic.play();
        executed = true;
    };

    // this.console.log(skillsOffset);
    // this.console.log(skillsOuterHeight);
};

// Create popup of the image
let ourGallery = document.querySelectorAll(".images-box img");
for( imgs of ourGallery) {
    imgs.addEventListener("click", (e) => {
        let overlay = document.createElement("div");
        let popupBox = document.createElement("div");
        let popupImg = document.createElement("img");
        let closeButton = document.createElement("span");
        if(e.target.alt !== null) {
            let imgHeading = document.createElement("h3");
            imgHeading.textContent = e.target.alt ;
            popupBox.appendChild(imgHeading);
        };
        closeButton.textContent = "X";
        closeButton.classList.add("close-button");
        popupBox.appendChild(closeButton);
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);
        popupBox.classList.add("popup-box");
        // popupBox.setAttribute("width","70%");
        // popupBox.setAttribute("height","70%");
        popupImg.src = e.target.src;
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);
    });
};

document.addEventListener('click', function(e) {
    if (e.target.className == "close-button") {
        document.querySelector(".popup-box").remove();
        document.querySelector(".popup-overlay").remove();
    };
});
