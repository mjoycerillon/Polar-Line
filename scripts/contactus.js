
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
       $('#usermail').hide();    
       let usermailError = true;
       $('#email').keyup(function () {
          validateEmail();
         });

         function validateEmail() {
            let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
            let s = $('#email').val();
            if(s.length == ''){
                usermailError = false;
                $('#usermail').show(); 
                return false;
                
            }
         else if(!(regex.test(s))){
                usermailError = false;
                $('#usermail').show(); 
                return false;
                  
            }
            else{
                $('#usermail').hide(); 
                // usermailError = false;
            }
         }
        $('#phonemsg').hide();    
        let phoneError = true;
        $('#txtContactNumber').keyup(function () {
            validateTelephone();
        });
          
        function validateTelephone() {
          var regexPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
          let phoneValue = $('#txtContactNumber').val();
          if (phoneValue.length == '') {
             $('#phonemsg').show();
              phoneError = false;
              return false;
          } 
        else if(!(regexPattern.test(phoneValue))){
             $('#phonemsg').show();
             phoneError = false;
              return false;
          }
          else {
              $('#phonemsg').hide(); 
          }
        } 
        
        $('#textMsg').hide();    
        let textError = true;
        $('#txtContactMessage').keyup(function () {
            validateTextmessage();
        });

        function validateTextmessage() {
            let textValue = $('#txtContactMessage').val();
            if (textValue.length == '') {
               $('#textMsg').show();
                textError = false;
                return false;
            } 
            else {
                $('#textMsg').hide(); 
            }
          }
    
          
    // Submitt button
        $('#btnContactSubmit').click(function () {
            validateUsername();
            validateTelephone();
            validateTextmessage();
            validateEmail();
            if ((usernameError == true) && 
                (usermailError == true) && 
                (phoneError == true) && 
                (textError == true)) {
                return true;
            } else {
                return false;
            }
        });
    });