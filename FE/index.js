function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// Add event listener to submit button
document.getElementById('submit').addEventListener('click', function(event) {
  event.preventDefault();
  createEmployee();
});

// Add event listener to delete button
// This is a bit tricky because the delete buttons are created dynamically. 
// We can use event delegation on the table body to handle this.
document.getElementById('dataTable').addEventListener('click', function(event) {
  if (event.target.classList.contains('btn-danger')) {
    deleteEmployee(event.target.parentElement.parentElement);
  }
});

function createEmployee() {
  const idInput = document.getElementById('id');
  const nameInput = document.getElementById('name');
  const errorMessageElement = document.getElementById('error-message');
  const id = idInput.value.trim();
  const name = nameInput.value.trim();

  // Validation for empty ID or name
  if (!id || !name) {
    errorMessageElement.textContent = 'Employee ID and name cannot be empty.';
    errorMessageElement.style.display = 'block';
    return; // Stop the function execution here
  }

  // Clear the input fields after getting the values
  idInput.value = '';
  nameInput.value = '';

  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Employee ID already exists. Please try again.');
      }
      return response.json();
    })
    .then(() => {
      fetchEmployees();
      errorMessageElement.style.display = 'none'; // Hide error message on success
    })
    .catch(error => {
      console.error(error);
      errorMessageElement.textContent = error.message; // Set and show the error message
      errorMessageElement.style.display = 'block';
    });
}

function deleteEmployee(row) {
  const id = row.firstChild.textContent;

  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(() => fetchEmployees())
    .catch(error => console.error(error));
}

fetchEmployees();

fetchEmployees()
