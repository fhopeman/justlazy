/**
 * justlazy 1.6.2
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

    var _createImage = function(imgPlaceholder, imgAttributes, options) {
        var img = document.createElement("img");
        var progressive = options.progressive || false;

        img.onload = function() {
            if (!!options.onloadCallback) {
                options.onloadCallback.call(img);
            }
            if (!progressive) {
                _replacePlaceholderWithImage(imgPlaceholder, img, options.onreplaceCallback);
            }
        };

        img.onerror = function() {
            if (!!options.onerrorCallback) {
                options.onerrorCallback.call(img);
            }
            if (!progressive) {
                _replacePlaceholderWithImage(imgPlaceholder, img, options.onreplaceCallback);
            }
        };

        if (!!imgAttributes.title) {
            img.title = imgAttributes.title;
        }
        if (!!imgAttributes.srcset) {
            img.setAttribute("srcset", imgAttributes.srcset);
        }

        img.alt = imgAttributes.alt;
        img.src = imgAttributes.src;

        if (progressive) {
            _replacePlaceholderWithImage(imgPlaceholder, img, options.onreplaceCallback);
        }
    };

    var _replacePlaceholderWithImage = function(imgPlaceholder, img, onreplaceCallback) {
        var parentNode = imgPlaceholder.parentNode;
        if (!!parentNode) {
            parentNode.replaceChild(img, imgPlaceholder);
            if (!!onreplaceCallback) {
                onreplaceCallback.call(img);
            }
        }
    };

    var _resolveImageAttributes = function(imgPlaceholder) {
        return {
            src: imgPlaceholder.getAttribute("data-src"),
            alt: imgPlaceholder.getAttribute("data-alt"),
            title: imgPlaceholder.getAttribute("data-title"),
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
     *                                 Optional callback which is invoked after the image is loaded
     *                                 successfully but before the actual replacement.
     *                           - onerrorCallback:
     *                                 Optional error handler which is invoked before the actual
     *                                 replacement if the image could not be loaded.
     *                           - onreplaceCallback
     *                                 Optional callback which is invoked directly after the
     *                                 replacement of the placeholder.
     */
    var lazyLoad = function(imgPlaceholder, options) {
        var imgAttributes = _resolveImageAttributes(imgPlaceholder);
        var validatedOptions = _validateOptions(options);

        if (!!imgAttributes.src && (!!imgAttributes.alt || imgAttributes.alt === "")) {
            _createImage(
                imgPlaceholder,
                imgAttributes,
                validatedOptions
            );
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
            this.registerLazyLoad(placeholders[i], options);
        }
    };

    return {
        lazyLoad: lazyLoad,
        registerLazyLoad: registerLazyLoad,
        registerLazyLoadByClass: registerLazyLoadByClass
    };
}));