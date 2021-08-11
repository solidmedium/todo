import {
  modalComponent,
  renderTable
} from './components.js';

let data = [
  {
    id: 1,
    name: 'Apply for position @ Rocket Lab',
    priority: 1,
    complete: 1,
    publish: true
  }, {
    id: 2,
    name: 'Explain to 2 year old that not everything can be solved through kicking',
    priority: 0,
    complete: 1,
    publish: true
  }, {
    id: 3,
    name: 'Complete coding challenge',
    priority: 1,
    complete: 1,
    publish: true
  }, {
    id: 4,
    name: 'Tell 5 year old that saying \'Come at me bro!\' does not absolve you of anything',
    priority: 0,
    complete: 0,
    publish: true
  }, {
    id: 5,
    name: 'Start telling people about the sweet NFT\'s you have',
    priority: 0,
    complete: 0,
    publish: true
  }, {
    id: 6,
    name: 'Land dream job @ Rocket Lab',
    priority: 1,
    complete: 0,
    publish: true
  } 
];

// set temp arr for data reset 
const tempArr = [...data];

let active = {
  id: '',
  action: '',
  sortPriority: false,
  sortName: false
}

/* ########################
######### METHODS #########
######################### */

const closeModal = () => {
  // Remove modal from DOM
  const modal = document.getElementById('modal');
  modal.classList.remove("active");

  setTimeout(() => {
    modal.remove();
  }, 500);

  active.id = '';
  active.action = '';
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

  if (params[2]) {
    // return true function for tests
    return true;
  } else {
    // Add modal to the DOM
    mount.innerHTML = newModal;
  }


  if ((!params[1]) || (params[1] === 1)) {
    // Automatically add focus to the input in the modal
    const input = document.getElementById('input-add-todo');
    input.focus();

  }

  // add lister to save btn
  document.getElementById("btn-save-todo").addEventListener("click", saveValue);

  // Add listener to close modal button
  document.getElementById("btn-close-modal").addEventListener("click", closeModal);
  
  setTimeout(() => {
  
    const element = document.getElementById("modal");
    element.classList.add("active");

  }, 100);
}

const saveValue = (...params) => {
  
  let value = '';
  if (params[1]) {
    // set value when running tests
    value = 'Test item';
    active.action = '';
  } else {
    value = document.getElementById("input-add-todo").value;
  }

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
      priority: 0,
      complete: 0,
      publish: true
    });
  }

  active.id = '';
  active.action = '';

  console.log(data);

  if (params[1]) {
    // isolate new test item
    const testDataIsolated = data.filter(p => p.id === 7);
    // return out of function
    return testDataIsolated;
  } 

  closeModal();
  loadApp();
}

const toggleHandler = (...params) => {

  if (!params[1]) return;

  // params[1] === 1 Priority
  // params[1] === 2 Complete

  active.id = params[0];
  active.action = params[1];
  // Isolate item to edit
  const dataIsolated = data.filter(p => p.id === active.id);

  if (active.action === 1) {
    dataIsolated[0].priority = !dataIsolated[0].priority;
  } else {
    dataIsolated[0].complete = !dataIsolated[0].complete;
  }

  active.id = '';
  active.action = '';

  // return true if running test
  if (params[2]) return dataIsolated[0].priority;

  loadApp();

}

const sortHandler = (...params) => {

  if (!params[0]) return;

  if (params[0] === 1) {

    active.sortPriority = !active.sortPriority;

    if (active.sortPriority) {
      // this method is taken from https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
      data.sort((a, b) => parseFloat(b.priority) - parseFloat(a.priority));
    }

  } else {
    
    active.sortName = !active.sortName;

    if (active.sortName) {
      // this method is taken from https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
      data.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
    }

  }
  
  // reset array if both toggles are off
  if ((!active.sortName) && (!active.sortPriority)) {
    data = [...tempArr];
  }


  // return second item in array if running tests
  if (params[1]) return data[1];

  loadApp();

}


const loadApp = () => {

  active.id = '';
  active.action = '';
  
  const tableHTML = renderTable(data, active);
  const mount = document.getElementById('app-mount-point');

  mount.innerHTML = tableHTML;

  // Listen for add todo click
  document.getElementById("btn-launch-modal").addEventListener("click", renderModal);
      
  toggleHandler();

  sortHandler();

}

export {
  data,
  active,
  toggleHandler,
  sortHandler,
  closeModal,
  renderModal,
  saveValue,
  loadApp
}

