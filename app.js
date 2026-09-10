/* Offline CBT: no server, analytics, account, or external dependencies. */
'use strict';
const BANK = window.QUESTION_BANK;
const CONCEPTS = window.CONCEPT_NOTES.concepts;
const QUESTIONS = BANK.questions;
const TOPICS = BANK.topics;
const PAST_BANK = window.PAST_EXAM_BANK;
if (!PAST_BANK || !window.PAST_REVIEWS) throw new Error('기출 자료를 불러오지 못했습니다. 새로고침해 주세요.');
const PAST_QUESTIONS = PAST_BANK.exams.flatMap(e=>e.questions);
const ALL_QUESTIONS = [...QUESTIONS,...PAST_QUESTIONS];
const BY_ID = Object.fromEntries(ALL_QUESTIONS.map(q => [q.id, q]));
const NOTE_TOPICS = [...TOPICS,{id:'past-ops',name:'기출 · 리눅스 운영 및 관리',subject:1},{id:'past-use',name:'기출 · 리눅스 활용',subject:2}];
const TOPIC = Object.fromEntries(NOTE_TOPICS.map(t => [t.id, t]));
for(const q of PAST_QUESTIONS){
  q.review=window.PAST_REVIEWS.questions[q.id];
  if(!q.review) throw new Error('기출 해설 검토 자료가 누락되었습니다: '+q.id);
  q.explanation=q.review.note||q.originalExplanation;
  q.memory='';
  if(q.review.fullCredit)q.fullCredit=true;
  if(q.review.acceptedAnswers)q.acceptedAnswers=q.review.acceptedAnswers;
}
function isCorrect(q,selected){return !!q.fullCredit||(q.acceptedAnswers||[q.answer]).includes(selected);}
function answerLabel(q){return q.fullCredit?'모두 정답':(q.acceptedAnswers||[q.answer]).map(n=>q.options[n]).join(' 또는 ');}
function questionImages(q){return (q.images||[]).map((src,i)=>`<img class="past-question-image" src="${src}" alt="${q.number}번 문제의 참고 그림 ${i+1}" ${i?'loading="lazy"':''}>`).join('');}

const KEY = 'linuxmaster-cbt-v1';
const MINUTE = 60000;
const HOUR = 60 * MINUTE;
// Publication metadata plus the 12 user-supplied PDF exams.
const PAST_EXAMS = [
  ['2023-12-09',4,'7097908'],['2023-09-09',3,'7038221'],
  ['2023-06-10',2,'7109385'],['2023-03-11',1,'6676341'],
  ['2022-09-03',3,'6122068'],['2022-06-11',2,'5944921'],
  ['2022-03-12',1,'5944905',true],['2021-12-11',4,'5479081'],
  ['2021-09-11',3,'5552965'],['2021-03-13',1,'4941675'],
  ['2020-12-12',4,'4668937'],['2020-10-10',3,'4617536'],
  ['2020-06-13',2,'4362525']
].map(([date,round,post,incomplete=false])=>({date,year:date.slice(0,4),round,url:`https://www.comcbt.com/xe/r2/${post}`,incomplete}));
const freshState = () => ({version:1, created:Date.now(), progress:{}, session:null, history:[], plan:{}});
let storageOK = true;
let state;
try { state = validateState(JSON.parse(localStorage.getItem(KEY))) || freshState(); }
catch { state = freshState(); storageOK = false; }
let notePage = 0, noteQuery = '', noteTopic = 'all', noteRed = false, noteWrong = false;
let timerHandle = null, toastHandle = null;
const main = document.getElementById('main');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pct = (n,d) => d ? Math.round(n/d*100) : 0;
const dateLabel = n => new Date(n).toLocaleString('ko-KR',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
const bar = value => `<div class="bar" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"><span style="width:${value}%"></span></div>`;
const sourceLink = q => window.STATIC_CBT ? '<span class="small muted">정적 배포본에는 원본 PDF가 포함되지 않습니다.</span>' : q.examDate?`<a class="source-link" href="${q.source}#page=${q.page}" target="_blank" rel="noopener">원본 해설집 ${q.page}쪽 보기 ↗</a>`:`<a class="source-link" href="${encodeURIComponent(BANK.source)}#page=${q.page}" target="_blank" rel="noopener">정리본 ${q.page}쪽 보기 ↗</a>`;
const stat = (label,value,suffix,hint) => `<div class="stat"><div class="stat-label">${label}<span>↗</span></div><strong>${value}<small>${suffix}</small></strong><small>${hint}</small></div>`;
const heading = (title,sub,aside='') => `<div class="heading"><div><h1>${title}</h1><p>${sub}</p></div>${aside}</div>`;
const button = (text, action, extra='', cls='') => `<button class="btn ${cls}" data-action="${action}" ${extra}>${text}</button>`;
function shuffle(items) { const a=[...items]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function progress(id) { return state.progress[id] || {attempts:0,correct:0,streak:0,due:0,wrong:false,unsure:false,bookmark:false,last:0}; }
function reviewable(q) { const p=progress(q.id);return p.wrong || p.unsure || (p.attempts>0 && p.due<=Date.now()); }
function mastered(q) { return progress(q.id).streak>=3; }
function save() { if(typeof Sync!=='undefined')Sync.capture(); try {localStorage.setItem(KEY,JSON.stringify(state));} catch {storageOK=false;showStorageWarning();} }
function showStorageWarning(){if(!storageOK&&!document.querySelector('.warning-banner')){const banner=document.createElement('div');banner.className='warning-banner';banner.textContent='브라우저 저장소를 사용할 수 없습니다. 창을 닫기 전에 학습 안내에서 기록을 내보내세요.';document.querySelector('.workspace').prepend(banner);}}
function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastHandle);toastHandle=setTimeout(()=>el.classList.remove('visible'),3500);}
function go(route){if(location.hash===`#${route}`)render();else location.hash=route;}
function selectedValue(id,fallback){return document.getElementById(id)?.value || fallback;}
function isExam(){return state.session?.mode==='exam';}
function activeSession(){return state.session && !state.session.finished;}

function validateState(value){
  if(!value || value.version!==1 || !value.progress || typeof value.progress!=='object' || Array.isArray(value.progress))return null;
  const validNum=n=>Number.isFinite(n)&&n>=0;
  for(const [id,p] of Object.entries(value.progress)){
    if(!BY_ID[id] || !p || !['attempts','correct','streak','due','last'].every(k=>validNum(p[k])))return null;
    if(p.correct>p.attempts || p.streak>3 || !['wrong','unsure','bookmark'].every(k=>typeof p[k]==='boolean'))return null;
  }
  if(!Array.isArray(value.history) || value.history.length>500 || !value.plan || typeof value.plan!=='object' || Array.isArray(value.plan))return null;
  if(Object.entries(value.plan).some(([k,v])=>!/^d[12]-[0-5]$/.test(k)||typeof v!=='boolean'))return null;
  for(const h of value.history){if(!h || !validNum(h.at) || !validNum(h.score) || !validNum(h.total) || !validNum(h.correct) || typeof h.label!=='string' || h.label.length>100 || !['exam','practice'].includes(h.mode))return null;}
  for(const h of value.history){
    if(h.items!==undefined && (!Array.isArray(h.items)||h.items.length>1000||!h.items.every(validArchivedItem)))return null;
  }
  const s=value.session;
  if(s){
    if(!['exam','practice'].includes(s.mode) || typeof s.label!=='string'||s.label.length>100||!Array.isArray(s.items)||!s.items.length||s.items.length>1000||!Number.isInteger(s.index)||s.index<0||s.index>=s.items.length||!validNum(s.started)||!validNum(s.deadline)||typeof s.finished!=='boolean')return null;
    if(s.focus!==undefined&&(!s.focus||s.mode!=='practice'||!Array.isArray(s.focus.conceptIds)||!s.focus.conceptIds.length||s.focus.conceptIds.length>6||!s.focus.conceptIds.every(id=>CONCEPTS.some(c=>c.id===id))))return null;
    if(!s.applied || typeof s.applied!=='object')return null;
    for(const item of s.items){
      if(!BY_ID[item.id]||!Array.isArray(item.order)||item.order.length!==4||new Set(item.order).size!==4||!item.order.every(n=>Number.isInteger(n)&&n>=0&&n<4))return null;
      if(item.selected!==null&&(!Number.isInteger(item.selected)||item.selected<0||item.selected>3))return null;
      if(!['checked','unsure','flag'].every(k=>typeof item[k]==='boolean'))return null;
    }
    if(s.mode==='exam'&&(s.items.length!==80||new Set(s.items.map(i=>i.id)).size!==80))return null;
    if(s.examDate && (!PAST_BANK.exams.some(e=>e.date===s.examDate)||s.items.some(i=>BY_ID[i.id].examDate!==s.examDate)))return null;
  }
  return {version:1,created:validNum(value.created)?value.created:Date.now(),progress:value.progress,history:value.history,plan:value.plan,session:s||null};
}

