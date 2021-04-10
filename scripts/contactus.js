
// Document is ready
$(document).ready(function () { 
     
    // Validate Username
        $('#username').hide();    
        let usernameError = true;
        $('#user').keyup(function () {
            validateUsername();
        });
          
        function validateUsername() {
          let usernameValue = $('#user').val();
          if (usernameValue.length == '') {
          $('#username').show();
              usernameError = false;
              return false;
          } 
          else {
              $('#username').hide(); 
          }
        }
      
       // Validate Email
        const email = 
            document.getElementById('email');
        email.addEventListener('blur', ()=>{
           let regex =
    /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
           let s = email.value;
           if(regex.test(s)){
              email.classList.remove(
                    'is-invalid');
              emailError = true;
            }
            else{
                email.classList.add(
                      'is-invalid');
                emailError = false;
            }
        })
          

          
    // Submitt button
        $('#submitbtn').click(function () {
            validateUsername();
            validatePassword();
            validateConfirmPasswrd();
            validateEmail();
            if ((usernameError == true) && 
                (passwordError == true) && 
                (confirmPasswordError == true) && 
                (emailError == true)) {
                return true;
            } else {
                return false;
            }
        });
    });