describe("justlazy", function() {

    it("should be initialized", function () {
        expect(Justlazy).not.toBeUndefined();
    });

});

var base64Image = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
var base64Image2 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

describe("justlazy should lazy load span", function() {

    it("without extra stuff", function() {
        loadFixtures("img-span.html");

        Justlazy.lazyLoadImg(document.getElementById("lazy-span"));

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).toHaveAttr("title", "a title");
        expect(document.getElementById("lazy-span")).not.toExist();
    });

    it("with content (remove content)", function() {
        loadFixtures("img-span-with-content.html");

        var span = document.getElementById("lazy-span");
        expect(span).toHaveText("some content here");

        Justlazy.lazyLoadImg(span);

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveText("some content here");
        expect(document.getElementById("lazy-span")).not.toExist();
    });

    it("with styling (remove styling)", function() {
        loadFixtures("img-span-with-css.html");

        var span = document.getElementById("lazy-span");
        expect(span).toHaveCss({display: "none"});

        Justlazy.lazyLoadImg(span);

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveCss({display: "none"});
        expect(document.getElementById("lazy-span")).not.toExist();
    });

    it("in complex html structure", function() {
        loadFixtures("img-span-complex.html");

        // load img 1
        expect(document.querySelectorAll(".lazy-span").length).toBe(3);
        Justlazy.lazyLoadImg(document.querySelectorAll(".lazy-span")[0]);
        var img1 = document.getElementById("li-1").getElementsByTagName("img")[0];
        expect(img1).toHaveAttr("src", base64Image);
        expect(img1).toHaveAttr("alt", "alt1");
        expect(img1).toHaveAttr("title", "title1");
        expect(document.getElementById("li-1").getElementsByTagName("span")).not.toExist();

        // load img 2
        expect(document.querySelectorAll(".lazy-span").length).toBe(2);
        Justlazy.lazyLoadImg(document.querySelectorAll(".lazy-span")[0]);
        var img2 = document.getElementById("li-2").getElementsByTagName("img")[0];
        expect(img2).toHaveAttr("src", base64Image2);
        expect(img2).toHaveAttr("alt", "alt2");
        expect(img2).toHaveAttr("title", "title2");
        expect(document.getElementById("li-2").getElementsByTagName("span")).not.toExist();

        // load img 3
        expect(document.querySelectorAll(".lazy-span").length).toBe(1);
        Justlazy.lazyLoadImg(document.querySelectorAll(".lazy-span")[0]);
        var img3 = document.getElementById("li-3").getElementsByTagName("img")[0];
        expect(img3).toHaveAttr("src", base64Image);
        expect(img3).toHaveAttr("alt", "alt3");
        expect(img3).toHaveAttr("title", "title3");
        expect(document.getElementById("li-3").getElementsByTagName("span")).not.toExist();

        expect(document.getElementsByTagName("img").length).toBe(4);
    });

    it("without data-alt attribute", function () {
        loadFixtures("img-span-without-alt.html");

        var span = document.getElementById("lazy-span");
        expect(span).toHaveAttr("data-src", base64Image);
        expect(span).toHaveAttr("data-title", "some title");
        expect(span).not.toHaveAttr("data-alt");

        Justlazy.lazyLoadImg(span);

        var img = document.getElementsByTagName("img");
        expect(img).toExist();
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("title", "some title");
        expect(img).not.toHaveAttr("alt");
    });

    it("without data-title attribute", function () {
        loadFixtures("img-span-without-title.html");

        var span = document.getElementById("lazy-span");
        expect(span).toHaveAttr("data-src", base64Image);
        expect(span).toHaveAttr("data-alt", "some alt text");
        expect(span).not.toHaveAttr("data-title");

        Justlazy.lazyLoadImg(span);

        var img = document.getElementsByTagName("img");
        expect(img).toExist();
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "some alt text");
        expect(img).not.toHaveAttr("title");
    });

});

describe("justlazy should lazy load div", function() {

    it("without extra stuff", function () {
        loadFixtures("img-div.html");

        Justlazy.lazyLoadImg(document.getElementById("lazy-div"));

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).toHaveAttr("title", "some title");
        expect(document.getElementById("lazy-div")).not.toExist();
    });

    it("with content (remove content)", function () {
        loadFixtures("img-div-with-content.html");

        var div = document.getElementById("lazy-div");
        expect(div).toHaveText("many text here ..");

        Justlazy.lazyLoadImg(div);

        var img = document.getElementsByTagName("img")[0];
        expect(document.getElementsByTagName("img").length).toBe(1);
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveText("many text here ..");
        expect(document.getElementById("lazy-div")).not.toExist();
    });

    it("with styling (remove styling)", function() {
        loadFixtures("img-div-with-css.html");

        var div = document.getElementById("lazy-div");
        expect(div).toHaveCss({display: "none"});

        Justlazy.lazyLoadImg(div);

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveCss({display: "none"});
        expect(document.getElementById("lazy-div")).not.toExist();
    });

    it("with empty data-alt attribute", function() {
        loadFixtures("img-div-empty-alt.html");

        var div = document.getElementById("lazy-div");
        expect(div).toHaveAttr("data-src", base64Image);
        expect(div).toHaveAttr("data-alt", "");
        expect(div).toHaveAttr("data-title", "some title");

        Justlazy.lazyLoadImg(div);

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("title", "some title");
        expect(img).not.toHaveAttr("alt");
        expect(document.getElementById("lazy-div")).not.toExist();
    });

    it("with empty data-title attribute", function() {
        loadFixtures("img-div-empty-title.html");

        var div = document.getElementById("lazy-div");
        expect(div).toHaveAttr("data-src", base64Image);
        expect(div).toHaveAttr("data-alt", "some alt text");
        expect(div).toHaveAttr("data-title", "");

        Justlazy.lazyLoadImg(div);

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "some alt text");
        expect(img).not.toHaveAttr("title");
        expect(document.getElementById("lazy-div")).not.toExist();
    });

});

describe("justlazy shouldnt lazy load span", function() {

    it("without data-src attribute", function () {
        loadFixtures("img-span-errors.html");

        var errorContainer = document.getElementById("lazy-span-error-src");
        var span = errorContainer.getElementsByTagName("span")[0];
        expect(span).not.toHaveAttr("data-src");
        expect(span).toHaveAttr("data-alt", "alt-test-image");

        Justlazy.lazyLoadImg(span);

        var spanAfterLazyLoading = errorContainer.getElementsByTagName("span");
        expect(spanAfterLazyLoading).toExist();
        expect(spanAfterLazyLoading).toHaveAttr("data-alt", "alt-test-image");
        expect(errorContainer.getElementsByTagName("img")).not.toExist();
    });

    it("without data-src and data-alt attribute", function () {
        loadFixtures("img-span-errors.html");

        var errorContainer = document.getElementById("lazy-span-error-src-alt");
        var span = errorContainer.getElementsByTagName("span")[0];
        expect(span).not.toHaveAttr("data-src");
        expect(span).not.toHaveAttr("data-alt");
        expect(span).toHaveAttr("data-some-other", "someOtherValue");

        Justlazy.lazyLoadImg(span);

        var spanAfterReload = errorContainer.getElementsByTagName("span");
        expect(spanAfterReload).toExist();
        expect(spanAfterReload).toHaveAttr("data-some-other", "someOtherValue");
        expect(errorContainer.getElementsByTagName("img")).not.toExist();
    });

});
