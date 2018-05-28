/**
 * justlazy 1.6.2
 *
 * Repo: https://github.com/fhopeman/justlazy
 * Demo: http://fhopeman.github.io/justlazy
 */

const imageAttributes = ['alt', 'src', 'srcset', 'title'];

function createImage (imgPlaceholder, imgAttributes, options) {
    const img = document.createElement("img"),
          progressive = options.progressive || false;

    img.onload = function() {
        if (options.onloadCallback)
            options.onloadCallback.call(img);
        if (!progressive)
            replacePlaceholderWithImage(imgPlaceholder, img, options.onreplaceCallback);
    };

    img.onerror = function() {
        if (options.onerrorCallback)
            options.onerrorCallback.call(img);
        if (!progressive)
            replacePlaceholderWithImage(imgPlaceholder, img, options.onreplaceCallback);
    };

    for (let attribute of imageAttributes)
        if (attribute in imgAttributes)
            img.setAttribute(attribute, imgAttributes[attribute]);

    if (progressive)
        replacePlaceholderWithImage(imgPlaceholder, img, options.onreplaceCallback);
}


function replacePlaceholderWithImage (imgPlaceholder, img, onreplaceCallback) {
    if (imgPlaceholder.parentNode) {
        imgPlaceholder.parentNode.replaceChild(img, imgPlaceholder);
        if (onreplaceCallback)
            onreplaceCallback.call(img);
    }
}


function resolveImageAttributes (imgPlaceholder) {
    const result = {};
    for (let attribute of imageAttributes)
        if (attribute in imgPlaceholder.dataset)
            result[attribute] = imgPlaceholder.dataset[attribute];
    return result;
}


function findContainingDetails(element) {
    const result = [];
    let detailElement = element.closest('details');
    while (detailElement) {
        result.push(detailElement);
        detailElement = detailElement.parentElement.closest('details');
    }
    return result;
}


export function isVisible (element, optionalThreshold, containingDetails) {
    for (let detailElement of containingDetails)
        if (! detailElement.open)
            return false;

    let windowInnerHeight = window.innerHeight || document.documentElement.clientHeight,
        threshold = optionalThreshold || 0;

    return element.getBoundingClientRect().top - windowInnerHeight <= threshold;
}


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
export function lazyLoad (imgPlaceholder, options = {}) {
    const imgAttributes = resolveImageAttributes(imgPlaceholder);
    if (imgAttributes.src)
        createImage(imgPlaceholder, imgAttributes, options);
}


/**
 * Registers the lazy loading event. If the placeholder becomes visible, the image
 * will be loaded automatically.
 *
 * @param {Object} imgPlaceholder The placeholder is a html node of any type (e.g. a span element).
 *                                The node has to provide the data element data-src and data-alt.
 *                                All other attributes are optional.
 * @param {Object} options Optional object of options.
 */
export function registerLazyLoad (imgPlaceholder, options = {}) {
    const containgDetails = findContainingDetails(imgPlaceholder);

    function eventHandler () {
        if (isVisible(imgPlaceholder, options.threshold, containgDetails)) {
            lazyLoad(imgPlaceholder, options);
            window.removeEventListener('scroll', eventHandler);
            for (let detailElement of containgDetails)
                detailElement.removeEventListener('toggle', eventHandler)
        }
    }

    if (isVisible(imgPlaceholder, options.threshold, containgDetails))
        lazyLoad(imgPlaceholder, options);
    else {
        window.addEventListener('scroll', eventHandler);
        for (let detailElement of containgDetails)
            detailElement.addEventListener('toggle', eventHandler)
    }
}


/**
 * Registers the lazy loading by the defined class of the placeholder(s). If the
 * placeholders become visible, the images will be loaded automatically.
 *
 * @param imgPlaceholderClass Class of the placeholder.
 * @param {Object} options Optional object of options.
 */
export function registerLazyLoadByClass (imgPlaceholderClass, options) {
    for (let element of document.querySelectorAll(`.${imgPlaceholderClass}`))
        registerLazyLoad(element, options);
}
