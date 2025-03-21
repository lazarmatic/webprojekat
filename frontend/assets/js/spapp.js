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
          const username = (document.getElementById("username").value = "");
          const fullName = (document.getElementById("name").value = "");
          const email = (document.getElementById("email").value = "");
          const phone = (document.getElementById("phone").value = "");
          const password = (document.getElementById("password").value = "");
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
          document.getElementById("username").value = "";
          document.getElementById("password").value = "";
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

        // Simulate submission delay (1 seconds in this example)
        setTimeout(function () {
          // Display success message
          document.getElementById("message").innerText =
            "Data saved successfully!";
        }, 1000); // Change delay as needed
      });
  },
});

app.route({
  view: "adminpage",
  onCreate: function () {
    function fetchBooks() {
      $.ajax({
        url: "../views/books.json", // Ensure this path is correct
        type: "GET",
        dataType: "json",
        success: function (data) {
          let tabela = $("#bookList tbody"); // Fix selector to target <tbody>
          tabela.empty(); // Clear table before appending new rows

          data.forEach(function (book) {
            tabela.append(generateTableRow(book));
          });
        },
        error: function (xhr, status, error) {
          console.error("Error fetching books:", error);
        },
      });
    }

    function generateTableRow(book) {
      return `
        <tr>
            <td class="book-title">${book.title}</td>
            <td class="book-rent">${book.rent_price}</td>
            <td class="book-buy">${book.buy_price}</td>
            <td class="book-short">${book.short_description}</td>
            <td class="book-long">${book.long_description}</td>
            <td>
                <button class="edit-btn btn btn-warning btn-sm">Edit</button>
                <button class="delete-btn btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>`;
    }

    // Add a new book
    $("#addBookBtn").click(function () {
      let title = prompt("Enter Book Title:");
      let rentPrice = prompt("Enter Rent Price:");
      let buyPrice = prompt("Enter Buy Price:");
      let shortDescription = prompt("Enter Short Description:");
      let longDescription = prompt("Enter Long Description:");

      if (
        title &&
        rentPrice &&
        buyPrice &&
        shortDescription &&
        longDescription
      ) {
        let newBook = {
          title: title,
          rent_price: rentPrice,
          buy_price: buyPrice,
          short_description: shortDescription,
          long_description: longDescription,
        };

        $("#bookList tbody").append(generateTableRow(newBook)); // Fix selector
        alert("New book added successfully!");
      } else {
        alert("All fields are required!");
      }
    });

    // Edit book details
    $(document).on("click", ".edit-btn", function () {
      let row = $(this).closest("tr");
      let bookTitle = row.find(".book-title").text().trim();
      let rentPrice = row.find(".book-rent").text().trim();
      let buyPrice = row.find(".book-buy").text().trim();
      let shortDesc = row.find(".book-short").text().trim();
      let longDesc = row.find(".book-long").text().trim();

      let newTitle = prompt("Edit Book Title:", bookTitle);
      let newRentPrice = prompt("Edit Rent Price:", rentPrice);
      let newBuyPrice = prompt("Edit Buy Price:", buyPrice);
      let newShortDesc = prompt("Edit Short Description:", shortDesc);
      let newLongDesc = prompt("Edit Long Description:", longDesc);

      if (
        newTitle &&
        newRentPrice &&
        newBuyPrice &&
        newShortDesc &&
        newLongDesc
      ) {
        row.find(".book-title").text(newTitle);
        row.find(".book-rent").text(newRentPrice);
        row.find(".book-buy").text(newBuyPrice);
        row.find(".book-short").text(newShortDesc);
        row.find(".book-long").text(newLongDesc);
        alert("Book updated successfully!");
      }
    });

    // Delete book
    $(document).on("click", ".delete-btn", function () {
      let row = $(this).closest("tr");
      let bookTitle = row.find(".book-title").text().trim();

      let confirmDelete = confirm(
        `Are you sure you want to delete the book: ${bookTitle}?`
      );
      if (confirmDelete) {
        row.fadeOut(300, function () {
          $(this).remove();
        });
        alert("Book deleted successfully!");
      }
    });

    fetchBooks();
  },
});
app.run();
