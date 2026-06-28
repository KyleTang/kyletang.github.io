function test_getUserAgentInfo_userAgent() {
	var testCase = [
		{
			"ua":"UA字符串",
			"vendorName":"厂商名",
			"appName":"浏览器名",
			"appCore":"浏览器内核",
			"appVersion":"浏览器版本",
			"mobile":false
		},
		{
			"ua":"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
			"vendorName":"微软",
			"appName":"IE",
			"appCore":"Trident/7.0",
			"appVersion":"11",
			"mobile":false			
		},
		{
			"ua":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15",
			"vendorName":"苹果",
			"appName":"Safari",
			"appCore":"Safari/605.1.15",
			"appVersion":"605.1.15",
			"mobile":false			
		},
		{
			"ua":"Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0",
			"vendorName":"Mozilla",
			"appName":"火狐浏览器",
			"appCore":"Gecko/20100101",
			"appVersion":"88.0",
			"mobile":false			
		},
		{
			"ua":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.81 Safari/537.36 SE 2.X MetaSr 1.0",
			"vendorName":"搜狗",
			"appName":"搜狗浏览器",
			"appCore":"Chrome/72.0.3626.81",
			"appVersion":"72.0.3626.81",
			"mobile":false			
		},
		{
			"ua":"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			"vendorName":"谷歌",
			"appName":"谷歌浏览器",
			"appCore":"Chrome/91.0.4472.124",
			"appVersion":"91.0.4472.124",
			"mobile":false			
		},
		{
			"ua":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
			"vendorName":"360",
			"appName":"360浏览器",
			"appCore":"Chrome/86.0.4240.198",
			"appVersion":"86.0.4240.198",
			"mobile":false			
		},
		{
			"ua":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64",
			"vendorName":"微软",
			"appName":"Edge浏览器",
			"appCore":"Chrome/91.0.4472.124",
			"appVersion":"91.0.864.64",
			"mobile":false			
		},
		{
			"ua":"Mozilla/5.0 (Linux; Android 10; HarmonyOS; OCE-AN10; HMSCore 5.3.0.312) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.93 HuaweiBrowser/11.1.2.301 Mobile Safari/537.36",
			"vendorName":"华为",
			"appName":"华为浏览器",
			"appCore":"Chrome/88.0.4324.93",
			"appVersion":"11.1.2.301",
			"mobile":true			
		},
		{
			"ua":"Mozia/5.0 (Phone; OpenHarmony 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 ArkWeb/4.1.6.1 Mobile HuaweiBrowser/5.0.3.351",
			"vendorName":"华为",
			"appName":"华为浏览器",
			"appCore":"Chrome/114.0.0.0",
			"appVersion":"5.0.3.351",
			"mobile":true			
		},
		{
			"ua":"Mozilla/5.0 (Linux; Android 10; ELS-AN10 Build/HUAWEIELS-AN10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045709 Mobile Safari/537.36 MMWEBID/5380 MicroMessenger/8.0.6.1900(0x28000669) Process/tools WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64",
			"vendorName":"腾讯",
			"appName":"微信浏览器",
			"appCore":"MicroMessenger/8.0.6.1900(0x28000669)",
			"appVersion":"8.0.6.1900",
			"mobile":true			
		},
		{
			"ua":"Mozilla/5.0 (Linux; U; Android 11; zh-cn; M2002J9E Build/RKQ1.200826.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/14.9.6",
			"vendorName":"小米",
			"appName":"小米Miui浏览器",
			"appCore":"Chrome/79.0.3945.147",
			"appVersion":"14.9.6",
			"mobile":true			
		},
		{
			"ua":"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0;",
			"vendorName":"微软",
			"appName":"IE",
			"appCore":"Trident/5.0",
			"appVersion":"9.0",
			"mobile":false			
		},
		{
			"ua":"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
			"vendorName":"微软",
			"appName":"IE",
			"appCore":"Trident",
			"appVersion":"7.0",
			"mobile":false			
		},
		{
			"ua":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 OPR/77.0.4054.172",
			"vendorName":"Opera",
			"appName":"Opera",
			"appCore":"Chrome/91.0.4472.114",
			"appVersion":"77.0.4054.172",
			"mobile":false			
		},
		{
			"ua":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36 LBBROWSER",
			"vendorName":"猎豹",
			"appName":"猎豹浏览器",
			"appCore":"Chrome/57.0.2987.98",
			"appVersion":"57.0.2987.98",
			"mobile":false			
		},
		{
			"ua":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3870.400 QQBrowser/10.8.4405.400",
			"vendorName":"腾讯",
			"appName":"QQ浏览器",
			"appCore":"Chrome/70.0.3538.25",
			"appVersion":"10.8.4405.400",
			"mobile":false			
		},
		{
			"ua":"Mozilla/5.0 (Linux; U; Android 10; zh-Hans-CN; ELS-AN10 Build/HUAWEIELS-AN10) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.108 Quark/5.1.5.183 Mobile Safari/537.36",
			"vendorName":"夸克",
			"appName":"夸克浏览器",
			"appCore":"Chrome/78.0.3904.108",
			"appVersion":"5.1.5.183",
			"mobile":true			
		},
		{
			"ua":"Mozilla/5.0 (Linux; Android 10; ELS-AN10 Build/HUAWEIELS-AN10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/76.0.3809.89 Mobile Safari/537.36 T7/11.25 SearchCraft/3.7.1 (Baidu; P1 10)",
			"vendorName":"百度",
			"appName":"简单搜索",
			"appCore":"T7/11.25",
			"appVersion":"3.7.1",
			"mobile":true			
		},
	];
	
	var c = {};
	var i = 1;
	try{
		var cnt=0;
		for (i=1; i<testCase.length; i++ ){
			c = testCase[i];
			
			var retObj = getUserAgentObj(c.ua);
			
			if (retObj.vendorName===c.vendorName&&
				retObj.appName===c.appName&&
				retObj.appCore===c.appCore&&
				retObj.appVersion===c.appVersion&&
				retObj.mobile===c.mobile
				){
				console.debug("passed. ");
				cnt++;
			}else{				
				console.debug("fail. ua="+c.ua);
			}
		}
		console.debug("Test result : "+cnt+" passed / "+(testCase.length-1)+" total");
	}catch(e){
		console.debug("Test error. e="+e);
	}
	
	
}