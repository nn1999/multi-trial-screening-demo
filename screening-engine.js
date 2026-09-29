(()=>{
const D=window.StudyData;const Q={};const copyUpdates={};
function q(id,text,options,category,kind='choice'){Q[id]={id,text,options,category,kind}}
const yes=['没有','有','不清楚'];
q('more','除了照片中的方案，乳腺癌复发或转移后，还接受过其他抗肿瘤治疗吗？',['没有其他方案','有，请看治疗记录','不清楚'],'treatment');
q('last','最近一次接受抗肿瘤治疗是哪一天？',[],'treatment','date');
q('parp','医生是否给您用过奥拉帕利、尼拉帕利等 PARP 抑制剂，或相关研究药？',['没有用过','用过，需要核对药单','不清楚'],'treatment');
q('cdk2','您是否参加过使用 CDK2 抑制剂的临床研究？（不是照片中的达尔西利）',yes,'treatment');
q('radiation','近期是否做过放疗，或医生曾告知您有放射性肺炎？',yes,'treatment');
q('surgery','最近一个月是否做过较大手术、发生严重外伤，或已经安排近期手术？',yes,'record');
q('transfusion','最近两周是否输过血或使用升白针等造血生长因子？',yes,'treatment');
q('toxicity','之前治疗引起的不舒服，现在还有没有没恢复的情况？',['都已恢复','还有没恢复的情况','不清楚'],'assessment');
q('heart','医生是否曾告诉您有严重心脏病、心律失常、卒中，或血压用药后仍控制不好？',yes,'cardiac');
q('brain','医生是否曾告诉您有脑转移、脑膜转移或脊髓受压？',yes,'imaging');
q('cancer','除了乳腺癌，您还得过其他恶性肿瘤吗？',yes,'record');
q('hrt','目前是否在用治疗更年期等用途的激素替代药？乳腺癌治疗药不算在此项。',yes,'treatment');
q('infection','最近两周是否因感染接受抗生素、抗真菌或抗病毒治疗？',yes,'lab');
q('hepatitis','是否曾被告知有乙肝、丙肝、HIV 或梅毒感染？',['没有被告知过','有相关病史或阳性结果','不清楚'],'lab');
q('gut','是否有持续呕吐、腹泻，或医生告知存在影响食物/药物吸收的胃肠疾病？',yes,'assessment');
q('swallow','目前能否正常吞服药片？',['可以','吞咽困难','不清楚'],'assessment');
q('allergy','是否对药物、辅料、花生或大豆有过敏史？',yes,'other');
q('biopsy','如果研究需要，您愿意在医生判断安全的前提下接受肿瘤穿刺取样吗？',['愿意','需要再了解','不愿意'],'other');
q('ribointolerance','既往是否用过瑞波西利，并因不耐受而减量或永久停药？',['没有这种情况','有','不清楚'],'treatment');
q('pregnancy','目前是否怀孕或正在哺乳？',['都不是','正在怀孕或哺乳','不清楚'],'reproductive');
q('menopause','目前月经或绝经情况属于哪一种？',['仍有月经','自然停经已满一年','用药后停经或卵巢抑制','做过卵巢/子宫手术','不清楚'],'reproductive');
q('contraception','如果医生确认仍有生育可能，您愿意按研究要求采取避孕措施吗？',['愿意','需要再了解','不愿意'],'reproductive');
q('immuneMeds','最近两周是否用过口服/注射激素、免疫抑制剂、胸腺肽或干扰素等药物？',yes,'treatment');
q('vaccine','最近四周是否接种过活疫苗或减毒活疫苗？不知道种类也可以选择“不清楚”。',yes,'other');
q('transplant','是否做过异体骨髓或器官移植？',yes,'record');
q('bloodDisease','医生是否曾诊断或怀疑骨髓增生异常综合征、急性髓系白血病？',yes,'lab');
q('bleeding','最近半年是否有严重出血、血栓，或正使用华法林等抗凝药？',yes,'treatment');
q('lung','是否有严重肺部疾病，或平时需要持续吸氧？',yes,'assessment');
q('autoimmune','医生是否曾诊断自身免疫疾病，例如红斑狼疮、类风湿、炎症性肠病等？',yes,'record');
q('effusion','是否因胸水、腹水或心包积液，需要反复抽水或引流？',yes,'imaging');
q('cognition','目前能否理解研究说明并自己作出参加研究的决定？',['可以','需要家人协助沟通','不清楚'],'assessment');
q('substances','是否存在长期大量饮酒或药物依赖等情况，需要研究团队协助评估？',yes,'assessment');
for(const [id,title,text] of [
['pathology','最新病理与 HER2 结果','请上传复发/转移后的完整病理、免疫组化及同次 HER2 ISH/FISH 报告。照片中转移标本 HER2 为 2+，需要对应检测结果。'],
['gene','原始基因报告','请上传完整基因检测报告，包括 BRCA2 位点、变异分类、样本类型及日期。'],
['imaging','近期影像与疗效评估','请上传最近一次 CT / MRI 等影像报告、与以前比较的结果以及医生的疗效评估。是否进展和靶病灶由研究团队判断。'],
['treatment','完整治疗及药物记录','请上传历次治疗方案、末次用药记录和当前药单；包括医院开的药、自己买的药、中草药及保健品。'],
['lab','近期化验','请上传近期血常规、肝肾功能、凝血和电解质检查；感染检测如已有也请一并上传。'],
['cardiac','心电图与心脏检查','请上传近期心电图及已有的心脏检查、血压记录。'],
['assessment','门诊综合评估','如有最近门诊对身体状况、未恢复不良反应或其他疾病的评估，请上传。没有的话，由研究团队安排线下核实。'],
['reproductive','适用的妊娠与生育状态资料','如已有妊娠检测或绝经/生育状态相关检查，请上传；是否需要新检查由研究团队安排。'],
['other','补充病史相关报告','如有刚才提到的其他疾病、过敏、手术或活检资料，请上传。']])q('report_'+id,text,['上传报告','暂时没有'],' '+id,'report'),Q['report_'+id].category=id,Q['report_'+id].title=title;

const plainCopy={"more": "乳腺癌复发或转移以后，除了这份病历里写的治疗，您还用过其他治癌的药，或做过其他治疗吗？", "last": "您最近一次吃治癌的药、打治疗针或做化疗，是哪一天？", "parp": "您以前吃过奥拉帕利、尼拉帕利这类治癌药吗？记不住药名没关系，可以选“不清楚”，之后拍药盒或药单给我们。", "cdk2": "除了病历里写的研究，您还参加过其他试用新药的研究吗？药名记不清没关系，我们会帮您查用药记录。", "radiation": "您最近做过放疗（照射治疗）吗？或者医生曾说您放疗后肺部发炎？", "surgery": "最近一个月，您做过大手术、受过较重的伤，或已经约好了要做手术吗？", "transfusion": "最近两周，您输过血或打过“升白针”等帮助血细胞恢复的针吗？", "heart": "医生以前说过您有比较严重的心脏病、心跳不齐或脑中风吗？您有没有吃了降压药，血压还是很高的情况？", "brain": "医生以前说过，肿瘤转移到了脑部或脑周围，或者压到了脊髓吗？没听过这些诊断，可以选“不清楚”。", "cancer": "除了乳腺癌，医生还诊断过您有其他癌症吗？", "hrt": "除了治疗乳腺癌的药，您现在还在用缓解更年期不舒服的激素药吗？不确定是不是这类药，可以选“不清楚”。", "infection": "最近两周，您有没有因为感染而吃药、打针或输液，比如治疗肺炎或尿路感染？", "hepatitis": "医生以前告诉过您有乙肝、丙肝、艾滋病病毒感染或梅毒吗？没查过或记不清，可以选“不清楚”。", "gut": "您有没有一直吐、一直拉肚子，或医生说过肠胃不好、会影响吃进去的药被身体吸收？", "swallow": "您现在能顺利把药片咽下去吗？", "allergy": "您以前吃药、打针，或吃花生、大豆后，出现过医生认为是过敏的情况吗？", "biopsy": "如果医生判断安全，您愿意做穿刺检查吗？就是用细针取一点肿瘤组织来检查。", "ribointolerance": "您以前用过“瑞波西利”吗？有没有因为吃药后身体受不了，医生让您减少药量或不再用它？记不清可以选“不清楚”。", "pregnancy": "您现在怀孕了，或正在给孩子喂母乳吗？", "menopause": "您现在还有月经吗？请选择最接近您的情况。", "contraception": "如果医生说您仍可能怀孕，您愿意在研究期间按医生的要求避孕吗？具体怎么做，医生会告诉您。", "immuneMeds": "最近两周，您用过激素药（比如泼尼松、地塞米松），或医生说是调节免疫的药吗？记不清可以拍药单给我们。", "vaccine": "最近四周，您打过疫苗吗？不用分辨疫苗种类，接种记录可以交给我们核对。", "transplant": "您以前做过骨髓移植，或肝、肾等器官移植吗？", "bloodDisease": "医生以前说过您的骨髓造血有问题，或怀疑过白血病吗？报告上的名字可能是“骨髓增生异常综合征”或“急性髓系白血病”。记不清可以选“不清楚”。", "bleeding": "最近半年，您有没有严重出血或血管里长血栓？现在是否在吃防血栓的药，比如华法林？", "lung": "您有比较严重的肺病，或者平时需要经常吸氧吗？", "autoimmune": "医生说过您有红斑狼疮、类风湿关节炎，或免疫系统引起的肠道炎症等疾病吗？记不清诊断名字可以选“不清楚”。", "effusion": "您有没有因为胸部、肚子或心脏周围积水，需要反复到医院抽水或引流？", "cognition": "医生讲解研究之后，您能听明白，并自己决定是否参加吗？", "substances": "您有没有长期大量喝酒，或有些药很难停下来、需要医生帮助的情况？"};
for(const [id,text] of Object.entries(plainCopy)){copyUpdates[Q[id].text]=text;Q[id].text=text;}
const reportCopy={"pathology": "您手边有最近一次穿刺或手术后的病理报告吗？请把所有页拍给我们。如果还有写着“HER2”“FISH”或“ISH”的报告，也一起拍；找不到没关系，不用自己判断结果。", "gene": "您手边有基因检测报告吗？请把封面和后面的结果页都拍给我们。上面可能写着“BRCA”。不用自己挑内容，我们来查看。", "imaging": "您最近做过CT、核磁共振或其他拍片检查吗？请把报告拍给我们。如果还有上一次的报告，也可以一起上传，方便医生比较。", "treatment": "请拍一下您看病时的治疗记录和现在的药单。没有药单，也可以拍药盒，包括自己买的药、中药和保健品。暂时找不到可以后面再补。", "lab": "您手边有最近的抽血化验单吗？有的话请把所有页拍给我们，不用自己挑哪些项目。", "cardiac": "您有最近的心电图或心脏检查报告吗？有的话请拍给我们；如果平时记录了血压，也可以一起上传。", "assessment": "您手边还有最近一次看门诊的病历吗？如果医生写了身体状况或其他疾病，也请一起拍给我们。没有的话可以后面再补。", "reproductive": "您手边有验孕或停经后做的检查报告吗？有就拍给我们，没有就选“暂时没有”，需要做什么检查会由医生告诉您。", "other": "刚才提到的其他病、过敏或手术，您手边有相关病历或报告吗？有的话请拍给我们，没有可以后面再补。"};
for(const [id,text] of Object.entries(reportCopy)){copyUpdates[Q["report_"+id].text]=text;Q["report_"+id].text=text;}
Q.menopause.options=['还有月经','不是用药造成的，停经已有一年','治疗后月经停了','做过卵巢或子宫手术','不清楚'];
Q.ribointolerance.options.push('不清楚');
const MAP={
e1:[],e2:[],e3:[],e4:['report_pathology'],e5a:['more','report_treatment','report_imaging'],e5b:['more','report_treatment','report_imaging'],e6:['report_imaging'],e7:[],
x1:['last','cdk2','radiation','report_treatment'],x2:['report_lab','report_cardiac'],x3:['heart','report_cardiac'],x4:['toxicity','report_assessment'],x5:['brain','report_imaging'],x6:['cancer','report_other'],x7:['ribointolerance','report_assessment'],x8:['hrt','report_treatment'],x9:['infection','hepatitis','report_lab'],x10:['gut','report_assessment'],x11:['swallow'],x12:['surgery','report_other'],x13:['report_assessment'],x14:['transfusion','report_treatment'],x15:['allergy'],x16:['report_treatment'],x17:['menopause','contraception','report_reproductive'],x18:[],x19:['pregnancy','report_reproductive'],
sphase:['more','report_treatment','report_imaging'],s1:[],s2:['report_pathology','report_imaging'],s3:['report_gene'],s4:['report_imaging'],s5:['parp','report_treatment'],s6:['report_assessment'],s7:['report_lab','transfusion'],s8:[],s9:['pregnancy','menopause','contraception','report_reproductive'],s10:[],
sx1:['last','report_treatment'],sx2:['radiation','report_treatment'],sx3:['last','report_treatment'],sx4:['surgery','report_other'],sx5:['parp','report_treatment'],sx6:['immuneMeds','report_treatment'],sx7:['immuneMeds','report_treatment'],sx8:['vaccine'],sx9:['report_treatment'],sx10:['transplant'],sx11:['bloodDisease','report_lab'],sx12:['gut','swallow'],sx13:['toxicity','report_assessment'],sx14:['brain','report_imaging'],sx15:['infection','report_lab'],sx16:['hepatitis','report_lab'],sx17:['hepatitis','report_lab'],sx18:['cancer','report_other'],sx19:['heart','bleeding','report_cardiac'],sx20:['lung','report_assessment'],sx21:['autoimmune','report_other'],sx22:['allergy'],sx23:['effusion','report_imaging'],sx24:[],sx25:['pregnancy','report_reproductive'],sx26:['substances','report_assessment'],sx27:['report_assessment']};
function facts(s){let pages=s.reports.filter(r=>r.confirmed&&r.text);const text=pages.map(r=>r.text).join('\n'),flat=text.replace(/\s/g,'');const excerpt=(re)=>{let rows=text.split('\n'),i=rows.findIndex(x=>re.test(x));return i<0?'':'“'+rows.slice(Math.max(0,i-1),Math.min(rows.length,i+2)).join(' ')+'”'};return {text,flat,excerpt,breast:/乳腺|乳癌/.test(text),brca:/BRCA2.{0,35}(胚系|致病)/i.test(flat),her2latest:pages.some(r=>/2024/.test(r.text)&&/Her2|HER2/i.test(r.text)&&/腋窝|腋窩|淋巴/.test(r.text)),her2old:/HER.?2基因未扩增/i.test(flat),dalpi:/达尔西利/.test(text),exem:/依西美坦/.test(text),bone:/骨质破坏|骨转移/.test(text),cycles:/22周期/.test(flat),pendingPD:/拟行疾病进展确认/.test(flat),ect:/EC.T方案化疗/.test(flat)}}
function type(c){return c.id.startsWith('sx')||/^x\d/.test(c.id)?'exclusion':['s8','sphase'].includes(c.id)?'context':'inclusion'}
function listFor(t){return D.criteria.filter(c=>c.scope===t||(t.startsWith('eci')&&c.scope==='eci'))}
function dateDefaults(s){return s.reports.some(r=>r.type==='record'&&r.confirmed&&r.dateConfirmed&&r.date)}
function evaluate(c,s){const f=facts(s),a=s.answers||{},latest=dateDefaults(s),keys=(MAP[c.id]||[]).filter(k=>k!=='more'&&!k.startsWith('report_')),answered=keys.filter(k=>a[k]),unanswered=keys.filter(k=>!a[k]);let known='已上传病历未提及'+c.title+'所需的信息。',status='待补充',reason='没有记载不能当作满足入选条件或不存在排除因素。',team='';
if(!s.analyzed)return {status:'待上传分析',known:'尚未提交本地病历图片。',reason:'上传后再进行匹配。',questions:[],team:''};
if(['e2','s1'].includes(c.id)){status='符合';known='45 岁女性（用户明确补充的已知信息）。';reason='年龄达到 ≥18 岁。'}
if(c.id==='e3'){status='符合';known='ECOG = 0（用户明确补充）。';reason='符合 ECOG ≤1 要求。'}
if(['e1','s10'].includes(c.id)){status='意愿符合';known='患者默认愿意签署知情同意，尚无实际签署记录。';reason='预筛选意愿已知，不重复追问；正式研究程序前仍需依法签署。';team='正式筛选前完成研究知情同意。'}
if(c.id==='s6'){known='ECOG = 0；病历未记录预计生存期。';reason='ECOG 部分符合；预计生存期 ≥3 个月须由研究团队评估，不能请患者自行判断。';team='评估预计生存期。'}
if(['e4','s2'].includes(c.id)&&f.breast){known='病历提示乳腺癌、ER/PR阳性；'+(f.her2old?'既往标本HER2未扩增；':'')+'最新转移标本HER2 2+的对应ISH/FISH未见。';reason='激素受体有支持；HER2阴性状态尚不能以旧报告替代最新标本结果。';if(c.id==='s2')reason+=' 还需近期影像确认治疗失败/进展。'}
if(c.id==='e5a'&&f.dalpi){known='晚期治疗见达尔西利＋'+(f.exem?'依西美坦':'内分泌治疗')+'等'+(f.cycles?'，已完成22周期':'')+'；未见额外一线晚期系统治疗。';reason='已有CDK4/6联合内分泌线索；额外晚期治疗和进展/不耐受证据缺失。辅助EC-T与晚期线数不能混算。'}
if(c.id==='e5b'&&f.dalpi){status='已见方案不匹配';known='已见晚期方案含达尔西利'+(f.exem?'＋依西美坦（AI）':'')+'。';reason='AI这一部分有依据，但达尔西利不在所给条款指定的哌柏西利/瑞波西利/阿贝西利范围；需核实是否另有符合要求的既往方案。'}
if(c.id==='sphase'){known=(f.brca?'病历记载BRCA2胚系致病变异；':'')+(f.dalpi?'已见晚期达尔西利联合方案；':'')+(f.ect?'EC-T是术后辅助治疗，不是晚期化疗。':'当前未见完整晚期化疗史。');reason='不能只凭基因阳性推荐入组。扩展队列要求晚期化疗和近期影像进展；回填条款亦引用扩展标准治疗要求。';team='确认开放队列、中心最新版本以及“at least >1 line”的线数含义。'}
if(c.id==='s3'&&f.brca){status='部分支持';known='OCR识别到BRCA2胚系变异及致病性记载；缺原始基因报告、位点和样本详情。';reason='为相关基因方向提供线索，不能代替完整原始检测及队列要求。'}
if(['e6','s4'].includes(c.id)&&f.bone){known='病历描述骨质破坏、骨转移可能；未提供近期RECIST靶病灶测量。';reason=c.id==='e6'?'需影像明确可测量病灶，或符合本研究溶骨性病灶例外。':'未确认至少一个RECIST可测量病灶；不能套用ECI830骨病灶例外。'}
if(['x1','sx1','sx3'].includes(c.id)&&f.dalpi){known='病历有研究治疗及达尔西利等药物，缺末次给药日期。';reason='无法计算洗脱期，既往研究开始日期不能替代最近一次用药日期。'}
if(c.id==='x18'){status='不适用';known='45 岁女性。';reason='本条只针对有性生活的男性患者。'}
if(c.id==='s8'){status='研究团队确认';known='已取得官方公开登记全部入排；没有完整方案附件和中心当前开放队列。';reason='研究版本与队列不能向患者索取。';team='研究团队核实当前方案及附录。'}
if(c.id==='e7'){status='意愿符合（演示默认）';known='演示默认：患者愿意接受活检。';reason='无需重复询问活检意愿；不代表已完成活检或确认取材安全。';team='评估活检安全性及取材可行性。';}
if(c.id==='sx24'){status='未见排除因素（演示默认）';known='演示默认：能够理解研究说明并自主决定参加。';reason='该项按用户指定的演示情境处理，不重复询问。';}
if(latest&&['x2','s7'].includes(c.id)){status=c.id==='s7'?'符合（演示默认）':'实验室符合（演示默认）';known='已确认病历日期；演示将其作为最新资料，并默认实验室数值符合本研究标准。';reason='这是演示假设，不是OCR核实了全部化验数值。'+(c.id==='x2'?'心电图/QTcF仍需独立核实。':'近期输血或升白针情况仍需询问。');}

if(['x4','sx13','x10','sx12'].includes(c.id)&&/饮食及睡眠尚可|大小便如常/.test(f.flat)){known='病历记载饮食睡眠尚可、大小便如常，但未逐项记录残留毒性或吸收障碍。';reason='一般生活描述不足以排除指定情况，需要具体询问。'}
if(answered.length){known+='\n患者补充：'+answered.map(k=>`${Q[k].title||Q[k].text} → ${a[k].label}`).join('；');reason+=' 患者自述与上传报告已记录，客观检查仍按原报告判断。';if(!unanswered.length&&status==='待补充')status='已补充，待核验';}
if((MAP[c.id]||[]).some(k=>k.startsWith('report_'))){team+=(team?' ':'')+'演示默认已上传完整病历；未能从文字确认的项目由团队查阅原件，不重复向患者索要。';}
const quotes=[];if(['e4','s2'].includes(c.id))quotes.push(f.excerpt(/HER.?2|Her2/i));if(['e5a','e5b','sphase','x1','sx1','sx3'].includes(c.id))quotes.push(f.excerpt(/达尔西利|拟定治疗/));if(c.id==='s3')quotes.push(f.excerpt(/BRCA2/));if(['e6','s4'].includes(c.id))quotes.push(f.excerpt(/骨质破坏|骨转移/));
return {status,known,reason,team,questions:unanswered.map(k=>Q[k]),answered,quotes:quotes.filter(Boolean)};}
function missing(s){if(!s.analyzed)return[];let ids=new Set();D.criteria.forEach(c=>evaluate(c,s).questions.forEach(q=>ids.add(q.id)));const arr=[...ids].map(id=>Q[id]);return arr.sort((a,b)=>(a.kind==='report')-(b.kind==='report'));}
window.Screening={Q,MAP,copyUpdates,dateDefaults,facts,type,listFor,evaluate,missing};
})();
