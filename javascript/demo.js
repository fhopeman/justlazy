document.addEventListener("DOMContentLoaded", function() {

    var justlazy = Justlazy();

    var initLazyBtn = function (btn, lazyImgElem) {
        btn.onclick = function() {
            var span = document.getElementById(lazyImgElem);
            if (span) {
                justlazy.lazyLoadImg(span);
            }
            return false;
        };
    };
    
    // img 1
    initLazyBtn(document.getElementById("load-img-1"), "lazy-img-1");

    // img 2
    initLazyBtn(document.getElementById("load-img-2"), "lazy-img-2");

    // img 3
    initLazyBtn(document.getElementById("load-img-3"), "lazy-img-3");

});
