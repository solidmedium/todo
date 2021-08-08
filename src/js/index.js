function component() {
  const element = document.getElementById('app-mount-point');

  const table = `
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Todo</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
        </tr>
      </tbody>
    </table>
  `;

  // Lodash, now imported by this script
  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.innerHTML = table;



  return element;
}

document.body.appendChild(component());