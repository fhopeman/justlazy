(function init() {

    // example 1
    Justlazy.registerLazyLoadByClass("load-if-visible", {
        onreplaceCallback: function() {
            this.classList.add("justlazy-placeholder");
        },
        onloadCallback: function() {
            this.classList.remove("justlazy-placeholder");
        }
    });

    // example 2
    var placeholdersExample2 = document.querySelectorAll('.with-threshold');
    for (var i = 0; i < placeholdersExample2.length; ++i) {
        Justlazy.registerLazyLoad(placeholdersExample2[i], {
            threshold: 300
        });
    }

    // example 3
    document.getElementById("btn-load-1").onclick = function() {
        var imgPlaceholder = document.getElementById("img-1");
        Justlazy.lazyLoad(imgPlaceholder);

        return false;
    };

    // example 4
    document.getElementById("btn-load-2").onclick = function() {
        var imgPlaceholder = document.getElementById("img-2");
        Justlazy.lazyLoad(imgPlaceholder);

        return false;
    };
})();
