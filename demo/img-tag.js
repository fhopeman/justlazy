(function () {

    var lazymaltbeer = Lazymaltbeer();

    var btnLazyLoad = window.document.getElementById("btn-lazy-load");
    var imgToLoad = window.document.getElementById("lazy-load-img");

    var btnLazyLoad1 = window.document.getElementById("btn-lazy-load-1");
    var imgToLoad1 = window.document.getElementById("lazy-load-img-1");

    btnLazyLoad.onclick = function() {
        lazymaltbeer.lazyLoadImg(imgToLoad);
    };

    btnLazyLoad1.onclick = function() {
        lazymaltbeer.lazyLoadImg(imgToLoad1);
    };

})();
