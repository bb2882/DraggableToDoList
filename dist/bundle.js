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
                    this.trashPath = config.trashPath;
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
                childEvents(element) {
                    element.addEventListener('click', (e) => {
                        if (e.target.matches(`.${this.pencilPath}`)) {
                            this.changeTextareaName(element);
                        }
                        else if (e.target.matches(`.${this.trashPath}`)) {
                            this.deleteElement(element);
                        }
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
                        errorElement.innerText = 'Please, Fill Out This Field';
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
                    if (new URL(icon.src).pathname === this.pencilSrc) {
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
System.register("app/Components/DragComponent", [], function (exports_6, context_6) {
    "use strict";
    var Drag;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            Drag = class Drag {
                constructor(elementPath, rowIconsPath) {
                    this.elementPath = elementPath;
                    this.rowIconsPath = rowIconsPath;
                }
                dragStart(element) {
                    element.classList.add('dragging');
                    setTimeout(() => {
                        element.classList.add('hidden');
                        this.iconsOpacity(0);
                    }, 0);
                }
                dragEnd(element) {
                    element.classList.remove('dragging');
                    element.classList.remove('hidden');
                    this.iconsOpacity(1);
                }
                iconsOpacity(num) {
                    const icons = document.querySelectorAll(`.${this.rowIconsPath}`);
                    icons.forEach((icon) => {
                        icon.style.opacity = `${num}`;
                    });
                }
                dragOver(event, wrapper) {
                    const bottomTask = this.insertAboveTask(wrapper, event.clientY);
                    const curTask = document.querySelector('.dragging');
                    const lastChild = wrapper.lastElementChild;
                    if (!bottomTask) {
                        wrapper.insertBefore(curTask, lastChild);
                    }
                    else {
                        wrapper.insertBefore(curTask, bottomTask);
                    }
                    const scrollThreshold = 50;
                    const containerRect = wrapper.getBoundingClientRect();
                    const isNearTop = (event.clientY - containerRect.top) < scrollThreshold;
                    const isNearBottom = (containerRect.bottom - event.clientY) < scrollThreshold;
                    if (isNearTop) {
                        // Calculate the scroll speed based on the distance from the top
                        const scrollSpeed = (scrollThreshold - (event.clientY - containerRect.top)) / scrollThreshold;
                        const scrollAmount = scrollSpeed * 3;
                        // Scroll the container upwards with a smooth behavior
                        wrapper.scrollTo({
                            top: wrapper.scrollTop - scrollAmount,
                            behavior: 'smooth'
                        });
                    }
                    else if (isNearBottom) {
                        // Calculate the scroll speed based on the distance from the bottom
                        const scrollSpeed = (scrollThreshold - (containerRect.bottom - event.clientY)) / scrollThreshold;
                        const scrollAmount = scrollSpeed * 3;
                        // Scroll the container downwards with a smooth behavior
                        wrapper.scrollTo({
                            top: wrapper.scrollTop + scrollAmount,
                            behavior: 'smooth'
                        });
                    }
                }
                insertAboveTask(wrapper, mouseY) {
                    const els = wrapper.querySelectorAll(`.${this.elementPath}:not(.dragging)`);
                    let closestTask = null;
                    let closestOffset = Number.NEGATIVE_INFINITY;
                    els.forEach(task => {
                        const { top } = task.getBoundingClientRect();
                        const offset = mouseY - top - 40;
                        if (offset < 0 && offset > closestOffset) {
                            closestOffset = offset;
                            closestTask = task;
                        }
                    });
                    return closestTask;
                }
            };
            exports_6("Drag", Drag);
        }
    };
});
System.register("app/Components/RowComponent", ["framework/ComponentBase", "app/Components/DragComponent"], function (exports_7, context_7) {
    "use strict";
    var ComponentBase_1, DragComponent_1, RowComponent, rowComponent;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (ComponentBase_1_1) {
                ComponentBase_1 = ComponentBase_1_1;
            },
            function (DragComponent_1_1) {
                DragComponent_1 = DragComponent_1_1;
            }
        ],
        execute: function () {
            RowComponent = class RowComponent extends ComponentBase_1.ComponentBase {
                constructor(config) {
                    super(config);
                    this.rowIconsPath = 'row__icons';
                    this.drag = new DragComponent_1.Drag(this.elementPath, this.rowIconsPath);
                }
                initEvents(element) {
                    this.childEvents(element);
                    element.draggable = true;
                    element.addEventListener('dragstart', () => {
                        this.drag.dragStart(element);
                    });
                    element.addEventListener('dragend', () => {
                        this.drag.dragEnd(element);
                    });
                }
                createSection() {
                    const wrapper = document.createElement('div');
                    const button = this.createAddButton(wrapper);
                    wrapper.append(button);
                    wrapper.classList.add(this.className);
                    wrapper.addEventListener('dragover', (e) => {
                        this.drag.dragOver(e, wrapper);
                    });
                    return wrapper;
                }
            };
            exports_7("rowComponent", rowComponent = new RowComponent({
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
                pencilSrc: '/dist/img/pencil-svgrepo-com.svg',
                checkSrc: '/dist/img/check.svg',
                errorElementPath: 'row__error',
                trashPath: 'row__icon-trash',
                textareaLineLength: 22,
                addElementPath: 'row__add',
                addElementText: '+ Add new row',
            }));
        }
    };
});
System.register("app/Components/ColumnComponent", ["framework/ComponentBase", "app/Components/RowComponent"], function (exports_8, context_8) {
    "use strict";
    var ComponentBase_2, RowComponent_1, ColumnComponent, columnComponent;
    var __moduleName = context_8 && context_8.id;
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
                    this.childEvents(element);
                    this.addCard(element);
                }
                createSection() {
                    const wrapper = document.createElement('div');
                    const button = this.createAddButton(wrapper);
                    wrapper.append(button);
                    wrapper.classList.add(this.className);
                    return wrapper;
                }
            };
            exports_8("columnComponent", columnComponent = new ColumnComponent({
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
                pencilSrc: '/dist/img/pencil-svgrepo-com.svg',
                checkSrc: '/dist/img/check.svg',
                errorElementPath: 'column__error',
                trashPath: 'column__icon-trash',
                textareaLineLength: 25,
                addElementPath: 'column__add',
                addElementText: '+ Add new column'
            }));
        }
    };
});
System.register("app/app.module", ["app/Components/ColumnComponent"], function (exports_9, context_9) {
    "use strict";
    var ColumnComponent_1, AppModule, appModule;
    var __moduleName = context_9 && context_9.id;
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
            exports_9("appModule", appModule = new AppModule({
                components: [
                    ColumnComponent_1.columnComponent
                ],
            }));
        }
    };
});
System.register("framework/start", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    function start(module) {
        module.start();
    }
    exports_10("start", start);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("index", ["app/app.module", "framework/start"], function (exports_11, context_11) {
    "use strict";
    var app_module_1, start_1;
    var __moduleName = context_11 && context_11.id;
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
System.register("interfaces/DragComponentInterface", [], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=bundle.js.map