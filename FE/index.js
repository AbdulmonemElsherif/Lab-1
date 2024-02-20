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
  const nameInput = document.getElementById('name');
  const name = nameInput.value;
  nameInput.value = '';

  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })
    .then(response => response.json())
    .then(() => fetchEmployees())
    .catch(error => console.error(error));
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
