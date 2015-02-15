var Justlazy = function() {
    'use strict';

    var module = {};

    /**
     * Creates an img html node and sets the src and alt
     * attributes.
     *
     * @param src mandatory image source attribute.
     * @param alt optional alt text attribute.
     *
     * @returns {HTMLElement} img html node.
     */
    var createImg = function (src, alt) {
        var img = document.createElement("img");

        img.src = src;
        if (alt) {
            img.alt = alt;
        }

        return img;
    };

    /**
     * Replaces the img placeholder (html node of any type) with the img.
     *
     * @param imgPlaceholder img placeholder html node.
     * @param img img node itself.
     */
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
     *                       The node has to provide the data element data-src. The data-alt
     *                       attribute is optional.
     */
    module.lazyLoadImg = function(imgPlaceholder) {
        var src = imgPlaceholder.getAttribute("data-src");
        var alt = imgPlaceholder.getAttribute("data-alt");

        if (src) {
            var img = createImg(src, alt);
            replacePlacholderWithImg(imgPlaceholder, img);
        }
    };

    return module;

};
