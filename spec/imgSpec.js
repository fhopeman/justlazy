var base64Image = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
var base64Image2 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
var base64ImageDefault = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNg+M9QDwADgQF/e5IkGQAAAABJRU5ErkJggg==";

var testCase = function(testCaseId, tagName) {
    return document
        .getElementById(testCaseId)
        .getElementsByTagName(tagName);
};

var withElements = function(tagName) {
    return tagName;
};

describe("justlazy", function() {

    it("should be initialized", function () {
        expect(Justlazy).not.toBeUndefined();
    });

});

describe("justlazy should lazy load span", function() {

    beforeEach(function() {
        loadFixtures("imgTagWithSpan.html");
    });

    it("without extra stuff", function() {
        var span = testCase("testSpan", withElements("span"))[0];

        Justlazy.lazyLoadImg(span);

        var img = testCase("testSpan", withElements("img"))[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).toHaveAttr("title", "a title");
        expect(testCase("testSpan", withElements("span"))[0]).not.toExist();
    });

    it("with just mandatory attributes", function() {
        var span = testCase("testSpanWithMandatoryAttributesOnly", withElements("span"))[0];

        Justlazy.lazyLoadImg(span);

        var img = testCase("testSpanWithMandatoryAttributesOnly", withElements("img"))[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "some alt text");
        expect(img).not.toHaveAttr("title");
        expect(img).not.toHaveAttr("onerror");
        // use following instead of 'expect(img).not.toHaveAttr("srcset");', because
        // some browsers doesn't support the srcset-attribute via jquery-select
        expect(img.getAttribute("srcset")).toBeNull();
        expect(testCase("testSpanWithMandatoryAttributesOnly", withElements("span"))[0]).not.toExist();
    });

    it("with content (remove content)", function() {
        var span = testCase("testSpanWithContent", withElements("span"))[0];
        expect(span).toHaveText("some content here");

        Justlazy.lazyLoadImg(span);

        var img = testCase("testSpanWithContent", withElements("img"))[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveText("some content here");
        expect(testCase("testSpanWithContent", withElements("span"))[0]).not.toExist();
    });

    it("with styling (remove styling)", function() {
        var span = testCase("testSpanWithCss", withElements("span"))[0];
        expect(span).toHaveCss({display: "none"});

        Justlazy.lazyLoadImg(span);

        var img = testCase("testSpanWithCss", withElements("img"))[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveCss({display: "none"});
        expect(testCase("testSpanWithCss", withElements("span"))[0]).not.toExist();
    });

    it("with error handler", function () {
        var span = testCase("testSpanWithErrorHandler", withElements("span"))[0];

        expect(span).toHaveAttr("data-src", base64Image2);
        expect(span).toHaveAttr("data-error-handler", "this.onerror=null;this.src='" + base64Image + "';");

        Justlazy.lazyLoadImg(span);

        var img = testCase("testSpanWithErrorHandler", withElements("img"))[0];
        expect(img).toExist();
        expect(img).toHaveAttr("onerror", "this.onerror=null;this.src='" + base64Image + "';");
    });

    it("in complex html structure", function() {
        var testContainer = document.getElementById("testSpanWithComplexStructure");
        
        // load img 1
        expect(testContainer.querySelectorAll(".lazy-span").length).toBe(3);
        Justlazy.lazyLoadImg(testContainer.querySelectorAll(".lazy-span")[0]);
        var img1 = testContainer.querySelector("#li1").getElementsByTagName("img")[0];
        expect(img1).toHaveAttr("src", base64Image);
        expect(img1).toHaveAttr("alt", "alt1");
        expect(img1).toHaveAttr("title", "title1");
        expect(testContainer.querySelector("#li1").getElementsByTagName("span")).not.toExist();

        // load img 2
        expect(testContainer.querySelectorAll(".lazy-span").length).toBe(2);
        Justlazy.lazyLoadImg(testContainer.querySelectorAll(".lazy-span")[0]);
        var img2 = testContainer.querySelector("#li2").getElementsByTagName("img")[0];
        expect(img2).toHaveAttr("src", base64Image2);
        expect(img2).toHaveAttr("alt", "alt2");
        expect(img2).toHaveAttr("title", "title2");
        expect(testContainer.querySelector("#li2").getElementsByTagName("span")).not.toExist();

        // load img 3
        expect(testContainer.querySelectorAll(".lazy-span").length).toBe(1);
        Justlazy.lazyLoadImg(testContainer.querySelectorAll(".lazy-span")[0]);
        var img3 = testContainer.querySelector("#li3").getElementsByTagName("img")[0];
        expect(img3).toHaveAttr("src", base64Image);
        expect(img3).toHaveAttr("alt", "alt3");
        expect(img3).toHaveAttr("title", "title3");
        expect(testContainer.querySelector("#li3").getElementsByTagName("span")).not.toExist();

        expect(testContainer.getElementsByTagName("img").length).toBe(4);
    });

    it("without data-srcset attribute", function () {
        var span = testCase("testSpanWithoutSrcset", withElements("span"))[0];

        expect(span).toHaveAttr("data-src", base64Image);
        expect(span).toHaveAttr("data-title", "some title");
        expect(span).toHaveAttr("data-alt", "some alt text");
        expect(span).not.toHaveAttr("data-srcset");

        Justlazy.lazyLoadImg(span);

        var img = testCase("testSpanWithoutSrcset", withElements("img"))[0];
        expect(img).toExist();
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("title", "some title");
        expect(img).toHaveAttr("alt", "some alt text");
        // use following instead of 'expect(img).not.toHaveAttr("srcset");', because
        // some browsers doesn't support the srcset-attribute via jquery-select
        expect(img.getAttribute("srcset")).toBeNull();
    });

    it("without data-title attribute", function () {
        var span = testCase("testSpanWithoutTitle", withElements("span"))[0];

        expect(span).toHaveAttr("data-src", base64Image);
        expect(span).toHaveAttr("data-alt", "some alt text");
        expect(span).not.toHaveAttr("data-title");

        Justlazy.lazyLoadImg(span);

        var img = testCase("testSpanWithoutTitle", withElements("img"))[0];
        expect(img).toExist();
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "some alt text");
        expect(img).not.toHaveAttr("title");
    });

    it("with srcset attribute", function() {
        var span = testCase("testSpanWithSrcset", withElements("span"))[0];
        var srcsetValue = base64Image + " 400w, " + base64Image2 + " 800w";

        expect(span).toHaveAttr("data-src", base64ImageDefault);
        expect(span).toHaveAttr("data-alt", "some alt text");
        expect(span).toHaveAttr("data-srcset", srcsetValue);

        Justlazy.lazyLoadImg(span);

        var img = testCase("testSpanWithSrcset", withElements("img"))[0];
        expect(img).toExist();
        expect(img).toHaveAttr("src", base64ImageDefault);
        expect(img).toHaveAttr("alt", "some alt text");
        // use following instead of 'expect(img).toHaveAttr("srcset", srcsetValue);', because
        // some browsers doesn't support the srcset-attribute via jquery-select
        expect(img.getAttribute("srcset")).toBe(srcsetValue);
    });

    it("with empty data-alt attribute", function () {
        var span = testCase("testSpanWithEmptyAlt", withElements("span"))[0];

        expect(span).toHaveAttr("data-src", base64Image);
        expect(span).toHaveAttr("data-alt", "");

        Justlazy.lazyLoadImg(span);

        var img = testCase("testSpanWithEmptyAlt", withElements("img"))[0];
        expect(img).toExist();
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "");
    });

});

