
let modalComponent = {
  id: null,
  title: 'Add New Todo',
  value: '',
  renderHTML() {

    const html = `
      <div class="modal" id="modal">
        <div class="modal-header">
          <h4 class="modal-title"></h4>
          <button type="button" class="close btn btn-red" id="btn-close-modal">
            <span aria-hidden="true">X</span>
          </button>
        </div>
        <div class="modal-body">
            <div>
              <input type="text" placeholder="${this.title}" id="input-add-todo" class="form-control" id="" value="${this.value}" required>
            </div>
            <div>
            <button type="button" id="btn-save-todo" class="btn btn-green">Submit</button>
            </div>
        </div>
      </div>
      
    `;

    return html.trim();
  }
}

function renderTable(data) {

  // Remove unpublished/deleted items from the array
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
    <div class="text-center">
      <button type="button" id="btn-launch-modal" class="btn btn-green">Add New Todo</button>
    </div>
  `;

  const table = `
    ${addBtn}
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
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


export {
  modalComponent,
  renderTable
}
