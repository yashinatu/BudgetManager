var contextMenuItem = {
    "id" : "spendMoney",
    "title" : "SpendMoney",
    "contexts" : ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItenId == "spendMoney" && clickData.selectionText){
        if (isFinite(clickData.selectionText)){
            chrome.storage.sync.get(['total', 'limit'], function(budget){
                var newTotal = 0;
                if (budget.total){
                    newTotal +=parseInt(budget.total);
                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total' : newTotal} , function(){
                    if (newTotal >= budget.limit){
                        var notifOptions = {
                            type :'basic',
                            iconurl : 'icon48.png',
                            title : 'Limit Reached',
                            message : "Uh Oh! Looks like you have reached your spending limit!"
                            };
                        chrome.notifications.create('limitNotif', notifOptions);
                    }
                });
            });
        }
    }
});

chrome.storage.onChanged.addListener(function(changes, storageName){
    chrome.browserAction.setBadgeText({'text' : changes.total.newValue.tostring()});
})