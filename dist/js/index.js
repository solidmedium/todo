'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var modalComponent = {
  title: 'Add New Todo',
  value: '',
  "delete": false,
  renderHTML: function renderHTML() {
    var form = ''; // Switch UI when deleting a todo

    if (this["delete"]) {
      form = "\n        <div class=\"input-container\">\n          <h3>Your are about to delete this item</h3>\n          <input type=\"text\" disabled id=\"input-add-todo\" class=\"form-control\" id=\"\" value=\"".concat(this.value, "\">\n          <button type=\"button\" id=\"btn-save-todo\" class=\"btn btn-red\">Confirm Delete</button>\n        </div>\n      ");
    } else {
      form = "\n        <div class=\"input-container\">\n          <input type=\"text\" placeholder=\"".concat(this.title, "\" id=\"input-add-todo\" class=\"form-control\" value=\"").concat(this.value, "\">\n          <button type=\"button\" id=\"btn-save-todo\" class=\"btn btn-green\">GO</button>\n        </div>\n      ");
    }

    var html = "\n      <div class=\"modal\" id=\"modal\">\n        <div class=\"modal-header\">\n          <h4 class=\"modal-title\"></h4>\n          <button type=\"button\" class=\"close btn btn-red\" id=\"btn-close-modal\">\n            <span aria-hidden=\"true\">X</span>\n          </button>\n        </div>\n        <div class=\"modal-body\">\n           ".concat(form, "\n        </div>\n      </div>\n    ");
    return html.trim();
  }
};

function renderTable(data, active) {
  // Remove unpublished/deleted items from the array
  var dataIsolated = data.filter(function (p) {
    return p.publish;
  });
  var rows = [];
  var countTotal = 0;
  var countComplete = 0;
  dataIsolated.map(function (items) {
    countTotal += 1; // total no of rows

    if (items.complete) countComplete += 1; // get total no of completed

    var editParams = [items.id, 1]; // edit

    var deleteParams = [items.id, 2]; // delete
    // edit and delete buttons

    var btns = "\n      <button type=\"button\" data-type=\"edit\" onclick=\"renderModal(".concat(editParams, ");\" class=\"btn btn-green btn-edit\">Edit</button>\n      <button type=\"button\" data-type=\"delete\" onclick=\"renderModal(").concat(deleteParams, ");\" class=\"btn btn-red btn-delete\">Delete</button>\n    "); // checkbox statuses and pararms for priority

    var priority = items.priority ? ' checked' : '';
    var priorityText = items.priority ? ' Yes' : ' No';
    var priorityParams = [items.id, 1]; // checkbox statuses and pararms for complete

    var complete = items.complete ? ' checked' : '';
    var completeText = items.complete ? ' Yes' : ' No';
    var completeParams = [items.id, 2]; // generate table rows

    rows += "\n      <tr>\n        <td>".concat(items.name, "</td>\n        <td>\n          <label class=\"switch\">\n            <input type=\"checkbox\"").concat(priority, " onchange=\"toggleHandler(").concat(priorityParams, ");\" class=\"custom-control-input\">").concat(priorityText, "\n            <span class=\"slider round\"></span>\n          </label>\n        </td>\n        <td>\n          <label class=\"switch\">\n            <input type=\"checkbox\"").concat(complete, " onchange=\"toggleHandler(").concat(completeParams, ");\" class=\"custom-control-input\">").concat(completeText, "\n            <span class=\"slider round\"></span>\n          </label>\n        </td>\n        <td>").concat(btns, "</td>\n      </tr>\n    ");
  }); // create button

  var addBtn = "\n      <button type=\"button\" id=\"btn-launch-modal\" class=\"btn btn-green\">Add New Todo</button>\n  ";
  var sortPriorityParams = [1];
  var sortNameParams = [2];
  var sortDefaultParams = [3];
  var sortPriority = active.sortPriority ? ' checked' : '';
  var sortName = active.sortName ? ' checked' : '';
  var sortDefault = !active.sortName && !active.sortPriority ? ' checked' : ''; // sort UI

  var sortUI = "\n    <div>\n    <h3>Sort by:</h3>\n    <label class=\"custom-radio name\" style=\"margin-right: .5rem\">None\n      <input type=\"radio\"".concat(sortDefault, " id=\"checkbox-sort-default\" name=\"checkbox-sort\" onchange=\"sortHandler(").concat(sortDefaultParams, ");\" class=\"custom-control-input\">\n      <span class=\"checkmark\"></span>\n    </label>\n    <label class=\"custom-radio name\" style=\"margin-right: .5rem\">Name\n      <input type=\"radio\"").concat(sortName, " id=\"checkbox-sort-name\" name=\"checkbox-sort\" onchange=\"sortHandler(").concat(sortNameParams, ");\" class=\"custom-control-input\">\n      <span class=\"checkmark\"></span>\n    </label>\n    <label class=\"custom-radio priority\" style=\"margin-right: .5rem\">Priority\n      <input type=\"radio\"").concat(sortPriority, " id=\"checkbox-sort-priority\" name=\"checkbox-sort\" onchange=\"sortHandler(").concat(sortPriorityParams, ");\" class=\"custom-control-input\"> \n      <span class=\"checkmark\"></span>\n    </label>\n    </div>\n  "); // assemble the table

  var table = "\n   <div class=\"ui-container\">".concat(sortUI, " ").concat(addBtn, "</div>\n    <table class=\"table\">\n      <thead>\n        <tr>\n          <th>Name</th>\n          <th>Priority</th>\n          <th>Complete</th>\n          <th>Edit</th>\n        </tr>\n      </thead>\n      <tbody>\n        ").concat(rows, "\n      </tbody>\n    </table>\n    <div class=\"text-center\" style=\"margin-top: 1rem\">").concat(countComplete, " of ").concat(countTotal, " Todos Complete.</div>\n  ");
  return table.trim();
}

