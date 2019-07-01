define(["tabbedView","layoutManager","require","globalize","userSettings","emby-itemscontainer","emby-tabs","emby-button","emby-scroller"],function(TabbedView,layoutManager,require,globalize,userSettings){"use strict";function getTabs(){return[{name:globalize.translate("Suggestions")},{name:globalize.translate("Albums")},{name:globalize.translate("HeaderAlbumArtists")},{name:globalize.translate("Artists")},{name:globalize.translate("Playlists")},{name:globalize.translate("Genres")},{name:globalize.translate("Songs"),enabled:!layoutManager.tv},{name:globalize.translate("Folders")}]}function getDefaultTabIndex(folderId){switch(userSettings.get("landing-"+folderId)){case"albums":return 1;case"albumartists":return 2;case"artists":return 3;case"playlists":return 4;case"genres":return 5;case"songs":return 6;case"folders":return 7;default:return 0}}function getRequirePromise(deps){return new Promise(function(resolve,reject){require(deps,resolve)})}function getTabController(index){if(null==index)throw new Error("index cannot be null");var depends=[];switch(index){case 0:depends.push("./suggestions");break;case 1:depends.push("./albums");break;case 2:case 3:depends.push("./artists");break;case 4:depends.push("./playlists");break;case 5:depends.push("./genres");break;case 6:depends.push("./songs");break;case 7:depends.push("foldersTab")}var instance=this;return getRequirePromise(depends).then(function(controllerFactory){var controller=instance.tabControllers[index];if(!controller){var tabContent=instance.view.querySelector(".tabContent[data-index='"+index+"']"),mode=2===index?"albumartists":null,tabParams=Object.assign({},instance.params);tabParams.mode=mode,controller=new controllerFactory(tabContent,tabParams),instance.tabControllers[index]=controller}return controller})}function MusicView(view,params){TabbedView.call(this,view,params)}return Object.assign(MusicView.prototype,TabbedView.prototype),MusicView.prototype.getTabs=getTabs,MusicView.prototype.getDefaultTabIndex=getDefaultTabIndex,MusicView.prototype.getTabController=getTabController,MusicView});