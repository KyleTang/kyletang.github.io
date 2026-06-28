function js_diff_tip(o,type,display){
	if (display){
		var tip ;
		//remove
		if (type==1){
			tip = "移除内容"
		//ddd
		}else if (type==2){
			tip = o.previousSibling.innerText;
			if (tip){
				tip = "修改前：<br/>"+ tip;
			}else{
				tip = "新增内容"
			}
		}

		//alert('lala: '+);
		var left = o.offsetLeft;
		var top = o.offsetTop+o.offsetHeight;
		var div = $("#diff-rm-div");
		div.css("position","absolute");
		div.css({'left': left+'px','top': top+'px'});
		div.html(tip);
		div.show();
	}else{
		$("#diff-rm-div").hide();
	}

	//clientX和.clientY
}

function js_diff_css(v0){
	/*
	var v = v.replace(/{{/g,'<span class="diff-rm" '
		+' onmousemove="js_diff_tip(this,1,true)" '
		+' onmouseout="js_diff_tip(this,1,false)" >');
	v = v.replace(/}}/g,'</span>');
	v = v.replace(/\[\[/g,'<span class="diff-add" '
		+' onmousemove="js_diff_tip(this,2,true)" '
		+' onmouseout="js_diff_tip(this,2,false)" >');
	v = v.replace(/\]\]/g,'</span>');
	*/
	var v = htmlEscapeAll(v0);
	v = v.replace(/{{/g,'<span class="diff-rm" '
		+' onmousemove="js_diff_tip(this,1,true)" '
		+' onmouseout="js_diff_tip(this,1,false)" >');
	v = v.replace(/}}\[\[/g,'</span><span class="diff-mod" '
		+' onmousemove="js_diff_tip(this,2,true)" '
		+' onmouseout="js_diff_tip(this,2,false)" >');
	v = v.replace(/\[\[/g,'<span class="diff-add" '
		+' onmousemove="js_diff_tip(this,2,true)" '
		+' onmouseout="js_diff_tip(this,2,false)" >');
	v = v.replace(/\]\]/g,'</span>');
	v = v.replace(/}}/g,'</span>');
	return v;
}

		
function htmlEscapeAll(o){
	return o.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br/>');
}

function htmlEscapeAmp(o){
	return o.replace(/&/g,'&amp;');
}

function js_diff_findeqpos(left,right,ipre,jpre,i,j,imax,jmax){
	var retFound=false,reti=-1,retj=-1,retv=0;
	var id,jd;
	//从前往后找，找到left和right里第一个匹配的字符
	for(id=i;id<=imax;id++){
		for(jd=j;jd<=jmax;jd++){
			if (left[id]==right[jd]){
				retFound=true;
				reti=id;
				retj=jd;
				retv=(reti-ipre)*(reti-ipre)+(retj-jpre)*(retj-jpre);
				break;
			}
		}
		if (retFound){break};
	}

	return {
		"found":retFound,
			"i":reti,
			"j":retj,
			"v":retv
		};
}

function js_diff(left,right){
	var diff='';
	var i=0,j=0,ipre=-1,jpre=-1,k=0;
	var imax=left.length-1;
	var jmax=right.length-1;
	var itmp='',jtmp='',tmp='';

	while(i<=imax || j<=jmax){
		if (left[i]==right[j]){
			if (itmp!==''){
				itmp = "{{" + itmp + "}}";
			}
			if (jtmp!==''){
				jtmp = "[[" + jtmp + "]]";
			}
			diff = diff + itmp + jtmp + left[i];
			itmp = '';
			jtmp = '';
			ipre=i;
			jpre=j;
			i++;
			j++;
		}else{
			var pos = js_diff_findeqpos(left,right,ipre,jpre,i,j,imax,jmax);
			if (pos.found){
				var id=pos.i,jd=pos.j,minv=pos.v;
				while(true){
					var pos1 = js_diff_findeqpos(left,right,ipre,jpre,id+1,j,imax,jd-1);
					if (pos1.found&&pos1.v<=minv){
						id=pos1.i;
						jd=pos1.j;
						minv=pos1.v;
					}else{
						break;
					}
				}

				itmp = left.substring(i,id);
				jtmp = right.substring(j,jd);
				i = id;
				j = jd;
				continue;
			}else{
				//没有找到相等字符
				itmp = left.substring(i,imax+1);
				jtmp = right.substring(j,jmax+1);

				if (itmp!==''){
					itmp = "{{" + itmp + "}}";
				}
				if (jtmp!==''){
					jtmp = "[[" + jtmp + "]]";
				}
				diff = diff + itmp + jtmp;

				break;
			}
		}
	}

	return diff;
}
