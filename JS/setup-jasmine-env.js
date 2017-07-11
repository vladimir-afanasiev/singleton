jasmine.VERBOSE = true;

require("jasmine-reporters");
var reporter = new jasmine.JUnitXmlReporter("__tests__/output/");
jasmine.getEnv().addReporter(reporter);
