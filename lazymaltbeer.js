var lazymaltbeer = (function() {

    var lazyLoadImg = function(img) {
        console.log("lazy load img tag");
        console.log(img);
    };

    return {
        lazyLoadImg: lazyLoadImg
    };

})();