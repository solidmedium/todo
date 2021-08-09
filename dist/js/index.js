'use strict';

var modalComponent = {
  title: 'Add New Todo',
  value: '',
  "delete": false,
  renderHTML: function renderHTML() {
    var form = '';

    if (this["delete"]) {
      form = "\n        <div class=\"input-container\">\n          <h2>Your are about to delete this item</h2>\n          <input type=\"text\" disabled id=\"input-add-todo\" class=\"form-control\" id=\"\" value=\"".concat(this.value, "\">\n          <button type=\"button\" id=\"btn-save-todo\" class=\"btn btn-red\">Confirm Delete</button>\n        </div>\n      ");
    } else {
      form = "\n        <div class=\"input-container\">\n          <input type=\"text\" placeholder=\"".concat(this.title, "\" id=\"input-add-todo\" class=\"form-control\" id=\"\" value=\"").concat(this.value, "\">\n          <button type=\"button\" id=\"btn-save-todo\" class=\"btn btn-blue\">GO</button>\n        </div>\n      ");
    }

    var html = "\n      <div class=\"modal\" id=\"modal\">\n        <div class=\"modal-header\">\n          <h4 class=\"modal-title\"></h4>\n          <button type=\"button\" class=\"close btn btn-red\" id=\"btn-close-modal\">\n            <span aria-hidden=\"true\">X</span>\n          </button>\n        </div>\n        <div class=\"modal-body\">\n           ".concat(form, "\n        </div>\n      </div>\n    ");
    return html.trim();
  }
};

function renderTable(data) {
  // Remove unpublished/deleted items from the array
  var dataIsolated = data.filter(function (p) {
    return p.publish;
  });
  console.log(dataIsolated);
  var rows = [];
  dataIsolated.map(function (items) {
    var editParams = [items.id, 1];
    var deleteParams = [items.id, 2];
    var btns = "\n      <button type=\"button\" data-type=\"edit\" onclick=\"renderModal(".concat(editParams, ");\" class=\"btn btn-blue btn-edit\">Edit</button>\n      <button type=\"button\" data-type=\"delete\" onclick=\"renderModal(").concat(deleteParams, ");\" class=\"btn btn-red btn-delete\">Delete</button>\n    ");
    var priority = items.priority ? ' checked' : '';
    var priorityText = items.priority ? ' Yes' : ' No';
    var complete = items.complete ? ' checked' : '';
    var completeText = items.complete ? ' Yes' : ' No';
    rows += "\n      <tr>\n        <td>".concat(items.name, "</td>\n        <td>\n          <label>\n            <input type=\"checkbox\" ").concat(priority, " class=\"custom-control-input\">").concat(priorityText, "\n          </label>\n        </td>\n        <td>\n          <label>\n            <input type=\"checkbox\" ").concat(complete, " class=\"custom-control-input\">").concat(completeText, "\n          </label>\n        </td>\n        <td>").concat(btns, "</td>\n      </tr>\n    ");
  });
  var addBtn = "\n    <div class=\"text-center\">\n      <button type=\"button\" id=\"btn-launch-modal\" class=\"btn btn-green\">Add New Todo</button>\n    </div>\n  ";
  var table = "\n    ".concat(addBtn, "\n    <table class=\"table\">\n      <thead>\n        <tr>\n          <th>Name</th>\n          <th>Priority</th>\n          <th>Complete</th>\n          <th>Actions</th>\n        </tr>\n      </thead>\n      <tbody>\n        ").concat(rows, "\n      </tbody>\n    </table>\n  ");
  return table;
}

var data = [{
  id: 1,
  name: 'Take out the trash',
  priority: false,
  complete: false,
  publish: true
}, {
  id: 2,
  name: 'Bring in the trash',
  priority: false,
  complete: false,
  publish: true
}, {
  id: 3,
  name: 'Walk the dog',
  priority: false,
  complete: false,
  publish: false
}];
var active = {
  id: '',
  action: ''
};
/* ########################
######### METHODS #########
######################### */

var closeModal = function closeModal() {
  // Remove modal from DOM
  var modal = document.getElementById('modal');
  modal.remove();
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
  var mount = document.getElementById('modal-mount-point'); // Add modal to the DOM

  mount.innerHTML = newModal; // Automatically add focus to the input with the modal

  if (!params[1] || params[1] === 1) {
    var input = document.getElementById('input-add-todo');
    input.focus();
  } // add lister to save btn


  document.getElementById("btn-save-todo").addEventListener("click", saveValue); // Add listener to close modal button

  document.getElementById("btn-close-modal").addEventListener("click", closeModal);
};

var saveValue = function saveValue(e) {
  var value = document.getElementById("input-add-todo").value; // Delete function

  if (active.action === 2) {
    // isolate item to delete
    var dataIsolated = data.filter(function (p) {
      return p.id === active.id;
    }); // set item to unpublish (soft delete)

    dataIsolated[0].publish = false; // Edit function
  } else if (active.action === 1) {
    // Isolate item to edit
    var _dataIsolated = data.filter(function (p) {
      return p.id === active.id;
    }); // Set new value


    _dataIsolated[0].name = value; // Create new item function
  } else {
    var count = 0;
    data.map(function () {
      count += 1;
    });
    data.push({
      id: count + 1,
      name: value,
      priority: false,
      complete: false,
      publish: true
    });
  }

  active.id = '';
  active.action = '';
  console.log(data);
  closeModal();
  loadApp();
};

var loadApp = function loadApp() {
  var tableHTML = renderTable(data);
  var mount = document.getElementById('app-mount-point');
  mount.innerHTML = tableHTML; // Listen for add todo click

  document.getElementById("btn-launch-modal").addEventListener("click", renderModal);
};

document.addEventListener("DOMContentLoaded", loadApp);
//# sourceMappingURL=index.js.map
