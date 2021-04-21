$(function() {
    
    /* Page onload current_user data from localstorage */
    $(window).on('load', function () {
    
        const user = JSON.parse(localStorage.getItem('current_user'));
        $('#fname').val(user.first_name);
        $('#lname').val(user.last_name);
        $('#mail').val(user.email);
        $('#phone').val(user.phone);
        //const dob = user.birth_date.split('/'); //date needs to be formatted "09/22/1994" mm-dd-yyyy.. yyyy-mm-dd
        //const myDate = `${dob[2]}-${dob[0]}-${dob[1]}`;
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
        $('#pwd').prop( "disabled", false );
        $('#submit1').show();
    });

    /* Enable feild, submit button at Billing address */
    $('#edit2').on('click', function() {
    $('#bill').prop( "disabled", false );
    $('#phone').prop( "disabled", false );
    $('#submit2').show();
    });

    /* Enable feild, submit button at shipping address */
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
        user.birth_date = $('#age').val();
        user.password = $('#pwd').val();
        localStorage.setItem("current_user", JSON.stringify(user));

        $('#fname').prop( "disabled", true );
        $('#lname').prop( "disabled", true );
        $('#mail').prop( "disabled", true );
        $('#age').prop( "disabled", true );
        $('#pwd').prop( "disabled", true );
        $('#submit1').hide();
    });


    $('#submit2').on('click', function() {
        $('#bill').prop( "disabled", true );
        const user = JSON.parse(localStorage.getItem('current_user'));
        user.billing_address = $('#bill').val();
        localStorage.setItem("current_user", JSON.stringify(user));
        $('#phone').prop( "disabled", true );
        $('#submit2').hide();
    });

    $('#submit3').on('click', function() {
        $('#ship').prop( "disabled", true );
        const user = JSON.parse(localStorage.getItem('current_user'));
        user.shipping_address = $('#ship').val();
        localStorage.setItem("current_user", JSON.stringify(user));
        $('#submit3').hide();
    });

    /* Password visibility function */
    $('#check').on('click', function() {
        if ($('#pwd').attr('type') === 'password') {
            $('#pwd').attr('type', 'text'); 
        } else {
            $('#pwd').attr('type', 'password'); 
        }
    });

});