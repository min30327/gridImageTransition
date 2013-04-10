/*
 * This plugin is grid image transition gallery.
 *
 * Copyright (c) 2013 Mineo Okuda
 * Dual licensed under the MIT licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * @author: Mineo Okuda (http://word-cat.com)
 * @version: 0.1
*/
;(function($){
	

    $.fn.gridImageTransition = function(options) {
 
        //要素を退避
        var elements = this;
		
		//optionの初期値を指定
		$.fn.gridImageTransition.defaults = {
			 element : "li",
			 speed   : 900,
			 easeIn  : "swing",
			 easeOut  : "swing",
			 duration: 1000,
			 maxImage: 16,
			 animate: "random",
			 postion: "random" ,
			 loading: "img/loading.gif" 
			 };
				
		//option を取得
		var opts = $.extend({}, $.fn.gridImageTransition.defaults, options);
		//オブジェクトを定義
		var gridImageTransition = function(){};
		 
        elements.each(function() {
       	var gitparent = $(this);
	    var elem = gitparent.find(opts.element);
		 
		//prototypeオブジェクトを定義
		gridImageTransition.prototype = {
		
		//ローディングイメージを表示
		loading : function(){
			
			elem.each(function(){
				$(this).hide();
				});
				var harfParentH = parseInt(gitparent.css("height"))/2;
			
			gitparent.prepend('<div class="gitLoader" style="position:absolute;text-align:center;width:'+gitparent.width()+'px;height;'+gitparent.css("height")+';" "><img src="'+opts.loading+'" style="position:relative;top:'+harfParentH+'px;"></div>');
		
			
			
		},
			
		//初期処理	  
		init :function(){
		var self = this;
		gitparent.css({"overflow":"hidden"});
	
		$('.gitLoader').fadeOut(400,function(){


		   elem.each(function(){
			  $(this).fadeIn(400);
			  var src =$(this).find("img").attr("src");
			  var imgWidth = $(this).find("img").width(),imgHeight = $(this).find("img").height();
			  $(this).find("img").hide();
			   $(this).css({"float":"left","position":"relative","height":imgHeight,"width":imgWidth,"overflow":"hidden"});
			   $(this).append('<span class="gitDefaultImage"  style="background-image:url('+ src +');" />');			   
			   $(this).find(".gitDefaultImage").not(".cloneImage").css({"position":"absolute","z-index":"2","top": 0 ,"left": 0 ,"height":imgHeight,"width":imgWidth,"overflow":"hidden"});
			   
		   });
		   self.resize();
		});	
				
		
			self.interval(elem);
			
		},

		interval : function(elem){
         
		 var self = this;
	 	 
		 var X = setInterval(function(){
			//ランダム値取得
			var rand = self.createRand(elem.length);
			var rand2 = self.createRand(opts.maxImage);
			//クローンを生成する
		 	self.genClone( rand , rand2 ,self);
			
			clearInterval(X); 	
			var randomPosition = ["left","right","top","bottom","leftTop","rightTop","leftBottom","rightBottom"];
		 
		 	switch(opts.animate){
			
			case "fade":
			
				self.animate.fade(rand2 , self);
			 
			 break;
			 
			case "slide":
			
			if(opts.postion == "random"){

				self.animate.slide( rand2 , self , randomPosition[self.createRand(7)] );
			}else{
				self.animate.slide( rand2 , self ,opts.postion );
			}
			break;
			
			case "matrix" : 
			
			 if($.support['noCloneChecked']!=true){
				  self.animate.fade(rand2 , self);
			  }else{
			     self.animate.matrix(rand2 , self); 			
			  }
			
			break;
			
			case "turned" : 
			 
			 if($.support['noCloneChecked']==true){
				  self.animate.fade(rand2 , self);
			  }else{
			    self.animate.turned(rand2 , self); 			
			  }
			
			break;
			
			case "random":
		  
			var randomAnimate  = self.createRand(4);
			
			switch(randomAnimate){
			
			 case 0 :	
				self.animate.fade(rand2 , self);
			 break;
				
			 case 1 :	
				self.animate.slide(rand2 , self ,randomPosition[self.createRand(7)]);
			 break;
			 
			 case 2 :
			  if($.support['noCloneChecked']!=true){
				self.animate.fade(rand2 , self);
			  }else{
			    self.animate.matrix(rand2 , self); 			
			  }
		
			 break;
			 
			case 3 :
			
			  if($.support['noCloneChecked']!=true){
				  self.animate.fade(rand2 , self);
			  }else{
			    self.animate.turned(rand2 , self); 			
			  }
	
			break;	 
			 
			 default :
			 	
				self.animate.fade(rand2 , self);
			 break;
			}
			
			
			}
			 },opts.duration); 
			 
			
			},
		
		animate:
		{
			//フェード
			fade : function(index,self){
		  
			  elem.eq(index).find(".cloneImage").fadeIn(opts.speed,opts.easeIn);
			  elem.eq(index).find(".gitDefaultImage").fadeOut(opts.speed,opts.easeOut,function(){
				
				self.gitReturn($(this),self);
			
				  });
				  
			
				 	  
		
		},
			//スライド
			slide : function(index ,self,postion){
				
				switch(postion){
					
					case "left": var left = -elem.eq(index).find(".gitDefaultImage").width(); var top = 0;
					break;
					
					case "right": var left = elem.eq(index).find(".gitDefaultImage").width(); var top = 0;
					break;
					
					case "top": var left = 0; var top = -elem.eq(index).find(".gitDefaultImage").height();
					break;
					
					case "bottom": var left = 0; var top = elem.eq(index).find(".gitDefaultImage").height();
					break;
					
					case "leftTop": var left = -elem.eq(index).find(".gitDefaultImage").width(); var top = -elem.eq(index).find(".gitDefaultImage").height();
					break;
					
					case "rightTop": var left = elem.eq(index).find(".gitDefaultImage").width(); var top = -elem.eq(index).find(".gitDefaultImage").height();
					break;
					
					case "leftBottom": var left =  -elem.eq(index).find(".gitDefaultImage").width(); var top = -elem.eq(index).find(".gitDefaultImage").height();
					break;
					
					case "rightBottom": var left =  elem.eq(index).find(".gitDefaultImage").width();; var top = elem.eq(index).find(".gitDefaultImage").height();
					break;
					
					
				}
				  elem.eq(index).find(".cloneImage").css({"z-index":"3","display":"block","left":left,"top":top})
				  .animate({"left":0,"top":0},opts.speed,opts.easeOut,function(){
					 
					 	self.gitReturn(elem.eq(index).find(".gitDefaultImage"),self);
			
					  });
			
			},
			matrix : function(index,self){
		
			  elem.eq(index).find(".cloneImage").css({"display":"block",rotateY:'180deg' }).transition({ perspective: '100px',rotate3d: '0,1,0,180deg' },opts.speed);
			  elem.eq(index).find(".gitDefaultImage").transition({ perspective: '100px', rotate3d: '0,1,0,180deg',"opacity":0},opts.speed,function(){
				
				self.gitReturn($(this),self);
		
				  });
				  	 	  
		
		},
			turned : function(index,self){
		
			  elem.eq(index).find(".cloneImage").css({"display":"block"});
			  elem.eq(index).find(".gitDefaultImage").transition({  rotate: '+=30deg',  x: '+=30',  y: '+=30',"opacity":0},opts.speed,function(){
				
				self.gitReturn($(this),self);
			
				  });
	 
		
		}
		},
		//元に戻す
		gitReturn : function(gitDefaultImage,self){
			
		 gitDefaultImage.parents(opts.element).find(".cloneImage").css({"position":"absolute","z-index":"2","top": 0 ,"left": 0 ,"display":"block"})
		 .addClass("gitDefaultImage").removeClass("cloneImage").appendTo(gitDefaultImage.parents(opts.element));
		gitDefaultImage.remove();
		self.interval(elem);
		},		
		//クローン生成
		genClone : function( index , rand2 , self ){
			
		var src = elem.eq(index).find("img").attr("src");
		var imgWidth = elem.eq(index).find("img").width(),imgHeight = elem.eq(index).find("img").height();
		src = self.same(src,index,rand2,self);
	
		elem.eq(rand2).prepend('<span class="cloneImage" style="background-image:url('+ src +');"></span>');
		$(".cloneImage").css({"position":"absolute","z-index":"1","top": 0 ,"left": 0 ,"display": "none",'width':imgWidth,'height':imgHeight });
		},
		//画像が被った時の処理
		same : function(src,index,rand2,self){
		
		var count = parseInt(0);
		
		 elem.each(function(){
			
			 if($(this).css("background-image") == src){
				 count ++;			 
				 }
			});
			
		//同じ画像だったらもう一度ランダム値を取得 もしくは同じ画像が2枚以上だったらもう一度ランダム値を取得
		 if(count>0 || src == elem.eq(rand2).find("img").attr("src")){
		
			index = self.createRand(elem.length);
			return src = elem.eq(index).find("img").attr("src");		
		
		}else{
			
			return src;
			}
		},
		//ランダム値生成
		createRand : function(range,rand_old){
	    var rand_old;
		// エラー
	
		if(range <= 1){
			return 0;
		}
		
		while(true){
			// 乱数を取得
			var r = Math.floor(Math.random() * range);
			
			// 前回と一致しなければ終了
			if(r != rand_old){
				break;
			}
		}
		
		// 結果を退避
		rand_old = r;

		return r;
		
		},
		//リサイジング
		resize : function(){
					
		var winWidth = gitparent.parent().width();	
	
		if(winWidth >= gitparent.width() && $(window).width() == gitparent.width()){
			//windowの幅が全体幅より小さければimg幅一つ分広げる
			gitparent.width( gitparent.width() + elem.find("img").width() );
			
			}
			}
		
		};
		
		$.extend(gridImageTransition.prototype);
		var gridTransition = new gridImageTransition;
		
		gridTransition.loading();
		
		//init()を実行 
	
			gridTransition.init();

					
		$(window).resize(function(){
			gridTransition.resize();
		});
		
        });
 		//this を返す
        return this;
    };
	

   })(jQuery);