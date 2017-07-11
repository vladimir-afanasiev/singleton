import chai from "chai";
import Singleton from "../src/Singleton.js";
import Container from "../src/Container.js";

const expect = chai.expect;

describe('KISS', ()=> {
    const mockedValue = "!!! This value is mocked";


    it('mock singlton', ()=> {

        Singleton.getValue = ()=> {
            return mockedValue;
        };
        expect(Singleton.getValue()).to.be.equal(mockedValue);
    });

    it('mock singlton and call it from container', ()=> {

        Singleton.getValue = ()=> {
            return mockedValue;
        };
        const container = new Container();
        expect(container.getValue()).to.be.equal(mockedValue);

    });
});
