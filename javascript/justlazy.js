/**
 * justlazy.js 0.6.0-SNAPSHOT
 *
 * https://github.com/fhopeman/justlazy
 */
var Justlazy = (function() {
    'use strict';

    var module = {};

    /**
     * Creates an img html node and sets the attributes of the
     * image. If the image is loaded successfully, the placeholder
     * will be replaced with the image.
     *
     * @param imgPlaceholder placeholder element of the img to lazy load.
     * @param imgAttributes attributes of the image which will be created.
     * @param onloadCallback optional onload callback function.
     *
     */
    var createImage = function (imgPlaceholder, imgAttributes, onloadCallback) {
        var img = document.createElement("img");

        img.onload = function() {
            replacePlacholderWithImage(imgPlaceholder, img);
            if (onloadCallback) {
                onloadCallback.call(img);
            }
        };
        img.src = imgAttributes.src;
        img.alt = imgAttributes.alt;
        if (imgAttributes.title) {
            img.title = imgAttributes.title;
        }
        if (imgAttributes.errorHandler) {
            img.setAttribute("onerror", imgAttributes.errorHandler);
        }
        if (imgAttributes.srcset) {
            img.setAttribute("srcset", imgAttributes.srcset);
        }
    };

    /**
     * Replaces the img placeholder (html node of any type) with the img.
     *
     * @param imgPlaceholder img placeholder html node.
     * @param img img node itself.
     */
    var replacePlacholderWithImage = function (imgPlaceholder, img) {
        var parentNode = imgPlaceholder.parentNode;
        if (parentNode) {
            parentNode.replaceChild(img, imgPlaceholder);
        }
    };

    /**
     * Reads out the relevant attributes of the imagePlaceholder.
     *
     * @param imgPlaceholder placeholder which holds image attributes.
     *
     * @returns object with image attributes.
     */
    var resolveImageAttributes = function(imgPlaceholder) {
        return {
            src: imgPlaceholder.getAttribute("data-src"),
            alt: imgPlaceholder.getAttribute("data-alt"),
            title: imgPlaceholder.getAttribute("data-title"),
            errorHandler: imgPlaceholder.getAttribute("data-error-handler"),
            srcset: imgPlaceholder.getAttribute("data-srcset")
        };
    };

    /**
     * Lazy loads image with img tag.
     *
     * @param imgPlaceholder the placeholder is a html node of any type (e.g. a span element).
     *                       The node has to provide the data element data-src and data-alt.
     *                       All other attributes are optional.
     * @param onloadCallback optional callback which is invoked after the image is loaded.
     * @param onLazyLoadErrorCallback optional error handler which is invoked if the
     *                                replacement of the lazy placeholder fails (e.g. mandatory
     *                                attributes missing).
     */
    module.lazyLoadImg = function(imgPlaceholder, onloadCallback, onLazyLoadErrorCallback) {
        var imgAttributes = resolveImageAttributes(imgPlaceholder);

        if (imgAttributes.src && (imgAttributes.alt || imgAttributes.alt === "")) {
            createImage(imgPlaceholder, imgAttributes, onloadCallback);
        } else {
            onLazyLoadErrorCallback.call(imgPlaceholder);
        }
    };

    return module;

})();
