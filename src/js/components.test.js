/**
 * @jest-environment jsdom
 */

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

      expect(component.editModalTest(params)).toBe(modalHTML);
});

test('Render Table', () => {

	let data = [
		{
			id: 1,
			name: 'Apply for position @ Rocket Lab',
			priority: 1,
			complete: 1,
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
    <h3>Sort by:</h3>
    <label class="custom-radio name" style="margin-right: .5rem">None
      <input type="radio" checked id="checkbox-sort-default" name="checkbox-sort" onchange="sortHandler(3);" class="custom-control-input">
      <span class="checkmark"></span>
    </label>
    <label class="custom-radio name" style="margin-right: .5rem">Name
      <input type="radio" id="checkbox-sort-name" name="checkbox-sort" onchange="sortHandler(2);" class="custom-control-input">
      <span class="checkmark"></span>
    </label>
    <label class="custom-radio priority" style="margin-right: .5rem">Priority
      <input type="radio" id="checkbox-sort-priority" name="checkbox-sort" onchange="sortHandler(1);" class="custom-control-input"> 
      <span class="checkmark"></span>
    </label>
    <label class="custom-radio complated" style="margin-right: .5rem">Completed
      <input type="radio" id="checkbox-sort-complated" name="checkbox-sort" onchange="sortHandler(4);" class="custom-control-input"> 
      <span class="checkmark"></span>
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
        <td>Apply for position @ Rocket Lab</td>
        <td>
          <label class="switch">
            <input type="checkbox" checked onchange="toggleHandler(1,1);" class="custom-control-input"> Yes
            <span class="slider round"></span>
          </label>
        </td>
        <td>
          <label class="switch">
            <input type="checkbox" checked onchange="toggleHandler(1,2);" class="custom-control-input"> Yes
            <span class="slider round"></span>
          </label>
        </td>
        <td>
      <button type="button" data-type="edit" onclick="renderModal(1,1);" class="btn btn-green btn-edit">Edit</button>
      <button type="button" data-type="delete" onclick="renderModal(1,2);" class="btn btn-red btn-delete">Delete</button>
    </td>
      </tr>
    
      </tbody>
    </table>
    <div class="text-center" style="margin-top: 1rem">1 of 1 Todos Complete.</div>`;

	expect(component.renderTable(data, active)).toBe(table);
});
