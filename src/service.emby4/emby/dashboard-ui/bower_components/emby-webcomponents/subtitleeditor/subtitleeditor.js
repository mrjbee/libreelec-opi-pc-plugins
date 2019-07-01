define(["dialogHelper","require","layoutManager","globalize","userSettings","connectionManager","loading","focusManager","dom","apphost","emby-select","listViewStyle","paper-icon-button-light","css!./../formdialog","material-icons","css!./subtitleeditor","emby-button","flexStyles"],function(dialogHelper,require,layoutManager,globalize,userSettings,connectionManager,loading,focusManager,dom,appHost){"use strict";function downloadRemoteSubtitles(context,id){var url="Items/"+currentItem.Id+"/RemoteSearch/Subtitles/"+id,apiClient=connectionManager.getApiClient(currentItem.ServerId);apiClient.ajax({type:"POST",url:apiClient.getUrl(url)}).then(function(){hasChanges=!0,require(["toast"],function(toast){toast(globalize.translate("MessageDownloadQueued"))}),focusManager.autoFocus(context)})}function deleteLocalSubtitle(context,index){var msg=globalize.translate("MessageAreYouSureDeleteSubtitles");require(["confirm"],function(confirm){confirm({title:globalize.translate("ConfirmDeletion"),text:msg,confirmText:globalize.translate("Delete"),primary:"cancel"}).then(function(){loading.show();var itemId=currentItem.Id,url="Videos/"+itemId+"/Subtitles/"+index,apiClient=connectionManager.getApiClient(currentItem.ServerId);apiClient.ajax({type:"DELETE",url:apiClient.getUrl(url)}).then(function(){hasChanges=!0,reload(context,apiClient,itemId)})})})}function fillSubtitleList(context,item,user){var streams=item.MediaStreams||[],subs=streams.filter(function(s){return"Subtitle"===s.Type}),html="";subs.length&&(html+="<h2>"+globalize.translate("MySubtitles")+"</h2>",html+="<div>",html+=subs.map(function(s){var itemHtml="",tagName=layoutManager.tv?"button":"div",className=layoutManager.tv&&s.Path?"listItem listItem-border btnDelete":"listItem listItem-border";return layoutManager.tv&&(className+=" listItem-focusscale listItem-button"),itemHtml+="<"+tagName+' class="'+className+'" data-index="'+s.Index+'">',itemHtml+='<i class="listItemIcon md-icon listItemIcon-transparent">&#xE01c;</i>',itemHtml+='<div class="listItemBody two-line">',itemHtml+='<h3 class="listItemBodyText">',itemHtml+=s.DisplayTitle||"",itemHtml+="</h3>",itemHtml+='<div class="listItemBodyText secondary">',itemHtml+=(s.Codec||"").toUpperCase(),itemHtml+="</div>",s.Path&&(itemHtml+='<div class="secondary listItemBodyText">'+s.Path+"</div>"),itemHtml+="</a>",itemHtml+="</div>",(user.Policy.EnableSubtitleManagement||null==user.Policy.EnableSubtitleManagement&&user.Policy.IsAdministrator)&&(layoutManager.tv||s.Path&&(itemHtml+='<button is="paper-icon-button-light" data-index="'+s.Index+'" title="'+globalize.translate("Delete")+'" class="btnDelete listItemButton"><i class="md-icon">&#xE872;</i></button>')),itemHtml+="</"+tagName+">"}).join(""),html+="</div>");var elem=context.querySelector(".subtitleList");subs.length?elem.classList.remove("hide"):elem.classList.add("hide"),elem.innerHTML=html}function fillLanguages(context,apiClient,languages){var selectLanguage=context.querySelector("#selectLanguage");selectLanguage.innerHTML=languages.map(function(l){return'<option value="'+l.ThreeLetterISOLanguageName+'">'+l.DisplayName+"</option>"});var lastLanguage=userSettings.get("subtitleeditor-language");lastLanguage?selectLanguage.value=lastLanguage:apiClient.getCurrentUser().then(function(user){var lang=user.Configuration.SubtitleLanguagePreference;lang&&(selectLanguage.value=lang)})}function renderSearchResults(context,results){var lastProvider="",html="";if(!results.length)return context.querySelector(".noSearchResults").classList.remove("hide"),context.querySelector(".subtitleResults").innerHTML="",void loading.hide();context.querySelector(".noSearchResults").classList.add("hide");for(var i=0,length=results.length;i<length;i++){var result=results[i],provider=result.ProviderName;provider!==lastProvider&&(i>0&&(html+="</div>"),html+="<h2>"+provider+"</h2>",layoutManager.tv,html+="<div>",lastProvider=provider);var tagName=layoutManager.tv?"button":"div",className=layoutManager.tv?"listItem listItem-border btnOptions":"listItem listItem-border";layoutManager.tv&&(className+=" listItem-focusscale listItem-button"),html+="<"+tagName+' class="'+className+'" data-subid="'+result.Id+'">',html+='<i class="listItemIcon md-icon listItemIcon-transparent">&#xE01c;</i>',html+='<div class="listItemBody">',html+="<div>"+result.Name+"</div>",html+='<div class="secondary listItemBodyText">',result.Format&&(html+='<span style="margin-right:1em;">'+globalize.translate("FormatValue",result.Format)+"</span>"),null!=result.DownloadCount&&(html+="<span>"+globalize.translate("DownloadsValue",result.DownloadCount)+"</span>"),html+="</div>",result.Comment&&(html+='<div class="secondary listItemBodyText">'+result.Comment+"</div>"),(result.IsHashMatch||result.IsForced)&&(html+='<div class="secondary listItemBodyText">',result.IsForced&&(html+='<div class="inline-flex align-items-center justify-content-center" style="background:#3388cc;color:#fff;padding: .3em 1em;border-radius:1000em;">'+globalize.translate("Forced")+"</div>"),result.IsHashMatch&&(html+='<div class="inline-flex align-items-center justify-content-center" style="background:#3388cc;color:#fff;padding: .3em 1em;border-radius:1000em;">'+globalize.translate("HashMatch")+"</div>"),html+="</div>"),html+="</div>",layoutManager.tv||(html+='<button type="button" is="paper-icon-button-light" data-subid="'+result.Id+'" class="btnDownload listItemButton"><i class="md-icon">&#xE2C4;</i></button>'),html+="</"+tagName+">"}results.length&&(html+="</div>"),context.querySelector(".subtitleResults").innerHTML=html,loading.hide()}function searchForSubtitles(context,language){userSettings.set("subtitleeditor-language",language),loading.show();var apiClient=connectionManager.getApiClient(currentItem.ServerId),url=apiClient.getUrl("Items/"+currentItem.Id+"/RemoteSearch/Subtitles/"+language,{IsPerfectMatch:context.querySelector("#chkRequireHashMatch").checked,IsForced:context.querySelector("#chkForcedOnly").checked||null});apiClient.getJSON(url).then(function(results){renderSearchResults(context,results)})}function reload(context,apiClient,itemId){function onGetItem(item){currentItem=item,apiClient.getCurrentUser().then(function(user){user.Policy.EnableSubtitleDownloading||null==user.Policy.EnableSubtitleDownloading&&user.Policy.IsAdministrator?context.querySelector(".subtitleSearchContainer").classList.remove("hide"):context.querySelector(".subtitleSearchContainer").classList.add("hide"),fillSubtitleList(context,item,user);var file=item.Path||"",index=Math.max(file.lastIndexOf("/"),file.lastIndexOf("\\"));index>-1&&(file=file.substring(index+1)),file?(context.querySelector(".originalFile").innerHTML=file,context.querySelector(".originalFile").classList.remove("hide")):(context.querySelector(".originalFile").innerHTML="",context.querySelector(".originalFile").classList.add("hide")),loading.hide()})}context.querySelector(".noSearchResults").classList.add("hide"),"string"==typeof itemId?apiClient.getItem(apiClient.getCurrentUserId(),itemId).then(onGetItem):onGetItem(itemId)}function onSearchSubmit(e){var form=this,lang=form.querySelector("#selectLanguage",form).value;return searchForSubtitles(dom.parentWithClass(form,"formDialogContent"),lang),e.preventDefault(),!1}function onSubtitleListClick(e){var btnDelete=dom.parentWithClass(e.target,"btnDelete");if(btnDelete){var index=btnDelete.getAttribute("data-index");deleteLocalSubtitle(dom.parentWithClass(btnDelete,"subtitleEditorDialog"),index)}}function onSubtitleResultsClick(e){var subtitleId,context,btnOptions=dom.parentWithClass(e.target,"btnOptions");btnOptions&&(subtitleId=btnOptions.getAttribute("data-subid"),context=dom.parentWithClass(btnOptions,"subtitleEditorDialog"),showDownloadOptions(btnOptions,context,subtitleId));var btnDownload=dom.parentWithClass(e.target,"btnDownload");btnDownload&&(subtitleId=btnDownload.getAttribute("data-subid"),context=dom.parentWithClass(btnDownload,"subtitleEditorDialog"),downloadRemoteSubtitles(context,subtitleId))}function showDownloadOptions(button,context,subtitleId){var items=[];items.push({name:globalize.translate("Download"),id:"download"}),require(["actionsheet"],function(actionsheet){actionsheet.show({items:items,positionTo:button}).then(function(id){switch(id){case"download":downloadRemoteSubtitles(context,subtitleId)}})})}function centerFocus(elem,horiz,on){require(["scrollHelper"],function(scrollHelper){var fn=on?"on":"off";scrollHelper.centerFocus[fn](elem,horiz)})}function showEditorInternal(itemId,serverId,template){hasChanges=!1;var apiClient=connectionManager.getApiClient(serverId);return apiClient.getItem(apiClient.getCurrentUserId(),itemId).then(function(item){var dialogOptions={removeOnClose:!0,scrollY:!1};layoutManager.tv?dialogOptions.size="fullscreen":dialogOptions.size="small";var dlg=dialogHelper.createDialog(dialogOptions);dlg.classList.add("formDialog"),dlg.classList.add("subtitleEditorDialog"),dlg.innerHTML=globalize.translateDocument(template,"sharedcomponents"),dlg.querySelector(".subtitleSearchForm").addEventListener("submit",onSearchSubmit);var btnSubmit=dlg.querySelector(".btnSubmit");layoutManager.tv?(centerFocus(dlg.querySelector(".formDialogContent"),!1,!0),dlg.querySelector(".btnSearchSubtitles").classList.add("hide")):btnSubmit.classList.add("hide");var editorContent=dlg.querySelector(".formDialogContent");return dlg.querySelector(".subtitleList").addEventListener("click",onSubtitleListClick),dlg.querySelector(".subtitleResults").addEventListener("click",onSubtitleResultsClick),apiClient.getCultures().then(function(languages){fillLanguages(editorContent,apiClient,languages)}),dlg.querySelector(".btnCancel").addEventListener("click",function(){dialogHelper.close(dlg)}),apiClient.isMinServerVersion("4.1")&&dlg.querySelector(".fldForcedOnly").classList.remove("hide"),new Promise(function(resolve,reject){dlg.addEventListener("close",function(){layoutManager.tv&&centerFocus(dlg.querySelector(".formDialogContent"),!1,!1),hasChanges?resolve():reject()}),dialogHelper.open(dlg),reload(editorContent,apiClient,item)})})}function showEditor(itemId,serverId){return loading.show(),new Promise(function(resolve,reject){require(["text!./subtitleeditor.template.html"],function(template){showEditorInternal(itemId,serverId,template).then(resolve,reject)})})}var currentItem,hasChanges;return{show:showEditor}});