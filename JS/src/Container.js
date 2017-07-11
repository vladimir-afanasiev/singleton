'use strict'

import  Singleton from './Singleton.js';

class Container{
    getValue(){
        return Singleton.getValue();
    }
}

export default Container;