function validArchivedItem(it){
  return !!it&&!!BY_ID[it.id]&&Array.isArray(it.order)&&it.order.length===4&&new Set(it.order).size===4&&it.order.every(n=>Number.isInteger(n)&&n>=0&&n<4)
    &&(it.selected===null||(Number.isInteger(it.selected)&&it.selected>=0&&it.selected<4))
    &&['checked','unsure','correct'].every(k=>typeof it[k]==='boolean')
    &&Array.isArray(it.answers)&&it.answers.length>0&&it.answers.every(n=>Number.isInteger(n)&&n>=0&&n<4);
}
function archiveItems(s){return s.items.map(it=>({id:it.id,order:[...it.order],selected:it.selected,checked:it.checked,unsure:it.unsure,
  correct:it.checked&&isCorrect(BY_ID[it.id],it.selected),answers:[0,1,2,3].filter(n=>isCorrect(BY_ID[it.id],n))}));}
function recoverLastArchive(){
  const s=state.session;if(!s?.finished)return false;
  const h=state.history.find(h=>h.sessionId===String(s.syncId||s.started)||(h.at===s.ended&&h.label===s.label));
  if(!h||h.items)return false;h.items=archiveItems(s);return true;
}
function historyKey(h){return encodeURIComponent(h.sessionId||`${h.at}-${h.label}`);}
function storedHistory(key){return state.history.find(h=>historyKey(h)===key);}
function historyLink(h){return `<a class="btn secondary small" href="#history/${historyKey(h)}">${h.items?'오답 · 답안 보기':'점수 기록 보기'}</a>`;}
function historyPage(key,filter){
  const h=key?storedHistory(key):null;
  if(key&&!h){main.innerHTML=heading('기록을 찾을 수 없습니다.','다른 브라우저의 기록인지 확인해 주세요.')+'<a class="btn" href="#history">풀이 기록으로</a>';return;}
  if(!h){
    main.innerHTML=heading('풀이 기록','다시 풀어도 이전 오답과 선택한 답이 남습니다. 최근 100개 완료 기록을 보관합니다.')+
      '<div class="callout">오답 목록은 이후에 맞혀도 당시 기록 그대로 보관됩니다. 업데이트 전 이미 덮어쓴 상세 답안은 복원할 수 없습니다.</div>'+
      (state.history.length?`<div class="panel">${state.history.map(h=>`<div class="history-row"><div><b>${esc(h.label)}</b><p class="small">${dateLabel(h.at)} · ${h.correct}/${h.total} 정답 · ${Number(h.score.toFixed(2))}점</p></div>${historyLink(h)}</div>`).join('')}</div>`:'<div class="empty"><h2>아직 완료한 풀이가 없습니다.</h2><p>시험 제출 또는 학습 완료 후 기록이 여기에 저장됩니다.</p></div>');return;
  }
  const wrong=(h.items||[]).filter(it=>it.checked&&!it.correct),unsure=(h.items||[]).filter(it=>it.checked&&it.unsure);
  const selected=(h.items||[]).map((it,index)=>({it,index})).filter(({it})=>filter==='all'||(it.checked&&(!it.correct||it.unsure)));
  main.innerHTML=heading(h.label,`${dateLabel(h.at)} · ${h.correct}/${h.total} 정답 · ${Number(h.score.toFixed(2))}점`,'<a class="btn secondary" href="#history">전체 기록</a>')+
    (!h.items?'<div class="callout">이 기록은 상세 답안 저장 기능을 추가하기 전에 완료되어 점수만 남아 있습니다. 앞으로 완료하는 풀이는 오답과 답안도 함께 저장됩니다.</div>':
    `<p class="small muted">선택한 답과 채점 결과는 당시 기록입니다. 문제 해설은 현재 검토된 내용을 보여 줍니다.</p><div class="flex history-tools">${wrong.length?button(`이 시험 오답 ${wrong.length}문항 다시 풀기`,'retry-history',`data-key="${historyKey(h)}"`):'<span>이 기록에 오답이 없습니다.</span>'}${unsure.length?button('헷갈린 문제 다시 풀기','retry-history-unsure',`data-key="${historyKey(h)}"`,'secondary'):''}<a class="btn secondary" href="#history/${historyKey(h)}${filter==='all'?'':'/all'}">${filter==='all'?'오답·헷갈림만 보기':'전체 답안 보기'}</a></div>
    <div class="result-list">${selected.map(({it,index})=>{const q=BY_ID[it.id];return `<details><summary><span class="pill ${it.checked&&!it.correct?'red':''}">${!it.checked?'미채점':!it.correct?'오답':it.unsure?'헷갈림':'정답'}</span><span>${index+1}. ${esc(q.prompt)}</span></summary><p>당시 내 선택: <strong>${it.selected===null?'미응답':`${it.order.indexOf(it.selected)+1}번 · ${esc(q.options[it.selected])}`}</strong></p><p>당시 정답: ${it.answers.map(n=>esc(q.options[n])).join(' 또는 ')}</p><details class="original-options"><summary>당시 보기 순서</summary><ol>${it.order.map(n=>`<li>${esc(q.options[n])}${it.selected===n?' ← 내 선택':''}</li>`).join('')}</ol></details>${q.examDate?questionImages(q):''}${explanation(q,it.correct,it.unsure)}</details>`;}).join('')||'<div class="empty"><p>이 기록에 오답·헷갈림 문항이 없습니다. 전체 답안에서 정답 문항을 확인할 수 있습니다.</p></div>'}</div>`);
}
function retryHistory(key,unsureOnly=false){const h=storedHistory(key);if(!h?.items)return;
  const ids=[...new Set(h.items.filter(it=>it.checked&&(unsureOnly?it.unsure:!it.correct)).map(it=>it.id))];
  start(ids.map(id=>BY_ID[id]),unsureOnly?'기록의 헷갈림 재도전':'기록의 오답 재도전','practice','all');
}

function home(){
  const seen=QUESTIONS.filter(q=>progress(q.id).attempts).length;
  const done=QUESTIONS.filter(mastered).length;
  const due=ALL_QUESTIONS.filter(reviewable).length;
  const attempts=Object.values(state.progress).reduce((a,p)=>a+p.attempts,0);
  const correct=Object.values(state.progress).reduce((a,p)=>a+p.correct,0);
  const day=Math.min(2,Math.floor((Date.now()-state.created)/(24*HOUR))+1);
  main.innerHTML=heading('오늘의 한 걸음이, 합격에 더 가까이.','정리본의 핵심부터 차근차근. 오늘도 한 번 더 기억해 보세요.',`<span class="pill outline">DAY ${String(day).padStart(2,'0')} / 02</span>`)+`
    <section class="hero"><div><span class="eyebrow">LINUX MASTER · TWO-DAY SPRINT</span><h2>이틀 동안, 핵심을 익히고<br><em>문제로 기억을 완성하세요.</em></h2><p>정리본 23쪽 기반 · ${QUESTIONS.length}문항 · 해설과 반복 학습</p><div class="hero-actions">${activeSession()?button('이어서 학습하기 →','resume','','lime'):button('핵심 20문제 시작 →','start-core','','lime')}<a class="btn ghost" href="#plan">2일 플랜 보기 ↗</a></div></div><div class="hero-art" aria-hidden="true"><div class="orbit"><b>&gt;<span class="cursor">_</span></b></div><span class="art-note">$ learn --repeat</span><span class="art-note last">knowledge saved ✓</span></div></section>
    <section class="stats" aria-label="학습 현황">${stat('정리본 학습 진도',seen,`/ ${QUESTIONS.length}`,'한 번 이상 푼 고유 문항')}${stat('누적 정답률',attempts?pct(correct,attempts):'—','%',attempts?`${attempts}회 풀이 기준`:'첫 문제를 풀어 보세요')}${stat('지금 복습할 문제',due,'문항','오답 · 헷갈림 · 복습 시간 도래')}${stat('기억에 자리 잡은 문제',done,'문항','시간을 두고 3단계 복습 완료')}</section>
    <div class="section-heading"><h2>어떻게 학습할까요?</h2><a class="text-link" href="#learn">전체 문제 보기 ↗</a></div>
    <section class="modes">${modeCard('✦','빨간 핵심 집중','정리본에서 강조한 개념부터.<br>중요한 내용을 먼저 기억하세요.',`${QUESTIONS.filter(q=>q.red).length}문항 중 20문항 · 바로 해설`,'start-core','red')}${modeCard('↻','오답 다시 풀기','틀렸거나 헷갈린 문제를 다시 풀며<br>취약한 부분을 채워 보세요.',`${due}문항 복습 대기 · 적응형 반복`,'review')}${modeCard('◷','실전 모의고사','시간 안에 풀고 한 번에 채점.<br>시험처럼 준비 상태를 점검하세요.','80문항 · 100분 · 과목별 진단','exam')}</section>
    <section class="bottom-grid"><div><div class="section-heading"><h2>단원별 학습 현황</h2><span class="text-link">풀어본 문항 기준</span></div><div class="panel">${TOPICS.map((t,i)=>{const qs=QUESTIONS.filter(q=>q.topic===t.id);const count=qs.filter(q=>progress(q.id).attempts).length;return `<a class="topic-row" href="#learn/${t.id}"><span class="topic-index">${String(i+1).padStart(2,'0')}</span><div><b>${t.name}</b><small>${t.pages}쪽</small>${bar(pct(count,qs.length))}</div><span>${count} / ${qs.length}</span></a>`;}).join('')}</div></div><div><div class="section-heading"><h2>2일 학습 로드맵</h2><a class="text-link" href="#plan">자세히 보기 ↗</a></div><div class="panel"><div class="schedule-item"><span class="step-number">01</span><div><h3>전체 개념 한 바퀴 <span class="pill">DAY 1</span></h3><p>9개 단원을 순서대로 · 해설로 빈틈 메우기</p></div></div><div class="schedule-item"><span class="step-number">02</span><div><h3>빨간 핵심과 오답 재회독</h3><p>맞혔어도 헷갈렸다면 복습 목록에 남기기</p></div></div><div class="schedule-item"><span class="step-number">03</span><div><h3>기억 꺼내기 + 계산 훈련 <span class="pill">DAY 2</span></h3><p>하룻밤 뒤 재시험 · 권한·RAID·서브넷 반복</p></div></div><div class="schedule-item"><span class="step-number">04</span><div><h3>실전 점검과 마지막 복습</h3><p>80문항 모의고사 · 과목별 약점 점검</p></div></div></div><div class="callout"><strong>정답 번호보다 이유를 기억하세요.</strong><br>정리본 문제는 다시 풀 때 보기를 섞습니다. 기출도 선택지 순서를 섞고, 진행 중인 시험에서는 유지합니다. 해설을 닫고 “왜 이 답인지” 한 문장으로 설명해 보세요.</div></div></section>`;
}
function modeCard(icon,title,desc,meta,action,color=''){return `<button class="mode-card" data-action="${action}"><span class="mode-icon ${color}">${icon}</span><h3>${title}</h3><p>${desc}</p><span class="meta">${meta}</span><span class="mode-arrow">↗</span></button>`;}

