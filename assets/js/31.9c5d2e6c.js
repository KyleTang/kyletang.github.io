(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{481:function(s,a,t){"use strict";t.r(a);var n=t(62),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"awk使用入门"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#awk使用入门"}},[s._v("#")]),s._v(" awk使用入门")]),s._v(" "),t("p",[s._v("2018.03.28")]),s._v(" "),t("h2",{attrs:{id:"基本语法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#基本语法"}},[s._v("#")]),s._v(" 基本语法")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("cat file | awk 'BEGIN{a}  {ACTION}  END {c}'\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("a是开始段，最先执行，只执行一次")]),s._v(" "),t("p",[s._v("action是执行段，file文件有多少行，就执行多少次")]),s._v(" "),t("p",[s._v("c是末尾段，最后执行，只执行一次")]),s._v(" "),t("p",[s._v("翻译成for循环的伪代码")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("//执行BEGIN代码a\n//此部分可省略\n\nfor(line in lines)\n{\n    //执行ACTION代码\n}\n\n//执行END代码c\n//此部分可省略\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br")])]),t("h2",{attrs:{id:"直接看例子"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#直接看例子"}},[s._v("#")]),s._v(" 直接看例子")]),s._v(" "),t("h3",{attrs:{id:"_1-统计行数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-统计行数"}},[s._v("#")]),s._v(" 1. 统计行数")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("cat 001.txt | awk '{c++;} END { printf \"lineCount=%d\\n\",c }'\n\n#解释说明：\naction段代码，执行了累加操作，END段代码格式化输出了行数，printf的语法类似c和java\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h3",{attrs:{id:"_2-统计求和-001-txt里每行一个数字"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-统计求和-001-txt里每行一个数字"}},[s._v("#")]),s._v(" 2. 统计求和，001.txt里每行一个数字")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("cat 001.txt | awk '{sum+=$1;} END { printf \"sum=%d\\n\",sum }'\n\n#解释说明：$1 表示第一列\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h3",{attrs:{id:"_3-分段求和-if语句例子"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-分段求和-if语句例子"}},[s._v("#")]),s._v(" 3. 分段求和，if语句例子")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("# printf 和C、java里的格式化很相似\ncat 001.txt | awk '{ if ($1<500) {sum1+=$1;} else if ($1>=500&&$1<1200) { sum2+=$1;} else sum3+=$1; } END { printf \"sum1=%d, sum2=%d, sum3=%d\\n\",sum1,sum2,sum3 }'\n\n#解释说明：if语句的语法类似java和c\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h3",{attrs:{id:"_4-取002-txt的第二列-逗号是分隔符"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-取002-txt的第二列-逗号是分隔符"}},[s._v("#")]),s._v(" 4. 取002.txt的第二列，逗号是分隔符")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("cat 002.txt\n#执行结果如下\n1,2,3\n4,5,6\n\n#print是直接输出，FS指定分隔符\ncat 002.txt | awk 'BEGIN {FS=\",\"} {print $2}'\n#执行结果如下\n2\n5\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br")])]),t("h3",{attrs:{id:"_5-对001-txt进行统计分析"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-对001-txt进行统计分析"}},[s._v("#")]),s._v(" 5. 对001.txt进行统计分析")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('#BEGIN输出表头\ncat 001.txt | awk \'BEGIN{min=100000000;max=0; print "sum,count,avg"} { if ($1<min){min=$1}; if ($1>max) {max=$1};if ($1<300) {sum1+=$1;c1++;} else if ($1>=300&&$1<1000) { sum2+=$1;c2++;} else {sum3+=$1;c3++;} } END { printf "%d,%d,%d\\n%d,%d,%d\\n%d,%d,%d\\nmin=%d,max=%d\\n",sum1,c1,sum1/c1 ,sum2,c2,sum2/c2 ,sum3,c3,sum3/c3, min,max }\'\n#执行结果如下\nsum,count,avg\n264709313,2471574,107\n10764453,27811,387\n3044267,1641,1855\nmin=62,max=5466\n\n#如果脚本太长可以把脚本写到文件里\ncat 001.txt | awk -f awk.file\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("h2",{attrs:{id:"参考资料"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考资料"}},[s._v("#")]),s._v(" 参考资料")]),s._v(" "),t("p",[s._v("AWK程序设计语言 "),t("a",{attrs:{href:"http://awk.readthedocs.io/en/latest/index.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("http://awk.readthedocs.io/en/latest/index.html"),t("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=e.exports}}]);