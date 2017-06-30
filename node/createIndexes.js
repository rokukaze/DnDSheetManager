use dnd

db.characters.createIndex({"player":1,"campaign":1,"name":1},{background:true,unique:true,name:"uniqueCharOfPlayersInCampaign"});
db.players.createIndex({"player":1},{background:true,unique:true,name:"uniquePlayerName"});
db.campaigns.createIndex({"campaign":1,"dungeonMaster":1},{background:true,unique:true,name:"uniqueDmAndCampaign"});
