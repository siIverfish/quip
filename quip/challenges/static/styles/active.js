document.addEventListener("DOMContentLoaded", function() {
    var currentPath = window.location.pathname;
    var navLinks = document.getElementsByClassName("navitem");
    for (var i = 0; i < navLinks.length; i++) {
        var href = navLinks[i].getAttribute("href");
        if (currentPath === href) {
            var previousActive = document.querySelector(".navitem.active");
            if (previousActive) {
                previousActive.classList.remove("active");
            }
            navLinks[i].classList.add("active");
        }
    }
});