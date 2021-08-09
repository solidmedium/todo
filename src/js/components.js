
let modalComponent = {
  title: 'Add New Todo',
  value: '',
  delete: false,
  renderHTML() {

    let form = '';
    if (this.delete) {
      form = `
        <div class="input-container">
          <h2>Your are about to delete this item</h2>
          <input type="text" disabled id="input-add-todo" class="form-control" id="" value="${this.value}">
          <button type="button" id="btn-save-todo" class="btn btn-red">Confirm Delete</button>
        </div>
      `;
    } else {
      form = `
        <div class="input-container">
          <input type="text" placeholder="${this.title}" id="input-add-todo" class="form-control" id="" value="${this.value}">
          <button type="button" id="btn-save-todo" class="btn btn-green">GO</button>
        </div>
      `;
    }

    const html = `
      <div class="modal" id="modal">
        <div class="modal-header">
          <h4 class="modal-title"></h4>
          <button type="button" class="close btn btn-red" id="btn-close-modal">
            <span aria-hidden="true">X</span>
          </button>
        </div>
        <div class="modal-body">
           ${form}
        </div>
      </div>
    `;

    return html.trim();
  }
}

function renderTable(data, active) {

  // Remove unpublished/deleted items from the array
  const dataIsolated = data.filter(p => p.publish);

  console.log(dataIsolated);

  let rows = [];
  let countTotal = 0;
  let countComplete = 0;
  dataIsolated.map(items => {

    countTotal += 1; // total no of rows
    if (items.complete) countComplete += 1; // get total no of completed

    const editParams = [items.id, 1]; // edit
    const deleteParams = [items.id, 2]; // delete
    
    // edit and delete buttons
    const btns = `
      <button type="button" data-type="edit" onclick="renderModal(${editParams});" class="btn btn-green btn-edit">Edit</button>
      <button type="button" data-type="delete" onclick="renderModal(${deleteParams});" class="btn btn-red btn-delete">Delete</button>
    `;

    // checkbox statuses and pararms for priority
    const priority = (items.priority) ? ' checked' : '';
    const priorityText = (items.priority) ? ' Yes' : ' No';
    const priorityParams = [items.id, 1];
    // checkbox statuses and pararms for complete
    const complete = (items.complete) ? ' checked' : '';
    const completeText = (items.complete) ? ' Yes' : ' No';
    const completeParams = [items.id, 2];

    // generate table rows
    rows += `
      <tr>
        <td>${items.name}</td>
        <td>
          <label>
            <input type="checkbox"${priority} onchange="toggleHandler(${priorityParams});" class="custom-control-input">${priorityText}
          </label>
        </td>
        <td>
          <label>
            <input type="checkbox"${complete} onchange="toggleHandler(${completeParams});" class="custom-control-input">${completeText}
          </label>
        </td>
        <td>${btns}</td>
      </tr>
    `;  
  });

  // create button
  const addBtn = `
      <button type="button" id="btn-launch-modal" class="btn btn-green">Add New Todo</button>
  `;

  const sortPriorityParams = [1];
  const sortNameParams = [2];

  const sortPriority = (active.sortPriority) ? ' checked' : '';
  const sortName = (active.sortName) ? ' checked' : '';
 
  // sort UI
  const sortUI = `
    <div>
    <label style="margin-right: 1rem">
      <input type="checkbox"${sortName} id="checkbox-sort-name" name="checkbox-sort" onchange="sortHandler(${sortNameParams});" class="custom-control-input"> Sort by Name
    </label>
    <label>
      <input type="checkbox"${sortPriority} id="checkbox-sort-priority" name="checkbox-sort" onchange="sortHandler(${sortPriorityParams});" class="custom-control-input"> Sort by Priority
    </label>
    </div>
  `;

  // assemble the table
  const table = `
   <div class="ui-container">${sortUI} ${addBtn}</div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Priority</th>
          <th>Complete</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    <div class="text-center" style="margin-top: 1rem">${countComplete} of ${countTotal} Todos Complete.</div>
  `;

  return table;
}


export {
  modalComponent,
  renderTable
}
