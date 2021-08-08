import {
  modalComponent,
  renderTable
} from './components.js';

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

const todo = {
  value: []
};

/* ########################
######### METHODS #########
######################### */

const closeModal = () => {
  // Remove modal from DOM
  const modal = document.getElementById('modal');
  modal.remove();
}

const renderModal = (id) => {
 
  // Generate new modal object
  const modal = Object.create(modalComponent);
  modal.title = 'Add New Todo';

  // check if value is int to  prime edit
  if (id === parseInt(id, 10)) {
    const val = data.filter(p => p.id === id);
    modal.value = val[0].name;
  }

  const newModal = modal.renderHTML();
  const mount = document.getElementById('modal-mount-point');
  // Add modal to the DOM
  mount.innerHTML = newModal;

  // Automatically add focus to the input with the modal
  const input = document.getElementById('input-add-todo');
  input.focus();

  // Add listener to close modal button
  document.getElementById("btn-close-modal").addEventListener("click", closeModal);

  // add listener to input
  document.getElementById("input-add-todo").addEventListener("keyup", recordValue);

}

const recordValue = (e) => {
 
  todo.value = document.getElementById("input-add-todo").value;

}

const loadApp = () => {
  
  const tableHTML = renderTable(data);
  const mount = document.getElementById('app-mount-point');

  mount.innerHTML = tableHTML;

  // Listen for add todo click
  document.getElementById("btn-launch-modal").addEventListener("click", renderModal);

}

document.addEventListener("DOMContentLoaded", loadApp);

