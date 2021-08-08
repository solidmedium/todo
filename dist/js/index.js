'use strict';

function component() {
  var element = document.getElementById('app-mount-point');
  var table = "\n    <table class=\"table table-bordered\">\n      <thead>\n        <tr>\n          <th>Todo</th>\n          <th>Actions</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td></td>\n        </tr>\n      </tbody>\n    </table>\n  "; // Lodash, now imported by this script
  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  element.innerHTML = table;
  return element;
}

document.body.appendChild(component());
//# sourceMappingURL=index.js.map
