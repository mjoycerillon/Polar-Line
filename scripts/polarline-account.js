$(function() {
    
    /* Page onload current_user data from localstorage */
    $(window).on('load', function () {
    
        const user = JSON.parse(localStorage.getItem('current_user'));
        if (user != null) {
            $('#fname').val(user.first_name);
            $('#lname').val(user.last_name);
            $('#mail').val(user.email);
            $('#phone').val(user.phone);
            $('#age').val(user.birth_date);
            $('#pwd').val(user.password);
            $('#bill').val(user.billing_address);
            $('#ship').val(user.shipping_address);
        }
    });

    function updateAccounts(user) {
        // Retrieve the data from the local storage and parse it
        var objectData = JSON.parse(localStorage.getItem("accounts"));

        // Find the account and save it into global variable account
        for (i = 0; i < objectData.length; i++) {
            var tempAccount = objectData[i]
            if (tempAccount["email"] == user.email) {
                objectData.splice(i, 1);
                break;   
            }
        }
        objectData.push(user);
        localStorage.setItem("accounts",JSON.stringify(objectData));
    }

    /* Enable feilds, submit button in personal details */
    $('#edit1').on('click', function() {
        $('#fname').prop( "disabled", false );
        $('#lname').prop( "disabled", false );
        $('#mail').prop( "disabled", true );
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


    function isBlank($field) {
        return $field == "";
    }

    function clearWarning($textField) {
        $textField.removeClass('is-invalid');
        $textField.next().css('display', 'none');
        $('.alert').remove();
    }

    function invalidField(event, $textField) {

        $textField.addClass('is-invalid').css('padding-right', '0.9em');
        $textField.next().css('display', 'block');
        $textField.focus();
        event.preventDefault();
    }


    /* Edit (or) Enter data and push inputs to localstorage */
    $('#accountDetailsForm').on('submit', function(event) {
        const user = JSON.parse(localStorage.getItem('current_user'));

        clearWarning($("#fname"));
        if (isBlank($('#fname').val())) {
            invalidField(event, $("#fname"));
        } else {
            clearWarning($("#lname"));
            if (isBlank($('#lname').val())) {
                invalidField(event, $("#lname"));
            } else {
                clearWarning($("#phone"));
                if (isBlank($('#phone').val()) || !validatePhone($('#phone').val())) {
                    invalidField(event, $("#phone"));
                } else {
                    user.first_name = $('#fname').val();
                    user.last_name = $('#lname').val();
                    user.email = $('#mail').val();
                    user.phone = $('#phone').val();
                    user.birth_date = $('#age').val();
                    
                    localStorage.setItem("current_user", JSON.stringify(user));
                    updateAccounts(user);

                    $('#fname').prop( "disabled", true );
                    $('#lname').prop( "disabled", true );
                    $('#mail').prop( "disabled", true );
                    $('#age').prop( "disabled", true );
                    $('#phone').prop( "disabled", true );
                    $('#submit1').hide();
                }
            }
        }
    });


    $('#submit2').on('click', function() {
        $('#bill').prop( "disabled", true );
        $('#ship').prop( "disabled", true );

        const user1 = JSON.parse(localStorage.getItem('current_user'));
        user1.billing_address = $('#bill').val();
        localStorage.setItem("current_user", JSON.stringify(user1));
        updateAccounts(user1);

        const user2 = JSON.parse(localStorage.getItem('current_user'));
        user2.shipping_address = $('#ship').val();
        localStorage.setItem("current_user", JSON.stringify(user2));
        updateAccounts(user2);

        $('#submit2').hide();
    });
});

function validatePhone(ph)
{
    var regex = /^\d{10}$/;
    return regex.test(ph) || ph=='';
}