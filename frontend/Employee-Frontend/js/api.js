// js/api.js
const BASE_URL = "http://localhost:8080/employees"; // Your backend API URL

// Get all employees
async function getEmployees() {
    const res = await fetch(BASE_URL);
    return await res.json();
}

// Get single employee by ID
async function getEmployee(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    return await res.json();
}

// Add new employee
async function addEmployee(employee) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
    });
    return await res.json();
}

// Update employee
async function updateEmployee(id, employee) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
    });
    return await res.json();
}

// Delete employee
async function deleteEmployee(id) {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}