describe("justlazy shouldnt lazy load span", function() {

    beforeEach(function() {
        loadFixtures("imgTagWithSpan.html");
    });

    it("without data-src attribute", function () {
        var span = testCase("testSpanWithSrcError", withElements("span"))[0];

        expect(span).not.toHaveAttr("data-src");
        expect(span).toHaveAttr("data-alt", "alt-test-image");

        Justlazy.lazyLoadImg(span);

        var spanAfterLazyLoading = testCase("testSpanWithSrcError", withElements("span"))[0];
        expect(spanAfterLazyLoading).toExist();
        expect(spanAfterLazyLoading).toHaveAttr("data-alt", "alt-test-image");
        expect(spanAfterLazyLoading).not.toHaveAttr("data-src");
        expect(testCase("testSpanWithSrcError", withElements("img"))[0]).not.toExist();
    });

    it("without data-alt attribute", function () {
        var span = testCase("testSpanWithAltError", withElements("span"))[0];

        expect(span).toHaveAttr("data-src", base64Image);
        expect(span).not.toHaveAttr("data-alt");

        Justlazy.lazyLoadImg(span);

        var spanAfterLazyLoading = testCase("testSpanWithAltError", withElements("span"))[0];
        expect(spanAfterLazyLoading).toExist();
        expect(spanAfterLazyLoading).toHaveAttr("data-src", base64Image);
        expect(spanAfterLazyLoading).not.toHaveAttr("data-alt");
        expect(testCase("testSpanWithAltError", withElements("img"))[0]).not.toExist();
    });

    it("without data-src and data-alt attribute", function () {
        var span = testCase("testSpanWithSrcAndAltError", withElements("span"))[0];

        expect(span).not.toHaveAttr("data-src");
        expect(span).not.toHaveAttr("data-alt");
        expect(span).toHaveAttr("data-some-other", "someOtherValue");

        Justlazy.lazyLoadImg(span);

        var spanAfterReload = testCase("testSpanWithSrcAndAltError", withElements("span"))[0];
        expect(spanAfterReload).toExist();
        expect(spanAfterReload).toHaveAttr("data-some-other", "someOtherValue");
        expect(testCase("testSpanWithSrcAndAltError", withElements("img"))[0]).not.toExist();
    });

});

