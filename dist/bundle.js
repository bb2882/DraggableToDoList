System.register("interfaces/ComponentBaseInterface", [], function (exports_1, context_1) {
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
System.register("framework/ComponentBase", [], function (exports_5, context_5) {
    "use strict";
    var ComponentBase;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            ComponentBase = class ComponentBase {
                constructor(config) {
                    this.template = config.template;
                    this.className = config.className;
                }
                render(root) {
                    if (!root)
                        return Error("No root element found to display interface");
                    root.append(this.createSection(this.template, this.className));
                    this.initEvents(root);
                }
                //Property 'events' does not exist on type 'ComponentBase'.
                events() {
                    return {};
                }
                initEvents(root) {
                    let events = this.events();
                    if (Object.keys(events).length === 0) {
                        console.log('not found');
                        return;
                    }
                    Object.keys(events).forEach(key => {
                        var _a;
                        let listener = key.split(' ');
                        (_a = root
                            .querySelector(listener[1])) === null || _a === void 0 ? void 0 : _a.addEventListener(listener[0], (e) => {
                            //assigning method to a function to make sure it is a function and not a type 'never'
                            //then binding context 'this' on function to make sure inner methods are going to work in it
                            let func = this[events[key]];
                            let method = func.bind(this);
                            method(root);
                        });
                    });
                }
                createSection(template, className) {
                    let div = document.createElement('div');
                    div.innerHTML = template;
                    div.classList.add(className);
                    return div;
                }
            };
            exports_5("ComponentBase", ComponentBase);
        }
    };
});
System.register("app/Components/ColumnComponent", ["framework/ComponentBase"], function (exports_6, context_6) {
    "use strict";
    var ComponentBase_1, ColumnComponent, columnComponent;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (ComponentBase_1_1) {
                ComponentBase_1 = ComponentBase_1_1;
            }
        ],
        execute: function () {
            ColumnComponent = class ColumnComponent extends ComponentBase_1.ComponentBase {
                constructor(config) {
                    super(config);
                }
                events() {
                    return {
                        'click .column__icon-pencil': 'changeHeaderName',
                        'click .column__icon-trash': 'deleteColumn',
                        'click .column__button': 'changeHeader'
                    };
                }
                changeIcon(icon, src) {
                    icon.src = src;
                }
                lengthCheck(input, errorElement) {
                    if (input.value.length === 0) {
                        input.focus();
                        input.style.borderBottom = '1px solid red';
                        errorElement.innerText = 'must have at least 1 character';
                        return false;
                    }
                    if (input.style.borderBottom || errorElement.innerText !== '') {
                        input.style.borderBottom = '0px';
                        errorElement.innerText = '';
                    }
                    return true;
                }
                changeHeaderName(root) {
                    if ((root.querySelector('.column__header') === null || undefined) || (root.querySelector('.column__icon-pencil') === null || undefined)) {
                        return;
                    }
                    const header = root.querySelector('.column__header');
                    const icon = root.querySelector('.column__icon-pencil');
                    const errorElement = root.querySelector('.column__error');
                    if (icon.src === 'http://127.0.0.1:5500/dist/img/pencil-svgrepo-com.svg') {
                        header.removeAttribute('readonly');
                        header.focus();
                        const valueLength = header.value.length;
                        header.setSelectionRange(valueLength, valueLength);
                        header.style.borderBottom = '1px solid #2c3134';
                        this.changeIcon(icon, 'http://127.0.0.1:5500/dist/img/check.svg');
                    }
                    else {
                        if (!this.lengthCheck(header, errorElement))
                            return;
                        header.setAttribute('readonly', 'readonly');
                        header.style.borderBottom = '0px';
                        this.changeIcon(icon, 'http://127.0.0.1:5500/dist/img/pencil-svgrepo-com.svg');
                    }
                }
                deleteColumn() {
                }
                addCard() {
                }
            };
            exports_6("columnComponent", columnComponent = new ColumnComponent({
                className: 'columns',
                template: `
		<div class='column'>
			<div class='column__headline'>
				<input type='text' maxlength="25" class='column__header' value='Name' readonly/>
				<div class='column__icons'>
					<img class='column__icon column__icon-pencil' src='/dist/img/pencil-svgrepo-com.svg'></img>
					<img class='column__icon column__icon-trash' src='/dist/img/trash-2-svgrepo-com.svg'></img>
				</div>
			</div>
			<div class='column__error'></div>

			<button class='column__button'><span>+ Add new card</span></button>
		</div>

		<div class='column'>
			<h4 class='column__header'>Name</h5>
			<button class='column__button'><span>+ Add new card</span></button>
		</div>		
		
		<div class='column'>
			<h4 class='column__header'>Name</h5>
			<button class='column__button'><span>+ Add new card</span></button>
		</div>		
		
		<div class='column'>
			<h4 class='column__header'>Name</h5>
			<button class='column__button'><span>+ Add new card</span></button>
			<button class='column__button'><span>+ Add new card</span></button>
			<button class='column__button'><span>+ Add new card</span></button>
			<button class='column__button'><span>+ Add new card</span></button>
		</div>

		<button class='column__add'>+ Add new column</button>
	`
            }));
        }
    };
});
System.register("app/app.module", ["app/Components/ColumnComponent"], function (exports_7, context_7) {
    "use strict";
    var ColumnComponent_1, AppModule, appModule;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (ColumnComponent_1_1) {
                ColumnComponent_1 = ColumnComponent_1_1;
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
                    ColumnComponent_1.columnComponent,
                ],
            }));
        }
    };
});
System.register("framework/start", [], function (exports_8, context_8) {
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
System.register("index", ["app/app.module", "framework/start"], function (exports_9, context_9) {
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