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
		jQuery.getFeed({
			url: 'http://blog.kyletang.work/index.php/feed/',
			success: function(feed){
				$.each(feed.items, function(i, item){
					out((i+1)+'. %c '+item.title+' '+item.link,'color:red');
				});
			} 
		});	
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