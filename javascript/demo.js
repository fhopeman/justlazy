(function init() {

    // example 1
    document.getElementById("loadImg1").onclick = function() {
        var imgPlaceholder = document.getElementById("lazyImg1");
        Justlazy.lazyLoadImg(imgPlaceholder);

        return false;
    };

    // example 2
    document.getElementById("loadImg2").onclick = function() {
        var imgPlaceholder = document.getElementById("lazyImg2");
        Justlazy.lazyLoadImg(imgPlaceholder);

        return false;
    };

    // example 3
    document.getElementById("loadImg3").onclick = function() {
        var imgPlaceholder = document.getElementById("lazyImg3");
        Justlazy.lazyLoadImg(imgPlaceholder);

        return false;
    };

    // Justlazy.registerLazyLoad(document.getElementById("lazyImg4"));

})();
