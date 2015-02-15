describe("justlazy", function() {

    it("should be initialized", function () {
        var justlazy = Justlazy();

        expect(justlazy).not.toBeUndefined();
    });

});

var base64Image = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
var base64Image2 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

describe("justlazy should lazy load span", function() {

    it("without extra stuff", function() {
        loadFixtures("img-span.html");

        Justlazy().lazyLoadImg(document.getElementById("lazy-span"));

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(document.getElementById("lazy-span")).not.toExist();
    });

    it("with content (remove content)", function() {
        loadFixtures("img-span-with-content.html");

        var justlazy = Justlazy();
        var span = document.getElementById("lazy-span");
        expect(span).toHaveText("some content here");

        justlazy.lazyLoadImg(span);

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveText("some content here");
        expect(document.getElementById("lazy-span")).not.toExist();
    });

    it("with styling (remove styling)", function() {
        loadFixtures("img-span-with-css.html");

        var justlazy = Justlazy();
        var span = document.getElementById("lazy-span");
        expect(span).toHaveCss({display: "none"});

        justlazy.lazyLoadImg(span);

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveCss({display: "none"});
        expect(document.getElementById("lazy-span")).not.toExist();
    });

    it("in complex html structure", function() {
        loadFixtures("img-span-complex.html");

        var justlazy = Justlazy();

        // load img 1
        expect(document.querySelectorAll(".lazy-span").length).toBe(3);
        justlazy.lazyLoadImg(document.querySelectorAll(".lazy-span")[0]);
        var img1 = document.getElementById("li-1").getElementsByTagName("img")[0];
        expect(img1).toHaveAttr("src", base64Image);
        expect(img1).toHaveAttr("alt", "alt-test-image-1");
        expect(document.getElementById("li-1").getElementsByTagName("span")).not.toExist();

        // load img 2
        expect(document.querySelectorAll(".lazy-span").length).toBe(2);
        justlazy.lazyLoadImg(document.querySelectorAll(".lazy-span")[0]);
        var img2 = document.getElementById("li-2").getElementsByTagName("img")[0];
        expect(img2).toHaveAttr("src", base64Image2);
        expect(img2).toHaveAttr("alt", "alt-test-image-2");
        expect(document.getElementById("li-2").getElementsByTagName("span")).not.toExist();

        // load img 3
        expect(document.querySelectorAll(".lazy-span").length).toBe(1);
        justlazy.lazyLoadImg(document.querySelectorAll(".lazy-span")[0]);
        var img3 = document.getElementById("li-3").getElementsByTagName("img")[0];
        expect(img3).toHaveAttr("src", base64Image);
        expect(img3).toHaveAttr("alt", "alt-test-image-3");
        expect(document.getElementById("li-3").getElementsByTagName("span")).not.toExist();

        expect(document.getElementsByTagName("img").length).toBe(4);
    });

    it("without data-alt attribute", function () {
        loadFixtures("img-span-without-alt.html");

        var justlazy = Justlazy();
        var span = document.getElementById("lazy-span");
        expect(span).toHaveAttr("data-src", base64Image);
        expect(span).not.toHaveAttr("data-alt");

        justlazy.lazyLoadImg(span);

        var img = document.getElementsByTagName("img");
        expect(img).toExist();
        expect(img).toHaveAttr("src", base64Image);
        expect(img).not.toHaveAttr("data-alt");
    });

});

describe("justlazy should lazy load div", function() {

    it("without extra stuff", function () {
        loadFixtures("img-div.html");

        Justlazy().lazyLoadImg(document.getElementById("lazy-div"));

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(document.getElementById("lazy-div")).not.toExist();
    });

    it("with content (remove content)", function () {
        loadFixtures("img-div-with-content.html");

        var justlazy = Justlazy();
        var div = document.getElementById("lazy-div");
        expect(div).toHaveText("many text here ..");

        justlazy.lazyLoadImg(div);

        var img = document.getElementsByTagName("img")[0];
        expect(document.getElementsByTagName("img").length).toBe(1);
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveText("many text here ..");
        expect(document.getElementById("lazy-div")).not.toExist();
    });

    it("with styling (remove styling)", function() {
        loadFixtures("img-div-with-css.html");

        var justlazy = Justlazy();
        var div = document.getElementById("lazy-div");
        expect(div).toHaveCss({display: "none"});

        justlazy.lazyLoadImg(div);

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveCss({display: "none"});
        expect(document.getElementById("lazy-div")).not.toExist();
    });

    it("with empty data-alt attribute", function() {
        loadFixtures("img-div-empty-alt.html");

        var justlazy = Justlazy();
        var div = document.getElementById("lazy-div");
        expect(div).toHaveAttr("data-src", base64Image);
        expect(div).toHaveAttr("data-alt", "");

        justlazy.lazyLoadImg(div);

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).not.toHaveAttr("alt");
        expect(document.getElementById("lazy-div")).not.toExist();
    });

});

describe("justlazy shouldnt lazy load span", function() {

    it("without data-src attribute", function () {
        loadFixtures("img-span-errors.html");

        var errorContainer = document.getElementById("lazy-span-error-src");
        var justlazy = Justlazy();
        var span = errorContainer.getElementsByTagName("span")[0];
        expect(span).not.toHaveAttr("data-src");
        expect(span).toHaveAttr("data-alt", "alt-test-image");

        justlazy.lazyLoadImg(span);

        expect(errorContainer.getElementsByTagName("span")).toExist();
        expect(errorContainer.getElementsByTagName("img")).not.toExist();
    });

    it("without data-src and data-alt attribute", function () {
        loadFixtures("img-span-errors.html");

        var errorContainer = document.getElementById("lazy-span-error-src-alt");
        var justlazy = Justlazy();
        var span = errorContainer.getElementsByTagName("span")[0];
        expect(span).not.toHaveAttr("data-src");
        expect(span).not.toHaveAttr("data-alt");
        expect(span).toHaveAttr("data-some-other", "someOtherValue");

        justlazy.lazyLoadImg(span);

        var spanAfterReload = errorContainer.getElementsByTagName("span");
        expect(spanAfterReload).toExist();
        expect(spanAfterReload).toHaveAttr("data-some-other", "someOtherValue");
        expect(errorContainer.getElementsByTagName("img")).not.toExist();
    });

});
