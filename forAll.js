ham.addEventListener("click", ()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        nav.classList.add('activee');
        mainContent.classList.add('mainRotate')
        console.log("hello");
        document.querySelector("html").style.overflow = "hidden"
        navBar.classList.remove("navOff")
        borderBright.classList.add("activeBorder")
    }, 350); // Wait for scroll to top before opening nav
});

cancle.addEventListener("click", ()=>{
    nav.classList.remove('activee');
    mainContent.classList.remove('mainRotate')
    document.querySelector("html").style.overflow = "visible"
    navBar.classList.add("navOff")
    borderBright.classList.remove("activeBorder")
})


