YUI.add("moodle-core-blocks",function(e,t){var n="/lib/ajax/blocks.php",r={BLOCK:"block",BLOCKREGION:"block-region",BLOCKADMINBLOCK:"block_adminblock",EDITINGMOVE:"editing_move",HEADER:"header",LIGHTBOX:"lightbox",REGIONCONTENT:"region-content",SKIPBLOCK:"skip-block",SKIPBLOCKTO:"skip-block-to",MYINDEX:"page-my-index",REGIONMAIN:"region-main"},i=function(){i.superclass.constructor.apply(this,arguments)};e.extend(i,M.core.dragdrop,{skipnodetop:null,skipnodebottom:null,dragsourceregion:null,initializer:function(){this.groups=["block"],this.samenodeclass=r.BLOCK,this.parentnodeclass=r.REGIONCONTENT;var t=e.Node.all("body#"+r.MYINDEX+" #"+r.REGIONMAIN+" > ."+r.REGIONCONTENT);if(t.size()>0){var n=t.item(0);n.addClass(r.BLOCKREGION),n.set("id",r.REGIONCONTENT),n.one("div").addClass(r.REGIONCONTENT)}var i=e.Node.all("div."+r.BLOCKREGION);if(i.size()===0)return!1;if(i.size()!=this.get("regions").length){var s=e.Node.create("<div></div>").addClass(r.BLOCKREGION),o=e.Node.create("<div></div>").addClass(r.REGIONCONTENT);s.appendChild(o);var u=i.filter("#region-pre"),a=i.filter("#region-post");u.size()===0&&a.size()===1?(s.setAttrs({id:"region-pre"}),a.item(0).insert(s,"before"),i.unshift(s)):a.size()===0&&u.size()===1&&(s.setAttrs({id:"region-post"}),u.item(0).insert(s,"after"),i.push(s))}i.each(function(t){var n=new e.DD.Drop({node:t.one("div."+r.REGIONCONTENT),groups:this.groups,padding:"40 240 40 240"}),i=new e.DD.Delegate({container:t,nodes:"."+r.BLOCK,target:!0,handles:["."+r.HEADER],invalid:".block-hider-hide, .block-hider-show, .moveto",dragConfig:{groups:this.groups}});i.dd.plug(e.Plugin.DDProxy,{moveOnEnd:!1}),i.dd.plug(e.Plugin.DDWinScroll);var s=t.all("."+r.BLOCK);s.each(function(e){var t=e.one("a."+r.EDITINGMOVE);t&&(t.replace(this.get_drag_handle(t.getAttribute("title"),"","icon",!0)),e.one("."+r.HEADER).setStyle("cursor","move"))},this)},this)},get_block_id:function(e){return Number(e.get("id").replace(/inst/i,""))},get_block_region:function(t){var n=t.ancestor("div."+r.BLOCKREGION).get("id").replace(/region-/i,"");return e.Array.indexOf(this.get("regions"),n)===-1?(right_to_left()&&(n==="post"?n="pre":n==="pre"&&(n="post")),"side-"+n):n},get_region_id:function(e){return e.get("id").replace(/region-/i,"")},drag_start:function(e){var t=e.target;this.dragsourceregion=t.get("node").ancestor("div."+r.BLOCKREGION),t.get("node").previous()&&t.get("node").previous().hasClass(r.SKIPBLOCK)&&(this.skipnodetop=t.get("node").previous()),t.get("node").next()&&t.get("node").next().hasClass(r.SKIPBLOCKTO)&&(this.skipnodebottom=t.get("node").next())},drop_over:function(t){var n=t.drag.get("node"),i=t.drop.get("node");i.hasClass(this.parentnodeclass)&&i.one("."+r.BLOCKADMINBLOCK)&&i.one("."+r.BLOCKADMINBLOCK).next("."+r.BLOCK)&&i.prepend(n);if(this.dragsourceregion.contains(i))return!1;var s=e.one("body"),o=this.get_region_id(this.dragsourceregion);s.hasClass("side-"+o+"-only")&&s.removeClass("side-"+o+"-only"),o=this.get_region_id(i.ancestor("div."+r.BLOCKREGION)),this.dragsourceregion.all("."+r.BLOCK).size()==0&&this.dragsourceregion.get("id").match(/(region-pre|region-post)/i)&&(s.hasClass("side-"+o+"-only")||s.addClass("side-"+o+"-only"))},drop_end:function(){this.skipnodetop=null,this.skipnodebottom=null,this.dragsourceregion=null},drag_dropmiss:function(e){this.drop_hit(e)},drop_hit:function(t){var i=t.drag,s=i.get("node"),o=t.drop.get("node");s.previous()&&s.previous().hasClass(r.SKIPBLOCK)&&s.insert(s.previous(),"after"),this.skipnodetop&&s.insert(this.skipnodetop,"before"),this.skipnodebottom&&s.insert(this.skipnodebottom,"after");var u=M.util.add_lightbox(e,s),a={sesskey:M.cfg.sesskey,courseid:this.get("courseid"),pagelayout:this.get("pagelayout"),pagetype:this.get("pagetype"),subpage:this.get("subpage"),contextid:this.get("contextid"),action:"move",bui_moveid:this.get_block_id(s),bui_newregion:this.get_block_region(o)};this.get("cmid")&&(a.cmid=this.get("cmid")),s.next("."+this.samenodeclass)&&!s.next("."+this.samenodeclass).hasClass(r.BLOCKADMINBLOCK)&&(a.bui_beforeid=this.get_block_id(s.next("."+this.samenodeclass))),e.io(M.cfg.wwwroot+n,{method:"POST",data:a,on:{start:function(){u.show()},success:function(t,n){window.setTimeout(function(){u.hide()},250);try{var r=e.JSON.parse(n.responseText);r.error&&new M.core.ajaxException(r)}catch(i){}},failure:function(e,t){this.ajax_failure(t),u.hide()}},context:this})}},{NAME:"core-blocks-dragdrop",ATTRS:{courseid:{value:null},cmid:{value:null},contextid:{value:null},pagelayout:{value:null},pagetype:{value:null},subpage:{value:null},regions:{value:null}}}),M.core=M.core||{},M.core.blockdraganddrop=M.core.blockdraganddrop||{},M.core.blockdraganddrop._isusingnewblocksmethod=null,M.core.blockdraganddrop.is_using_blocks_render_method=function(){if(this._isusingnewblocksmethod===null){var t=e.all(".block-region[data-blockregion]").size(),n=e.all(".block-region").size();this._isusingnewblocksmethod=n===t}return this._isusingnewblocksmethod},M.core.blockdraganddrop.init=function(e){this.is_using_blocks_render_method()?new s(e):new i(e)},M.core_blocks=M.core_blocks||{},M.core_blocks.init_dragdrop=function(e){M.core.blockdraganddrop.init(e)};var s=function(){s.superclass.constructor.apply(this,arguments)};s.prototype={skipnodetop:null,skipnodebottom:null,regionobjects:{},initializer:function(){var t=this.get("regions"),n=0,i,s,u,a;this.groups=["block"],this.samenodeclass=r.BLOCK,this.parentnodeclass=r.BLOCKREGION;var f=e.Node.all("body#"+r.MYINDEX+" #"+r.REGIONMAIN+" > ."+r.REGIONCONTENT);if(f.size()>0){var l=f.item(0);l.addClass(r.BLOCKREGION),l.set("id",r.REGIONCONTENT),l.one("div").addClass(r.REGIONCONTENT)}for(n in t)s=t[n],i=new o({manager:this,region:s,node:e.one("#block-region-"+s)}),this.regionobjects[s]=i,u=new e.DD.Drop({node:i.get_droptarget(),groups:this.groups,padding:"40 240 40 240"}),a=new e.DD.Delegate({container:i.get_droptarget(),nodes:"."+r.BLOCK,target:!0,handles:["."+r.HEADER],invalid:".block-hider-hide, .block-hider-show, .moveto",dragConfig
:{groups:this.groups}}),a.dd.plug(e.Plugin.DDProxy,{moveOnEnd:!1}),a.dd.plug(e.Plugin.DDWinScroll),a.on("drag:mouseDown",this.enable_all_regions,this),i.change_block_move_icons(this)},get_block_id:function(e){return Number(e.get("id").replace(/inst/i,""))},get_block_region:function(e){return e.test("[data-blockregion]")||(e=e.ancestor("[data-blockregion]")),e.getData("blockregion")},get_region_object:function(e){return this.regionobjects[this.get_block_region(e)]},enable_all_regions:function(){var e=0;for(e in this.regionobjects)this.regionobjects[e].enable()},disable_regions_if_required:function(){var e=0;for(e in this.regionobjects)this.regionobjects[e].disable_if_required()},drag_start:function(e){var t=e.target;t.get("node").previous()&&t.get("node").previous().hasClass(r.SKIPBLOCK)&&(this.skipnodetop=t.get("node").previous()),t.get("node").next()&&t.get("node").next().hasClass(r.SKIPBLOCKTO)&&(this.skipnodebottom=t.get("node").next())},drop_over:function(e){var t=e.drag.get("node"),n=e.drop.get("node");n.hasClass(r.REGIONCONTENT)&&n.one("."+r.BLOCKADMINBLOCK)&&n.one("."+r.BLOCKADMINBLOCK).next("."+r.BLOCK)&&n.prepend(t)},drop_end:function(){this.skipnodetop=null,this.skipnodebottom=null,this.disable_regions_if_required()},drag_dropmiss:function(e){this.drop_hit(e)},drop_hit:function(t){var i=t.drag.get("node"),s=t.drop.get("node");i.previous()&&i.previous().hasClass(r.SKIPBLOCK)&&i.insert(i.previous(),"after"),this.skipnodetop&&i.insert(this.skipnodetop,"before"),this.skipnodebottom&&i.insert(this.skipnodebottom,"after");var o=M.util.add_lightbox(e,i),u={sesskey:M.cfg.sesskey,courseid:this.get("courseid"),pagelayout:this.get("pagelayout"),pagetype:this.get("pagetype"),subpage:this.get("subpage"),contextid:this.get("contextid"),action:"move",bui_moveid:this.get_block_id(i),bui_newregion:this.get_block_region(s)};this.get("cmid")&&(u.cmid=this.get("cmid")),i.next("."+r.BLOCK)&&!i.next("."+r.BLOCK).hasClass(r.BLOCKADMINBLOCK)&&(u.bui_beforeid=this.get_block_id(i.next("."+r.BLOCK))),e.io(M.cfg.wwwroot+n,{method:"POST",data:u,on:{start:function(){o.show()},success:function(t,n){window.setTimeout(function(){o.hide()},250);try{var r=e.JSON.parse(n.responseText);r.error&&new M.core.ajaxException(r)}catch(i){}},failure:function(e,t){this.ajax_failure(t),o.hide()},complete:function(){this.disable_regions_if_required()}},context:this})}},e.extend(s,M.core.dragdrop,s.prototype,{NAME:"core-blocks-dragdrop-manager",ATTRS:{courseid:{value:null},cmid:{value:null},contextid:{value:null},pagelayout:{value:null},pagetype:{value:null},subpage:{value:null},regions:{value:[]}}});var o=function(){o.superclass.constructor.apply(this,arguments)};o.prototype={initializer:function(){var t=this.get("node");t||this.create_and_add_node();var n=e.one("body"),i=t.all("."+r.BLOCK).size()>0,s=this.get_has_region_class();this.set("hasblocks",i),n.hasClass(s)||n.addClass(s),n.addClass(i?this.get_used_region_class():this.get_empty_region_class()),n.removeClass(i?this.get_empty_region_class():this.get_used_region_class())},create_and_add_node:function(){var t=e.Node.create,n=this.get("region"),i=t('<div id="block-region-'+n+'" data-droptarget="1"></div>').addClass(r.BLOCKREGION).setData("blockregion",n),s=this.get("manager").get("regions"),o,u=!1,a=!1,f=!1,l,c;for(o in s)s[o].match(/(pre|left)/)?u=s[o]:s[o].match(/(post|right)/)&&(a=s[o]);u!==!1&&a!==!1&&(n===u?(c=e.one("#block-region-"+a),c&&(c.insert(i,"before"),f=!0)):(l=e.one("#block-region-"+u),l&&(l.insert(i,"after"),f=!0))),f===!1&&e.one("body").append(i),this.set("node",i)},change_block_move_icons:function(e){var t,n;this.get("node").all("."+r.BLOCK+" a."+r.EDITINGMOVE).each(function(i){i.ancestor("."+r.BLOCK).one("."+r.HEADER).setStyle("cursor","move"),t=e.get_drag_handle(i.getAttribute("title"),"","icon",!0),n=t.one("img"),n.addClass("iconsmall"),n.removeClass("icon"),i.replace(t)})},get_has_region_class:function(){return"has-region-"+this.get("region")},get_empty_region_class:function(){return"empty-region-"+this.get("region")},get_used_region_class:function(){return"used-region-"+this.get("region")},get_droptarget:function(){var e=this.get("node");return e.test('[data-droptarget="1"]')?e:e.one('[data-droptarget="1"]')},enable:function(){e.one("body").addClass(this.get_used_region_class()).removeClass(this.get_empty_region_class())},disable_if_required:function(){this.get("node").all("."+r.BLOCK).size()===0&&e.one("body").addClass(this.get_empty_region_class()).removeClass(this.get_used_region_class())}},e.extend(o,e.Base,o.prototype,{NAME:"core-blocks-dragdrop-blockregion",ATTRS:{manager:{writeOnce:"initOnly",validator:function(t){return e.Lang.isObject(t)&&t instanceof s}},region:{writeOnce:"initOnly",validator:function(t){return e.Lang.isString(t)}},node:{validator:function(t){return e.Lang.isObject(t)||e.Lang.isNull(t)}},hasblocks:{value:!1,validator:function(t){return e.Lang.isBoolean(t)}}}})},"@VERSION@",{requires:["base","node","io","dom","dd","dd-scroll","moodle-core-dragdrop","moodle-core-notification"]});