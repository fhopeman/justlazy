(function init() {

    // example 1
    document.getElementById("loadImg1Btn").onclick = function() {
        var imgPlaceholder = document.getElementById("img1");
        Justlazy.lazyLoad(imgPlaceholder);

        return false;
    };

    // example 2
    document.getElementById("loadImg2Btn").onclick = function() {
        var imgPlaceholder = document.getElementById("img2");
        Justlazy.lazyLoad(imgPlaceholder);

        return false;
    };

    // example 3
    var imgPlaceholders = document.querySelectorAll('.load-if-visible');
    for (var i = 0; i < imgPlaceholders.length; ++i) {
        Justlazy.registerLazyLoad(imgPlaceholders[i]);
    }

})();
