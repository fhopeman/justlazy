var base64Image = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
var base64Image2 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
var base64Image3 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA9";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100;

var triggerScrollEvent = function(y) {
    window.scroll(0, y);

    var event = document.createEvent("UIEvents");
    event.initEvent("scroll", function() {
    }, false);
    window.dispatchEvent(event);
};


describe("justlazy auto loader", function() {

    beforeEach(function() {
        triggerScrollEvent(0);
        loadFixtures("loadIfVisible.html");
    });

    it("should load visible placeholder", function(done) {
        // given
        var placeholder1 = document.getElementById("img1");
        expect(placeholder1).toHaveAttr("data-src", base64Image);

        Justlazy.registerLazyLoad(placeholder1, function() {
            // then
            var img1 = document.getElementsByTagName("img")[0];
            expect(img1).toHaveAttr("src", base64Image);
            done();
        }, function() {
            fail();
        });

        // when
        triggerScrollEvent(0);
    });

   it("should load visible placeholder after scroll event", function(done) {
        // given
        var placeholder2 = document.getElementById("img2");
        expect(placeholder2).toHaveAttr("data-src", base64Image2);

        Justlazy.registerLazyLoad(placeholder2, function() {
            // then
            var img2 = document.getElementsByTagName("img")[0];
            expect(img2).toHaveAttr("src", base64Image2);
            done();
        }, function() {
            fail();
        });

        // when
        triggerScrollEvent(5000);
    });

    it("should not load invisible placeholder", function(done) {
        // given
        var callCount = 0;
        var placeholder3 = document.getElementById("img3");
        expect(placeholder3).toHaveAttr("data-src", base64Image3);

        Justlazy.registerLazyLoad(placeholder3, function() {
            ++callCount;
        }, function() {
            fail();
        });

        // when
        triggerScrollEvent(5000);

        // then
        setTimeout(function() {
            expect(callCount).toBe(0);
            done();
        }, 30);
    });

    it("should remove event listener after image loading", function(done) {
        // given
        var callCount = 0;
        var placeholder1 = document.getElementById("img1");

        Justlazy.registerLazyLoad(placeholder1, function() {
            ++callCount;
        }, function() {
            fail();
        });

        // when
        triggerScrollEvent(0);
        triggerScrollEvent(100);

        // then
        setTimeout(function() {
            expect(callCount).toBe(1);
            done();
        }, 30);
    });

    it("should only remove event listener if image was loaded", function(done) {
        // given
        var callCount = 0;
        var placeholder2 = document.getElementById("img2");

        Justlazy.registerLazyLoad(placeholder2, function() {
            ++callCount;
        }, function() {
            fail();
        });

        // when
        triggerScrollEvent(0);
        triggerScrollEvent(5000);

        // then
        setTimeout(function() {
            expect(callCount).toBe(1);
            done();
        }, 30);
    });

});
