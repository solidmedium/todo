const component = require('./components.js');


test('Modal Component - Edit', () => {
	
	const modalHTML = `<div class="modal" id="modal">
        <div class="modal-header">
          <h4 class="modal-title"></h4>
          <button type="button" class="close btn btn-red" id="btn-close-modal">
            <span aria-hidden="true">X</span>
          </button>
        </div>
        <div class="modal-body">
           
        <div class="input-container">
          <input type="text" placeholder="Add New Todo" id="input-add-todo" class="form-control" value="Take out the trash">
          <button type="button" id="btn-save-todo" class="btn btn-green">GO</button>
        </div>
      
        </div>
      </div>`;

      const params = [1, 1];

      expect(component.editModalTest(...params)).toBe(modalHTML);
});

test('Render Table', () => {

	let data = [
	  {
	    id: 1,
	    name: 'Take out the trash',
	    priority: 0,
	    complete: 0,
	    publish: true
	  }, {
	    id: 2,
	    name: 'Bring in the trash',
	    priority: 0,
	    complete: 0,
	    publish: true
	  },  {
	    id: 3,
	    name: 'Walk the dog',
	    priority: 1,
	    complete: 0,
	    publish: true
	  },  {
	    id: 4,
	    name: 'Get the job',
	    priority: 0,
	    complete: 0,
	    publish: true
	  },  {
	    id: 5,
	    name: 'zalk the cat',
	    priority: 1,
	    complete: 0,
	    publish: true
	  } 
	];

	let active = {
	  id: '',
	  action: '',
	  sortPriority: false,
	  sortName: false
	}

	const table = `<div class="ui-container">
    <div>
    <label style="margin-right: 1rem">
      <input type="checkbox" id="checkbox-sort-name" name="checkbox-sort" onchange="sortHandler(2);" class="custom-control-input"> Sort by Name
    </label>
    <label>
      <input type="checkbox" id="checkbox-sort-priority" name="checkbox-sort" onchange="sortHandler(1);" class="custom-control-input"> Sort by Priority
    </label>
    </div>
   
      <button type="button" id="btn-launch-modal" class="btn btn-green">Add New Todo</button>
  </div>
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
        
      <tr>
        <td>Take out the trash</td>
        <td>
          <label>
            <input type="checkbox" onchange="toggleHandler(1,1);" class="custom-control-input"> No
          </label>
        </td>
        <td>
          <label>
            <input type="checkbox" onchange="toggleHandler(1,2);" class="custom-control-input"> No
          </label>
        </td>
        <td>
      <button type="button" data-type="edit" onclick="renderModal(1,1);" class="btn btn-green btn-edit">Edit</button>
      <button type="button" data-type="delete" onclick="renderModal(1,2);" class="btn btn-red btn-delete">Delete</button>
    </td>
      </tr>
    
      <tr>
        <td>Bring in the trash</td>
        <td>
          <label>
            <input type="checkbox" onchange="toggleHandler(2,1);" class="custom-control-input"> No
          </label>
        </td>
        <td>
          <label>
            <input type="checkbox" onchange="toggleHandler(2,2);" class="custom-control-input"> No
          </label>
        </td>
        <td>
      <button type="button" data-type="edit" onclick="renderModal(2,1);" class="btn btn-green btn-edit">Edit</button>
      <button type="button" data-type="delete" onclick="renderModal(2,2);" class="btn btn-red btn-delete">Delete</button>
    </td>
      </tr>
    
      <tr>
        <td>Walk the dog</td>
        <td>
          <label>
            <input type="checkbox" checked onchange="toggleHandler(3,1);" class="custom-control-input"> Yes
          </label>
        </td>
        <td>
          <label>
            <input type="checkbox" onchange="toggleHandler(3,2);" class="custom-control-input"> No
          </label>
        </td>
        <td>
      <button type="button" data-type="edit" onclick="renderModal(3,1);" class="btn btn-green btn-edit">Edit</button>
      <button type="button" data-type="delete" onclick="renderModal(3,2);" class="btn btn-red btn-delete">Delete</button>
    </td>
      </tr>
    
      <tr>
        <td>Get the job</td>
        <td>
          <label>
            <input type="checkbox" onchange="toggleHandler(4,1);" class="custom-control-input"> No
          </label>
        </td>
        <td>
          <label>
            <input type="checkbox" onchange="toggleHandler(4,2);" class="custom-control-input"> No
          </label>
        </td>
        <td>
      <button type="button" data-type="edit" onclick="renderModal(4,1);" class="btn btn-green btn-edit">Edit</button>
      <button type="button" data-type="delete" onclick="renderModal(4,2);" class="btn btn-red btn-delete">Delete</button>
    </td>
      </tr>
    
      <tr>
        <td>zalk the cat</td>
        <td>
          <label>
            <input type="checkbox" checked onchange="toggleHandler(5,1);" class="custom-control-input"> Yes
          </label>
        </td>
        <td>
          <label>
            <input type="checkbox" onchange="toggleHandler(5,2);" class="custom-control-input"> No
          </label>
        </td>
        <td>
      <button type="button" data-type="edit" onclick="renderModal(5,1);" class="btn btn-green btn-edit">Edit</button>
      <button type="button" data-type="delete" onclick="renderModal(5,2);" class="btn btn-red btn-delete">Delete</button>
    </td>
      </tr>
    
      </tbody>
    </table>
    <div class="text-center" style="margin-top: 1rem">0 of 5 Todos Complete.</div>`;

	expect(component.renderTable(data, active)).toBe(table);
});