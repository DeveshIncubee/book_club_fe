import JSDOMEnvironment from "jest-environment-jsdom";

class JSDOMEnvironmentPatch extends JSDOMEnvironment {
  constructor(config, context) {
    super(config, context);
    this.global.structuredClone = structuredClone;
  }
}

export default JSDOMEnvironmentPatch;
