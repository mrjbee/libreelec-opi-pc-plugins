define(["itemsTab","cardBuilder","userSettings","globalize","listView","emby-itemscontainer"],function(ItemsTab,cardBuilder,userSettings,globalize,listView){"use strict";function EpisodesTab(view,params){ItemsTab.call(this,view,params)}return Object.assign(EpisodesTab.prototype,ItemsTab.prototype),EpisodesTab.prototype.getCardOptions=function(items,settings){var options=ItemsTab.prototype.getCardOptions.apply(this,arguments);return options.showParentTitle=settings.showTitle,options},EpisodesTab.prototype.getBaseQuery=function(){var query=ItemsTab.prototype.getBaseQuery.call(this);return query.ExcludeLocationTypes="Virtual",query},EpisodesTab.prototype.getSettingsKey=function(){return ItemsTab.prototype.getSettingsKey.call(this)+"-episodes"},EpisodesTab.prototype.getVisibleViewSettings=function(){return["showTitle"]},EpisodesTab.prototype.getVisibleFilters=function(){return["Genres","Studios","Tags","OfficialRatings","Containers","Years","AudioCodecs","VideoCodecs","SubtitleCodecs","IsUnplayed","IsPlayed","IsFavorite","IsResumable","HasTrailer","HasSpecialFeature","HasThemeSong","HasThemeVideo","VideoType","HasSubtitles"]},EpisodesTab.prototype.getItemTypes=function(){return["Episode"]},EpisodesTab.prototype.getCriticRatingSortOption=function(){return null},EpisodesTab.prototype.getNameSortOption=function(){return{name:globalize.translate("Name"),value:"SeriesSortName,SortName"}},EpisodesTab.prototype.getDefaultSortBy=function(){return"SeriesSortName,SortName"},EpisodesTab});