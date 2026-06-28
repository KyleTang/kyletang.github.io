// 获取操作系统信息 
function getOsInfo() {
	var ua = navigator.userAgent;
	var userAgent = navigator.userAgent.toLowerCase();
	var name = 'Unknown';
	var version = 'Unknown';
	var devType = 'Unknown';
	
	var idx0 = ua.indexOf("(");
	var idx1 = ua.indexOf(")",idx0);
	var devInfo = ua.substring(idx0+1,idx1);
	
	if (userAgent.indexOf('win') > -1) {
		name = 'Windows';
		devType = 'Windows';
		if (userAgent.indexOf('windows nt 5.0') > -1) {
			version = '2000';
		} else if (userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('windows nt 5.2') > -1) {
			version = 'XP';
		} else if (userAgent.indexOf('windows nt 6.0') > -1) {
			version = 'Vista';
		} else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
			version = '7';
		} else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 8') > -1) {
			version = '8';
		} else if (userAgent.indexOf('windows nt 6.3') > -1) {
			version = '8.1';
		} else if (userAgent.indexOf('windows nt 10') > -1) {
			version = '10';
		} else {
			version = 'Unknown';
		}
	} else if (userAgent.indexOf('iphone') > -1) {
		//Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.23(0x1800172a) NetType/WIFI Language/zh_CN
		name = 'iOS';
		devType = 'iPhone';
		var tag1 = "iPhone OS ";
		var idx1 = ua.indexOf(tag1);
		var idx2 = ua.indexOf(" like Mac");
		version = ua.substring(idx1+tag1.length,idx2);		
	} else if (userAgent.indexOf('mac') > -1) {
		//Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50
		name = 'Mac OS';
		devType = 'Mac';
		var strArr = devInfo.split(";");
		for(var idx in strArr)
		{
			var idx0 = strArr[idx].indexOf("Mac OS X");
			if (idx0>=0)
			{
				version = strArr[idx].substring(idx0+9);
			}
		}
	} else if (userAgent.indexOf('harmonyos') > -1) {
		//Mozilla/5.0 (Linux; Android 12; HarmonyOS; ALN-AL10; HMSCore 6.14.0.322) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.196 HuaweiBrowser/15.0.7.301 Mobile Safari/537.36
		name = 'HarmonyOS';
		devType = 'HarmonyOS';
		var idx0 = userAgent.indexOf('android');
		var idx1 = userAgent.indexOf(';',idx0);
		var andVer = userAgent.substring(idx0+8,idx1);
		version = "(like Android "+andVer+")";
	} else if (userAgent.indexOf('openharmony') > -1){
		//Mozia/5.0 (Phone; OpenHarmony 5.0) AppleWebKit/537.36(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 ArkWeb/4.1.6.1 Mobile HuaweiBrowser/5.0.3.351
		name = 'OpenHarmony';
		devType = 'OpenHarmony';
		var idx0 = userAgent.indexOf('openharmony ');
		var idx1 = userAgent.indexOf(')',idx0);
		version = userAgent.substring(idx0+12,idx1);
	} else if (userAgent.indexOf('linux') > -1) {
		if (userAgent.indexOf('android') > -1) {
			name = 'Android';
			//Mozilla/5.0 (Linux; Android 11; M2002J9E Build/RKQ1.200826.002; wv) 
			var idx0 = userAgent.indexOf('android');
			var idx1 = userAgent.indexOf(';',idx0);
			version = userAgent.substring(idx0+8,idx1);
			devType = 'Android';
		} else {
			name = 'Linux';
			devType = 'Linux';
		}
	} else if (userAgent.indexOf('x11') > -1 || userAgent.indexOf('unix') > -1 || userAgent.indexOf('sunname') > -1 || userAgent.indexOf('bsd') > -1) {
		name = 'Unix';
		devType = 'Unix';
	}
	return { name, version, devType };
}

/**
 * 获取当前设备UA信息
 */
function getUserAgentInfo() {
	return getUserAgentObj(navigator.userAgent);
}

/**
 * 根据ua字符串解析ua信息
 */
