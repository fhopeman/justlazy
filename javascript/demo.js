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
    var placeholderExample3 = document.querySelectorAll('.loadIfVisible');
    for (var i = 0; i < placeholderExample3.length; ++i) {
        Justlazy.registerLazyLoad(placeholderExample3[i]);
    }

    // example 4
    var placeholderExample4 = document.querySelectorAll('.loadWithThreshold');
    for (var i = 0; i < placeholderExample4.length; ++i) {
        Justlazy.registerLazyLoad(placeholderExample4[i], {
            threshold: 100
        });
    }
})();
