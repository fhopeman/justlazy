var base64Image = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
var base64Image2 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
var base64ImageDefault = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNg+M9QDwADgQF/e5IkGQAAAABJRU5ErkJggg==";

var testCase = function (testCaseId, tagName) {
    return document
        .getElementById(testCaseId)
        .getElementsByTagName(tagName);
};

var withElements = function (tagName) {
    return tagName;
};

describe("justlazy", function () {

    it("should be initialized", function () {
        expect(Justlazy).not.toBeUndefined();
    });

    it("should be able to cope with undefined options", function () {
        loadFixtures("imgTagWithSpan.html");
        var span = testCase("testSpan", withElements("span"))[0];
        expect(span).toBeDefined();
        Justlazy.lazyLoad(span);
    });

});

describe("justlazy should lazy load span", function () {

    beforeEach(function () {
        loadFixtures("imgTagWithSpan.html");
    });

    it("without extra stuff", function (done) {
        var span = testCase("testSpan", withElements("span"))[0];

        Justlazy.lazyLoad(span, {
            onloadCallback: function () {
                var img = testCase("testSpan", withElements("img"))[0];
                expect(img).toHaveAttr("src", base64Image);
                expect(img).toHaveAttr("alt", "alt-test-image");
                expect(img).toHaveAttr("title", "a title");
                expect(testCase("testSpan", withElements("span"))[0]).not.toExist();
                done();
            }
        });
    });

    it("with just mandatory attributes", function (done) {
        var span = testCase("testSpanWithMandatoryAttributesOnly", withElements("span"))[0];

        Justlazy.lazyLoad(span, {
            onloadCallback: function () {
                var img = testCase("testSpanWithMandatoryAttributesOnly", withElements("img"))[0];
                expect(img).toHaveAttr("src", base64Image);
                expect(img).toHaveAttr("alt", "some alt text");
                expect(img).not.toHaveAttr("title");
                expect(img).not.toHaveAttr("onerror");
                // use following instead of 'expect(img).not.toHaveAttr("srcset");', because
                // some browsers doesn't support the srcset-attribute via jquery-select
                expect(img.getAttribute("srcset")).toBeNull();
                expect(testCase("testSpanWithMandatoryAttributesOnly", withElements("span"))[0]).not.toExist();
                done();
            }
        });
    });

    it("with content (remove content)", function (done) {
        var span = testCase("testSpanWithContent", withElements("span"))[0];
        expect(span).toHaveText("some content here");

        Justlazy.lazyLoad(span, {
            onloadCallback: function () {
                var img = testCase("testSpanWithContent", withElements("img"))[0];
                expect(img).toHaveAttr("src", base64Image);
                expect(img).toHaveAttr("alt", "alt-test-image");
                expect(img).not.toHaveText("some content here");
                expect(testCase("testSpanWithContent", withElements("span"))[0]).not.toExist();
                done();
            }
        });
    });

    it("with style attribute (remove styling)", function (done) {
        var span = testCase("testSpanWithCss", withElements("span"))[0];
        expect(span).toHaveCss({display: "none"});

        Justlazy.lazyLoad(span, {
            onloadCallback: function () {
                var img = testCase("testSpanWithCss", withElements("img"))[0];
                expect(img).toHaveAttr("src", base64Image);
                expect(img).toHaveAttr("alt", "alt-test-image");
                expect(img).not.toHaveCss({display: "none"});
                expect(testCase("testSpanWithCss", withElements("span"))[0]).not.toExist();
                done();
            }
        });
    });

    it("with error handler", function (done) {
        var span = testCase("testSpanWithErrorHandler", withElements("span"))[0];

        expect(span).toHaveAttr("data-src", base64Image2);
        expect(span).toHaveAttr("data-error-handler", "this.onerror=null;this.src='" + base64Image + "';");

        Justlazy.lazyLoad(span, {
            onloadCallback: function () {
                var img = testCase("testSpanWithErrorHandler", withElements("img"))[0];
                expect(img).toExist();
                expect(img).toHaveAttr("onerror", "this.onerror=null;this.src='" + base64Image + "';");
                done();
            }
        });
    });

    it("although the image could not be loaded and call error handler to load default image.", function (done) {
        var span = testCase("testSpanWithNotExistingImage", withElements("span"))[0];

        expect(span).toHaveAttr("data-src", "http://some.non.existing.server/foobar.gif");
        expect(span).toHaveAttr("data-error-handler", "this.onerror=null;this.src='"+base64Image+"'");

        Justlazy.lazyLoad(span, {
            onloadCallback: function () {
                // this callback will only be invoked if the data-error-handler sets a correct
                // image (the base64 encoded one).
                var img = testCase("testSpanWithNotExistingImage", withElements("img"))[0];
                expect(img).toExist();
                done();
            },
            onerrorCallback: function () {
                fail();
            }
        });
    });

    it("in complex html structure", function (done) {
        var testContainer = document.getElementById("testSpanWithComplexStructure");

        expect(testContainer.querySelectorAll(".lazy-span").length).toBe(3);

        // load second image of list structure
        Justlazy.lazyLoad(testContainer.querySelectorAll(".lazy-span")[1], {
            onloadCallback: function () {
                var img2 = testContainer.querySelector("#li2").getElementsByTagName("img")[0];
                expect(img2).toHaveAttr("src", base64Image2);
                expect(img2).toHaveAttr("alt", "alt2");
                expect(img2).toHaveAttr("title", "title2");
                expect(testContainer.querySelector("#li2").getElementsByTagName("span")).not.toExist();

                expect(testContainer.getElementsByTagName("img").length).toBe(2);
                done();
            }
        });
    });

    it("without data-srcset attribute", function (done) {
        var span = testCase("testSpanWithoutSrcset", withElements("span"))[0];

        expect(span).toHaveAttr("data-src", base64Image);
        expect(span).toHaveAttr("data-title", "some title");
        expect(span).toHaveAttr("data-alt", "some alt text");
        expect(span).not.toHaveAttr("data-srcset");

        Justlazy.lazyLoad(span, {
            onloadCallback: function () {
                var img = testCase("testSpanWithoutSrcset", withElements("img"))[0];
                expect(img).toExist();
                expect(img).toHaveAttr("src", base64Image);
                expect(img).toHaveAttr("title", "some title");
                expect(img).toHaveAttr("alt", "some alt text");
                // use following instead of 'expect(img).not.toHaveAttr("srcset");', because
                // some browsers doesn't support the srcset-attribute via jquery-select
                expect(img.getAttribute("srcset")).toBeNull();
                done();
            }
        });
    });

    it("without data-title attribute", function (done) {
        var span = testCase("testSpanWithoutTitle", withElements("span"))[0];

        expect(span).toHaveAttr("data-src", base64Image);
        expect(span).toHaveAttr("data-alt", "some alt text");
        expect(span).not.toHaveAttr("data-title");

        Justlazy.lazyLoad(span, {
            onloadCallback: function () {
                var img = testCase("testSpanWithoutTitle", withElements("img"))[0];
                expect(img).toExist();
                expect(img).toHaveAttr("src", base64Image);
                expect(img).toHaveAttr("alt", "some alt text");
                expect(img).not.toHaveAttr("title");
                done();
            }
        });
    });

    it("with srcset attribute", function (done) {
        var span = testCase("testSpanWithSrcset", withElements("span"))[0];
        var srcsetValue = base64Image + " 400w, " + base64Image2 + " 800w";

        expect(span).toHaveAttr("data-src", base64ImageDefault);
        expect(span).toHaveAttr("data-alt", "some alt text");
        expect(span).toHaveAttr("data-srcset", srcsetValue);

        Justlazy.lazyLoad(span, {
            onloadCallback: function () {
                var img = testCase("testSpanWithSrcset", withElements("img"))[0];
                expect(img).toExist();
                expect(img).toHaveAttr("src", base64ImageDefault);
                expect(img).toHaveAttr("alt", "some alt text");
                // use following instead of 'expect(img).toHaveAttr("srcset", srcsetValue);', because
                // some browsers doesn't support the srcset-attribute via jquery-select
                expect(img.getAttribute("srcset")).toBe(srcsetValue);
                done();
            }
        });
    });

    it("with empty data-alt attribute", function (done) {
        var span = testCase("testSpanWithEmptyAlt", withElements("span"))[0];

        expect(span).toHaveAttr("data-src", base64Image);
        expect(span).toHaveAttr("data-alt", "");

        Justlazy.lazyLoad(span, {
            onloadCallback: function () {
                var img = testCase("testSpanWithEmptyAlt", withElements("img"))[0];
                expect(img).toExist();
                expect(img).toHaveAttr("src", base64Image);
                expect(img).toHaveAttr("alt", "");
                done();
            }
        });
    });

    it("and invoke onreplace callback", function (done) {
        var span = testCase("testSpanWithMandatoryAttributesOnly", withElements("span"))[0];
        expect(span).not.toHaveAttr("someKey");

        Justlazy.lazyLoad(span, {
            onloadCallback: function () {
                var img = testCase("testSpanWithMandatoryAttributesOnly", withElements("img"))[0];
                expect(img).toExist();
                expect(img).toHaveAttr("someKey", "someValue");
                done();
            },
            onerrorCallback: function () {
                fail();
            },
            onreplaceCallback: function () {
                this.setAttribute("someKey", "someValue");
            }
        });
    });

    it("and invoke onload callback", function (done) {
        var span = testCase("testSpanWithMandatoryAttributesOnly", withElements("span"))[0];

        Justlazy.lazyLoad(span, {
            onloadCallback: function () {
                var img = testCase("testSpanWithMandatoryAttributesOnly", withElements("img"))[0];
                expect(img).toExist();
                done();
            },
            onerrorCallback: function () {
                fail();
            }
        });
    });

});

