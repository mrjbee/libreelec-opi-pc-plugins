define(["itemsTab","cardBuilder","layoutManager","emby-itemscontainer"],function(ItemsTab,cardBuilder,layoutManager){"use strict";function PlaylistsTab(view,params){ItemsTab.call(this,view,params)}return Object.assign(PlaylistsTab.prototype,ItemsTab.prototype),PlaylistsTab.prototype.getItemTypes=function(){return["Playlist"]},PlaylistsTab.prototype.getContext=function(){return"music"},PlaylistsTab.prototype.getVisibleViewSettings=function(){return[]},PlaylistsTab});