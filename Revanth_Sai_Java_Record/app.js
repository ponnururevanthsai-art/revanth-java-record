
const esc = s => String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const weekNav=document.getElementById('weekNav');
weekNav.innerHTML=RECORD.map(w=>`<a class="navweek" data-week="${w.week}" href="#week-${w.week}">Week ${w.week}</a>`).join('');
function toggleSidebar(){document.body.classList.toggle('sidebar-open')}
function toggleTheme(){document.body.classList.toggle('light');localStorage.theme=document.body.classList.contains('light')?'light':'dark'}
if(localStorage.theme==='light')document.body.classList.add('light');

function home(){
document.title='P. Revanth Sai | Java Record';
document.getElementById('content').innerHTML=`
<section class="hero">
 <div class="eyebrow">JAVA PROGRAMMING • VIRTUAL RECORD</div>
 <h1>Build. Learn. <span>Compile.</span></h1>
 <p>A personal digital record of Java Programming experiments, concepts and practical programs — organized week by week for quick revision and lab reference.</p>
 <div class="profile-card">
  <img src="assets/profile.png" onerror="this.style.display='none'">
  <div><h2 style="margin:0 0 15px">${PROFILE.name}</h2><div class="details">
   ${Object.entries(PROFILE).slice(1).map(([k,v])=>`<div class="detail"><small>${k}</small><b>${v}</b></div>`).join('')}
  </div></div>
 </div>
</section>
<section class="hero" style="padding-top:5px"><div class="eyebrow">RECORD INDEX</div><h2>Explore the practical weeks</h2>
<div class="week-grid">${RECORD.map(w=>`<a class="week-card" href="#week-${w.week}"><strong>WEEK ${w.week}</strong><h3>${w.programs.length?`${w.programs.length} ${w.programs.length===1?'entry':'programs'}`:'No task'}</h3><p>${w.week===1?'Language comparison':w.week===4||w.week===5?'No programming task assigned':w.programs[0]?.title||''}</p></a>`).join('')}</div></section>`;
}
function weekView(n){
const w=RECORD.find(x=>x.week==n); if(!w)return home();
document.title=`Week ${n} | Java Record`;
if(w.programs[0].kind==='none'){document.getElementById('content').innerHTML=`<div class="section-head"><div class="crumb">JAVA PROGRAMMING RECORD</div><h1>Week ${n}</h1></div><div class="program-list"><div class="box none">No programming task was assigned this week.</div></div>`;return}
document.getElementById('content').innerHTML=`<div class="section-head"><div class="crumb">JAVA PROGRAMMING RECORD / WEEK ${n}</div><h1>Week ${n}</h1><p>Select a program to view its question, Java code and output.</p></div><div class="program-list">${w.programs.map((p,i)=>`<a class="program-card" href="#week-${n}-program-${i+1}"><span class="num">${String(i+1).padStart(2,'0')}</span><div><b>Program ${String(i+1).padStart(2,'0')}</b><div>${esc(p.title)}</div><small>View question · code · output</small></div></a>`).join('')}</div>`;
}
function programView(w,p){
const idx=p.no-1, prev=idx>0?`#week-${w.week}-program-${idx}`:`#week-${w.week}`, next=idx<w.programs.length-1?`#week-${w.week}-program-${idx+2}`:`#week-${w.week+1}`;
let body='';
if(w.week===1) body=`<div class="box"><div class="boxhead">Comparative Table</div><div class="info"><table class="compare"><tr><th>Language</th><th>Type</th><th>Key Strength</th><th>Typical Use</th></tr>
<tr><td>Java</td><td>Object-oriented</td><td>Portable, robust</td><td>Enterprise, Android, backend</td></tr>
<tr><td>C</td><td>Procedural</td><td>Fast, low-level</td><td>Systems, embedded</td></tr>
<tr><td>C++</td><td>Multi-paradigm</td><td>Performance + OOP</td><td>Games, systems, competitive programming</td></tr>
<tr><td>Python</td><td>High-level</td><td>Simple syntax</td><td>AI, data science, automation</td></tr>
<tr><td>JavaScript</td><td>Dynamic</td><td>Web interactivity</td><td>Frontend, backend</td></tr></table></div></div>`;
else if(p.kind==='installation') body=`<div class="box"><div class="boxhead">Record Procedure</div><div class="info">${esc(p.code).replace(/\\n/g,'<br>')}</div></div>`;
else body=`<div class="box"><div class="boxhead">Java Code <button class="copy" onclick="copyCode()">Copy</button></div><pre id="code" class="code">${esc(p.code)}</pre></div><div class="box"><div class="boxhead">Output</div><pre class="output">${esc(p.output)}</pre></div>`;
document.getElementById('content').innerHTML=`<div class="program-view"><a class="back" href="#week-${w.week}">← Back to Week ${w.week}</a><div class="tag">PROGRAM ${String(p.no).padStart(2,'0')}</div><h1 class="program-title">${esc(p.title)}</h1><div class="info" style="padding-left:0">Question / Objective: ${esc(p.title)}.</div>${body}<div class="pager"><a href="${prev}">← Previous</a><a href="${next}">Next →</a></div></div>`;
}
function copyCode(){navigator.clipboard.writeText(document.getElementById('code').innerText);event.target.textContent='Copied!';setTimeout(()=>event.target.textContent='Copy',1000)}
function router(){
const h=location.hash.slice(1);
if(!h||h==='home'){home();return}
let m=h.match(/^week-(\d+)-program-(\d+)$/); if(m){let w=RECORD.find(x=>x.week==+m[1]);let p=w?.programs[+m[2]-1];if(w&&p)programView(w,p);return}
m=h.match(/^week-(\d+)$/);if(m){weekView(+m[1]);return}
home()
}
window.addEventListener('hashchange',router); router();