function learn(topic='all'){
  if(!TOPIC[topic])topic='all';
  main.innerHTML=heading('풀면서 익히는 리눅스','답을 고른 뒤 채점하면 해설이 열립니다. 오답은 몇 문제 뒤 한 번 더 만나게 됩니다.')+`
    ${activeSession()?`<div class="callout flex between"><span>진행 중인 학습: ${esc(state.session.label)}</span>${button('이어서 풀기','resume','','small secondary')}</div>`:''}
    <section class="panel"><h2>나에게 맞는 문제 세트</h2><div class="filters"><div class="field"><label for="topic-filter">학습 단원</label><select id="topic-filter"><option value="all">전체 단원</option>${TOPICS.map(t=>`<option value="${t.id}" ${t.id===topic?'selected':''}>${t.name}</option>`).join('')}</select></div><div class="field"><label for="count-filter">한 번에 풀 문제</label><select id="count-filter"><option value="10">10문항 · 짧게</option><option value="20" selected>20문항 · 기본</option><option value="all">조건에 맞는 전체</option></select></div><label class="check"><input type="checkbox" id="red-filter"> 빨간 핵심만</label>${button('학습 시작 →','start-custom')}</div><p class="small">복습할 문제 → 아직 안 푼 문제 → 나머지 순으로 구성합니다. 문항과 선택지 순서는 매번 달라집니다.</p></section>
    <div class="section-heading" style="margin-top:30px"><h2>단원별로 한 바퀴</h2><span class="text-link">정리본 목차 순서</span></div><section class="topic-grid">${TOPICS.map((t,i)=>{const qs=QUESTIONS.filter(q=>q.topic===t.id),seen=qs.filter(q=>progress(q.id).attempts).length;return `<article class="topic-card"><div class="flex between"><span class="eyebrow">CHAPTER ${String(i+1).padStart(2,'0')}</span><span class="pill outline">${t.pages}쪽</span></div><h3>${t.name}</h3><p>${t.subtitle}</p>${bar(pct(seen,qs.length))}<div class="flex between small muted"><span>${seen} / ${qs.length}문항 학습</span><span>핵심 ${qs.filter(q=>q.red).length}</span></div>${button('이 단원 전체 풀기 →','start-topic',`data-topic="${t.id}"`,'secondary')}</article>`;}).join('')}</section>`;
}

