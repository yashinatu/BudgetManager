$(function(){

    chrome.storage.sync.get('limit', function(budget){
        $('#limit').val(budget.limit);
    })

    $('#saveLimit').click(function(){
        var limit = $('#limit').val();
        if(limit){
            chrome.storage.sync.set({'limit' : limit} , function(){
                close();
            });
        }
    });

    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total' : 0}, function(){
            var notifOptions = {
                type :'basic',
                iconurl : 'icon48.png',
                title : 'Total Reset',
                message : "Uh OhTotal has been reset!"
                };
        } );
    });
})