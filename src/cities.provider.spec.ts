import { CitiesProvider } from "./cities.provider";
import { expect } from "chai";

describe("Cities provider", () => {
    it("should return some cities", async () => {
        await CitiesProvider.initialize();
        const cities = await CitiesProvider.getCities();
        expect(cities).to.be.instanceOf(Array);
        expect(cities).to.have.length.gt(0);
    })

    it("should return some cities without initializing first", async () => {
        const cities = await CitiesProvider.getCities();
        expect(cities).to.be.instanceOf(Array);
        expect(cities).to.have.length.gt(0);
    })
})