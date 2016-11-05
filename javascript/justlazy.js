/**
 * justlazy 1.6.0
 *
 * Repo: https://github.com/fhopeman/justlazy
 * Demo: http://fhopeman.github.io/justlazy
 */
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        root.Justlazy = factory();
    }
}(this, function() {
    "use strict";

    var _createImage = function(imgPlaceholder, imgAttributes, onloadCallback, onreplaceCallback) {
        var img = document.createElement("img");

        img.onload = function() {
            if (!!onloadCallback) {
                onloadCallback.call(img);
            }
        };
        if (!!imgAttributes.title) {
            img.title = imgAttributes.title;
        }
        if (!!imgAttributes.errorHandler) {
            img.setAttribute("onerror", imgAttributes.errorHandler);
        }
        if (!!imgAttributes.srcset) {
            img.setAttribute("srcset", imgAttributes.srcset);
        }

        img.alt = imgAttributes.alt;
        img.src = imgAttributes.src;

        _replacePlaceholderWithImage(imgPlaceholder, img, onreplaceCallback);
    };

    var _replacePlaceholderWithImage = function(imgPlaceholder, img, onreplaceCallback) {
        var parentNode = imgPlaceholder.parentNode;
        if (!!parentNode) {
            if (!!onreplaceCallback) {
                onreplaceCallback.call(img);
            }
            parentNode.replaceChild(img, imgPlaceholder);
        }
    };

    var _resolveImageAttributes = function(imgPlaceholder) {
        return {
            src: imgPlaceholder.getAttribute("data-src"),
            alt: imgPlaceholder.getAttribute("data-alt"),
            title: imgPlaceholder.getAttribute("data-title"),
            errorHandler: imgPlaceholder.getAttribute("data-error-handler"),
            srcset: imgPlaceholder.getAttribute("data-srcset")
        };
    };

    var _validateOptions = function(options) {
        return options || {};
    };

    var _isVisible = function(placeholder, optionalThreshold) {
        var windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;
        var threshold = optionalThreshold || 0;

        return placeholder.getBoundingClientRect().top - windowInnerHeight <= threshold;
    };

    var _loadImgIfVisible = function(imgPlaceholder, options) {
        var scrollEventCallback = function(e) {
            if (_isVisible(imgPlaceholder, options.threshold)) {
                lazyLoad(imgPlaceholder, options);

                if (window.removeEventListener) {
                    window.removeEventListener(e.type, scrollEventCallback, false);
                } else {
                    window.detachEvent("on" + e.type, scrollEventCallback);
                }
            }
        };

        return scrollEventCallback;
    };

    /**
     * Lazy loads image with img tag.
     *
     * @param {Object} imgPlaceholder The placeholder is a html node of any type (e.g. a span element).
     *                                The node has to provide the data element data-src and data-alt.
     *                                All other attributes are optional.
     * @param {Object} options Optional object with following attributes:
     *                           - onloadCallback:
     *                                 Optional callback which is invoked after the image is loaded.
     *                           - onerrorCallback:
     *                                 Optional error handler which is invoked if the
     *                                 replacement of the lazy placeholder fails (e.g. mandatory
     *                                 attributes missing).
     *                           - onreplaceCallback:
     *                                 Optional callback which will be invoked immediately before
     *                                 the image placeholder is replaced with the image.
     */
    var lazyLoad = function(imgPlaceholder, options) {
        var imgAttributes = _resolveImageAttributes(imgPlaceholder);
        var validatedOptions = _validateOptions(options);

        if (!!imgAttributes.src && (!!imgAttributes.alt || imgAttributes.alt === "")) {
            _createImage(imgPlaceholder, imgAttributes, validatedOptions.onloadCallback, validatedOptions.onreplaceCallback);
        } else {
            if (!!validatedOptions.onerrorCallback) {
                validatedOptions.onerrorCallback.call(imgPlaceholder);
            }
        }
    };

    /**
     * Registers the lazy loading event. If the placeholder becomes visible, the image
     * will be loaded automatically.
     *
     * @param {Object} imgPlaceholder The placeholder is a html node of any type (e.g. a span element).
     *                                The node has to provide the data element data-src and data-alt.
     *                                All other attributes are optional.
     * @param {Object} options Optional object of options.
     */
    var registerLazyLoad = function(imgPlaceholder, options) {
        var validatedOptions = _validateOptions(options);
        if (_isVisible(imgPlaceholder, validatedOptions.threshold)) {
            lazyLoad(imgPlaceholder, options);
        } else {
            var loadImgIfVisible = _loadImgIfVisible(imgPlaceholder, validatedOptions);
            if (window.addEventListener) {
                window.addEventListener("scroll", loadImgIfVisible, false);
            } else {
                window.attachEvent("onscroll", loadImgIfVisible);
            }
        }
    };

    /**
     * Registers the lazy loading by the defined class of the placeholder(s). If the
     * placeholders become visible, the images will be loaded automatically.
     *
     * @param imgPlaceholderClass Class of the placeholder.
     * @param {Object} options Optional object of options.
     */
    var registerLazyLoadByClass = function(imgPlaceholderClass, options) {
        var placeholders = document.querySelectorAll("." + imgPlaceholderClass);
        for (var i = 0; i < placeholders.length; ++i) {
            Justlazy.registerLazyLoad(placeholders[i], options);
        }
    };

    return {
        lazyLoad: lazyLoad,
        registerLazyLoad: registerLazyLoad,
        registerLazyLoadByClass: registerLazyLoadByClass
    };
}));
