describe("lazymaltbeer", function() {

    it("should be initialized", function () {
        var lazymaltbeer = Lazymaltbeer();

        expect(lazymaltbeer).not.toBeUndefined();
    });

});

describe("lazymaltbeer should lazy load span", function() {

    it("without extra stuff", function() {
        loadFixtures("img-span.html");

        var lazymaltbeer = Lazymaltbeer();
        //var span = document.getElementById("lazy-span");
        var span = $("#lazy-span")[0];
        lazymaltbeer.lazyLoadImg(span);

        // var img = document.getElementsByTagName("img");
        var img = $("img")[0];
        expect(img).toHaveAttr("src", "images/test-image.jpg");
        expect(img).toHaveAttr("alt", "alt-test-image");
    });

    it("with content (remove content)", function() {
        loadFixtures("img-span-with-content.html");

        var lazymaltbeer = Lazymaltbeer();
        var span = document.getElementById("lazy-span");
        expect(span).toHaveText("some content here");
        lazymaltbeer.lazyLoadImg(span);

        var img = document.getElementsByTagName("img");
        expect(img).toHaveAttr("src", "images/test-image.jpg");
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveText("some content here");
    });

    it("with styling (remove styling)", function() {
        loadFixtures("img-span-with-css.html");

        var lazymaltbeer = Lazymaltbeer();
        var span = document.getElementById("lazy-span");
        expect(span).toHaveCss({display: "none"});
        lazymaltbeer.lazyLoadImg(span);

        var img = document.getElementsByTagName("img");
        expect(img).toHaveAttr("src", "images/test-image.jpg");
        expect(img).toHaveAttr("alt", "alt-test-image");
        expect(img).not.toHaveCss({display: "none"});
    });

});
