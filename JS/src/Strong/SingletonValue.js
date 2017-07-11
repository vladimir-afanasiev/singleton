'use strict'

import Singleton from "./Singleton"


class SingletonValue extends Singleton {
    constructor(){
        super();
    }
  /*
    createInstance(){
        return {
            getValue(){
                return "This is not mocked value";
            }
        }
    }
    */
}

export default  new SingletonValue();