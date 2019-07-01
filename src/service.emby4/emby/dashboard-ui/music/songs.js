define(["itemsTab","cardBuilder","layoutManager","listView","globalize","emby-itemscontainer"],function(ItemsTab,cardBuilder,layoutManager,listView,globalize){"use strict";function SongsTab(view,params){ItemsTab.call(this,view,params)}return Object.assign(SongsTab.prototype,ItemsTab.prototype),SongsTab.prototype.getCardOptions=function(items,settings){var options=ItemsTab.prototype.getCardOptions.apply(this,arguments);return options.showParentTitle=settings.showTitle,options.hoverPlayButton=!1,options.action="play",options},SongsTab.prototype.getContext=function(){return"music"},SongsTab.prototype.getSettingsKey=function(){return ItemsTab.prototype.getSettingsKey.call(this)+"-songs"},SongsTab.prototype.getVisibleViewSettings=function(){var settings=["showTitle","imageType"];return this.apiClient.isMinServerVersion("3.6.0.43")&&settings.push("groupItemsIntoCollections"),settings},SongsTab.prototype.getVisibleFilters=function(){return["Genres","Studios","Tags","OfficialRatings","Containers","Years","IsUnplayed","IsPlayed","IsFavorite"]},SongsTab.prototype.getItemTypes=function(){return["Audio"]},SongsTab.prototype.getCriticRatingSortOption=function(){return null},SongsTab.prototype.getSortMenuOptions=function(){var sortBy=ItemsTab.prototype.getSortMenuOptions.call(this);return sortBy.push({name:globalize.translate("Album"),value:"Album,ParentIndexNumber,IndexNumber"}),sortBy.push({name:globalize.translate("AlbumArtist"),value:"AlbumArtist,Album,ParentIndexNumber,IndexNumber"}),this.sortOptionsByName(sortBy),sortBy},SongsTab});