function rickRoll() {
    window.location.replace("https://www.youtube.com/watch?v=JzvDoyW5u5g");
}

animateSkillBar();

window.addEventListener('scroll', () => {
    var itemViewPortLocation = skillContainer.getBoundingClientRect().top;
    var viewPortHeight = window.innerHeight;
    var getDiv = document.querySelectorAll(".skillPercentage")
    let i;
    if (itemViewPortLocation < viewPortHeight - 50) {
        i = 0;
        while (i <= getDiv.length) {
            if (getDiv[i] == undefined) break;
            getDiv[i].style.animation = "skillPerAnimate 5s forwards";
            i++;
        }
    } 
});



function animateSkillBar(){
    var itemViewPortLocation = skillContainer.getBoundingClientRect().top;
    var viewPortHeight = window.innerHeight;
    var getDiv = document.querySelectorAll(".skillPercentage")
    let i;
    if (itemViewPortLocation < viewPortHeight - 50) {
        i = 0;
        while (i <= getDiv.length) {
            if (getDiv[i] == undefined) break;
            getDiv[i].style.animation = "skillPerAnimate 5s forwards";
            i++;
        }
    } 
}





