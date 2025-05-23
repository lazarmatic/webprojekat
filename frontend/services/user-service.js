  var UserService = {

      init: function () {
        var token = localStorage.getItem("user_token");
        if (token && token !== undefined) {
          window.location.replace("index.html");
        }
        $("#loginForm").validate({
          submitHandler: function (form) {
            var entity = Object.fromEntries(new FormData(form).entries());
            console.log(entity);
            UserService.login(entity);
          },
        });
      },

      initRegister: function () {
        $("#registrationForm").validate({
          submitHandler: function (form) {
            const entity = {
              username: $("#username").val(),
              full_name: $("#name").val(),
              email: $("#email").val(),
              phone: $("#phone").val(),
              passw: $("#password").val(),
            };
      
            console.log("Registering user:", entity);
            UserService.register(entity);
          },
        });
      },
      

      login: function (entity) {
        $.ajax({
          url: Constants.PROJECT_BASE_URL + "auth/login",
          type: "POST",
          data: JSON.stringify(entity),
          contentType: "application/json",
          dataType: "json", 
          success: function (result) {
            console.log(result);
            localStorage.setItem("user_token", result.data.token);
            location.reload();
          window.location.replace("index.html#about");
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            toastr.error(XMLHttpRequest?.responseText ?  XMLHttpRequest.responseText : 'Error');
          },
        });
      },

      register: function (entity) {
        $.ajax({
          url: Constants.PROJECT_BASE_URL + "auth/register",
          type: "POST",
          data: JSON.stringify(entity),
          contentType: "application/json",
          dataType: "json",
          success: function (result) {
            toastr.success("Registration successful! Please log in.");
            window.location.replace("index.html#login");
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            const errorMsg = XMLHttpRequest?.responseText
              ? XMLHttpRequest.responseText
              : "Registration failed.";
            toastr.error(errorMsg);
          },
        });
      },      
    
      logout: function () {
        localStorage.clear();
        window.location.replace("#login");
      },

      generateMenuItems: function() {
        const token = localStorage.getItem("user_token");
        const parsed = Utils.parseJwt(token);
        console.log("Token from localStorage:", token);
        console.log("Parsed JWT:", parsed);

      
        if (parsed && parsed.user && parsed.user.role) {
          const user = parsed.user;
          console.log("User role:", user.role);
          // ❗️CLEAR previous dynamic menu items
          $(".navbar-nav").find(".dynamic-menu").remove();
      
          let nav = "";
          let main = "";
      
          switch(user.role) {
            case Constants.USER_ROLE:
              nav = '<li class="nav-item dynamic-menu">'+
                      '<a class="nav-link" href="#books">Books</a>'+
                    '</li>'+
                    '<li class="nav-item dynamic-menu">'+
                      '<a class="nav-link" href="#about">About</a>'+
                    '</li>'+
                    '<li class="nav-item dynamic-menu">'+
                      '<a class="nav-link" href="#team">Team</a>'+
                    '</li>'+
                    '</li>'+
                    '<li class="nav-item dynamic-menu">'+
                      '<a class="nav-link" href="#contact">Contact</a>'+
                    '</li>'+
                    '<li class="nav-item dynamic-menu">'+
                      '<a class="nav-link" href="#" onclick="UserService.logout()">Logout</a>'+
                    '</li>';
                    console.log("Appending nav for role:", user.role)
              $(".navbar-nav").append(nav);
      
              main =
                '<section id="books"  data-load="books.html"></section>'+
                '<section id="about"  data-load="about.html"></section>'+
                '<section id="team" data-load="team.html"></section>'+
                '<section id="contact" data-load="contact.html"></section>';
              $("#spapp").html(main);
              break;
      
            case Constants.ADMIN_ROLE:
              nav = '<li class="nav-item dynamic-menu">'+
                      '<a class="nav-link" href="#books">Books</a>'+
                    '</li>'+
                    '<li class="nav-item dynamic-menu">'+
                      '<a class="nav-link" href="#about">About</a>'+
                    '</li>'+
                    '<li class="nav-item dynamic-menu">'+
                      '<a class="nav-link" href="#team">Team</a>'+
                    '</li>'+
                    '</li>'+
                    '<li class="nav-item dynamic-menu">'+
                      '<a class="nav-link" href="#contact">Contact</a>'+
                    '</li>'+
                    '<li class="nav-item dynamic-menu">'+
                      '<a class="nav-link" href="#adminpage">AdminPage</a>'+
                    '</li>'+
                    '<li class="nav-item dynamic-menu">'+
                      '<button class="btn btn-primary" onclick="UserService.logout()">Logout</button>'+
                    '</li>';
              $(".navbar-nav").append(nav);
      
              main =
                '<section id="books"  data-load="books.html"></section>'+
                '<section id="about"  data-load="about.html"></section>'+
                '<section id="team" data-load="team.html"></section>'+
                '<section id="adminpage" data-load="adminpage.html"></section>'+
                '<section id="contact" data-load="contact.html"></section>';
              $("#spapp").html(main);
              break;
      
            default:
              $(".navbar-nav").find(".dynamic-menu").remove();
              $("#spapp").html(""); // fallback
          }
        } else {
          //window.location.replace("login.html");
        }
  } }
    