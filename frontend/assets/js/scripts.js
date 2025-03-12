/*!
 * Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
 */
//
// Scripts
//

// Team people toggle requirement
function teamshowing(button) {
  const targetId = button.getAttribute("data-target");
  const targetSection = document.getElementById(targetId);

  if (targetSection.classList.contains("show")) {
    targetSection.classList.remove("show");
  } else {
    targetSection.classList.add("show");
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  //  Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});

// Fetching data from JSON to services page
$(document).ready(function () {
  fetchServices();
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

// Toaster messages
// Configure Toastr
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

// Display  toaster messages on button click
document.getElementById("successBtn").addEventListener("click", function () {
  toastr.success("Your action was successful!", "Success");
});

document.getElementById("errorBtn").addEventListener("click", function () {
  toastr.error("There was an error processing your request.", "Error");
});

// Accordion menu - faq
function toggleAccordion(contentId) {
  const content = document.getElementById(contentId);
  if (content.classList.contains("show")) {
    content.classList.remove("show");
  } else {
    content.classList.add("show");
  }
}
// ajax form validation
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  var formData = new FormData(this);

  // Simulate submission delay (2 seconds in this example)
  setTimeout(function () {
    // Display success message
    document.getElementById("message").innerText = "Data saved successfully!";
    alert("Service deleted successfully!");
    console.log("succesfully");
  }, 2000); // Change delay as needed
});
// rrrrrrrrrrrrrrrrrrrrrreeeeeeeeeeeeeeeeeeeeggggggggggggggggiiiiiiiiiiiisssssssssssttttttttttttteeeeeeeeeeeeerrrrrrrrrrr
const form = document.querySelector("form");
(eField = form.querySelector(".email")),
  (eInput = eField.querySelector("input")),
  (uField = form.querySelector(".username")),
  (uInput = uField.querySelector("input")),
  (pField = form.querySelector(".password")),
  (pInput = pField.querySelector("input"));
(iField = form.querySelector(".name")),
  (iInput = iField.querySelector("input"));
(bField = form.querySelector(".phone")),
  (bInput = bField.querySelector("input"));
form.onsubmit = (e) => {
  e.preventDefault(); //preventing from form submitting
  //if email and password is blank then add shake class in it else call specified function
  uInput.value == "" ? uField.classList.add("shake", "error") : checkUserName();
  eInput.value == "" ? eField.classList.add("shake", "error") : checkEmail();
  pInput.value == "" ? pField.classList.add("shake", "error") : checkPass();
  iInput.value == "" ? iField.classList.add("shake", "error") : checkName();
  bInput.value == "" ? bField.classList.add("shake", "error") : checkPhone();

  setTimeout(() => {
    //remove shake class after 500ms
    uField.classList.remove("shake");
    eField.classList.remove("shake");
    pField.classList.remove("shake");
    iField.classList.remove("shake");
    bField.classList.remove("shake");
  }, 500);
  uInput.onkeyup = () => {
    checkUserName();
  }; //calling checkUserName function on username input keyup
  eInput.onkeyup = () => {
    checkEmail();
  }; //calling checkEmail function on email input keyup
  pInput.onkeyup = () => {
    checkPass();
  }; //calling checkPassword function on pass input keyup
  iInput.onkeyup = () => {
    checkName();
  }; //calling checkName function on name input keyup
  bInput.onkeyup = () => {
    checkPhone();
  }; //calling checkPhone function on email input keyup
  function checkEmail() {
    //checkEmail function
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
    if (!eInput.value.match(pattern)) {
      //if pattern not matched then add error and remove valid class
      eField.classList.add("error");
      eField.classList.remove("valid");
      let errorTxt = eField.querySelector(".error-txt");
      //if email value is not empty then show please enter valid email else show Email can't be blank
      eInput.value != ""
        ? (errorTxt.innerText = "Unesite ispravnu Email adresu")
        : (errorTxt.innerText = "Molimo Vas upišite vaš Email");
    } else {
      //if pattern matched then remove error and add valid class
      eField.classList.remove("error");
      eField.classList.add("valid");
    }
  }
  function checkPass() {
    //checkPass function
    let pattern = /^(?=.{8,})/;
    if (!pInput.value.match(pattern)) {
      //if pattern not matched then add error and remove valid class
      pField.classList.add("error");
      pField.classList.remove("valid");
      let errorTxt = pField.querySelector(".error-txt");
      //if name value is not empty then show please enter valid name else show Name can't be blank
      pInput.value != ""
        ? (errorTxt.innerText = "Unesite ispravnu lozinku!")
        : (errorTxt.innerText = "Molimo Vas unesite lozinku!");
    } else {
      //if pattern matched then remove error and add valid class
      pField.classList.remove("error");
      pField.classList.add("valid");
    }
  }
  function checkUserName() {
    //checkUserName function
    if (!uInput.value.lenght > 3) {
      //if pattern not matched then add error and remove valid class
      uField.classList.add("error");
      uField.classList.remove("valid");
      let errorTxt = uField.querySelector(".error-txt");
      //if name value is not empty then show please enter valid name else show Name can't be blank
      uInput.value != ""
        ? (errorTxt.innerText = "Unesite ispravno korisnicko ime")
        : (errorTxt.innerText = "Molimo Vas upišite vaše korisnicko ime");
    } else {
      //if pattern matched then remove error and add valid class
      uField.classList.remove("error");
      uField.classList.add("valid");
    }
  }
  function checkName() {
    //checkName function
    let pattern = /^[a-zA-Z]+ [a-zA-Z]+$/; //pattern for validate name
    if (!iInput.value.match(pattern)) {
      //if pattern not matched then add error and remove valid class
      iField.classList.add("error");
      iField.classList.remove("valid");
      let errorTxt = iField.querySelector(".error-txt");
      //if name value is not empty then show please enter valid name else show Name can't be blank
      iInput.value != ""
        ? (errorTxt.innerText = "Unesite ispravno ime i prezime")
        : (errorTxt.innerText = "Molimo Vas upišite vaše ime");
    } else {
      //if pattern matched then remove error and add valid class
      iField.classList.remove("error");
      iField.classList.add("valid");
    }
  }
  function checkPhone() {
    //checkPhone function
    let pattern = /^(\s*\d{9}\s*)(,\s*\d{9}\s*)*,?\s*$/; //pattern for validate phone
    if (!bInput.value.match(pattern)) {
      //if pattern not matched then add error and remove valid class
      bField.classList.add("error");
      bField.classList.remove("valid");
      let errorTxt = bField.querySelector(".error-txt");
      //if phone value is not empty then show please enter valid phone else show phone can't be blank
      bInput.value != ""
        ? (errorTxt.innerText = "Unesite ispravan broj telefona")
        : (errorTxt.innerText = "Molimo Vas upišite vaš broj telefona");
    } else {
      //if pattern matched then remove error and add valid class
      bField.classList.remove("error");
      bField.classList.add("valid");
    }
  }

  // if eField , pField , iField and bField doesn't contains error class that mean user filled details properly
  if (
    !uField.classList.contains("error") &&
    !eField.classList.contains("error") &&
    !pField.classList.contains("error") &&
    !iField.classList.contains("error") &&
    !bField.classList.contains("error")
  ) {
    //redirecting user to the specified url which is inside action attribute of form tag (DID IT IN PHP)
  } else {
    e.preventDefault();
  }
};
