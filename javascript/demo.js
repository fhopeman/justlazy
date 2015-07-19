(function init() {

    // example 1
    Justlazy.registerLazyLoadByClass("load-if-visible");

    // example 2
    var placeholderExample4 = document.querySelectorAll('.load-with-threshold');
    for (var i = 0; i < placeholderExample4.length; ++i) {
        Justlazy.registerLazyLoad(placeholderExample4[i], {
            threshold: 100
        });
    }

    // example 3
    document.getElementById("loadImg1Btn").onclick = function() {
        var imgPlaceholder = document.getElementById("img1");
        Justlazy.lazyLoad(imgPlaceholder);

        return false;
    };

    // example 4
    document.getElementById("loadImg2Btn").onclick = function() {
        var imgPlaceholder = document.getElementById("img2");
        Justlazy.lazyLoad(imgPlaceholder);

        return false;
    };
})();
