var Justlazy = (function() {
    'use strict';

    var module = {};

    /**
     * Creates an img html node and sets the src and alt
     * attributes.
     *
     * @param src mandatory image source attribute.
     * @param alt mandatory alt text attribute.
     * @param title optional title attribute.
     * @param errorHandler optional error handler.
     * @param srcset optional srcset attribute.
     *
     * @returns {HTMLElement} img html node.
     */
    var createImg = function (src, alt, title, errorHandler, srcset) {
        var img = document.createElement("img");

        img.src = src;
        img.alt = alt;
        if (title) {
            img.title = title;
        }
        if (errorHandler) {
            img.setAttribute("onerror", errorHandler);
        }
        if (srcset) {
            img.setAttribute("srcset", srcset);
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
            parentNode.replaceChild(img, imgPlaceholder);
        }
    };

    /**
     * Lazy load images with img tag.
     *
     * @param imgPlaceholder the placeholder is a html node of any type (e.g. a span element).
     *                       The node has to provide the data element data-src. The data-alt
     *                       and data-title attributes are optional.
     */
    module.lazyLoadImg = function(imgPlaceholder) {
        var src = imgPlaceholder.getAttribute("data-src");
        var alt = imgPlaceholder.getAttribute("data-alt");
        var title = imgPlaceholder.getAttribute("data-title");
        var errorHandler = imgPlaceholder.getAttribute("data-error-handler");
        var srcset = imgPlaceholder.getAttribute("data-srcset");

        if (src && alt) {
            var img = createImg(src, alt, title, errorHandler, srcset);
            replacePlacholderWithImg(imgPlaceholder, img);
        }
    };

    return module;

})();
