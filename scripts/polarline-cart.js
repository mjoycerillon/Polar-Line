$(function() {
    var isLoggedOn = localStorage.getItem("isLoggedOn");
    var accounts = localStorage.getItem("accounts");
    var userData = localStorage.getItem("current_user");
    var user = JSON.parse(userData);

    // Call the Window On Load Function
    $(window).on('load', function () {

        if (isLoggedOn == "true") {
            var cart = user["cart"];
            for (i = 0; i < cart.length; i++) {
                var productName = "";
                var productPrice = "";
                var productQuantity = "";
                var productImage = "";
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
                var card = 
                      '<div class="row pb-1 justify-content-center">' +
                          '<div class="card mb-2" style="width: 90%;">' +
                              '<div class="card-body">' +
                                  '<div class="row d-flex justify-content-end">' +
                                      '<button type="button" class="btn-close" aria-label="Close"></button>' +
                                  '</div>' +
                                  '<div class="row">' +
                                      '<div class="col"><img src="'+ productImage +'" class="img-fluid img-thumbnail"></div>' +
                                      '<div class="col align-items-center text-center fw-bolder">'+ productName +'</div>' +
                                      '<div class="col align-items-center">' +
                                          '<div class="container">' +
                                              '<div class="row justify-content-center">Price</div>' +
                                              '<div id="cartItemPrice' + i + '" class="row justify-content-center text-danger fw-bolder">'+ productPrice +'</div>' +
                                          '</div>' +
                                      '</div>' +
                                      '<div class="col align-items-center">' +
                                          '<div class="container p-0">' +
                                              '<div class="row justify-content-center">Quantity</div>' +
                                              '<div class="row justify-content-center">' +
                                                  '<div class="input-group justify-content-center text-center">' +
                                                      '<button class="cart-minus input-group-text">-</button>' +
                                                      '<input class="form-control cartItemQuantity" type="number" data-cart-id="cartItemPrice'+ i +'" data-sub-total-id="cartItemSubtotal' + i +'" value="'+ productQuantity +'">' +
                                                      '<button class="cart-add input-group-text">+</button>' +
                                                  '</div>' +
                                              '</div>' +
                                          '</div>' +
                                      '</div>' +
                                      '<div class="col align-items-center">' +
                                          '<div class="container">' +
                                              '<div class="row justify-content-center">Total</div>' +
                                              '<div id="cartItemSubtotal' + i + '" class="row justify-content-center text-danger fw-bolder">0.00</div>' +
                                          '</div>' +
                                      '</div>' +
                                  '</div>' +
                              '</div>' +
                          '</div>' +
                      '</div>';
      
                  $('#cartContainer').append(card);
            }
        }
        else{
            var guest = localStorage.getItem("guest_user");
            cart = JSON.parse(guest);
            for (i = 0; i < cart.length; i++) {
                var productName = "";
                var productPrice = "";
                var productQuantity = "";
                var productImage = "";
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
                var card = 
                      '<div class="row pb-1 justify-content-center">' +
                          '<div class="card mb-2" style="width: 90%;">' +
                              '<div class="card-body">' +
                                  '<div class="row d-flex justify-content-end">' +
                                      '<button type="button" class="btn-close" aria-label="Close"></button>' +
                                  '</div>' +
                                  '<div class="row">' +
                                      '<div class="col"><img src="'+ productImage +'" class="img-fluid img-thumbnail"></div>' +
                                      '<div class="col align-items-center text-center fw-bolder">'+ productName +'</div>' +
                                      '<div class="col align-items-center">' +
                                          '<div class="container">' +
                                              '<div class="row justify-content-center">Price</div>' +
                                              '<div id="cartItemPrice' + i + '" class="row justify-content-center text-danger fw-bolder">'+ productPrice +'</div>' +
                                          '</div>' +
                                      '</div>' +
                                      '<div class="col align-items-center">' +
                                          '<div class="container p-0">' +
                                              '<div class="row justify-content-center">Quantity</div>' +
                                              '<div class="row justify-content-center">' +
                                                  '<div class="input-group justify-content-center text-center">' +
                                                      '<button class="cart-minus input-group-text">-</button>' +
                                                      '<input class="form-control cartItemQuantity" type="number" data-cart-id="cartItemPrice'+ i +'" data-sub-total-id="cartItemSubtotal' + i +'" value="'+ productQuantity +'">' +
                                                      '<button class="cart-add input-group-text">+</button>' +
                                                  '</div>' +
                                              '</div>' +
                                          '</div>' +
                                      '</div>' +
                                      '<div class="col align-items-center">' +
                                          '<div class="container">' +
                                              '<div class="row justify-content-center">Total</div>' +
                                              '<div id="cartItemSubtotal' + i + '" class="row justify-content-center text-danger fw-bolder">0.00</div>' +
                                          '</div>' +
                                      '</div>' +
                                  '</div>' +
                              '</div>' +
                          '</div>' +
                      '</div>';
      
                  $('#cartContainer').append(card);
            }
        }

        $('.cart-minus').on('click', function() {
            var currentQuantity = $(this).siblings('.cartItemQuantity').val();
            if (currentQuantity > 0) {
                $(this).siblings('.cartItemQuantity').val(parseInt(currentQuantity) - 1);
				var cartItemId = $(this).siblings('.cartItemQuantity').data("cart-id");
                var cartItemSubtotal = $(this).siblings('.cartItemQuantity').data("sub-total-id");
                updateItemSubtotal($(this), cartItemId, cartItemSubtotal);
            } 
        }); 
    
        $('.cart-add').on('click', function() {
            var currentQuantity = $(this).siblings('.cartItemQuantity').val();
            $(this).siblings('.cartItemQuantity').val(parseInt(currentQuantity) + 1);
            var cartItemId = $(this).siblings('.cartItemQuantity').data("cart-id");
            var cartItemSubtotal = $(this).siblings('.cartItemQuantity').data("sub-total-id");
            updateItemSubtotal($(this), cartItemId, cartItemSubtotal);
        }); 
    
        function updateItemSubtotal(element, cartItemId, cartItemSubtotalId){
            var itemPrice = $(element).parents().find('#'+cartItemId).text();
            var itemQuantity = $(element).siblings('.cartItemQuantity').val();
            var subTotal = parseInt(itemPrice) * parseInt(itemQuantity);
            $(element).parents().find('#'+cartItemSubtotalId).text(subTotal.toFixed(2));
        }
    });    

});