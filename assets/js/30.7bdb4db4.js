(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{479:function(s,n,a){"use strict";a.r(n);var e=a(62),t=Object(e.a)({},(function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"计算文件的md5、sha1、sha256值"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#计算文件的md5、sha1、sha256值"}},[s._v("#")]),s._v(" 计算文件的MD5、SHA1、SHA256值")]),s._v(" "),a("p",[s._v("2017.12.20")]),s._v(" "),a("h2",{attrs:{id:"_1-windows"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-windows"}},[s._v("#")]),s._v(" 1. windows")]),s._v(" "),a("p",[s._v("自带工具 certutil   或  第三方程序 HashCalc(http://www.slavasoft.com/hashcalc/)")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("certutil -hashfile d:\\file.iso SHA1\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("d:\\file.iso 文件名")]),s._v(" "),a("p",[s._v("SHA1 是算法，算法支持：MD2 MD4 MD5 SHA1 SHA256 SHA384 SHA512")]),s._v(" "),a("p",[s._v("命令帮助：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('certutil /?\n\n动词:\n  -dump             -- 转储配置信息或文件\n  -dumpPFX          -- 转储 PFX 结构\n  -asn              -- 分析 ASN.1 文件\n\n  -decodehex        -- 解码十六进制编码的文件\n  -decode           -- 解码 Base64 编码的文件\n  -encode           -- 将文件编码为 Base64\n\n  -deny             -- 拒绝挂起的申请\n  -resubmit         -- 重新提交挂起的申请\n  -setattributes    -- 为挂起申请设置属性\n  -setextension     -- 为挂起申请设置扩展\n  -revoke           -- 吊销证书\n  -isvalid          -- 显示当前证书部署\n\n  -getconfig        -- 获取默认配置字符串\n  -ping             -- Ping Active Directory 证书服务申请接口\n  -pingadmin        -- Ping Active Directory 证书服务管理接口\n  -CAInfo           -- 显示 CA 信息\n  -ca.cert          -- 检索 CA 的证书\n  -ca.chain         -- 检索 CA 的证书链\n  -GetCRL           -- 获取 CRL\n  -CRL              -- 发布新的 CRL [或仅增量 CRL]\n  -shutdown         -- 关闭 Active Directory 证书服务\n\n  -installCert      -- 安装证书颁发机构证书\n  -renewCert        -- 续订证书颁发机构证书\n\n  -schema           -- 转储证书架构\n  -view             -- 转储证书视图\n  -db               -- 转储原始数据库\n  -deleterow        -- 删除服务器数据库行\n\n  -backup           -- 备份 Active Directory 证书服务\n  -backupDB         -- 备份 Active Directory 证书服务数据库\n  -backupKey        -- 备份 Active Directory 证书服务证书和私钥\n  -restore          -- 还原 Active Directory 证书服务\n  -restoreDB        -- 还原 Active Directory 证书服务数据库\n  -restoreKey       -- 还原 Active Directory 证书服务证书和私钥\n  -importPFX        -- 导入证书和私钥\n  -dynamicfilelist  -- 显示动态文件列表\n  -databaselocations -- 显示数据库位置\n  -hashfile         -- 通过文件生成并显示加密哈希\n\n  -store            -- 转储证书存储\n  -enumstore        -- 枚举证书存储\n  -addstore         -- 将证书添加到存储\n  -delstore         -- 从存储删除证书\n  -verifystore      -- 验证存储中的证书\n  -repairstore      -- 修复密钥关联，或者更新证书属性或密钥安全描述符\n  -viewstore        -- 转储证书存储\n  -viewdelstore     -- 从存储删除证书\n  -UI               -- 调用 CryptUI\n  -attest           -- 验证密钥证明请求\n\n  -dsPublish        -- 将证书或 CRL 发布到 Active Directory\n\n  -ADTemplate       -- 显示 AD 模板\n  -Template         -- 显示注册策略模板\n  -TemplateCAs      -- 显示模板的 CA\n  -CATemplates      -- 显示 CA 的模板\n  -SetCASites       -- 管理 CA 的站点名称\n  -enrollmentServerURL -- 显示、添加或删除与 CA 关联的注册服务器 URL\n  -ADCA             -- 显示 AD CA\n  -CA               -- 显示注册策略 CA\n  -Policy           -- 显示注册策略\n  -PolicyCache      -- 显示或删除注册策略缓存项目\n  -CredStore        -- 显示、添加或删除凭据存储项目\n  -InstallDefaultTemplates -- 安装默认的证书模板\n  -URLCache         -- 显示或删除 URL 缓存项目\n  -pulse            -- 以脉冲方式执行自动注册事件或 NGC 任务\n  -MachineInfo      -- 显示 Active Directory 计算机对象信息\n  -DCInfo           -- 显示域控制器信息\n  -EntInfo          -- 显示企业信息\n  -TCAInfo          -- 显示 CA 信息\n  -SCInfo           -- 显示智能卡信息\n\n  -SCRoots          -- 管理智能卡根证书\n\n  -verifykeys       -- 验证公/私钥集\n  -verify           -- 验证证书，CRL 或链\n  -verifyCTL        -- 验证 AuthRoot 或不允许的证书 CTL\n  -syncWithWU       -- 与 Windows 更新同步\n  -generateSSTFromWU -- 通过 Windows 更新生成 SST\n  -generatePinRulesCTL -- 生成捆绑规则 CTL\n  -downloadOcsp     -- 下载 OCSP 响应并写入目录\n  -generateHpkpHeader -- 使用指定文件或目录中的证书生成 HPKP 头\n  -addEccCurve      -- 添加 ECC 曲线\n  -deleteEccCurve   -- 删除 ECC 曲线\n  -displayEccCurve  -- 显示 ECC 曲线\n  -sign             -- 重新签名 CRL 或证书\n\n  -vroot            -- 创建/删除 Web 虚拟根和文件共享\n  -vocsproot        -- 创建/删除 OCSP Web Proxy 的 Web 虚拟根\n  -addEnrollmentServer -- 添加注册服务器应用程序\n  -deleteEnrollmentServer -- 删除注册服务器应用程序\n  -addPolicyServer  -- 添加策略服务器应用程序\n  -deletePolicyServer -- 删除策略服务器应用程序\n  -oid              -- 显示 ObjectId 或设置显示名称\n  -error            -- 显示错误代码消息文本\n  -getreg           -- 显示注册表值\n  -setreg           -- 设置注册表值\n  -delreg           -- 删除注册表值\n\n  -ImportKMS        -- 为密钥存档导入用户密钥和证书到服务器数据库\n  -ImportCert       -- 将证书文件导入数据库\n  -GetKey           -- 检索存档的私钥恢复 Blob，生成恢复脚本 或恢复存档的密钥\n  -RecoverKey       -- 恢复存档的私钥\n  -MergePFX         -- 合并 PFX 文件\n  -ConvertEPF       -- 将 PFX 文件转换为 EPF 文件\n\n  -add-chain        -- (-AddChain) 添加证书链\n  -add-pre-chain    -- (-AddPrechain) 添加预植证书链\n  -get-sth          -- (-GetSTH) 获取签名树头\n  -get-sth-consistency -- (-GetSTHConsistency) 获取签名树头更改\n  -get-proof-by-hash -- (-GetProofByHash) 获取哈希证明\n  -get-entries      -- (-GetEntries) 获取项\n  -get-roots        -- (-GetRoots) 获取根\n  -get-entry-and-proof -- (-GetEntryAndProof) 获取项和证明\n  -VerifyCT         -- 验证证书 SCT\n  -?                -- 显示该用法消息\n\n\nCertUtil -?              -- 显示动词列表(命名列表)\nCertUtil -dump -?        -- 显示 "dump" 动词的帮助文本\nCertUtil -v -?           -- 显示所有动词的所有帮助文本\n\nCertUtil: -? 命令成功完成。\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br"),a("span",{staticClass:"line-number"},[s._v("47")]),a("br"),a("span",{staticClass:"line-number"},[s._v("48")]),a("br"),a("span",{staticClass:"line-number"},[s._v("49")]),a("br"),a("span",{staticClass:"line-number"},[s._v("50")]),a("br"),a("span",{staticClass:"line-number"},[s._v("51")]),a("br"),a("span",{staticClass:"line-number"},[s._v("52")]),a("br"),a("span",{staticClass:"line-number"},[s._v("53")]),a("br"),a("span",{staticClass:"line-number"},[s._v("54")]),a("br"),a("span",{staticClass:"line-number"},[s._v("55")]),a("br"),a("span",{staticClass:"line-number"},[s._v("56")]),a("br"),a("span",{staticClass:"line-number"},[s._v("57")]),a("br"),a("span",{staticClass:"line-number"},[s._v("58")]),a("br"),a("span",{staticClass:"line-number"},[s._v("59")]),a("br"),a("span",{staticClass:"line-number"},[s._v("60")]),a("br"),a("span",{staticClass:"line-number"},[s._v("61")]),a("br"),a("span",{staticClass:"line-number"},[s._v("62")]),a("br"),a("span",{staticClass:"line-number"},[s._v("63")]),a("br"),a("span",{staticClass:"line-number"},[s._v("64")]),a("br"),a("span",{staticClass:"line-number"},[s._v("65")]),a("br"),a("span",{staticClass:"line-number"},[s._v("66")]),a("br"),a("span",{staticClass:"line-number"},[s._v("67")]),a("br"),a("span",{staticClass:"line-number"},[s._v("68")]),a("br"),a("span",{staticClass:"line-number"},[s._v("69")]),a("br"),a("span",{staticClass:"line-number"},[s._v("70")]),a("br"),a("span",{staticClass:"line-number"},[s._v("71")]),a("br"),a("span",{staticClass:"line-number"},[s._v("72")]),a("br"),a("span",{staticClass:"line-number"},[s._v("73")]),a("br"),a("span",{staticClass:"line-number"},[s._v("74")]),a("br"),a("span",{staticClass:"line-number"},[s._v("75")]),a("br"),a("span",{staticClass:"line-number"},[s._v("76")]),a("br"),a("span",{staticClass:"line-number"},[s._v("77")]),a("br"),a("span",{staticClass:"line-number"},[s._v("78")]),a("br"),a("span",{staticClass:"line-number"},[s._v("79")]),a("br"),a("span",{staticClass:"line-number"},[s._v("80")]),a("br"),a("span",{staticClass:"line-number"},[s._v("81")]),a("br"),a("span",{staticClass:"line-number"},[s._v("82")]),a("br"),a("span",{staticClass:"line-number"},[s._v("83")]),a("br"),a("span",{staticClass:"line-number"},[s._v("84")]),a("br"),a("span",{staticClass:"line-number"},[s._v("85")]),a("br"),a("span",{staticClass:"line-number"},[s._v("86")]),a("br"),a("span",{staticClass:"line-number"},[s._v("87")]),a("br"),a("span",{staticClass:"line-number"},[s._v("88")]),a("br"),a("span",{staticClass:"line-number"},[s._v("89")]),a("br"),a("span",{staticClass:"line-number"},[s._v("90")]),a("br"),a("span",{staticClass:"line-number"},[s._v("91")]),a("br"),a("span",{staticClass:"line-number"},[s._v("92")]),a("br"),a("span",{staticClass:"line-number"},[s._v("93")]),a("br"),a("span",{staticClass:"line-number"},[s._v("94")]),a("br"),a("span",{staticClass:"line-number"},[s._v("95")]),a("br"),a("span",{staticClass:"line-number"},[s._v("96")]),a("br"),a("span",{staticClass:"line-number"},[s._v("97")]),a("br"),a("span",{staticClass:"line-number"},[s._v("98")]),a("br"),a("span",{staticClass:"line-number"},[s._v("99")]),a("br"),a("span",{staticClass:"line-number"},[s._v("100")]),a("br"),a("span",{staticClass:"line-number"},[s._v("101")]),a("br"),a("span",{staticClass:"line-number"},[s._v("102")]),a("br"),a("span",{staticClass:"line-number"},[s._v("103")]),a("br"),a("span",{staticClass:"line-number"},[s._v("104")]),a("br"),a("span",{staticClass:"line-number"},[s._v("105")]),a("br"),a("span",{staticClass:"line-number"},[s._v("106")]),a("br"),a("span",{staticClass:"line-number"},[s._v("107")]),a("br"),a("span",{staticClass:"line-number"},[s._v("108")]),a("br"),a("span",{staticClass:"line-number"},[s._v("109")]),a("br"),a("span",{staticClass:"line-number"},[s._v("110")]),a("br"),a("span",{staticClass:"line-number"},[s._v("111")]),a("br"),a("span",{staticClass:"line-number"},[s._v("112")]),a("br"),a("span",{staticClass:"line-number"},[s._v("113")]),a("br"),a("span",{staticClass:"line-number"},[s._v("114")]),a("br"),a("span",{staticClass:"line-number"},[s._v("115")]),a("br"),a("span",{staticClass:"line-number"},[s._v("116")]),a("br"),a("span",{staticClass:"line-number"},[s._v("117")]),a("br"),a("span",{staticClass:"line-number"},[s._v("118")]),a("br"),a("span",{staticClass:"line-number"},[s._v("119")]),a("br"),a("span",{staticClass:"line-number"},[s._v("120")]),a("br"),a("span",{staticClass:"line-number"},[s._v("121")]),a("br"),a("span",{staticClass:"line-number"},[s._v("122")]),a("br"),a("span",{staticClass:"line-number"},[s._v("123")]),a("br"),a("span",{staticClass:"line-number"},[s._v("124")]),a("br"),a("span",{staticClass:"line-number"},[s._v("125")]),a("br"),a("span",{staticClass:"line-number"},[s._v("126")]),a("br"),a("span",{staticClass:"line-number"},[s._v("127")]),a("br"),a("span",{staticClass:"line-number"},[s._v("128")]),a("br"),a("span",{staticClass:"line-number"},[s._v("129")]),a("br"),a("span",{staticClass:"line-number"},[s._v("130")]),a("br"),a("span",{staticClass:"line-number"},[s._v("131")]),a("br")])]),a("h2",{attrs:{id:"_2-linux"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-linux"}},[s._v("#")]),s._v(" 2. Linux")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("#计算MD5\nmd5sum /opt/file.iso\n#计算sha1\nsha1sum /opt/file.iso\n#计算SHA256\nsha256sum  /opt/file.iso\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])])])}),[],!1,null,null,null);n.default=t.exports}}]);