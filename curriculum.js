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

// Saved courses without a version retain their original six lesson indexes.
window.LEGACY_STUDY_CURRICULUM = window.STUDY_CURRICULUM;
window.STUDY_CURRICULUM = [
 ...window.LEGACY_STUDY_CURRICULUM.slice(0,-1),
 {id:'xfs',title:'XFS: 생성·점검·복구 도구 구분',minutes:10,concepts:['format','fsck'],
  goal:'XFS와 ext 계열의 도구를 구분하고 작업 목적에 맞게 고른다.',
  story:'파일 시스템은 창고의 물건을 어디에 두었는지 관리하는 방식입니다. XFS와 ext4는 서로 다른 관리 방식이므로 만드는 도구와 수리하는 도구도 구분해야 합니다.',
  steps:['XFS는 저널링 파일 시스템입니다. 메타데이터 변경 내용을 로그로 관리해 장애 복구에 활용합니다. 저널링이 파일 백업을 대신하는 것은 아닙니다.',
   '생성은 mkfs.xfs입니다. mkfs -t xfs도 같은 종류의 도구를 선택합니다. mkfs.ext4는 ext4 생성용이고 mke2fs는 ext2·ext3·ext4 계열 도구입니다.',
   'XFS 점검·복구는 xfs_repair를 연결해서 기억하세요. -n은 수정 없이 점검하는 옵션입니다. 일반적인 오프라인 복구는 마운트를 해제한 상태에서 합니다. 생성 명령으로 복구하려고 하면 기존 데이터를 잃을 수 있습니다.',
   'ext 계열 점검은 e2fsck와 연결합니다. 과거 CentOS 7 기출의 fsck -t xfs를 xfs_repair와 같은 복구 명령으로 고르면 안 됩니다. fsck.xfs는 일반적인 파일 시스템 검사처럼 동작하지 않습니다.',
   'XFS 확장은 xfs_growfs, 쿼터 관리는 xfs_quota입니다. grow는 늘리기, repair는 수리, quota는 사용 한도라는 뜻으로 연결하세요.'],
  example:'XFS 생성 → mkfs.xfs /dev/sdb1. 수정 없이 점검 → xfs_repair -n /dev/sdb1. 두 명령의 목적은 완전히 다릅니다. 장치 경로는 학습용 예시입니다.',
  recall:'XFS를 새로 만드는 명령과 이미 있는 XFS를 점검·복구하는 명령은 각각 무엇인가요? -n은 무엇을 바꾸나요?',
  answer:'생성은 mkfs.xfs, 점검·복구는 xfs_repair입니다. xfs_repair -n은 실제 수정 없이 점검합니다. ext 계열의 e2fsck와 구분하세요.',
  sources:[['XFS 복구 매뉴얼','https://www.man7.org/linux/man-pages/man8/xfs_repair.8.html'],['fsck.xfs 매뉴얼','https://www.man7.org/linux/man-pages/man8/fsck.xfs.8.html']]},
 {id:'compression',title:'압축과 묶음: gzip·bzip2·xz·tar',minutes:10,concepts:['compression','tar'],
  goal:'확장자에서 압축 도구를 찾고 tar 옵션을 한 글자씩 해석한다.',
  story:'여러 서류를 상자 하나에 담는 일이 tar의 묶음이고, 그 상자의 부피를 줄이는 일이 압축입니다. .tar.gz는 tar로 묶은 뒤 gzip으로 압축했다는 뜻입니다. b2zip이 아니라 bzip2가 정확한 명령 이름입니다.',
  steps:['gzip ↔ .gz, bzip2 ↔ .bz2, xz ↔ .xz를 짝지으세요. 압축 해제는 gzip -d·bzip2 -d·xz -d이고, gunzip·bunzip2·unxz라는 이름도 사용합니다.',
   'gzip·bzip2·xz는 기본적으로 성공한 압축 결과로 원본 파일을 대체합니다. -k는 원본 유지, -d는 압축 해제입니다. 여러 파일을 하나의 압축 묶음으로 만들려면 먼저 tar로 묶습니다.',
   'tar의 c는 create(새 묶음), x는 extract(꺼내기), t는 목록 확인입니다. 한 번에 어떤 작업을 할지 먼저 고르세요. v는 처리 과정을 보여주고 f 뒤에는 묶음 파일 이름을 씁니다.',
   'GNU tar에서 z는 gzip, 소문자 j는 bzip2, 대문자 J는 xz입니다. .tar.gz → z, .tar.bz2 → j, .tar.xz → J로 연결하세요. -cf만 사용하면 압축 없이 묶습니다.',
   'gzip -c의 c는 표준 출력으로 내보내기입니다. tar -c의 새 묶음 생성과 뜻이 다릅니다. 옵션 글자만 외우지 말고 어느 명령의 옵션인지 먼저 확인하세요.'],
  example:'tar -czf backup.tar.gz docs/ → docs를 묶고 gzip 압축. tar -xjf backup.tar.bz2 → bzip2 압축 묶음 풀기. tar -tJf backup.tar.xz → xz 압축 묶음의 목록 확인.',
  recall:'.tar.bz2를 풀 때 왜 xjf를 쓰나요? gzip -d와 tar -x는 같은 일을 하나요?',
  answer:'x는 묶음에서 꺼내기, j는 bzip2, f는 뒤에 오는 파일 이름입니다. gzip -d는 gzip 압축만 해제하고 tar -x는 묶인 파일을 꺼냅니다. .tar.gz는 두 과정이 필요하며 tar -xzf가 함께 처리합니다.',
  sources:[['GNU tar 압축 형식','https://www.gnu.org/software/tar/manual/html_node/gzip.html'],['GNU gzip 매뉴얼','https://www.gnu.org/software/gzip/manual/gzip.html']]},
 {...window.LEGACY_STUDY_CURRICULUM.at(-1),concepts:[...window.LEGACY_STUDY_CURRICULUM.at(-1).concepts,'format','fsck','compression','tar'],steps:[...window.LEGACY_STUDY_CURRICULUM.at(-1).steps,'파일 시스템은 생성과 복구를, 압축은 도구·확장자·묶음 해제를 구분합니다.']}
];
// Version 2 keeps XFS/compression and its original mixed-review index.
window.STUDY_CURRICULUM_V2 = window.STUDY_CURRICULUM;
window.STUDY_CURRICULUM = [
 ...window.STUDY_CURRICULUM_V2.slice(0,-1),
 {id:'printers',title:'프린터: BSD·System V와 CUPS',minutes:10,concepts:['print-commands','printing'],
  goal:'인쇄 요청·대기열 확인·취소 명령을 계열별로 구분한다.',
  story:'공용 프린터 앞에서 번호표를 뽑는다고 생각하세요. 문서를 맡기고, 내 순서를 확인하고, 잘못 맡긴 작업을 취소합니다. BSD와 System V는 이 세 가지 일을 부르는 명령 이름이 다른 유닉스 계열입니다. “BSD 프린터”는 프린터 기종을 뜻하지 않습니다.',
  steps:['BSD 계열: lpr는 인쇄 요청, lpq는 대기열 확인, lprm은 작업 제거입니다. q를 queue(줄), rm을 remove(제거)와 연결하세요.',
   'System V 계열: lp는 인쇄 요청, lpstat은 상태·작업 확인, cancel은 작업 취소입니다. lpr ↔ lp, lpq ↔ lpstat, lprm ↔ cancel을 같은 역할끼리 짝지으세요.',
   '인쇄 부수는 lpr -#3 또는 lp -n 3입니다. 프린터 지정은 lpr -P office 또는 lp -d office입니다. 같은 목적이라도 명령에 따라 옵션이 다릅니다.',
   '예를 들어 lpq로 작업 번호 42를 확인한 뒤 lprm 42로 취소합니다. System V 방식은 lpstat -o로 요청 ID를 확인하고 cancel office-42처럼 취소합니다. 프린터 이름과 작업 번호는 실제 출력 결과를 사용합니다.',
   'CUPS는 인쇄 작업을 관리하는 시스템이며 BSD 방식과 System V 방식 명령을 모두 제공합니다. IPP는 인쇄 통신 규약이고 기본 포트는 631입니다. CUPS는 시스템, IPP는 통신 규약, lp·lpr는 명령으로 구분하세요.',
   '기출에서 PPD는 프린터 기능 설명 파일, system-config-printer는 해당 배포판의 GUI 프린터 설정 도구와 연결합니다. 명령어 계열을 묻는지, 인쇄 시스템·프로토콜을 묻는지 먼저 살펴보세요.'],
  example:'report.txt를 office 프린터에서 3부 인쇄: BSD 방식은 lpr -P office -#3 report.txt, System V 방식은 lp -d office -n 3 report.txt. 대기열 확인은 lpq, 작업 제거는 lprm입니다.',
  recall:'BSD에서 “내 인쇄 작업이 기다리는지 확인”과 “작업 취소”는 각각 무엇인가요? System V에서는 어떻게 바뀌나요?',
  answer:'BSD는 lpq로 확인하고 lprm으로 취소합니다. System V는 lpstat으로 확인하고 cancel로 취소합니다. 요청 명령인 lpr·lp와 구분하세요. CUPS에서는 두 방식 모두 사용할 수 있습니다.',
  sources:[['CUPS 인쇄 명령 안내','https://www.cups.org/doc/options.html'],['lpr 옵션','https://www.cups.org/doc/man-lpr.html'],['lp 옵션','https://www.cups.org/doc/man-lp.html']]},
 {...window.STUDY_CURRICULUM_V2.at(-1),concepts:[...window.STUDY_CURRICULUM_V2.at(-1).concepts,'print-commands','printing'],steps:[...window.STUDY_CURRICULUM_V2.at(-1).steps,'프린터는 BSD·System V 계열과 요청·조회·취소 역할을 먼저 구분합니다.']}
];
// Keep the previous printer course intact for saved sessions.
window.STUDY_CURRICULUM_V3 = window.STUDY_CURRICULUM;
window.STUDY_CURRICULUM = [
 ...window.STUDY_CURRICULUM_V3.slice(0,-1),
 {id:'ipv4',title:'IPv4: 주소·클래스·사설 IP 구분',minutes:8,concepts:['ipv4'],
  goal:'IPv4 주소 길이와 사설·루프백 주소를 구분한다.',
  story:'IP 주소를 집 주소라고 생각하세요. 어느 동네인지와 그 동네의 어느 집인지가 함께 들어 있습니다. IPv4는 8비트씩 네 묶음, 총 32비트이며 각 묶음을 0~255의 숫자로 표시합니다.',
  steps:['192.168.10.130은 네 묶음의 숫자입니다. 하지만 네트워크와 호스트의 경계가 항상 점 위치인 것은 아닙니다. /26처럼 함께 주어진 프리픽스로 경계를 정합니다.',
   '기출의 전통적인 클래스 구분: A는 첫 숫자 1~126(기본 /8), B는 128~191(/16), C는 192~223(/24)입니다. 0과 127은 특별한 용도로 구분합니다. 현재 CIDR에서는 주소의 첫 숫자보다 명시된 /n을 기준으로 계산하세요.',
   '사설 주소는 10.0.0.0~10.255.255.255, 172.16.0.0~172.31.255.255, 192.168.0.0~192.168.255.255입니다. 172로 시작한다고 모두 사설은 아닙니다.',
   '127.0.0.0/8은 자기 호스트를 가리키는 루프백 범위이며 대표 주소는 127.0.0.1입니다. 사설 주소가 아니라고 전부 일반 공인 호스트 주소인 것은 아닙니다.',
   '클래스 D의 224~239는 멀티캐스트, E의 240~255는 예약·특수 용도와 연결합니다. 첫 숫자 255 범위에는 제한 브로드캐스트 255.255.255.255도 있습니다. 일반 A/B/C 호스트 주소처럼 취급하지 마세요.'],
  example:'172.20.1.5는 사설 범위에 들어갑니다. 172.32.1.5는 RFC 1918 사설 범위 밖입니다. 127.0.0.1은 다른 PC가 아니라 내 호스트를 가리킵니다.',
  recall:'IPv4는 몇 비트인가요? 172.31.1.1과 172.32.1.1 중 사설 주소는 무엇인가요?',
  answer:'32비트입니다. 172.31.1.1은 사설이고 172.32.1.1은 RFC 1918 사설 범위 밖입니다. 172.16~172.31의 두 번째 숫자 범위를 확인하세요.',
  sources:[['RFC 1918 사설 주소','https://www.rfc-editor.org/rfc/rfc1918.html']]},
 {id:'subnet',title:'IPv4 서브넷: 구간·호스트 수·게이트웨이',minutes:12,concepts:['subnet'],
  goal:'프리픽스에서 네트워크·브로드캐스트·호스트 범위를 계산한다.',
  story:'큰 동네를 작은 구역으로 나누는 것이 서브넷팅입니다. /26은 32비트 중 앞 26비트를 구역 이름으로 쓰고, 남은 6비트를 그 구역 안의 주소에 쓴다는 뜻입니다.',
  steps:['1. 호스트 비트부터 찾습니다. /26이면 32−26=6비트입니다. 전체 주소는 2의 6제곱=64개입니다. 일반적인 서브넷에서는 네트워크·브로드캐스트 두 주소를 빼서 62개를 호스트에 쓸 수 있습니다.',
   '2. /26의 마스크는 255.255.255.192입니다. 마지막 숫자 192는 이진수 11000000이므로 앞 2비트가 네트워크 부분입니다. 앞의 24비트와 합쳐 26비트가 됩니다.',
   '3. 192.168.10.130/26의 마지막 숫자는 64개씩 끊습니다. 0~63, 64~127, 128~191, 192~255 중 130은 128~191에 들어갑니다. 이 마지막 숫자 방식은 여기처럼 /24~ /30인 예에 적용하며, 더 큰 구간에서는 앞쪽 숫자도 함께 계산합니다.',
   '4. 첫 주소 192.168.10.128은 네트워크 주소, 마지막 .191은 브로드캐스트 주소입니다. 일반 호스트는 .129~.190입니다. 비트로는 호스트 부분이 모두 0이면 네트워크, 모두 1이면 브로드캐스트입니다.',
   '5. 게이트웨이는 이 서브넷의 사용 가능한 호스트 주소 중 관리자가 배정합니다. 반드시 첫 번째나 마지막이어야 하는 규칙은 없습니다. .129를 게이트웨이로 쓰면 나머지 기기용은 61개입니다. 게이트웨이 별도 배정을 묻지 않는 일반 호스트 수 문제에서는 62개로 답합니다.',
   '6. /27은 32개 구간·30호스트, /28은 16개 구간·14호스트입니다. /24를 /26으로 나누면 네트워크 비트를 2개 더 쓰므로 4개 서브넷입니다. /31 점대점 링크는 두 주소를 끝점에 쓸 수 있고 /32는 단일 주소이므로 무조건 2를 빼지 않습니다.'],
  example:'192.168.10.130/26 → 64개 구간 → .128~.191 → 호스트 .129~.190, 62개. /27로 바꾸면 32개 구간 → .128~.159 → 호스트 .129~.158, 30개.',
  recall:'192.168.10.70/27의 네트워크 주소, 브로드캐스트 주소, 호스트 범위는? 게이트웨이를 .65로 쓰면 나머지 기기는 몇 대인가요?',
  answer:'32개 단위이므로 .64~.95 구간입니다. 네트워크는 192.168.10.64, 브로드캐스트는 .95, 호스트는 .65~.94로 30개입니다. 게이트웨이에 .65 하나를 배정하면 나머지 기기는 29대입니다.',
  sources:[['RFC 3021: /31 예외','https://www.rfc-editor.org/rfc/rfc3021.html']]},
 {...window.STUDY_CURRICULUM_V3.at(-1),concepts:[...window.STUDY_CURRICULUM_V3.at(-1).concepts,'ipv4','subnet'],steps:[...window.STUDY_CURRICULUM_V3.at(-1).steps,'IPv4는 사설 범위를 확인하고, 서브넷은 호스트 비트 → 구간 → 양 끝 주소 순서로 계산합니다.']}
];
window.BASIC_CURRICULUM = [
 {
  "id": "basic-files",
  "title": "파일·디렉터리: 위치·생성·복사·이동",
  "concepts": [
   "file-commands"
  ],
  "minutes": 5,
  "goal": "ls · cd · pwd · mkdir · rmdir · touch · cp · mv · rm",
  "story": "먼저 어떤 일을 하려는지 말하고 명령을 고르세요. 파일·디렉터리: 위치·생성·복사·이동에서 비슷한 명령의 차이를 연습합니다.",
  "steps": [
   "pwd는 현재 작업 디렉터리 경로, ls는 항목 목록을 출력합니다. ls -a는 숨김 항목도, ls -l은 권한·소유자 등을 자세히 보여줍니다.",
   "cd는 작업 디렉터리를 바꿉니다. cd ..는 상위 디렉터리, cd ~는 내 홈 디렉터리로 이동합니다.",
   "mkdir는 디렉터리 생성, mkdir -p는 필요한 상위 경로도 생성합니다. rmdir는 빈 디렉터리만 제거합니다.",
   "touch는 시간 정보를 갱신합니다. 파일이 없으면 기본적으로 빈 파일을 만들지만, 기존 파일 내용을 비우지는 않습니다.",
   "cp는 복사본을 만들고 mv는 이동하거나 이름을 바꿉니다. 디렉터리 복사는 cp -R로 하위 항목까지 처리합니다.",
   "rm은 파일 제거, rm -r은 디렉터리와 그 내용을 재귀적으로 제거합니다. 휴지통 이동 명령이 아니므로 학습용 파일을 대상으로 구분하세요."
  ],
  "example": "cp memo.txt copy.txt → 원본과 복사본이 남음. mv copy.txt final.txt → 이름이 바뀜.",
  "recall": "현재 경로 확인과 현재 항목 목록 확인은 각각? 기존 파일에 touch를 쓰면 내용이 지워지나요?",
  "answer": "경로는 pwd, 목록은 ls입니다. touch는 기존 내용을 비우지 않고 시간을 갱신합니다.",
  "sources": [
   [
    "GNU Coreutils",
    "https://www.gnu.org/software/coreutils/manual/coreutils.html"
   ],
   [
    "Bash cd",
    "https://www.gnu.org/software/bash/manual/bash.html"
   ]
  ]
 },
 {
  "id": "basic-text",
  "title": "파일 내용: 전체·앞·뒤·페이지",
  "concepts": [
   "text-commands"
  ],
  "minutes": 5,
  "goal": "cat · head · tail · more · less",
  "story": "먼저 어떤 일을 하려는지 말하고 명령을 고르세요. 파일 내용: 전체·앞·뒤·페이지에서 비슷한 명령의 차이를 연습합니다.",
  "steps": [
   "cat은 내용을 표준 출력으로 이어서 보여줍니다. 파일을 편집하거나 자동으로 페이지를 나누는 명령은 아닙니다.",
   "head -n 5는 앞 5줄, tail -n 5는 뒤 5줄입니다. 줄 수를 생략하면 기본적으로 10줄입니다.",
   "tail -f는 파일 끝에 새로 추가되는 내용을 계속 관찰합니다. 로그 관찰과 연결하세요.",
   "more와 less는 긴 텍스트를 페이지 단위로 보는 도구입니다. less는 앞뒤 이동과 검색에 편리하며 q로 나옵니다. more도 구현에 따라 뒤로 이동할 수 있으므로 무조건 한 방향이라고 외우지 마세요."
  ],
  "example": "로그 앞부분은 head -n 5 app.log, 최근 부분은 tail -n 5 app.log.",
  "recall": "긴 파일을 앞뒤로 살피려면? 계속 추가되는 로그를 보려면?",
  "answer": "less로 앞뒤를 살피고 tail -f로 추가되는 로그를 관찰합니다.",
  "sources": [
   [
    "GNU Coreutils",
    "https://www.gnu.org/software/coreutils/manual/coreutils.html"
   ],
   [
    "less 매뉴얼",
    "https://www.greenwoodsoftware.com/less/less.html"
   ]
  ]
 },
 {
  "id": "basic-rights",
  "title": "권한: 허가권과 소유권",
  "concepts": [
   "permissions",
   "ownership"
  ],
  "minutes": 5,
  "goal": "chmod · chown · chgrp",
  "story": "먼저 어떤 일을 하려는지 말하고 명령을 고르세요. 권한: 허가권과 소유권에서 비슷한 명령의 차이를 연습합니다.",
  "steps": [
   "chmod는 허가권을 바꿉니다. r=4, w=2, x=1을 더해서 소유자·그룹·기타 사용자 순서로 씁니다.",
   "chmod 640 memo.txt는 소유자 읽기·쓰기, 그룹 읽기, 기타 권한 없음입니다.",
   "chown alice:dev memo.txt는 소유자와 그룹을 바꿉니다. chgrp dev memo.txt는 그룹만 바꿉니다.",
   "파일의 쓰기 권한과 삭제 가능 여부는 다릅니다. 삭제는 부모 디렉터리의 쓰기·탐색 권한과 Sticky bit 등의 영향을 받습니다."
  ],
  "example": "허가권을 바꾸려면 chmod, 주인을 바꾸려면 chown, 그룹만 바꾸려면 chgrp.",
  "recall": "chown과 chmod 중 실행 권한을 추가하는 명령은?",
  "answer": "chmod입니다. chmod u+x script.sh는 소유자 실행 권한을 추가합니다.",
  "sources": [
   [
    "GNU Coreutils",
    "https://www.gnu.org/software/coreutils/manual/coreutils.html"
   ]
  ]
 },
 {
  "id": "basic-search",
  "title": "검색: 파일·내용·명령 위치",
  "concepts": [
   "search-commands"
  ],
  "minutes": 5,
  "goal": "find · grep · which · whereis",
  "story": "먼저 어떤 일을 하려는지 말하고 명령을 고르세요. 검색: 파일·내용·명령 위치에서 비슷한 명령의 차이를 연습합니다.",
  "steps": [
   "find는 지정한 경로 아래에서 이름·유형 등의 조건으로 파일을 찾습니다. 와일드카드는 따옴표로 감싸 셸의 조기 확장을 막습니다.",
   "grep은 파일 내용에서 패턴에 맞는 줄을 찾습니다. grep -n은 줄 번호, -i는 대소문자 무시입니다.",
   "which는 보통 PATH에서 실행 파일을 찾습니다. alias·함수·셸 내장 명령은 구현에 따라 다르므로 셸이 실제 해석하는 종류는 type으로 확인할 수 있습니다.",
   "whereis는 명령의 바이너리·소스·매뉴얼 위치를 알려줍니다. 디스크 전체의 모든 일반 파일을 찾는 도구가 아닙니다."
  ],
  "example": "find . -name '*.log' → 로그 파일 경로. grep -n ERROR app.log → ERROR가 있는 줄.",
  "recall": "파일 이름을 찾는 것과 파일 속 문장을 찾는 것은 각각?",
  "answer": "파일 조건 검색은 find, 내용 패턴 검색은 grep입니다.",
  "sources": [
   [
    "GNU find",
    "https://www.gnu.org/software/findutils/manual/html_mono/find.html"
   ],
   [
    "GNU grep",
    "https://www.gnu.org/software/grep/manual/grep.html"
   ],
   [
    "whereis",
    "https://man7.org/linux/man-pages/man1/whereis.1.html"
   ]
  ]
 },
 {
  "id": "basic-compression",
  "title": "압축: 묶기와 압축 해제",
  "concepts": [
   "tar",
   "compression"
  ],
  "minutes": 5,
  "goal": "tar · gzip · gunzip · zip · unzip",
  "story": "먼저 어떤 일을 하려는지 말하고 명령을 고르세요. 압축: 묶기와 압축 해제에서 비슷한 명령의 차이를 연습합니다.",
  "steps": [
   "tar는 파일을 묶거나 꺼냅니다. c는 생성, x는 추출, t는 목록, f 뒤에는 묶음 파일 이름입니다.",
   "gzip는 .gz 압축, gunzip는 gzip 압축 해제입니다. gzip -d도 해제이며 gzip -k는 원본을 유지합니다.",
   "tar -czf backup.tar.gz docs/는 tar 묶음과 gzip 압축을 함께 합니다. tar -xzf backup.tar.gz는 압축을 풀고 묶인 파일도 꺼냅니다.",
   "zip는 여러 파일을 ZIP 묶음으로 압축할 수 있고 unzip은 ZIP을 풉니다. zip -r backup.zip docs/는 디렉터리 아래까지 포함합니다."
  ],
  "example": "ZIP은 zip/unzip, GZIP은 gzip/gunzip으로 짝지으세요.",
  "recall": "gunzip으로 backup.zip을 풀면 되나요?",
  "answer": "아니요. ZIP은 unzip, gzip 형식의 .gz는 gunzip입니다.",
  "sources": [
   [
    "GNU tar",
    "https://www.gnu.org/software/tar/manual/tar.html"
   ],
   [
    "Info-ZIP",
    "https://infozip.sourceforge.net/"
   ]
  ]
 },
 {
  "id": "basic-disk",
  "title": "디스크: 공간 확인과 연결",
  "concepts": [
   "disk-usage",
   "mount"
  ],
  "minutes": 5,
  "goal": "df · du · mount · umount",
  "story": "먼저 어떤 일을 하려는지 말하고 명령을 고르세요. 디스크: 공간 확인과 연결에서 비슷한 명령의 차이를 연습합니다.",
  "steps": [
   "df -h는 파일 시스템별 전체·사용·여유 공간을 보여줍니다. du -sh 경로는 해당 파일·디렉터리의 디스크 사용량 합계를 보여줍니다.",
   "h는 사람이 읽기 쉬운 단위, du의 s는 합계입니다. 디스크가 찼으면 df로 확인하고 du로 큰 디렉터리를 찾는 흐름을 기억하세요.",
   "mount는 파일 시스템을 디렉터리 경로에 연결합니다. umount는 연결을 해제합니다. 철자는 unmount가 아니라 umount입니다.",
   "연결 해제는 포맷이나 파일 삭제와 다릅니다. 사용 중인 파일 시스템은 해제가 거부될 수 있습니다."
  ],
  "example": "mount /dev/sdb1 /mnt/data → 연결. umount /mnt/data → 해제. 장치 이름은 학습용 예시입니다.",
  "recall": "디스크 여유 공간과 /home의 사용량 합계는 각각?",
  "answer": "df -h로 파일 시스템 여유 공간을, du -sh /home으로 경로 사용량 합계를 봅니다.",
  "sources": [
   [
    "GNU Coreutils",
    "https://www.gnu.org/software/coreutils/manual/coreutils.html"
   ],
   [
    "mount",
    "https://man7.org/linux/man-pages/man8/mount.8.html"
   ]
  ]
 },
 {
  "id": "basic-process",
  "title": "프로세스: 조회·신호·작업 제어",
  "concepts": [
   "ps",
   "monitor",
   "signals",
   "job-control"
  ],
  "minutes": 5,
  "goal": "ps · top · kill · bg · fg · jobs",
  "story": "먼저 어떤 일을 하려는지 말하고 명령을 고르세요. 프로세스: 조회·신호·작업 제어에서 비슷한 명령의 차이를 연습합니다.",
  "steps": [
   "ps는 프로세스 목록을 한 시점에 보여주고 top은 사용량 등을 갱신해 보여줍니다.",
   "kill은 PID에 시그널을 보냅니다. 기본은 SIGTERM이며 kill -9는 SIGKILL입니다. kill이 항상 강제 종료를 뜻하지는 않습니다.",
   "jobs는 현재 셸의 작업 목록입니다. 시스템 전체 프로세스 목록인 ps와 구분하세요.",
   "작업 제어가 켜진 대화형 셸에서 Ctrl+Z는 보통 전경 작업을 정지시킵니다. bg %1은 작업 1을 뒤에서 재개, fg %1은 앞으로 가져옵니다.",
   "%1은 셸 작업 번호, 1234는 PID처럼 대상을 구분합니다. 백그라운드에서도 터미널 입력이 필요하면 다시 정지할 수 있습니다."
  ],
  "example": "jobs → [1] Stopped 확인 → bg %1로 뒤에서 재개 → fg %1로 앞에서 실행.",
  "recall": "전체 프로세스와 현재 셸 작업은 어떤 명령으로 구분하나요?",
  "answer": "전체 프로세스 목록은 ps, 현재 셸 작업은 jobs입니다. top은 자원 사용량 변화를 관찰합니다.",
  "sources": [
   [
    "Bash 작업 제어",
    "https://www.gnu.org/software/bash/manual/bash.html#Job-Control"
   ],
   [
    "ps",
    "https://man7.org/linux/man-pages/man1/ps.1.html"
   ]
  ]
 },
 {
  "id": "basic-users",
  "title": "사용자 관리: 계정·암호·전환",
  "concepts": [
   "user-commands"
  ],
  "minutes": 5,
  "goal": "useradd · userdel · passwd · su",
  "story": "먼저 어떤 일을 하려는지 말하고 명령을 고르세요. 사용자 관리: 계정·암호·전환에서 비슷한 명령의 차이를 연습합니다.",
  "steps": [
   "useradd는 계정 생성입니다. useradd -m alice는 홈 디렉터리도 생성합니다. 기본 동작은 배포판 설정에 따라 달라집니다.",
   "userdel은 계정 삭제이며 -r을 주면 홈 디렉터리와 메일 스풀도 제거합니다. 다른 위치의 소유 파일을 모두 자동 삭제하는 뜻은 아닙니다.",
   "passwd는 암호 변경 명령입니다. /etc/passwd는 계정 정보 파일이므로 명령과 파일 이름을 구분하세요.",
   "su는 사용자 전환입니다. su - alice는 로그인과 유사한 환경으로 전환합니다. 권한·인증이 필요할 수 있으며 새 계정을 만드는 명령은 아닙니다."
  ],
  "example": "계정 생성 useradd → 암호 설정 passwd → 사용자 전환 su → 계정 제거 userdel.",
  "recall": "su alice와 useradd alice는 무엇이 다른가요?",
  "answer": "su는 기존 사용자로 전환, useradd는 새 계정 생성입니다.",
  "sources": [
   [
    "useradd",
    "https://man7.org/linux/man-pages/man8/useradd.8.html"
   ],
   [
    "userdel",
    "https://man7.org/linux/man-pages/man8/userdel.8.html"
   ],
   [
    "su",
    "https://man7.org/linux/man-pages/man1/su.1.html"
   ]
  ]
 },
 {
  "id": "basic-system",
  "title": "시스템: 종료·시간·사용자 확인",
  "concepts": [
   "system-commands"
  ],
  "minutes": 5,
  "goal": "shutdown · reboot · date · who · whoami",
  "story": "먼저 어떤 일을 하려는지 말하고 명령을 고르세요. 시스템: 종료·시간·사용자 확인에서 비슷한 명령의 차이를 연습합니다.",
  "steps": [
   "shutdown은 시스템 종료·재시작을 예약하거나 요청합니다. systemd 환경에서 shutdown -h +10은 10분 뒤 종료 예약, shutdown -c는 예약 취소입니다.",
   "reboot는 재부팅 요청입니다. shutdown -r now도 즉시 재부팅 요청과 연결합니다. 명령을 외우는 예시이며 실행하면 사용 중인 작업에 영향을 줍니다.",
   "date는 현재 날짜·시간을 표시합니다. date +%F는 연-월-일 형식입니다.",
   "who는 로그인 세션 정보, whoami는 현재 유효 사용자 이름입니다. su로 전환하면 whoami 결과가 바뀔 수 있으며 who 목록과 같을 필요는 없습니다."
  ],
  "example": "date → 지금 시각. who → 로그인 세션. whoami → 현재 나는 누구 권한인가?",
  "recall": "who와 whoami 중 현재 유효 사용자 이름 하나를 알려주는 명령은?",
  "answer": "whoami입니다. who는 로그인 세션을 보여줍니다.",
  "sources": [
   [
    "GNU Coreutils",
    "https://www.gnu.org/software/coreutils/manual/coreutils.html"
   ],
   [
    "shutdown",
    "https://man7.org/linux/man-pages/man8/shutdown.8.html"
   ]
  ]
 },
 {
  "id": "mixed",
  "title": "기본 명령어 섞어서 확인",
  "minutes": 15,
  "concepts": [
   "file-commands",
   "text-commands",
   "permissions",
   "ownership",
   "search-commands",
   "tar",
   "compression",
   "disk-usage",
   "mount",
   "ps",
   "monitor",
   "signals",
   "job-control",
   "user-commands",
   "system-commands"
  ],
  "goal": "상황에 맞는 명령을 설명하고 고른다.",
  "story": "명령어를 보기 전에 해야 할 작업을 한 문장으로 말하세요.",
  "steps": [
   "파일 이름·내용·명령 위치 중 무엇을 찾는지 확인하세요.",
   "복사·이동·삭제, 권한·소유권, 남은 공간·경로 사용량을 구분하세요.",
   "현재 셸의 작업인지 시스템 프로세스인지, 계정 생성인지 사용자 전환인지 확인하세요."
  ],
  "example": "디스크에 남은 공간 → df. 큰 폴더 찾기 → du. 현재 유효 사용자 → whoami.",
  "recall": "오늘 헷갈린 두 명령의 차이를 설명할 수 있나요?",
  "answer": "막힌 명령은 오답·헷갈림으로 표시하고 다음 복습에서 다시 확인하세요."
 }
];
window.RECALL_CURRICULUM = [
 {
  "id": "recall-fields",
  "title": "출력 읽기: ls -l과 s·t 위치",
  "minutes": 6,
  "concepts": [
   "file-commands",
   "special-mode"
  ],
  "questionIds": [
   "recall-001",
   "recall-002",
   "recall-003",
   "recall-004"
  ],
  "goal": "명령 실행 조건을 읽고 결과의 이유를 설명한다.",
  "story": "개인 복기를 바탕으로 보완한 유형 연습입니다. 실제 시험 원문·정답을 복원한 자료는 아닙니다.",
  "steps": [
   "ls -l의 순서는 종류·권한, 링크 수, 소유자, 그룹, 크기, 수정 시각, 이름입니다. 일반 파일의 크기는 바이트 단위입니다.",
   "소유자 실행 위치 s는 Set-UID, 그룹 실행 위치 s는 Set-GID입니다. 기타 사용자 실행 위치 t는 Sticky bit입니다.",
   "대문자 S/T는 해당 위치의 실행 비트가 없다는 뜻입니다. 글자만 보지 말고 위치까지 읽으세요."
  ],
  "example": "-rwsr-xr-x → 소유자 위치 s → Set-UID. -rwxr-sr-x → 그룹 위치 s → Set-GID.",
  "recall": "-rwsr-xr-x의 s를 Sticky bit로 고르면 왜 틀릴까요?",
  "answer": "Sticky bit는 기타 사용자 실행 위치의 t/T이며, 이 s는 소유자 위치의 Set-UID입니다.",
  "sources": [
   [
    "Bash 실행 환경",
    "https://www.gnu.org/software/bash/manual/html_node/Command-Execution-Environment.html"
   ]
  ]
 },
 {
  "id": "recall-shell",
  "title": "실행 결과: 변수·export·따옴표·unalias",
  "minutes": 12,
  "concepts": [
   "variables",
   "alias"
  ],
  "questionIds": [
   "recall-005",
   "recall-006",
   "recall-007",
   "recall-008",
   "recall-009",
   "recall-010",
   "recall-011",
   "recall-012"
  ],
  "goal": "명령 실행 조건을 읽고 결과의 이유를 설명한다.",
  "story": "개인 복기를 바탕으로 보완한 유형 연습입니다. 실제 시험 원문·정답을 복원한 자료는 아닙니다.",
  "steps": [
   "환경변수는 시스템 전체에 자동 적용되는 값이 아닙니다. 프로세스가 가진 환경을 새 자식 프로세스에 전달합니다.",
   "일반 Bash 변수에 export 속성을 주면 자식 실행 환경에 포함됩니다. 자식이 값을 바꿔도 부모 셸에는 되돌아오지 않습니다.",
   "작은따옴표는 변수 확장을 막습니다. 큰따옴표 안에서는 $변수가 확장됩니다. 명령 문자열을 어느 셸이 해석하는지 확인하세요.",
   "인자 없는 set은 Bash 변수·함수, env는 환경을 표시합니다. echo \"$PATH\"는 PATH 값 출력입니다.",
   "unalias 뒤에는 별칭 이름을 씁니다. unalias -a는 현재 셸의 모든 별칭 해제이며 시작 파일의 정의를 지우지는 않습니다."
  ],
  "example": "LM_RECALL=linux; echo '$LM_RECALL' → 글자 그대로. echo \"$LM_RECALL\" → linux.",
  "recall": "export한 변수를 자식 셸이 바꾸면 부모 값도 바뀌나요?",
  "answer": "아니요. 부모와 자식은 각각 환경을 가지며 자식의 변경이 부모로 역전파되지 않습니다.",
  "sources": [
   [
    "Bash 실행 환경",
    "https://www.gnu.org/software/bash/manual/html_node/Command-Execution-Environment.html"
   ]
  ]
 },
 {
  "id": "recall-runtime",
  "title": "실행 주체: 자식 셸·source·systemd",
  "minutes": 6,
  "concepts": [
   "shell-family",
   "boot-target"
  ],
  "questionIds": [
   "recall-013",
   "recall-014",
   "recall-015",
   "recall-016"
  ],
  "goal": "명령 실행 조건을 읽고 결과의 이유를 설명한다.",
  "story": "개인 복기를 바탕으로 보완한 유형 연습입니다. 실제 시험 원문·정답을 복원한 자료는 아닙니다.",
  "steps": [
   "bash f.sh는 자식 Bash에서 실행하고 source ./f.sh는 현재 셸에서 실행합니다. 그래서 변수 변경 결과가 다릅니다.",
   "Bash에서 sh -c를 실행해도 문자열은 실행된 sh가 해석합니다. /bin/sh 구현과 사용 가능한 문법은 환경에 따라 다릅니다.",
   "Rocky Linux의 최초 정식 버전은 8.4입니다. Rocky Linux 7이라는 개인 복기 표기는 잘못되었으며 어떤 배포판을 뜻했는지는 원문 문제 없이는 확정하지 않습니다.",
   "Rocky Linux 8/9의 systemd·systemctl과 기본 부팅 타깃을 구분하세요. set-default는 기본값 설정이며 즉시 상태 전환은 아닙니다."
  ],
  "example": "변수 변경이 현재 셸에 남는가? source인지 새 셸 실행인지 먼저 확인하세요.",
  "recall": "부모가 Bash이면 sh -c 안의 문법도 반드시 Bash 문법인가요?",
  "answer": "아니요. 호출한 sh가 해석하므로 해당 구현의 문법을 기준으로 봐야 합니다.",
  "sources": [
   [
    "Bash 실행 환경",
    "https://www.gnu.org/software/bash/manual/html_node/Command-Execution-Environment.html"
   ]
  ]
 },
 {
  "id": "mixed",
  "title": "복기 유형 섞어서 재확인",
  "minutes": 6,
  "concepts": [
   "file-commands",
   "special-mode",
   "variables",
   "alias",
   "shell-family",
   "boot-target"
  ],
  "goal": "익숙한 키워드를 실행 조건과 연결한다.",
  "story": "보기 번호보다 조건과 결과의 관계를 설명하세요.",
  "steps": [
   "권한 글자의 위치, 변수의 export 여부, 따옴표, 실행하는 셸을 차례로 확인합니다."
  ],
  "example": "같은 변수 이름이어도 부모·자식에 따라 값이 다를 수 있습니다.",
  "recall": "왜 그 결과인지 한 문장으로 설명할 수 있나요?",
  "answer": "이유가 막히면 헷갈림으로 표시하고 다시 풀어 보세요."
 }
];
window.RECALL_CURRICULUM_V1 = window.RECALL_CURRICULUM;
window.RECALL_CURRICULUM = [
 window.RECALL_CURRICULUM_V1[0],
 {...window.RECALL_CURRICULUM_V1[1],questionIds:[...window.RECALL_CURRICULUM_V1[1].questionIds,'recall-027','recall-028']},
 window.RECALL_CURRICULUM_V1[2],
 {id:'recall-disk',title:'디스크: df·du·연결 해제·XFS 점검',minutes:6,concepts:['disk-usage','mount','fsck'],questionIds:['recall-017','recall-018','recall-019','recall-020','recall-021','recall-022','recall-023'],
 goal:'공간 조회·마운트·점검을 서로 다른 작업으로 구분한다.',story:'복기에 나온 디스크 관련 단서를 한 흐름으로 묶습니다. 해제와 복구를 같은 작업으로 외우지 마세요.',steps:['df는 파일 시스템의 공간, du는 경로가 차지한 공간입니다.','mount는 연결, umount는 연결 해제입니다. unmount가 아닙니다.','XFS의 일반적인 오프라인 복구에는 xfs_repair를 사용하며 마운트를 해제해야 합니다. -n은 수정 없이 점검합니다.'],example:'df -h로 공간 확인 → du -sh /data로 경로 사용량 확인. 오류 점검·복구는 별도 작업입니다.',recall:'umount와 xfs_repair는 무엇이 다른가요?',answer:'umount는 연결 해제, xfs_repair는 XFS 점검·복구입니다.'},
 {id:'recall-jobs',title:'작업 제어: &·bg·fg·jobs',minutes:4,concepts:['job-control'],questionIds:['recall-024','recall-025','recall-026'],goal:'실행 상태와 셸 작업 번호를 읽는다.',story:'먼저 실행할 때 뒤로 보낼지, 정지된 작업을 재개할지, 앞으로 가져올지 구분하세요.',steps:['명령 끝의 &는 백그라운드 실행을 요청합니다.','정지된 작업은 bg %번호로 뒤에서 재개하고 fg %번호로 앞으로 가져옵니다.','jobs의 작업 번호, 프로세스 PID, sleep의 시간 인자는 서로 다릅니다.'],example:'[2] Stopped sleep 100 → bg %2. 앞에서 실행하려면 fg %2.',recall:'sleep 100의 100을 bg 뒤에 붙여야 하나요?',answer:'아니요. sleep의 시간 인자와 jobs에서 확인한 작업 번호를 구분하세요.'},
 {...window.RECALL_CURRICULUM_V1.at(-1),concepts:[...window.RECALL_CURRICULUM_V1.at(-1).concepts,'disk-usage','mount','fsck','job-control']}
];
// Keep saved lesson indices stable; only newly started main courses use v5.
window.STUDY_CURRICULUM_V4 = window.STUDY_CURRICULUM;
{
 const concepts=window.CONCEPT_NOTES.concepts;
 const byConcept=new Map(concepts.map(c=>[c.id,c]));
 const nonPast=ids=>ids.flatMap(id=>byConcept.get(id).questionIds.filter(q=>!q.startsWith('past-')));
 const original=window.STUDY_CURRICULUM_V4.slice(0,-1).map(u=>({...u,questionIds:nonPast(u.concepts)}));
 const covered=new Set(original.flatMap(u=>u.concepts));
 const extra=concepts.filter(c=>!covered.has(c.id)).map(c=>({
  id:'extended-'+c.id,title:c.title,concepts:[c.id],
  minutes:Math.max(4,nonPast([c.id]).length+1),questionCount:3,questionIds:nonPast([c.id]),
  goal:'사용 상황과 판단 이유를 예제로 설명한다.',
  story:c.summary,steps:[c.pitfall,...c.comparison.map(([name,meaning])=>name+' → '+meaning)],
  example:c.example,recall:c.title+'의 핵심과 헷갈리기 쉬운 차이를 설명해 보세요.',
  answer:c.summary+' '+c.pitfall
 }));
 const mixed={...window.STUDY_CURRICULUM_V4.at(-1),minutes:100,concepts:concepts.map(c=>c.id),
  goal:'100개 개념을 섞어 배운 원리를 다시 적용한다.',
  story:'순서와 보기 위치가 달라져도 판단 이유를 설명해 보세요. 개념마다 최대 두 문제로 확인합니다.',
  steps:['명령어 이름보다 목적·대상·옵션을 먼저 구분합니다.','같은 개념도 조건이 달라지면 답이 어떻게 달라지는지 확인합니다.','헷갈린 문제는 표시하고 해설과 예제로 돌아가세요.'],
  example:'fstab의 -t에 해당하는 항목은 파일시스템 종류, -o에 해당하는 항목은 마운트 옵션입니다.'};
 window.STUDY_CURRICULUM=[...original,...extra,mixed];
}
const CURRENT_COURSE_VERSION=5;
function courseUnits(session){
 if(session?.focus?.courseTrack==='recall')return session.focus.recallVersion===2?window.RECALL_CURRICULUM:window.RECALL_CURRICULUM_V1;
 if(session?.focus?.courseTrack==='basic')return window.BASIC_CURRICULUM;
 if(!session?.focus?.course)return window.STUDY_CURRICULUM;
 if(session.focus.courseVersion===5)return window.STUDY_CURRICULUM;
 if(session.focus.courseVersion===4)return window.STUDY_CURRICULUM_V4;
 if(session.focus.courseVersion===3)return window.STUDY_CURRICULUM_V3;
 if(session.focus.courseVersion===2)return window.STUDY_CURRICULUM_V2;
 return window.LEGACY_STUDY_CURRICULUM;
}
function courseMinutes(units=courseUnits()){return units.reduce((n,u)=>n+u.minutes,0);}
function coursePool(unit){return unit.concepts.flatMap(id=>conceptQuestions(CONCEPTS.find(c=>c.id===id)));}
function courseItems(units=courseUnits()){
  const seen=new Set();
  return units.flatMap((unit,lesson)=>{
    // Interleave concepts and reserve other questions for mixed review where possible.
    const pools=unit.concepts.map(id=>ranked(conceptQuestions(CONCEPTS.find(c=>c.id===id))).sort((a,b)=>(unit.id==='xfs'?Number(/xfs/i.test(b.prompt))-Number(/xfs/i.test(a.prompt)):0)||Number(seen.has(a.id))-Number(seen.has(b.id))));
    const picked=(unit.questionIds||[]).map(id=>BY_ID[id]);picked.forEach(q=>seen.add(q.id));
    pools.forEach((p,i)=>{const available=p.filter(q=>!picked.some(it=>it.id===q.id));pools[i]=unit.id==='mixed'?available.slice(0,2):available;});
    const target=unit.id==='mixed'?unit.concepts.length*2:Math.max(unit.questionCount||6,picked.length);
    for(let n=0;picked.length<target&&pools.some(p=>p.length);n++){
      const p=pools[n%pools.length];if(p.length){const q=p.shift();picked.push(q);seen.add(q.id);}
    }
    return (unit.id==='mixed'?shuffle(picked):picked).map(q=>({...focusItem(q),retry:false,lesson}));
  });
}
function startCurriculum(restart=false){
  if(!restart&&activeSession()&&state.session.focus?.course&&!state.session.focus.courseTrack){go('session');return;}
  if(activeSession()&&!confirm('맞춤 코스를 시작하면 진행 중인 문제 세트가 바뀝니다. 이미 채점한 기록은 유지됩니다. 시작할까요?'))return;
  recoverLastArchive();
  state.session={syncId:cryptoId(),mode:'practice',label:`맞춤 ${courseMinutes()}분 · 개념 이해 코스`,examDate:null,started:Date.now(),deadline:Date.now()+courseMinutes()*MINUTE,index:0,items:courseItems(),finished:false,applied:{},courseRead:{},focus:{course:true,courseVersion:CURRENT_COURSE_VERSION,conceptIds:courseUnits().at(-1).concepts}};
  save();go('session');
}
function startBasicCurriculum(track='basic',restart=false){
 const isRecall=track==='recall';
 if(!restart&&activeSession()&&state.session.focus?.courseTrack===track){go('session');return;}
 if(activeSession()&&!confirm('이 코스를 시작하면 진행 중인 문제 세트가 바뀝니다. 이미 채점한 기록은 유지됩니다. 시작할까요?'))return;
 recoverLastArchive();const units=isRecall?window.RECALL_CURRICULUM:window.BASIC_CURRICULUM;
 state.session={syncId:cryptoId(),mode:'practice',label:isRecall?'복기 유형 재구성 40분 코스':'기본 명령어 60분 코스',examDate:null,started:Date.now(),deadline:Date.now()+courseMinutes(units)*MINUTE,index:0,items:courseItems(units),finished:false,applied:{},courseRead:{},focus:{course:true,courseVersion:4,courseTrack:track,...(isRecall?{recallVersion:2}:{}),conceptIds:units.at(-1).concepts}};
 save();go('session');
}
function recallCourseCard(){return `<section class="panel"><h2>복기 유형 재구성 40분 코스</h2><p>ls -l·특수 권한 → 변수·별칭 → 셸 실행·systemd → 디스크·XFS → 작업 제어 → 종합 복습</p><p>복기에서 재구성한 28문항을 모두 포함하며 관련 문제와 종합 복습까지 기본 55문항입니다. 출제 단서는 사용자 제공 2601회 개인 복기이며, 각 해설에 새로 구성한 조건과 보기를 표시합니다. 실제 시험 원문·문항 번호·A/B형 보기 순서는 확인되지 않았습니다.</p>${button(activeSession()&&state.session.focus?.courseTrack==='recall'?'복기 유형 코스 이어서':'복기 유형 재구성 코스 시작','start-recall-curriculum')}${activeSession()&&state.session.focus?.courseTrack==='recall'&&state.session.focus.recallVersion!==2?button('28문항 포함 새 코스 시작','restart-recall-curriculum','','secondary'):''}<details><summary>복기 정보의 한계와 정정 내용</summary><p>환경변수는 시스템 전체 공유값이 아니라 자식 실행 환경에 전달됩니다. -rwsr-xr-x의 s는 소유자 위치의 Set-UID입니다. Rocky Linux 7이라는 표기는 잘못되어 8/9 기준으로 보완했습니다. 모호한 셸·XFS 문장은 조건을 명시한 확장 문제로 만들었으며 실제 출제 문장이라고 단정하지 않습니다.</p></details></section>`;}
function basicCourseCard(){
 return `<section class="panel"><h2>기본 명령어 60분 코스</h2><p>파일·디렉터리 → 파일 내용 → 권한 → 검색 → 압축 → 디스크 → 프로세스 → 사용자 → 시스템 → 종합 복습</p><p>9개 분야를 5분씩 이해하고 15분 동안 섞어서 확인합니다. 상황 예제와 자체 제작 문제·관련 기출로 연습합니다.</p><details><summary>배우는 명령어 전체 보기</summary>${window.BASIC_CURRICULUM.slice(0,-1).map(u=>`<p><strong>${esc(u.title)}</strong><br>${esc(u.goal)}</p>`).join('')}</details><p>${button(activeSession()&&state.session.focus?.courseTrack==='basic'?'기본 명령어 코스 이어서':'기본 명령어 코스 시작','start-basic-curriculum')}</p><p class="small">학습 범위 참고: <a href="https://programjy.tistory.com/entry/리눅스마스터2급2차정리" target="_blank" rel="noopener noreferrer">사용자 제공 정리 글</a> · 설명과 추가 문제는 별도 작성했으며 각 단계에 매뉴얼을 연결했습니다.</p></section>`;
}
function curriculumPage(){
  main.innerHTML=heading('이해하고 반복하는 맞춤 코스',`기존 집중 단계에 핵심노트 100개 개념을 모두 연결했습니다. 기출 외 연습문제 231개와 관련 기출을 함께 풉니다. 전체 권장 ${courseMinutes()}분입니다.`)+recallCourseCard()+basicCourseCard()+`<div class="callout"><h2>읽기 → 떠올리기 → 한 문제씩 확인</h2><p>각 단계의 쉬운 설명을 읽고, 답을 가린 질문에 스스로 설명한 뒤 문제를 풉니다. 보기를 고르면 즉시 해설이 나오고, 오답·헷갈림은 같은 단계에서 최대 두 번 추가로 연습합니다. 마지막에는 다른 문제를 우선해 섞습니다.</p><p>전체 코스는 ${courseUnits().length}단계입니다. 추가 개념은 짧은 단계로 나누었으며 여러 번에 나눠 학습할 수 있습니다. 기본 시간은 ${courseMinutes()}분이며 필요하면 10분씩 연장할 수 있습니다. 시간이 끝나면 채점한 내용까지 저장합니다. 화면을 떠나도 시간은 계속 흐릅니다. 아래 시간은 권장 분량이며 단계는 문제를 풀면서 넘어갑니다.</p>${button(activeSession()&&state.session.focus?.course&&!state.session.focus.courseTrack?'맞춤 코스 이어서':'맞춤 코스 시작','start-curriculum')}${activeSession()&&state.session.focus?.course&&!state.session.focus.courseTrack&&state.session.focus.courseVersion!==CURRENT_COURSE_VERSION?`<p>진행 중인 이전 코스는 그대로 이어집니다. 새 단계를 포함하려면 확장 코스를 시작하세요. 이미 채점한 학습 기록은 유지됩니다.</p>${button('100개 개념 확장 코스 새로 시작','restart-curriculum','','secondary')}`:''}</div><div class="topic-grid">${courseUnits().map((u,i)=>`<article class="panel"><span class="pill outline">${i+1}단계 · ${u.minutes}분</span><h2>${esc(u.title)}</h2><p>${esc(u.goal)}</p></article>`).join('')}</div><section class="panel"><h2>반복 계획</h2><p>한 번에 전부 끝내기보다 몇 단계씩 학습하세요. 다음 학습 때 저장된 위치에서 이어가고, 시간이 끝났다면 10분 연장을 미리 사용하세요. 완료 후에는 오답·복습 메뉴에서 어려웠던 개념을 다시 확인합니다.</p><p>이미 읽고 채점한 위치는 자동 저장됩니다. 코스를 다시 시작하면 보기 순서가 바뀌며, 기존 풀이 기록도 남습니다.</p></section>`;
}
function courseIntro(){
  const s=state.session,it=s.items[s.index],u=courseUnits(s)[it.lesson];
  main.innerHTML=heading(`${it.lesson+1}단계 · ${u.title}`,u.goal)+`<section class="panel course-intro"><span class="pill outline">권장 ${u.minutes}분 · 설명부터 이해하기</span><p>${esc(u.story)}</p><ol>${u.steps.map(t=>`<li>${esc(t)}</li>`).join('')}</ol><div class="memory"><strong>상황에 적용</strong><p>${esc(u.example)}</p></div><h3>설명을 가리고 말해 보세요</h3><p>${esc(u.recall)}</p><details><summary>생각한 뒤 답 확인</summary><p>${esc(u.answer)}</p></details><p>${button('이해했어요 · 문제 풀기','course-ready')}</p><p class="small muted">다음 문제를 눌러야 진행합니다. 맞혔어도 헷갈리면 해설 아래에서 표시할 수 있습니다.</p>${u.sources?`<p class="small">참고: ${u.sources.map(([title,url])=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(title)}</a>`).join(' · ')}</p>`:''}${timerControls()}<a href="#curriculum">코스 순서 보기</a></section>`;
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
  const units=courseUnits(s),mixedLesson=units.findIndex(u=>u.id==='mixed');
  const rows=units[mixedLesson].concepts.map(id=>{
    const c=CONCEPTS.find(c=>c.id===id),items=s.items.filter(i=>i.checked&&c.questionIds.includes(i.id));
    const mixed=items.filter(i=>i.lesson===mixedLesson),correct=mixed.filter(i=>isCorrect(BY_ID[i.id],i.selected)&&!i.unsure);
    const ok=new Set(correct.map(i=>i.id)).size>=2&&mixed.every(i=>isCorrect(BY_ID[i.id],i.selected)&&!i.unsure);
    return `<tr><th scope="row">${esc(c.title)}</th><td>${items.length}회</td><td>${!mixed.length?'종합 확인 전':c.questionIds.length<2?'문항 부족 · 개념 재확인':ok?'이번 종합 확인 통과':'다시 복습'}</td></tr>`;
  });
  return `<section class="panel"><h2>개념별 다음 복습</h2><p>종합 복습에서 서로 다른 2문제를 헷갈림 없이 맞혔는지 확인합니다. 오답이 남으면 다시 복습으로 표시합니다. 오늘의 확인 결과이며 장기 암기 완료 판정은 아닙니다.</p><table class="concept-table"><thead><tr><th>개념</th><th>풀이</th><th>다음 단계</th></tr></thead><tbody>${rows.join('')}</tbody></table><a class="btn secondary" href="#curriculum">코스 순서 · 반복 계획</a></section>`;
}
