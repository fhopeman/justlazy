document.addEventListener("DOMContentLoaded", function() {

    var initLazyBtn = function (btn, lazyPlaceholderId) {
        btn.onclick = function() {
            var lazyPlaceholder = document.getElementById(lazyPlaceholderId);
            if (lazyPlaceholder) {
                Justlazy.lazyLoadImg(lazyPlaceholder);
            }
            
            return false;
        };
    };

    // img 1
    initLazyBtn(document.getElementById("loadImg1"), "lazyImg1");

    // img 2
    initLazyBtn(document.getElementById("loadImg2"), "lazyImg2");

    // img 3
    initLazyBtn(document.getElementById("loadImg3"), "lazyImg3");

});
