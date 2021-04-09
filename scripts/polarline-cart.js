$(function() {
    $('.cart-minus').on('click', function() {
        document.getElementById('txtCartQuantity').stepDown(1);
    }); 

    $('.cart-add').on('click', function() {
        document.getElementById('txtCartQuantity').stepUp(1);
    }); 
});