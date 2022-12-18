ham.addEventListener("click", ()=>{
    nav.classList.add('activee');
    mainContent.classList.add('mainRotate')
    console.log("hello");
    document.querySelector("html").style.overflow = "hidden"
    navBar.classList.remove("navOff")
});

cancle.addEventListener("click", ()=>{
    nav.classList.remove('activee');
    mainContent.classList.remove('mainRotate')
    document.querySelector("html").style.overflow = "visible"
    navBar.classList.add("navOff")
})


function rickRoll() {
    window.location.replace("https://www.youtube.com/watch?v=JzvDoyW5u5g");
}


window.addEventListener('scroll', () => {
    var itemViewPortLocation = skillContainer.getBoundingClientRect().top;
    var viewPortHeight = window.innerHeight;
    var getDiv = document.querySelectorAll(".skillPercentage")
    let i;
    if (itemViewPortLocation < viewPortHeight - 50) {
        i = 0;
        while (i <= getDiv.length) {
            getDiv[i].style.animation = "skillPerAnimate 5s forwards";
            i++;
        }
    } else {
        i = 0;
        while (i <= getDiv.length) {
            getDiv[i].style.animation = "";
            i++;
        }
    }
});



function openLink(n){
    window.open(n, '_blank');
}



