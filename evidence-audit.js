/* Current-material audit: no outside registry requirements, no assumed lab values. */
(()=>{
const E=window.Screening,D=window.StudyData;
const FAIL='不符合',PASS='符合',UNKNOWN='证据不足',NA='不适用';
function material(s){const pages=s.reports.filter(r=>r.confirmed&&r.text&&(!r.qid||r.followupSubmitted));const flat=pages.map(p=>p.text).join('\n').replace(/\s/g,'');const refs=re=>pages.flatMap(p=>p.text.split('\n').map((line,i,lines)=>({line,i,lines})).filter(x=>re.test(x.line)).slice(0,2).map(x=>({id:p.id,name:p.name,line:x.i+1,text:x.lines.slice(Math.max(0,x.i-1),Math.min(x.lines.length,x.i+2)).join(' ')}))).slice(0,3);return {pages,flat,refs,dalpi:/达尔西利/.test(flat),ai:/依西美坦/.test(flat),oldAI:/他莫昔芬/.test(flat),cycles:/22周期/.test(flat),bone:/骨质破坏|骨转移/.test(flat),brca:/BRCA2.{0,30}(胚系|致病)/i.test(flat),breast:/乳腺/.test(flat),er:/ER.{0,20}(70|80)%/i.test(flat),her2:/HER.?2.{0,7}2\+/i.test(flat),fish:/HER.?2基因未扩增/i.test(flat),pending:/拟行疾病进展确认/.test(flat),adjuvant:/EC.T方案化疗/.test(flat),tamox:/他莫昔芬/.test(flat),oral:/口服/.test(flat),knownCourse:/2024.{0,160}(研究|随机)/.test(flat)&&/2021/.test(flat)&&/22周期/.test(flat)};}
function evaluate(c,s){const m=material(s),r={status:UNKNOWN,known:'当前材料未提供可直接核对本条的记录。',reason:'病历缺少本条所需信息，暂不能判断是否符合。',gaps:[],refs:[],basis:'病历证据',team:'',questions:[],quotes:[]};
const set=(status,known,reason,gaps=[],re)=>{Object.assign(r,{status,known,reason,gaps});if(re)r.refs=m.refs(re)};
if(!s.analyzed){set(UNKNOWN,'尚未提交病历。','提交后基于实际上传内容评估。');return r}
switch(c.id){
case 'e1':set(UNKNOWN,'已知患者愿意签署知情同意，未见已签署记录。','患者有参加意愿，但未见本研究的签署记录，需核实知情同意书。',['实际签署记录或签署状态']);r.basis='已知背景';break;
case 'e2':set(PASS,'45 岁女性。','45岁，符合年龄要求。');r.basis='用户明确提供';break;
case 'e3':set(PASS,'ECOG = 0。','ECOG 0分，符合≤1分要求。');r.basis='用户明确提供';break;
case 'e4':
set(UNKNOWN,m.breast?'病历有乳腺癌诊断；ER/PR 阳性。既往原发标本 HER2 未扩增，后续淋巴结标本 HER2 2+。':'尚未提取到完整的肿瘤病理分型。','HR阳性和乳腺癌诊断有依据。最新淋巴结标本HER2为2+，尚缺该标本的ISH/FISH结果，不能确认HER2阴性；早年原发标本的阴性结果不能替代。',['后续 HER2 2+ 标本对应的 ISH/FISH 结论'],/HER.?2|Her2|ER\(/i);break;
case 'e5a':
if(m.knownCourse&&m.dalpi&&m.ai){set(FAIL,'完整治疗记录显示：术后 EC-T 辅助化疗及他莫昔芬＋卵巢抑制；复发/转移后为阿得贝利单抗＋达尔西利＋依西美坦＋戈舍瑞林同一联合方案，已完成22周期。','已有一线晚期CDK4/6联合内分泌治疗，但缺少要求的另一线晚期全身治疗。该联合方案只算一线，术后辅助EC-T也不计入晚期治疗，因此不符合。',[],/达尔西利|22周期|EC.T/)}else set(UNKNOWN,'当前已识别治疗信息不足以重建完整辅助及晚期治疗时间线。','需核实每线治疗的先后顺序及其属于辅助治疗还是晚期治疗，才能计算线数。',['可区分治疗背景和先后顺序的病历证据'],/达尔西利|化疗/);break;
case 'e5b':
if(m.knownCourse&&m.dalpi){set(FAIL,'晚期记录中的 CDK4/6 抑制剂是达尔西利，联合依西美坦。完整记录未列出哌柏西利、瑞波西利或阿贝西利治疗。','依西美坦符合内分泌药物要求；达尔西利不在本条指定的哌柏西利、瑞波西利、阿贝西利中。完整治疗史也未符合辅助治疗中的CDK4/6例外条件，因此不符合。',[],/达尔西利|EC.T|他莫昔芬/)}else set(UNKNOWN,'尚未提取到完整的指定药物治疗史。','需核实具体药名、使用阶段及治疗顺序，才能判断是否符合本条。',['指定药物和适用治疗背景的记录']);break;
case 'e6':
set(UNKNOWN,m.bone?'病历记载骨质破坏、骨转移可能；既往超声淋巴结约9×8 mm。未见近期CT/MRI病灶测量结果。':'未见近期病灶尺寸及测量记录。','9×8 mm的超声淋巴结记录不能确认符合RECIST可测量病灶要求。如考虑按主要溶骨性病灶入选，需影像证明能准确测量并在复查时比较；如该病灶接受过局部放疗，还需核实治疗后进展。',['近期CT/MRI报告：病灶部位、尺寸及测量方式','骨病灶是否有可测量的软组织部分；若按主要溶骨性病灶入选，需影像证明能准确测量并在复查时比较','目标病灶是否接受过局部放疗，以及治疗后是否进展'],/骨质破坏|骨转移|9.*8/);break;
case 'e7':set(UNKNOWN,'既往有穿刺和手术取材记录；当前活检意愿尚未确认。','需确认患者是否愿意接受研究活检，并评估取材是否安全可行。如拟用最近存档样本替代新活检，需核实是否符合替代条件；现有旧样本取材后已接受全身治疗。',['患者当前活检意愿','可取材病灶及安全性评估；如用存档样本替代，需核实样本时点和取材后治疗情况，或提供活检豁免记录'],/穿刺|活检|方案/);r.basis='病历证据';break;
case 'x1':set(UNKNOWN,'完整抗肿瘤治疗史中未见 CDK2 抑制剂；有当前联合治疗，未记末次各药给药日及拟首次研究给药日。','未见既往CDK2抑制剂治疗；达尔西利属于CDK4/6。尚缺末次用药日、放疗情况及拟首次研究给药日，无法核实本条各项洗脱要求。',['末次各药给药日、适用半衰期及拟研究首次给药日'],/达尔西利|方案|2024/);break;
case 'x2':set(UNKNOWN,'未见肾功能、胆红素、ALT/AST、血细胞、电解质及三次QTcF的可核对结果。','未见具体检验数值和三次QTcF，暂无法与方案阈值比较。核对时需看单位及参考上限，并考虑肝转移、Gilbert综合征等例外。',['方案要求的检验结果、单位及参考上限','筛选期三次QTcF及电解质纠正状态']);break;
case 'x3':r.known="未见完整心脏病史、血压及心电图记录。";r.reason="需核实近6个月心梗等病史、心律失常及血压控制情况，才能判断是否符合心血管要求。";r.gaps=['心血管病史、时间范围、血压与心电图记录'];break;
case 'x4':set(UNKNOWN,'病历描述饮食、睡眠尚可，大小便如常，近期体重无明显增减。','饮食、睡眠和排便正常，不能确认所有治疗毒性均已恢复。需核实残留不良反应及其分级，并按原文处理神经病变、脱发等例外。',['残留不良反应的具体类型、严重度及恢复情况'],/饮食|大小便|体重/);break;
case 'x5':r.known="未见脑转移及其治疗、激素用药记录。";r.reason="需核实有无症状性脑转移；如有，需按方案确认治疗时间、神经系统稳定期及激素剂量。";r.gaps=['脑转移或相关症状、局部治疗日期、稳定时间及激素剂量'];break;
case 'x6':r.known="病历未说明是否有其他恶性肿瘤。";r.reason="需核实是否有正在进展或需治疗的其他肿瘤；如有，再判断是否属于原文允许的例外。";r.gaps=['其他恶性肿瘤的明确病史及是否进展/正在治疗'];break;
case 'x7':set(UNKNOWN,'已见瑞波西利以外的CDK4/6治疗；未见既往瑞波西利不耐受。','未见瑞波西利不耐受记录。如拟联合治疗，还需评估内脏症状及病情是否适合内分泌治疗；仅凭骨转移记录无法判断。',['拟采用单药或联合治疗路径','内脏症状与内分泌治疗适宜性判断'],/达尔西利|骨转移/);break;
case 'x8':set(UNKNOWN,'病历记录的是抗肿瘤内分泌治疗。','已记录的抗肿瘤内分泌治疗不属于激素替代治疗。仍需核实当前是否使用更年期等非抗肿瘤激素替代药物。',['当前非抗肿瘤激素替代使用情况'],/他莫昔芬|依西美坦/);break;
case 'x9':r.gaps=['是否存在未控制严重感染的病史或临床证据'];r.reason='未见感染评估，需核实有无未控制的严重感染。乙肝、丙肝检查按原文规定及相关病史安排。';break;
case 'x10':set(UNKNOWN,'饮食、大小便如常，已有口服治疗记录。','现有记录提示进食、排便尚可，但仍需核实是否有影响药物吸收的胃肠疾病。',['影响吸收的胃肠疾病有无及控制状态'],/大小便|饮食|口服/);break;
case 'x11':set(UNKNOWN,'既往口服内分泌治疗有记录。','既往口服治疗有记录；仍需确认当前能否吞咽，并愿意按研究方案服药。',['当前吞咽能力及按给药方案服用的意愿'],/口服/);break;
case 'x12':set(UNKNOWN,'记录有2021年乳腺手术及后续预防性手术，未给出拟研究首次给药日。','已记载的手术距今较久，不属于4周内手术。仍需核实近期是否有大手术、是否恢复，以及与首次研究给药的间隔。',['近期大手术及恢复状态、拟首次给药时点'],/手术|切除/);break;
case 'x13':r.gaps=['研究者对其他疾病及其影响的综合评估'];r.reason='需由研究者综合判断其他疾病是否影响安全性、依从性或结果解读；现有病历不足以确认。';break;
case 'x14':r.known="未见近期输血或造血生长因子使用记录。";r.reason="需核实首次研究给药前2周是否输血或使用造血生长因子；长期使用者还需核对开始时间和剂量是否稳定。";r.gaps=['拟首次给药前两周输血/造血生长因子使用及稳定剂量记录'];break;
case 'x15':r.known="未见完整药物及辅料过敏史。";r.reason="需核实研究药物、辅料及同类药物过敏史；联合治疗时还需核实花生、大豆过敏。";r.gaps=['相关药物、辅料及适用时花生/大豆过敏史'];break;
case 'x16':r.gaps=['完整合并用药的名称、停药能力与适用时间间隔'];r.reason='抗肿瘤治疗史完整，但未包含全部合并用药。需核实PPI、草药等禁用药物，以及能否在规定时间停用或替换。';break;
case 'x17':set(UNKNOWN,'45岁女性，既往使用卵巢抑制药物。','卵巢抑制导致的停经不能按自然绝经判断。需核实生育状态，以及是否按方案要求采用避孕方法并持续规定时间。',['自然绝经/生育状态与适用的避孕方式、期限'],/戈舍瑞林|舍瑞林/);break;
case 'x18':set(NA,'患者为女性。','本条仅适用于男性，当前患者不适用。');r.basis='用户明确提供';break;
case 'x19':r.known="未见明确的妊娠或哺乳状态记录。";r.reason="需确认当前未妊娠、未哺乳；检查按方案和生育状态安排。";r.gaps=['明确的妊娠或哺乳状态'];break;
default:r.gaps=['本条要求的直接记录'];
}
r.quotes=r.refs.map(x=>x.text);r.evidence=r.status===UNKNOWN?'不足':r.status===NA?'不适用':'充分';return r;
}
function summarize(t,s){const rows=E.listFor(t).map(c=>({c,...E.evaluate(c,s)}));const counts={pass:0,fail:0,unknown:0,na:0};rows.forEach(r=>counts[r.status===PASS?'pass':r.status===FAIL?'fail':r.status===NA?'na':'unknown']++);const decisive=rows.filter(r=>r.status===FAIL);const matched=rows.filter(r=>r.status===PASS);return {rows,counts,title:counts.fail?'当前材料不符合':counts.unknown?'尚不能确认入组':'当前条目符合',tone:counts.fail?'fail':counts.unknown?'unknown':'pass',reason:decisive.length?decisive.map(r=>r.c.id==='e5a'?'缺少原文要求的额外一线晚期全身治疗。':r.c.id==='e5b'?'既往达尔西利不在本条列明的三种CDK4/6药物中。':r.reason).join('；'):'仍有关键条目缺少直接证据。'};}
E.evaluate=evaluate;E.summarize=summarize;E.material=material;E.missing=()=>[];
})();
