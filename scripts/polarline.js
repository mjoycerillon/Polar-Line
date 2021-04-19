$(function() {
    // Global variables
    var isLoggedOn = localStorage.getItem("isLoggedOn");
    var accounts = localStorage.getItem("accounts");
    var userData = localStorage.getItem("current_user");
    var user = JSON.parse(userData);

    // Call the Window On Load Function
    $(window).on('load', function () {


        isLoggedOn = localStorage.getItem("isLoggedOn");
        accounts = localStorage.getItem("accounts");
        userData = localStorage.getItem("current_user");
        user = JSON.parse(userData);

        // Validate if dummy data exists on the local storage
        if (accounts == null) {
            var accounts = 
            [{
                "first_name": "Rachel Karen",
                "last_name": "Green",
                "email": "rachelgreen@gmail.com",
                "password": "polar",
                "phone": "",
                "billing_address": "1457 London Rd, Sarnia, Ontario Canada, N7S 6K4",
                "shipping_address": "1457 London Rd, Sarnia, Ontario Canada, N7S 6K4",
                "birth_date": "1994-09-22",
                "cart": [
                    {
                        "product": "Z Sweater Coat (White)",
                        "quantity": "2",
                        "price": "94.99",
                        "imageLocation": "./images/shop/shop-image-1.jpg"
                    },
                    {
                        "product": "Au Revoir Sweater (White)",
                        "quantity": "1",
                        "price": "54.99",
                        "imageLocation": "./images/shop/shop-image-2.jpg"
                    },
                    ]
            }];
            var accountsJSON = JSON.stringify(accounts);
            localStorage.setItem("accounts", accountsJSON);
        } 

        if (isLoggedOn == "true") {
            $("#navAccountName").text(user["first_name"]);
            $(".nav-account-d-menu").append('<li><a id="navSignOutLink" class="dropdown-item" href="index.html">Sign Out</a></li>')
            $(".navAccountLink").attr( "href", "account.html");
        }
    });

    $('.burger-container').on('click', function() {
        $('.nav-links-grp').children('ul').toggle('slide', {
            direction: 'left'
        }, 1000);
    });

    /**
     * Navigation Links
     */
    // Upon clicking the account icon, if the user already logged on, Account Page should be displayed
    $('#navAccount').on('click', function() {
        if (isLoggedOn == "true") {
            $(this).attr( "href", "account.html");
        }
    });

    // Upon hover on the Account Icon, a drop-down should be displayed on the screen
    $("#navAccount").hover(function () {
        $(this).children('ul').stop(true, false, true).slideToggle(400);

    });

    // Upon hover on Shop, a sub-menu should be displayed on the screen.
    $('#navShop').hover(function() {
        if (!$('.burger').is(":visible")) {
            $(this).children('div').stop(true, false, true).slideToggle(400);
        } 
    });


    $(document).on('click', '#navSignOutLink', function() {
        localStorage.setItem("isLoggedOn", "false");
        localStorage.removeItem("current_user");
        $('#navSignOutLink').remove(); 
    }); 


    function retrieveAccount(loginEmail) {
        // Retrieve the data from the local storage and parse it
        var loginData = localStorage.getItem("accounts");
        var objectData = JSON.parse(loginData);
        var emailFound = false;

        // Find the account and save it into global variable account
        for (var account in objectData) {
            var tempAccount = objectData[account]
            if (tempAccount["email"] == loginEmail) {
                emailFound = true;
                localStorage.setItem("current_user", JSON.stringify(tempAccount));
            }
        }
        
        return emailFound;
    }

    function isValidEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test( $email );
    }

    function isBlank($field) {
        if ($field == "") {
            return true;
        }
        return false;
    }

    function clearWarning($textField) {
        $textField.removeClass('is-invalid');
        $textField.next().css('display', 'none');
        $('.alert').remove();
    }

    function invalidField(event, $form, $textField, message) {
        if (message != "") {
            var invalid = 
            '<div class="alert alert-danger" role="alert">' + message + '</div>';
            $form.prepend(invalid);
            $form.trigger("reset");
        } else {
            $textField.addClass('is-invalid');
            $textField.next().css('display', 'block');
        }
        $textField.focus();
        event.preventDefault();
    }

    /**
     * Login
     */
    // Upon login, save the data of the user to local storage
    $('#loginForm').on('submit', function(event) {

        // Get value of Login Email and Password
        var loginEmail = $('#txtLoginEmail').val();
        var loginPassword = $('#txtLoginPassword').val();
              
        clearWarning($("#txtLoginEmail"));
        if (isBlank(loginEmail)) {
            invalidField(event, $("#loginForm"), $("#txtLoginEmail"), '');
        } else {
            clearWarning($("#txtLoginEmail"));
            if (!isValidEmail(loginEmail)) {
                invalidField(event, $("#loginForm"), $("#txtLoginEmail"), '');
            } else {
                clearWarning($("#txtLoginEmail"));
                if (isBlank(loginPassword)) {
                    invalidField(event, $("#loginForm"), $("#txtLoginPassword"), '');
                } else {
                    clearWarning($("#txtLoginPassword"));
                    if (!retrieveAccount(loginEmail)) {
                        invalidField(event, $("#loginForm"), $("#txtLoginEmail"), 
                        'The email you entered was not registered. Please try again.');
                    } else {
                        userData = localStorage.getItem("current_user");
                        user = JSON.parse(userData);
            
                        // Validate if password match the login email
                        if (user["password"] != loginPassword) {
                            invalidField(event, $("#loginForm"), $("#txtLoginEmail"),
                             'The email or password you entered is incorrect. Please try again.');
                            localStorage.removeItem("current_user");
                        } else {
                            // Set the global variable isLoggedOn to true and redirect to Account Page            
                            localStorage.setItem("isLoggedOn", true);
                            $("#loginForm").submit();
                        }
                    }
                }
            }
        }
    });

    /**
     * Register Button
     */
    $('#registerForm').on('submit', function(event) {

        clearWarning($("#txtRegisterFirstName"));
        if(isBlank($('#txtRegisterFirstName').val())){
            invalidField(event, $("#registerForm"), $("#txtRegisterFirstName"), '');
        } else {
            clearWarning($("#txtRegisterFirstName"));
            if(isBlank($('#txtRegisterLastName').val())){
                invalidField(event, $("#registerForm"), $("#txtRegisterLastName"), '');
            } else {
                clearWarning($("#txtRegisterLastName"));
                if(isBlank($("#txtRegisterEmail").val())){
                    invalidField(event, $("#registerForm"), $("#txtRegisterEmail"), '');
                } else {
                    clearWarning($("#txtRegisterEmail"));
                    if (!isValidEmail($("#txtRegisterEmail").val())) {
                        invalidField(event, $("#loginForm"), $("#txtRegisterEmail"), '');
                    } else {
                        clearWarning($("#txtRegisterEmail"));
                        if (isBlank($("#txtRegisterPassword").val())) {
                            invalidField(event, $("#loginForm"), $("#txtRegisterPassword"), '');
                        } else {
                            var accounts=localStorage.getItem("accounts");
                            var accountsObj=JSON.parse(accounts);
                            accountsObj=JSON.parse(accounts);
                            accountsObj.push(
                                {
                                    "first_name": $('#txtRegisterFirstName').val(),
                                    "last_name": $('#txtRegisterLastName').val(),
                                    "email": $('#txtRegisterEmail').val(),
                                    "password": $('#txtRegisterPassword').val(),
                                    "phone":"",
                                    "billing_address": "",
                                    "shipping_address": "",
                                    "birth_date": "",
                                    "cart": []
                                }
                            );
                            accounts=JSON.stringify(accountsObj);
                            localStorage.setItem("accounts", accounts);
                            return true;
                        }
                    }
                }
            }
        }
    });
});
