const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
$("#theme").addEventListener("click",()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==="dark"?"":"dark"});
addEventListener("scroll",()=>{const h=document.documentElement;$("#progress").style.width=((h.scrollTop/(h.scrollHeight-h.clientHeight))*100||0)+"%"});
const sections=[...$$("article section[id]")],toc=[...$$(".toc a")];
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){toc.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id))}})},{rootMargin:"-18% 0px -70% 0px"});
sections.forEach(s=>obs.observe(s));

const patterns={
citrus:{v:[82,46,18,72,31,12,55,26],state:"明亮高频样模式",note:"多个通道共同活跃，其中 R1/R4 较强。重点不是“R1=柑橘”，而是整组相对比例。"},
mint:{v:[15,77,64,21,88,42,18,58],state:"分散双峰模式",note:"R5 最强，但它并不独占意义；如果只读最强通道，会丢失大量可区分信息。"},
roast:{v:[58,22,84,66,41,73,35,61],state:"宽谱模式",note:"复杂烘焙类气味通常来自混合物。这里用更广泛的通道活动模拟“多成分共同贡献”。"},
smoke:{v:[33,69,47,91,63,78,52,86],state:"高强度复合模式",note:"多数通道都活跃，说明“总体强”与“模式身份”是两个不同维度。"},
mix:{v:[74,39,69,80,37,55,47,58],state:"混合后的新模式",note:"这里不是简单逐列相加，而是示意混合后形成新的整体模式。真实系统还存在受体竞争、抑制和网络非线性。"}
};
function setPattern(k){const d=patterns[k],bars=[...$$(".receptor span")];bars.forEach((b,i)=>b.style.height=d.v[i]+"%");const active=d.v.filter(x=>x>=50).length,top=d.v.indexOf(Math.max(...d.v))+1;$("#activeCount").textContent=active+"/8";$("#topChannel").textContent="R"+top;$("#patternState").textContent=d.state;$("#codeNote").textContent=d.note;$$("#odorButtons button").forEach(b=>b.classList.toggle("active",b.dataset.k===k))}
$$("#odorButtons button").forEach(b=>b.addEventListener("click",()=>setPattern(b.dataset.k)));setPattern("citrus");

const trans=[
"<strong>01 · 结合：</strong>挥发性分子进入黏液并接触嗅纤毛膜上的 GPCR。结合口袋有选择性，但不是一把锁只配一把钥匙。",
"<strong>02 · G 蛋白：</strong>受体构象改变后激活 Golf，把膜外化学事件接到细胞内信号链。",
"<strong>03 · cAMP：</strong>Golf 促进腺苷酸环化酶活动，提高第二信使 cAMP，使局部结合事件影响多个下游通道。",
"<strong>04 · 离子通道：</strong>cAMP 打开环核苷酸门控通道，引发阳离子流入和去极化，其他离子机制继续放大膜电变化。",
"<strong>05 · 动作电位：</strong>当去极化达到阈值，神经元产生动作电位并沿轴突进入嗅球；化学事件已转换成带受体身份的时序电活动。"
];
function setTrans(i){$$(".trans-btn").forEach((b,j)=>b.classList.toggle("active",j===i));$("#transDetail").innerHTML=trans[i]}
$$(".trans-btn").forEach((b,i)=>b.addEventListener("click",()=>setTrans(i)));setTrans(0);

