define(["cardBuilder","imageLoader","loading","connectionManager","apphost","layoutManager","scrollHelper","focusManager","emby-itemscontainer"],function(cardBuilder,imageLoader,loading,connectionManager,appHost,layoutManager,scrollHelper,focusManager){"use strict";function TvFavoritesTab(view,params){this.view=view,this.params=params,this.apiClient=connectionManager.getApiClient(params.serverId);var seriesItemsContainer=view.querySelector(".seriesItems");seriesItemsContainer.getItemsHtml=getSeriesHtml,seriesItemsContainer.fetchData=fetchSeriesData.bind(this),seriesItemsContainer.parentContainer=view.querySelector(".favoriteSeriesSection"),this.seriesItemsContainer=seriesItemsContainer;var episodeItemsContainer=view.querySelector(".episodeItems");episodeItemsContainer.getItemsHtml=getEpisodesHtml,episodeItemsContainer.fetchData=fetchEpisodeData.bind(this),episodeItemsContainer.parentContainer=view.querySelector(".favoriteEpisodesSection"),this.episodeItemsContainer=episodeItemsContainer,params.parentId&&(this.seriesItemsContainer.setAttribute("data-parentid",params.parentId),this.episodeItemsContainer.setAttribute("data-parentid",params.parentId))}function fetchSeriesData(items){var apiClient=this.apiClient,parentId=this.params.parentId;return apiClient.getItems(apiClient.getCurrentUserId(),{SortBy:"SortName",SortOrder:"Ascending",IncludeItemTypes:"Series",Recursive:!0,Fields:"PrimaryImageAspectRatio,BasicSyncInfo",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Thumb",StartIndex:0,parentId:parentId,IsFavorite:!0})}function getSeriesHtml(items){return cardBuilder.getCardsHtml({items:items,shape:"auto",centerText:!0,overlayMoreButton:!layoutManager.tv,showTitle:!0})}function fetchEpisodeData(items){var apiClient=this.apiClient,parentId=this.params.parentId;return apiClient.getItems(apiClient.getCurrentUserId(),{SortBy:"SeriesName,SortName",SortOrder:"Ascending",IncludeItemTypes:"Episode",Recursive:!0,Fields:"PrimaryImageAspectRatio,BasicSyncInfo",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Thumb",StartIndex:0,parentId:parentId,IsFavorite:!0})}function getEpisodesHtml(items){return cardBuilder.getCardsHtml({items:items,shape:"auto",showTitle:!0,showParentTitle:!0,overlayText:!1,centerText:!0,overlayMoreButton:!layoutManager.tv})}return TvFavoritesTab.prototype.onResume=function(options){this.apiClient;if(options.refresh){var promises=[];this.params.parentId;promises.push(this.seriesItemsContainer.refreshItems()),promises.push(this.episodeItemsContainer.refreshItems());var view=this.view;Promise.all(promises).then(function(){options.autoFocus&&focusManager.autoFocus(view)})}},TvFavoritesTab.prototype.onPause=function(){},TvFavoritesTab.prototype.destroy=function(){this.view=null,this.params=null,this.apiClient=null,this.seriesItemsContainer=null,this.episodeItemsContainer=null},TvFavoritesTab});