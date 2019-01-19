"use strict";

// public, protected, private

function Container(id, className, tagName) {
    // public
    this.id = id;
    this.className = className;

    // protected
    this._tagName = tagName;

    // private
    var element;

    this.getElement = function() {
        return element;
    }

    this.setElement = function(newValue) {
        element = newValue;
    }
}

Container.prototype.remove = function() {
    var element = this.getElement();
     if (element) {
         element.parentNode.removeChild(element);
     }
}

Container.prototype.render = function() {
    var element = this.getElement();

    if (!element) {
        element = document.createElement(this._tagName);
        element.id = this.id;
        element.className = this.className;

        this.setElement(element);
    }

    return element;
}

function Menu(id, className, items) {
    Container.call(this, id, className, 'ul');

    // protected
    this._items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function() {
    var container = Container.prototype.render.call(this);

    this._items.forEach(function(item) {
        if(item instanceof Container) {
            container.appendChild(item.render());
        }
    });

    return container;
}

function SubMenu(id, className, title, items) {
    Container.call(this, id, className, 'li');

    this.menu = new Menu(id, className, items);
    this._title = title;
}

SubMenu.prototype = Object.create(Container.prototype);
SubMenu.prototype.render = function() {
    var container = Container.prototype.render.call(this);

    var span = document.createElement('span');
    span.textContent = this._title + " :";

    container.appendChild(span);

    container.appendChild(this.menu.render());

    return container;
}

function MenuItem(className, link, title) {
    Container.call(this, '', className, 'li');

    this.link = link;
    this.title = title;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function() {
    var container = Container.prototype.render.call(this);

    var a = document.createElement('a');
    a.textContent = this.title;
    a.href = this.link;

    container.appendChild(a);

    return container;
}


