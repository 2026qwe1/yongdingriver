/* ==========================================================================
   永定河数字博物馆 · 「永定河智能体」
   纯前端实现：内置知识库 + 关键词检索，无需后端、无需 API Key。
   用法：在页面 </body> 前加 <script src="智能体.js" defer></script>
   ========================================================================== */
(function () {
  'use strict';

  var FALLBACK = '我只是个生活在永定河的智能体，其他的等我学习学习在说吧。';

  /* ------------------------------------------------------------ 知识库 */
  // must: 至少命中一个才算“问的是这个”；k: 加分关键词；q: 示例问法；a: 回答
  var KB = [
    // ---------------- 概况 ----------------
    {
      q: ['永定河有多长', '永定河全长多少公里'],
      must: ['永定河'],
      k: ['多长', '长度', '全长', '多少公里', '公里', '千米'],
      a: '永定河干流全长约 759 公里。从山西宁武的管涔山流出，经内蒙古、河北、北京、天津，最后汇入渤海。',
      link: ['看流域与源流', '永定河志.html']
    },
    {
      q: ['介绍一下永定河', '永定河是什么'],
      must: ['永定河'],
      k: ['介绍', '简介', '概况', '是什么', '了解', '讲讲', '说说', '知道'],
      a: '永定河是北京的母亲河：干流约 759 公里，流域 4.7 万平方公里，从山西宁武管涔山流到天津入渤海。北京城就建在它冲出的冲积扇上。',
      link: ['从永定河志读起', '永定河志.html']
    },
    {
      q: ['永定河流域面积多大'],
      must: ['流域'],
      k: ['面积', '多大', '多少平方', '平方公里'],
      a: '流域面积约 4.7 万平方公里，跨山西、内蒙古、河北、北京、天津五个省区市。',
      link: ['看流域图', '永定河志.html#basin']
    },
    {
      q: ['永定河从哪里发源', '永定河的源头在哪'],
      must: ['源头', '发源', '起点', '从哪'],
      k: ['永定河', '哪里', '哪儿', '开始'],
      a: '永定河有两个源头：南支桑干河发源于山西宁武县管涔山，北支洋河发源于内蒙古兴和县以北的山麓。两条支流在河北怀来汇合，以下才叫永定河。',
      link: ['看源流', '永定河志.html']
    },
    {
      q: ['永定河流到哪里', '永定河从哪里入海'],
      must: ['入海', '流到哪', '终点', '汇入'],
      k: ['海', '渤海', '天津'],
      a: '永定河经天津，由永定新河汇入渤海。从源头到入海口，它串起了黄土高原、西山峡谷与北京平原。',
      link: ['看流域图', '永定河志.html']
    },
    {
      q: ['永定河流经哪些地方'],
      must: ['流经', '经过', '哪些省'],
      k: ['省', '城市', '地方'],
      a: '永定河流经山西、内蒙古、河北、北京、天津五个省区市。其中北京段长约 170 公里，穿过门头沟、石景山、丰台、房山、大兴五个区。',
      link: ['看永定河志', '永定河志.html']
    },
    {
      q: ['永定河以前叫什么', '永定河的别称'],
      must: ['以前叫', '古称', '别称', '又叫', '曾叫'],
      k: ['名字', '名称'],
      a: '永定河古称㶟水、治水、桑干河、卢沟河、浑河。因为河道游荡、迁徙无常，民间又叫它“无定河”。',
      link: ['看名字的由来', '永定河志.html#meaning']
    },
    {
      q: ['为什么叫永定河', '永定河的名字怎么来的'],
      must: ['为什么叫', '名字', '为什么称', '由来'],
      k: ['永定', '改名', '赐名'],
      a: '清康熙三十七年（1698），于成龙主持河政、筑堤束水，康熙把这条河赐名为“永定河”——一个关于安澜的愿望，从此写进了河的名字里。',
      link: ['看时间轴', '历史.html#timeline']
    },
    {
      q: ['为什么叫小黄河'],
      must: ['小黄河'],
      k: ['为什么'],
      a: '因为永定河上游穿行黄土高原，挟带大量泥沙，河水浑浊，所以素有“小黄河”之称。',
      link: ['看源流', '永定河志.html']
    },
    {
      q: ['永定河和北京城的关系'],
      must: ['北京城', '建城'],
      k: ['关系', '为什么', '母亲河', '冲积扇'],
      a: '永定河出山以后在平原上反复摆动，堆积出广阔的冲积扇，北京城正坐落在这一扇形台地上。所以有句话：先有永定河，后有北京城。',
      link: ['看这条河的意义', '永定河志.html#meaning']
    },
    {
      q: ['永定河是北京的母亲河吗'],
      must: ['母亲河'],
      k: ['北京', '为什么'],
      a: '是的。它为北京提供了水源、地基与记忆：冲积扇托起了城的选址，两千年的引水工程养着这座城。',
      link: ['看这条河的意义', '永定河志.html#meaning']
    },

    // ---------------- 历史 ----------------
    {
      q: ['泥河湾是什么'],
      must: ['泥河湾'],
      k: ['什么', '年代', '旧石器', '人类'],
      a: '泥河湾盆地位于永定河上游，是东亚早期人类活动最重要的遗址群之一。马圈沟等遗址距今约 190 万年，古人类在湖畔打制石器、留下灰烬。',
      link: ['看逆时针', '历史.html#timeline']
    },
    {
      q: ['东胡林人是什么'],
      must: ['东胡林'],
      k: ['什么', '遗址', '新石器'],
      a: '东胡林遗址在门头沟，距今约 1 万年，出土墓葬、螺壳项链与火塘，说明先民已经在永定河畔定居，是北京地区最早的一批“家”。',
      link: ['看时间轴', '历史.html#timeline']
    },
    {
      q: ['戾陵堰是什么', '车箱渠是谁修的'],
      must: ['戾陵堰', '车箱渠'],
      k: ['谁', '什么', '历史', '水利'],
      a: '戾陵堰与车箱渠是曹魏嘉平二年（250 年）镇北将军刘靖主持修建的引水灌溉工程，引㶟水灌溉蓟城南北，是北京地区有记载的最早大型水利工程。',
      link: ['看治水史', '第三展厅.html']
    },
    {
      q: ['卢沟桥什么时候建的'],
      must: ['卢沟桥'],
      k: ['建', '年代', '哪年', '什么时候', '历史'],
      a: '卢沟桥始建于金大定二十九年（1189），明昌三年（1192）建成。全长 266.5 米，十一孔。',
      link: ['看第二展厅', '第二展厅.html']
    },
    {
      q: ['卢沟桥有多少只石狮'],
      must: ['卢沟桥', '石狮'],
      k: ['多少', '几只', '几个', '数量'],
      a: '望柱上共有石狮五百余尊——常说的“501 只”。因为大小狮子层层相抱，民间还有“卢沟桥的狮子数不清”的说法。',
      link: ['看石狮照片', '馆藏精粹.html']
    },
    {
      q: ['卢沟晓月是什么'],
      must: ['卢沟晓月'],
      k: ['什么', '燕京八景', '景'],
      a: '“卢沟晓月”是燕京八景之一。旧时拂晓过桥，可见月影落在永定河上，清乾隆题写的“卢沟晓月”碑至今立在桥头。',
      link: ['看馆藏', '馆藏精粹.html']
    },
    {
      q: ['卢沟桥事变是哪一年'],
      must: ['卢沟桥事变', '七七事变', '1937'],
      k: ['哪年', '什么时候', '抗战'],
      a: '1937 年 7 月 7 日，日军进攻宛平城，中国守军奋起抵抗，全民族抗战由此开始。卢沟桥从此不只是桥，而是民族记忆的坐标。',
      link: ['看第二展厅', '第二展厅.html']
    },
    {
      q: ['官厅水库是哪年建的'],
      must: ['官厅'],
      k: ['哪年', '什么时候', '建', '年代'],
      a: '官厅水库 1951 年 10 月动工，1954 年 5 月竣工，是新中国成立后兴建的第一座大型水库，总库容 41.6 亿立方米。',
      link: ['看治水史', '第三展厅.html']
    },
    {
      q: ['官厅水库有什么用'],
      must: ['官厅水库'],
      k: ['作用', '功能', '为什么建', '干什么'],
      a: '官厅水库主要为下游拦洪、供水、发电。它被誉为“新中国水利事业的摇篮”，到今天仍是北京重要的备用水源与调蓄工程。',
      link: ['看第三展厅', '第三展厅.html']
    },
    {
      q: ['永定河引水渠是什么时候修的'],
      must: ['引水渠'],
      k: ['哪年', '什么时候', '建', '修'],
      a: '永定河引水渠 1957 年通水，从三家店引水入城，与后来的京密引水渠一起，构成了北京城市的供水骨架。',
      link: ['看引水渠', '馆藏精粹.html']
    },
    {
      q: ['永定河什么时候断流的'],
      must: ['断流'],
      k: ['什么时候', '哪年', '为什么', '干涸'],
      a: '从 1970 年代起，上游水库增多、城市用水激增，卢沟桥段逐渐断流，河道一度成为采砂场与风沙源。',
      link: ['看尾厅', '尾厅.html']
    },
    {
      q: ['永定河什么时候全线通水'],
      must: ['通水', '复流', '贯通'],
      k: ['什么时候', '哪年', '全线'],
      a: '2021 年 9 月，经过多年生态补水与综合治理，永定河实现自 1996 年以来首次全线通水，一条断流多年的河重新贯通入海。',
      link: ['看尾厅', '尾厅.html']
    },
    {
      q: ['五湖一线是什么'],
      must: ['五湖一线', '五湖'],
      k: ['什么', '哪五个', '湖'],
      a: '“五湖一线”指门城湖、莲石湖、晓月湖、宛平湖、园博湖，加上沿河一线，形成约 18.4 公里、400 公顷的水面。2011 年秋，“卢沟晓月”重现。',
      link: ['看生态重生', '永定河志.html']
    },
    {
      q: ['京张铁路和永定河'],
      must: ['京张铁路', '詹天佑'],
      k: ['永定河', '铁路', '桥'],
      a: '1909 年詹天佑主持修建的京张铁路通车，跨永定河的桥涵被早期摄影师记录。铁路与古桥，在同一个河谷里并存。',
      link: ['看老照片', '馆藏精粹.html']
    },

    // ---------------- 地理与工程 ----------------
    {
      q: ['冲积扇是什么'],
      must: ['冲积扇', '洪积扇'],
      k: ['什么', '意思', '形成'],
      a: '河流出山后坡度骤减，挟带的泥沙在出口处堆积成扇形的地面，就是冲积扇。北京城就建在永定河的冲积扇上。',
      link: ['看流域图', '永定河志.html#basin']
    },
    {
      q: ['官厅山峡有多长'],
      must: ['山峡', '峡谷'],
      k: ['多长', '长度', '公里'],
      a: '永定河切穿西山，形成长约 92 公里的官厅山峡。河谷深切、峰峦夹岸，是北京西部的天然屏障。',
      link: ['看永定河志', '永定河志.html']
    },
    {
      q: ['三家店是什么地方'],
      must: ['三家店'],
      k: ['什么', '哪里', '出山'],
      a: '三家店是永定河出山的门户，也是永定河引水渠的渠首。河水在这里告别峡谷，进入北京平原。',
      link: ['看流域图', '永定河志.html#basin']
    },
    {
      q: ['桑干河是什么'],
      must: ['桑干'],
      k: ['什么', '源头', '南支'],
      a: '桑干河是永定河的南支正源，发源于山西宁武县管涔山。它穿行黄土高原，挟带泥沙，是“小黄河”之名的由来。',
      link: ['看源流', '永定河志.html']
    },
    {
      q: ['洋河是什么'],
      must: ['洋河'],
      k: ['什么', '源头', '北支'],
      a: '洋河是永定河的北支，源自内蒙古兴和县以北的山麓，自北向南流，在河北怀来与桑干河汇合。',
      link: ['看源流', '永定河志.html']
    },

    // ---------------- 文化 ----------------
    {
      q: ['永定河历史上发过大水吗', '永定河为什么老决口'],
      must: ['水灾', '洪灾', '决口', '泛滥', '水患', '发大水'],
      k: ['多少次', '历史', '为什么', '治理', '几次'],
      a: '据记载，自 1271 年以来的近八百年间，永定河发生大小水灾 124 次，其中 6 次逼近北京城。河道游荡、堤防屡决，这也是它曾被叫作“无定河”的原因。',
      link: ['看治水史', '第三展厅.html']
    },
    {
      q: ['永定河有哪些非遗'],
      must: ['非遗', '非物质文化遗产'],
      k: ['哪些', '有什么', '名录'],
      a: '京西永定河沿线有三项国家级非物质文化遗产：京西太平鼓、妙峰山庙会，以及千军台庄户幡会。',
      link: ['看第四展厅', '第四展厅.html']
    },
    {
      q: ['妙峰山庙会是什么'],
      must: ['妙峰山'],
      k: ['庙会', '什么', '非遗'],
      a: '妙峰山庙会是京西最有名的香会，每年农历四月初一至十五，香客沿古香道上山朝顶进香，是国家级非物质文化遗产。',
      link: ['看第四展厅', '第四展厅.html']
    },
    {
      q: ['太平鼓是什么'],
      must: ['太平鼓'],
      k: ['什么', '非遗', '鼓'],
      a: '京西太平鼓是流传于门头沟一带的民间舞蹈，鼓面蒙皮、持鼓而舞，2006 年被列入国家级非物质文化遗产名录。',
      link: ['看第四展厅', '第四展厅.html']
    },
    {
      q: ['千军台庄户幡会'],
      must: ['幡会', '千军台'],
      k: ['什么', '非遗'],
      a: '千军台庄户幡会是门头沟千军台、庄户一带的古老民俗，每年正月十五、十六举幡走会，同样列入了国家级非物质文化遗产。',
      link: ['看第四展厅', '第四展厅.html']
    },
    {
      q: ['爨底下村在哪'],
      must: ['爨底下'],
      k: ['哪里', '什么', '村'],
      a: '爨底下村在门头沟区斋堂镇，是保存完好的明清古村落，依山而建、层层叠叠，如今是京西著名的去处。',
      link: ['看照片', '馆藏精粹.html']
    },
    {
      q: ['宛平城是什么'],
      must: ['宛平'],
      k: ['什么', '城', '历史'],
      a: '宛平城建于明崇祯年间，是拱卫京师的一座卫城。1937 年七七事变就发生在城下，城墙上至今留着弹痕。',
      link: ['看第二展厅', '第二展厅.html']
    },

    // ---------------- 展览与馆藏 ----------------
    {
      q: ['博物馆有几个展厅'],
      must: ['展厅', '几个厅'],
      k: ['几个', '多少', '几个'],
      a: '共有六个常设展厅：序厅（河出西山）、第一展厅（文明的摇篮）、第二展厅（渡口与桥）、第三展厅（治水安澜）、第四展厅（河畔烟火）、尾厅（重生的河）。',
      link: ['看数字展厅', '数字展厅.html']
    },
    {
      q: ['展厅应该按什么顺序看'],
      must: ['顺序', '怎么逛', '先看'],
      k: ['展厅', '路线', '推荐'],
      a: '推荐按叙事顺序走：序厅认识这条河 → 文明 → 桥 → 治水 → 烟火 → 尾厅的重生。每一厅 4—6 组展项，也可以挑一厅单独看。',
      link: ['看展厅总览', '数字展厅.html']
    },
    {
      q: ['馆藏精粹里有什么'],
      must: ['馆藏', '藏品'],
      k: ['什么', '有哪些', '照片'],
      a: '馆藏精粹收了 18 帧影像与器物：卢沟桥石狮、宛平城、官厅水库、爨底下村、妙峰山，还有大葆台汉墓的黄肠题凑、琉璃河的青铜鼎与尊。',
      link: ['逛馆藏', '馆藏精粹.html']
    },
    {
      q: ['黄肠题凑是什么'],
      must: ['黄肠题凑', '大葆台'],
      k: ['什么', '汉墓', '墓'],
      a: '黄肠题凑是汉代高等级墓葬的木构做法：用黄心柏木层层垒砌，木头端头向内。大葆台汉墓在丰台郭公庄，一般认为墓主是西汉广阳王刘建。',
      link: ['看馆藏', '馆藏精粹.html']
    },
    {
      q: ['琉璃河的青铜器'],
      must: ['琉璃河', '青铜'],
      k: ['什么', '西周', '燕国', '鼎', '尊'],
      a: '琉璃河遗址是西周燕国都城的所在，也是北京建城史的开端。出土的青铜鼎、尊等礼器，把这座城市的历史推到三千年前的西周初年。',
      link: ['看馆藏', '馆藏精粹.html']
    },
    {
      q: ['燕式鬲是什么'],
      must: ['燕式鬲', '鬲'],
      k: ['什么', '器物'],
      a: '鬲是古代用来煮食物的三足器。燕式鬲是燕地常见的形制，展厅里的照片是同类器物的博物馆藏品，并非本流域出土。',
      link: ['看第一展厅', '第一展厅.html']
    },
    {
      q: ['尾厅讲什么'],
      must: ['尾厅'],
      k: ['什么', '讲', '内容'],
      a: '尾厅叫“重生的河”，讲断流三十余年、生态补水与全线贯通——一条河如何重新在城市中间流动起来。',
      link: ['看尾厅', '尾厅.html']
    },

    // ---------------- 参观 ----------------
    {
      q: ['要门票吗', '参观收费吗'],
      must: ['门票', '收费', '花钱', '费用'],
      k: ['多少', '贵', '免费'],
      a: '全部免费，不需要买票，也不需要预约。线上展厅 7 × 24 小时开放。',
      link: ['看参观指南', '参观指南.html']
    },
    {
      q: ['开放时间是什么时候'],
      must: ['开放时间', '几点', '营业'],
      k: ['时间', '开门', '关门'],
      a: '这是线上博物馆，7 × 24 小时随时可看。线下实地走访（卢沟桥、宛平城、官厅水库等）的具体时间以景区公告为准。',
      link: ['看参观指南', '参观指南.html']
    },
    {
      q: ['怎么去卢沟桥'],
      must: ['怎么去', '交通', '路线', '地铁', '公交'],
      k: ['卢沟桥', '怎么走', '坐车'],
      a: '卢沟桥在丰台区，坐地铁 1 号线到“园博园”或 14 号线到“大井”再换乘公交都可以；自驾可沿京港澳高速到宛平城出口。具体线路以当天导航为准。',
      link: ['看参观指南', '参观指南.html']
    },
    {
      q: ['参观需要预约吗'],
      must: ['预约'],
      k: ['需要', '吗', '要不要'],
      a: '不需要预约。线上展厅全天开放，直接打开网页就能看。',
      link: ['看参观指南', '参观指南.html']
    },
    {
      q: ['网站有语音朗读吗'],
      must: ['朗读', '语音', '听'],
      k: ['功能', '怎么用', '有没有'],
      a: '有。馆藏和展厅的详情弹窗里有“语音朗读”按钮，点一下就能把文字读出来；也支持键盘操作与“减少动态效果”设置。',
      link: ['去馆藏试试', '馆藏精粹.html']
    },
    {
      q: ['这个网站有什么内容'],
      must: ['网站', '本站', '博物馆', '这个馆'],
      k: ['内容', '页面', '几个', '有什么', '哪些'],
      a: '这里是一座线上博物馆：永定河志、永定河的历史、六个展厅、馆藏精粹、参观指南，还有一条河的时间轴与流域图。',
      link: ['回到首页', '首页.html']
    }
  ];

  /* ------------------------------------------------------------ 匹配引擎 */
  var PUNCT = /[\s\u3000，。！？、；：""''（）《》【】〈〉「」『』…—－·,.!?;:'"()\[\]<>~`\/\\|@#$%^&*+=_-]+/g;

  function norm(s) {
    return String(s || '').toLowerCase().replace(PUNCT, '');
  }

  function bigrams(s) {
    var out = [], i;
    for (i = 0; i < s.length - 1; i++) out.push(s.substr(i, 2));
    return out;
  }

  function dice(a, b) {
    if (!a || !b) return 0;
    var A = bigrams(a), B = bigrams(b), i, j, hit = 0;
    var used = {};
    for (i = 0; i < B.length; i++) {
      for (j = 0; j < A.length; j++) {
        if (!used[j] && A[j] === B[i]) { used[j] = 1; hit++; break; }
      }
    }
    return (2 * hit) / (A.length + B.length);
  }

  function scoreOf(q, e) {
    var i, k, s = 0, hit = false;
    for (i = 0; i < e.must.length; i++) {
      k = norm(e.must[i]);
      if (k && q.indexOf(k) > -1) { hit = true; s += Math.min(8, k.length * 3); break; }
    }
    if (!hit) return 0;
    for (i = 0; i < e.k.length; i++) {
      k = norm(e.k[i]);
      if (k && q.indexOf(k) > -1) s += Math.max(2, k.length * 2);
    }
    var best = 0;
    for (i = 0; i < e.q.length; i++) {
      var sim = dice(q, norm(e.q[i]));
      if (sim > best) best = sim;
    }
    s += best * 14;
    return s;
  }

  var THRESHOLD = 9;

  // 寒暄与自我介绍：属于“这个站点”的话题，正常回应
  var SMALLTALK = [
    { re: /^(你好|您好|hi|hello|嗨|在吗|有人吗)/, a: '你好，我是永定河数字博物馆里的智能体。想问问这条河的哪一段？' },
    { re: /(你是谁|你是什么|介绍一下你|你能做什么|你会什么)/, a: '我是永定河数字博物馆的智能体，只聊这条河：它的源流、历史、桥、水库、生态、展厅和参观。' },
    { re: /^(谢谢|多谢|感谢|好的|明白了)/, a: '不客气。沿着河边再问点别的吧。' }
  ];

  function answer(raw) {
    var q = norm(raw);
    if (!q) return { text: '想了解永定河的什么？可以问我它的长度、历史、卢沟桥，或者怎么来参观。', link: null, kind: 'empty' };

    for (var i = 0; i < SMALLTALK.length; i++) {
      if (SMALLTALK[i].re.test(String(raw).trim())) return { text: SMALLTALK[i].a, link: null, kind: 'smalltalk' };
    }

    var best = null, bestScore = 0;
    for (var j = 0; j < KB.length; j++) {
      var s = scoreOf(q, KB[j]);
      if (s > bestScore) { bestScore = s; best = KB[j]; }
    }

    if (!best || bestScore < THRESHOLD) {
      return { text: FALLBACK, link: null, kind: 'fallback' };
    }
    return {
      text: best.a,
      link: best.link ? { label: best.link[0], href: best.link[1] } : null,
      kind: 'answer',
      score: Math.round(bestScore)
    };
  }

  var api = { answer: answer, KB: KB, FALLBACK: FALLBACK, THRESHOLD: THRESHOLD };
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.YDBot = api;
    if (typeof document === 'undefined') return;
  /* ---------------------------------------------------------------- 界面 */
  if (window.__ydBotMounted) return;
  window.__ydBotMounted = true;

  var CSS = [
    '.ydbot-btn{position:fixed;right:24px;bottom:96px;z-index:9000;display:flex;align-items:center;gap:9px;',
    'padding:10px 16px 10px 12px;border-radius:999px;background:#0b3038;color:#f2ead9;border:1px solid rgba(255,255,255,.16);',
    'box-shadow:0 14px 32px rgba(6,26,32,.34);cursor:pointer;font-family:var(--serif,Georgia,serif);font-size:14px;letter-spacing:.08em;',
    'transition:transform .35s cubic-bezier(.4,0,.2,1),box-shadow .35s;}',
    '.ydbot-btn:hover{transform:translateY(-2px);box-shadow:0 18px 40px rgba(6,26,32,.42);}',
    '.ydbot-btn__seal{display:grid;place-items:center;width:26px;height:26px;border-radius:4px;background:#b03a2e;color:#fff6f2;font-size:15px;line-height:1;}',
    '.ydbot-btn__dot{position:absolute;top:-3px;right:-3px;width:9px;height:9px;border-radius:50%;background:#d8b394;border:2px solid #f8f4ec;}',
    '.ydbot-btn.is-hidden{opacity:0;pointer-events:none;transform:translateY(8px);}',
    '.ydbot{position:fixed;right:24px;bottom:24px;z-index:9001;display:flex;flex-direction:column;',
    'width:min(384px,calc(100vw - 32px));height:min(560px,calc(100vh - 120px));',
    'background:#f8f4ec;border:1px solid rgba(22,20,26,.14);border-radius:16px;overflow:hidden;',
    'box-shadow:0 30px 70px rgba(8,26,32,.34);font-family:var(--sans,system-ui,sans-serif);',
    'opacity:0;visibility:hidden;pointer-events:none;transform:translateY(14px) scale(.985);',
    'transition:opacity .32s cubic-bezier(.4,0,.2,1),transform .32s cubic-bezier(.4,0,.2,1);}',
    '.ydbot.is-open{opacity:1;visibility:visible;pointer-events:auto;transform:none;}',
    '.ydbot.is-open,.ydbot.is-open *{visibility:visible!important;}',
    '.ydbot__head{display:flex;align-items:center;gap:11px;padding:14px 16px;background:#0b3038;color:#efe6d4;}',
    '.ydbot__seal{display:grid;place-items:center;width:30px;height:30px;border-radius:4px;background:#b03a2e;color:#fff6f2;font-family:var(--serif,serif);font-size:17px;}',
    '.ydbot__name{font-family:var(--serif,serif);font-size:15px;letter-spacing:.14em;}',
    '.ydbot__sub{font-size:10.5px;letter-spacing:.16em;color:rgba(239,230,212,.6);margin-top:3px;text-transform:uppercase;}',
    '.ydbot__close{margin-left:auto;width:30px;height:30px;border:0;border-radius:50%;background:rgba(255,255,255,.08);color:#efe6d4;cursor:pointer;font-size:15px;line-height:1;}',
    '.ydbot__close:hover{background:rgba(255,255,255,.16);}',
    '.ydbot__msgs{flex:1;overflow-y:auto;padding:18px 16px 6px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth;}',
    '.ydbot__msg{max-width:88%;padding:11px 14px;border-radius:12px;font-size:13.5px;line-height:1.85;white-space:pre-wrap;word-break:break-word;}',
    '.ydbot__msg--bot{align-self:flex-start;background:#fff;border:1px solid rgba(22,20,26,.1);color:#2a2620;border-bottom-left-radius:4px;}',
    '.ydbot__msg--me{align-self:flex-end;background:#0b3038;color:#f2ead9;border-bottom-right-radius:4px;}',
    '.ydbot__link{display:inline-flex;align-items:center;gap:5px;margin-top:9px;font-size:12px;color:#a9502e;text-decoration:none;border-bottom:1px solid rgba(169,80,46,.35);padding-bottom:1px;}',
    '.ydbot__link:hover{color:#8a3f22;}',
    '.ydbot__typing{align-self:flex-start;display:flex;gap:4px;padding:14px;background:#fff;border:1px solid rgba(22,20,26,.1);border-radius:12px;border-bottom-left-radius:4px;}',
    '.ydbot__typing i{width:5px;height:5px;border-radius:50%;background:#b8ad97;animation:ydbotBlink 1.1s infinite;}',
    '.ydbot__typing i:nth-child(2){animation-delay:.18s;}.ydbot__typing i:nth-child(3){animation-delay:.36s;}',
    '@keyframes ydbotBlink{0%,60%,100%{opacity:.28;transform:translateY(0)}30%{opacity:1;transform:translateY(-2px)}}',
    '.ydbot__chips{display:flex;flex-wrap:wrap;gap:8px;padding:0 16px 12px;}',
    '.ydbot__chips button{border:1px solid rgba(22,20,26,.14);background:transparent;color:#5d564a;border-radius:999px;padding:6px 12px;font-size:12px;cursor:pointer;transition:.25s;}',
    '.ydbot__chips button:hover{border-color:#a9502e;color:#a9502e;}',
    '.ydbot__form{display:flex;gap:8px;padding:12px 14px 14px;border-top:1px solid rgba(22,20,26,.1);background:#fbf8f1;}',
    '.ydbot__input{flex:1;border:1px solid rgba(22,20,26,.16);border-radius:10px;padding:11px 13px;font-size:13.5px;background:#fff;color:#2a2620;font-family:inherit;outline:none;}',
    '.ydbot__input:focus{border-color:#0b3038;box-shadow:0 0 0 3px rgba(11,48,56,.1);}',
    '.ydbot__send{border:0;border-radius:10px;background:#0b3038;color:#f2ead9;padding:0 16px;font-size:13px;letter-spacing:.08em;cursor:pointer;}',
    '.ydbot__send:disabled{opacity:.5;cursor:default;}',
    '.ydbot__note{padding:0 16px 10px;font-size:10.5px;color:#8a8272;letter-spacing:.04em;}',
    '@media (max-width:720px){',
    '.ydbot{right:10px;left:10px;bottom:10px;width:auto;height:min(78vh,560px);}',
    '.ydbot-btn{right:16px;bottom:84px;padding:9px 14px 9px 10px;font-size:13px;}',
    '}',
    '@media (prefers-reduced-motion:reduce){.ydbot,.ydbot-btn{transition:none;}.ydbot__typing i{animation:none;opacity:.6;}}'
  ].join('');

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function start() {
    var style = el('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var btn = el('button', 'ydbot-btn',
      '<span class="ydbot-btn__seal">永</span><span>问我</span>');
    btn.type = 'button';
    btn.setAttribute('aria-label', '打开永定河智能体');
    document.body.appendChild(btn);

    var panel = el('section', 'ydbot');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', '永定河智能体');
    panel.innerHTML =
      '<div class="ydbot__head">' +
        '<span class="ydbot__seal">永</span>' +
        '<div><div class="ydbot__name">永定河智能体</div><div class="ydbot__sub">Yongding River · Only</div></div>' +
        '<button class="ydbot__close" type="button" aria-label="关闭">✕</button>' +
      '</div>' +
      '<div class="ydbot__msgs" role="log" aria-live="polite" aria-atomic="false"></div>' +
      '<div class="ydbot__chips"></div>' +
      '<p class="ydbot__note">回答基于本站内容整理，只聊永定河。</p>' +
      '<form class="ydbot__form">' +
        '<input class="ydbot__input" type="text" autocomplete="off" placeholder="问问这条河⋯⋯" aria-label="输入问题">' +
        '<button class="ydbot__send" type="submit">发送</button>' +
      '</form>';
    document.body.appendChild(panel);

    var msgs = panel.querySelector('.ydbot__msgs');
    var chips = panel.querySelector('.ydbot__chips');
    var form = panel.querySelector('.ydbot__form');
    var input = panel.querySelector('.ydbot__input');
    var send = panel.querySelector('.ydbot__send');

    var SUGGEST = ['永定河有多长？', '为什么叫永定河？', '卢沟桥有多少只石狮？', '要门票吗？'];

    function addBubble(text, who, link) {
      var b = el('div', 'ydbot__msg ydbot__msg--' + who);
      b.textContent = text;
      if (link) {
        var a = el('a', 'ydbot__link', link.label + ' <span aria-hidden="true">↗</span>');
        a.href = link.href;
        b.appendChild(document.createElement('br'));
        b.appendChild(a);
      }
      msgs.appendChild(b);
      msgs.scrollTop = msgs.scrollHeight;
      return b;
    }

    function typing() {
      var t = el('div', 'ydbot__typing', '<i></i><i></i><i></i>');
      msgs.appendChild(t);
      msgs.scrollTop = msgs.scrollHeight;
      return t;
    }

    function ask(text) {
      var q = String(text || '').trim();
      if (!q) return;
      addBubble(q, 'me');
      input.value = '';
      send.disabled = true;
      var t = typing();
      window.setTimeout(function () {
        if (t.parentNode) t.parentNode.removeChild(t);
        var r = answer(q);
        addBubble(r.text, 'bot', r.link);
        send.disabled = false;
        input.focus();
      }, 420);
    }

    SUGGEST.forEach(function (s) {
      var c = el('button', null, s);
      c.type = 'button';
      c.addEventListener('click', function () { ask(s); });
      chips.appendChild(c);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      ask(input.value);
    });

    function open() {
      panel.classList.add('is-open');
      btn.classList.add('is-hidden');
      if (!msgs.childNodes.length) {
        addBubble('你好，我是这座博物馆里的智能体。永定河的问题都可以问我——长度、历史、卢沟桥、官厅水库，或者怎么来参观。', 'bot');
      }
      window.setTimeout(function () { input.focus(); }, 240);
    }
    function close() {
      panel.classList.remove('is-open');
      btn.classList.remove('is-hidden');
      btn.focus();
    }

    btn.addEventListener('click', open);
    panel.querySelector('.ydbot__close').addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) close();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();