function ranked(qs){return shuffle(qs).sort((a,b)=>priority(a)-priority(b));}
function priority(q){const p=progress(q.id);return p.wrong||p.unsure?0:p.attempts&&p.due<=Date.now()?1:!p.attempts?2:p.streak<3?3:4;}
function makeItem(q,retry=false){return {id:q.id,order:shuffle([0,1,2,3]),selected:null,checked:false,unsure:false,flag:false,retry};}
function start(qs,label,mode='practice',count=20,focus=null){
  if(!qs.length){toast('조건에 맞는 문제가 없습니다. 다른 단원이나 조건을 선택해 주세요.');return;}
  if(activeSession()&&!confirm('새 학습을 시작하면 진행 중인 문제 세트가 바뀝니다. 이미 채점한 학습 기록은 유지됩니다. 새로 시작할까요?'))return;
  recoverLastArchive();
  const picked=mode==='exam'?qs:ranked(qs).slice(0,count==='all'?qs.length:Number(count));
  state.session={syncId:Date.now().toString(36)+'-'+Math.random().toString(36).slice(2),mode,label,examDate:mode==='exam'?(picked[0].examDate||null):null,started:Date.now(),deadline:mode==='exam'?Date.now()+100*MINUTE:0,index:0,items:picked.map(q=>makeItem(q)),finished:false,applied:{}};
  if(focus){state.session.focus=focus;state.session.deadline=Date.now()+HOUR;state.session.items.forEach(i=>i.attemptId=cryptoId());}
  save();go('session');
}
function startPastExam(date){
  const exam=PAST_BANK.exams.find(e=>e.date===date);
  if(!exam||exam.questions.length!==80){toast('응시 가능한 기출 자료가 없습니다.');return;}
  start(exam.questions,`${date.slice(0,4)}년 ${exam.round}회 기출시험`,'exam',80);
}
function startExam(){
  // Topic stratification prevents a random draw from omitting smaller chapters.
  const allotment={files:10,shell:8,process:10,editor:6,package:7,device:7,xwindow:8,network:16,application:8};
  const selected=TOPICS.flatMap(t=>shuffle(QUESTIONS.filter(q=>q.topic===t.id)).slice(0,allotment[t.id]));
  const qs=[...shuffle(selected.filter(q=>TOPIC[q.topic].subject===1)),...shuffle(selected.filter(q=>TOPIC[q.topic].subject===2))];
  start(qs,'실전 모의고사','exam',80);
}
function applyResult(q,correct,unsure){
  const p={...progress(q.id)},now=Date.now();
  const eligible=p.attempts===0 || now>=p.due;
  p.attempts++;p.correct+=correct?1:0;p.last=now;
  if(!correct||unsure){p.streak=0;p.due=now+10*MINUTE;p.wrong=!correct;p.unsure=unsure;}
  else if(eligible){p.streak=Math.min(3,p.streak+1);p.wrong=false;p.unsure=false;p.due=now+[30*MINUTE,8*HOUR,24*HOUR][p.streak-1];}
  // An immediate retry is feedback, not proof of durable recall: keep its flags/due.
  state.progress[q.id]=p;
  if(typeof Sync!=='undefined')Sync.graded(q,p,correct);
}
function cryptoId(){return Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);}
function focusItem(q){return {...makeItem(q,true),attemptId:cryptoId()};}
function startFocus(){
  const candidates=filteredConcepts();
  if(!candidates.length){toast('학습할 개념이 없습니다. 필터를 바꿔 주세요.');return;}
  const selected=[...candidates].sort((a,b)=>conceptQuestions(b).filter(q=>progress(q.id).wrong||progress(q.id).unsure).length-conceptQuestions(a).filter(q=>progress(q.id).wrong||progress(q.id).unsure).length).slice(0,6);
  const pool=selected.flatMap(c=>conceptQuestions(c));
  start(pool,'1시간 집중 학습','practice',Math.min(18,pool.length),{conceptIds:selected.map(c=>c.id)});
}
function focusConcept(q){return CONCEPTS.find(c=>c.questionIds.includes(q.id));}
function focusExplanation(q){const c=focusConcept(q);return c?`<div class="memory"><h3>${esc(c.title)}</h3><p>${esc(c.summary)}</p><p><strong>예제:</strong> ${esc(c.example)}</p><p><strong>주의:</strong> ${esc(c.pitfall)}</p></div>`:'';}
function extendFocus(){
  const s=state.session;if(!s.focus||s.items.length>=990)return;
  const pool=s.focus.conceptIds.flatMap(id=>conceptQuestions(CONCEPTS.find(c=>c.id===id)));
  const recent=new Set(s.items.slice(-3).map(i=>i.id));
  const counts=id=>s.items.filter(i=>i.id===id).length;
  const qs=shuffle(pool).sort((a,b)=>Number(recent.has(a.id))-Number(recent.has(b.id))||priority(a)-priority(b)||counts(a.id)-counts(b.id));
  s.items.push(...qs.slice(0,Math.min(6,990-s.items.length)).map(q=>focusItem(q)));
}
function choose(index){
  const s=state.session;if(!s||s.finished)return;
  if((s.mode==='exam'||s.focus)&&Date.now()>=s.deadline){finish(true);return;}
  const item=s.items[s.index];if(item.checked)return;
  item.selected=index;if(s.focus){check();return;}save();renderQuiz(false);
}
function check(){
  const s=state.session;if(!s||s.finished||s.mode==='exam')return;
  const item=s.items[s.index];if(item.checked||item.selected===null)return;
  const q=BY_ID[item.id],correct=isCorrect(q,item.selected);
  item.checked=true;applyResult(q,correct,item.unsure);
  if((!correct||item.unsure)&&(!item.retry||s.focus)&&s.items.length<990&&!s.items.some((it,i)=>i>s.index&&it.id===q.id)){
    s.items.splice(Math.min(s.index+4,s.items.length),0,s.focus?focusItem(q):makeItem(q,true));
  }
  if(s.focus&&s.items.length-s.index<4)extendFocus();
  save();renderQuiz(false);updateBadges();
  const explanation=document.querySelector('.explanation');explanation?.scrollIntoView({block:'nearest',behavior:'smooth'});
}
function renderQuiz(scroll=true){
  const s=state.session;
  if(!s){go('learn');return;}if(s.finished){renderResult();return;}
  const item=s.items[s.index],q=BY_ID[item.id];
  const answered=s.items.filter(i=>s.mode==='exam'?i.selected!==null:i.checked).length;
  main.innerHTML=heading(esc(s.label),s.focus?'보기를 누르면 바로 정답·해설이 나옵니다. 읽고 다음 문제를 누르세요. 헷갈리면 선택 전에 체크하세요.':s.mode==='exam'?'실전 모드에서는 제출한 뒤 정답과 해설을 확인할 수 있습니다.':'모르는 문제도 먼저 골라 보세요. 해설에서 이유를 확인하면 더 오래 기억납니다.',`<span class="pill outline">${s.mode==='exam'?'EXAM MODE':'LEARNING MODE'}</span>`)+`
  <div class="quiz-layout"><section class="quiz-card"><div class="quiz-head"><div class="flex"><span class="pill">${TOPIC[q.topic].name}</span>${q.red?'<span class="pill red">● 빨간 핵심</span>':''}${item.retry?'<span class="pill outline">한 번 더</span>':''}</div><span class="quiz-number">QUESTION ${String(s.index+1).padStart(2,'0')} / ${s.items.length}</span></div>
  <h2 id="question-title" >${esc(q.prompt)}</h2>${q.examDate?questionImages(q):''}<div class="option-list ${q.examDate?'past-options':''}" role="group" aria-labelledby="question-title">${item.order.map((n,i)=>`<button class="option ${item.selected===n?'selected':''} ${item.checked&&isCorrect(q,n)?'correct':''} ${item.checked&&item.selected===n&&!isCorrect(q,n)?'wrong':''}" data-action="choose" data-value="${n}" aria-pressed="${item.selected===n}" ${item.checked?'disabled':''}><span class="num">${i+1}</span><span>${esc(q.options[n])}</span>${item.checked&&isCorrect(q,n)?'<span class="answer-icon">✓</span>':''}</button>`).join('')}</div>
  <div class="quiz-tools"><label class="check"><input id="unsure" type="checkbox" ${item.unsure?'checked':''} ${item.checked?'disabled':''}> 맞혀도 헷갈려요</label><div class="flex"><button class="bookmark ${progress(q.id).bookmark?'on':''}" data-action="bookmark">${progress(q.id).bookmark?'★ 저장됨':'☆ 핵심 노트에 저장'}</button>${s.mode==='exam'?`<button class="bookmark ${item.flag?'on':''}" data-action="flag">${item.flag?'⚑ 표시됨':'⚐ 나중에 검토'}</button>`:''}</div></div>
  ${item.checked?explanation(q,isCorrect(q,item.selected),item.unsure)+(s.focus?focusExplanation(q):''):''}
  <div class="quiz-nav">${button('← 이전','previous',s.index===0?'disabled':'','secondary')}<span class="small muted">${answered} / ${s.items.length} ${s.mode==='exam'?'선택':'채점'}</span>${s.mode==='practice'&&!item.checked?button('정답 확인','check',item.selected===null?'disabled':''):button(s.index===s.items.length-1?'결과 보기 →':'다음 문제 →',s.index===s.items.length-1?'finish':'next')}</div>
  </section><aside class="quiz-aside"><div class="panel"><h3>${s.mode==='exam'||s.focus?'남은 시간':'학습 진행'}</h3>${s.mode==='exam'||s.focus?'<div class="timer" id="timer"></div>':`<p class="small" style="margin-top:7px">${answered}문항 채점 · ${s.items.length-answered}문항 남음</p>${bar(pct(answered,s.items.length))}`}<div class="answer-map" aria-label="문항 이동">${s.items.map((it,i)=>`<button class="map-btn ${(s.mode==='exam'?it.selected!==null:it.checked)?'answered':''} ${i===s.index?'current':''} ${it.flag?'flagged':''} ${it.checked&&!isCorrect(BY_ID[it.id],it.selected)?'miss':''}" data-action="jump" data-index="${i}" aria-label="${i+1}번${it.checked?' 채점 완료':it.selected!==null?' 선택 완료':''}${it.flag?' 검토 표시':''}" ${i===s.index?'aria-current="step"':''}>${i+1}</button>`).join('')}</div><p class="small muted">초록: ${s.mode==='exam'?'답 선택':'채점 완료'}${s.mode==='exam'?' · 점: 검토 표시':' · 빨강: 오답'}</p><div style="margin-top:18px">${button(s.mode==='exam'?'답안 제출하기':'여기까지 학습 완료','finish','','secondary')}</div><a class="text-link" style="display:block;margin-top:13px" href="#home">${s.mode==='exam'||s.focus?'대시보드로 (시간은 계속 흐름)':'잠시 쉬기 · 자동 저장'}</a><p class="keyboard-tip">1–4 보기 선택<br>Enter 채점 / 다음 · ← → 문항 이동<br>${s.focus?'보기를 누르면 즉시 채점합니다. 오답·헷갈림을 반복하고 다른 문제도 섞습니다. 1시간 후 자동 종료합니다.':s.mode==='practice'?'틀린 문제는 몇 문제 뒤 1회 재등장하며, 추가 회독은 복습에서 진행합니다.':'미응답은 오답으로 채점됩니다(모두 정답 문항 제외).'}</p></div></aside></div>`;
  if(scroll)window.scrollTo(0,0);updateTimer();
}
function explanation(q,correct=true,unsure=false){
  const title=correct?'✓ 정답입니다.':'다시 기억해 볼까요?';
  if(q.examDate){
    const r=q.review;
    const status=r.status==='pending'?'해설 검토 중':!q.originalExplanation?'원본 해설 없음 · 직접 작성':r.note?'검토 · 보완 해설':'원본 해설 검토 완료';
    return `<div class="explanation ${!correct?'wrong':''}" role="status"><h3>${title}${unsure?' · 헷갈림으로 복습 예약':''}</h3><p><strong>정답: ${esc(answerLabel(q))}</strong></p><span class="pill outline">${status}</span><p class="small muted">해설에 적힌 보기 번호는 원본 PDF 기준입니다. 위 정답 내용으로 확인하세요.</p><details class="original-options"><summary>원본 보기 순서 확인</summary><ol>${q.options.map(o=>`<li>${esc(o)}</li>`).join('')}</ol></details><p class="explanation-text">${esc(q.explanation)}</p>${(r.sources||[]).length?`<p class="small">검토 근거: ${(r.sources||[]).map(key=>{const ref=window.PAST_REVIEWS.sources[key];return `<a class="text-link" href="${esc(ref.url)}" target="_blank" rel="noopener noreferrer">${esc(ref.title)} ↗</a>`;}).join(' · ')}</p>`:''}${r.note&&q.originalExplanation?`<details class="original-explanation"><summary>원본 해설과 비교</summary><p class="explanation-text">${esc(q.originalExplanation)}</p></details>`:''}${sourceLink(q)}<p class="small muted">사용자 제공 PDF와 정답표 기준 · 원본의 댓글·오기는 보완 해설과 함께 확인하세요.</p></div>`;
  }
  return `<div class="explanation ${!correct?'wrong':''}" role="status"><h3>${title}${unsure?' · 헷갈림으로 복습 예약':''}</h3><p><strong>정답: ${esc(q.options[q.answer])}</strong></p><p style="margin-top:10px">${esc(q.explanation)}</p><div class="memory"><strong>한 줄 기억</strong> · ${esc(q.memory)}</div>${sourceLink(q)}${correct&&reviewable(q)?'<p class="small" style="margin-top:10px">즉시 재풀이는 암기 단계에 반영하지 않습니다. 예약된 시간 뒤 다시 맞히면 복습 단계가 올라갑니다.</p>':''}</div>`;
}
function move(index){const s=state.session;if(!s||s.finished)return;s.index=Math.max(0,Math.min(index,s.items.length-1));save();renderQuiz();}
function finish(force=false){
  const s=state.session;if(!s||s.finished)return;
  const missing=s.items.filter(i=>s.mode==='exam'?i.selected===null:!i.checked).length;
  if(!force&&missing&&!confirm(s.mode==='exam'?`${missing}문항에 답하지 않았습니다. 미응답은 오답으로 처리됩니다(모두 정답 문항 제외). 제출할까요?`:`아직 채점하지 않은 ${missing}문항은 기록에 반영되지 않습니다. 여기까지 학습을 마칠까요?`))return;
  if(s.mode==='exam')s.items.forEach((it,i)=>{if(!s.applied[i]){applyResult(BY_ID[it.id],isCorrect(BY_ID[it.id],it.selected),it.unsure);s.applied[i]=true;}it.checked=true;});
  s.finished=true;s.ended=Date.now();
  const checked=s.items.filter(i=>i.checked),correct=checked.filter(i=>isCorrect(BY_ID[i.id],i.selected)).length;
  state.history.unshift({sessionId:String(s.syncId||s.started),at:s.ended,label:s.label,mode:s.mode,examDate:s.examDate||null,correct,total:checked.length,score:checked.length?correct/checked.length*100:0,items:archiveItems(s)});state.history=state.history.slice(0,100);
  save();go('session');updateBadges();if(force)toast('제한 시간이 끝나 답안을 자동 제출했습니다.');
}
function renderResult(){
  const s=state.session,checked=s.items.filter(i=>i.checked),correct=checked.filter(i=>isCorrect(BY_ID[i.id],i.selected)).length;
  const score=checked.length?correct/checked.length*100:0;
  const subjects=[1,2].map(subject=>{const items=checked.filter(i=>TOPIC[BY_ID[i.id].topic].subject===subject);return {total:items.length,correct:items.filter(i=>isCorrect(BY_ID[i.id],i.selected)).length};});
  const pass=score>=60&&subjects.every(x=>x.total&&x.correct/x.total>=.4);
  const wrong=checked.filter(i=>!isCorrect(BY_ID[i.id],i.selected)||i.unsure);
  main.innerHTML=heading('한 번 더, 기억에 가까워졌어요.',`${esc(s.label)} · ${dateLabel(s.ended||Date.now())}`)+`
    <section class="result-hero"><span class="eyebrow">${s.mode==='exam'?'MOCK EXAM RESULT':'SESSION COMPLETE'}</span><div class="result-score">${checked.length?Number(score.toFixed(2)):'—'}<small> / 100</small></div><h2>${!checked.length?'채점한 문항이 없습니다.':s.mode==='exam'?(pass?'이번 연습은 합격 기준 충족':'취약한 개념을 한 번 더 복습해요'):'오늘의 학습을 기록했어요.'}</h2><p>${correct} / ${checked.length}문항 정답 · ${wrong.length}문항 오답 또는 헷갈림</p><div class="flex">${wrong.length?button('이번 오답 다시 풀기 ↻','retry-result','','lime'):button('다음 학습 선택 →','learn','','lime')}<a class="btn ghost" href="#history">저장된 풀이 기록</a><a class="btn ghost" href="#home">대시보드로</a></div></section>
    <section class="stats">${subjects.map((x,i)=>stat(i===0?'리눅스 운영 및 관리':'리눅스 활용',x.total?pct(x.correct,x.total):'—','%',`${x.correct} / ${x.total}문항 · ${x.total?(x.correct/x.total<.4?'40% 미만': '40% 이상'):'미응시'}`)).join('')}${stat('걸린 시간',Math.max(1,Math.round(((s.ended||Date.now())-s.started)/MINUTE)),'분','시작부터 완료까지 경과 시간')}${stat('누적 암기 완료',ALL_QUESTIONS.filter(mastered).length,'문항','시간 간격을 둔 3단계 복습')}</section>
    ${s.mode==='exam'?'<div class="callout">총점 60점 이상과 두 과목 각각 40% 이상을 모두 충족해야 합니다. 학습용 채점 결과이며 실제 시험 성적을 예측하거나 보장하지 않습니다.</div>':''}
    <div class="section-heading"><h2>문항별 해설</h2><span class="text-link">선택한 답과 정답 비교</span></div><div class="result-list">${s.items.map((it,i)=>{const q=BY_ID[it.id],ok=it.checked&&isCorrect(q,it.selected);return `<details><summary><span class="pill ${ok?'':'red'}">${!it.checked?'미채점':ok?'정답':'오답'}</span><span>${i+1}. ${esc(q.prompt)}</span></summary><p>내 선택: <strong>${it.selected===null?'미응답':esc(q.options[it.selected])}</strong></p>${q.examDate?questionImages(q):''}${explanation(q,ok,it.unsure)}</details>`;}).join('')}</div>`;
}

