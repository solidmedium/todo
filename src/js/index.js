let data = [
  {
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
  },  {
    id: 3,
    name: 'Walk the dog',
    priority: 0,
    complete: 'No',
    publish: false
  } 
];

function renderTable() {

  const dataIsolated = data.filter(p => p.publish);

  let rows = [];
  dataIsolated.map(items => {
    
    const btns = `
      <button type="button" class="btn btn-blue btn-complete">Edit</button>
      <button type="button" class="btn btn-red btn-delete">Delete</button>
    `;

    rows += `
        <tr>
          <td>${items.name}</td>
          <td>${items.priority}</td>
          <td>${items.complete}</td>
          <td>${btns}</td>
        </tr>
    `;
  });

  const addBtn = `
    <div class="text-right">
      <button type="button" class="btn btn-green btn-launch-modal" onClick="renderModal()">Add New Todo +</button>
    </div>
  `;

  const table = `
    ${addBtn}
    <table class="table">
      <thead>
        <tr>
          <th>Todo</th>
          <th>Priority</th>
          <th>Complete</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  return table;
}

function loadApp() {
  
  const tableHTML = renderTable();
  const table = document.getElementById('app-mount-point');

  table.innerHTML = tableHTML;

}

document.addEventListener("DOMContentLoaded", loadApp);

