import sinon from "sinon";
import chai from "chai";
import Singleton from "../src/Singleton.js";
import Container from "../src/Container.js";

const expect = chai.expect;

describe('Demo', ()=> {

    const mockedValue = "!!! This value is mocked";

    let sandbox;
    beforeEach(()=> {
        sandbox = sinon.sandbox.create();

    });

    afterEach(()=> {
        try{
            sandbox.restore();
        }
        catch(err){
            //swallow exceptions raised by sinon XHR
        }
    });


    it('mock singlton', ()=>{
        const mock = sandbox.mock(Singleton);
        mock.expects("getValue").once().returns(mockedValue);
        expect(Singleton.getValue()).to.be.equal(mockedValue);
    });

    it('mock singlton and call it from container', ()=>{
        const mock = sandbox.mock(Singleton);
        mock.expects("getValue").once().returns(mockedValue);

        const container = new Container();
        expect(container.getValue()).to.be.equal(mockedValue);

    });

});