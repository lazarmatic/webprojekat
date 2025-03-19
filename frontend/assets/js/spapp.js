var app = $.spapp({
  defaultView: "#about",
  templateDir: "./pages/",
});
app.route({
  view: "register",
  onCreate: function () {
    document
      .getElementById("registrationForm")
      .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        let isValid = true;

        // Regex patterns
        const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
        const fullNameRegex = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^\d{7,15}$/;
        const passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,}$/;

        // Getting input values
        const username = document.getElementById("username").value.trim();
        const fullName = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value.trim();

        // Username validation
        if (!usernameRegex.test(username)) {
          isValid = false;
          document.getElementById("usernameError").textContent =
            "Username must be 3-15 alphanumeric characters.";
        } else {
          document.getElementById("usernameError").textContent = "";
        }

        // Full Name validation
        if (!fullNameRegex.test(fullName)) {
          isValid = false;
          document.getElementById("nameError").textContent =
            "Full Name must be in 'John Doe' format.";
        } else {
          document.getElementById("nameError").textContent = "";
        }

        // Email validation
        if (!emailRegex.test(email)) {
          isValid = false;
          document.getElementById("emailError").textContent =
            "Enter a valid email address.";
        } else {
          document.getElementById("emailError").textContent = "";
        }

        // Phone Number validation
        if (!phoneRegex.test(phone)) {
          isValid = false;
          document.getElementById("phoneError").textContent =
            "Phone number must be 7-15 digits.";
        } else {
          document.getElementById("phoneError").textContent = "";
        }

        // Password validation
        if (!passwordRegex.test(password)) {
          isValid = false;
          document.getElementById("passwordError").textContent =
            "Password must be at least 8 characters long and contain at least 1 number.";
        } else {
          document.getElementById("passwordError").textContent = "";
        }

        // If all inputs are valid, submit the form
        if (isValid) {
          alert("Registration successful!");
          this.submit(); // Submit the form
        }
      });
  },
});

app.route({
  view: "login",
  onCreate: function () {
    document
      .getElementById("loginForm")
      .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        let isValid = true;

        // Regex patterns
        const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
        const passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,}$/;

        // Getting input values
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Username validation
        if (!usernameRegex.test(username)) {
          isValid = false;
          document.getElementById("usernameError").textContent =
            "Username must be 3-15 alphanumeric characters.";
        } else {
          document.getElementById("usernameError").textContent = "";
        }

        // Password validation
        if (!passwordRegex.test(password)) {
          isValid = false;
          document.getElementById("passwordError").textContent =
            "Password must be at least 8 characters long and contain at least 1 number.";
        } else {
          document.getElementById("passwordError").textContent = "";
        }

        // If all inputs are valid, submit the form
        if (isValid) {
          alert("Login successful!");
          this.submit(); // Submit the form
        }
      });
  },
});

app.route({
  view: "about",
  onCreate: function () {
    document
      .getElementById("myForm")
      .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        var formData = new FormData(this);

        // Simulate submission delay (2 seconds in this example)
        setTimeout(function () {
          // Display success message
          document.getElementById("message").innerText =
            "Data saved successfully!";
        }, 2000); // Change delay as needed
      });

    function fetchServices() {
      $.ajax({
        url: "../views/services.json", // Path to the JSON file
        type: "GET", // Type of the request
        dataType: "json", // Expected data type of the response

        success: function (data) {
          let tabela = $("#servicesList");
          tabela.append(
            "<tr><th>Service</th><th>Availability</th><th>Actions</th></tr>"
          );
          data.forEach(function (serviceList) {
            tabela.append(
              `<tr>
                    <td class="service-name"> ${serviceList.service} </td>
                    <td class="service-available"> ${serviceList.available} </td>
                    <td>
                       <button class="edit-btn">Edit</button>
                       <button class="delete-btn">Delete</button>
                     </td>
                 </tr>`
            );
          });
        },
        error: function (xhr, status, error) {
          console.error("Error fetching Services:", error);
        },
      });
    }
    fetchServices();
    // Edit and delete JSON files
    $(document).on("click", ".edit-btn", function () {
      let row = $(this).closest("tr");
      let serviceName = row.find(".service-name").text().trim();
      let serviceAvailable = row.find(".service-available").text().trim();

      // Prompt the user to edit the details
      let newServiceName = prompt("Edit Service Name:", serviceName);
      let newServiceAvailable = prompt("Edit Availability:", serviceAvailable);

      if (newServiceName !== null && newServiceAvailable !== null) {
        row.find(".service-name").text(newServiceName);
        row.find(".service-available").text(newServiceAvailable);
        alert("Service updated successfully!");
      }
    });

    $(document).on("click", ".delete-btn", function () {
      let row = $(this).closest("tr");
      let serviceName = row.find(".service-name").text().trim();

      // Confirm deletion
      let confirmDelete = confirm(
        `Are you sure you want to delete the service: ${serviceName}?`
      );

      if (confirmDelete) {
        row.remove();
        alert("Service deleted successfully!");
      }
    });
  },
});

app.run();
