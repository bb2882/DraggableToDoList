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
                    this.addElementPath = config.addElementPath;
                    this.addElementText = config.addElementText;
                    this.num = 1;
                }
                render(root) {
                    if (!root)
                        console.log("No root element found to display interface");
                    root.append(this.createSection());
                }
                createElement() {
                    const element = document.createElement('div');
                    const className = `${this.elementPath}__${this.num}`;
                    element.innerHTML = this.template;
                    element.classList.add(this.elementPath);
                    element.classList.add(className);
                    this.initEvents(element);
                    this.addCard(element);
                    this.num += 1;
                    return element;
                }
                createSection() {
                    const wrapper = document.createElement('div');
                    const button = this.createAddButton(wrapper);
                    wrapper.append(button);
                    wrapper.classList.add(this.className);
                    return wrapper;
                }
                createAddButton(wrapper) {
                    const button = document.createElement('button');
                    button.addEventListener('click', () => {
                        const element = this.createElement();
                        wrapper.insertBefore(element, button);
                        this.changeTextareaName(element);
                    });
                    button.classList.add('button');
                    button.classList.add(this.addElementPath);
                    button.innerText = this.addElementText;
                    return button;
                }
                initEvents(element) {
                }
                //for column component
                addCard(element) {
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
                changeTextareaName(element) {
                    if ((element.querySelector(`.${this.textareaPath}`) === null || undefined) || (element.querySelector(`.${this.pencilPath}`) === null || undefined) ||
                        (element.querySelector(`.${this.errorElementPath}`) === null || undefined)) {
                        return;
                    }
                    const textarea = element.querySelector(`.${this.textareaPath}`);
                    const icon = element.querySelector(`.${this.pencilPath}`);
                    const errorElement = element.querySelector(`.${this.errorElementPath}`);
                    this.addListenersOnTextarea(textarea);
                    textarea.value = textarea.value.trim();
                    if (icon.src === this.pencilSrc) {
                        textarea.removeAttribute('readonly');
                        textarea.focus();
                        const valueLength = textarea.value.length;
                        textarea.setSelectionRange(valueLength, valueLength);
                        textarea.style.borderBottom = '1px solid #4b4e50';
                        this.changeIcon(icon, this.checkSrc);
                    }
                    else {
                        if (!this.lengthCheck(textarea, errorElement))
                            return;
                        textarea.setAttribute('readonly', 'readonly');
                        textarea.style.borderBottom = '0px';
                        this.changeIcon(icon, this.pencilSrc);
                    }
                }
                deleteElement(element) {
                    if (element === null || undefined) {
                        return;
                    }
                    element.remove();
                }
            };
            exports_5("ComponentBase", ComponentBase);
        }
    };
});
System.register("app/Components/RowComponent", ["framework/ComponentBase"], function (exports_6, context_6) {
    "use strict";
    var ComponentBase_1, RowComponent, rowComponent;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (ComponentBase_1_1) {
                ComponentBase_1 = ComponentBase_1_1;
            }
        ],
        execute: function () {
            RowComponent = class RowComponent extends ComponentBase_1.ComponentBase {
                constructor(config) {
                    super(config);
                }
                initEvents(element) {
                    element.childNodes[1].childNodes[3].childNodes[1].addEventListener('click', () => {
                        this.changeTextareaName(element);
                    });
                    element.childNodes[1].childNodes[3].childNodes[3].addEventListener('click', () => {
                        this.deleteElement(element);
                    });
                    element.draggable = true;
                    element.addEventListener('dragstart', (e) => {
                        this.dragStart(e, element);
                    });
                    element.addEventListener('dragend', (e) => {
                        this.dragEnd(e, element);
                    });
                    element.addEventListener('dragover', this.dragOver);
                    element.addEventListener('drop', this.drop);
                    element.addEventListener('dragenter', this.dragEnter);
                    element.addEventListener('dragleave', this.dragLeave);
                }
                dragStart(event, element) {
                    // console.log('Event:', 'dragStart')
                    element.classList.add('dragging');
                }
                dragEnd(event, element) {
                    // console.log('Event:', 'dragEnd')
                    element.classList.remove('dragging');
                }
                dragOver(event) {
                    // console.log('Event:', 'dragOver')
                }
                drop(event) {
                    // console.log('Event:', 'drop')
                }
                dragEnter(event) {
                    // console.log('Event:', 'dragEnter')
                }
                dragLeave(event) {
                    // console.log('Event:', 'dragLeave')
                }
                createSection() {
                    const wrapper = document.createElement('div');
                    const button = this.createAddButton(wrapper);
                    wrapper.append(button);
                    wrapper.classList.add(this.className);
                    return wrapper;
                }
            };
            exports_6("rowComponent", rowComponent = new RowComponent({
                className: 'rows',
                template: `
		<div class='row__headline'>
			<textarea type='text' maxlength='220' cols='22' rows = '1' class='row__text' placeholder='Enter card details' readonly></textarea>

			<div class='icons row__icons'>
				<img class='icon icon-pencil row__icon-pencil' draggable="false" src='/dist/img/pencil-svgrepo-com.svg'></img>
				<img class='icon icon-trash row__icon-trash' draggable="false" src='/dist/img/trash-2-svgrepo-com.svg'></img>
			</div>
		</div>

		<div class='error-element row__error'></div>
	`,
                elementPath: 'row',
                textareaPath: 'row__text',
                pencilPath: 'row__icon-pencil',
                pencilSrc: 'http://127.0.0.1:5500/dist/img/pencil-svgrepo-com.svg',
                checkSrc: 'http://127.0.0.1:5500/dist/img/check.svg',
                errorElementPath: 'row__error',
                textareaLineLength: 22,
                addElementPath: 'row__add',
                addElementText: '+ Add new row'
            }));
        }
    };
});
System.register("app/Components/ColumnComponent", ["framework/ComponentBase", "app/Components/RowComponent"], function (exports_7, context_7) {
    "use strict";
    var ComponentBase_2, RowComponent_1, ColumnComponent, columnComponent;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (ComponentBase_2_1) {
                ComponentBase_2 = ComponentBase_2_1;
            },
            function (RowComponent_1_1) {
                RowComponent_1 = RowComponent_1_1;
            }
        ],
        execute: function () {
            ColumnComponent = class ColumnComponent extends ComponentBase_2.ComponentBase {
                constructor(config) {
                    super(config);
                }
                addCard(element) {
                    RowComponent_1.rowComponent.render(element);
                }
                initEvents(element) {
                    element.childNodes[1].childNodes[3].childNodes[1].addEventListener('click', () => {
                        this.changeTextareaName(element);
                    });
                    element.childNodes[1].childNodes[3].childNodes[3].addEventListener('click', () => {
                        this.deleteElement(element);
                    });
                }
                createSection() {
                    const wrapper = document.createElement('div');
                    const button = this.createAddButton(wrapper);
                    wrapper.append(button);
                    wrapper.classList.add(this.className);
                    return wrapper;
                }
            };
            exports_7("columnComponent", columnComponent = new ColumnComponent({
                className: 'columns',
                template: `
		<div class='column__headline'>
			<textarea type='text' maxlength="48" cols='23' rows = '1' class='column__header' placeholder='Enter header for column' readonly></textarea>
			<div class='icons column__icons'>
				<img class='icon icon-pencil column__icon-pencil' draggable="false" src='/dist/img/pencil-svgrepo-com.svg'></img>
				<img class='icon icon-trash column__icon-trash' draggable="false" src='/dist/img/trash-2-svgrepo-com.svg'></img>
			</div>
		</div>
		<div class='error-element column__error'></div>

	`,
                elementPath: 'column',
                textareaPath: 'column__header',
                pencilPath: 'column__icon-pencil',
                pencilSrc: 'http://127.0.0.1:5500/dist/img/pencil-svgrepo-com.svg',
                checkSrc: 'http://127.0.0.1:5500/dist/img/check.svg',
                errorElementPath: 'column__error',
                textareaLineLength: 25,
                addElementPath: 'column__add',
                addElementText: '+ Add new column'
            }));
        }
    };
});
System.register("app/app.module", ["app/Components/ColumnComponent"], function (exports_8, context_8) {
    "use strict";
    var ColumnComponent_1, AppModule, appModule;
    var __moduleName = context_8 && context_8.id;
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
            exports_8("appModule", appModule = new AppModule({
                components: [
                    ColumnComponent_1.columnComponent
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
//# sourceMappingURL=bundle.js.map