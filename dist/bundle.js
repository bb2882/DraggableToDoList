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
                    this.className = config.className;
                    this.template = config.template;
                    this.elementPath = config.elementPath;
                    this.textareaPath = config.textareaPath;
                    this.pencilPath = config.pencilPath;
                    this.pencilSrc = config.pencilSrc;
                    this.checkSrc = config.checkSrc;
                    this.errorElementPath = config.errorElementPath;
                    this.textareaLineLength = config.textareaLineLength;
                }
                render(root) {
                    if (!root)
                        console.log("No root element found to display interface");
                    root.append(this.createSection(this.template, this.className));
                    this.addListenersOnTextarea(root.querySelector(this.textareaPath));
                    this.initEvents(root);
                }
                createSection(template, className) {
                    let div = document.createElement('div');
                    div.innerHTML = template;
                    div.classList.add(className);
                    return div;
                }
                //Property 'events' does not exist on type 'ComponentBase'.
                events() {
                    return {};
                }
                initEvents(root) {
                    let events = this.events();
                    if (Object.keys(events).length === 0)
                        return;
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
                addListenersOnTextarea(textarea) {
                    this.addRow(textarea);
                    this.preventLineBreak(textarea);
                    this.disableSpace(textarea);
                }
                preventLineBreak(textarea) {
                    textarea.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' && (e.shiftKey || e.code === 'Enter' || e.keyCode === 13)) {
                            e.preventDefault();
                            console.log('times');
                        }
                    });
                }
                changeIcon(icon, src) {
                    icon.src = src;
                }
                addRow(textarea) {
                    textarea.addEventListener('input', () => {
                        const value = textarea.value.trim();
                        const lines = value === '' ? 1 : Math.ceil(value.length / this.textareaLineLength);
                        textarea.rows = lines;
                        console.log(lines);
                    });
                }
                disableSpace(textarea) {
                    textarea.addEventListener('keydown', (e) => {
                        const key = e.keyCode || e.which;
                        // Disable space if nothing is typed
                        if (key === 32 && textarea.value.trim() === '') {
                            e.preventDefault();
                        }
                        // Prevent double spaces
                        if (key === 32 && textarea.selectionStart > 0) {
                            const previousCharacter = textarea.value.substring(textarea.selectionStart - 1, textarea.selectionStart);
                            if (previousCharacter === ' ') {
                                e.preventDefault();
                            }
                        }
                    });
                }
                lengthCheck(textarea, errorElement) {
                    if (textarea.value.length === 0) {
                        textarea.focus();
                        textarea.style.borderBottom = '1px solid red';
                        errorElement.innerText = 'must have at least 1 character';
                        return false;
                    }
                    if (textarea.style.borderBottom || errorElement.innerText !== '') {
                        textarea.style.borderBottom = '0px';
                        errorElement.innerText = '';
                    }
                    return true;
                }
                changeTextareaName(root) {
                    console.log('workin');
                    if ((root.querySelector(this.textareaPath) === null || undefined) || (root.querySelector(this.pencilPath) === null || undefined) ||
                        (root.querySelector(this.errorElementPath) === null || undefined)) {
                        return;
                    }
                    const header = root.querySelector(this.textareaPath);
                    const icon = root.querySelector(this.pencilPath);
                    const errorElement = root.querySelector(this.errorElementPath);
                    header.value = header.value.trim();
                    if (icon.src === this.pencilSrc) {
                        header.removeAttribute('readonly');
                        header.focus();
                        const valueLength = header.value.length;
                        header.setSelectionRange(valueLength, valueLength);
                        header.style.borderBottom = '1px solid #4b4e50';
                        this.changeIcon(icon, this.checkSrc);
                    }
                    else {
                        if (!this.lengthCheck(header, errorElement))
                            return;
                        header.setAttribute('readonly', 'readonly');
                        header.style.borderBottom = '0px';
                        this.changeIcon(icon, this.pencilSrc);
                    }
                }
                deleteElement(root) {
                    if (root.querySelector(this.elementPath) === null || undefined) {
                        return;
                    }
                    const column = root.querySelector('.column');
                    column.remove();
                }
            };
            exports_5("ComponentBase", ComponentBase);
        }
    };
});
System.register("app/Components/ColumnComponent", ["framework/ComponentBase"], function (exports_6, context_6) {
    "use strict";
    var ComponentBase_1, columnPath, headerPath, pencilPath, pencilSrc, checkSrc, errorElementPath, ColumnComponent, columnComponent;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (ComponentBase_1_1) {
                ComponentBase_1 = ComponentBase_1_1;
            }
        ],
        execute: function () {
            //cosntants
            columnPath = '.column';
            headerPath = '.column__header';
            pencilPath = '.icon-pencil';
            pencilSrc = 'http://127.0.0.1:5500/dist/img/pencil-svgrepo-com.svg';
            checkSrc = 'http://127.0.0.1:5500/dist/img/check.svg';
            errorElementPath = '.column__error';
            ColumnComponent = class ColumnComponent extends ComponentBase_1.ComponentBase {
                constructor(config) {
                    super(config);
                }
                events() {
                    return {
                        'click .column__icon-pencil': 'changeTextareaName',
                        'click .column__icon-trash': 'deleteElement',
                        'click .column__button': 'addCard'
                    };
                }
                addCard() {
                }
            };
            exports_6("columnComponent", columnComponent = new ColumnComponent({
                className: 'columns',
                template: `
		<div class='column'>
			<div class='column__headline'>
				<textarea type='text' maxlength="45" cols='23' rows = '1' class='column__header' readonly>Name</textarea>
				<div class='icons column__icons'>
					<img class='icon icon-pencil column__icon-pencil' src='/dist/img/pencil-svgrepo-com.svg'></img>
					<img class='icon icon-trash column__icon-trash' src='/dist/img/trash-2-svgrepo-com.svg'></img>
				</div>
			</div>
			<div class='error-element column__error'></div>

			<button class='column__button'><span>+ Add new card</span></button>
		</div>

				<div class='column'>
			<div class='column__headline'>
				<textarea type='text' maxlength="45" cols='23' rows = '1' class='column__header' readonly>Name</textarea>
				<div class='icons column__icons'>
					<img class='icon icon-pencil column__icon-pencil' src='/dist/img/pencil-svgrepo-com.svg'></img>
					<img class='icon icon-trash column__icon-trash' src='/dist/img/trash-2-svgrepo-com.svg'></img>
				</div>
			</div>
			<div class='error-element column__error'></div>

			<button class='column__button'><span>+ Add new card</span></button>
		</div>

				<div class='column'>
			<div class='column__headline'>
				<textarea type='text' maxlength="45" cols='23' rows = '1' class='column__header' readonly>Name</textarea>
				<div class='icons column__icons'>
					<img class='icon icon-pencil column__icon-pencil' src='/dist/img/pencil-svgrepo-com.svg'></img>
					<img class='icon icon-trash column__icon-trash' src='/dist/img/trash-2-svgrepo-com.svg'></img>
				</div>
			</div>
			<div class='error-element column__error'></div>

			<button class='column__button'><span>+ Add new card</span></button>
		</div>

				<div class='column'>
			<div class='column__headline'>
				<textarea type='text' maxlength="45" cols='23' rows = '1' class='column__header' readonly>Name</textarea>
				<div class='icons column__icons'>
					<img class='icon icon-pencil column__icon-pencil' src='/dist/img/pencil-svgrepo-com.svg'></img>
					<img class='icon icon-trash column__icon-trash' src='/dist/img/trash-2-svgrepo-com.svg'></img>
				</div>
			</div>
			<div class='error-element column__error'></div>

			<button class='column__button'><span>+ Add new card</span></button>
			<button class='column__button'><span>+ Add new card</span></button>
			<button class='column__button'><span>+ Add new card</span></button>
			<button class='column__button'><span>+ Add new card</span></button>
		</div>

		<button class='column__add'>+ Add new column</button>
	`,
                elementPath: '.column',
                textareaPath: '.column__header',
                pencilPath: '.column__icon-pencil',
                pencilSrc: 'http://127.0.0.1:5500/dist/img/pencil-svgrepo-com.svg',
                checkSrc: 'http://127.0.0.1:5500/dist/img/check.svg',
                errorElementPath: '.column__error',
                textareaLineLength: 23,
            }));
        }
    };
});
System.register("app/Components/RowComponent", ["framework/ComponentBase"], function (exports_7, context_7) {
    "use strict";
    var ComponentBase_2, RowComponent, rowComponent;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (ComponentBase_2_1) {
                ComponentBase_2 = ComponentBase_2_1;
            }
        ],
        execute: function () {
            RowComponent = class RowComponent extends ComponentBase_2.ComponentBase {
                constructor(config) {
                    super(config);
                }
                events() {
                    return {
                        'click .row__icon-pencil': 'changeTextareaName',
                        'click .row__icon-trash': 'deleteElement'
                    };
                }
            };
            exports_7("rowComponent", rowComponent = new RowComponent({
                className: 'rows',
                template: `
		<div class='row'>
			<div class='row__headline'>
				<textarea type='text' maxlength='220' cols='22' rows = '1' class='row__text' readonly>aaaaaaa</textarea>

				<div class='icons row__icons'>
					<img class='icon icon-pencil row__icon-pencil' src='/dist/img/pencil-svgrepo-com.svg'></img>
					<img class='icon icon-trash row__icon-trash' src='/dist/img/trash-2-svgrepo-com.svg'></img>
				</div>
			</div>

			<div class='error-element row__error'></div>
		</div>

				<div class='row'>
			<div class='row__headline'>
				<textarea type='text' maxlength='220' cols='22' rows = '1' class='row__text' readonly>aaaaaaa</textarea>

				<div class='icons row__icons'>
					<img class='icon icon-pencil row__icon-pencil' src='/dist/img/pencil-svgrepo-com.svg'></img>
					<img class='icon icon-trash row__icon-trash' src='/dist/img/trash-2-svgrepo-com.svg'></img>
				</div>
			</div>

			<div class='error-element row__error'></div>
		</div>

				<div class='row'>
			<div class='row__headline'>
				<textarea type='text' maxlength='220' cols='22' rows = '1' class='row__text' readonly>aaaaaaa</textarea>

				<div class='icons row__icons'>
					<img class='icon icon-pencil row__icon-pencil' src='/dist/img/pencil-svgrepo-com.svg'></img>
					<img class='icon icon-trash row__icon-trash' src='/dist/img/trash-2-svgrepo-com.svg'></img>
				</div>
			</div>

			<div class='error-element row__error'></div>
		</div>
	`,
                elementPath: '.row',
                textareaPath: '.row__text',
                pencilPath: '.row__icon-pencil',
                pencilSrc: 'http://127.0.0.1:5500/dist/img/pencil-svgrepo-com.svg',
                checkSrc: 'http://127.0.0.1:5500/dist/img/check.svg',
                errorElementPath: '.row__error',
                textareaLineLength: 22
            }));
        }
    };
});
System.register("app/app.module", ["app/Components/ColumnComponent", "app/Components/RowComponent"], function (exports_8, context_8) {
    "use strict";
    var ColumnComponent_1, RowComponent_1, AppModule, appModule;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (ColumnComponent_1_1) {
                ColumnComponent_1 = ColumnComponent_1_1;
            },
            function (RowComponent_1_1) {
                RowComponent_1 = RowComponent_1_1;
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
            exports_8("appModule", appModule = new AppModule({
                components: [
                    ColumnComponent_1.columnComponent,
                    RowComponent_1.rowComponent
                ],
            }));
        }
    };
});
System.register("framework/start", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    function start(module) {
        module.start();
    }
    exports_9("start", start);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("index", ["app/app.module", "framework/start"], function (exports_10, context_10) {
    "use strict";
    var app_module_1, start_1;
    var __moduleName = context_10 && context_10.id;
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
System.register("app/Components/BoardComponent", ["app/Components/ColumnComponent"], function (exports_11, context_11) {
    "use strict";
    var ColumnComponent_2, BoardComponent, boardComponent;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (ColumnComponent_2_1) {
                ColumnComponent_2 = ColumnComponent_2_1;
            }
        ],
        execute: function () {
            BoardComponent = class BoardComponent {
                constructor(config) {
                    this.className = config.className;
                    this.template = config.template;
                    this.boardPath = config.boardPath;
                    this.column = config.column;
                }
                render(root) {
                    if (!root)
                        console.log("No root element found to display interface");
                    root.append(this.createSection(this.template, this.className));
                    this.initEvents(root);
                }
                createSection(template, className) {
                    let div = document.createElement('div');
                    div.innerHTML = template;
                    div.classList.add(className);
                    return div;
                }
                events() {
                    return {
                        'click .board__add': 'addColumn',
                    };
                }
                initEvents(root) {
                    let events = this.events();
                    if (Object.keys(events).length === 0)
                        return;
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
                addColumn(root) {
                    if (root.querySelector(this.boardPath) === null || undefined)
                        return;
                    const board = root.querySelector(this.boardPath);
                    this.column.render(board);
                }
            };
            exports_11("boardComponent", boardComponent = new BoardComponent({
                className: 'board',
                template: `
			<button class='board__add button'>+ Add new column</button>
		`,
                boardPath: '.board',
                column: ColumnComponent_2.columnComponent
            }));
        }
    };
});
//# sourceMappingURL=bundle.js.map