function review(){
  const wrong=ALL_QUESTIONS.filter(q=>progress(q.id).wrong),unsure=ALL_QUESTIONS.filter(q=>progress(q.id).unsure),due=ALL_QUESTIONS.filter(q=>progress(q.id).attempts&&progress(q.id).due<=Date.now()),all=ALL_QUESTIONS.filter(reviewable);
  const next=ALL_QUESTIONS.map(q=>progress(q.id)).filter(p=>p.attempts&&p.due>Date.now()).sort((a,b)=>a.due-b.due)[0];
  main.innerHTML=heading('한 번 틀린 문제를, 내 것으로.','정답을 바로 다시 보는 것보다 시간 간격을 두고 직접 떠올리는 연습을 하세요.')+`
  <section class="stats">${stat('오답',wrong.length,'문항','마지막 유효 복습의 오답')}${stat('헷갈림',unsure.length,'문항','맞혔어도 자신 없던 문제')}${stat('복습 시간 도래',due.length,'문항','다음 복습 시각이 지난 문제')}${stat('전체 복습 대상',all.length,'문항','중복을 제외한 합계')}</section>
  <div class="callout"><a class="btn secondary" href="#history">시험별 저장된 오답 · 답안 보기 →</a></div><div class="callout"><strong>틀림·헷갈림 → 10분 뒤 / 정답 1단계 → 30분 뒤 / 2단계 → 8시간 뒤 / 3단계 → 24시간 뒤.</strong><br>3단계에 도달하면 ‘암기 완료’로 표시합니다. 예약 전에 다시 풀어 맞혀도 단계와 오답 표시는 유지됩니다.${next?` 다음 예약: ${dateLabel(next.due)}.`:''}</div>
  ${all.length?`<div class="flex" style="margin-bottom:24px">${button('복습 20문항 시작 ↻','start-review')}${button('오답만','start-wrong','','secondary')}${button('헷갈림만','start-unsure','','secondary')}</div><div class="panel">${ranked(all).slice(0,30).map(q=>{const p=progress(q.id);return `<div class="topic-row" style="grid-template-columns:65px 1fr auto"><span class="pill ${p.wrong?'red':''}">${p.wrong?'오답':p.unsure?'헷갈림':'복습 도래'}</span><div><b>${esc(q.prompt)}</b><p class="small">${TOPIC[q.topic].name} · ${q.examDate?'원본 해설집':'정리본'} ${q.page}쪽 · ${p.attempts}회 풀이</p></div>${button('풀기','start-one',`data-id="${q.id}"`,'small secondary')}</div>`;}).join('')}${all.length>30?`<p class="small muted" style="margin-top:12px">상위 30개를 표시했습니다. 복습 시작 시 전체 ${all.length}문항에서 구성합니다.</p>`:''}</div>`:`<div class="empty"><h2>지금 복습할 문제가 없습니다.</h2><p>${next?`${dateLabel(next.due)}에 다음 복습이 열립니다.`:'문제를 풀면 오답과 복습 일정이 여기에 모입니다.'}</p><a class="btn" href="#learn">새 문제 풀러 가기 →</a></div>`}`;
}
function pastExams(year){
  const years=[...new Set(PAST_EXAMS.map(e=>e.year))];
  const selected=years.includes(year)?year:'all';
  const rows=PAST_EXAMS.filter(e=>selected==='all'||e.year===selected);
  const attempted=PAST_QUESTIONS.filter(q=>progress(q.id).attempts).length;
  const wrong=PAST_QUESTIONS.filter(q=>progress(q.id).wrong).length;
  main.innerHTML=heading('회차를 고르고, 시험처럼 풀어 보세요.','사용자 제공 해설집 12회차 · 960문항. 지문과 선택지는 텍스트로 제공하며, 새로 시작할 때마다 보기를 섞습니다.')+`
    ${activeSession()&&state.session.examDate?`<div class="callout flex between"><span>${esc(state.session.label)} 진행 중 · 시간은 계속 흐릅니다.</span>${button('시험 이어서','resume','','secondary')}</div>`:''}
    <section class="stats">${stat('응시 가능한 회차',PAST_BANK.exams.length,'회','2020~2023년 제공 자료')}${stat('기출 학습 문항',attempted,'/ 960','한 번 이상 채점한 문항')}${stat('기출 오답',wrong,'문항','오답 · 복습 메뉴에서 다시 풀기')}${stat('시험 시간',100,'분','80문항 · 종료 시 자동 제출')}</section>
    <nav class="past-filters" aria-label="기출 연도 선택">${['all',...years].map(y=>`<a class="btn ${selected===y?'':'secondary'}" href="#past${y==='all'?'':'/'+y}" ${selected===y?'aria-current="page"':''}>${y==='all'?'전체':y+'년'}</a>`).join('')}</nav>
    <div class="section-heading"><h2>${selected==='all'?'전체':selected+'년'} 기출 ${rows.length}개 회차</h2><span class="small muted">시험일 기준 · 최신순</span></div>
    <div class="past-grid">${rows.map(e=>{
      const date=e.date.replaceAll('-',''),bank=PAST_BANK.exams.find(x=>x.date===date);
      const history=state.history.filter(h=>h.examDate===date);
      return `<article class="panel past-card"><div class="flex"><span class="pill ${bank?'outline':'red'}">${bank?'80문항 · 응시 가능':'자료 없음 · 복원 중'}</span><span class="small muted">${e.date.replaceAll('-','.')}</span></div><h2>${e.year}년 ${e.round}회</h2><p class="small">리눅스마스터 2급 2차</p>${bank?`<p class="small muted">${history.length?`최근 ${Number(history[0].score.toFixed(2))}점 · ${history.length}회 응시`:'아직 응시 기록이 없습니다.'}</p>${button('기출시험 시작 →','start-past',`data-date="${date}"`)}${history.length?historyLink(history[0]):''}<a class="text-link small" href="${bank.source}" target="_blank" rel="noopener">원본 해설집 PDF ↗</a>`:'<p class="small muted">2022년 1회는 제공 파일이 없어 시험에 포함하지 않았습니다.</p>'}<a class="text-link small" href="${e.url}" target="_blank" rel="noopener noreferrer">COMCBT 원문 게시물 ↗</a></article>`;
    }).join('')}</div>
    <div class="callout small">원본 정정 안내에 따라 2020년 2회 25번·2023년 1회 15번은 모두 정답, 2021년 1회 41번은 원본 ③·④를 정답으로 처리합니다. 화면의 보기 번호는 섞이지만 정답 내용은 그대로입니다. 기록은 이 브라우저에 저장됩니다. 기출 자료의 기술 설명은 시험 당시 환경과 현재 환경을 구분해서 확인하세요.</div>`;
}
function exam(){main.innerHTML=heading('실전처럼 풀고, 준비 상태를 확인하세요.','한 세트 80문항. 답은 자유롭게 수정하고, 모든 해설은 제출한 뒤 확인합니다.')+`
  <div class="callout">연도별 기출을 찾고 있나요? <a class="text-link" href="#past">2020년 이후 기출 회차 보기 →</a></div>
  <section class="hero"><div><span class="eyebrow">THE FINAL REHEARSAL</span><h2>100분, 80개의 질문.<br><em>지금 알고 있는 것을 꺼낼 시간.</em></h2><p>운영 및 관리 48문항 + 활용 32문항으로 구성한 연습 세트</p><div class="hero-actions">${button('모의고사 시작 →','start-exam','','lime')}${activeSession()&&(isExam()||state.session.focus)?button('진행 중인 시험 이어서','resume','','ghost'):''}</div></div><div class="hero-art"><div class="orbit"><b>80</b></div><span class="art-note last">100:00 remaining</span></div></section>
  <section class="stats">${stat('문항 수','80','문항','객관식 4지선다')}${stat('제한 시간','100','분','시간 종료 시 자동 제출')}${stat('총점 기준','60','점 이상','80문항 중 48문항 이상 정답')}${stat('과목별 기준','40','% 이상','운영·관리 20개 / 활용 13개 이상')}</section>
  <div class="callout">문제 세트는 9개 단원에서 나누어 추출하며 매번 보기를 섞습니다. 대시보드로 이동하거나 새로고침해도 시험 시간은 계속 흐릅니다. 브라우저를 닫았다가 돌아왔을 때 시간이 지났으면 자동 채점합니다.</div><div class="panel"><h2>모의고사 기록</h2>${state.history.filter(h=>h.mode==='exam').length?state.history.filter(h=>h.mode==='exam').map(h=>`<div class="history-row"><span>${dateLabel(h.at)} · ${esc(h.label)}</span><span>${h.correct} / ${h.total} 정답 · <strong>${Number(h.score.toFixed(2))}점</strong> ${historyLink(h)}</span></div>`).join(''):'<p class="small" style="margin-top:15px">아직 응시 기록이 없습니다. 첫 시험으로 학습의 기준점을 만들어 보세요.</p>'}</div>`;}

