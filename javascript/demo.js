(function init() {

    var hideIncompleteLoadedImage = function() {
        this.style.display = "none";
    };

    var showImageAndRemoveSpinner = function() {
        this.style.display = "block";
        this.parentNode.classList.remove("justlazy-spinner");
    };

    // example 1
    Justlazy.registerLazyLoadByClass("load-if-visible-placeholder", {
        onreplaceCallback: hideIncompleteLoadedImage,
        onloadCallback: showImageAndRemoveSpinner
    });

    // example 2
    var placeholders = document.querySelectorAll('.load-with-threshold-placeholder');
    for (var i = 0; i < placeholders.length; ++i) {
        Justlazy.registerLazyLoad(placeholders[i], {
            onreplaceCallback: hideIncompleteLoadedImage,
            onloadCallback: showImageAndRemoveSpinner,
            threshold: 300
        });
    }

    // example 3
    document.getElementById("custom-event-btn").onclick = function() {
        var imgPlaceholder = document.getElementById("custom-event-placeholder");
        Justlazy.lazyLoad(imgPlaceholder, {
            onreplaceCallback: hideIncompleteLoadedImage,
            onloadCallback: showImageAndRemoveSpinner
        });

        return false;
    };

    // example 4
    document.getElementById("srcset-btn").onclick = function() {
        var imgPlaceholder = document.getElementById("srcset-placeholder");
        Justlazy.lazyLoad(imgPlaceholder, {
            onreplaceCallback: hideIncompleteLoadedImage,
            onloadCallback: showImageAndRemoveSpinner
        });

        return false;
    };

    // more lazy images
    Justlazy.registerLazyLoadByClass("lazy-image-placeholder", {
        onreplaceCallback: hideIncompleteLoadedImage,
        onloadCallback: showImageAndRemoveSpinner,
        threshold: 300
    });
})();
