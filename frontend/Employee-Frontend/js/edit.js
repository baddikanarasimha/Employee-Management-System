document.getElementById("editForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = new URLSearchParams(window.location.search).get("id");
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const department = document.getElementById("department").value;
    const salary = document.getElementById("salary").value;

    fetch(`http://localhost:8080/employees/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            department: department,
            salary: salary
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to update employee");
        }
        return response.json();
    })
    .then(data => {
        alert("Employee updated successfully!");
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error updating employee");
    });
});
