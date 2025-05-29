let BookService = {
    init: function () {
        $("#addBookForm").validate({
            submitHandler: function (form) {
              var book = Object.fromEntries(new FormData(form).entries());
              BookService.addBook(book);
              form.reset();
            },
          });
        $("#editBookForm").validate({
            submitHandler: function (form) {
              var book = Object.fromEntries(new FormData(form).entries());
              console.log("Book object being submitted:", book);
              BookService.editBook(book);
          
            },
        });
        BookService.getAllBooks();
    },
    openAddModal : function() {
        $('#addBookModal').show();
    },
    addBook: function (book) {
        $.blockUI({ message: '<h3>Processing...</h3>' });
        RestClient.post('books', book, function(response){
            toastr.success("Book added successfully")
            $.unblockUI();
            BookService.getAllBooks();
            BookService.closeModal();
        }, function(response){
            BookService.closeModal()
            toastr.error(response.message);
        })
    },
    getAllBooks: function () {
        RestClient.get("books", function (data) {
            Utils.datatable('books-table', [
                { data: 'title', title: 'Title' },
                { data: 'author', title: 'Author' },
                { data: 'rent_price', title: 'Rent Price (€)' },
                { data: 'buy_price', title: 'Buy Price (€)' },
                { data: 'stock_quantity', title: 'In Stock' },
                { data: 'available_for_rent', title: 'For Rent',
                  render: function (data) {
                    return data ? 'Yes' : 'No';
                  }
                },
                { data: 'available_for_purchase', title: 'For Purchase',
                  render: function (data) {
                    return data ? 'Yes' : 'No';
                  }
                },
                {
                    title: 'Actions',
                    render: function (data, type, row, meta) {
                        const rowStr = encodeURIComponent(JSON.stringify(row));
                        return `
                            <div class="d-flex justify-content-center gap-2 mt-3">
                                <button class="btn btn-primary btn-sm" onclick="BookService.openEditModal('${row.id}')">Edit</button>
                                <button class="btn btn-danger btn-sm" onclick="BookService.openConfirmationDialog(decodeURIComponent('${rowStr}'))">Delete</button>
                                <button class="btn btn-secondary btn-sm" onclick="BookService.openViewMore('${row.id}')">View</button>
                            </div>
                        `;
                    }
                }
            ], data, 10);
        }, function (xhr, status, error) {
            console.error('Error fetching books:', error);
        });
    },
    getBookById : function(id) {
        RestClient.get('booksByID/'+id, function (data) {
            console.log("Full book data returned from backend:", data);             localStorage.setItem('selected_book', JSON.stringify(data))
            const $form = $('#editBookForm');

            $form.find('input[name="id"]').val(data.id); 
            console.log("Set book ID:", data.id);
        console.log("Form input value:", $form.find('input[name="id"]').val()); 
            $form.find('input[name="title"]').val(data.title);
            $form.find('input[name="author"]').val(data.author);
            $form.find('input[name="rent_price"]').val(data.rent_price);
            $form.find('input[name="buy_price"]').val(data.buy_price);
            $form.find('input[name="description_short"]').val(data.description_short);
            $form.find('input[name="description_long"]').val(data.description_long);
            $form.find('input[name="stock_quantity"]').val(data.stock_quantity);
            $form.find('input[name="available_for_rent"]').val(data.available_for_rent);
            $form.find('input[name="available_for_purchase"]').val(data.available_for_purchase);
    
            console.log("ID field populated:", $form.find('input[name="id"]').val());
            $.unblockUI();
        }, function (xhr, status, error) {
            console.error('Error fetching data');
            $.unblockUI();
        });
    },
    openViewMore: function(id) {
        $.blockUI({ message: '<h3>Loading book...</h3>' });
      
        BookService.getBookById(id);
      
        setTimeout(function() {
          const book = JSON.parse(localStorage.getItem('selected_book'));
      
          if (!book) {
            toastr.error("Book not found.");
            $.unblockUI();
            return;
          }
      
          BookService.populateViewMore();
          const modal = new bootstrap.Modal(document.getElementById('viewMoreModal'));
    modal.show();
          $.unblockUI();
        }, 300); 
      }
      ,
    populateViewMore: function () {
        let book = JSON.parse(localStorage.getItem('selected_book'));
        if (!book) {
            console.error("No book data found in localStorage");
            return;
        }
        $("#book-title").text(book.title);
        $("#book-author").text(book.author);
        $("#book-rent-price").text(`€${book.rent_price}`);
        $("#book-buy-price").text(`€${book.buy_price}`);
        $("#book-short-description").text(book.description_short);
        $("#book-long-description").text(book.description_long);
        $("#book-stock").text(book.stock_quantity);
        $("#book-rentable").text(book.available_for_rent ? "Yes" : "No");
        $("#book-purchasable").text(book.available_for_purchase ? "Yes" : "No");
    }
    ,
    openEditModal: function(id) {
        $.blockUI({ message: '<h3>Processing...</h3>' });
        const modal = new bootstrap.Modal(document.getElementById('editBookModal'));
        modal.show();
        setTimeout(() => {
            BookService.getBookById(id);
        }, 300); 
    },
    closeModal : function() {
        $('#editBookModal').hide();
        $("#deleteBookModal").modal("hide");
        $('#addBookModal').hide();
        $('#viewMoreModal').hide();
    },
    editBook : function(book){
        console.log("Submitting book:", book);
        $.blockUI({ message: '<h3>Processing...</h3>' });
        RestClient.put('books/' + book.id, book, function (data) {
            $.unblockUI();
            toastr.success("Book edited successfully")
            BookService.closeModal()
            BookService.getAllBooks();
        }, function (xhr, status, error) {
            console.error('Error');
            $.unblockUI();
        });
    },
    openConfirmationDialog: function (book) {
        book = JSON.parse(book)
        $("#deleteBookModal").modal("show");
        $("#delete-book-body").html(
        "Do you want to delete book: " + book.name
        );
        $("#delete_book_id").val(book.id);
    },
    deleteBook: function () {
        RestClient.delete('books/' + $("#delete_book_id").val(), null, function(response){
            BookService.closeModal()
            toastr.success(response.message);
            BookService.getAllBooks();
        }, function(response){
            BookService.closeModal()
            toastr.error(response.message);
        })
    }
 }
 