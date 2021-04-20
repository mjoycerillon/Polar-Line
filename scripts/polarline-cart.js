$(function() {
    var isLoggedOn = localStorage.getItem("isLoggedOn");
    var accounts = localStorage.getItem("accounts");

    // Call the Window On Load Function
    $(window).on('load', function () {
        var cart = [];
        if (isLoggedOn == "true") {
            var current_user = JSON.parse(localStorage.getItem("current_user"));
            cart = current_user["cart"];
        } else {
            var guest_user = localStorage.getItem("guest_user");
            if (guest_user != null){
                cart = JSON.parse(guest_user);
            }
        }
        loadCart(cart);

        $('.cart-minus').on('click', function() {
            var currentQuantity = $(this).siblings('.cartItemQuantity').val();
            if (currentQuantity > 0) {
                var currentQuantity = $(this).parents('.cartItem').find('.cartItemQuantity').val();
                if (currentQuantity > 0) {
                    $(this).parents('.cartItem').find('.cartItemQuantity').val(parseInt(currentQuantity) - 1);
                    updateItemSubtotal($(this));
                }
            } 
        }); 
    
        $('.cart-add').on('click', function() {
            var currentQuantity = $(this).parents('.cartItem').find('.cartItemQuantity').val();
            $(this).parents('.cartItem').find('.cartItemQuantity').val(parseInt(currentQuantity) + 1);
            updateItemSubtotal($(this));
        }); 

        function updateItemSubtotal(element){
            var itemPrice = $(element).parents('.cartItem').find('.cartItemPrice').text().substr(1);
            var itemQuantity = $(element).parents('.cartItem').find('.cartItemQuantity').val();
            var subTotal = parseFloat(itemPrice) * parseFloat(itemQuantity);
            var currentSubTotal = parseFloat($(element).parents('.cartItem').find('.cartSubTotal').text().substr(1));
            var cartSubTotal = (parseFloat($('#txtCartSubTotal').text().substr(1)) - currentSubTotal) + subTotal;
            $(element).parents('.cartItem').find('.cartSubTotal').text('$'+ subTotal.toFixed(2));
            $('#txtCartSubTotal').text("$"+cartSubTotal.toFixed(2));
            $('#txtCartTotal').text("$"+cartSubTotal.toFixed(2))
            updateCart();
        }

        function emptyCart() {
            var card = 
                '<div class="card mb-2" style="width: 90%;">' +
                    '<div class="card-body">' +
                        '<div class="row justify-content-center align-items-center" style="height: 403px;">' +
                            '<div class="row w-50">' +
                                '<img class="img-fluid" src="./images/cart/cart-empty.png" alt="" height="50px">' +
                            '</div>' +
                            '<div class="row justify-content-center fw-bolder" style="font-size: 20px;">You have no items in your shopping cart.</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
                $("#cartContainer").append(card);
        }

        function updateCart() {
            var currentUser = JSON.parse(localStorage.getItem("current_user"));
            currentUser["cart"] = [];

            $('.cartItem').each(function() {
                currentUser["cart"].push({
                    "product": $(this).find('.cartItemName').text(),
                    "quantity": $(this).find('.cartItemQuantity').val(),
                    "price": $(this).find('.cartItemPrice').text().substr(1),
                    "imageLocation":  $(this).find('.cartItemImage').attr("src")
                });
            });
            var updateCurrentUser = JSON.stringify(currentUser);
            localStorage.setItem("current_user", updateCurrentUser);

            // Retrieve the data from the local storage and parse it
            var loginData = localStorage.getItem("accounts");
            var objectData = JSON.parse(loginData);
            var emailFound = false;
    
            // Find the account and save it into global variable account
            for (i = 0; i < objectData.length; i++) {
                var tempAccount = objectData[i]
                console.log(tempAccount)
                if (tempAccount["email"] == currentUser["email"]) {
                    emailFound = true;
                    objectData.splice(i, 1);
                    break;
                }
            }
            objectData.push(currentUser);
            localStorage.setItem("accounts",JSON.stringify(objectData));

        }

        function loadCart(cart) {
            var cartSubTotal = 0.0;
            if (cart.length > 0) {
                for (i = 0; i < cart.length; i++) {
                    var productName = "";
                    var productPrice = "";
                    var productQuantity = "";
                    var productImage = "";
                    var cartItemSubTotal = 0.0;
                    $.each(cart[i], function(key, value) {
                         switch(key) {
                            case "product":
                                productName = value;
                                break;
                            case "price":
                                productPrice = value;
                                break;
                            case "quantity":
                                productQuantity = value;
                                break;
                            case "imageLocation":
                                productImage = value;
                                break;
                          }
                    });
                    cartItemSubTotal = productPrice * productQuantity;
                    cartSubTotal += cartItemSubTotal;
                    var card = 
                          '<div class="row p-0 pb-1 justify-content-center cartItem">' +
                              '<div class="card mb-2" style="width: 90%;">' +
                                  '<div class="card-body">' +
                                      '<div class="row d-flex justify-content-end">' +
                                          '<button type="button" class="btn-close removeItem" aria-label="Close"></button>' +
                                      '</div>' +
                                      '<div class="row">' +
                                          '<div class="col"><img src="'+ productImage +'" class="img-fluid img-thumbnail cartItemImage"></div>' +
                                          '<div class="col d-flex align-items-center text-center fw-bolder cartItemName">'+ productName +'</div>' +
                                          '<div class="col d-flex align-items-center">' +
                                              '<div class="container">' +
                                                  '<div class="row justify-content-center">Price</div>' +
                                                  '<div class="row justify-content-center text-danger fw-bolder cartItemPrice">$'+ productPrice +'</div>' +
                                              '</div>' +
                                          '</div>' +
                                          '<div class="col d-flex align-items-center">' +
                                              '<div class="container p-0">' +
                                                  '<div class="row justify-content-center">Quantity</div>' +
                                                  '<div class="row justify-content-center">' +
                                                      '<div class="input-group justify-content-center text-center">' +
                                                          '<button class="cart-minus input-group-text">-</button>' +
                                                          '<input class="form-control cartItemQuantity" type="number" value="'+ productQuantity +'">' +
                                                          '<button class="cart-add input-group-text">+</button>' +
                                                      '</div>' +
                                                  '</div>' +
                                              '</div>' +
                                          '</div>' +
                                          '<div class="col d-flex align-items-center">' +
                                              '<div class="container p-0">' +
                                                  '<div class="row justify-content-center">Total</div>' +
                                                  '<div class="cartSubTotal row justify-content-center text-danger fw-bolder">$'+ cartItemSubTotal.toFixed(2) +'</div>' +
                                              '</div>' +
                                          '</div>' +
                                      '</div>' +
                                  '</div>' +
                              '</div>' +
                          '</div>';
                    $('#cartContainer').append(card);
                }
            } else {
                emptyCart();
            }

            $('#txtCartSubTotal').text("$"+cartSubTotal.toFixed(2));
            $('#txtCartTotal').text("$"+cartSubTotal.toFixed(2))
        }

        $('.removeItem').on('click', function() {
            var price = $(this).parent().next().find('.cartSubTotal').text().substr(1);
            var cartSubTotal = parseFloat($('#txtCartSubTotal').text().substr(1)) - parseFloat(price);
            $('#txtCartSubTotal').text("$"+cartSubTotal.toFixed(2));
            $('#txtCartTotal').text("$"+cartSubTotal.toFixed(2))  
            $(this).parents('.cartItem').animate({opacity: '0'}, 150).animate({height: '0px'});
            $(this).parents('.cartItem').remove();
            updateCart();
            if (cartSubTotal == 0.0) {
                emptyCart();
            }
        });
    });    
});