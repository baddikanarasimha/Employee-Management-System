document.getElementById("addForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const employee = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value,
        salary: parseFloat(document.getElementById("salary").value)
    };

    try {
        const response = await fetch("http://localhost:8080/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert("Employee added successfully!");
        document.getElementById("addForm").reset();

    } catch (error) {
        console.error("Error:", error);
        alert("Failed to add employee. Check console for details.");
    }
});
