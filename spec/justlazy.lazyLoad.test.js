var base64Image = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
var base64Image2 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

var withPlaceholder = function (selector) {
    return selector;
};

var selectTestCase = function (testCaseId, placeholderSelector) {
    var fixture = document.getElementById(testCaseId);

    var placeholder = function () {
        return fixture.querySelectorAll(placeholderSelector)[0];
    };

    var image = function () {
        return fixture.querySelectorAll("img")[0];
    };

    return {
        placeholder: placeholder,
        image: image
    };
};

describe("justlazy.lazyLoad should lazy load image", function () {

    beforeEach(function () {
        loadFixtures("placeholders.html");
    });

    it("without options", function () {
        var testCase = selectTestCase("spanWithMandatoryAttributesOnly", withPlaceholder("span"));
        expect(testCase.placeholder()).toBeDefined();

        Justlazy.lazyLoad(testCase.placeholder());
    });

    it("with mandatory attributes", function (done) {
        var testCase = selectTestCase("spanWithMandatoryAttributesOnly", withPlaceholder("span"));

        Justlazy.lazyLoad(testCase.placeholder(), {
            onreplaceCallback: function () {
                var img = testCase.image();
                expect(img).toHaveAttr("src", base64Image);
                expect(img).toHaveAttr("alt", "some alt text");
                expect(img).not.toHaveAttr("title");
                // use following instead of 'expect(img).not.toHaveAttr("srcset");', because
                // some browsers doesn't support the srcset-attribute via jquery-select
                expect(img.getAttribute("srcset")).toBeNull();
                expect(testCase.placeholder()).not.toExist();
                done();
            }
        });
    });

    it("with title", function (done) {
        var testCase = selectTestCase("spanWithTitle", withPlaceholder("span"));

        Justlazy.lazyLoad(testCase.placeholder(), {
            onreplaceCallback: function () {
                var img = testCase.image();
                expect(img).toHaveAttr("title", "some title");
                expect(testCase.placeholder()).not.toExist();
                done();
            }
        });
    });

    it("with srcset attribute", function (done) {
        var testCase = selectTestCase("spanWithSrcset", withPlaceholder("span"));
        var srcsetValue = base64Image + " 400w, " + base64Image2 + " 800w";
        expect(testCase.placeholder()).toHaveAttr("data-srcset", srcsetValue);

        Justlazy.lazyLoad(testCase.placeholder(), {
            onreplaceCallback: function () {
                var img = testCase.image();
                expect(img).toExist();
                // use following instead of 'expect(img).toHaveAttr("srcset", srcsetValue);', because
                // some browsers doesn't support the srcset-attribute via jquery-select
                expect(img.getAttribute("srcset")).toBe(srcsetValue);
                done();
            }
        });
    });

    it("with empty data-alt attribute", function (done) {
        var testCase = selectTestCase("spanWithEmptyAlt", withPlaceholder("span"));
        expect(testCase.placeholder()).toHaveAttr("data-alt", "");

        Justlazy.lazyLoad(testCase.placeholder(), {
            onreplaceCallback: function () {
                var img = testCase.image();
                expect(img).toExist();
                expect(img).toHaveAttr("alt", "");
                done();
            }
        });
    });

    it("within complex html structure", function (done) {
        var testContainer = document.getElementById("spanWithComplexStructure");
        expect(testContainer.querySelectorAll(".lazy-span").length).toBe(3);
        expect(testContainer.querySelectorAll("img").length).toBe(1);

        // load second image of list structure
        Justlazy.lazyLoad(testContainer.querySelectorAll(".lazy-span")[1], {
            onreplaceCallback: function () {
                var img2 = testContainer.querySelector("#li2").getElementsByTagName("img")[0];
                expect(img2).toHaveAttr("src", base64Image2);
                expect(img2).toHaveAttr("alt", "alt2");
                expect(img2).toHaveAttr("title", "title2");
                expect(testContainer.querySelector("#li2").getElementsByTagName("span")).not.toExist();

                expect(testContainer.querySelectorAll(".lazy-span").length).toBe(2);
                expect(testContainer.getElementsByTagName("img").length).toBe(2);
                done();
            }
        });
    });

    it("if placeholder contains content", function (done) {
        var testCase = selectTestCase("spanWithContent", withPlaceholder("span"));
        expect(testCase.placeholder()).toHaveText("Some content here");

        Justlazy.lazyLoad(testCase.placeholder(), {
            onreplaceCallback: function () {
                expect(testCase.image()).toExist();
                expect(testCase.placeholder()).not.toExist();
                done();
            }
        });
    });

    it("if placeholder has styling", function (done) {
        var testCase = selectTestCase("spanWithCss", withPlaceholder("span"));
        expect(testCase.placeholder()).toHaveCss({display: "none"});

        Justlazy.lazyLoad(testCase.placeholder(), {
            onreplaceCallback: function () {
                expect(testCase.image()).not.toHaveCss({display: "none"});
                expect(testCase.placeholder()).not.toExist();
                done();
            }
        });
    });

    it("if progressive enabled", function (done) {
        var testCase = selectTestCase("spanWithMandatoryAttributesOnly", withPlaceholder("span"));

        Justlazy.lazyLoad(testCase.placeholder(), {
            onreplaceCallback: function () {
                expect(testCase.image()).toExist();
                done();
            },
            progressive: true
        });
    });

    it("of onerrorCallback if image could not be loaded and replace placeholder", function (done) {
        var testCase = selectTestCase("spanWithoutExistingImage", withPlaceholder("span"));
        expect(testCase.placeholder()).toHaveAttr("data-src", "http://some.non.existing.server/foobar.gif");

        Justlazy.lazyLoad(testCase.placeholder(), {
            onerrorCallback: function () {
                this.src = base64Image;
            },
            onreplaceCallback: function () {
                expect(testCase.image()).toExist();
                done();
            }
        });
    });
});