describe("justlazy shouldnt lazy load span", function () {

    beforeEach(function () {
        loadFixtures("imgTagWithSpan.html");
    });

    it("and call onLazyLoadError callback", function (done) {
        var span = testCase("testSpanWithSrcError", withElements("span"))[0];

        Justlazy.lazyLoad(span, {
            onloadCallback: function () {
                fail();
            },
            onerrorCallback: function () {
                var spanAfterLazyLoading = testCase("testSpanWithSrcError", withElements("span"))[0];
                expect(spanAfterLazyLoading).toExist();
                done();
            }
        });
    });

    it("and shouldn't call onLazyLoadError callback if not defined", function () {
        var span = testCase("testSpanWithSrcError", withElements("span"))[0];

        Justlazy.lazyLoad(span, function () {
            fail();
        }, undefined);

        var spanAfterLazyLoading = testCase("testSpanWithSrcError", withElements("span"))[0];
        expect(spanAfterLazyLoading).toExist();
    });

    it("without data-src attribute", function (done) {
        var span = testCase("testSpanWithSrcError", withElements("span"))[0];

        expect(span).not.toHaveAttr("data-src");
        expect(span).toHaveAttr("data-alt", "alt-test-image");

        Justlazy.lazyLoad(span, {
            onerrorCallback: function () {
                var spanAfterLazyLoading = testCase("testSpanWithSrcError", withElements("span"))[0];
                expect(spanAfterLazyLoading).toExist();
                expect(spanAfterLazyLoading).toHaveAttr("data-alt", "alt-test-image");
                expect(spanAfterLazyLoading).not.toHaveAttr("data-src");
                expect(testCase("testSpanWithSrcError", withElements("img"))[0]).not.toExist();
                done();
            }
        });
    });

    it("without data-alt attribute", function (done) {
        var span = testCase("testSpanWithAltError", withElements("span"))[0];

        expect(span).toHaveAttr("data-src", base64Image);
        expect(span).not.toHaveAttr("data-alt");

        Justlazy.lazyLoad(span, {
            onerrorCallback: function () {
                var spanAfterLazyLoading = testCase("testSpanWithAltError", withElements("span"))[0];
                expect(spanAfterLazyLoading).toExist();
                expect(spanAfterLazyLoading).toHaveAttr("data-src", base64Image);
                expect(spanAfterLazyLoading).not.toHaveAttr("data-alt");
                expect(testCase("testSpanWithAltError", withElements("img"))[0]).not.toExist();
                done();
            }
        });
    });

    it("without data-src and data-alt attribute", function (done) {
        var span = testCase("testSpanWithSrcAndAltError", withElements("span"))[0];

        expect(span).not.toHaveAttr("data-src");
        expect(span).not.toHaveAttr("data-alt");
        expect(span).toHaveAttr("data-some-other", "someOtherValue");

        Justlazy.lazyLoad(span, {
            onerrorCallback: function () {
                var spanAfterReload = testCase("testSpanWithSrcAndAltError", withElements("span"))[0];
                expect(spanAfterReload).toExist();
                expect(spanAfterReload).toHaveAttr("data-some-other", "someOtherValue");
                expect(testCase("testSpanWithSrcAndAltError", withElements("img"))[0]).not.toExist();
                done();
            }
        });
    });
});

