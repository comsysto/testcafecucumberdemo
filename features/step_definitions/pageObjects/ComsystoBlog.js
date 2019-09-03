const { Selector } = require('testcafe');

let testController = null;

class Home {
  constructor() {
    this.freeTrialButton = Selector('.video-takeover-hero__content > div > div> div > div > div> div> div > a').with({ boundTestRun: testController });
  }
}

class Blog {
  constructor() {
    this.zipButton = Selector('.enterzipcode__input--container>button');
    this.plans = Selector('.baseplans__plans>div>h3')
    this.zipCode = Selector('.enterzipcode__input--container>input').with({ boundTestRun: testController });
  }
}

class Page {
  constructor() {
    this.home = new Home();
    this.blog = new Blog();
  }
}

module.exports = Page;
