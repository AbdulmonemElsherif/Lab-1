// Array of employees
const employees = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employees });
};

// Delete an employee
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  const index = employees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
    res.status(200).json({ data: {} });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
};

// Create an employee
exports.createEmployee = async (req, res, next) => {
  const { name } = req.body;
  const id = (employees.length + 1).toString();
  const newEmployee = { id, name };
  employees.push(newEmployee);
  res.status(201).json({ data: newEmployee });
};