function getUserAgentObj(userAgent){
	
	ua = userAgent.toLowerCase();
	
	//厂商
	var vendorName = "";
	//名称
	var appName = "";
	//内核
	var appCore = "";
	//版本
	var appVersion = "";
	//是否移动设备
	var mobile = false;
	
	var deviceName = "";

	vendorName=navigator.vendor;

	if (false){
	//if (!navigator.userAgentData){
		appName = navigator.userAgentData.brands[1].brand;
		appVersion = navigator.userAgentData.brands[1].version;
		mobile = navigator.userAgentData.mobile;
	}else{
		
		if (ua.indexOf('mobile') > -1){
			mobile = true;
		}
		
		//数据来源参考：http://tools.jb51.net/table/useragent
		
		//userAgent 不完全规则
		//Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36
		//----------------------------------------||--------------------------------------||---------------------------------
		//			idx0						idx1				 idx2			  idx3
		
		
		//Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0;
		if (userAgent.indexOf('MSIE') > -1){
			vendorName="微软";
			appName="IE";
			var idx0 = userAgent.indexOf('Trident');
			if (idx0>-1){
				appCore=userAgent.substring(idx0).replace(/;/,"");
			}else{
				appCore="Trident";
			}		

			var idx1 = userAgent.indexOf('MSIE');	
			var idx2 = userAgent.indexOf(';',idx1);				
			appVersion=userAgent.substring(idx1+5,idx2);
		}else if (userAgent.indexOf('rv:11.0') > -1){
			//IE 11 、兼容性模式
			// Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko
			vendorName="微软";
			appName="IE";
			appCore="Trident/7.0";
			appVersion="11";
		}else{
			var idx0 = userAgent.indexOf("(");
			var idx1 = userAgent.indexOf(")");
			var idx2 = userAgent.indexOf("(",idx1+2);
			var idx3 = userAgent.indexOf(")",idx2);
			var p1 = userAgent.substring(idx0+1,idx1);   //Windows NT 10.0; Win64; x64
			var p2 = userAgent.substring(idx1+2,idx2-1); //AppleWebKit/537.36
			var p3 = userAgent.substring(idx3+2);  //Chrome/91.0.4472.124 Safari/537.36
			
			p3 = p3.replace(/\s*Version\/[0-9\.]+\s*/,"");
			var p30 = p3;
			var i0 = p3.indexOf(" ");
			if (i0>-1){
				p30 = p3.substring(0,i0);
			}
			var nameVer1 = p30;
			var i1 = p30.indexOf("/");
			var version1 = p30.substring(i1+1);
			
			if (p3.indexOf("Firefox")>-1){
				//Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0
				vendorName="Mozilla";
				appName="火狐浏览器";
				appCore=nameVer1;
				var j0 = p3.indexOf("Firefox");
				appVersion=p3.substring(p3.indexOf("/",j0)+1);
			}else if (p3.indexOf('SE 2.X MetaSr') > -1){
				//Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.81 Safari/537.36 SE 2.X MetaSr 1.0
				vendorName="搜狗";
				appName="搜狗浏览器";
				appCore=nameVer1;
				appVersion=version1;
			}else if (p3.indexOf('HuaweiBrowser') > -1){
				vendorName="华为";
				appName="华为浏览器";
				appCore=nameVer1;
				if (userAgent.indexOf("HarmonyOS")>0){
					//Mozilla/5.0 (Linux; Android 10; HarmonyOS; OCE-AN10; HMSCore 5.3.0.312) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.93 HuaweiBrowser/11.1.2.301 Mobile Safari/537.36
					var j0 = p3.indexOf("HuaweiBrowser");
					var j1 = p3.indexOf("/",j0);
					var j2 = p3.indexOf(" ",j1);
					appVersion=p3.substring(j1+1,j2);
				}else{
					//Mozia/5.0 (Phone; OpenHarmony 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 ArkWeb/4.1.6.1 Mobile HuaweiBrowser/5.0.3.351
					var j0 = p3.indexOf("HuaweiBrowser");
					var j1 = p3.indexOf("/",j0);
					appVersion=p3.substring(j1+1);
				}				
			}else if (p3.indexOf('MiuiBrowser') > -1){
				//Mozilla/5.0 (Linux; U; Android 11; zh-cn; M2002J9E Build/RKQ1.200826.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/14.9.6
				vendorName="小米";
				appName="小米Miui浏览器";
				appCore=nameVer1;
				var j0 = p3.indexOf("MiuiBrowser");
				var j1 = p3.indexOf("/",j0);
				var j2 = p3.indexOf(" ",j1);
				if (j2>-1){
					appVersion=p3.substring(j1+1,j2);
				}else{
					appVersion=p3.substring(j1+1);
				}
			}else if (p3.indexOf('LBBROWSER') > -1){
				//Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36 LBBROWSER
				vendorName="猎豹";
				appName="猎豹浏览器";
				appCore=nameVer1;
				var j0 = p3.indexOf("LBBROWSER");
				var j1 = p3.indexOf("/",j0);
				if (j1>-1){
					var j2 = p3.indexOf(" ",j1);
					if (j2>-1){
						appVersion=p3.substring(j1+1,j2);
					}else{
						appVersion=p3.substring(j1+1);
					}
				}else{
					appVersion=version1;
				}
				
			}else if (p3.indexOf('Edg/') > -1){
				//Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64
				vendorName="微软";
				appName="Edge浏览器";
				appCore=nameVer1;
				var j0 = p3.indexOf("Edg");
				var j1 = p3.indexOf("/",j0);
				var j2 = p3.indexOf(" ",j1);
				if (j2>-1){
					appVersion=p3.substring(j1+1,j2);
				}else{
					appVersion=p3.substring(j1+1);
				}
				
			}else if (p3.indexOf('OPR/') > -1){
				//Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 OPR/77.0.4054.172
				vendorName="Opera";
				appName="Opera";
				appCore=nameVer1;
				var j0 = p3.indexOf("OPR");
				var j1 = p3.indexOf("/",j0);
				var j2 = p3.indexOf(" ",j1);
				if (j2>-1){
					appVersion=p3.substring(j1+1,j2);
				}else{
					appVersion=p3.substring(j1+1);
				}
				
			}else if (p3.indexOf('MicroMessenger/') > -1){
				//Mozilla/5.0 (Linux; Android 10; ELS-AN10 Build/HUAWEIELS-AN10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045709 Mobile Safari/537.36 MMWEBID/5380 MicroMessenger/8.0.6.1900(0x28000669) Process/tools WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64
				vendorName="腾讯";
				appName="微信浏览器";
				var j0 = p3.indexOf("MicroMessenger");
				var j1 = p3.indexOf("/",j0);
				var j2 = p3.indexOf("(",j0);
				var j3 = p3.indexOf(" ",j1);			
				appCore=p3.substring(j0,j3);
				appVersion=p3.substring(j1+1,j2);			
			}else if (p3.indexOf('QQBrowser/') > -1){
				//Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3870.400 QQBrowser/10.8.4405.400
				vendorName="腾讯";
				appName="QQ浏览器";
				var j0 = p3.indexOf("QQBrowser");
				var j1 = p3.indexOf("/",j0);
				var j2 = p3.indexOf(" ",j1);			
				appCore=nameVer1;
				if (j2>-1){
					appVersion=p3.substring(j1+1,j2);
				}else{
					appVersion=p3.substring(j1+1);
				}		
			}else if (p3.indexOf('Quark/') > -1){
				//Mozilla/5.0 (Linux; U; Android 10; zh-Hans-CN; ELS-AN10 Build/HUAWEIELS-AN10) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.108 Quark/5.1.5.183 Mobile Safari/537.36
				vendorName="夸克";
				appName="夸克浏览器";
				var j0 = p3.indexOf("Quark");
				var j1 = p3.indexOf("/",j0);
				var j2 = p3.indexOf(" ",j1);			
				appCore=nameVer1;
				if (j2>-1){
					appVersion=p3.substring(j1+1,j2);
				}else{
					appVersion=p3.substring(j1+1);
				}		
			}else if (p3.indexOf('Baidu;') > -1){
				//Mozilla/5.0 (Linux; Android 10; ELS-AN10 Build/HUAWEIELS-AN10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/76.0.3809.89 Mobile Safari/537.36 T7/11.25 SearchCraft/3.7.1 (Baidu; P1 10)
				vendorName="百度";
				appName="简单搜索";
				var i0 = p3.indexOf("Safari");
				var i1 = p3.indexOf(" ",i0);
				var i2 = p3.indexOf(" ",i1+1);
				appCore=p3.substring(i1+1,i2);
				
				var j0 = p3.indexOf("SearchCraft");
				var j1 = p3.indexOf("/",j0);
				var j2 = p3.indexOf(" ",j1);
				if (j2>-1){
					appVersion=p3.substring(j1+1,j2);
				}else{
					appVersion=p3.substring(j1+1);
				}		
			}else if (p1.indexOf('Macintosh')>-1) {
				//Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15
				var p3x = p3.replace(/Version\/[0-9\.]+/,"").replace(/Safari\/[0-9\.]+/,"").replace(/\s+/,"");
				if (p3x.length==0){
					deviceName = "Mac";
					vendorName="苹果";
					appName="Safari";
					
					var j0 = p3.indexOf("Safari");
					appCore = p3.substring(j0);
					appVersion=appCore.substring(appCore.indexOf("/")+1);
				}else{
					p3x=p3x.replace(/\s*Chrome\/[0-9\.]+\s*/,"");
					if (p3x.length==0){
						//Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36
						vendorName="谷歌";
						appName="谷歌浏览器";
						appCore=nameVer1;
						appVersion=version1;
					}else{
						if (p3.indexOf("Chrome")>-1){
							vendorName="未知";
							appName="基于谷歌内核的浏览器";
							appCore=nameVer1;
							appVersion=version1;
						}else{
							vendorName="未知";
							appName="未知";
							appCore=nameVer1;
							appVersion=version1;
						}
					}
				}
			}else{
				//谷歌内核浏览器
				if (p3.indexOf("Chrome")>-1){
					//删除谷歌和safari537.36标识后，如果还没有
					p3x=p3.replace(/\s*Chrome\/[0-9\.]+\s*/,"").replace(/\s*Safari\/537.36\s*/,"");
					if (p3x.length==0){
						if (p1.indexOf("x64")>-1){
							//Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36
							vendorName="谷歌";
							appName="谷歌浏览器";
							appCore=nameVer1;
							appVersion=version1;
						}else{
							//Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36
							vendorName="360";
							appName="360浏览器";
							appCore=nameVer1;
							appVersion=version1;
						}
					}else{
						vendorName="未知";
						appName="基于谷歌内核的浏览器";
						appCore=nameVer1;
						appVersion=version1;
					}
				}else{
					vendorName="未知";
					appName="未知";
					appCore=nameVer1;
					appVersion=version1;
				}
			}
		} 
	}
	
	return {
		"vendorName":vendorName,
		"appName":appName,
		"appCore":appCore,
		"appVersion":appVersion,
		"mobile":mobile
	}
}