const routes={
ortho:{title:"鼻前嗅觉：先闻到外界，再判断“那里有什么”",text:"吸气时，外界挥发分子从鼻孔进入并到达嗅上皮。这一路更像远距离环境采样：食物在哪里、烟从哪来、空间里有什么变化。",svg:'<rect x="24" y="24" width="572" height="282" rx="24" fill="var(--panel)" stroke="var(--line)"/><path d="M80 182C143 126 215 122 277 158C299 171 299 207 273 220C219 247 151 244 93 218" fill="var(--soft)" stroke="var(--line)" stroke-width="2"/><path d="M87 205C149 188 199 187 263 202" fill="none" stroke="var(--accent2)" stroke-width="9" stroke-linecap="round"/><path d="M37 179C76 168 105 162 143 165" fill="none" stroke="var(--accent)" stroke-width="5"/><path d="M126 155l19 10-19 10" fill="var(--accent)"/><path d="M201 188C211 157 231 139 259 126" fill="none" stroke="var(--accent)" stroke-width="4"/><text x="43" y="152" fill="var(--accent)" font-size="13" font-weight="700">吸气：外界 → 鼻腔</text><text x="286" y="124" fill="var(--text)" font-size="13" font-weight="700">嗅上皮</text><text x="348" y="198" fill="var(--muted)" font-size="13">远处是什么？是否要接近？</text>'},
retro:{title:"鼻后嗅觉：食物在嘴里，但香气从后方进入鼻腔",text:"咀嚼释放挥发物，呼气时它们从口咽部向上进入鼻腔，再刺激同一片嗅上皮。大脑把这一路与味觉、口腔触觉绑定，因此主观上常觉得香气“在嘴里”。",svg:'<rect x="24" y="24" width="572" height="282" rx="24" fill="var(--panel)" stroke="var(--line)"/><path d="M80 160C145 118 215 120 273 151C298 164 301 197 277 211C218 245 149 239 91 210" fill="var(--soft)" stroke="var(--line)" stroke-width="2"/><path d="M92 199C150 185 203 184 263 197" fill="none" stroke="var(--accent2)" stroke-width="9" stroke-linecap="round"/><path d="M116 236C188 272 286 271 344 235C370 219 375 199 363 178" fill="none" stroke="var(--line)" stroke-width="18" stroke-linecap="round"/><path d="M339 235C321 208 312 182 287 165" fill="none" stroke="var(--accent)" stroke-width="5"/><text x="338" y="259" fill="var(--accent)" font-size="13" font-weight="700">呼气：口腔 → 咽部 → 鼻腔</text><text x="286" y="126" fill="var(--text)" font-size="13" font-weight="700">嗅上皮</text><text x="61" y="274" fill="var(--muted)" font-size="13">它构成“风味”，却容易被误认为舌头的味觉</text>'}
};
function setRoute(k){const d=routes[k];$("#routeSvg").innerHTML=d.svg;$("#routeInfo").innerHTML="<h3>"+d.title+"</h3><p>"+d.text+"</p>";$$("#routeButtons button").forEach(b=>b.classList.toggle("active",b.dataset.k===k))}
$$("#routeButtons button").forEach(b=>b.addEventListener("click",()=>setRoute(b.dataset.k)));setRoute("ortho");

function adaptVal(t){return 22+78*Math.exp(-t/52)}
function buildAdapt(){let d="";for(let t=0;t<=180;t+=3){const x=62+(t/180)*618,y=175-(adaptVal(t)/100)*123;d+=(t?"L":"M")+x.toFixed(1)+" "+y.toFixed(1)+" "}$("#adaptCurve").setAttribute("d",d)}
function setAdapt(){const t=Number($("#adaptTime").value),p=adaptVal(t),x=62+(t/180)*618,y=175-(p/100)*123;$("#adaptTimeLabel").textContent=t+" 秒";$("#perceived").textContent=Math.round(p)+"%";$("#adaptDot").setAttribute("cx",x);$("#adaptDot").setAttribute("cy",y);$("#adaptState").textContent=t<20?"新出现":t<75?"快速适应":t<140?"背景化":"低增益稳定"}
buildAdapt();$("#adaptTime").addEventListener("input",setAdapt);setAdapt();

const hist={
g1991:["1991｜受体家族打开分子入口","Buck 与 Axel 描述庞大的嗅觉受体候选基因家族，使“鼻子如何把化学差异变成神经身份”第一次有了可追踪的分子基础。"],
g2004:["2004｜从基因走向系统组织原则","诺贝尔奖表彰的不只是受体发现，还包括单受体神经元、同类轴突汇聚与组合编码等系统组织原则。"],
g2023:["2023｜第一次高分辨率看见人类气味分子怎样结合受体","OR51E2—丙酸结构把抽象的“受体识别”变成结合口袋、构象变化与选择性问题。"],
g2026:["2026｜嗅觉架构被迁移到机器人与可穿戴设备","电子鼻综述与微型可穿戴嗅觉芯片表明，工程系统正把交叉敏感阵列、机器学习和主动采样结合起来。"]
};
function setHist(k){const d=hist[k];$$("#historyTimeline .timebtn").forEach(b=>b.classList.toggle("active",b.dataset.k===k));$("#historyDetail").innerHTML="<strong>"+d[0]+"</strong><p>"+d[1]+"</p>"}
$$("#historyTimeline .timebtn").forEach(b=>b.addEventListener("click",()=>setHist(b.dataset.k)));setHist("g1991");