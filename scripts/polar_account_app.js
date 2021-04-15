$(function() {

    /* Page onload previous data from localstorage */
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
edit1.addEventListener('click', (e) => {
	$('#fname').prop( "disabled", false );
    $('#lname').prop( "disabled", false );
    $('#mail').prop( "disabled", false );
    $('#phone').prop( "disabled", false );
    $('#age').prop( "disabled", false );
    $('#pwd').prop( "disabled", false );

    submit1.style.display = 'inline-block';
});

/* Enable feild, submit button at Billing address */
$('#edit2').on('click', function() {
//edit2.addEventListener('click',(e)=>{
    // billDOM.disabled = false;
    $('#submit2').show();

});

/* Enable feild, submit button at shipping address */
edit3.addEventListener('click',(e)=>{
    shipDOM.disabled = false;
    submit3.style.display = 'inline-block';

});

/* Edit (or) Enter data and push inputs to localstorage */
$('#submit1').on('click', function() {
    
    // var current_user = 
    // {
    //     "first_name": $('#fname').val(),
    //     "last_name": "Green",
    //     "email": "rachelgreen@gmail.com",
    //     "password": "polar",
    //     "phone": "",
    //     "billing_address": "1457 London Rd, Sarnia, Ontario Canada, N7S 6K4",
    //     "shipping_address": "1457 London Rd, Sarnia, Ontario Canada, N7S 6K4",
    //     "birth_date": "09/22/1994",
    //     "cart": []
    // };
    // var accountsJSON = JSON.stringify(accounts);
    // localStorage.setItem("accounts", accountsJSON);

     
});

submit2.addEventListener('click', (e) => {
	const billing_name = JSON.stringify({ bill: billDOM.value });
	localStorage.setItem('Obj_BILLING', billing_name);
    billDOM.disabled = true;
});

submit3.addEventListener('click', (e) => {
	const shipping_name = JSON.stringify({ ship: shipDOM.value });
	localStorage.setItem('Obj_SHIPPING', shipping_name);
    shipDOM.disabled = true;
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