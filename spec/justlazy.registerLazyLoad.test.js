var base64Image = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
var base64Image2 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
var base64Image3 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA9";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

var triggerScrollEvent = function (y) {
    window.scroll(0, y);

    var event = document.createEvent("UIEvents");
    event.initEvent("scroll", function () {
    }, false);
    window.dispatchEvent(event);
};

var placeholder = function(number) {
    return document.getElementById("placeholder" + number);
};

var image = function() {
    var images = document.getElementsByTagName("img");
    expect(images.length).toBe(1);

    return images[0];
};

var imageDoesNotExist = function() {
    expect(document.getElementsByTagName("img").length).toBe(0);
};

describe("justlazy.registerLazyLoad should", function () {

    beforeEach(function () {
        triggerScrollEvent(0);
        loadFixtures("completePage.html");
    });

    it("load visible placeholder immediately", function (done) {
        // given
        var placeholder1 = placeholder("1");
        expect(placeholder1).toHaveAttr("data-src", base64Image);

        Justlazy.registerLazyLoad(placeholder1, {
            onreplaceCallback: function () {
                // then
                expect(image()).toHaveAttr("src", base64Image);
                done();
            },
            onerrorCallback: function () {
                fail();
            }
        });
    });

    it("load placeholder after scrolling", function (done) {
        // given
        var placeholder2 = placeholder("2");
        expect(placeholder2).toHaveAttr("data-src", base64Image2);

        Justlazy.registerLazyLoad(placeholder2, {
            onreplaceCallback: function () {
                // then
                expect(image()).toHaveAttr("src", base64Image2);
                done();
            },
            onerrorCallback: function () {
                fail();
            }
        });

        // when
        imageDoesNotExist();
        triggerScrollEvent(5000);
    });

    it("load image if threshold reached after scrolling", function (done) {
        // given
        var placeholder2 = placeholder("2");
        expect(placeholder2).toHaveAttr("data-src", base64Image2);

        Justlazy.registerLazyLoad(placeholder2, {
            onreplaceCallback: function () {
                // then
                expect(image()).toHaveAttr("src", base64Image2);
                done();
            },
            onerrorCallback: function () {
                fail();
            },
            threshold: 1000
        });

        // when
        imageDoesNotExist();
        triggerScrollEvent(4000);
    });
});
