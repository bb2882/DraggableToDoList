System.register("interfaces/ComponentInterface", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("interfaces/ModuleConfigInterface", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("interfaces/ModuleInterface", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("framework/core/module", [], function (exports_4, context_4) {
    "use strict";
    var Module;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            Module = class Module {
                constructor(config) {
                    this.components = config.components;
                }
                start() {
                    this.initComponents();
                }
                initComponents() {
                    this.components.forEach(c => c.render());
                }
            };
            exports_4("Module", Module);
        }
    };
});
System.register("interfaces/ComponentConfigInterface", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("framework/core/component", [], function (exports_6, context_6) {
    "use strict";
    var Component;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            Component = class Component {
                constructor(config) {
                    this.template = config.template;
                    this.selector = config.selector;
                }
                render() {
                    let docSelector = document.querySelector(this.selector);
                    docSelector.innerHTML = this.template;
                }
            };
            exports_6("Component", Component);
        }
    };
});
System.register("framework/core/start", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    function start(module) {
        module.start();
    }
    exports_7("start", start);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("framework/index", ["framework/core/module", "framework/core/component", "framework/core/start"], function (exports_8, context_8) {
    "use strict";
    var module_1, component_1, start_1;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (module_1_1) {
                module_1 = module_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (start_1_1) {
                start_1 = start_1_1;
            }
        ],
        execute: function () {
            exports_8("WFMModule", module_1.Module);
            exports_8("WFMComponent", component_1.Component);
            exports_8("start", start_1.start);
        }
    };
});
System.register("app/appComponent", ["framework/index"], function (exports_9, context_9) {
    "use strict";
    var index_1, AppComponent, appComponent;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            AppComponent = class AppComponent extends index_1.WFMComponent {
                constructor(config) {
                    super(config);
                }
            };
            exports_9("appComponent", appComponent = new AppComponent({
                selector: 'app-root',
                template: `
		<div><h4>App component does work</h4></div>
	`
            }));
        }
    };
});
System.register("app/app.module", ["framework/index", "app/appComponent"], function (exports_10, context_10) {
    "use strict";
    var index_2, appComponent_1, AppModule, appModule;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (appComponent_1_1) {
                appComponent_1 = appComponent_1_1;
            }
        ],
        execute: function () {
            AppModule = class AppModule extends index_2.WFMModule {
                constructor(config) {
                    super(config);
                }
            };
            exports_10("appModule", appModule = new AppModule({
                components: [
                    appComponent_1.appComponent
                ],
            }));
        }
    };
});
System.register("index", ["app/app.module", "framework/index"], function (exports_11, context_11) {
    "use strict";
    var app_module_1, index_3;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (app_module_1_1) {
                app_module_1 = app_module_1_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            }
        ],
        execute: function () {
            index_3.start(app_module_1.appModule);
        }
    };
});
//# sourceMappingURL=bundle.js.map