var data = [{
  id: 1,
  name: 'Apply for position @ Rocket Lab',
  priority: 1,
  complete: 1,
  publish: true
}, {
  id: 2,
  name: 'Explain to 2 year old that not everything can be solved through kicking',
  priority: 0,
  complete: 1,
  publish: true
}, {
  id: 3,
  name: 'Complete coding challenge',
  priority: 1,
  complete: 1,
  publish: true
}, {
  id: 4,
  name: 'Tell 5 year old that saying \'Come at me bro!\' does not absolve you of anything',
  priority: 0,
  complete: 0,
  publish: true
}, {
  id: 5,
  name: 'Start telling people about the sweet NFT\'s you have',
  priority: 0,
  complete: 0,
  publish: true
}, {
  id: 6,
  name: 'Land dream job @ Rocket Lab',
  priority: 1,
  complete: 0,
  publish: true
}]; // clone data array for sorting reset 

var tempArr = _toConsumableArray(data);

var active = {
  id: '',
  action: '',
  sortPriority: false,
  sortName: false
};
/* ########################
######### METHODS #########
######################### */

var closeModal = function closeModal() {
  // Remove modal from DOM
  var modal = document.getElementById('modal');
  modal.classList.remove("active");
  setTimeout(function () {
    modal.remove();
  }, 500);
  active.id = '';
  active.action = '';
};

var renderModal = function renderModal() {
  for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  console.log(params[0], params[1]); // params[1] === 1 Edit
  // params[1] === 2 Delete
  // Generate new modal object

  var modal = Object.create(modalComponent);
  modal.title = 'Add New Todo'; // check params for edit or delete

  if (params[1]) {
    active.id = params[0];
    active.action = params[1];
    var val = data.filter(function (p) {
      return p.id === params[0];
    });
    modal.value = val[0].name; // set to delete to true to switch modal UI

    if (params[1] === 2) modal["delete"] = true;
  }

  var newModal = modal.renderHTML();
  var mount = document.getElementById('modal-mount-point');

  if (params[2]) {
    // return true function for tests
    return true;
  } else {
    // Add modal to the DOM
    mount.innerHTML = newModal;
  }

  if (!params[1] || params[1] === 1) {
    // Automatically add focus to the input in the modal
    var input = document.getElementById('input-add-todo');
    input.focus();
  } // add lister to save btn


  document.getElementById("btn-save-todo").addEventListener("click", saveValue); // Add listener to close modal button

  document.getElementById("btn-close-modal").addEventListener("click", closeModal);
  setTimeout(function () {
    var element = document.getElementById("modal");
    element.classList.add("active");
  }, 100);
};

