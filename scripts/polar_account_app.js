/* Creating DOM Variables */
const fnameDOM = document.getElementById('fname');
const lnameDOM = document.getElementById('lname');
const mailDOM = document.getElementById('mail');
const phoneDOM = document.getElementById('phone');
const ageDOM = document.getElementById('age');
const pwdDOM = document.getElementById('pwd');
const billDOM = document.getElementById('bill');
const shipDOM = document.getElementById('ship');



/* Page onload previous data from localstorage */
window.addEventListener('load', () => {
	const fn = JSON.parse(localStorage.getItem('Obj_firstNAME'));
	fnameDOM.value = fn.fname;

    const ln = JSON.parse(localStorage.getItem('Obj_lastNAME'));
	lnameDOM.value = ln.lname;

    const f2 = JSON.parse(localStorage.getItem('Obj_MAIL'));
	mailDOM.value = f2.mail;

    const f3 = JSON.parse(localStorage.getItem('Obj_PHONE'));
	phoneDOM.value = f3.phone;

    const f4 = JSON.parse(localStorage.getItem('Obj_AGE'));
	ageDOM.value = f4.age;

    const f5 = JSON.parse(localStorage.getItem('Obj_PASSWORD'));
	pwdDOM.value = f5.pwd;

    const f6 = JSON.parse(localStorage.getItem('Obj_BILLING'));
	billDOM.value = f6.bill;

    const f7 = JSON.parse(localStorage.getItem('Obj_SHIPPING'));
	shipDOM.value = f7.ship;

    
    
});

/* Enable feilds, submit button in personal details */
edit1.addEventListener('click', (e) => {
	fnameDOM.disabled = false;
    lnameDOM.disabled = false;
    mailDOM.disabled = false;
    phoneDOM.disabled = false;
    ageDOM.disabled = false;
    pwdDOM.disabled = false;
    submit1.style.display = 'inline-block';
});

/* Enable feild, submit button at Billing address */
edit2.addEventListener('click',(e)=>{
    billDOM.disabled = false;
    submit2.style.display = 'inline-block';

});

/* Enable feild, submit button at shipping address */
edit3.addEventListener('click',(e)=>{
    shipDOM.disabled = false;
    submit3.style.display = 'inline-block';

});

/* Edit (or) Enter data and push inputs to localstorage */
submit1.addEventListener('click', (e) => {
	const first_name = JSON.stringify({ fname: fnameDOM.value });
	localStorage.setItem('Obj_firstNAME', first_name);

    const last_name = JSON.stringify({ lname: lnameDOM.value });
	localStorage.setItem('Obj_lastNAME', last_name);

    const user_mail = JSON.stringify({ mail: mailDOM.value });
	localStorage.setItem('Obj_MAIL', user_mail);

    const user_phone = JSON.stringify({ phone: phoneDOM.value });
	localStorage.setItem('Obj_PHONE', user_phone);

    const user_age = JSON.stringify({ age: ageDOM.value });
	localStorage.setItem('Obj_AGE', user_age);

    const user_password = JSON.stringify({ pwd: pwdDOM.value });
	localStorage.setItem('Obj_PASSWORD', user_password);

    

    fnameDOM.disabled = true;
    lnameDOM.disabled = true;
    mailDOM.disabled = true;
    phoneDOM.disabled = true;
    ageDOM.disabled = true;
    pwdDOM.disabled = true;
    
     
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
function myFunction(){
    var x = document.getElementById("pwd");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}




