use dnd

db.characters.createIndex({"player":1,"campaign":1,"name":1},{background:true,unique:true,name:"uniqueCharOfPlayersInCampaign"});
db.players.createIndex({"name":1},{background:true,unique:true,name:"uniquePlayerName"});
db.campaigns.createIndex({"name":1,"dungeonMaster":1},{background:true,unique:true,name:"uniqueDmAndCampaign"});
