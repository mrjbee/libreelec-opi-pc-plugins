define(["jQuery","loading","globalize","fnchecked","emby-checkbox"],function($,loading,globalize){"use strict";function loadMediaFolders(page,mediaFolders){var html="";html+='<h3 class="checkboxListLabel">'+globalize.translate("HeaderLibraries")+"</h3>",html+='<div class="checkboxList paperList" style="padding:.5em 1em;">';for(var i=0,length=mediaFolders.length;i<length;i++){var folder=mediaFolders[i];html+='<label><input type="checkbox" is="emby-checkbox" class="chkFolder" data-id="'+folder.Id+'" checked="checked"/><span>'+folder.Name+"</span></label>"}html+="</div>",$(".folderAccess",page).html(html).trigger("create"),$("#chkEnableAllFolders",page).checked(!0).trigger("change")}function loadChannels(page,channels){var html="";html+='<h3 class="checkboxListLabel">'+globalize.translate("HeaderChannels")+"</h3>",html+='<div class="checkboxList paperList" style="padding:.5em 1em;">';for(var i=0,length=channels.length;i<length;i++){var folder=channels[i];html+='<label><input type="checkbox" is="emby-checkbox" class="chkChannel" data-id="'+folder.Id+'" checked="checked"/><span>'+folder.Name+"</span></label>"}html+="</div>",$(".channelAccess",page).show().html(html).trigger("create"),channels.length?$(".channelAccessContainer",page).show():$(".channelAccessContainer",page).hide(),$("#chkEnableAllChannels",page).checked(!0).trigger("change")}function loadUser(page){$("#txtUserName",page).val(""),loading.show();var promise4=ApiClient.getJSON(ApiClient.getUrl("Library/MediaFolders",{IsHidden:!1})),promise5=ApiClient.getJSON(ApiClient.getUrl("Channels"));Promise.all([promise4,promise5]).then(function(responses){loadMediaFolders(page,responses[0].Items),loadChannels(page,responses[1].Items),loading.hide()})}function onCreateUserComplete(page,user){var enteredConnectUsername=$("#txtConnectUserName",page).val();enteredConnectUsername?require(["connectHelper"],function(connectHelper){connectHelper.updateUserLink(ApiClient,user,enteredConnectUsername).then(function(){Dashboard.navigate("useredit.html?userId="+user.Id)})}):Dashboard.navigate("useredit.html?userId="+user.Id)}function saveUser(page){var name=$("#txtUserName",page).val();ApiClient.createUser(name).then(function(user){user.Policy.IsAdministrator=$("#chkIsAdmin",page).checked(),user.Policy.EnableSubtitleDownloading=user.Policy.IsAdministrator,user.Policy.EnableSubtitleManagement=user.Policy.IsAdministrator,user.Policy.EnableContentDeletion=user.Policy.IsAdministrator,user.Policy.EnableAllFolders=$("#chkEnableAllFolders",page).checked(),user.Policy.EnabledFolders=user.Policy.EnableAllFolders?[]:$(".chkFolder",page).get().filter(function(i){return i.checked}).map(function(i){return i.getAttribute("data-id")}),user.Policy.EnableAllChannels=$("#chkEnableAllChannels",page).checked(),user.Policy.EnabledChannels=user.Policy.EnableAllChannels?[]:$(".chkChannel",page).get().filter(function(i){return i.checked}).map(function(i){return i.getAttribute("data-id")}),ApiClient.updateUserPolicy(user.Id,user.Policy).then(function(){onCreateUserComplete(page,user)})},function(response){400===response.status?Dashboard.alert({message:page.querySelector(".labelNewUserNameHelp").innerHTML}):require(["toast"],function(toast){toast(globalize.translate("DefaultErrorMessage"))}),loading.hide()})}function onSubmit(){var page=$(this).parents(".page")[0];return loading.show(),saveUser(page),!1}function loadData(page){loadUser(page)}$(document).on("pageinit","#newUserPage",function(){var page=this;$("#chkEnableAllChannels",page).on("change",function(){this.checked?$(".channelAccessListContainer",page).hide():$(".channelAccessListContainer",page).show()}),$("#chkEnableAllFolders",page).on("change",function(){this.checked?$(".folderAccessListContainer",page).hide():$(".folderAccessListContainer",page).show()}),$(".newUserProfileForm").off("submit",onSubmit).on("submit",onSubmit)}).on("pageshow","#newUserPage",function(){loadData(this)})});