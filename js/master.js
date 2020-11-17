// Select Landing page Element
let landingPage = document.querySelector(".landing-page");

// get array of imgs

let imgArray = ["01.png", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// change background

// landingPage.style.backgroundImage = 'url("img/02.jpg")';


// setInterval(changeBGI(), 1000);

// function changeBGI() {
//     let randomNum = Math.floor(Math.random() * imgArray.length);

//     
// }

setInterval(() =>{
    let randomNum = Math.floor(Math.random() * imgArray.length);
    landingPage.style.backgroundImage = 'url("img/' + imgArray[randomNum]+'")';
}, 10000);