describe("justlazy should lazy load div", function() {
    
    beforeEach(function() {
        loadFixtures("imgTagWithDiv.html");
    });

    it("without extra stuff", function () {
        var div = testCase("testDiv", withElements("div"))[0];

        Justlazy.lazyLoadImg(div);

        var img = testCase("testDiv", withElements("img"))[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).toHaveAttr("title", "some title");
        expect(testCase("testDiv", withElements("div"))[0]).not.toExist();
    });

    it("with content (remove content)", function () {
        var div = testCase("testDivWithContent", withElements("div"))[0];

        expect(div).toHaveText("many text here ..");

        Justlazy.lazyLoadImg(div);

        var img = testCase("testDivWithContent", withElements("img"))[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveText("many text here ..");
        expect(testCase("testDivWithContent", withElements("div"))[0]).not.toExist();
    });

    it("with styling (remove styling)", function() {
        var div = testCase("testDivWithStyling", withElements("div"))[0];
        expect(div).toHaveCss({display: "none"});

        Justlazy.lazyLoadImg(div);

        var img = testCase("testDivWithStyling", withElements("img"))[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveCss({display: "none"});
        expect(testCase("testDivWithStyling", withElements("div"))[0]).not.toExist();
    });

    it("with error handler", function () {
        var div = testCase("testDivWithErrorhandler", withElements("div"))[0];

        expect(div).toHaveAttr("data-src", base64Image);
        expect(div).toHaveAttr("data-alt", "some alt text");
        expect(div).toHaveAttr("data-error-handler", "this.onerror=null;this.src='" + base64Image2 + "';");

        Justlazy.lazyLoadImg(div);

        var img = testCase("testDivWithErrorhandler", withElements("img"))[0];
        expect(img).toExist();
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "some alt text");
        expect(img).toHaveAttr("onerror", "this.onerror=null;this.src='" + base64Image2 + "';");
    });

    it("with empty data-error-handler attribute", function() {
        var div = testCase("testDivWithEmptyErrorHandler", withElements("div"))[0];

        expect(div).toHaveAttr("data-src", base64Image);
        expect(div).toHaveAttr("data-alt", "some alt text");
        expect(div).toHaveAttr("data-title", "some title");
        expect(div).toHaveAttr("data-error-handler", "");

        Justlazy.lazyLoadImg(div);

        var img = testCase("testDivWithEmptyErrorHandler", withElements("img"))[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("title", "some title");
        expect(img).toHaveAttr("alt", "some alt text");
        expect(img).not.toHaveAttr("onerror");
        expect(testCase("testDivWithEmptyErrorHandler", withElements("div"))[0]).not.toExist();
    });

    it("without data-error-handler attribute", function() {
        var div = testCase("testDivWithoutErrorHandler", withElements("div"))[0];

        expect(div).toHaveAttr("data-src", base64Image);
        expect(div).toHaveAttr("data-alt", "some alt text");
        expect(div).not.toHaveAttr("data-error-handler");

        Justlazy.lazyLoadImg(div);

        var img = testCase("testDivWithoutErrorHandler", withElements("img"))[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "some alt text");
        expect(img).not.toHaveAttr("onerror");
        expect(testCase("testDivWithoutErrorHandler", withElements("div"))[0]).not.toExist();
    });

    it("with empty data-title attribute", function() {
        var div = testCase("testDivWithEmptyTitle", withElements("div"))[0];
        expect(div).toHaveAttr("data-src", base64Image);
        expect(div).toHaveAttr("data-alt", "some alt text");
        expect(div).toHaveAttr("data-title", "");

        Justlazy.lazyLoadImg(div);

        var img = testCase("testDivWithEmptyTitle", withElements("img"))[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "some alt text");
        expect(img).not.toHaveAttr("title");
        expect(testCase("testDivWithEmptyTitle", withElements("div"))[0]).not.toExist();
    });

});
