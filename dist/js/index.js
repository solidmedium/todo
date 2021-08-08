'use strict';

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

function renderTable() {
  var dataIsolated = data.filter(function (p) {
    return p.publish;
  });
  var rows = [];
  dataIsolated.map(function (items) {
    var btns = "\n      <button type=\"button\" class=\"btn btn-delete\">Delete</button>\n      <button type=\"button\" class=\"btn btn-complete\">Complete</button>\n    ";
    rows += "\n        <tr>\n          <td>".concat(items.name, "</td>\n          <td>").concat(items.priority, "</td>\n          <td>").concat(items.complete, "</td>\n          <td>").concat(btns, "</td>\n        </tr>\n    ");
  });
  var addBtn = "\n    <div class=\"text-right\">\n      <button type=\"button\" class=\"btn btn-launch-modal\">Add New Todo +</button>\n    </div>\n  ";
  var table = "\n    ".concat(addBtn, "\n    <table class=\"table table-bordered\">\n      <thead>\n        <tr>\n          <th>Todo</th>\n          <th>Priority</th>\n          <th>Complete</th>\n          <th>Actions</th>\n        </tr>\n      </thead>\n      <tbody>\n        ").concat(rows, "\n      </tbody>\n    </table>\n  ");
  return table;
}

function loadApp() {
  var tableHTML = renderTable();
  var table = document.getElementById('app-mount-point');
  table.innerHTML = tableHTML;
}

document.addEventListener("DOMContentLoaded", loadApp);
//# sourceMappingURL=index.js.map