const PLAN=[
  {day:1,title:'전체를 이해하고, 첫 회독 완성',hours:'약 6시간 + 중간 휴식',steps:[
    ['파일 시스템 + 셸','90분 · 권한 비트, umask, 환경변수의 차이부터.', ['files','shell']],
    ['프로세스 + 에디터','60분 · 시그널, cron, vi 명령을 비교하며 기억.', ['process','editor']],
    ['소프트웨어 + 장치','60분 · 패키지 옵션, RAID 용량, LVM 순서.', ['package','device']],
    ['X 윈도 + 인터넷','90분 · 서버/클라이언트, 포트, 서브넷 집중.', ['xwindow','network']],
    ['응용 분야','30분 · 가상화, 클라우드, 주요 도구를 연결.', ['application']],
    ['빨간 핵심 재회독','30분 · 해설을 가리고 풀기. 오답 복습은 2일 차까지 이어가기.', 'core'],
  ]},
  {day:2,title:'꺼내 보고, 틀린 곳을 마무리',hours:'약 6시간 + 중간 휴식',steps:[
    ['하룻밤 뒤 기억 점검','45분 · 오답과 헷갈림을 먼저 풀고 해설 재확인.', 'review'],
    ['계산 집중 훈련','40분 · 권한·umask·RAID·서브넷 계산 46문항.', 'calc'],
    ['첫 번째 실전 모의고사','100분 · 중간에 정답을 찾지 않고 끝까지 풀기.', 'exam'],
    ['실전 오답 분석','45분 · 틀린 이유를 설명하고 해당 원본 쪽 재확인.', 'review'],
    ['두 번째 실전 모의고사','100분 · 재출제되는 문제도 답의 근거까지 떠올리기.', 'exam'],
    ['마지막 핵심 점검','30분 · 저장한 문제와 남은 오답, 두 과목 약점 점검.', 'saved'],
  ]},
];
function plan(){main.innerHTML=heading('2일 집중 학습 플랜','하루 약 6시간을 기준으로 구성했습니다. 이미 익숙한 단원은 줄이고 취약 단원에 시간을 더 쓰세요.')+`<div class="callout">한 블록을 끝내면 10분 정도 쉬세요. 이틀 만의 완전한 습득을 보장하는 일정은 아닙니다. 목표는 전 범위 1회독 → 핵심·오답 반복 → 실전 점검이며, 모르는 개념을 설명할 수 있는지가 기준입니다.</div><section class="plan-grid">${PLAN.map(day=>`<article class="plan-day"><span class="eyebrow" style="color:var(--green)">DAY 0${day.day} · ${day.hours}</span><h2>${day.title}</h2><p>${day.day===1?'정답률보다 전체를 한 번 경험하는 데 집중합니다.':'맞힌 이유와 틀린 이유를 말로 설명해 봅니다.'}</p>${day.steps.map((step,i)=>{const id=`d${day.day}-${i}`;return `<div class="plan-step ${state.plan[id]?'done':''}"><input type="checkbox" id="${id}" data-plan="${id}" ${state.plan[id]?'checked':''}><div><label for="${id}">${step[0]}</label><p>${step[1]}</p>${button('학습 열기 →','plan-start',`data-day="${day.day}" data-step="${i}"`,'small secondary')}</div></div>`;}).join('')}</article>`).join('')}</section>`;}

