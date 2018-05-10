import { expect } from "chai";
import * as mocha from "mocha";
import axios from 'axios';
import { City } from './_models/city';
import { caller } from './caller';
import moment from 'moment';
import { Http } from "./http";

describe("HTTP caller", () => {
    const url = "https://mysterious-lowlands-82501.herokuapp.com/api/city/search";
    const from = "Warszawa";
    const to = "Wrocław";
    const http = new Http();
    it("should find cities", async () => {
        let fromCity = await caller.getCity(from);
        let toCity = await caller.getCity(to);
        
        expect(fromCity[0]).not.to.be.undefined;
        expect(toCity[0]).not.to.be.undefined;
    })

    it("should find route", async () => {
        let foundRoutes = await caller.searchRoutes(from, to, "2018-04-01");
        expect(foundRoutes).to.be.an('array').that.has.length.greaterThan(0);
    })
})