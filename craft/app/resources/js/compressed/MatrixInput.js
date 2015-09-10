/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://buildwithcraft.com/license Craft License Agreement
 @see       http://buildwithcraft.com
 @package   craft.app.resources
*/
(function(c){Craft.MatrixInput=Garnish.Base.extend({id:null,blockTypes:null,blockTypesByHandle:null,inputNamePrefix:null,inputIdPrefix:null,maxBlocks:null,showingAddBlockMenu:!1,addBlockBtnGroupWidth:null,addBlockBtnContainerWidth:null,$container:null,$blockContainer:null,$addBlockBtnContainer:null,$addBlockBtnGroup:null,$addBlockBtnGroupBtns:null,blockSort:null,blockSelect:null,totalNewBlocks:0,init:function(a,b,d,f){this.id=a;this.blockTypes=b;this.inputNamePrefix=d;this.inputIdPrefix=Craft.formatInputId(this.inputNamePrefix);
this.maxBlocks=f;this.$container=c("#"+this.id);this.$blockContainer=this.$container.children(".blocks");this.$addBlockBtnContainer=this.$container.children(".buttons");this.$addBlockBtnGroup=this.$addBlockBtnContainer.children(".btngroup");this.$addBlockBtnGroupBtns=this.$addBlockBtnGroup.children(".btn");this.$addBlockMenuBtn=this.$addBlockBtnContainer.children(".menubtn");this.setNewBlockBtn();this.blockTypesByHandle={};for(b=0;b<this.blockTypes.length;b++)a=this.blockTypes[b],this.blockTypesByHandle[a.handle]=
a;d=this.$blockContainer.children();f=Craft.MatrixInput.getCollapsedBlockIds();this.blockSort=new Garnish.DragSort(d,{handle:"> .actions > .move",axis:"y",filter:c.proxy(function(){return this.blockSort.$targetItem.hasClass("sel")?this.blockSelect.getSelectedItems():this.blockSort.$targetItem},this),collapseDraggees:!0,magnetStrength:4,helperLagBase:1.5,helperOpacity:0.9,onSortChange:c.proxy(function(){this.blockSelect.resetItemOrder()},this)});this.blockSelect=new Garnish.Select(this.$blockContainer,
d,{multi:!0,vertical:!0,handle:"> .checkbox, > .titlebar",checkboxMode:!0});for(b=0;b<d.length;b++){var k=c(d[b]);a=k.data("id");(a="string"==typeof a&&a.match(/new(\d+)/))&&a[1]>this.totalNewBlocks&&(this.totalNewBlocks=parseInt(a[1]));a=new m(this,k);a.id&&-1!=c.inArray(""+a.id,f)&&a.collapse()}this.addListener(this.$addBlockBtnGroupBtns,"click",function(a){a=c(a.target).data("type");this.addBlock(a)});new Garnish.MenuBtn(this.$addBlockMenuBtn,{onOptionSelect:c.proxy(function(a){a=c(a).data("type");
this.addBlock(a)},this)});this.updateAddBlockBtn();this.addListener(this.$container,"resize","setNewBlockBtn");Garnish.$doc.ready(c.proxy(function(){this.setNewBlockBtn()},this))},setNewBlockBtn:function(){if(!this.addBlockBtnGroupWidth&&(this.addBlockBtnGroupWidth=this.$addBlockBtnGroup.width(),!this.addBlockBtnGroupWidth))return;this.addBlockBtnContainerWidth!==(this.addBlockBtnContainerWidth=this.$addBlockBtnContainer.width())&&(this.addBlockBtnGroupWidth>this.addBlockBtnContainerWidth?this.showingAddBlockMenu||
(this.$addBlockBtnGroup.addClass("hidden"),this.$addBlockMenuBtn.removeClass("hidden"),this.showingAddBlockMenu=!0):this.showingAddBlockMenu&&(this.$addBlockMenuBtn.addClass("hidden"),this.$addBlockBtnGroup.removeClass("hidden"),this.showingAddBlockMenu=!1,-1!==navigator.userAgent.indexOf("Safari")&&Garnish.requestAnimationFrame(c.proxy(function(){this.$addBlockBtnGroup.css("opacity",0.99);Garnish.requestAnimationFrame(c.proxy(function(){this.$addBlockBtnGroup.css("opacity","")},this))},this))))},
canAddMoreBlocks:function(){return!this.maxBlocks||this.$blockContainer.children().length<this.maxBlocks},updateAddBlockBtn:function(){this.canAddMoreBlocks()?(this.$addBlockBtnGroup.removeClass("disabled"),this.$addBlockMenuBtn.removeClass("disabled")):(this.$addBlockBtnGroup.addClass("disabled"),this.$addBlockMenuBtn.addClass("disabled"))},addBlock:function(a,b){if(this.canAddMoreBlocks()){this.totalNewBlocks++;for(var d="new"+this.totalNewBlocks,f='<div class="matrixblock" data-id="'+d+'"><input type="hidden" name="'+
this.inputNamePrefix+"["+d+'][type]" value="'+a+'"/><input type="hidden" name="'+this.inputNamePrefix+"["+d+'][enabled]" value="1"/><div class="titlebar"><div class="blocktype">'+this.getBlockTypeByHandle(a).name+'</div><div class="preview"></div></div><div class="checkbox" title="'+Craft.t("Select")+'"></div><div class="actions"><div class="status off" title="'+Craft.t("Disabled")+'"></div><a class="settings icon menubtn" title="'+Craft.t("Actions")+'" role="button"></a> <div class="menu"><ul class="padded"><li><a data-icon="collapse" data-action="collapse">'+
Craft.t("Collapse")+'</a></li><li class="hidden"><a data-icon="expand" data-action="expand">'+Craft.t("Expand")+'</a></li><li><a data-icon="disabled" data-action="disable">'+Craft.t("Disable")+'</a></li><li class="hidden"><a data-icon="enabled" data-action="enable">'+Craft.t("Enable")+'</a></li></ul><hr class="padded"/><ul class="padded">',k=0;k<this.blockTypes.length;k++)var h=this.blockTypes[k],f=f+('<li><a data-icon="+" data-action="add" data-type="'+h.handle+'">'+Craft.t("Add {type} above",{type:h.name})+
"</a></li>");var f=f+('</ul><hr class="padded"/><ul class="padded"><li><a data-icon="remove" data-action="delete">'+Craft.t("Delete")+'</a></li></ul></div><a class="move icon" title="'+Craft.t("Reorder")+'" role="button"></a> </div></div>'),g=c(f);b?g.insertBefore(b):g.appendTo(this.$blockContainer);var e=c('<div class="fields"/>').appendTo(g),f=this.getParsedBlockHtml(this.blockTypesByHandle[a].bodyHtml,d),l=this.getParsedBlockHtml(this.blockTypesByHandle[a].footHtml,d);c(f).appendTo(e);g.css(this.getHiddenBlockCss(g)).velocity({opacity:1,
"margin-bottom":10},"fast",c.proxy(function(){g.css("margin-bottom","");Garnish.$bod.append(l);Craft.initUiElements(e);new m(this,g);this.blockSort.addItems(g);this.blockSelect.addItems(g);this.updateAddBlockBtn();Garnish.requestAnimationFrame(function(){Garnish.scrollContainerToElement(g)})},this))}},getBlockTypeByHandle:function(a){for(var b=0;b<this.blockTypes.length;b++)if(this.blockTypes[b].handle==a)return this.blockTypes[b]},collapseSelectedBlocks:function(){this.callOnSelectedBlocks("collapse")},
expandSelectedBlocks:function(){this.callOnSelectedBlocks("expand")},disableSelectedBlocks:function(){this.callOnSelectedBlocks("disable")},enableSelectedBlocks:function(){this.callOnSelectedBlocks("enable")},deleteSelectedBlocks:function(){this.callOnSelectedBlocks("selfDestruct")},callOnSelectedBlocks:function(a){for(var b=0;b<this.blockSelect.$selectedItems.length;b++)this.blockSelect.$selectedItems.eq(b).data("block")[a]()},getHiddenBlockCss:function(a){return{opacity:0,marginBottom:-a.outerHeight()}},
getParsedBlockHtml:function(a,b){return"string"==typeof a?a.replace(/__BLOCK__/g,b):""}},{collapsedBlockStorageKey:"Craft-"+Craft.siteUid+".MatrixInput.collapsedBlocks",getCollapsedBlockIds:function(){return"string"==typeof localStorage[Craft.MatrixInput.collapsedBlockStorageKey]?Craft.filterArray(localStorage[Craft.MatrixInput.collapsedBlockStorageKey].split(",")):[]},setCollapsedBlockIds:function(a){localStorage[Craft.MatrixInput.collapsedBlockStorageKey]=a.join(",")},rememberCollapsedBlockId:function(a){if("undefined"!==
typeof Storage){var b=Craft.MatrixInput.getCollapsedBlockIds();-1==c.inArray(""+a,b)&&(b.push(a),Craft.MatrixInput.setCollapsedBlockIds(b))}},forgetCollapsedBlockId:function(a){if("undefined"!==typeof Storage){var b=Craft.MatrixInput.getCollapsedBlockIds();a=c.inArray(""+a,b);-1!=a&&(b.splice(a,1),Craft.MatrixInput.setCollapsedBlockIds(b))}}});var m=Garnish.Base.extend({matrix:null,$container:null,$titlebar:null,$fieldsContainer:null,$previewContainer:null,$actionMenu:null,$collapsedInput:null,isNew:null,
id:null,collapsed:!1,init:function(a,b){this.matrix=a;this.$container=b;this.$titlebar=b.children(".titlebar");this.$previewContainer=this.$titlebar.children(".preview");this.$fieldsContainer=b.children(".fields");this.$container.data("block",this);this.id=this.$container.data("id");this.isNew=!this.id||"string"==typeof this.id&&"new"==this.id.substr(0,3);var d=this.$container.find("> .actions > .settings"),d=new Garnish.MenuBtn(d);this.$actionMenu=d.menu.$container;d.menu.settings.onOptionSelect=
c.proxy(this,"onMenuOptionSelect");Garnish.hasAttr(this.$container,"data-collapsed")&&this.collapse();this.addListener(this.$titlebar,"dblclick",function(a){a.preventDefault();this.toggle()})},toggle:function(){this.collapsed?this.expand():this.collapse(!0)},collapse:function(a){if(!this.collapsed){this.$container.addClass("collapsed");for(var b="",d=this.$fieldsContainer.children(),f=0;f<d.length;f++){for(var k=c(d[f]).children(".input").find('select,input[type!="hidden"],textarea,.label'),h="",
g=0;g<k.length;g++){var e=c(k[g]);if(e.hasClass("label")){var l=e.parent().parent();if(l.hasClass("lightswitch")&&(l.hasClass("on")&&e.hasClass("off")||!l.hasClass("on")&&e.hasClass("on")))continue;e=e.text()}else e=Craft.getText(Garnish.getInputPostVal(e));e instanceof Array&&(e=e.join(", "));e&&(e=Craft.trim(e))&&(h&&(h+=", "),h+=e)}h&&(b+=(b?" <span>|</span> ":"")+h)}this.$previewContainer.html(b);this.$fieldsContainer.velocity("stop");this.$container.velocity("stop");a?(this.$fieldsContainer.velocity("fadeOut",
{duration:"fast"}),this.$container.velocity({height:17},"fast")):(this.$previewContainer.show(),this.$fieldsContainer.hide(),this.$container.css({height:17}));setTimeout(c.proxy(function(){this.$actionMenu.find("a[data-action=collapse]:first").parent().addClass("hidden");this.$actionMenu.find("a[data-action=expand]:first").parent().removeClass("hidden")},this),200);this.isNew?this.$collapsedInput?this.$collapsedInput.val("1"):this.$collapsedInput=c('<input type="hidden" name="'+this.matrix.inputNamePrefix+
"["+this.id+'][collapsed]" value="1"/>').appendTo(this.$container):Craft.MatrixInput.rememberCollapsedBlockId(this.id);this.collapsed=!0}},expand:function(){if(this.collapsed){this.$container.removeClass("collapsed");this.$fieldsContainer.velocity("stop");this.$container.velocity("stop");var a=this.$container.height();this.$container.height("auto");this.$fieldsContainer.show();var b=this.$container.height();this.$container.height(a);this.$fieldsContainer.hide().velocity("fadeIn",{duration:"fast"});
this.$container.velocity({height:b},"fast",c.proxy(function(){this.$previewContainer.html("");this.$container.height("auto")},this));setTimeout(c.proxy(function(){this.$actionMenu.find("a[data-action=collapse]:first").parent().removeClass("hidden");this.$actionMenu.find("a[data-action=expand]:first").parent().addClass("hidden")},this),200);this.isNew||"undefined"===typeof Storage||(a=Craft.MatrixInput.getCollapsedBlockIds(),b=c.inArray(""+this.id,a),-1!=b&&(a.splice(b,1),Craft.MatrixInput.setCollapsedBlockIds(a)));
this.isNew?this.$collapsedInput&&this.$collapsedInput.val(""):Craft.MatrixInput.forgetCollapsedBlockId(this.id);this.collapsed=!1}},disable:function(){this.$container.children('input[name$="[enabled]"]:first').val("");this.$container.addClass("disabled");setTimeout(c.proxy(function(){this.$actionMenu.find("a[data-action=disable]:first").parent().addClass("hidden");this.$actionMenu.find("a[data-action=enable]:first").parent().removeClass("hidden")},this),200);this.collapse(!0)},enable:function(){this.$container.children('input[name$="[enabled]"]:first').val("1");
this.$container.removeClass("disabled");setTimeout(c.proxy(function(){this.$actionMenu.find("a[data-action=disable]:first").parent().removeClass("hidden");this.$actionMenu.find("a[data-action=enable]:first").parent().addClass("hidden")},this),200)},onMenuOptionSelect:function(a){var b=1<this.matrix.blockSelect.totalSelected&&this.matrix.blockSelect.isSelected(this.$container);a=c(a);switch(a.data("action")){case "collapse":b?this.matrix.collapseSelectedBlocks():this.collapse(!0);break;case "expand":b?
this.matrix.expandSelectedBlocks():this.expand();break;case "disable":b?this.matrix.disableSelectedBlocks():this.disable();break;case "enable":b?this.matrix.enableSelectedBlocks():(this.enable(),this.expand());break;case "add":b=a.data("type");this.matrix.addBlock(b,this.$container);break;case "delete":b?confirm(Craft.t("Are you sure you want to delete the selected blocks?"))&&this.matrix.deleteSelectedBlocks():this.selfDestruct()}},selfDestruct:function(){this.$container.velocity(this.matrix.getHiddenBlockCss(this.$container),
"fast",c.proxy(function(){this.$container.remove();this.matrix.updateAddBlockBtn()},this))}})})(jQuery);

//# sourceMappingURL=MatrixInput.min.map
