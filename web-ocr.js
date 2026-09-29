/* Supplementary uploads: client-only OCR, lazy loaded to keep the seeded demo fast. */
window.WebOCR=(()=>{
let workerPromise,notice=()=>{};
function load(){return new Promise((resolve,reject)=>{if(window.Tesseract)return resolve();const script=document.createElement('script');script.src='https://cdn.jsdelivr.net/npm/tesseract.js@7.0.0/dist/tesseract.min.js';script.onload=resolve;script.onerror=()=>{script.remove();reject(new Error('识别组件加载失败，请检查网络后重试'))};document.head.appendChild(script)})}
async function recognize(data,onProgress){notice=onProgress||(()=>{});try{if(!workerPromise)workerPromise=(async()=>{notice('首次加载识别组件');await load();return Tesseract.createWorker('chi_sim+eng',1,{logger:m=>notice(m.status==='recognizing text'?Math.round(m.progress*100)+'%':'正在准备识别组件'),errorHandler:()=>{}})})();const worker=await workerPromise;const result=await worker.recognize(data);return{lines:result.data.text.split(/\n+/).map(text=>text.trim()).filter(Boolean).map(text=>({text,confidence:result.data.confidence/100}))}}catch(e){if(workerPromise)workerPromise.then(w=>w.terminate()).catch(()=>{});workerPromise=null;throw new Error('图片识别未完成，请稍后重试。'+(e.message||''))}}
return{recognize};
})();
