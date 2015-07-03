(function init() {

    // example 1
    document.getElementById("loadImg1Btn").onclick = function() {
        var imgPlaceholder = document.getElementById("img1");
        Justlazy.lazyLoadImg(imgPlaceholder);

        return false;
    };

    // example 2
    document.getElementById("loadImg2Btn").onclick = function() {
        var imgPlaceholder = document.getElementById("img2");
        Justlazy.lazyLoadImg(imgPlaceholder);

        return false;
    };

    // example 3
    document.getElementById("loadImg3Btn").onclick = function() {
        var imgPlaceholder = document.getElementById("img3");
        Justlazy.lazyLoadImg(imgPlaceholder);

        return false;
    };

    // Justlazy.registerLazyLoad(document.getElementById("lazyImg4"));

})();
