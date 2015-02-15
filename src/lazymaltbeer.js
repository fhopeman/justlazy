var Lazymaltbeer = function() {
    'use strict';

    var createImg = function (src, alt) {
        var img = document.createElement("img");
        img.src = src;
        if (alt) {
            img.alt = alt;
        }

        return img;
    };

    var replacePlacholderWithImg = function (imgPlaceholder, img) {
        var parentNode = imgPlaceholder.parentNode;
        if (parentNode) {
            parentNode.insertBefore(img, imgPlaceholder);
            parentNode.removeChild(imgPlaceholder);
        }
    };

    /**
     * Lazy load images with img tag.
     *
     * @param imgPlaceholder the placeholder is a html node of any type (e.g. a span element).
     *                       The node has to provide the data elements src and alt.
     */
    var lazyLoadImg = function(imgPlaceholder) {
        var src = imgPlaceholder.getAttribute("data-src");
        var alt = imgPlaceholder.getAttribute("data-alt");

        if (src) {
            var img = createImg(src, alt);
            replacePlacholderWithImg(imgPlaceholder, img);
        }
    };

    return {
        lazyLoadImg: lazyLoadImg
    };

};