describe("justlazy should lazy load div", function () {

    beforeEach(function () {
        loadFixtures("imgTagWithDiv.html");
    });

    it("without extra stuff", function (done) {
        var div = testCase("testDiv", withElements("div"))[0];

        Justlazy.lazyLoad(div, {
            onloadCallback: function () {
                var img = testCase("testDiv", withElements("img"))[0];
                expect(img).toHaveAttr("src", base64Image);
                expect(img).toHaveAttr("alt", "alt-test-image");
                expect(img).toHaveAttr("title", "some title");
                expect(testCase("testDiv", withElements("div"))[0]).not.toExist();
                done();
            }
        });
    });

    it("with content (remove content)", function (done) {
        var div = testCase("testDivWithContent", withElements("div"))[0];

        expect(div).toHaveText("many text here ..");

        Justlazy.lazyLoad(div, {
            onloadCallback: function () {
                var img = testCase("testDivWithContent", withElements("img"))[0];
                expect(img).toHaveAttr("src", base64Image);
                expect(img).toHaveAttr("alt", "alt-test-image");
                expect(img).not.toHaveText("many text here ..");
                expect(testCase("testDivWithContent", withElements("div"))[0]).not.toExist();
                done();
            }
        });
    });

    it("with style attribute (remove styling)", function (done) {
        var div = testCase("testDivWithStyling", withElements("div"))[0];
        expect(div).toHaveCss({display: "none"});

        Justlazy.lazyLoad(div, {
            onloadCallback: function () {
                var img = testCase("testDivWithStyling", withElements("img"))[0];
                expect(img).toHaveAttr("src", base64Image);
                expect(img).toHaveAttr("alt", "alt-test-image");
                expect(img).not.toHaveCss({display: "none"});
                expect(testCase("testDivWithStyling", withElements("div"))[0]).not.toExist();
                done();
            }
        });
    });

    it("with error handler", function (done) {
        var div = testCase("testDivWithErrorhandler", withElements("div"))[0];

        expect(div).toHaveAttr("data-src", base64Image);
        expect(div).toHaveAttr("data-alt", "some alt text");
        expect(div).toHaveAttr("data-error-handler", "this.onerror=null;this.src='" + base64Image2 + "';");

        Justlazy.lazyLoad(div, {
            onloadCallback: function () {
                var img = testCase("testDivWithErrorhandler", withElements("img"))[0];
                expect(img).toExist();
                expect(img).toHaveAttr("src", base64Image);
                expect(img).toHaveAttr("alt", "some alt text");
                expect(img).toHaveAttr("onerror", "this.onerror=null;this.src='" + base64Image2 + "';");
                done();
            }
        });
    });

    it("with empty data-error-handler attribute", function (done) {
        var div = testCase("testDivWithEmptyErrorHandler", withElements("div"))[0];

        expect(div).toHaveAttr("data-src", base64Image);
        expect(div).toHaveAttr("data-alt", "some alt text");
        expect(div).toHaveAttr("data-title", "some title");
        expect(div).toHaveAttr("data-error-handler", "");

        Justlazy.lazyLoad(div, {
            onloadCallback: function () {
                var img = testCase("testDivWithEmptyErrorHandler", withElements("img"))[0];
                expect(img).toHaveAttr("src", base64Image);
                expect(img).toHaveAttr("title", "some title");
                expect(img).toHaveAttr("alt", "some alt text");
                expect(img).not.toHaveAttr("onerror");
                expect(testCase("testDivWithEmptyErrorHandler", withElements("div"))[0]).not.toExist();
                done();
            }
        });
    });

    it("without data-error-handler attribute", function (done) {
        var div = testCase("testDivWithoutErrorHandler", withElements("div"))[0];

        expect(div).toHaveAttr("data-src", base64Image);
        expect(div).toHaveAttr("data-alt", "some alt text");
        expect(div).not.toHaveAttr("data-error-handler");

        Justlazy.lazyLoad(div, {
            onloadCallback: function () {
                var img = testCase("testDivWithoutErrorHandler", withElements("img"))[0];
                expect(img).toHaveAttr("src", base64Image);
                expect(img).toHaveAttr("alt", "some alt text");
                expect(img).not.toHaveAttr("onerror");
                expect(testCase("testDivWithoutErrorHandler", withElements("div"))[0]).not.toExist();
                done();
            }
        });
    });

    it("with empty data-title attribute", function (done) {
        var div = testCase("testDivWithEmptyTitle", withElements("div"))[0];
        expect(div).toHaveAttr("data-src", base64Image);
        expect(div).toHaveAttr("data-alt", "some alt text");
        expect(div).toHaveAttr("data-title", "");

        Justlazy.lazyLoad(div, {
            onloadCallback: function () {
                var img = testCase("testDivWithEmptyTitle", withElements("img"))[0];
                expect(img).toHaveAttr("src", base64Image);
                expect(img).toHaveAttr("alt", "some alt text");
                expect(img).not.toHaveAttr("title");
                expect(testCase("testDivWithEmptyTitle", withElements("div"))[0]).not.toExist();
                done();
            },
            onerrorCallback: function () {
                fail();
            }
        });
    });

});
