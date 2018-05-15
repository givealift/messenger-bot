import { startsWith } from "./utils";
import { expect } from "chai";

describe("#startsWith()", () => {
    
    it("should filter correctly normal strings", () => {
        const strings = ["ala", "ma", "KOTA"];

        const filtered = strings.filter(startsWith("kot"));

        expect(filtered).to.deep.equal(["KOTA"]);
    })

    it("should filter correctly City objects", () => {
        const cities = [{name: "Warszawa"}, {name: "Wrocław"}];

        const filtered = cities.filter(city => startsWith("WROCLAW")(city.name));

        expect(filtered).to.deep.equal([{name: "Wrocław"}]);
    })

})