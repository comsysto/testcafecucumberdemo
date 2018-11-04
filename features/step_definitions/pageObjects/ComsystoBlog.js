const { Selector } = require('testcafe');

let testController = null;

class Home {
  constructor() {
    this.blogButton = Selector('.nav-link-text-mobile').with({ boundTestRun: testController });
  }
}

class Blog {
  constructor() {
    this.frame = Selector('.w-dyn-list');
    this.link = Selector('.card.w-dyn-item.w-col.w-col-4').with({ boundTestRun: testController });
  }
}

class Page {
  constructor() {
    this.home = new Home();
    this.blog = new Blog();
  }
}

module.exports = Page;
