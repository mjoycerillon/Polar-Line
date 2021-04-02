$(function() {
    // Global variables
    var isLoggedOn = localStorage.getItem("isLoggedOn");
    var accounts = localStorage.getItem("accounts");
    var account = "";

    // Call the Window On Load Function
    $(window).on('load', function () {
        // Validate if dummy data exists on the local storage
        if (accounts == null) {
            var accounts = 
            [{
                "first_name": "Rachel Karen",
                "last_name": "Green",
                "email": "rachelgreen@gmail.com",
                "password": "polar",
                "billing_address": "1457 London Rd, Sarnia, Ontario Canada, N7S 6K4",
                "shipping_address": "1457 London Rd, Sarnia, Ontario Canada, N7S 6K4",
                "birth_date": "09/22/1994",
                "cart": []

            }];
            var accountsJSON = JSON.stringify(accounts);
            localStorage.setItem("accounts", accountsJSON);
        }
    });

    /**
     * Navigation Links
     */
    // Upon clicking the account icon, if the user already logged on, Account Page should be displayed
    $('#navAccount').click(function() {
        if (isLoggedOn == "true") {
            $(this).attr( "href", "account.html");
        }
    });

    // Upon hover on Shop, a sub-menu should be displayed on the screen.
    $('#navShop').hover(function() {
        $(this).children('div').stop(true, false, true).slideToggle(400)
    });


    /**
     * Login and Register
     */
    // Upon login, save the data of the user to local storage
    $('#btnLoginSubmit').click(function() {
        // Get value of Login Email and Password
        var loginEmail = $('#txtLoginEmail').val();
        var loginPassword = $('#txtLoginPassword').val();

        // Retrieve the data from the local storage and parse it
        var loginData = localStorage.getItem("accounts");
        var objectData = JSON.parse(loginData);

        // Find the account and save it into global variable account
        for (var account in objectData) {
            var tempAccount = objectData[account]
            if (tempAccount["email"] == loginEmail) {
                 account = tempAccount;
            }
        }
        // Validate if the email match on the current data
        if (account == "") {
            alert("Incorrect email or password.");
            console.log("Incorrect email or password.")
        } else {
            // Validate if password match the login email
            if (account["password"] != loginPassword) {
                alert("Incorrect email or password.");
                console.log("Incorrect email or password.")
            } else {
                // Set the global variable isLoggedOn to true and redirect to Account Page
                localStorage.setItem("isLoggedOn", true);
                window.open("account.html");
            }
        }
    });
});
