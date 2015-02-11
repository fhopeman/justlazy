var Lazymaltbeer = function() {
    'use strict';

    /**
     * Lazy load images with img tag.
     *
     * @param imgPlaceholder the placeholder is a html node of any type (e.g. a span element).
     *                       The node has to provide a data element src and alt.
     */
    var lazyLoadImg = function(imgPlaceholder) {
        var img = document.createElement("img");
        img.src = imgPlaceholder.dataset.src;
        img.alt = imgPlaceholder.dataset.alt;

        imgPlaceholder.parentNode.insertBefore(img, imgPlaceholder);
    };

    return {
        lazyLoadImg: lazyLoadImg
    };

};
