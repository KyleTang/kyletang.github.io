/**
 * web页面控制台
 *
 * 功能效果：
 * 在手机网页，无法查看浏览器控制台日志，使用此插件，可以摇一摇手机，显示控制台日志(半透明、红字、灰底)，方便查看日志信息
 *
 * 使用方式：在页面最后引入
 * <script type="text/javascript" src="webconsole.js"></script>
 */
WCGnnt = {
	version : '1.0.0-20180917',
	useConsole : true
};

WCGnnt.apply = function(o, c, defaults){
	if(defaults){
		WCGnnt.apply(o, defaults);
	}
	if(o && c && typeof c == 'object'){
		for(var p in c){
			o[p] = c[p];
		}
	}
	return o;
};

WCGnnt.TimeFormat = function (fmt,date){
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
};
 
WCGnnt.Now = function()
{
	return WCGnnt.TimeFormat("MM-dd hh:mm:ss.S",new Date());
},

WCGnnt.LogConsole = function(allowFlag){
	if (allowFlag){
		this.init = function(){
			this.initDebugDiv();
			//替换全局 Gnnt.log方法
			WCGnnt.log=this.log;
			
			//没有控制台或者是手机页面，替换
			if (!window.console || navigator.userAgent.indexOf('Mobile')>=0){
				WCGnnt.winConsole = window.console;
				window.console = this;
			}

		};
		this.init();

	}
};

WCGnnt.LogConsole.prototype = {
	debugDiv : null,
	debugDivName : null,
	displayStatus : false,
	firstView : true,

	initDebugDiv : function(){
		this.debugDiv = document.createElement("DIV");
		this.debugDivName ="debugDiv_console";
		var x = this.debugDiv;
		x.id = this.debugDivName;
		x.style.position = 'absolute';
		x.style.top = "5px";
		x.style.left = "5px";
		x.style.zIndex = 10000;
		x.style.overflow = 'auto';
		x.style.border = "5px groove black";
		x.style.fontSize="12";
		x.style.width="96%";
		x.style.height="96%";
		x.style.visibility = 'hidden';
		//listDiv.style.visibility = 'visible';
		x.style.backgroundColor='gray';
		x.style.color='red';
		x.style["filter"]="alpha(opacity=70)";
		x.style["-moz-opacity"]=0.7;
		x.style["opacity"]=0.7;

		document.body.appendChild(x);
	},

	log0 : function(level,msg){
		var x = document.getElementById('debugDiv_console');
		//var d = new Date();
		x.innerHTML=level+WCGnnt.Now()+": "+msg+"<br/>"+x.innerHTML;
	},
	
	log : function(msg){
		this.log0("[log] ",msg);
	}, 
	
	error : function(msg){
		this.log0("[error] ",msg);
	}, 
	
	info : function(msg){
		this.log0("[info] ",msg);
	}, 
	
	debug : function(msg){
		this.log0("[debug] ",msg);
	}, 
	
	warn : function(msg){
		this.log0("[warn] ",msg);
	}, 

	trace : function(msg){
		this.log0("[trace] ",msg);
	}, 
	
	firstViewInfo: function(){
		if (this.firstView){
			this.log("webconsole版本号"+WCGnnt.version);
			this.firstView=false;
		}
	},

	setDebugDivDisplay : function(setValue){
		this.displayStatus=setValue;
		if (setValue){
			this.firstViewInfo();
			this.debugDiv.style.visibility = 'visible';
			this.debugDiv.style.display='block';
		}else{
			this.debugDiv.style.visibility = 'hidden';
			this.debugDiv.style.display='none';
		}
	},
	
	changeDebugDivDisplay : function(){
		this.displayStatus=!this.displayStatus;
		this.setDebugDivDisplay(this.displayStatus);
	}
};

//------------------------------------------------------------------------
/* 摇一摇代码
 * Author: Alex Gibson
 * https://github.com/alexgibson/shake.js
 * License: MIT license
 */

(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(global, global.document);
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(global, global.document);
    } else {
        global.Shake = factory(global, global.document);
    }
} (typeof window !== 'undefined' ? window : this, function (window, document) {

    'use strict';

    function Shake(options) {
        //feature detect
        this.hasDeviceMotion = 'ondevicemotion' in window;

        this.options = {
            threshold: 15, //default velocity threshold for shake to register
            timeout: 1000 //default interval between events
        };

        if (typeof options === 'object') {
            for (var i in options) {
                if (options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }
        }

        //use date to prevent multiple shakes firing
        this.lastTime = new Date();

        //accelerometer values
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;

        //create custom event
        if (typeof document.CustomEvent === 'function') {
            this.event = new document.CustomEvent('shake', {
                bubbles: true,
                cancelable: true
            });
        } else if (typeof document.createEvent === 'function') {
            this.event = document.createEvent('Event');
            this.event.initEvent('shake', true, true);
        } else {
            return false;
        }
    }

    //reset timer values
    Shake.prototype.reset = function () {
        this.lastTime = new Date();
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;
    };

    //start listening for devicemotion
    Shake.prototype.start = function () {
        this.reset();
        if (this.hasDeviceMotion) {
            window.addEventListener('devicemotion', this, false);
        }
    };

    //stop listening for devicemotion
    Shake.prototype.stop = function () {
        if (this.hasDeviceMotion) {
            window.removeEventListener('devicemotion', this, false);
        }
        this.reset();
    };

    //calculates if shake did occur
    Shake.prototype.devicemotion = function (e) {
        var current = e.accelerationIncludingGravity;
        var currentTime;
        var timeDifference;
        var deltaX = 0;
        var deltaY = 0;
        var deltaZ = 0;

        if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
            this.lastX = current.x;
            this.lastY = current.y;
            this.lastZ = current.z;
            return;
        }

        deltaX = Math.abs(this.lastX - current.x);
        deltaY = Math.abs(this.lastY - current.y);
        deltaZ = Math.abs(this.lastZ - current.z);

        if (((deltaX > this.options.threshold) && (deltaY > this.options.threshold)) || ((deltaX > this.options.threshold) && (deltaZ > this.options.threshold)) || ((deltaY > this.options.threshold) && (deltaZ > this.options.threshold))) {
            //calculate time in milliseconds since last shake registered
            currentTime = new Date();
            timeDifference = currentTime.getTime() - this.lastTime.getTime();

            if (timeDifference > this.options.timeout) {
                window.dispatchEvent(this.event);
                this.lastTime = new Date();
            }
        }

        this.lastX = current.x;
        this.lastY = current.y;
        this.lastZ = current.z;

    };

    //event handler
    Shake.prototype.handleEvent = function (e) {
        if (typeof (this[e.type]) === 'function') {
            return this[e.type](e);
        }
    };

    return Shake;
}));

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//--摇一摇显示调试日志----------------------------------------------------------------------
(function() {
	if (WCGnnt.useConsole){
		var myShakeEvent = new Shake({
					threshold: 15, // optional shake strength threshold
					timeout: 1000 // optional, determines the frequency of event generation
				});
		myShakeEvent.start();
		
		WCGnntLog = new WCGnnt.LogConsole(WCGnnt.useConsole);

		//function to call when shake occurs
		function shakeEventDidOccur () {
			try{
				//console.debug("shake!");
				WCGnntLog.changeDebugDivDisplay();
			}catch(e){
			}
		}
		
		window.addEventListener('shake', shakeEventDidOccur, false);
		
		/*
		setInterval(function(){
			console.trace("啦啦啦");
		},100);
		*/
		
	}
})();