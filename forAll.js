ham.addEventListener("click", ()=>{
    nav.classList.add('activee');
    mainContent.classList.add('mainRotate')
    console.log("hello");
    document.querySelector("html").style.overflow = "hidden"
    navBar.classList.remove("navOff")
    borderBright.classList.add("activeBorder")
});

cancle.addEventListener("click", ()=>{
    nav.classList.remove('activee');
    mainContent.classList.remove('mainRotate')
    document.querySelector("html").style.overflow = "visible"
    navBar.classList.add("navOff")
    borderBright.classList.remove("activeBorder")
})