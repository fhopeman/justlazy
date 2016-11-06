describe("justlazy.registerLazyLoadByClass should", function() {

    beforeEach(function() {
        loadFixtures("completePage.html");
    });

    it("register all placeholders with specific class", function() {
        // given
        var someOptions = {
            onloadCallback: function success() {},
            onerrorCallback: function error() {}
        };

        spyOn(Justlazy, "registerLazyLoad");

        // when
        Justlazy.registerLazyLoadByClass("load-if-visible-placeholder", someOptions);

        // then
        expect(Justlazy.registerLazyLoad.calls.count()).toEqual(2);
        expect(Justlazy.registerLazyLoad).toHaveBeenCalledWith(
            document.getElementById("placeholder1"),
            someOptions
        );
        expect(Justlazy.registerLazyLoad).toHaveBeenCalledWith(
            document.getElementById("placeholder3"),
            someOptions
        );
    });

    it("work without options", function() {
        // given
        spyOn(Justlazy, "registerLazyLoad");

        // when
        Justlazy.registerLazyLoadByClass("load-if-visible-placeholder");

        // then
        expect(Justlazy.registerLazyLoad.calls.count()).toEqual(2);
        expect(Justlazy.registerLazyLoad).toHaveBeenCalledWith(
            document.getElementById("placeholder1"),
            undefined
        );
        expect(Justlazy.registerLazyLoad).toHaveBeenCalledWith(
            document.getElementById("placeholder3"),
            undefined
        );
    });

    it("register nothing if no placeholder found", function() {
        // given
        var justlazy = Justlazy;

        spyOn(justlazy, "registerLazyLoad");

        // when
        Justlazy.registerLazyLoadByClass("unavailable-class");

        // then
        expect(justlazy.registerLazyLoad.calls.count()).toEqual(0);
    });
});
