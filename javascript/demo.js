(function init() {

    // example 1
    Justlazy.registerLazyLoadByClass("load-if-visible");

    // example 2
    var placeholdersExample2 = document.querySelectorAll('.with-threshold');
    for (var i = 0; i < placeholdersExample2.length; ++i) {
        Justlazy.registerLazyLoad(placeholdersExample2[i], {
            threshold: 300
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
