(function () {

    var btnLazyLoad = window.document.getElementById("btn-lazy-load");
    var imgToLoad = window.document.getElementById("lazy-load-img");

    btnLazyLoad.onclick = function() {
        lazymaltbeer.lazyLoadImg(imgToLoad);
    };

})();
