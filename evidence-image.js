/* Verified source-image regions. Coordinates refer to the unchanged uploaded originals. */
window.EvidenceImage=(()=>{
const regions={
'f06f57b170f1bd93c4e86ef1222ff075dfb900bfebb2beb044ecd60636b840ce':{width:1280,height:529,lines:[
[109,0,1035,35],[109,43,1035,39],[109,92,1035,39],[109,141,1035,39],[109,190,1035,39],[109,239,1035,39],[109,288,1035,39],[109,335,1035,39],[109,382,1035,39],[109,429,1035,39],[109,477,780,37]]},
'9a00466bd494ec5f17052d47bebcfdc920e7d699cd43cbf2e9c30b51ca38d914':{width:1280,height:1085,lines:[
[78,5,615,39],[78,55,1060,39],[78,105,1060,39],[78,154,1060,39],[78,204,1060,39],
[78,255,750,39],[832,255,305,39],
[78,305,1060,39],[78,355,1060,39],[78,407,1060,39],[78,458,1060,39],[78,510,1060,39],[78,561,1060,39],[78,612,1060,39],[78,663,1060,39],[78,714,1060,39],[78,765,1060,39],[78,816,1060,39],[78,867,1060,39],[78,919,1060,39],[78,971,1060,39],[78,1023,1060,39]]}
};
function boxes(report,selected){const known=regions[report.hash],size=known||report.imageSize;return [...new Set(selected)].flatMap(line=>{const raw=known?.lines[line-1],b=raw?{x:raw[0],y:raw[1],width:raw[2],height:raw[3]}:report.lineRegions?.[line-1];if(!b||!size||!size.width||!size.height)return[];return[{line,x:100*b.x/size.width,y:100*b.y/size.height,width:100*b.width/size.width,height:100*b.height/size.height}]})}
function render(report,url,requested){const selected=String(requested||'').split(',').map(Number).filter(n=>Number.isInteger(n)&&n>0),marks=boxes(report,selected);return `${selected.length?`<p class="evidence-location">第 ${selected.join('、')} 行 · 黄色区域为引用位置</p>`:''}${url?`<div class="evidence-image-scroll"><figure class="evidence-image"><img class="doc-preview" src="${url}" alt="病历原图${selected.length?'，已标出引用行':''}">${marks.map(b=>`<span class="evidence-line-highlight" data-highlight-line="${b.line}" aria-label="第${b.line}行引用位置" style="left:${b.x}%;top:${b.y}%;width:${b.width}%;height:${b.height}%"></span>`).join('')}</figure></div><button class="link evidence-zoom" data-action="evidence-zoom">放大图片</button>`:'<p>此浏览器未保存原图，请重新上传。</p>'}${selected.length&&!marks.length?'<p class="notice">本次识别没有保存文字位置，请对照下方引用文字查看原图。</p>':''}<details ${selected.length?'open':''}><summary>查看识别文字（逐行）</summary><div class="evidence-transcript">${(report.text||'未取得可用文字').split('\n').map((line,i)=>`<p class="${selected.includes(i+1)?'selected':''}"><span>${i+1}.</span> ${esc(line)}</p>`).join('')}</div></details>`}
return{boxes,render};
})();
document.addEventListener('click',e=>{const b=e.target.closest('[data-action="evidence-zoom"]');if(!b)return;const image=document.querySelector('.evidence-image');if(!image)return;const zoomed=image.classList.toggle('zoomed');b.textContent=zoomed?'缩小图片':'放大图片';});
