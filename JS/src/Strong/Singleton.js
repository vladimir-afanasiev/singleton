'use strict'

class Singleton {
    createInstance(){};


    getInstance() {

        if (this.instance == null) {
            this.instance = createInstance();
        };
        return this.instance;
    }

}

export default new Singleton();