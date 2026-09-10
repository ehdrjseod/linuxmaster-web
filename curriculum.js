/* A guided course. Personal answers and statistics are never embedded here. */
window.STUDY_CURRICULUM = [
 {id:'rights',title:'특수 권한: 누가 실행하고 누가 지우는가',minutes:8,concepts:['special-mode'],
  goal:'Set-UID·Set-GID·Sticky bit를 상황에 맞게 고를 수 있다.',
  story:'공동 작업실을 떠올려 보세요. 실행할 때 누구의 신분을 빌릴지, 새 파일을 어느 팀 소속으로 만들지, 다른 사람의 파일을 지워도 될지는 서로 다른 문제입니다.',
  steps:['Set-UID: 실행 파일을 실행할 때 파일 소유자의 유효 사용자 ID를 사용합니다. 비밀번호 변경 프로그램 /usr/bin/passwd가 대표 예입니다.','Set-GID: 실행 파일에서는 유효 그룹 ID에 영향을 줍니다. 디렉터리에 설정하면 새 항목이 그 디렉터리의 그룹을 상속합니다.','Sticky bit: 공유 디렉터리에서 남의 파일을 함부로 삭제·이름 변경하지 못하게 합니다. 파일 소유자·디렉터리 소유자·권한 있는 관리자는 예외입니다.'],
  example:'팀 그룹을 물려주려면 chmod g+s project. 남의 파일 삭제를 제한하려면 chmod +t project.',
  recall:'팀 소속을 물려주는 것과 남의 파일을 못 지우게 하는 것은 각각 무엇인가요?',
  answer:'그룹 상속은 Set-GID, 공유 디렉터리의 삭제 제한은 Sticky bit입니다. 일반 rwx 권한도 함께 확인해야 합니다.'},
 {id:'priority',title:'우선순위: 숫자가 작을수록 먼저',minutes:8,concepts:['priority'],
  goal:'nice와 renice를 구분하고 NI 값의 방향을 설명할 수 있다.',
  story:'nice는 다른 프로세스에게 얼마나 양보할지를 나타내는 숫자라고 생각하세요. 더 많이 양보하는 큰 숫자는 CPU 경쟁에서 상대적으로 낮은 우선순위입니다.',
  steps:['일반적인 Linux NI 범위는 -20부터 19까지입니다. 작은 NI가 높은 스케줄링 우선순위를 뜻합니다.','nice는 새 명령을 실행할 때 현재 NI에 조정값을 적용합니다. nice -n 5 명령은 NI를 5로 고정한다는 뜻이 아닙니다.','renice는 이미 실행 중인 PID의 NI를 변경합니다. 권한과 구현에 따른 옵션 차이가 있으므로 문제의 명령 형식을 확인합니다.'],
  example:'현재 NI=0인 PID 1222를 NI=10으로: renice 10 1222. NI=5인 셸에서 nice -n 3 명령을 실행하면 일반적으로 NI=8.',
  recall:'NI가 0에서 10이 되면 우선순위가 올라가나요? 기존 PID에는 어떤 명령을 쓰나요?',
  answer:'우선순위는 낮아집니다. 기존 PID에는 renice를 씁니다. -10과 10은 반대 방향입니다.'},
 {id:'quota',title:'쿼터: 보기·편집·보고서·켜기',minutes:8,concepts:['quota'],
  goal:'쿼터 명령을 수행할 작업에 맞춰 고를 수 있다.',
  story:'디스크 쿼터는 사용자별 저장 공간의 한도입니다. 내 사용량을 보는 일, 한도를 바꾸는 일, 여러 사람의 사용량을 보고서로 보는 일을 나눠 생각하세요.',
  steps:['quota는 사용량과 한도를 조회하고, edquota는 한도를 편집합니다. 이름 속 ed를 edit와 연결하세요.','repquota는 쿼터 보고서를 보여주고, quotaon·quotaoff는 쿼터 적용을 켜거나 끕니다.','XFS는 xfs_quota라는 전용 도구를 사용합니다. 파일 시스템이 XFS인지 먼저 확인하세요. 블록 사용량과 inode 수 제한도 구분합니다.'],
  example:'“사용자의 한도를 편집” → edquota. “XFS 쿼터 관리” → xfs_quota. “현재 사용량 조회” → quota.',
  recall:'quota와 edquota의 차이를 한 문장으로 설명해 보세요.',
  answer:'quota는 확인하고 edquota는 편집합니다. soft limit는 유예 기간과 연결되며 hard limit는 넘을 수 없는 상한입니다.'},
 {id:'bash',title:'Bash 설정: 누구에게·언제 적용되는가',minutes:10,concepts:['shell-startup'],
  goal:'로그인 셸과 대화형 비로그인 셸의 설정 파일을 구분한다.',
  story:'설정 파일은 “대상은 전체인가 개인인가?”와 “지금 로그인 셸인가?”라는 두 질문으로 찾으면 됩니다. 터미널 창을 열었다고 항상 로그인 셸인 것은 아닙니다.',
  steps:['Bash 로그인 셸은 /etc/profile을 읽고, 개인 파일 ~/.bash_profile → ~/.bash_login → ~/.profile 중 처음 발견한 읽을 수 있는 파일 하나를 읽습니다.','대화형 비로그인 Bash는 ~/.bashrc를 읽습니다. 로그인 때도 .bashrc를 적용하려면 .bash_profile 등에서 따로 불러오는 구성이 흔합니다.','/etc/bashrc는 배포판의 설정 방식에 따라 사용됩니다. 모든 Bash가 자동으로 읽는 보편 규칙으로 외우지 마세요. source 파일은 현재 셸에서 설정을 실행합니다.'],
  example:'전체 사용자의 로그인 환경 → /etc/profile. 개인 로그인 설정 → ~/.bash_profile. 대화형 비로그인 설정 → ~/.bashrc.',
  recall:'로그인할 때 개인 설정 파일 세 개를 전부 읽나요? .bashrc도 무조건 자동으로 읽나요?',
  answer:'개인 로그인 파일은 순서대로 찾아 첫 번째 읽을 수 있는 파일 하나만 읽습니다. .bashrc는 별도로 불러오도록 구성했는지 확인해야 합니다.'},
 {id:'packages',title:'패키지: 도구 선택 후 옵션 해석',minutes:12,concepts:['package-family','rpm-query'],
  goal:'배포판별 도구와 RPM 조회 대상을 구분한다.',
  story:'먼저 “어느 계열의 시스템인가?”, 다음으로 “설치인가 조회인가?”, 마지막으로 “설치된 패키지인가 내려받은 파일인가?”를 확인하세요. 옵션부터 외우면 비슷한 이름에 흔들리기 쉽습니다.',
  steps:['Debian 계열은 dpkg와 APT, RPM 계열은 rpm과 YUM·DNF를 연결합니다. SUSE의 zypper는 패키지 관리, YaST는 더 넓은 시스템 설정 도구입니다.','RPM의 -q는 조회입니다. -qi는 설치된 패키지 정보, -ql은 그 패키지가 제공하는 파일 목록입니다.','rpm -qf /경로는 그 파일을 제공하는 설치 패키지를 찾습니다. rpm -qip 파일.rpm은 설치 전 패키지 파일의 정보를 봅니다. -p가 조회 대상을 패키지 파일로 바꿉니다.','alien은 패키지 형식 변환 도구입니다. 조회 옵션 -f와 업그레이드 옵션 -F처럼 대소문자도 구분하세요.'],
  example:'“이 파일을 어느 패키지가 설치했지?” → rpm -qf /usr/bin/bash. “이 RPM 파일의 설명은?” → rpm -qip sample.rpm.',
  recall:'rpm -ql과 rpm -qf는 무엇을 입력받고 무엇을 알려주나요?',
  answer:'-ql은 패키지 이름을 받아 파일 목록을, -qf는 설치된 파일 경로를 받아 소속 패키지를 알려줍니다.'},
 {id:'mixed',title:'섞어서 다시 설명하고 풀기',minutes:14,concepts:['special-mode','priority','quota','shell-startup','package-family','rpm-query'],
  goal:'앞에서 본 순서와 다른 문제에서도 판단 기준을 꺼내 쓸 수 있다.',
  story:'이제 단원 순서를 섞습니다. 정답을 고르기 전에 “무엇을 하려는 문제인지”를 한 문장으로 말해 보세요.',
  steps:['권한은 실행 신분·그룹 상속·삭제 제한 중 무엇인지 구분합니다.','명령어는 새 작업인지 기존 대상인지, 조회인지 변경인지 확인합니다.','설정 파일은 적용 대상과 읽는 시점을, 패키지는 도구와 조회 대상을 확인합니다.','정답을 맞혀도 이유를 설명하지 못하면 헷갈림으로 표시하고 다시 확인하세요.'],
  example:'정답 번호를 기억하기보다 “이 문제는 그룹 상속이므로 Set-GID”처럼 근거를 말하세요.',
  recall:'오늘 가장 헷갈렸던 두 개념의 차이를 설명 없이 말할 수 있나요?',
  answer:'막히는 부분은 다음 복습 대상입니다. 오늘 잘 풀었다면 내일 다시 문제를 섞어 확인하세요. 한 번의 정답만으로 장기 기억을 확정하지 않습니다.'}
];