var saveValue = function saveValue() {
  var value = '';

  if (arguments.length <= 1 ? undefined : arguments[1]) {
    // set value when running tests
    value = 'Test item';
    active.action = '';
  } else {
    value = document.getElementById("input-add-todo").value;
  } // Delete function


  if (active.action === 2) {
    // isolate index to delete
    var indexIsolated = data.findIndex(function (p) {
      return p.id === active.id;
    }); // set item to unpublish (soft delete)

    data[indexIsolated].publish = false;
    tempArr[indexIsolated].publish = false; // Edit function
  } else if (active.action === 1) {
    // Isolate index to edit
    var _indexIsolated = data.findIndex(function (p) {
      return p.id === active.id;
    }); // Set new value


    data[_indexIsolated].name = value;
    tempArr[_indexIsolated].name = value; // Create new item function
  } else {
    var count = 0;
    data.map(function () {
      count += 1;
    });
    data.push({
      id: count + 1,
      name: value,
      priority: 0,
      complete: 0,
      publish: true
    });
    tempArr.push({
      id: count + 1,
      name: value,
      priority: 0,
      complete: 0,
      publish: true
    });
  }

  active.id = '';
  active.action = '';
  console.log(data);

  if (arguments.length <= 1 ? undefined : arguments[1]) {
    // isolate new test item
    var testDataIsolated = data.filter(function (p) {
      return p.id === 7;
    }); // return out of function

    return testDataIsolated;
  }

  closeModal();
  loadApp();
};

var toggleHandler = function toggleHandler() {
  // do not run function if no params are passed
  if (!(arguments.length <= 1 ? undefined : arguments[1])) return; // if params[1] === 1 (Priority)
  // if params[1] === 2 (Complete)
  // set global active states

  active.id = arguments.length <= 0 ? undefined : arguments[0];
  active.action = arguments.length <= 1 ? undefined : arguments[1]; // Isolate index to edit

  var indexIsolated = data.findIndex(function (p) {
    return p.id === active.id;
  });

  if (active.action === 1) {
    data[indexIsolated].priority = data[indexIsolated].priority == 0 ? 1 : 0;
  } else {
    data[indexIsolated].complete = data[indexIsolated].complete == 0 ? 1 : 0;
  } // clear global active state


  active.id = '';
  active.action = '';
  console.log(data); // return true if running test

  if (arguments.length <= 2 ? undefined : arguments[2]) return data[indexIsolated].priority;
  loadApp();
};

var sortHandler = function sortHandler() {
  // do not run function if no params are passed
  if (!(arguments.length <= 0 ? undefined : arguments[0])) return; // if params[1] === 1 (Sort by priority)
  // if params[1] === 2 (Sort by name)

  if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
    active.sortPriority = true;
    active.sortName = false;

    if (active.sortPriority) {
      // method taken from https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
      data.sort(function (a, b) {
        return parseFloat(b.priority) - parseFloat(a.priority);
      });
    }
  } else if ((arguments.length <= 0 ? undefined : arguments[0]) === 2) {
    active.sortPriority = false;
    active.sortName = true;

    if (active.sortName) {
      // method taken from https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
      data.sort(function (a, b) {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0;
      });
    }
  } else {
    active.sortPriority = false;
    active.sortName = false; // reset array to original if both toggles are off

    data = _toConsumableArray(tempArr);
  } // return second item in array for testing


  if (arguments.length <= 1 ? undefined : arguments[1]) return data[1];
  loadApp();
};

var loadApp = function loadApp() {
  active.id = '';
  active.action = '';
  var tableHTML = renderTable(data, active);
  var mount = document.getElementById('app-mount-point');
  mount.innerHTML = tableHTML; // Listen for add todo click

  document.getElementById("btn-launch-modal").addEventListener("click", renderModal);
  toggleHandler();
  sortHandler();
};

document.addEventListener("DOMContentLoaded", loadApp);
//# sourceMappingURL=index.js.map
