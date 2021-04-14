/* Creating DOM Variables */
const usernameDOM = document.getElementById('username');
const mailDOM = document.getElementById('mail');
const phoneDOM = document.getElementById('phone');
const ageDOM = document.getElementById('age');
const passwordDOM = document.getElementById('password');
const billingDOM = document.getElementById('billing');
const shippingDOM = document.getElementById('shipping');



/* Page onload previous data from localstorage */
window.addEventListener('load', () => {
	const f1 = JSON.parse(localStorage.getItem('DATA_NAME'));
	usernameDOM.value = f1.username;
    const f2 = JSON.parse(localStorage.getItem('DATA_MAIL'));
	mailDOM.value = f2.mail;
    const f3 = JSON.parse(localStorage.getItem('DATA_PHONE'));
	phoneDOM.value = f3.phone;
    const f4 = JSON.parse(localStorage.getItem('DATA_AGE'));
	ageDOM.value = f4.age;
    const f5 = JSON.parse(localStorage.getItem('DATA_PASSWORD'));
	passwordDOM.value = f5.password;
    const f6 = JSON.parse(localStorage.getItem('DATA_BILLING'));
	billingDOM.value = f6.billing;
    const f7 = JSON.parse(localStorage.getItem('DATA_SHIPPING'));
	shippingDOM.value = f7.shipping;
    
});

/* Enable feilds, submit button in personal details */
edit1.addEventListener('click', (e) => {
	usernameDOM.disabled = false;
    mailDOM.disabled = false;
    phoneDOM.disabled = false;
    ageDOM.disabled = false;
    passwordDOM.disabled = false;
    submit1.style.display = 'inline-block';
});

/* Enable feild, submit button at Billing address */
edit2.addEventListener('click',(e)=>{
    billingDOM.disabled = false;
    submit2.style.display = 'inline-block';

});

/* Enable feild, submit button at shipping address */
edit3.addEventListener('click',(e)=>{
    shippingDOM.disabled = false;
    submit3.style.display = 'inline-block';

});

/* Edit/Enter data and push inputs to localstorage*/
submit1.addEventListener('click', (e) => {
	const user_name = JSON.stringify({ username: usernameDOM.value });
	localStorage.setItem('DATA_NAME', user_name);
    const user_mail = JSON.stringify({ mail: mailDOM.value });
	localStorage.setItem('DATA_MAIL', user_mail);
    const user_phone = JSON.stringify({ phone: phoneDOM.value });
	localStorage.setItem('DATA_PHONE', user_phone);
    const user_age = JSON.stringify({ age: ageDOM.value });
	localStorage.setItem('DATA_AGE', user_age);
    const user_password = JSON.stringify({ password: passwordDOM.value });
	localStorage.setItem('DATA_PASSWORD', user_password);

    usernameDOM.disabled = true;
    mailDOM.disabled = true;
    phoneDOM.disabled = true;
    ageDOM.disabled = true;
    passwordDOM.disabled = true;
    
     
});

submit2.addEventListener('click', (e) => {
	const billing_name = JSON.stringify({ billing: billingDOM.value });
	localStorage.setItem('DATA_BILLING', billing_name);
    billingDOM.disabled = true;
});

submit3.addEventListener('click', (e) => {
	const shipping_name = JSON.stringify({ shipping: shippingDOM.value });
	localStorage.setItem('DATA_SHIPPING', shipping_name);
    shippingDOM.disabled = true;
});


/* Password visibility function */
function myFunction(){
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}




