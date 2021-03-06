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

// clone data array for sorting reset 
let tempArr = [...data];

let active = {
  id: '',
  action: '',
  sortPriority: false,
  sortName: false,
  sortCompleted: false,
  theme: 0
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

  // params[1] === 1 Edit
  // params[1] === 2 Delete
 
  // Generate new modal object
  const modal = Object.create(modalComponent);
  modal.title = 'Add New To-do';

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

  // Add listener to enter key
  document.getElementById('input-add-todo').addEventListener('keypress', function (e) {
    // save on enter key press
    if (e.key === 'Enter') saveValue();

  });

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
    // isolate index to delete
    const indexIsolated = data.findIndex(p => p.id === active.id);
    // set item to unpublish (soft delete)
    data[indexIsolated].publish = false;
    tempArr[indexIsolated].publish = false;

  // Edit function
  } else if (active.action === 1) {
    // Isolate index to edit
    const indexIsolated = data.findIndex(p => p.id === active.id);
    // Set new value
    data[indexIsolated].name = value;
    tempArr[indexIsolated].name = value;
  
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

    tempArr.push({
      id: count + 1,
      name: value,
      priority: 0,
      complete: 0,
      publish: true
    });
  }

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
  // do not run function if no params are passed
  if (!params[1]) return;

  // if params[1] === 1 (Priority)
  // if params[1] === 2 (Complete)

  // set global active states
  active.id = params[0];
  active.action = params[1];
    // Isolate index to edit
  const indexIsolated = data.findIndex(p => p.id === active.id);

  if (active.action === 1) {
    data[indexIsolated].priority = (data[indexIsolated].priority == 0 ? 1 : 0);
  } else {
    data[indexIsolated].complete = (data[indexIsolated].complete == 0 ? 1 : 0);
  }

  // return true if running test
  if (params[2]) return data[indexIsolated].priority;

  loadApp();

}

const sortHandler = (...params) => {
  // do not run function if no params are passed
  if (!params[0]) return;

  // if params[1] === 1 (Sort by priority)
  // if params[1] === 2 (Sort by name)
  // if params[1] === 3 (Sort by default)
  // if params[1] === 4 (Sort by complete)

  if (params[0] === 1) {

    active.sortPriority = true;
    active.sortName = false;
    active.sortCompleted = false;

    if (active.sortPriority) {
      // method taken from https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
      data.sort((a, b) => parseFloat(b.priority) - parseFloat(a.priority));
    }

  } else if (params[0] === 4) {

    active.sortPriority = false;
    active.sortName = false;
    active.sortCompleted = true;

    if (active.sortCompleted) {
      // method taken from https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
      data.sort((a, b) => parseFloat(b.complete) - parseFloat(a.complete));
    }

  } else if (params[0] === 2) {

    active.sortPriority = false;
    active.sortName = true;
    active.sortCompleted = false;

    if (active.sortName) {
      // method taken from https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
      data.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
    }

  } else {

    active.sortPriority = false;
    active.sortName = false;
    active.sortCompleted = false;
    // reset array to original if both toggles are off
    data = [...tempArr];
  }

  // return second item in array for testing
  if (params[1]) return data[1];

  loadApp();

}

const toggleTheme = (param) => {
  // do not run function if no params are passed
  if (!param) return;

  active.theme = (active.theme == 0 ? 1 : 0);

  // return active theme for test
  if (param === 3) return active.theme;

  const body = document.getElementById('body');

  if (active.theme === 1) {
    body.classList.remove("light");
    body.classList.add("dark");
  } else if (active.theme === 0) {
    body.classList.remove("dark");
    body.classList.add("light");
  }

}

const loadApp = () => {

  // global active state
  active.id = '';
  active.action = '';
  
  const tableHTML = renderTable(data, active);
  const mount = document.getElementById('app-mount-point');

  mount.innerHTML = tableHTML;

  // Listen for add to-do click
  document.getElementById("btn-launch-modal").addEventListener("click", renderModal);
      
  toggleHandler();

  sortHandler();

  toggleTheme();

}

export {
  data,
  active,
  toggleHandler,
  sortHandler,
  closeModal,
  renderModal,
  saveValue,
  toggleTheme,
  loadApp
}

