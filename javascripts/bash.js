/**
 * bash.js
 * 
 * version: 0.0.1
 * 
 */
out = function(s,css){
	if (css){
		console.log(s,css);
	}else{
		console.log(s);
	}
} 

ua = navigator.userAgent.toLowerCase();
	
Bash = function(){

	ls=function(){
		out('blog list: ');
		out('1.  %c给blog增加https %chttp://blog.kyletang.work/index.php/2015/08/26/blog_via_https/', 'color:red' , 'color:black' );
		out('2.  %cWindows8或10中文语言默认美式键盘 %chttp://blog.kyletang.work/index.php/2015/08/20/windows8or10zh_cn_us_keyboard/', 'color:red' , 'color:black' );
		out('3.  %c部署shadowsocks服务端 %chttp://blog.kyletang.work/index.php/2015/08/11/shadowsocks-deploy-server/', 'color:red' , 'color:black' );
		out('4.  %clinux 更换软件源后 apt-get GPG错误 %chttp://blog.kyletang.work/index.php/2015/08/11/linux-apt-get-gpg-error/', 'color:red' , 'color:black' );
		out('5.  %cMac OS X 10.8 常用软件 %chttp://blog.kyletang.work/index.php/2013/03/17/mac-os-x-10-8-%e5%b8%b8%e7%94%a8%e8%bd%af%e4%bb%b6/', 'color:red' , 'color:black' );
		out('6.  %cSSH通过公私钥登陆linux服务器，免用户名和密码 %chttp://blog.kyletang.work/index.php/2012/09/20/ssh_logon/', 'color:red' , 'color:black' );
		out('7.  %c开启Nginx的目录文件列表功能 %chttp://blog.kyletang.work/index.php/2012/09/18/nginx_autoindex/', 'color:red' , 'color:black' );
		out('8.  %cnginx禁止ip直接访问80 %chttp://blog.kyletang.work/index.php/2012/09/17/nginx_orbidden80/', 'color:red' , 'color:black' );
		out('9.  %c最近VPS快到期了，还没决定好要用哪家呢，昨天做了一个延迟的对比测试 %chttp://blog.kyletang.work/index.php/2012/09/13/vps_delaytime_compare/', 'color:red' , 'color:black' );
		out('10.  %c为vps的nginx配置反向代理访问国外网站 %chttp://blog.kyletang.work/index.php/2012/09/12/vps_nginx_proxy/', 'color:red' , 'color:black' );
		/*
		jQuery.getFeed({
			url: 'http://blog.kyletang.work/index.php/feed/',
			success: function(feed){
				$.each(feed.items, function(i, item){
					out((i+1)+'. %c '+item.title+' '+item.link,'color:red');
				});
			} 
		});
		*/
	}
	
	help=function(){
		out('BUILTIN COMMANDS: ');
		out('  help()  : call me ');
		out('  ls()    : list blogs ');
		//out('  head()  : list blogs , head -n 10');
		//out('  tail()  : list blogs , tail -n 10');
	}
	
	this.init();
}

Bash.prototype = {
	homepage : 'http://blog.kyletang.work',
	feedjson : 'http://blog.kyletang.work/index.php/feed/json',
	name : 'blog console shell ( like C shell )',
	init : function(){
		
		out('logon as: guest');
		out('guest@blog.kyletang.work\'s password:');
		
		out('\n'+this.name+' init... \n\nguest@blog.kyletang.work $ ');
		
		console.log('\ntips: type %c help() %c and press enter key to start ', 'color:red' , 'color:black' );
	}
}

new Bash();