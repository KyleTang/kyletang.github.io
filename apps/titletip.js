var titles = [
	"小伙不要走，我要和你对决",
	"^-^",
	"轻轻的你走了，正如你轻轻的来"];

var count = 0;
	
var jzw = 
	[
		["两对父子去买帽子，为什么只买了三顶？","三代人"],
		["小明吃麻辣面，加了胡椒又加辣椒，你猜他还会加什么东西？","鼻涕和眼泪"],
		["“水蛇”“蟒蛇”“青竹蛇”哪一个比较长？","青竹蛇"],
		["什么地方只要一个人就客满？","马桶"],
		["什么鸡没有翅膀？","田鸡"]
	];

var jzw_idx = -1;

var bTip = false;
	
window.onblur = function () {
	if (count<2){
		var idx = Math.floor(Math.random() * titles.length);	
		document.title = titles[idx];
	}else{
		jzw_idx = Math.floor(Math.random() * jzw.length);	
		document.title = "Q:"+jzw[jzw_idx][0];
	}
}

window.onfocus = function () {
	if (jzw_idx==-1){
		document.title = "亲，欢迎你回来";
		count++;
	}else{
		document.title = "A:"+jzw[jzw_idx][1];	
		if (!bTip){
			//alert('你真是一个善于观察的人');
			bTip = true;
		}
	}
}
