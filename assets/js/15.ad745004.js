(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{429:function(e,t,a){e.exports=a.p+"assets/img/aptgetnopubkey.cd697aa6.png"},464:function(e,t,a){"use strict";a.r(t);var s=a(62),n=Object(s.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"ubuntu-apt-get出错记录"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ubuntu-apt-get出错记录"}},[e._v("#")]),e._v(" Ubuntu apt-get出错记录")]),e._v(" "),s("h2",{attrs:{id:"解决ubuntu的apt-get的update子命令提示没有可用的公钥"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解决ubuntu的apt-get的update子命令提示没有可用的公钥"}},[e._v("#")]),e._v(" 解决Ubuntu的apt-get的update子命令提示没有可用的公钥")]),e._v(" "),s("p",[e._v("2016.07.08")]),e._v(" "),s("h3",{attrs:{id:"问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#问题"}},[e._v("#")]),e._v(" 问题")]),e._v(" "),s("p",[e._v("apt-get update 或者aptitude update出现以下错误：以下ID的密钥没有可用的公钥")]),e._v(" "),s("p",[e._v("如图：")]),e._v(" "),s("p",[s("img",{attrs:{src:a(429),alt:"img"}})]),e._v(" "),s("h3",{attrs:{id:"解决方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解决方法"}},[e._v("#")]),e._v(" 解决方法")]),e._v(" "),s("p",[e._v("1，从任何一个key server获得缺失的公钥1397BC53640DB551。")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("gpg --keyserver keyserver.ubuntu.com --recv-keys 1397BC53640DB551\n")])])]),s("p",[e._v("2，导入公钥1397BC53640DB551 。")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("gpg -a --export 1397BC53640DB551 | sudo apt-key add -\n")])])]),s("p",[e._v("注意：keyserver，官方地址为subkeys.pgp.net，但是国内访问不了")]),e._v(" "),s("h3",{attrs:{id:"国内可用key-server列表"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#国内可用key-server列表"}},[e._v("#")]),e._v(" 国内可用key server列表")]),e._v(" "),s("p",[e._v("keyserver.ubuntu.com\npgp.mit.edu\nsubkeys.pgp.net\nwww.gpg-keyserver.de")]),e._v(" "),s("h2",{attrs:{id:"linux-更换软件源后-apt-get-gpg错误"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#linux-更换软件源后-apt-get-gpg错误"}},[e._v("#")]),e._v(" linux 更换软件源后 apt-get GPG错误")]),e._v(" "),s("p",[e._v("今天特别郁闷，更换了 debian squeeze 6 的源之后，一直 update 出 gpg 错误，从来没遇到啊。\n源地址：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("deb http://ftp.debian.org/debian/ squeeze main contrib non-free\n")])])]),s("p",[e._v("执行 apt-get update")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("root@vps:/etc/apt# apt-get update\nGet:1 http://ftp.debian.org squeeze Release.gpg [1655 B]\nIgn http://ftp.debian.org/debian/ squeeze/contrib Translation-en\nIgn http://ftp.debian.org/debian/ squeeze/main Translation-en\nIgn http://ftp.debian.org/debian/ squeeze/non-free Translation-en\nGet:2 http://ftp.debian.org squeeze Release [96.0 kB]\nIgn http://ftp.debian.org squeeze Release\nIgn http://ftp.debian.org squeeze/main amd64 Packages/DiffIndex\nIgn http://ftp.debian.org squeeze/contrib amd64 Packages/DiffIndex\nIgn http://ftp.debian.org squeeze/non-free amd64 Packages/DiffIndex\nHit http://ftp.debian.org squeeze/main amd64 Packages\nHit http://ftp.debian.org squeeze/contrib amd64 Packages\nHit http://ftp.debian.org squeeze/non-free amd64 Packages\nFetched 1656 B in 1s (1297 B/s)\nReading package lists... Done\nW: GPG error: http://ftp.debian.org squeeze Release: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY AED4B06F473041FA NO_PUBKEY 64481591B98321F9\n")])])]),s("p",[e._v("经过几经周折，修复方法如下：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('root@vps:/etc/apt# gpg --keyserver subkeys.pgp.net --recv-key 64481591B98321F9\ngpg: requesting key B98321F9 from hkp server subkeys.pgp.net\ngpg: /root/.gnupg/trustdb.gpg: trustdb created\ngpg: key B98321F9: public key "Squeeze Stable Release Key <debian-release@lists.debian.org>" imported\ngpg: no ultimately trusted keys found\ngpg: Total number processed: 1\ngpg: imported: 1 (RSA: 1)\nroot@vps:/etc/apt# gpg --export --armor B98321F9 | sudo apt-key add -\nOK\nroot@vps:/etc/apt# gpg --keyserver subkeys.pgp.net --recv-key AED4B06F473041FA\ngpg: requesting key 473041FA from hkp server subkeys.pgp.net\ngpg: key 473041FA: public key "Debian Archive Automatic Signing Key (6.0/squeeze) <ftpmaster@debian.org>" imported\ngpg: no ultimately trusted keys found\ngpg: Total number processed: 1\ngpg: imported: 1 (RSA: 1)\nroot@vps:/etc/apt# gpg --export --armor 473041FA | sudo apt-key add -\nOK\n')])])]),s("p",[e._v("总算雨过天晴。")]),e._v(" "),s("p",[s("strong",[e._v("总结，要点")]),e._v("\ngpg –keyserver subkeys.pgp.net –recv-key XXXXXXXX 执行非常非常慢，需要耐心等待，我就是以为执行不过去，所以折腾半天。")]),e._v(" "),s("p",[e._v("参考链接 http://blog.sina.com.cn/s/blog_4c451e0e0100gce2.html")])])}),[],!1,null,null,null);t.default=n.exports}}]);