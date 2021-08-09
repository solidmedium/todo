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

/* ########################
######### METHODS #########
######################### */



const closeModal = () => {
  // Remove modal from DOM
  const modal = document.getElementById('modal');
  modal.remove();
}

const renderModal = () => {
  // Generate new modal object
  const modal = Object.create(modalComponent);
  modal.title = 'Add New Todo';
  const newModal = modal.renderHTML();
  const mount = document.getElementById('modal-mount-point');
  // Add modal to the DOM
  mount.innerHTML = newModal;

  // Automatically add focus to the input with the modal
  const input = document.getElementById('input-add-todo');
  input.focus();

  // Add listener to close modal button
  document.getElementById("btn-close-modal").addEventListener("click", closeModal);

  // add lister to save btn
  document.getElementById("btn-save-todo").addEventListener("click", saveValue);

}

const saveValue = (e) => {
 
  const value = document.getElementById("input-add-todo").value;

  data.push({
    id: '',
    name: value,
    priority: 0,
    complete: 'No',
    publish: true
  });

  console.log(data);
}

const loadApp = () => {
  
  const tableHTML = renderTable(data);
  const mount = document.getElementById('app-mount-point');

  mount.innerHTML = tableHTML;

  // Listen for add todo click
  document.getElementById("btn-launch-modal").addEventListener("click", renderModal);

}

document.addEventListener("DOMContentLoaded", loadApp);

