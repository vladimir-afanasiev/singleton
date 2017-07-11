'use strict'

import  SingletonValue from './SingletonValue.js.js';

class Container{
    getValue(){
        return SingletonValue.getInstance().getValue();
    }
}

export default Container;