import {
  modalComponent,
  renderTable
} from './components.js';

let data = [
  {
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
  },  {
    id: 3,
    name: 'Walk the dog',
    priority: false,
    complete: false,
    publish: false
  } 
];

let active = {
  id: '',
  action: ''
}

/* ########################
######### METHODS #########
######################### */

const closeModal = () => {
  // Remove modal from DOM
  const modal = document.getElementById('modal');
  modal.remove();
}

const renderModal = (...params) => {

  console.log(params[0], params[1]);

  // params[1] === 1 Edit
  // params[1] === 2 Delete
 
  // Generate new modal object
  const modal = Object.create(modalComponent);
  modal.title = 'Add New Todo';

  // check params for edit or delete
  if (params[1]) {

    active.id = params[0];
    active.action = params[1];

    const val = data.filter(p => p.id === params[0]);
    modal.value = val[0].name;

    // set to delete to true to switch modal UI
    if (params[1] === 2) modal.delete = true;
  }

  const newModal = modal.renderHTML();
  const mount = document.getElementById('modal-mount-point');
  // Add modal to the DOM
  mount.innerHTML = newModal;

  // Automatically add focus to the input with the modal
  if ((!params[1]) || (params[1] === 1)) {
    
    const input = document.getElementById('input-add-todo');
    input.focus();

  }
  
  // add lister to save btn
  document.getElementById("btn-save-todo").addEventListener("click", saveValue);

  // Add listener to close modal button
  document.getElementById("btn-close-modal").addEventListener("click", closeModal);
}

const saveValue = (e) => {

  const value = document.getElementById("input-add-todo").value;

  // Delete function
  if (active.action === 2) {
    // isolate item to delete
    const dataIsolated = data.filter(p => p.id === active.id);
    // set item to unpublish (soft delete)
    dataIsolated[0].publish = false;

  // Edit function
  } else if (active.action === 1) {
    // Isolate item to edit
    const dataIsolated = data.filter(p => p.id === active.id);
    // Set new value
    dataIsolated[0].name = value;
  
  // Create new item function
  } else {
    
    let count = 0;

    data.map(() => { count += 1 });

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
}

const loadApp = () => {
  
  const tableHTML = renderTable(data);
  const mount = document.getElementById('app-mount-point');

  mount.innerHTML = tableHTML;

  // Listen for add todo click
  document.getElementById("btn-launch-modal").addEventListener("click", renderModal);
}

document.addEventListener("DOMContentLoaded", loadApp);

