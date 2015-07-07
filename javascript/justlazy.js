/**
 * justlazy 0.8.0-SNAPSHOT
 *
 * https://github.com/fhopeman/justlazy
 */
var Justlazy = (function() {
    'use strict';

    /**
     * Creates an img html node and sets the attributes of the
     * image. If the image is loaded successfully, the placeholder
     * will be replaced with the image.
     *
     * @param {Object} imgPlaceholder Placeholder element of the img to lazy load.
     * @param {Object} imgAttributes Attributes of the image which will be created.
     * @param {Function} onloadCallback Optional onload callback function.
     *
     */
    var _createImage = function (imgPlaceholder, imgAttributes, onloadCallback) {
        var img = document.createElement("img");

        img.onload = function() {
            _replacePlacholderWithImage(imgPlaceholder, img);
            if (!!onloadCallback) {
                onloadCallback.call(img);
            }
        };
        img.src = imgAttributes.src;
        img.alt = imgAttributes.alt;
        if (!!imgAttributes.title) {
            img.title = imgAttributes.title;
        }
        if (!!imgAttributes.errorHandler) {
            img.setAttribute("onerror", imgAttributes.errorHandler);
        }
        if (!!imgAttributes.srcset) {
            img.setAttribute("srcset", imgAttributes.srcset);
        }
    };

    /**
     * Replaces the img placeholder (html node of any type) with the img.
     *
     * @param {Object} imgPlaceholder Image placeholder html node.
     * @param {Object} img Image node itself.
     */
    var _replacePlacholderWithImage = function (imgPlaceholder, img) {
        var parentNode = imgPlaceholder.parentNode;
        if (!!parentNode) {
            parentNode.replaceChild(img, imgPlaceholder);
        }
    };

    /**
     * Reads out the relevant attributes of the imagePlaceholder.
     *
     * @param {Object} imgPlaceholder Lazy image placeholder which holds image attributes.
     *
     * @returns {Object} Object with image attributes.
     */
    var _resolveImageAttributes = function(imgPlaceholder) {
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
     * @param {Object} imgPlaceholder The placeholder is a html node of any type (e.g. a span element).
     *                                The node has to provide the data element data-src and data-alt.
     *                                All other attributes are optional.
     * @param {Function} onloadCallback Optional callback which is invoked after the image is loaded.
     * @param {Function} onLazyLoadErrorCallback Optional error handler which is invoked if the
     *                                           replacement of the lazy placeholder fails (e.g. mandatory
     *                                           attributes missing).
     */
    var lazyLoad = function(imgPlaceholder, onloadCallback, onLazyLoadErrorCallback) {
        console.log("lazy load now");
        var imgAttributes = _resolveImageAttributes(imgPlaceholder);

        if (!!imgAttributes.src && (!!imgAttributes.alt || imgAttributes.alt === "")) {
            _createImage(imgPlaceholder, imgAttributes, onloadCallback);
        } else {
            if (!!onLazyLoadErrorCallback) {
                onLazyLoadErrorCallback.call(imgPlaceholder);
            }
        }
    };

    var _getScrollTop = function() {
        return window.scrollY || document.documentElement.scrollTop;
    };

    var _isVisible = function(placeholder) {
        var windowBottomOffset = window.innerHeight + _getScrollTop();
        console.log("height: " + window.innerHeight);
        console.log("scrollY: " + _getScrollTop());
        console.log("offset: " + windowBottomOffset);
        return windowBottomOffset - placeholder.offsetTop >= 0;
    };

    var _loadImgIfVisible = function(imgPlaceholder, onloadCallback, onLazyLoadErrorCallback) {
        var scrollEventCallback = function(e) {
            if (_isVisible(imgPlaceholder)) {
                lazyLoad(imgPlaceholder, onloadCallback, onLazyLoadErrorCallback);

                if (e.target.removeEventListener) {
                    e.target.removeEventListener(e.type, scrollEventCallback, false);
                } else {
                    e.target.detachEvent(e.type, scrollEventCallback);
                }
            }
        };

        return scrollEventCallback;
    };

    var registerLazyLoad = function(imgPlaceholder, onloadCallback, onLazyLoadErrorCallback) {
        console.log("register");
        var loadImgIfVisible = _loadImgIfVisible(imgPlaceholder, onloadCallback, onLazyLoadErrorCallback);
        if (window.addEventListener) {
            window.addEventListener("scroll", loadImgIfVisible, false);
        } else {
            window.attachEvent("onscroll", loadImgIfVisible);
        }
    };

    return {
        lazyLoad: lazyLoad,
        registerLazyLoad: registerLazyLoad
    };

})();
