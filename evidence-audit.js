/* Current-material audit: no outside registry requirements, no assumed lab values. */
(()=>{
const E=window.Screening,D=window.StudyData;
const FAIL='不符合',PASS='符合',UNKNOWN='证据不足',NA='不适用';
function material(s){const pages=s.reports.filter(r=>r.confirmed&&r.text&&(!r.qid||r.followupSubmitted));const flat=pages.map(p=>p.text).join('\n').replace(/\s/g,'');const refs=re=>pages.flatMap(p=>p.text.split('\n').map((line,i,lines)=>({line,i,lines})).filter(x=>re.test(x.line)).slice(0,2).map(x=>({id:p.id,name:p.name,line:x.i+1,text:x.lines.slice(Math.max(0,x.i-1),Math.min(x.lines.length,x.i+2)).join(' ')}))).slice(0,3);return {pages,flat,refs,dalpi:/达尔西利/.test(flat),ai:/依西美坦/.test(flat),oldAI:/他莫昔芬/.test(flat),cycles:/22周期/.test(flat),bone:/骨质破坏|骨转移/.test(flat),brca:/BRCA2.{0,30}(胚系|致病)/i.test(flat),breast:/乳腺/.test(flat),er:/ER.{0,20}(70|80)%/i.test(flat),her2:/HER.?2.{0,7}2\+/i.test(flat),fish:/HER.?2基因未扩增/i.test(flat),pending:/拟行疾病进展确认/.test(flat),adjuvant:/EC.T方案化疗/.test(flat),tamox:/他莫昔芬/.test(flat),oral:/口服/.test(flat),knownCourse:/2024.{0,160}(研究|随机)/.test(flat)&&/2021/.test(flat)&&/22周期/.test(flat)};}
function evaluate(c,s){const m=material(s),r={status:UNKNOWN,known:'当前材料未提供可直接核对本条的记录。',reason:'没有记载不能等同于已满足条件，也不能直接认定命中排除。',gaps:[],refs:[],basis:'病历证据',team:'',questions:[],quotes:[]};
const set=(status,known,reason,gaps=[],re)=>{Object.assign(r,{status,known,reason,gaps});if(re)r.refs=m.refs(re)};
if(!s.analyzed){set(UNKNOWN,'尚未提交病历。','提交后基于实际上传内容评估。');return r}
switch(c.id){
case 'e1':set(UNKNOWN,'已知患者愿意签署知情同意，未见已签署记录。','愿意参加与已经签署是不同条件；原文要求参与研究前取得签署同意。',['实际签署记录或签署状态']);r.basis='已知背景';break;
case 'e2':set(PASS,'45 岁女性。','45 岁达到 ≥18 岁门槛。');r.basis='用户明确提供';break;
case 'e3':set(PASS,'ECOG = 0。','0 分满足 ECOG ≤1。');r.basis='用户明确提供';break;
case 'e4':case 'sr_population':
set(UNKNOWN,m.breast?'病历有乳腺癌诊断；ER/PR 阳性。既往原发标本 HER2 未扩增，后续淋巴结标本 HER2 2+。':'尚未提取到完整的肿瘤病理分型。','HER2 IHC 2+ 为结果待定，需结合该标本的 ISH/FISH 结论；2+/ISH阴性才支持HER2阴性。早年原发标本的阴性结果不能替代后续淋巴结标本的补充检测。本条暂为证据不足，并非判HER2阳性。',['后续 HER2 2+ 标本对应的 ISH/FISH 结论'],/HER.?2|Her2|ER\(/i);if(c.id==='sr_population'&&m.brca)r.known+=' BRCA2 胚系致病变异有明确病历记载。';break;
case 'e5a':
if(m.knownCourse&&m.dalpi&&m.ai){set(FAIL,'完整治疗记录显示：术后 EC-T 辅助化疗及他莫昔芬＋卵巢抑制；复发/转移后为阿得贝利单抗＋达尔西利＋依西美坦＋戈舍瑞林同一联合方案，已完成22周期。','满足既往晚期 CDK4/6 联合内分泌治疗这一部分，但没有另起一线的额外晚期全身治疗。联合方案中的多个药物不能拆成多线；术后辅助 EC-T 也不计作晚期治疗线。按完整治疗史前提，此条不符合。',[],/达尔西利|22周期|EC.T/)}else set(UNKNOWN,'当前已识别治疗信息不足以重建完整辅助及晚期治疗时间线。','不能仅凭出现达尔西利或化疗关键词就计算治疗线数。',['可区分治疗背景和先后顺序的病历证据'],/达尔西利|化疗/);break;
case 'e5b':
if(m.knownCourse&&m.dalpi){set(FAIL,'晚期记录中的 CDK4/6 抑制剂是达尔西利，联合依西美坦。完整记录未列出哌柏西利、瑞波西利或阿贝西利治疗。','依西美坦属于芳香化酶抑制剂，满足内分泌药物类别；但达尔西利不在当前原文明列的三种 CDK4/6 药物中，不能以同类药自动替代。辅助期间也未见使用 CDK4/6 的例外路径。',[],/达尔西利|EC.T|他莫昔芬/)}else set(UNKNOWN,'尚未提取到完整的指定药物治疗史。','需依据药物名称、治疗背景与先后顺序判定，不能仅看CDK4/6类别。',['指定药物和适用治疗背景的记录']);break;
case 'e6':case 'sr_lesion':
set(UNKNOWN,m.bone?'病历记载骨质破坏、骨转移可能；既往超声淋巴结约9×8 mm。未见当前CT/MRI病灶测量表。':'未见可核对的当前病灶尺寸及测量方式。',c.id==='e6'?'9×8 mm超声淋巴结不能证明RECIST可测量病灶。ECI830另允许无可测量病灶时符合条件的主要溶骨性病灶，但“骨质破坏”仍不足以证明基线可准确且重复评估，也未交代局部放疗后的进展条件。':'需要至少一个RECIST 1.1可测量病灶。骨转移并不自动符合；不能借用ECI830的主要溶骨性病灶例外。',['当前病灶部位、CT/MRI尺寸及测量径线',c.id==='e6'?'骨病灶可测量软组织成分，或溶骨性病灶例外路径的可重复评估依据':'骨病灶是否具有符合RECIST测量条件的软组织成分','目标病灶既往局部治疗情况及适用时的治疗后进展记录'],/骨质破坏|骨转移|9.*8/);break;
case 'e7':set(UNKNOWN,'既往有穿刺和手术取材记录；当前活检意愿尚未确认。','当前活检意愿未知，原文同时要求医学上安全且可行。旧样本后已有全身治疗，不能直接套用“采样后未接受全身治疗”的存档替代条件。',['患者当前活检意愿','可取材病灶及活检安全可行性判断，或已记录的豁免'],/穿刺|活检|方案/);r.basis='病历证据';break;
case 'sr_disease':set(UNKNOWN,m.pending?'晚期乳腺癌有病历支持；病历写“拟行疾病进展确认”，而非已经确认进展。':'病历未提供足以确认标准治疗失败或无标准治疗方案的结论。','完成22周期不是治疗失败的证据；也不能因参加过试验就断定无标准治疗方案。',['标准治疗失败的明确记录，或无标准治疗方案的医学判断'],/拟行|22周期|骨转移/);break;
case 'sr_parp':if(m.knownCourse)set(PASS,'按完整治疗记录，未接受过 PARP 抑制剂治疗。','既往含 PARP 治疗为0线，未超过当前条文允许的最多1线。',[],/达尔西利|EC.T|他莫昔芬/);else set(UNKNOWN,'不能从当前识别内容建立完整用药序列。','不能因单个关键词未出现就认定从未用药。',['完整治疗记录的可识别内容']);break;
case 'sr_ecog':set(UNKNOWN,'ECOG 0 已知；未见预计生存期的评估。','ECOG符合0–1分，但不能由体能良好推算预计生存期≥12周。',['预计生存期≥12周的医学评估']);r.basis='用户背景＋病历缺口';break;
case 'sr_lab':set(UNKNOWN,'两张病历未列出能够逐项核对的主要器官功能检查数值。','当前执行条文要求主要器官功能充足；一般状况良好不能代替器官功能检查或医学评估。',['可支撑“主要器官功能充足”的检查结果或明确评估']);break;
case 'sr_gene':if(m.brca)set(PASS,'病历明确记载“BRCA2 胚系突变，致病性变异”。','当前回填条文列明BRCA1、BRCA2、PALB2、RAD51C/D任一基因阳性；病历记载支持BRCA2这一项。仅此项符合，不等于满足整个研究。',[],/BRCA2/i);else set(UNKNOWN,'未识别到当前条文所列基因的阳性结论。','需有明确阳性表述才可支持该条。',['所列基因的明确检测结论']);break;
case 'sr_prescreen':set(UNKNOWN,'愿意参加研究；病历记载 BRCA2 变异。未见已签署预知情及最新 HER2 阴性结论。','本条是预知情/基因检测路径，不能据此宣布治疗入组。',['预知情实际签署状态','该路径所要求的 HER2 阴性证据'],/BRCA2|HER.?2/i);r.basis='病历＋意愿背景';break;
case 'x1':set(UNKNOWN,'完整抗肿瘤治疗史中未见 CDK2 抑制剂；有当前联合治疗，未记末次各药给药日及拟首次研究给药日。','达尔西利是CDK4/6抑制剂，不能误判成既往CDK2治疗。洗脱期需逐药按4周或5个半衰期取短计算；治疗开始时间不能替代末次给药时间。',['末次各药给药日、适用半衰期及拟研究首次给药日'],/达尔西利|方案|2024/);break;
case 'x2':set(UNKNOWN,'未见肾功能、胆红素、ALT/AST、血细胞、电解质及三次QTcF的可核对结果。','确认病历日期只说明资料时点，不能生成检验数值。原文阈值需按单位、ULN、肝转移/Gilbert例外及AND逻辑分别核对。',['原文所列数值、单位与参考上限','筛选期三次QTcF及电解质纠正状态']);break;
case 'x3':r.gaps=['心血管病史、时间范围、血压与心电图记录'];break;
case 'x4':set(UNKNOWN,'病历描述饮食、睡眠尚可，大小便如常，近期体重无明显增减。','一般生活描述不能证明全部既往治疗毒性已恢复至要求等级；需区分神经病变、脱发等原文例外。',['残留不良反应的具体类型、严重度及恢复情况'],/饮食|大小便|体重/);break;
case 'x5':r.gaps=['有无相关CNS症状/病变、局部治疗日期、稳定期及激素剂量'];break;
case 'x6':r.gaps=['其他恶性肿瘤的明确病史及是否进展/正在治疗'];break;
case 'x7':set(UNKNOWN,'已见瑞波西利以外的CDK4/6治疗；未见既往瑞波西利不耐受。','瑞波西利不耐受分支没有命中依据；联合治疗还需评估症状性内脏负荷及是否适合内分泌，不能由骨转移描述代替。',['拟采用单药或联合治疗路径','内脏症状与内分泌治疗适宜性判断'],/达尔西利|骨转移/);break;
case 'x8':set(UNKNOWN,'病历记录的是抗肿瘤内分泌治疗。','他莫昔芬、依西美坦和卵巢抑制不能误当作更年期激素替代。完整抗肿瘤记录不等于明确否认非抗肿瘤激素替代使用。',['当前非抗肿瘤激素替代使用情况'],/他莫昔芬|依西美坦/);break;
case 'x9':r.gaps=['是否存在未控制严重感染的病史或临床证据'];r.reason='病历未记录感染评估；不把未查当阴性，也不额外要求原文未规定的普遍HBV/HCV筛查。';break;
case 'x10':set(UNKNOWN,'饮食、大小便如常，已有口服治疗记录。','这对当前进食与排便状态有支持，但不能排除所有会显著改变药物吸收的胃肠疾病。',['影响吸收的胃肠疾病有无及控制状态'],/大小便|饮食|口服/);break;
case 'x11':set(UNKNOWN,'既往口服内分泌治疗有记录。','既往能口服提供支持，但不能单独确认当前吞咽能力及愿意按新研究给药方案服药。',['当前吞咽能力及按给药方案服用的意愿'],/口服/);break;
case 'x12':set(UNKNOWN,'记录有2021年乳腺手术及后续预防性手术，未给出拟研究首次给药日。','远期手术本身不命中≤4周限制；但不能仅由历史手术时间推断当前手术恢复与首次研究用药的相对间隔。',['近期大手术及恢复状态、拟首次给药时点'],/手术|切除/);break;
case 'x13':r.gaps=['研究者对安全性、依从性及结果解释影响的综合判断'];r.reason='不是从病历关键词自动生成的医学结论。';break;
case 'x14':r.gaps=['拟首次给药前两周输血/造血生长因子使用及稳定剂量记录'];break;
case 'x15':r.gaps=['相关药物、辅料及适用时花生/大豆过敏史'];break;
case 'x16':r.gaps=['完整合并用药的名称、停药能力与适用时间间隔'];r.reason='抗肿瘤治疗史完整，仍不能从中断言没有PPI、草药等非抗肿瘤合并用药；本条不能自动判未命中。';break;
case 'x17':set(UNKNOWN,'45岁女性，既往使用卵巢抑制药物。','药物导致停经不等于自然绝经；参加研究意愿也不等于已满足具体避孕方法和期限。',['自然绝经/生育状态与适用的避孕方式、期限'],/戈舍瑞林|舍瑞林/);break;
case 'x18':set(NA,'患者为女性。','该条仅针对男性的避孕与捐精要求。');r.basis='用户明确提供';break;
case 'x19':r.gaps=['明确的妊娠或哺乳状态'];break;
default:r.gaps=['本条要求的直接记录'];
}
r.quotes=r.refs.map(x=>x.text);r.evidence=r.status===UNKNOWN?'不足':r.status===NA?'不适用':'充分';return r;
}
function summarize(t,s){const rows=E.listFor(t).map(c=>({c,...E.evaluate(c,s)}));const counts={pass:0,fail:0,unknown:0,na:0};rows.forEach(r=>counts[r.status===PASS?'pass':r.status===FAIL?'fail':r.status===NA?'na':'unknown']++);const decisive=rows.filter(r=>r.status===FAIL);const matched=rows.filter(r=>r.status===PASS);return {rows,counts,title:counts.fail?'当前材料不符合':counts.unknown?'尚不能确认入组':'当前条目符合',tone:counts.fail?'fail':counts.unknown?'unknown':'pass',reason:decisive.length?decisive.map(r=>r.c.id==='e5a'?'缺少原文要求的额外一线晚期全身治疗。':r.c.id==='e5b'?'既往达尔西利不在本条列明的三种CDK4/6药物中。':r.reason).join('；'):t==='spr'&&matched.some(r=>r.c.id==='sr_gene')?'BRCA2条件有支持；HER2、治疗失败与可测量病灶等仍证据不足。':'仍有关键条目缺少直接证据。'};}
E.evaluate=evaluate;E.summarize=summarize;E.material=material;E.missing=()=>[];
})();
