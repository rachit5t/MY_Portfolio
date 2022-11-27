document.querySelector('#cancle').style.display = "none";
document.querySelector('#hamburger').addEventListener('click', () => {
    sidebar.classList.toggle("sidebarAnimate");
    hamburger.style.display = "none";
    setTimeout(() => {
        cancle.style.display = "inline";
    }, 280);
});

document.querySelector('#cancle').addEventListener('click', () => {
    sidebar.classList.toggle("sidebarAnimate");
    hamburger.style.display = "inline";
    cancle.style.display = "none";
});

function rickRoll() {
    window.location.replace("https://www.youtube.com/watch?v=JzvDoyW5u5g");
}

window.addEventListener('scroll', () => {
    var itemViewPortLocation = skillContainer.getBoundingClientRect().top;
    var viewPortHeight = window.innerHeight;
    var getDiv = document.querySelectorAll(".skillPercentage")
    let i;
    if (itemViewPortLocation < viewPortHeight - 150) {
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