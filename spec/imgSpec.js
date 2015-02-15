describe("lazymaltbeer", function() {

    it("should be initialized", function () {
        var lazymaltbeer = Lazymaltbeer();

        expect(lazymaltbeer).not.toBeUndefined();
    });

});

var base64Image = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
var base64Image2 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

describe("lazymaltbeer should lazy load span", function() {

    it("without extra stuff", function() {
        loadFixtures("img-span.html");

        var lazymaltbeer = Lazymaltbeer();
        lazymaltbeer.lazyLoadImg(document.getElementById("lazy-span"));

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(document.getElementById("lazy-span")).not.toExist();
    });

    it("with content (remove content)", function() {
        loadFixtures("img-span-with-content.html");

        var lazymaltbeer = Lazymaltbeer();
        var span = document.getElementById("lazy-span");
        expect(span).toHaveText("some content here");
        lazymaltbeer.lazyLoadImg(span);

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveText("some content here");
        expect(document.getElementById("lazy-span")).not.toExist();
    });

    it("with styling (remove styling)", function() {
        loadFixtures("img-span-with-css.html");

        var lazymaltbeer = Lazymaltbeer();
        var span = document.getElementById("lazy-span");
        expect(span).toHaveCss({display: "none"});
        lazymaltbeer.lazyLoadImg(span);

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveCss({display: "none"});
        expect(document.getElementById("lazy-span")).not.toExist();
    });

    it("in complex html structure", function() {
        loadFixtures("img-span-complex.html");

        var lazymaltbeer = Lazymaltbeer();

        // load img 1
        expect(document.querySelectorAll(".lazy-span").length).toBe(3);
        lazymaltbeer.lazyLoadImg(document.querySelectorAll(".lazy-span")[0]);
        var img1 = document.getElementById("li-1").getElementsByTagName("img")[0];
        expect(img1).toHaveAttr("src", base64Image);
        expect(img1).toHaveAttr("alt", "alt-test-image-1");
        expect(document.getElementById("li-1").getElementsByTagName("span")).not.toExist();

        // load img 2
        expect(document.querySelectorAll(".lazy-span").length).toBe(2);
        lazymaltbeer.lazyLoadImg(document.querySelectorAll(".lazy-span")[0]);
        var img2 = document.getElementById("li-2").getElementsByTagName("img")[0];
        expect(img2).toHaveAttr("src", base64Image);
        expect(img2).toHaveAttr("alt", "alt-test-image-2");
        expect(document.getElementById("li-2").getElementsByTagName("span")).not.toExist();

        // load img 3
        expect(document.querySelectorAll(".lazy-span").length).toBe(1);
        lazymaltbeer.lazyLoadImg(document.querySelectorAll(".lazy-span")[0]);
        var img3 = document.getElementById("li-3").getElementsByTagName("img")[0];
        expect(img3).toHaveAttr("src", base64Image);
        expect(img3).toHaveAttr("alt", "alt-test-image-3");
        expect(document.getElementById("li-3").getElementsByTagName("span")).not.toExist();

        expect(document.getElementsByTagName("img").length).toBe(4);
    });

});

describe("lazymaltbeer should lazy load div", function() {

    it("without extra stuff", function () {
        loadFixtures("img-div.html");

        var lazymaltbeer = Lazymaltbeer();
        lazymaltbeer.lazyLoadImg(document.getElementById("lazy-div"));

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(document.getElementById("lazy-div")).not.toExist();
    });

    it("with content (remove content)", function () {
        loadFixtures("img-div-with-content.html");

        var lazymaltbeer = Lazymaltbeer();
        var div = document.getElementById("lazy-div");
        expect(div).toHaveText("many text here ..");
        lazymaltbeer.lazyLoadImg(div);

        var img = document.getElementsByTagName("img")[0];
        expect(document.getElementsByTagName("img").length).toBe(1);
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveText("many text here ..");
        expect(document.getElementById("lazy-div")).not.toExist();
    });

    it("with styling (remove styling)", function() {
        loadFixtures("img-div-with-css.html");

        var lazymaltbeer = Lazymaltbeer();
        var div = document.getElementById("lazy-div");
        expect(div).toHaveCss({display: "none"});
        lazymaltbeer.lazyLoadImg(div);

        var img = document.getElementsByTagName("img")[0];
        expect(img).toHaveAttr("src", base64Image);
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveCss({display: "none"});
        expect(document.getElementById("lazy-div")).not.toExist();
    });

});
