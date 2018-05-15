import { messageHandler } from "./message-handler";
import { expect } from "chai";
import { isMoment } from "moment";

describe.only("Message Handler", () => {
    it("#extractParamsFromText() should extract 'from', 'to', 'date'", () => {
        const text = "Przejazd   Warszawa    Wrocław    2018-12-12"
        const params = messageHandler["extractParamsFromText"](text);
        expect(params.from).to.eq("Warszawa");
        expect(params.to).to.eq("Wrocław");
        expect(params.date).not.to.be.undefined;
        expect(isMoment(params.date)).to.be.true;
    })

    it("#extractParamsFromText() should return null as date if not present in text", () => {
        const text = "Przejazd Warszawa Wrocław"
        const params = messageHandler["extractParamsFromText"](text);
        expect(params.date).to.be.null;
    })

    it("#extractParamsFromText() should return null as date if not present in text", () => {
        const text = "Przejazd Warszawa Wrocław"
        const params = messageHandler["extractParamsFromText"](text);
        expect(params.date).to.be.null;
    })

    it("#extractParamsFromText() should return null if cannot read any of location", () => {
        const text = "Przejazd    Warszawa";
        const params = messageHandler["extractParamsFromText"](text);
        expect(params).to.be.null;
    })
})