function conceptQuestions(c){return c.questionIds.map(id=>BY_ID[id]);}
function filteredConcepts(){
  const saved=location.hash==='#notes/saved',query=noteQuery.toLowerCase().trim();
  return CONCEPTS.filter(c=>{
    const qs=conceptQuestions(c);
    return (!saved||qs.some(q=>progress(q.id).bookmark))&&(noteTopic==='all'||c.topic===noteTopic)&&(!noteRed||qs.some(q=>q.red))&&(!noteWrong||qs.some(q=>progress(q.id).wrong))&&(!query||`${c.title} ${c.summary} ${c.example} ${c.pitfall} ${c.comparison.flat().join(' ')} ${qs.map(q=>q.prompt+' '+answerLabel(q)).join(' ')}`.toLowerCase().includes(query));
  });
}
function startConcept(id){const c=CONCEPTS.find(c=>c.id===id);if(c)start(conceptQuestions(c),c.title,'practice','all');}
function notes(){
  const saved=location.hash==='#notes/saved',cs=filteredConcepts();
  const pages=Math.max(1,Math.ceil(cs.length/10));notePage=Math.max(0,Math.min(notePage,pages-1));
  main.innerHTML=heading(saved?'저장한 문제가 있는 개념':'반복 문제를 하나의 개념으로',`${ALL_QUESTIONS.length.toLocaleString()}개 문제를 ${CONCEPTS.length}개 개념으로 정리했습니다. 설명 → 비교 → 예제를 읽고 관련 문제로 확인하세요.`, `<a class="btn secondary small" href="${saved?'#notes':'#notes/saved'}">${saved?'전체 개념':'★ 저장한 문제의 개념'}</a>`)+`
  <div class="callout"><strong>1시간 집중 학습</strong><p>현재 검색·단원 조건에서 오답이 많은 개념을 우선해 최대 6개를 반복합니다. 한 문제마다 즉시 정답과 설명을 확인합니다. 시간은 화면을 떠나도 계속 흐릅니다.</p>${button('1시간 집중 학습 시작','start-focus')}</div><div class="searchbar"><input type="search" id="note-search" placeholder="df, bash_profile, 서브넷…" aria-label="핵심 노트 검색" value="${esc(noteQuery)}"><select id="note-topic" aria-label="노트 단원"><option value="all">전체 단원</option>${TOPICS.map(t=>`<option value="${t.id}" ${noteTopic===t.id?'selected':''}>${t.name}</option>`).join('')}</select><label class="check"><input id="note-red" type="checkbox" ${noteRed?'checked':''}>빨간 핵심</label><label class="check"><input id="note-wrong" type="checkbox" ${noteWrong?'checked':''}>오답 있는 개념</label></div>
  <div class="section-heading"><span class="text-link">${cs.length}개 개념 · ${notePage+1} / ${pages}페이지</span>${saved&&cs.length?button('저장한 문제 풀기','start-saved','','small'):''}</div>
  <div class="note-list">${cs.length?cs.slice(notePage*10,notePage*10+10).map(c=>{
    const qs=conceptQuestions(c),wrong=qs.filter(q=>progress(q.id).wrong).length;
    return `<details class="concept-note"><summary><span class="pill outline">${esc(TOPIC[c.topic].name)}</span><h3>${esc(c.title)}</h3><span class="concept-count">관련 ${qs.length}문제${wrong?` · 오답 ${wrong}`:''}</span></summary><p>${esc(c.summary)}</p><table class="concept-table"><caption>핵심 비교</caption><tbody>${c.comparison.map(([k,v])=>`<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table><h4>예제로 이해하기</h4><pre class="concept-example">${esc(c.example)}</pre><div class="memory"><strong>헷갈리기 쉬운 점</strong><p>${esc(c.pitfall)}</p></div><p class="muted">기출의 반복 출제 내용을 바탕으로 새로 작성한 개념 설명입니다. 개별 문제의 원본 해설과 검토 내용은 아래에서 확인하세요.</p>${button('이 개념 문제 풀기','start-concept',`data-id="${c.id}"`,'small')}
    <details class="concept-related"><summary>관련 문제 ${qs.length}개 보기</summary>${qs.map(q=>`<details><summary>${esc(q.examDate?`${q.examDate} · ${q.number}번`:`연습 ${q.id}`)} · ${esc(q.prompt)}</summary>${questionImages(q)}<div class="note-answer">${esc(answerLabel(q))}</div>${q.examDate?explanation(q):`<p>${esc(q.explanation)}</p>`}<div class="flex between">${sourceLink(q)}<button class="bookmark ${progress(q.id).bookmark?'on':''}" data-action="bookmark-note" data-id="${q.id}">${progress(q.id).bookmark?'★ 저장됨':'☆ 저장'}</button></div></details>`).join('')}</details></details>`;
  }).join(''):'<div class="empty"><h2>해당하는 개념이 없습니다.</h2><p>검색 조건을 바꾸거나 문제를 별표로 저장해 보세요.</p></div>'}</div>
  <div class="pagination">${button('← 이전','notes-prev',notePage===0?'disabled':'','secondary small')}${button('다음 →','notes-next',notePage===pages-1?'disabled':'','secondary small')}</div>`;
}
function about(){main.innerHTML=heading('자료와 학습 안내','학습 기준, 정리본의 보완 사항, 기록 관리 방법을 확인하세요.')+`<div class="about"><section class="panel"><h2>이 CBT의 구성</h2><p>제공한 「리눅스마스터 2급 2차」 PDF의 5–23쪽을 바탕으로 만든 자체 연습문제 ${QUESTIONS.length}개입니다. 별도로 제공받은 2020~2023년 기출 해설집 12회차, 960문항은 기출 회차 메뉴에서 응시할 수 있습니다. 기출의 문제와 선택지는 텍스트로 표시하고, 삽입된 참고 자료는 이미지로 보존합니다. 새 시험마다 보기를 섞습니다. ${QUESTIONS.filter(q=>q.red).length}개는 PDF의 빨간 강조와 연결된 개념이며, 계산 변형 문제는 46개입니다. 표지·목차·안내 페이지는 출제하지 않았습니다. 모든 문항에 정답 근거, 비교 설명, 한 줄 암기 포인트와 원본 쪽수를 연결했습니다.</p><p>첫날은 9개 단원을 모두 경험하고, 둘째 날은 지연 복습과 모의고사에 집중하도록 설계했습니다. 학습 완료 문항은 한 번 이상 채점한 고유 문항 수이며, ‘암기 완료’는 정답 1단계 후 30분, 2단계 후 8시간 간격을 통과한 3단계 문항입니다. 3단계도 24시간 뒤 다시 복습합니다.</p><p>정리본 기반 자체 연습문제에는 그림 식별 유형이 없어 정리본 17쪽의 이미지도 함께 확인하세요.</p></section>
  <section class="panel"><h2>시험 형식과 판정</h2><p><a href="https://www.ihd.or.kr/introducesubject1.do" target="_blank" rel="noopener">KAIT 공식 종목 안내</a>에서 2급 2차 80문항·100분, 총점 60점 이상·과목별 40% 미만 과락 기준을 확인했습니다(2026-09-08). 이 연습 세트는 운영 및 관리 48문항, 활용 32문항으로 구성합니다. 자체 제작 모의고사와 사용자 제공 기출시험은 구분해서 제공합니다. 기출시험은 원본 정답표와 문항 내 정정 안내를 기준으로 채점하며, 확인된 해설 오류는 보완 해설로 표시합니다.</p></section>
  <section class="panel"><h2>오해하기 쉬운 설명 보완</h2><ul><li><strong>umask:</strong> 단순 뺄셈이 아니라 요청 권한에서 해당 비트를 제거합니다. 기본 ACL이 없는 조건을 계산 문제에 명시했습니다. <a href="https://man7.org/linux/man-pages/man2/umask.2.html" target="_blank" rel="noopener">Linux umask 매뉴얼</a></li><li><strong>nice:</strong> 음수 조정값은 명확한 nice -n -10 형식을 사용합니다. 현재 NI에 조정값을 더합니다. <a href="https://www.gnu.org/s/coreutils/manual/html_node/nice-invocation.html" target="_blank" rel="noopener">GNU nice 매뉴얼</a></li><li><strong>top:</strong> 명령행 -n은 갱신 횟수이고, 화면 안에서 누르는 n은 표시 작업 수입니다. <a href="https://man7.org/linux/man-pages/man1/top.1.html" target="_blank" rel="noopener">top 매뉴얼</a></li><li><strong>서브넷:</strong> 게이트웨이를 별도 예약한다고 명시한 경우만 추가로 하나를 뺍니다. ‘인터넷 사용’이라는 말만으로 무조건 1을 더 빼지 않습니다.</li><li><strong>DNS·FTP:</strong> DNS는 TCP와 UDP 모두 사용합니다. FTP 20번 데이터 포트 설명에는 능동 모드 조건을 붙였습니다.</li><li><strong>nohup:</strong> SIGHUP 무시와 백그라운드 실행(&)을 구분했습니다. 좀비는 프로그램 전체가 실행 중인 상태가 아니라 종료 정보가 회수되지 않은 상태입니다.</li></ul></section>
  <section class="panel"><h2>기록 보관</h2><p>문항별 풀이, 오답, 복습 예정 시각, 저장한 노트, 진행 중인 시험과 학습 플랜을 이 브라우저에 자동 저장합니다. ${window.STATIC_CBT?'이 사이트는 브라우저별로 저장되며 다른 기기와 자동 동기화하지 않습니다.':'아래에서 학습 동기화를 연결하면 풀이 기록·시험 결과·플랜과 진행 중인 문제까지 공유합니다.'} 주소·포트 또는 브라우저를 바꾸기 전 기록을 내보내고 새 환경에서 가져오세요. 비공개 모드에서는 종료 시 삭제될 수 있습니다.</p><div class="flex">${button('학습 기록 내보내기','export')}${button('학습 기록 가져오기','import','','secondary')}</div></section></div>`;if(typeof Sync!=='undefined')main.innerHTML+=Sync.panel();}

function syncPage(){if(window.STATIC_CBT){about();return;}main.innerHTML=heading('학습 동기화','다른 브라우저와 기록을 연결하고, 풀던 문제를 이어서 학습하세요.')+(typeof Sync!=='undefined'?Sync.panel():`<section class="panel"><p>동기화 기능을 불러오는 중입니다. 이 안내가 계속 보이면 페이지를 새로고침해 주세요.</p><a class="btn secondary" href="?v=20260910#sync">최신 화면 다시 열기</a></section>`);}

function updateBadges(){document.getElementById('review-count').textContent=ALL_QUESTIONS.filter(reviewable).length;}
function updateTimer(){const s=state.session;if(!s||s.finished||(s.mode!=='exam'&&!s.focus))return;const left=Math.max(0,Math.ceil((s.deadline-Date.now())/1000));const el=document.getElementById('timer');if(el){el.textContent=`${String(Math.floor(left/60)).padStart(2,'0')}:${String(left%60).padStart(2,'0')}`;el.classList.toggle('urgent',left<300);}if(!left)finish(true);}
function render(){
  clearInterval(timerHandle);
  const route=(location.hash.slice(1)||'home').split('/'),name=route[0];
  const labels={home:'학습 대시보드',learn:'문제 풀기',review:'오답 · 복습',exam:'실전 모의고사',past:'기출 회차',notes:'핵심 노트',plan:'2일 학습 플랜',session:isExam()?(state.session.examDate?'기출시험':'실전 모의고사'):'문제 풀기',history:'풀이 기록',sync:'학습 동기화',about:'자료 · 학습 안내'};
  document.getElementById('page-title').textContent=labels[name]||labels.home;
  document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===(name==='session'?(isExam()?(state.session.examDate?'past':'exam'):'learn'):name)));
  if(name==='home')home();else if(name==='learn')learn(route[1]);else if(name==='review')review();else if(name==='exam')exam();else if(name==='past')pastExams(route[1]);else if(name==='notes')notes();else if(name==='plan')plan();else if(name==='session')renderQuiz();else if(name==='history')historyPage(route[1],route[2]);else if(name==='sync')syncPage();else if(name==='about')about();else home();
  updateBadges();showStorageWarning();window.scrollTo(0,0);
  if(activeSession()&&(isExam()||state.session.focus)){updateTimer();timerHandle=setInterval(updateTimer,1000);}
}

document.addEventListener('click',event=>{
  const el=event.target.closest('[data-action]');if(!el||el.disabled)return;
  const action=el.dataset.action;
  const s=state.session;
  switch(action){
    case 'learn':case 'review':case 'exam':go(action);break;
    case 'retry-history':retryHistory(el.dataset.key);break;
    case 'retry-history-unsure':retryHistory(el.dataset.key,true);break;
    case 'resume':go('session');break;
    case 'start-core':start(QUESTIONS.filter(q=>q.red),'빨간 핵심 집중');break;
    case 'start-topic':start(QUESTIONS.filter(q=>q.topic===el.dataset.topic),TOPIC[el.dataset.topic].name,'practice','all');break;
    case 'start-custom':{const topic=selectedValue('topic-filter','all'),red=document.getElementById('red-filter').checked;start(QUESTIONS.filter(q=>(topic==='all'||q.topic===topic)&&(!red||q.red)),`${topic==='all'?'전체 단원':TOPIC[topic].name}${red?' · 빨간 핵심':''}`,'practice',selectedValue('count-filter','20'));break;}
    case 'start-review':start(ALL_QUESTIONS.filter(reviewable),'오답 · 지연 복습');break;
    case 'start-wrong':start(ALL_QUESTIONS.filter(q=>progress(q.id).wrong),'오답 집중');break;
    case 'start-unsure':start(ALL_QUESTIONS.filter(q=>progress(q.id).unsure),'헷갈린 개념');break;
    case 'start-saved':start(ALL_QUESTIONS.filter(q=>progress(q.id).bookmark),'저장한 문제','practice','all');break;
    case 'start-one':start([BY_ID[el.dataset.id]],'한 문제 집중','practice',1);break;
    case 'start-exam':startExam();break;
    case 'start-past':startPastExam(el.dataset.date);break;
    case 'choose':choose(Number(el.dataset.value));break;
    case 'check':check();break;
    case 'previous':move(s.index-1);break;
    case 'next':move(s.index+1);break;
    case 'jump':move(Number(el.dataset.index));break;
    case 'finish':finish();break;
    case 'bookmark':{const id=s.items[s.index].id;toggleBookmark(id);renderQuiz(false);break;}
    case 'bookmark-note':{toggleBookmark(el.dataset.id);el.textContent=progress(el.dataset.id).bookmark?'★ 저장됨':'☆ 저장';el.classList.toggle('on',progress(el.dataset.id).bookmark);break;}
    case 'flag':s.items[s.index].flag=!s.items[s.index].flag;save();renderQuiz(false);break;
    case 'retry-result':{const ids=[...new Set(s.items.filter(i=>i.checked&&(!isCorrect(BY_ID[i.id],i.selected)||i.unsure)).map(i=>i.id))];start(ids.map(id=>BY_ID[id]),'이번 오답 재도전','practice','all');break;}
    case 'start-focus':startFocus();break;
    case 'start-concept':startConcept(el.dataset.id);break;
    case 'notes-prev':notePage--;notes();window.scrollTo(0,0);break;
    case 'notes-next':notePage++;notes();window.scrollTo(0,0);break;
    case 'plan-start':{const step=PLAN[Number(el.dataset.day)-1].steps[Number(el.dataset.step)];const target=step[2];if(Array.isArray(target))start(QUESTIONS.filter(q=>target.includes(q.topic)),step[0],'practice','all');else if(target==='exam')go('exam');else if(target==='review')go('review');else if(target==='saved')go('notes/saved');else start(QUESTIONS.filter(q=>target==='core'?q.red:q.kind==='계산'),step[0],'practice',target==='core'?20:'all');break;}
    case 'export':exportState();break;
    case 'import':document.getElementById('import-file').click();break;
  }
});
function toggleBookmark(id){const p={...progress(id)};p.bookmark=!p.bookmark;state.progress[id]=p;save();}
document.addEventListener('change',event=>{
  const el=event.target;
  if(el.id==='unsure'&&activeSession()){state.session.items[state.session.index].unsure=el.checked;save();}
  if(el.dataset.plan){state.plan[el.dataset.plan]=el.checked;save();el.closest('.plan-step').classList.toggle('done',el.checked);}
  if(el.id==='note-topic'){noteTopic=el.value;notePage=0;notes();}
  if(el.id==='note-wrong'){noteWrong=el.checked;notePage=0;notes();}
  if(el.id==='note-red'){noteRed=el.checked;notePage=0;notes();}
});
document.addEventListener('input',event=>{if(event.target.id==='note-search'){const pos=event.target.selectionStart;noteQuery=event.target.value;notePage=0;notes();const input=document.getElementById('note-search');input.focus();try{input.setSelectionRange(pos,pos);}catch{}}});
document.addEventListener('keydown',event=>{
  if(location.hash!=='#session'||!activeSession()||event.ctrlKey||event.metaKey||event.altKey||event.repeat)return;
  if(event.target.closest('input,select,textarea'))return;
  const s=state.session,item=s.items[s.index];
  if(/^[1-4]$/.test(event.key)){event.preventDefault();choose(item.order[Number(event.key)-1]);}
  else if(event.key==='Enter'&&!event.target.closest('button,a,summary')){event.preventDefault();if(s.mode==='practice'&&!item.checked)check();else if(s.index<s.items.length-1)move(s.index+1);else finish();}
  else if(event.key==='ArrowRight'){event.preventDefault();move(s.index+1);}
  else if(event.key==='ArrowLeft'){event.preventDefault();move(s.index-1);}
});
function exportState(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=`linuxmaster-progress-${new Date().toISOString().slice(0,10)}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('학습 기록을 파일로 저장했습니다.');}
document.getElementById('import-file').addEventListener('change',async event=>{
  const file=event.target.files[0];if(!file)return;
  try{if(file.size>5*1024*1024)throw Error('size');const imported=validateState(JSON.parse(await file.text()));if(!imported)throw Error('format');if(confirm('현재 브라우저의 학습 기록을 선택한 파일의 기록으로 교체할까요?')){state=imported;recoverLastArchive();save();render();toast('학습 기록을 불러왔습니다.');}}
  catch{toast('올바른 학습 기록 파일이 아닙니다. 이 CBT에서 내보낸 JSON을 선택해 주세요.');}
  event.target.value='';
});
window.addEventListener('hashchange',render);
window.addEventListener('pagehide',save);
document.addEventListener('visibilitychange',()=>{if(!document.hidden){updateTimer();updateBadges();}});
if(recoverLastArchive())save();
render();
