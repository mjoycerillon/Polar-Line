$(function() {
    
    /* Page onload current_user data from localstorage */
    $(window).on('load', function () {
    
        const user = JSON.parse(localStorage.getItem('current_user'));
        $('#fname').val(user.first_name);
        $('#lname').val(user.last_name);
        $('#mail').val(user.email);
        $('#phone').val(user.phone);
        $('#age').val(user.birth_date);
        $('#pwd').val(user.password);
        $('#bill').val(user.billing_address);
        $('#ship').val(user.shipping_address);
    });

    /* Enable feilds, submit button in personal details */
    $('#edit1').on('click', function() {
        $('#fname').prop( "disabled", false );
        $('#lname').prop( "disabled", false );
        $('#mail').prop( "disabled", false );
        $('#age').prop( "disabled", false );
        $('#phone').prop( "disabled", false );
        $('#submit1').show();
    });

    /* Enable feild, submit button at Billing address */
    $('#edit2').on('click', function() {
    $('#bill').prop( "disabled", false );
    $('#ship').prop( "disabled", false );
    $('#submit2').show();
    });

    /* Enable field, submit button at shipping address */
    $('#edit3').on('click', function() {
    $('#ship').prop( "disabled", false );
    $('#submit3').show();
    });

    /* Edit (or) Enter data and push inputs to localstorage */
    $('#submit1').on('click', function() {
        const user = JSON.parse(localStorage.getItem('current_user'));
        user.first_name = $('#fname').val();
        user.last_name = $('#lname').val();
        user.email = $('#mail').val();
        user.phone = $('#phone').val();
        user.birth_date = $('#age').val();
        localStorage.setItem("current_user", JSON.stringify(user));

        $('#fname').prop( "disabled", true );
        $('#lname').prop( "disabled", true );
        $('#mail').prop( "disabled", true );
        $('#age').prop( "disabled", true );
        $('#phone').prop( "disabled", true );
        $('#submit1').hide();
    });


    $('#submit2').on('click', function() {
        $('#bill').prop( "disabled", true );
        $('#ship').prop( "disabled", true );

        const user1 = JSON.parse(localStorage.getItem('current_user'));
        user1.billing_address = $('#bill').val();
        localStorage.setItem("current_user", JSON.stringify(user1));

        const user2 = JSON.parse(localStorage.getItem('current_user'));
        user2.shipping_address = $('#ship').val();
        localStorage.setItem("current_user", JSON.stringify(user2));

        $('#submit2').hide();
    });
});