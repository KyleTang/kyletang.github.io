function js_diff_test(){
	var data=[
		['a'
		,''
		,'{{a}}'
		],

		['a'
		,'a'
		,'a'
		],

		['a'
		,'b'
		,'{{a}}[[b]]'
		],

		['abc'
		,'bcd'
		,'{{a}}bc[[d]]'
		],

		['abc'
		,'axbd'
		,'a[[x]]b{{c}}[[d]]'
		],

		['abc'
		,'axxxxbd'
		,'a[[xxxx]]b{{c}}[[d]]'
		],

		['abcdfsdfere'
		,'abxxcdfdfxxxre'
		,'ab[[xx]]cdf{{s}}df{{e}}[[xxx]]re'
		],

		['abc'
		,'cba'
		,'{{a}}[[c]]b{{c}}[[a]]'
		],

		['abc'
		,'cdba'
		,'{{a}}[[cd]]b{{c}}[[a]]'
		,'{{ab}}c[[dba]]'
		],

		['xabc'
		,'xcba'
		,'x{{a}}[[c]]b{{c}}[[a]]'
		],

		['abc'
		,'acba'
		,'a{{b}}c[[ba]]'
		],

		['start'
		,'end'
		,'{{start}}[[end]]'
		]
	];

	var v;
	var vall='',out;
	var countOk=0,countFail=0,countWarn=0;
	for (i=0;i<data.length; i++){
		v = js_diff(data[i][0],data[i][1])
		out = "------------\n"
				+ "字符串1: "+data[i][0] + "\n"
				+ "字符串2: "+data[i][1] + "\n"
				+ "预期结果: "+data[i][2] + "\n"
				+ "比较结果: "+v + "\n";
		if (v!==data[i][2]){
			if (v==data[i][3]){
				vall = vall + out + "---Warnning!!!----\n";
				countWarn++;
			}else{
				vall = vall + out + "---Fail*******----\n";
				countFail++;
			}
		}else{
			vall = vall + out + "---OK----\n";;
			countOk++;
		}
	}
	return "pass: "+countOk+", fail: "+countFail+", warn: "+countWarn+"\n"+vall;
}
