
let modalComponent = {
  title: 'Add New To-do',
  value: '',
  delete: false,
  renderHTML() {

    let form = '';
    // Switch UI when deleting a to-do
    if (this.delete) {
      form = `
        <div class="input-container">
          <h3>Your are about to delete this item</h3>
          <input type="text" disabled id="input-add-todo" class="form-control" id="" value="${this.value}">
          <button type="button" id="btn-save-todo" class="btn btn-red">Confirm Delete</button>
        </div>
      `;
    } else {
      form = `
        <div class="input-container">
          <input type="text" placeholder="${this.title}" id="input-add-todo" class="form-control" value="${this.value}">
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

function editModalTest() {
  const modal = Object.create(modalComponent);
  modal.title = 'Add New To-do';
  modal.value = 'Take out the trash';
  return modal.renderHTML();

}

function renderTable(data, active) {

  // Remove unpublished/deleted items from the array
  const dataIsolated = data.filter(p => p.publish);

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
          <label class="switch">
            <input type="checkbox"${priority} onchange="toggleHandler(${priorityParams});" class="custom-control-input">${priorityText}
            <span class="slider round"></span>
          </label>
        </td>
        <td>
          <label class="switch">
            <input type="checkbox"${complete} onchange="toggleHandler(${completeParams});" class="custom-control-input">${completeText}
            <span class="slider round"></span>
          </label>
        </td>
        <td>${btns}</td>
      </tr>
    `;  
  });

  // create button
  const addBtn = `
      <button type="button" id="btn-launch-modal" class="btn btn-green">Add New To-do</button>
  `;

  const sortPriorityParams = [1];
  const sortNameParams = [2];
  const sortCompletedParams = [4];
  const sortDefaultParams = [3];

  const sortPriority = (active.sortPriority) ? ' checked' : '';
  const sortName = (active.sortName) ? ' checked' : '';
  const sortCompleted = (active.sortCompleted) ? ' checked' : '';
  const sortDefault = ((!active.sortName) && (!active.sortPriority)) ? ' checked' : '';
 
  // sort UI
  const sortUI = `
    <div>
    <h3>Sort by:</h3>
    <label class="custom-radio name" style="margin-right: .5rem">None
      <input type="radio"${sortDefault} id="checkbox-sort-default" name="checkbox-sort" onchange="sortHandler(${sortDefaultParams});" class="custom-control-input">
      <span class="checkmark"></span>
    </label>
    <label class="custom-radio name" style="margin-right: .5rem">Name
      <input type="radio"${sortName} id="checkbox-sort-name" name="checkbox-sort" onchange="sortHandler(${sortNameParams});" class="custom-control-input">
      <span class="checkmark"></span>
    </label>
    <label class="custom-radio priority" style="margin-right: .5rem">Priority
      <input type="radio"${sortPriority} id="checkbox-sort-priority" name="checkbox-sort" onchange="sortHandler(${sortPriorityParams});" class="custom-control-input"> 
      <span class="checkmark"></span>
    </label>
    <label class="custom-radio complated" style="margin-right: .5rem">Completed
      <input type="radio"${sortCompleted} id="checkbox-sort-complated" name="checkbox-sort" onchange="sortHandler(${sortCompletedParams});" class="custom-control-input"> 
      <span class="checkmark"></span>
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
    <div class="text-center" style="margin-top: 1rem">${countComplete} of ${countTotal} To-dos Complete.</div>
  `;

  return table.trim();
}

export {
  modalComponent,
  editModalTest,
  renderTable
}
