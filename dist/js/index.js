'use strict';

var modalComponent = {
  id: null,
  title: 'Add New Todo',
  value: '',
  renderHTML: function renderHTML() {
    var html = "\n      <div class=\"modal\" id=\"modal\">\n        <div class=\"modal-header\">\n          <h4 class=\"modal-title\"></h4>\n          <button type=\"button\" class=\"close btn btn-red\" id=\"btn-close-modal\">\n            <span aria-hidden=\"true\">X</span>\n          </button>\n        </div>\n        <div class=\"modal-body\">\n            <div>\n              <input type=\"text\" placeholder=\"".concat(this.title, "\" id=\"input-add-todo\" class=\"form-control\" id=\"\" value=\"").concat(this.value, "\">\n            </div>\n            <div>\n            <button type=\"button\" id=\"btn-save-todo\" class=\"btn btn-green\">Submit</button>\n            </div>\n        </div>\n      </div>\n      \n    ");
    return html.trim();
  }
};

function renderTable(data) {
  // Remove unpublished/deleted items from the array
  var dataIsolated = data.filter(function (p) {
    return p.publish;
  });
  var rows = [];
  dataIsolated.map(function (items) {
    var btns = "\n      <button type=\"button\" class=\"btn btn-blue btn-complete\">Edit</button>\n      <button type=\"button\" class=\"btn btn-red btn-delete\">Delete</button>\n    ";
    rows += "\n      <tr>\n        <td>".concat(items.name, "</td>\n        <td>").concat(items.priority, "</td>\n        <td>").concat(items.complete, "</td>\n        <td>").concat(btns, "</td>\n      </tr>\n    ");
  });
  var addBtn = "\n    <div class=\"text-center\">\n      <button type=\"button\" id=\"btn-launch-modal\" class=\"btn btn-green\">Add New Todo</button>\n    </div>\n  ";
  var table = "\n    ".concat(addBtn, "\n    <table class=\"table\">\n      <thead>\n        <tr>\n          <th>Name</th>\n          <th>Priority</th>\n          <th>Complete</th>\n          <th>Actions</th>\n        </tr>\n      </thead>\n      <tbody>\n        ").concat(rows, "\n      </tbody>\n    </table>\n  ");
  return table;
}

var data = [{
  id: 1,
  name: 'Take out the trash',
  priority: 0,
  complete: 'No',
  publish: true
}, {
  id: 2,
  name: 'Bring in the trash',
  priority: 0,
  complete: 'No',
  publish: true
}, {
  id: 3,
  name: 'Walk the dog',
  priority: 0,
  complete: 'No',
  publish: false
}];
var todo = {
  value: []
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
  // Generate new modal object
  var modal = Object.create(modalComponent);
  modal.title = 'Add New Todo';
  var newModal = modal.renderHTML();
  var mount = document.getElementById('modal-mount-point'); // Add modal to the DOM

  mount.innerHTML = newModal; // Automatically add focus to the input with the modal

  var input = document.getElementById('input-add-todo');
  input.focus(); // Add listener to close modal button

  document.getElementById("btn-close-modal").addEventListener("click", closeModal); // add listener to input

  document.getElementById("input-add-todo").addEventListener("keyup", recordValue);
};

var recordValue = function recordValue(e) {
  todo.value.push(e);
  console.log(todo.value);
};

var loadApp = function loadApp() {
  var tableHTML = renderTable(data);
  var mount = document.getElementById('app-mount-point');
  mount.innerHTML = tableHTML; // Listen for add todo click

  document.getElementById("btn-launch-modal").addEventListener("click", renderModal);
};

document.addEventListener("DOMContentLoaded", loadApp);
//# sourceMappingURL=index.js.map
