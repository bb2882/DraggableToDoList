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
System.register("interfaces/ComponentConfigInterface", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("framework/core/component", [], function (exports_5, context_5) {
    "use strict";
    var Component;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            Component = class Component {
                constructor(config) {
                    this.template = config.template;
                    this.class = config.class;
                    this.styles = config.styles;
                }
                render(root) {
                    root.append(this.createSection());
                }
                createSection() {
                    let div = document.createElement('div');
                    div.innerHTML = this.template;
                    div.classList.add(this.class);
                    div.setAttribute("style", this.styles);
                    return div;
                }
            };
            exports_5("Component", Component);
        }
    };
});
System.register("app/appComponent", ["framework/core/component"], function (exports_6, context_6) {
    "use strict";
    var component_1, AppComponent, appComponent;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (component_1_1) {
                component_1 = component_1_1;
            }
        ],
        execute: function () {
            AppComponent = class AppComponent extends component_1.Component {
                constructor(config) {
                    super(config);
                }
            };
            exports_6("appComponent", appComponent = new AppComponent({
                class: 'header',
                template: `
		<div><h4>App component does work</h4></div>
	`,
                styles: "color:red; border: 1px solid blue;"
            }));
        }
    };
});
System.register("app/app.module", ["app/appComponent"], function (exports_7, context_7) {
    "use strict";
    var appComponent_1, AppModule, appModule;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (appComponent_1_1) {
                appComponent_1 = appComponent_1_1;
            }
        ],
        execute: function () {
            AppModule = class AppModule {
                constructor(config) {
                    this.components = config.components;
                }
                start() {
                    this.initComponents();
                }
                initComponents() {
                    let root = document.querySelector('#root');
                    this.components.forEach(c => c.render(root));
                }
            };
            exports_7("appModule", appModule = new AppModule({
                components: [
                    appComponent_1.appComponent,
                ],
            }));
        }
    };
});
System.register("framework/core/start", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    function start(module) {
        module.start();
    }
    exports_8("start", start);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("index", ["app/app.module", "framework/core/start"], function (exports_9, context_9) {
    "use strict";
    var app_module_1, start_1;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (app_module_1_1) {
                app_module_1 = app_module_1_1;
            },
            function (start_1_1) {
                start_1 = start_1_1;
            }
        ],
        execute: function () {
            start_1.start(app_module_1.appModule);
        }
    };
});
//# sourceMappingURL=bundle.js.map