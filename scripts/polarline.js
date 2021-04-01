$(function() {
    $('#homeShopLink').hover(function() {
        $('#homeShopLink').children('div').stop(true, false, true).slideToggle(400)
    });
});