describe("justlazy.lazyLoad should invoke", function () {

    beforeEach(function () {
        loadFixtures("placeholders.html");
    });

    it("onloadCallback before replacement", function (done) {
        var testCase = selectTestCase("spanWithMandatoryAttributesOnly", withPlaceholder("span"));
        expect(testCase.image()).not.toHaveAttr("someKey", "someValue");

        Justlazy.lazyLoad(testCase.placeholder(), {
            onloadCallback: function () {
                expect(this).toHaveAttr("src", base64Image);
                expect(testCase.image()).not.toExist();
                done();
            },
            onerrorCallback: function () {
                fail();
            }
        });
    });

    it("onreplaceCallback after replacement", function (done) {
        var testCase = selectTestCase("spanWithMandatoryAttributesOnly", withPlaceholder("span"));

        Justlazy.lazyLoad(testCase.placeholder(), {
            onreplaceCallback: function () {
                expect(testCase.image()).toExist();
                done();
            },
            onerrorCallback: function () {
                fail();
            }
        });
    });

    it("onerrorCallback although the image could not be loaded", function (done) {
        var testCase = selectTestCase("spanWithoutExistingImage", withPlaceholder("span"));
        expect(testCase.placeholder()).toHaveAttr("data-src", "http://some.non.existing.server/foobar.gif");

        Justlazy.lazyLoad(testCase.placeholder(), {
            onerrorCallback: function () {
                this.src = base64Image;
            },
            onloadCallback: function () {
                expect(this).toHaveAttr("src", base64Image);
                done();
            }
        });
    });
});

describe("justlazy.lazyLoad should do nothing", function () {

    beforeEach(function () {
        loadFixtures("placeholders.html");
    });

    it("if data-src missing", function () {
        var testCase = selectTestCase("divWithMissingSrc", withPlaceholder("div"));
        expect(testCase.placeholder()).toExist();

        Justlazy.lazyLoad(testCase.placeholder(), {
            onerrorCallback: function () {
                fail();
            },
            onloadCallback: function () {
                fail();
            },
            onreplaceCallback: function () {
                fail();
            }
        });
    });

    it("if data-alt missing", function () {
        var testCase = selectTestCase("divWithMissingAlt", withPlaceholder("div"));
        expect(testCase.placeholder()).toExist();

        Justlazy.lazyLoad(testCase.placeholder(), {
            onerrorCallback: function () {
                fail();
            },
            onloadCallback: function () {
                fail();
            },
            onreplaceCallback: function () {
                fail();
            }
        });
    });
});
