(function init() {

    // example 1
    Justlazy.registerLazyLoadByClass("load-if-visible-placeholder");

    // example 2
    var placeholders = document.querySelectorAll('.load-with-threshold-placeholder');
    for (var i = 0; i < placeholders.length; ++i) {
        Justlazy.registerLazyLoad(placeholders[i], {
            threshold: 300
        });
    }

    // example 3
    document.getElementById("custom-event-btn").onclick = function() {
        var imgPlaceholder = document.getElementById("custom-event-placeholder");
        Justlazy.lazyLoad(imgPlaceholder);

        return false;
    };

    // example 4
    document.getElementById("srcset-btn").onclick = function() {
        var imgPlaceholder = document.getElementById("srcset-placeholder");
        Justlazy.lazyLoad(imgPlaceholder);

        return false;
    };

    // more lazy images
    Justlazy.registerLazyLoadByClass("lazy-image-placeholder", {
        threshold: 300
    });
})();
