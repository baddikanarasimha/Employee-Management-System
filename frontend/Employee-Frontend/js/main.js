let allEmployees = [];

function filterEmployees(searchTerm, searchType) {
    if (!searchTerm) return allEmployees;
    
    searchTerm = searchTerm.toLowerCase();
    return allEmployees.filter(emp => {
        if (searchType === 'name') {
            return emp.name.toLowerCase().includes(searchTerm);
        } else if (searchType === 'department') {
            return emp.department.toLowerCase().includes(searchTerm);
        } else {
            return emp.name.toLowerCase().includes(searchTerm) || 
                   emp.department.toLowerCase().includes(searchTerm);
        }
    });
}

function displayEmployees(employees) {
    const tableBody = document.getElementById('employeeTableBody');
    tableBody.innerHTML = '';

    if (employees.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 20px; color: #64748b;">
                    No employees found
                </td>
            </tr>
        `;
        updateEmployeeCount(0);
        return;
    }

    employees.forEach(emp => {
        tableBody.innerHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.department}</td>
                <td>${emp.salary}</td>
                <td>
                    <a href="edit.html?id=${emp.id}">Edit</a> |
                    <a href="#" onclick="deleteEmployee(${emp.id})">Delete</a>
                </td>
            </tr>
        `;
    });
    updateEmployeeCount(employees.length);
}

window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchType = document.getElementById('searchType');

    // Load initial data
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
        allEmployees = data;
        displayEmployees(data);
        
        // Add search event listeners
        searchInput.addEventListener('input', () => {
            const filteredEmployees = filterEmployees(searchInput.value, searchType.value);
            displayEmployees(filteredEmployees);
        });

        searchType.addEventListener('change', () => {
            const filteredEmployees = filterEmployees(searchInput.value, searchType.value);
            displayEmployees(filteredEmployees);
        });
    })
    .catch(err => console.error(err));
});

function deleteEmployee(id) {
    if(confirm('Are you sure to delete?')) {
        fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
        .then(() => {
            alert('Employee deleted successfully!');
            window.location.reload();
        })
        .catch(err => console.error(err));
    }
}

function updateEmployeeCount(count) {
    const countElement = document.getElementById('employeeCount');
    countElement.textContent = `${count} ${count === 1 ? 'Employee' : 'Employees'}`;
}