function courseUnits(){return window.STUDY_CURRICULUM;}
function coursePool(unit){return unit.concepts.flatMap(id=>conceptQuestions(CONCEPTS.find(c=>c.id===id)));}
function courseItems(){
  const seen=new Set();
  return courseUnits().flatMap((unit,lesson)=>{
    // Interleave concepts and reserve other questions for mixed review where possible.
    const pools=unit.concepts.map(id=>ranked(conceptQuestions(CONCEPTS.find(c=>c.id===id))).sort((a,b)=>Number(seen.has(a.id))-Number(seen.has(b.id))));
    const picked=[];const target=lesson===5?12:6;
    for(let n=0;picked.length<target&&pools.some(p=>p.length);n++){
      const p=pools[n%pools.length];if(p.length){const q=p.shift();picked.push(q);seen.add(q.id);}
    }
    return (lesson===5?shuffle(picked):picked).map(q=>({...focusItem(q),retry:false,lesson}));
  });
}
function startCurriculum(){
  if(activeSession()&&state.session.focus?.course){go('session');return;}
  if(activeSession()&&!confirm('맞춤 코스를 시작하면 진행 중인 문제 세트가 바뀝니다. 이미 채점한 기록은 유지됩니다. 시작할까요?'))return;
  recoverLastArchive();
  state.session={syncId:cryptoId(),mode:'practice',label:'맞춤 1시간 · 개념 이해 코스',examDate:null,started:Date.now(),deadline:Date.now()+HOUR,index:0,items:courseItems(),finished:false,applied:{},courseRead:{},focus:{course:true,conceptIds:courseUnits()[5].concepts}};
  save();go('session');
}
function curriculumPage(){
  main.innerHTML=heading('이해하고 반복하는 맞춤 코스','특수 권한 → 우선순위 → 쿼터 → Bash → 패키지 → 종합 복습. 권장 60분입니다.')+`<div class="callout"><h2>읽기 → 떠올리기 → 한 문제씩 확인</h2><p>각 단계의 쉬운 설명을 읽고, 답을 가린 질문에 스스로 설명한 뒤 문제를 풉니다. 보기를 고르면 즉시 해설이 나오고, 오답·헷갈림은 같은 단계에서 최대 두 번 추가로 연습합니다. 마지막에는 다른 문제를 우선해 섞습니다.</p><p>1시간 뒤 채점한 내용까지 저장합니다. 화면을 떠나도 시간은 계속 흐릅니다. 아래 시간은 권장 분량이며 단계는 문제를 풀면서 넘어갑니다.</p>${button(activeSession()&&state.session.focus?.course?'맞춤 코스 이어서':'맞춤 코스 시작','start-curriculum')}</div><div class="topic-grid">${courseUnits().map((u,i)=>`<article class="panel"><span class="pill outline">${i+1}단계 · ${u.minutes}분</span><h2>${esc(u.title)}</h2><p>${esc(u.goal)}</p></article>`).join('')}</div><section class="panel"><h2>반복 계획</h2><p>오늘: 설명을 이해하고 코스를 1회 진행합니다. 내일: 같은 코스를 다시 풀면서 설명을 보기 전에 이유를 말합니다. 3일 뒤: 오답·복습 메뉴에서 남아 있는 문제를 확인합니다.</p><p>이미 읽고 채점한 위치는 자동 저장됩니다. 코스를 다시 시작하면 보기 순서가 바뀌며, 기존 풀이 기록도 남습니다.</p></section>`;
}
function courseIntro(){
  const s=state.session,it=s.items[s.index],u=courseUnits()[it.lesson];
  main.innerHTML=heading(`${it.lesson+1}단계 · ${u.title}`,u.goal)+`<section class="panel course-intro"><span class="pill outline">권장 ${u.minutes}분 · 설명부터 이해하기</span><p>${esc(u.story)}</p><ol>${u.steps.map(t=>`<li>${esc(t)}</li>`).join('')}</ol><div class="memory"><strong>상황에 적용</strong><p>${esc(u.example)}</p></div><h3>설명을 가리고 말해 보세요</h3><p>${esc(u.recall)}</p><details><summary>생각한 뒤 답 확인</summary><p>${esc(u.answer)}</p></details><p>${button('이해했어요 · 문제 풀기','course-ready')}</p><p class="small muted">다음 문제를 눌러야 진행합니다. 맞혔어도 헷갈리면 해설 아래에서 표시할 수 있습니다.</p><div id="timer" class="timer"></div><a href="#curriculum">코스 순서 보기</a></section>`;
  updateTimer();
}
function courseReady(){const s=state.session;if(!s?.focus?.course||s.finished)return;s.courseRead[s.items[s.index].lesson]=true;save();renderQuiz();}
function courseRetry(s,item,q){
  const prior=s.items.filter(i=>i.lesson===item.lesson&&i.id===q.id).length;
  if(prior>=3||s.items.some((i,n)=>n>s.index&&i.lesson===item.lesson&&i.id===q.id&&!i.checked))return;
  const nextLesson=s.items.findIndex((i,n)=>n>s.index&&i.lesson!==item.lesson);
  const end=nextLesson<0?s.items.length:nextLesson;
  s.items.splice(Math.min(s.index+4,end),0,{...focusItem(q),lesson:item.lesson});
}
function courseUnsure(){
  const s=state.session,it=s?.items[s.index];if(!s?.focus?.course||s.finished||!it.checked||it.unsure)return;
  it.unsure=true;const p={...progress(it.id),unsure:true,streak:0,due:Date.now()+10*MINUTE,last:Date.now()};state.progress[it.id]=p;
  courseRetry(s,it,BY_ID[it.id]);save();renderQuiz(false);updateBadges();
}
function courseSummary(){
  const s=state.session;if(!s.focus?.course)return '';
  const rows=courseUnits()[5].concepts.map(id=>{
    const c=CONCEPTS.find(c=>c.id===id),items=s.items.filter(i=>i.checked&&c.questionIds.includes(i.id));
    const mixed=items.filter(i=>i.lesson===5),correct=mixed.filter(i=>isCorrect(BY_ID[i.id],i.selected)&&!i.unsure);
    const ok=new Set(correct.map(i=>i.id)).size>=2&&mixed.every(i=>isCorrect(BY_ID[i.id],i.selected)&&!i.unsure);
    return `<tr><th scope="row">${esc(c.title)}</th><td>${items.length}회</td><td>${!mixed.length?'종합 확인 전':ok?'이번 종합 확인 통과':'다시 복습'}</td></tr>`;
  });
  return `<section class="panel"><h2>개념별 다음 복습</h2><p>종합 복습에서 서로 다른 2문제를 헷갈림 없이 맞혔는지 확인합니다. 오답이 남으면 다시 복습으로 표시합니다. 오늘의 확인 결과이며 장기 암기 완료 판정은 아닙니다.</p><table class="concept-table"><thead><tr><th>개념</th><th>풀이</th><th>다음 단계</th></tr></thead><tbody>${rows.join('')}</tbody></table><a class="btn secondary" href="#curriculum">코스 순서 · 반복 계획</a></section>`;
}
