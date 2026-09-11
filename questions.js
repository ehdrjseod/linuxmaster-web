window.QUESTION_BANK = {
  "version": 1,
  "source": "[꿈꾸는라이언] 리눅스마스터 2급 2차.pdf",
  "topics": [
    {
      "id": "files",
      "name": "파일 시스템",
      "subtitle": "권한 · 디스크 · 쿼터",
      "pages": "05–06",
      "subject": 1
    },
    {
      "id": "shell",
      "name": "셸",
      "subtitle": "변수 · 환경 설정 · 히스토리",
      "pages": "07–08",
      "subject": 1
    },
    {
      "id": "process",
      "name": "프로세스",
      "subtitle": "시그널 · 우선순위 · cron",
      "pages": "09–10",
      "subject": 1
    },
    {
      "id": "editor",
      "name": "에디터",
      "subtitle": "vi · 치환 · 편집기 비교",
      "pages": "11–12",
      "subject": 1
    },
    {
      "id": "package",
      "name": "소프트웨어 관리",
      "subtitle": "RPM · APT · 압축 · 컴파일",
      "pages": "13–14",
      "subject": 1
    },
    {
      "id": "device",
      "name": "장치 설정",
      "subtitle": "프린터 · RAID · LVM",
      "pages": "15",
      "subject": 1
    },
    {
      "id": "xwindow",
      "name": "X 윈도",
      "subtitle": "서버와 클라이언트 · 응용 프로그램",
      "pages": "16–17",
      "subject": 2
    },
    {
      "id": "network",
      "name": "인터넷 활용",
      "subtitle": "OSI · 포트 · 서브넷 · 명령어",
      "pages": "18–21",
      "subject": 2
    },
    {
      "id": "application",
      "name": "응용 분야",
      "subtitle": "가상화 · 클라우드 · IoT",
      "pages": "22–23",
      "subject": 2
    }
  ],
  "questions": [
    {
      "id": "q001",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "공유 디렉터리에서 다른 사용자가 만든 파일의 삭제를 제한하려 한다. 필요한 특수 권한은?",
      "options": [
        "Sticky bit",
        "SetUID",
        "SetGID",
        "umask 000"
      ],
      "answer": 0,
      "explanation": "Sticky bit는 디렉터리 안의 파일 삭제·이름 변경을 소유자 등으로 제한한다. SetUID는 실행 시 유효 사용자, SetGID는 실행 그룹 또는 디렉터리의 그룹 상속에 관여한다.",
      "memory": "특수 권한: UID 4 · GID 2 · Sticky 1",
      "kind": "개념"
    },
    {
      "id": "q002",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "팀 디렉터리에서 새 파일이 부모 디렉터리의 그룹을 상속하게 하려면?",
      "options": [
        "chmod g+s team",
        "chmod u+s team",
        "chmod o+x team",
        "chmod g-w team"
      ],
      "answer": 0,
      "explanation": "디렉터리의 SetGID가 새 항목의 그룹 상속을 담당한다. u+s는 사용자 ID 관련 비트이며 o+x는 기타 사용자의 접근 권한이다.",
      "memory": "디렉터리 그룹 상속 = g+s",
      "kind": "개념"
    },
    {
      "id": "q003",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "실행 파일 권한이 -rwSr-xr-x이다. 대문자 S의 의미는?",
      "options": [
        "SetUID는 있지만 소유자의 실행 비트는 없다",
        "SetUID와 소유자 실행 비트가 모두 있다",
        "SetGID만 있다",
        "Sticky bit만 있다"
      ],
      "answer": 0,
      "explanation": "소유자 실행 위치의 S는 SetUID 설정, 소유자 실행 비트 해제를 뜻한다. 둘 다 있으면 소문자 s이다. 그룹 위치의 s/S는 SetGID, 기타 위치의 t/T는 Sticky bit이다.",
      "memory": "대문자 S/T = 해당 실행 비트 없음",
      "kind": "개념"
    },
    {
      "id": "q004",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "project 아래 모든 파일의 소유자를 kim, 그룹을 dev로 바꾸는 명령은?",
      "options": [
        "chown -R kim:dev project",
        "chmod -R kim:dev project",
        "chgrp -R kim:dev project",
        "chown -h kim project"
      ],
      "answer": 0,
      "explanation": "chown은 소유자와 그룹을 함께 바꿀 수 있고 -R은 하위 항목에 재귀 적용한다. chmod는 권한, chgrp는 그룹만 바꾸며 -h는 심볼릭 링크 자체를 대상으로 한다.",
      "memory": "소유자 chown · 그룹 chgrp · 권한 chmod",
      "kind": "개념"
    },
    {
      "id": "q005",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "심볼릭 링크가 가리키는 대상 대신 링크 자체의 소유권을 바꾸는 chown 옵션은?",
      "options": [
        "-h",
        "-R",
        "-r",
        "-x"
      ],
      "answer": 0,
      "explanation": "-h는 링크를 따라가지 않고 링크 자체에 적용한다. -R은 디렉터리 하위로 재귀 적용하는 옵션이다.",
      "memory": "링크 자체는 chown -h",
      "kind": "개념"
    },
    {
      "id": "q006",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "쿼터에서 파일 개수 제한과 관련된 자원은?",
      "options": [
        "inode",
        "block",
        "PID",
        "포트"
      ],
      "answer": 0,
      "explanation": "inode 쿼터는 생성 가능한 파일 수, block 쿼터는 사용하는 저장 공간을 제한한다. PID와 포트는 디스크 쿼터 항목이 아니다.",
      "memory": "inode = 개수 / block = 용량",
      "kind": "개념"
    },
    {
      "id": "q007",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "편집기를 열어 사용자별 디스크 쿼터를 수정하는 명령은?",
      "options": [
        "edquota",
        "repquota",
        "quotaon",
        "quotacheck"
      ],
      "answer": 0,
      "explanation": "edquota는 쿼터 편집, repquota는 현황 보고, quotaon은 기능 활성화, quotacheck는 사용량 검사와 기록 갱신을 담당한다.",
      "memory": "edit → edquota / report → repquota",
      "kind": "개념"
    },
    {
      "id": "q008",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "쿼터 한도를 넘는 순간 추가 할당이 거부되는 제한은?",
      "options": [
        "hard limit",
        "soft limit의 유예기간",
        "로그인 제한",
        "nice 값"
      ],
      "answer": 0,
      "explanation": "hard limit는 절대 한도이다. soft limit는 유예기간 동안 초과할 수 있지만 유예기간이 지나면 제한된다.",
      "memory": "soft는 유예 / hard는 즉시",
      "kind": "개념"
    },
    {
      "id": "q009",
      "topic": "files",
      "page": 6,
      "red": true,
      "prompt": "부팅할 때 자동으로 마운트할 파일 시스템과 옵션을 적는 파일은?",
      "options": [
        "/etc/fstab",
        "/etc/mtab",
        "/proc/partitions",
        "/etc/passwd"
      ],
      "answer": 0,
      "explanation": "fstab은 정적 마운트 설정이다. mtab은 현재 마운트 상태, /proc/partitions는 파티션 정보, passwd는 사용자 계정 정보이다.",
      "memory": "fstab = 부팅 때 참고하는 연결표",
      "kind": "개념"
    },
    {
      "id": "q010",
      "topic": "files",
      "page": 6,
      "red": true,
      "prompt": "파일 시스템별 전체 용량과 남은 용량을 사람이 읽기 쉬운 단위로 보려면?",
      "options": [
        "df -h",
        "du -sh",
        "ls -l",
        "blkid"
      ],
      "answer": 0,
      "explanation": "df는 파일 시스템 단위의 용량을 보여준다. du -sh는 지정 디렉터리나 현재 디렉터리가 차지하는 공간의 합계를 보여준다. blkid는 UUID와 타입을 조회한다.",
      "memory": "df = 남은 공간 / du = 사용한 공간",
      "kind": "개념"
    },
    {
      "id": "q011",
      "topic": "files",
      "page": 6,
      "red": true,
      "prompt": "윈도우와 리눅스 사이에서 SMB 기반 파일 공유를 제공하는 소프트웨어는?",
      "options": [
        "Samba",
        "ext3",
        "XFS",
        "UDF"
      ],
      "answer": 0,
      "explanation": "Samba는 SMB 프로토콜을 구현해 파일·프린터 공유를 제공한다. ext3와 XFS는 디스크 파일 시스템, UDF는 광디스크 등에 쓰이는 파일 시스템이다.",
      "memory": "SMB 공유를 구현하는 서비스 = Samba",
      "kind": "개념"
    },
    {
      "id": "q012",
      "topic": "files",
      "page": 6,
      "red": false,
      "prompt": "/etc/fstab의 여섯 번째 필드는 무엇을 지정하는가?",
      "options": [
        "부팅 시 fsck 검사 순서",
        "dump 백업 여부",
        "마운트 위치",
        "파일 시스템 종류"
      ],
      "answer": 0,
      "explanation": "여섯 번째 pass 필드는 검사 순서이다. 0은 검사 안 함, 1은 보통 루트, 2는 기타 검사 대상이다. 다섯 번째가 dump 백업 필드이다.",
      "memory": "fstab 마지막 두 칸: dump → fsck",
      "kind": "개념"
    },
    {
      "id": "q013",
      "topic": "files",
      "page": 6,
      "red": false,
      "prompt": "이미 마운트한 /data를 읽기 전용으로 다시 설정하는 명령은?",
      "options": [
        "mount -o remount,ro /data",
        "mount -t ro /data",
        "umount -o ro /data",
        "mkfs -t ro /data"
      ],
      "answer": 0,
      "explanation": "마운트 옵션은 -o로 전달하고 remount로 기존 연결의 옵션을 바꾼다. -t는 파일 시스템 종류 지정이며 mkfs는 파일 시스템 생성 명령이다.",
      "memory": "타입 -t / 옵션 -o / 다시 remount",
      "kind": "개념"
    },
    {
      "id": "q014",
      "topic": "files",
      "page": 6,
      "red": false,
      "prompt": "저널링이 없는 ext 계열 파일 시스템은?",
      "options": [
        "ext2",
        "ext3",
        "ext4",
        "저널을 사용하는 ext3"
      ],
      "answer": 0,
      "explanation": "ext2에는 저널링이 없고 ext3는 ext2 계열에 저널링을 추가했다. 저널링은 장애 복구 시간을 줄이는 데 도움을 준다.",
      "memory": "ext2 → ext3: 저널링 추가",
      "kind": "개념"
    },
    {
      "id": "q015",
      "topic": "files",
      "page": 6,
      "red": false,
      "prompt": "파티션의 UUID와 파일 시스템 종류를 조회하는 명령은?",
      "options": [
        "blkid",
        "edquota",
        "chsh",
        "pstree"
      ],
      "answer": 0,
      "explanation": "blkid는 블록 장치의 UUID·타입을 보여준다. edquota는 쿼터 편집, chsh는 로그인 셸 변경, pstree는 프로세스 계층 조회이다.",
      "memory": "blkid = 블록 장치 식별 정보",
      "kind": "개념"
    },
    {
      "id": "q016",
      "topic": "shell",
      "page": 7,
      "red": true,
      "prompt": "Bash에서 자식 프로세스에도 전달할 환경변수를 설정하는 문법은?",
      "options": [
        "export COURSE=linux",
        "COURSE = linux",
        "unset COURSE",
        "readonly"
      ],
      "answer": 0,
      "explanation": "변수 대입의 = 양쪽에는 공백을 넣지 않는다. export는 환경변수로 등록하여 이후 자식 프로세스에 전달한다. unset은 변수를 제거한다.",
      "memory": "대입은 붙이고, 상속은 export",
      "kind": "개념"
    },
    {
      "id": "q017",
      "topic": "shell",
      "page": 7,
      "red": true,
      "prompt": "기본 로그인 셸과 지금 실행 중인 셸이 다를 수 있는 이유는?",
      "options": [
        "서브셸을 실행해도 SHELL 값은 그대로일 수 있어서",
        "SHELL은 현재 디렉터리를 저장해서",
        "SHELL은 모든 프로세스의 PID를 저장해서",
        "SHELL은 항상 /bin/sh로 고정되어서"
      ],
      "answer": 0,
      "explanation": "SHELL은 보통 로그인 셸 경로를 담는다. bash에서 다른 셸을 실행해도 바뀌지 않을 수 있으므로 실제 프로세스는 ps 등으로 확인한다.",
      "memory": "SHELL = 로그인 셸 / 실제 실행은 ps로 확인",
      "kind": "개념"
    },
    {
      "id": "q018",
      "topic": "shell",
      "page": 7,
      "red": true,
      "prompt": "사용 가능한 로그인 셸 경로의 목록이 들어 있는 파일은?",
      "options": [
        "/etc/shells",
        "/etc/passwd",
        "/etc/profile",
        "/etc/fstab"
      ],
      "answer": 0,
      "explanation": "/etc/shells는 유효한 로그인 셸 목록이다. /etc/passwd는 각 사용자 계정 정보를 저장하며 마지막 필드가 해당 계정의 셸이다.",
      "memory": "목록은 shells / 계정별 선택은 passwd",
      "kind": "개념"
    },
    {
      "id": "q019",
      "topic": "shell",
      "page": 7,
      "red": true,
      "prompt": "자신의 로그인 셸을 /bin/bash로 바꾸려면?",
      "options": [
        "chsh -s /bin/bash",
        "chsh -l /bin/bash",
        "export SHELLLIST=bash",
        "chmod /bin/bash"
      ],
      "answer": 0,
      "explanation": "chsh의 -s는 로그인 셸 변경에 쓰인다. -l은 지원 구현에서 셸 목록 조회에 쓰이고 chmod는 파일 권한 변경이다.",
      "memory": "change shell → chsh -s",
      "kind": "개념"
    },
    {
      "id": "q020",
      "topic": "shell",
      "page": 7,
      "red": true,
      "prompt": "/etc/passwd에서 UID, GID, 로그인 셸의 필드 번호 순서는?",
      "options": [
        "3, 4, 7",
        "2, 3, 6",
        "4, 3, 7",
        "3, 4, 6"
      ],
      "answer": 0,
      "explanation": "콜론으로 구분된 7개 필드는 사용자명, 패스워드 자리, UID, GID, 설명, 홈 디렉터리, 셸 순서이다.",
      "memory": "이름·암호·UID·GID·설명·홈·셸",
      "kind": "개념"
    },
    {
      "id": "q021",
      "topic": "shell",
      "page": 7,
      "red": true,
      "prompt": "서비스 계정의 대화형 로그인을 막는 용도로 지정하는 셸은?",
      "options": [
        "/sbin/nologin",
        "/bin/bash",
        "/bin/zsh",
        "/bin/ksh"
      ],
      "answer": 0,
      "explanation": "nologin은 로그인 거부 메시지를 내고 종료한다. bash, zsh, ksh는 명령을 해석하는 일반 셸이다. /bin/false도 로그인 차단에 쓰인다.",
      "memory": "서비스 계정은 nologin 또는 false",
      "kind": "개념"
    },
    {
      "id": "q022",
      "topic": "shell",
      "page": 7,
      "red": true,
      "prompt": "현재 셸의 COURSE 변수를 제거하는 명령은?",
      "options": [
        "unset COURSE",
        "unalias COURSE",
        "export COURSE",
        "set COURSE"
      ],
      "answer": 0,
      "explanation": "unset은 변수나 함수를 해제한다. unalias는 별칭 제거, export는 자식 프로세스에 상속할 환경변수 등록이다.",
      "memory": "변수 unset / 별칭 unalias",
      "kind": "개념"
    },
    {
      "id": "q023",
      "topic": "shell",
      "page": 7,
      "red": true,
      "prompt": "다음 중 C 셸 계열끼리 연결한 것은?",
      "options": [
        "csh, tcsh",
        "bash, zsh",
        "sh, ksh",
        "dash, bash"
      ],
      "answer": 0,
      "explanation": "csh와 tcsh는 C 셸 계열이다. sh, ksh, bash, zsh, dash는 본 셸 계열로 분류한다.",
      "memory": "C 셸 계열은 csh·tcsh",
      "kind": "개념"
    },
    {
      "id": "q024",
      "topic": "shell",
      "page": 8,
      "red": true,
      "prompt": "ll을 ls -alF의 별칭으로 설정하는 올바른 명령은?",
      "options": [
        "alias ll='ls -alF'",
        "alias ll = 'ls -alF'",
        "export ll 'ls -alF'",
        "unalias ll='ls -alF'"
      ],
      "answer": 0,
      "explanation": "Bash 별칭 정의는 alias 이름='명령' 형식이다. 등호 양옆을 띄우지 않는다. unalias는 별칭을 제거하는 명령이다.",
      "memory": "alias 이름='명령'",
      "kind": "개념"
    },
    {
      "id": "q025",
      "topic": "shell",
      "page": 8,
      "red": true,
      "prompt": "Bash에서 가장 최근 명령을 다시 실행하는 히스토리 표현은?",
      "options": [
        "!!",
        "!1",
        "!-2",
        "history 1"
      ],
      "answer": 0,
      "explanation": "!!는 직전 명령 재실행이다. !1은 기록 번호 1번, !-2는 두 번째 이전 명령이다. history 1은 출력만 한다.",
      "memory": "!! 직전 / !번호 해당 기록",
      "kind": "개념"
    },
    {
      "id": "q026",
      "topic": "shell",
      "page": 8,
      "red": true,
      "prompt": "Bash에서 프롬프트에 현재 사용자명을 표시하는 PS1 이스케이프는?",
      "options": [
        "\\u",
        "\\h",
        "\\W",
        "\\t"
      ],
      "answer": 0,
      "explanation": "\\u는 사용자, \\h는 짧은 호스트명, \\W는 현재 디렉터리의 마지막 구성 요소, \\t는 24시간 형식의 시간이다.",
      "memory": "u user / h host / W 마지막 디렉터리",
      "kind": "개념"
    },
    {
      "id": "q027",
      "topic": "shell",
      "page": 8,
      "red": false,
      "prompt": "Bash의 HISTSIZE와 HISTFILESIZE를 올바르게 설명한 것은?",
      "options": [
        "메모리 기록 개수 / 파일 기록 크기 제한",
        "파일 기록 크기 제한 / 메모리 기록 개수",
        "둘 다 실행 명령의 시간 제한",
        "둘 다 로그인 암호 길이"
      ],
      "answer": 0,
      "explanation": "HISTSIZE는 메모리 히스토리 목록의 항목 수, HISTFILESIZE는 히스토리 파일의 최대 줄 수를 제어한다.",
      "memory": "FILE이 붙으면 디스크의 기록 파일",
      "kind": "개념"
    },
    {
      "id": "q028",
      "topic": "shell",
      "page": 8,
      "red": false,
      "prompt": "PATH에 여러 명령 검색 디렉터리를 나열할 때 구분 기호는?",
      "options": [
        "콜론 :",
        "세미콜론 ;",
        "쉼표 ,",
        "공백 한 칸"
      ],
      "answer": 0,
      "explanation": "PATH는 /usr/bin:/bin처럼 콜론으로 구분한다. 세미콜론은 셸에서 명령을 구분하는 용도로 쓰인다.",
      "memory": "PATH 경로 사이는 :",
      "kind": "개념"
    },
    {
      "id": "q029",
      "topic": "shell",
      "page": 8,
      "red": false,
      "prompt": "개인 Bash 별칭을 새 대화형 셸에서도 사용하도록 보통 기록하는 파일은?",
      "options": [
        "~/.bashrc",
        "~/.bash_history",
        "~/.bash_logout",
        "/etc/fstab"
      ],
      "answer": 0,
      "explanation": "~/.bashrc는 개인 대화형 Bash 설정에 쓰인다. history는 명령 기록, logout은 로그인 셸 종료 시 실행할 내용, fstab은 마운트 설정이다.",
      "memory": "별칭·함수는 bashrc",
      "kind": "개념"
    },
    {
      "id": "q030",
      "topic": "process",
      "page": 9,
      "red": true,
      "prompt": "kill 2468을 실행할 때 기본으로 보내는 시그널은?",
      "options": [
        "SIGTERM (15)",
        "SIGKILL (9)",
        "SIGSTOP (19)",
        "SIGINT (2)"
      ],
      "answer": 0,
      "explanation": "kill은 옵션이 없으면 SIGTERM을 보낸다. SIGTERM은 프로세스가 처리할 수 있고 SIGKILL은 처리하거나 무시할 수 없다.",
      "memory": "기본 종료 15 / 강제 종료 9",
      "kind": "개념"
    },
    {
      "id": "q031",
      "topic": "process",
      "page": 9,
      "red": true,
      "prompt": "현재 셸의 작업 번호 2번에 시그널을 보내는 표기는?",
      "options": [
        "kill %2",
        "kill 2",
        "kill -2",
        "killall 2"
      ],
      "answer": 0,
      "explanation": "%2는 셸의 작업 번호이다. kill 2는 PID 2를 대상으로 하고 kill -2는 보낼 시그널 번호를 지정한다.",
      "memory": "%는 job 번호 / 숫자만 있으면 PID",
      "kind": "개념"
    },
    {
      "id": "q032",
      "topic": "process",
      "page": 9,
      "red": true,
      "prompt": "포그라운드 작업을 일시 정지시키는 키는?",
      "options": [
        "Ctrl+Z",
        "Ctrl+C",
        "Ctrl+D",
        "Ctrl+L"
      ],
      "answer": 0,
      "explanation": "일반적인 터미널 설정에서 Ctrl+Z는 SIGTSTP를 보낸다. Ctrl+C는 SIGINT, Ctrl+D는 입력 끝(EOF), Ctrl+L은 화면 정리이다.",
      "memory": "Z는 잠깐 정지 / C는 인터럽트",
      "kind": "개념"
    },
    {
      "id": "q033",
      "topic": "process",
      "page": 9,
      "red": true,
      "prompt": "같은 이름의 프로세스들을 이름으로 지정해 종료하려면?",
      "options": [
        "killall worker",
        "kill worker",
        "renice worker",
        "jobs worker"
      ],
      "answer": 0,
      "explanation": "killall은 프로세스 이름을 사용한다. kill과 renice의 일반적인 대상은 PID이며 jobs는 현재 셸의 작업 목록을 보여준다.",
      "memory": "이름으로 killall / 번호로 kill",
      "kind": "개념"
    },
    {
      "id": "q034",
      "topic": "process",
      "page": 9,
      "red": true,
      "prompt": "현재 NI가 0일 때 nice -n 7 task의 새 NI 값은?",
      "options": [
        "7",
        "-7",
        "0",
        "10"
      ],
      "answer": 0,
      "explanation": "nice -n은 현재 NI에 지정한 조정값을 더한다. 여기서는 0+7=7이다. NI가 커질수록 일반적인 CPU 스케줄링 우선권은 낮아진다.",
      "memory": "nice는 더하기 / 작을수록 높은 우선권",
      "kind": "개념"
    },
    {
      "id": "q035",
      "topic": "process",
      "page": 9,
      "red": true,
      "prompt": "기존 NI가 5인 PID 2468에 renice 12 -p 2468을 실행하면 NI는?",
      "options": [
        "12",
        "17",
        "7",
        "-12"
      ],
      "answer": 0,
      "explanation": "이 형식의 renice는 실행 중인 프로세스의 NI를 지정값 12로 설정한다. nice처럼 기존 값 5에 더해 17로 만들지 않는다.",
      "memory": "nice 조정값 / renice 목표값",
      "kind": "개념"
    },
    {
      "id": "q036",
      "topic": "process",
      "page": 9,
      "red": true,
      "prompt": "로그 파일 끝의 새 내용을 계속 따라가려면?",
      "options": [
        "tail -f app.log",
        "tail -n 1 app.log",
        "head app.log",
        "cat -n app.log"
      ],
      "answer": 0,
      "explanation": "tail -f는 파일이 늘어나는 것을 추적한다. tail -n 1은 마지막 한 줄을 한 번 출력하며 cat -n은 줄 번호를 붙인다.",
      "memory": "follow → tail -f",
      "kind": "개념"
    },
    {
      "id": "q037",
      "topic": "process",
      "page": 9,
      "red": false,
      "prompt": "fork()와 exec()의 차이를 올바르게 설명한 것은?",
      "options": [
        "fork는 자식 생성, exec는 현재 프로세스의 프로그램 교체",
        "둘 다 항상 PID가 두 개 증가",
        "exec만 부모 프로세스를 복제",
        "fork는 파일만 복사"
      ],
      "answer": 0,
      "explanation": "fork는 별도 PID의 자식 프로세스를 만든다. exec 계열은 현재 프로세스의 프로그램 이미지를 바꾸며 PID를 유지한다.",
      "memory": "fork 복제 / exec 교체",
      "kind": "개념"
    },
    {
      "id": "q038",
      "topic": "process",
      "page": 10,
      "red": true,
      "prompt": "멈춘 작업 1번을 백그라운드에서 재개하는 명령은?",
      "options": [
        "bg %1",
        "fg %1",
        "jobs -l",
        "kill -9 1"
      ],
      "answer": 0,
      "explanation": "bg는 작업을 백그라운드에서 재개한다. fg는 포그라운드로 가져오고 jobs는 목록을 조회한다.",
      "memory": "Ctrl+Z → bg %번호",
      "kind": "개념"
    },
    {
      "id": "q039",
      "topic": "process",
      "page": 10,
      "red": true,
      "prompt": "터미널 종료의 SIGHUP을 무시하면서 처음부터 백그라운드로 실행하려면?",
      "options": [
        "nohup task &",
        "nohup task",
        "task",
        "fg task"
      ],
      "answer": 0,
      "explanation": "nohup은 SIGHUP을 무시하도록 하고 &가 백그라운드 실행을 지시한다. nohup 자체만으로 백그라운드 실행이 되는 것은 아니다.",
      "memory": "끊겨도 실행 nohup / 뒤에서 실행 &",
      "kind": "개념"
    },
    {
      "id": "q040",
      "topic": "process",
      "page": 10,
      "red": true,
      "prompt": "매주 월요일부터 금요일까지 09:30에 실행하는 사용자 crontab은?",
      "options": [
        "30 9 * * 1-5 /opt/job.sh",
        "9 30 * * 1-5 /opt/job.sh",
        "30 9 1-5 * * /opt/job.sh",
        "30 9 * 1-5 * /opt/job.sh"
      ],
      "answer": 0,
      "explanation": "사용자 crontab의 시간 필드는 분·시·일·월·요일 순서이다. 마지막 시간 필드의 1-5는 월요일부터 금요일까지이다.",
      "memory": "분 시 일 월 요일",
      "kind": "개념"
    },
    {
      "id": "q041",
      "topic": "process",
      "page": 10,
      "red": true,
      "prompt": "사용자 crontab의 내용을 편집하는 옵션은?",
      "options": [
        "-e",
        "-l",
        "-r",
        "-u"
      ],
      "answer": 0,
      "explanation": "-e는 편집, -l은 목록 조회, -r은 등록 내용 삭제이다. -u는 관리자가 다른 사용자를 지정할 때 사용한다.",
      "memory": "edit e / list l / remove r",
      "kind": "개념"
    },
    {
      "id": "q042",
      "topic": "process",
      "page": 10,
      "red": true,
      "prompt": "ps 출력에서 작업은 끝났지만 부모가 종료 상태를 회수하지 않은 프로세스는?",
      "options": [
        "Z",
        "R",
        "S",
        "T"
      ],
      "answer": 0,
      "explanation": "Z는 좀비 상태이다. 실행 코드는 종료되었지만 부모가 wait 계열로 회수할 종료 정보가 남아 있다. R은 실행 가능, S는 수면, T는 정지이다.",
      "memory": "Zombie의 Z = 종료 정보 미회수",
      "kind": "개념"
    },
    {
      "id": "q043",
      "topic": "process",
      "page": 10,
      "red": true,
      "prompt": "PRI와 NI 열을 확인하기에 적절한 ps 옵션은?",
      "options": [
        "ps -l",
        "ps",
        "ps -p 1",
        "ps -C bash"
      ],
      "answer": 0,
      "explanation": "ps -l의 긴 형식에는 PRI·NI 열이 포함된다. 기본 ps나 대상 선택 옵션만으로는 이 열이 반드시 표시되지 않는다.",
      "memory": "long 형식의 l → PRI·NI",
      "kind": "개념"
    },
    {
      "id": "q044",
      "topic": "process",
      "page": 10,
      "red": false,
      "prompt": "top -n 3의 -n이 의미하는 것은?",
      "options": [
        "화면 갱신을 3회 수행한 뒤 종료",
        "프로세스를 3개만 표시",
        "3초마다 갱신",
        "NI를 3으로 설정"
      ],
      "answer": 0,
      "explanation": "명령행의 top -n은 반복 횟수이다. 대화형 화면 안에서 누르는 n은 표시 작업 수 설정이다. 갱신 간격은 -d이다. 원본에서 혼동하기 쉬운 부분을 보완했다.",
      "memory": "명령행 -n은 횟수 / 화면 안 n은 개수",
      "kind": "개념"
    },
    {
      "id": "q045",
      "topic": "process",
      "page": 10,
      "red": false,
      "prompt": "시스템 /etc/crontab에 있고 사용자 crontab에는 없는 필드는?",
      "options": [
        "실행 사용자",
        "분",
        "요일",
        "명령"
      ],
      "answer": 0,
      "explanation": "시스템 crontab은 시간 필드 5개 뒤에 실행 사용자와 명령을 적는다. 사용자 crontab은 파일 소유 사용자의 작업이므로 사용자 필드가 없다.",
      "memory": "시스템 cron = 시간 5칸 + 사용자 + 명령",
      "kind": "개념"
    },
    {
      "id": "q046",
      "topic": "editor",
      "page": 11,
      "red": true,
      "prompt": "비정상 종료 후 vi 복구를 시도할 때 사용하는 옵션은?",
      "options": [
        "-r",
        "-R",
        "-c",
        "-n"
      ],
      "answer": 0,
      "explanation": "-r은 복구, -R은 읽기 전용 모드이다. -c는 시작 시 실행할 명령을 지정한다. 대소문자를 구분해야 한다.",
      "memory": "recover -r / read only -R",
      "kind": "개념"
    },
    {
      "id": "q047",
      "topic": "editor",
      "page": 11,
      "red": true,
      "prompt": "vi를 열면서 25행으로 이동하는 명령은?",
      "options": [
        "vi +25 note.txt",
        "vi -25 note.txt",
        "vi 25 note.txt",
        "vi -r25 note.txt"
      ],
      "answer": 0,
      "explanation": "+[숫자]는 시작할 행 번호를 지정한다. +/문자열은 열면서 그 문자열이 나타나는 위치를 찾는 형식이다.",
      "memory": "vi +행번호 파일",
      "kind": "개념"
    },
    {
      "id": "q048",
      "topic": "editor",
      "page": 11,
      "red": false,
      "prompt": "vi 명령 모드에서 현재 줄 아래에 새 줄을 열고 입력하려면?",
      "options": [
        "o",
        "O",
        "a",
        "I"
      ],
      "answer": 0,
      "explanation": "소문자 o는 아래, 대문자 O는 위에 새 줄을 연다. a는 커서 뒤, I는 현재 줄의 첫 비공백 위치에서 입력한다.",
      "memory": "o 아래 / O 위",
      "kind": "개념"
    },
    {
      "id": "q049",
      "topic": "editor",
      "page": 11,
      "red": false,
      "prompt": "vi에서 현재 행을 복사하는 명령은?",
      "options": [
        "yy",
        "dd",
        "dw",
        "x"
      ],
      "answer": 0,
      "explanation": "yy는 현재 행 복사이고 dd는 행 삭제, dw는 단어 단위 삭제, x는 커서의 문자 삭제이다. 숫자를 앞에 붙이면 반복할 수 있다.",
      "memory": "y 복사 / d 삭제 / yy 한 줄",
      "kind": "개념"
    },
    {
      "id": "q050",
      "topic": "editor",
      "page": 11,
      "red": false,
      "prompt": "vi에서 아래 방향으로 검색한 뒤 반대 방향의 일치 항목으로 이동하려면?",
      "options": [
        "N",
        "n",
        "j",
        "p"
      ],
      "answer": 0,
      "explanation": "N은 최초 검색과 반대 방향으로 재검색한다. n은 같은 방향, j는 아래 행 이동, p는 붙여넣기이다.",
      "memory": "n 같은 방향 / N 반대 방향",
      "kind": "개념"
    },
    {
      "id": "q051",
      "topic": "editor",
      "page": 11,
      "red": false,
      "prompt": "nano에서 파일을 저장하는 키는?",
      "options": [
        "Ctrl+O",
        "Ctrl+X",
        "Ctrl+A",
        "Ctrl+E"
      ],
      "answer": 0,
      "explanation": "Ctrl+O는 write out(저장), Ctrl+X는 종료, Ctrl+A와 Ctrl+E는 행의 처음과 끝 이동이다.",
      "memory": "nano 저장 O / 종료 X",
      "kind": "개념"
    },
    {
      "id": "q052",
      "topic": "editor",
      "page": 12,
      "red": true,
      "prompt": "vi에서 문서 전체의 모든 old를 new로 치환하려면?",
      "options": [
        ":%s/old/new/g",
        ":s/old/new/",
        ":s/old/new/g",
        ":%s/old/new/"
      ],
      "answer": 0,
      "explanation": "%가 문서 전체 범위, g가 각 줄의 모든 일치를 뜻한다. %만 있으면 각 줄의 첫 일치만, g만 있으면 현재 줄의 모든 일치만 바뀐다.",
      "memory": "% 전체 줄 / g 줄 안의 모든 일치",
      "kind": "개념"
    },
    {
      "id": "q053",
      "topic": "editor",
      "page": 12,
      "red": true,
      "prompt": "vi에서 현재 행부터 파일 마지막 행까지 삭제하는 명령은?",
      "options": [
        ":.,$d",
        ":%d",
        ":1d",
        ":.$y"
      ],
      "answer": 0,
      "explanation": ".은 현재 행, $는 마지막 행, 쉼표는 범위, d는 삭제이다. :%d는 문서 전체를 삭제한다.",
      "memory": ". 현재 / $ 마지막 / % 전체",
      "kind": "개념"
    },
    {
      "id": "q054",
      "topic": "editor",
      "page": 12,
      "red": true,
      "prompt": "vi에서 변경 사항을 버리고 종료하려면?",
      "options": [
        ":q!",
        ":wq",
        ":w",
        ":q"
      ],
      "answer": 0,
      "explanation": ":q!는 저장하지 않고 강제 종료한다. :wq는 저장 후 종료, :w는 저장이다. 수정된 버퍼에서 :q만 사용하면 보통 종료를 거부한다.",
      "memory": "버리고 종료 q! / 저장 후 종료 wq",
      "kind": "개념"
    },
    {
      "id": "q055",
      "topic": "editor",
      "page": 12,
      "red": true,
      "prompt": "vi 정규식에서 줄의 시작에만 있는 hello를 찾는 패턴은?",
      "options": [
        "^hello",
        "hello$",
        "hello.",
        ".*hello"
      ],
      "answer": 0,
      "explanation": "^는 줄 시작, $는 줄 끝을 뜻한다. hello.는 뒤에 임의 문자 하나가 붙는 패턴이며 .*hello는 줄 시작을 제한하지 않는다.",
      "memory": "^ 시작 / $ 끝",
      "kind": "개념"
    },
    {
      "id": "q056",
      "topic": "editor",
      "page": 12,
      "red": false,
      "prompt": "vi에서 행 번호 표시를 켜는 명령은?",
      "options": [
        ":set nu",
        ":set nonu",
        ":set ic",
        ":set ai"
      ],
      "answer": 0,
      "explanation": "nu(number)는 행 번호 표시, nonu는 해제, ic(ignorecase)는 대소문자 무시, ai(autoindent)는 자동 들여쓰기이다.",
      "memory": "nu 번호 / ic 대소문자 / ai 들여쓰기",
      "kind": "개념"
    },
    {
      "id": "q057",
      "topic": "editor",
      "page": 12,
      "red": false,
      "prompt": "Vim의 사용자 설정 파일은?",
      "options": [
        "~/.vimrc",
        "~/.bashrc",
        "~/.bash_history",
        "/etc/fstab"
      ],
      "answer": 0,
      "explanation": "Vim은 .vimrc를 사용한다. vi의 전통적인 설정 파일은 .exrc이다. .bashrc는 셸 설정이다.",
      "memory": "vi .exrc / vim .vimrc",
      "kind": "개념"
    },
    {
      "id": "q058",
      "topic": "package",
      "page": 13,
      "red": true,
      "prompt": "APT에서 저장소의 패키지 목록만 최신으로 갱신하려면?",
      "options": [
        "apt-get update",
        "apt-get upgrade",
        "apt-get purge",
        "apt-get clean"
      ],
      "answer": 0,
      "explanation": "update는 목록 갱신이고 upgrade는 설치된 패키지의 업그레이드이다. purge는 설정까지 제거, clean은 내려받은 패키지 캐시 삭제이다.",
      "memory": "update 목록 / upgrade 설치본",
      "kind": "개념"
    },
    {
      "id": "q059",
      "topic": "package",
      "page": 13,
      "red": true,
      "prompt": "설정 파일까지 함께 제거하는 APT 명령은?",
      "options": [
        "apt-get purge app",
        "apt-get remove app",
        "apt-get update app",
        "apt-get clean app"
      ],
      "answer": 0,
      "explanation": "purge는 패키지와 관리 대상 설정 파일을 제거한다. remove는 설정 파일을 남긴다. 사용자 홈의 모든 개인 파일까지 지운다는 뜻은 아니다.",
      "memory": "remove는 설정 유지 / purge는 설정 제거",
      "kind": "개념"
    },
    {
      "id": "q060",
      "topic": "package",
      "page": 13,
      "red": true,
      "prompt": "YUM이 RPM에 비해 편리한 점은?",
      "options": [
        "저장소를 이용해 의존 패키지도 함께 설치",
        "모든 파일을 소스 코드로 바꿔 줌",
        "패키지 이름 없이 설치 가능",
        "설치된 프로그램을 항상 자동 실행"
      ],
      "answer": 0,
      "explanation": "YUM은 저장소와 의존성 정보를 이용해 필요한 패키지를 함께 처리한다. RPM 단독 명령은 의존성 충족 여부를 검사하지만 자동으로 의존 패키지를 구해 해결하지는 않는다.",
      "memory": "RPM 위에서 의존성을 해결하는 YUM",
      "kind": "개념"
    },
    {
      "id": "q061",
      "topic": "package",
      "page": 13,
      "red": true,
      "prompt": "YUM 패키지 캐시를 정리하는 명령은?",
      "options": [
        "yum clean all",
        "yum remove all",
        "yum history",
        "yum check-update"
      ],
      "answer": 0,
      "explanation": "clean all은 캐시를 정리한다. remove는 설치 패키지 삭제, history는 작업 이력, check-update는 업데이트 확인이다.",
      "memory": "캐시 청소 clean all",
      "kind": "개념"
    },
    {
      "id": "q062",
      "topic": "package",
      "page": 13,
      "red": false,
      "prompt": "설치되어 있지 않으면 새로 설치하고, 있으면 업그레이드하는 RPM 옵션은?",
      "options": [
        "-U",
        "-F",
        "-e",
        "-V"
      ],
      "answer": 0,
      "explanation": "-U는 업그레이드 또는 새 설치, -F는 이미 설치된 패키지의 업그레이드만 수행한다. -e는 제거, -V는 검증이다.",
      "memory": "U 없으면 설치 / F 설치된 것만",
      "kind": "개념"
    },
    {
      "id": "q063",
      "topic": "package",
      "page": 13,
      "red": false,
      "prompt": "/usr/bin/bash 파일을 제공한 설치 패키지를 조회하려면?",
      "options": [
        "rpm -qf /usr/bin/bash",
        "rpm -ql /usr/bin/bash",
        "rpm -qi /usr/bin/bash",
        "rpm -qa /usr/bin/bash"
      ],
      "answer": 0,
      "explanation": "-qf는 파일이 속한 패키지를 찾는다. -ql은 패키지의 파일 목록, -qi는 패키지 정보, -qa는 전체 설치 패키지 목록이다.",
      "memory": "file → qf / list → ql / info → qi",
      "kind": "개념"
    },
    {
      "id": "q064",
      "topic": "package",
      "page": 13,
      "red": false,
      "prompt": "아직 설치하지 않은 local.rpm 파일의 패키지 정보를 조회하려면?",
      "options": [
        "rpm -qip local.rpm",
        "rpm -qi local.rpm",
        "rpm -e local.rpm",
        "rpm -V local.rpm"
      ],
      "answer": 0,
      "explanation": "-p는 설치 DB의 패키지 이름 대신 패키지 파일을 조회 대상으로 한다. 여기에 -q와 -i를 결합하면 파일의 정보를 볼 수 있다.",
      "memory": "미설치 패키지 파일 질의에 p 추가",
      "kind": "개념"
    },
    {
      "id": "q065",
      "topic": "package",
      "page": 13,
      "red": false,
      "prompt": "dpkg에서 지정한 패키지가 설치한 파일의 목록을 출력하는 옵션은?",
      "options": [
        "-L",
        "-l",
        "-i",
        "-P"
      ],
      "answer": 0,
      "explanation": "-L은 특정 패키지의 파일 목록, -l은 패키지 목록 조회이다. -i는 설치, -P는 설정을 포함한 제거이다.",
      "memory": "dpkg 소문자 l 패키지 / 대문자 L 파일",
      "kind": "개념"
    },
    {
      "id": "q066",
      "topic": "package",
      "page": 14,
      "red": false,
      "prompt": "backup.tar.xz를 해제하는 명령은?",
      "options": [
        "tar -xJf backup.tar.xz",
        "tar -xjf backup.tar.xz",
        "tar -xzf backup.tar.xz",
        "tar -cJf backup.tar.xz"
      ],
      "answer": 0,
      "explanation": "x는 풀기, J는 xz, f는 아카이브 파일 지정이다. 소문자 j는 bzip2, z는 gzip, c는 만들기이다.",
      "memory": "gzip z / bzip2 j / xz J",
      "kind": "개념"
    },
    {
      "id": "q067",
      "topic": "package",
      "page": 14,
      "red": false,
      "prompt": "압축을 풀지 않고 tar 아카이브 안의 파일 목록만 조회하려면?",
      "options": [
        "tar -tf data.tar",
        "tar -xf data.tar",
        "tar -cf data.tar",
        "tar -rf data.tar"
      ],
      "answer": 0,
      "explanation": "t는 목록 조회, x는 해제, c는 새 아카이브 생성, r은 기존 아카이브에 항목 추가이다.",
      "memory": "tar: c 생성 / x 해제 / t 목록",
      "kind": "개념"
    },
    {
      "id": "q068",
      "topic": "package",
      "page": 14,
      "red": false,
      "prompt": "Autotools 방식 소스 설치의 일반적인 순서는?",
      "options": [
        "configure → make → make install",
        "make install → configure → make",
        "make → configure → make install",
        "configure → make install → make clean"
      ],
      "answer": 0,
      "explanation": "configure가 환경을 점검하고 Makefile 등을 준비한다. make가 빌드하고 make install이 결과물을 설치 경로로 복사한다.",
      "memory": "설정 → 빌드 → 설치",
      "kind": "개념"
    },
    {
      "id": "q069",
      "topic": "package",
      "page": 14,
      "red": false,
      "prompt": "configure에서 설치 기준 경로를 지정하는 옵션은?",
      "options": [
        "--prefix",
        "--nodeps",
        "--purge",
        "--force"
      ],
      "answer": 0,
      "explanation": "--prefix는 설치 기준 경로 지정에 쓰인다. --nodeps는 RPM에서 의존성 검사를 건너뛰는 옵션이며 나머지도 configure의 설치 경로 지정 옵션이 아니다.",
      "memory": "설치 위치는 configure --prefix",
      "kind": "개념"
    },
    {
      "id": "q070",
      "topic": "device",
      "page": 15,
      "red": true,
      "prompt": "BSD 방식 프린터 명령 중 인쇄 큐를 조회하는 명령은?",
      "options": [
        "lpq",
        "lpr",
        "lprm",
        "lpc"
      ],
      "answer": 0,
      "explanation": "lpq는 큐 조회, lpr은 인쇄 요청, lprm은 작업 제거, lpc는 프린터 제어에 쓰인다.",
      "memory": "request lpr / queue lpq / remove lprm",
      "kind": "개념"
    },
    {
      "id": "q071",
      "topic": "device",
      "page": 15,
      "red": true,
      "prompt": "System V 방식으로 인쇄 작업을 취소하는 명령은?",
      "options": [
        "cancel",
        "lp",
        "lpstat",
        "lpadmin"
      ],
      "answer": 0,
      "explanation": "cancel은 작업 취소, lp는 출력 요청, lpstat은 상태 조회, lpadmin은 프린터 관리이다.",
      "memory": "BSD lprm = System V cancel",
      "kind": "개념"
    },
    {
      "id": "q072",
      "topic": "device",
      "page": 15,
      "red": true,
      "prompt": "System V의 lp로 같은 문서를 3부 인쇄하려면?",
      "options": [
        "lp -n 3 report.txt",
        "lp -#3 report.txt",
        "lp -r 3 report.txt",
        "lpstat -n 3 report.txt"
      ],
      "answer": 0,
      "explanation": "lp에서는 -n으로 매수를 지정한다. BSD 방식 lpr은 -#을 쓴다. lpstat은 인쇄 요청이 아니라 상태 조회이다.",
      "memory": "lp -n / lpr -#",
      "kind": "개념"
    },
    {
      "id": "q073",
      "topic": "device",
      "page": 15,
      "red": true,
      "prompt": "장애 복구용 중복 정보 없이 데이터를 여러 디스크에 분산하는 RAID는?",
      "options": [
        "RAID 0",
        "RAID 1",
        "RAID 5",
        "RAID 6"
      ],
      "answer": 0,
      "explanation": "RAID 0은 스트라이핑으로 속도와 용량 활용에 유리하지만 디스크 고장을 복구할 중복 정보가 없다. 1은 미러링, 5와 6은 패리티를 사용한다.",
      "memory": "RAID 0 = 중복 정보 0",
      "kind": "개념"
    },
    {
      "id": "q074",
      "topic": "device",
      "page": 15,
      "red": false,
      "prompt": "CUPS가 주로 사용하는 인쇄 프로토콜과 포트는?",
      "options": [
        "IPP / 631",
        "SMTP / 25",
        "SSH / 22",
        "DNS / 53"
      ],
      "answer": 0,
      "explanation": "CUPS는 IPP를 사용하며 표준 IPP 포트는 631이다. 다른 보기들은 메일, 원격 접속, 이름 해석에 해당한다.",
      "memory": "인쇄 IPP 631",
      "kind": "개념"
    },
    {
      "id": "q075",
      "topic": "device",
      "page": 15,
      "red": false,
      "prompt": "ALSA의 사운드 설정을 저장하거나 복원하는 명령은?",
      "options": [
        "alsactl",
        "alsamixer",
        "aplay",
        "scanimage"
      ],
      "answer": 0,
      "explanation": "alsactl은 사운드 설정 저장·복원, alsamixer는 믹서 조절, aplay는 오디오 재생이다. scanimage는 스캐너 명령이다.",
      "memory": "control alsactl / 볼륨 alsamixer",
      "kind": "개념"
    },
    {
      "id": "q076",
      "topic": "device",
      "page": 15,
      "red": false,
      "prompt": "스캐너 API SANE의 GUI 프런트엔드는?",
      "options": [
        "XSANE",
        "ALSA",
        "CUPS",
        "LVM"
      ],
      "answer": 0,
      "explanation": "XSANE은 SANE을 사용하는 그래픽 프런트엔드이다. ALSA는 오디오, CUPS는 인쇄, LVM은 논리 볼륨 관리이다.",
      "memory": "Scanner SANE / GUI XSANE",
      "kind": "개념"
    },
    {
      "id": "q077",
      "topic": "device",
      "page": 15,
      "red": false,
      "prompt": "LVM을 구성할 때 일반적인 생성 순서는?",
      "options": [
        "PV → VG → LV",
        "LV → PV → VG",
        "VG → LV → PV",
        "PE → LE → RAID"
      ],
      "answer": 0,
      "explanation": "물리 디스크·파티션을 PV로 초기화하고 이를 VG로 묶은 뒤 필요한 크기의 LV를 만든다. PE와 LE는 각각의 할당 단위이다.",
      "memory": "물리 PV → 묶음 VG → 논리 LV",
      "kind": "개념"
    },
    {
      "id": "q078",
      "topic": "device",
      "page": 15,
      "red": false,
      "prompt": "현재 적재된 커널 모듈 목록을 확인하려면?",
      "options": [
        "lsmod",
        "lspci",
        "lsusb",
        "dmesg"
      ],
      "answer": 0,
      "explanation": "lsmod는 로드된 모듈을 출력한다. lspci와 lsusb는 버스별 장치, dmesg는 커널 메시지를 조회한다.",
      "memory": "module 목록 = lsmod",
      "kind": "개념"
    },
    {
      "id": "q079",
      "topic": "device",
      "page": 15,
      "red": false,
      "prompt": "장애 발생 시 교체용으로 대기하며 평소 데이터 배열 용량에서 제외하는 디스크는?",
      "options": [
        "핫스페어",
        "스트라이프",
        "논리 볼륨",
        "마운트 포인트"
      ],
      "answer": 0,
      "explanation": "핫스페어는 장애 디스크를 대신하도록 대기한다. 용량 계산에서 전체 디스크 수에 포함되어 있다면 먼저 스페어 수를 빼야 한다.",
      "memory": "전체 − 스페어 − 패리티분",
      "kind": "개념"
    },
    {
      "id": "q080",
      "topic": "xwindow",
      "page": 16,
      "red": true,
      "prompt": "원격 서버에서 실행한 X 응용 화면을 내 노트북으로 본다. X 서버는 어느 쪽인가?",
      "options": [
        "화면과 입력 장치를 제공하는 내 노트북",
        "응용 프로그램만 실행하는 원격 서버",
        "DNS 서버",
        "패키지 저장소"
      ],
      "answer": 0,
      "explanation": "X 서버는 화면·키보드·마우스를 관리한다. X 클라이언트는 이 기능을 요청하는 응용 프로그램이다. 일반적인 서버라는 말과 반대로 느껴져 자주 혼동한다.",
      "memory": "화면 있는 쪽 X 서버 / 앱은 X 클라이언트",
      "kind": "개념"
    },
    {
      "id": "q081",
      "topic": "xwindow",
      "page": 16,
      "red": true,
      "prompt": "X 인증 쿠키를 조회·관리하는 명령은?",
      "options": [
        "xauth",
        "xhost",
        "xrandr",
        "xterm"
      ],
      "answer": 0,
      "explanation": "xauth는 인증 쿠키를 관리한다. xhost는 호스트 등의 접근 목록, xrandr는 화면 출력 설정, xterm은 터미널이다.",
      "memory": "호스트 접근 xhost / 인증 쿠키 xauth",
      "kind": "개념"
    },
    {
      "id": "q082",
      "topic": "xwindow",
      "page": 16,
      "red": false,
      "prompt": "X 클라이언트가 화면을 출력할 대상을 지정하는 환경변수는?",
      "options": [
        "DISPLAY",
        "PS1",
        "PATH",
        "TERM"
      ],
      "answer": 0,
      "explanation": "DISPLAY는 X 서버와 디스플레이 번호 등의 대상을 지정한다. PS1은 프롬프트, PATH는 명령 검색 경로, TERM은 터미널 유형이다.",
      "memory": "X 화면 목적지 = DISPLAY",
      "kind": "개념"
    },
    {
      "id": "q083",
      "topic": "xwindow",
      "page": 16,
      "red": false,
      "prompt": "GUI 로그인 화면과 사용자 세션 시작을 담당하는 구성 요소는?",
      "options": [
        "디스플레이 매니저",
        "윈도 매니저",
        "파일 시스템",
        "패키지 매니저"
      ],
      "answer": 0,
      "explanation": "GDM 등 디스플레이 매니저가 로그인과 세션 시작을 맡는다. 윈도 매니저는 창의 위치·크기·테두리를 관리한다.",
      "memory": "로그인 display manager / 창 window manager",
      "kind": "개념"
    },
    {
      "id": "q084",
      "topic": "xwindow",
      "page": 16,
      "red": false,
      "prompt": "KDE의 주요 GUI 라이브러리는?",
      "options": [
        "Qt",
        "GTK",
        "ALSA",
        "SANE"
      ],
      "answer": 0,
      "explanation": "KDE는 Qt 기반이다. 정리본의 GNOME·Xfce·LXDE는 GTK 계열이며 ALSA와 SANE은 주변 장치 관련 기술이다.",
      "memory": "KDE ↔ Qt",
      "kind": "개념"
    },
    {
      "id": "q085",
      "topic": "xwindow",
      "page": 16,
      "red": false,
      "prompt": "다음 부팅부터 그래픽 환경을 기본으로 설정하는 명령은?",
      "options": [
        "systemctl set-default graphical.target",
        "systemctl get-default",
        "systemctl set-default multi-user.target",
        "xauth list"
      ],
      "answer": 0,
      "explanation": "set-default는 다음 부팅의 기본 타깃을 설정한다. get-default는 조회이다. multi-user.target은 일반적으로 텍스트 기반 다중 사용자 모드이다.",
      "memory": "설정 set-default / 확인 get-default",
      "kind": "개념"
    },
    {
      "id": "q086",
      "topic": "xwindow",
      "page": 16,
      "red": false,
      "prompt": "X 화면의 해상도와 출력 설정을 다루는 명령은?",
      "options": [
        "xrandr",
        "xinit",
        "xauth",
        "xterm"
      ],
      "answer": 0,
      "explanation": "xrandr는 RandR 확장을 이용해 화면 출력 설정을 다룬다. xinit는 X 서버·클라이언트 시작, xauth는 인증, xterm은 터미널이다.",
      "memory": "해상도는 xrandr",
      "kind": "개념"
    },
    {
      "id": "q087",
      "topic": "xwindow",
      "page": 17,
      "red": false,
      "prompt": "LibreOffice에서 스프레드시트에 해당하는 프로그램은?",
      "options": [
        "Calc",
        "Writer",
        "Impress",
        "Base"
      ],
      "answer": 0,
      "explanation": "Calc는 표 계산, Writer는 문서 작성, Impress는 발표 자료, Base는 데이터베이스 관련 도구이다.",
      "memory": "표 Calc / 문서 Writer / 발표 Impress",
      "kind": "개념"
    },
    {
      "id": "q088",
      "topic": "xwindow",
      "page": 17,
      "red": false,
      "prompt": "벡터 그래픽 편집에 적합한 프로그램은?",
      "options": [
        "Inkscape",
        "GIMP",
        "Blender",
        "VLC"
      ],
      "answer": 0,
      "explanation": "Inkscape는 벡터 편집 도구이다. GIMP는 비트맵 이미지 편집, Blender는 3D 제작, VLC는 미디어 재생에 쓰인다.",
      "memory": "벡터 Inkscape / 비트맵 GIMP",
      "kind": "개념"
    },
    {
      "id": "q089",
      "topic": "xwindow",
      "page": 17,
      "red": false,
      "prompt": "GNOME의 문서 뷰어로 PDF 등을 읽는 프로그램은?",
      "options": [
        "Evince",
        "Rhythmbox",
        "Gwenview",
        "Amarok"
      ],
      "answer": 0,
      "explanation": "Evince는 문서 뷰어, Rhythmbox와 Amarok은 음악 재생·관리, Gwenview는 KDE 이미지 뷰어이다.",
      "memory": "문서 Evince / 이미지 eog·Gwenview",
      "kind": "개념"
    },
    {
      "id": "q090",
      "topic": "network",
      "page": 18,
      "red": true,
      "prompt": "TCP 연결 설정의 순서는?",
      "options": [
        "SYN → SYN/ACK → ACK",
        "ACK → SYN → FIN",
        "SYN → FIN → ACK",
        "FIN → ACK → SYN"
      ],
      "answer": 0,
      "explanation": "클라이언트가 SYN을 보내고 서버가 SYN/ACK로 응답하며 클라이언트가 ACK를 보내 연결을 설정한다. FIN은 일반적인 연결 종료에 쓰인다.",
      "memory": "요청 SYN / 응답 SYN+ACK / 확인 ACK",
      "kind": "개념"
    },
    {
      "id": "q091",
      "topic": "network",
      "page": 18,
      "red": true,
      "prompt": "모든 노드가 서로 직접 연결되어 우회 경로가 풍부하지만 배선이 많은 토폴로지는?",
      "options": [
        "완전 메시형",
        "버스형",
        "성형",
        "링형"
      ],
      "answer": 0,
      "explanation": "완전 메시형은 노드 쌍마다 연결하므로 대체 경로가 많고 배선 비용이 크다. 성형은 중앙 장치, 버스형은 공통 회선, 링형은 원형 연결이다.",
      "memory": "메시 = 많은 연결 · 많은 우회 경로",
      "kind": "개념"
    },
    {
      "id": "q092",
      "topic": "network",
      "page": 18,
      "red": false,
      "prompt": "OSI에서 경로 선택과 IP 주소 처리를 담당하는 계층은?",
      "options": [
        "네트워크 계층",
        "전송 계층",
        "세션 계층",
        "표현 계층"
      ],
      "answer": 0,
      "explanation": "네트워크 계층은 논리 주소와 라우팅을 다룬다. 전송은 종단 간 전달, 세션은 대화·동기화, 표현은 형식 변환·암호화 등을 다룬다.",
      "memory": "3계층 IP·라우터·패킷",
      "kind": "개념"
    },
    {
      "id": "q093",
      "topic": "network",
      "page": 18,
      "red": false,
      "prompt": "OSI 데이터 링크 계층의 대표 전송 단위와 주소는?",
      "options": [
        "프레임 / MAC",
        "패킷 / IP",
        "세그먼트 / 포트",
        "비트 / URL"
      ],
      "answer": 0,
      "explanation": "데이터 링크 계층에서는 프레임과 MAC 주소가 대표적이다. 네트워크 계층은 패킷·IP, TCP 전송 계층은 세그먼트·포트를 다룬다.",
      "memory": "2계층 MAC·스위치·프레임",
      "kind": "개념"
    },
    {
      "id": "q094",
      "topic": "network",
      "page": 18,
      "red": false,
      "prompt": "IPv4 주소에 대응하는 이더넷 MAC 주소를 구하는 프로토콜은?",
      "options": [
        "ARP",
        "RARP",
        "ICMP",
        "SMTP"
      ],
      "answer": 0,
      "explanation": "ARP는 같은 링크에서 IPv4 주소에 대응하는 MAC 주소를 찾는다. RARP는 반대 방향의 과거 프로토콜이며 ICMP는 오류·제어 메시지, SMTP는 메일이다.",
      "memory": "ARP: IP → MAC",
      "kind": "개념"
    },
    {
      "id": "q095",
      "topic": "network",
      "page": 18,
      "red": false,
      "prompt": "OSI에서 압축·암호화·표현 형식 변환과 연결되는 계층은?",
      "options": [
        "표현 계층",
        "세션 계층",
        "물리 계층",
        "네트워크 계층"
      ],
      "answer": 0,
      "explanation": "표현 계층은 데이터를 어떤 형식으로 표현할지 다룬다. 세션은 대화 관리·동기화, 물리는 신호, 네트워크는 경로 선택이다.",
      "memory": "표현 = 변환·압축·암호화",
      "kind": "개념"
    },
    {
      "id": "q096",
      "topic": "network",
      "page": 19,
      "red": true,
      "prompt": "자기 컴퓨터의 TCP/IP 동작을 확인하는 IPv4 루프백 주소는?",
      "options": [
        "127.0.0.1",
        "192.168.1.1",
        "172.16.0.1",
        "255.255.255.255"
      ],
      "answer": 0,
      "explanation": "127.0.0.1은 루프백 주소이다. 192.168.1.1과 172.16.0.1은 사설 주소 예시, 255.255.255.255는 제한 브로드캐스트 주소이다.",
      "memory": "자기 자신 127.0.0.1",
      "kind": "개념"
    },
    {
      "id": "q097",
      "topic": "network",
      "page": 19,
      "red": true,
      "prompt": "IPv6에 대한 설명으로 옳은 것은?",
      "options": [
        "주소 길이가 128비트이며 A/B/C 클래스 구분을 사용하지 않는다",
        "주소 길이가 32비트이다",
        "항상 IPv4보다 전송 속도가 빠르다",
        "주소를 10진수 네 칸으로만 표기한다"
      ],
      "answer": 0,
      "explanation": "IPv6 주소는 128비트이고 IPv4의 과거 클래스 구분을 사용하지 않는다. 주소 체계의 확장이 모든 상황의 속도 향상을 보장하는 것은 아니다.",
      "memory": "IPv4 32 / IPv6 128",
      "kind": "개념"
    },
    {
      "id": "q098",
      "topic": "network",
      "page": 19,
      "red": false,
      "prompt": "RFC 1918 사설 IPv4 범위에 포함되는 주소는?",
      "options": [
        "172.20.3.4",
        "172.32.3.4",
        "11.0.0.1",
        "192.169.0.1"
      ],
      "answer": 0,
      "explanation": "172.16.0.0/12는 두 번째 옥텟 16부터 31까지이다. 다른 사설 범위는 10.0.0.0/8과 192.168.0.0/16이다. 사설이 아니라고 모두 일반 공인 주소인 것은 아니다.",
      "memory": "172의 사설 범위는 16~31",
      "kind": "개념"
    },
    {
      "id": "q099",
      "topic": "network",
      "page": 19,
      "red": false,
      "prompt": "메일 서버 사이의 메일 전송에 주로 사용하는 프로토콜과 포트는?",
      "options": [
        "SMTP / 25",
        "POP3 / 110",
        "IMAP / 143",
        "SNMP / 161"
      ],
      "answer": 0,
      "explanation": "SMTP는 메일 송신·중계, POP3와 IMAP은 수신·메일함 접근에 사용된다. SNMP는 네트워크 관리 프로토콜이다.",
      "memory": "보내는 SMTP 25 / 받는 POP3 110·IMAP 143",
      "kind": "개념"
    },
    {
      "id": "q100",
      "topic": "network",
      "page": 19,
      "red": false,
      "prompt": "SSH 원격 접속의 기본 TCP 포트는?",
      "options": [
        "22",
        "23",
        "21",
        "25"
      ],
      "answer": 0,
      "explanation": "SSH는 기본 22, Telnet은 23, FTP 제어는 21, SMTP는 25이다. SSH 연결은 암호화된다.",
      "memory": "SSH 22 / Telnet 23",
      "kind": "개념"
    },
    {
      "id": "q101",
      "topic": "network",
      "page": 19,
      "red": false,
      "prompt": "DNS가 사용하는 전송 프로토콜은?",
      "options": [
        "UDP와 TCP 모두",
        "UDP만",
        "TCP만",
        "ICMP만"
      ],
      "answer": 0,
      "explanation": "DNS는 UDP와 TCP 모두 53번 포트를 사용한다. 일반 질의에 UDP가 자주 사용되지만 큰 응답과 영역 전송 등에는 TCP도 쓰인다.",
      "memory": "DNS = 53, UDP도 TCP도",
      "kind": "개념"
    },
    {
      "id": "q102",
      "topic": "network",
      "page": 19,
      "red": false,
      "prompt": "전통적인 FTP의 제어 연결에 사용하는 서버 포트는?",
      "options": [
        "21",
        "20",
        "22",
        "23"
      ],
      "answer": 0,
      "explanation": "FTP 제어 연결은 21번이다. 능동 모드의 서버 데이터 연결에는 보통 20번을 사용하지만 수동 모드 데이터 포트는 별도로 협상한다.",
      "memory": "FTP 제어 21 / 능동 데이터 20",
      "kind": "개념"
    },
    {
      "id": "q103",
      "topic": "network",
      "page": 19,
      "red": false,
      "prompt": "FTP 클라이언트에서 여러 파일을 서버로 올리는 명령은?",
      "options": [
        "mput",
        "mget",
        "get",
        "bye"
      ],
      "answer": 0,
      "explanation": "put은 한 파일 업로드, mput은 여러 파일 업로드이다. get과 mget은 다운로드이며 bye는 접속 종료이다.",
      "memory": "put 올림 / get 받음 / m 여러 개",
      "kind": "개념"
    },
    {
      "id": "q104",
      "topic": "network",
      "page": 19,
      "red": false,
      "prompt": "DNS 서버 주소를 nameserver 항목으로 지정하는 전통적인 파일은?",
      "options": [
        "/etc/resolv.conf",
        "/etc/hosts",
        "/etc/services",
        "/etc/protocols"
      ],
      "answer": 0,
      "explanation": "resolv.conf는 리졸버의 DNS 서버 등을 설정한다. hosts는 이름·IP 매핑, services는 서비스·포트 매핑, protocols는 프로토콜 번호 매핑이다.",
      "memory": "resolv DNS / hosts 이름-IP / services 포트",
      "kind": "개념"
    },
    {
      "id": "q105",
      "topic": "network",
      "page": 21,
      "red": false,
      "prompt": "SSH 서버의 2222번 포트에 user 계정으로 접속하는 명령은?",
      "options": [
        "ssh -p 2222 user@192.168.1.20",
        "ssh -P 2222 user@192.168.1.20",
        "ssh -l 2222 user@192.168.1.20",
        "ssh -n 2222 user@192.168.1.20"
      ],
      "answer": 0,
      "explanation": "ssh의 포트 옵션은 소문자 -p이다. -l은 로그인 계정명 지정이다. scp의 포트 옵션 -P와 혼동하지 않는다.",
      "memory": "ssh 포트 -p / scp 포트 -P",
      "kind": "개념"
    },
    {
      "id": "q106",
      "topic": "network",
      "page": 21,
      "red": false,
      "prompt": "서버에서 SSH 공개키 로그인을 허용할 키를 등록하는 사용자 파일은?",
      "options": [
        "~/.ssh/authorized_keys",
        "~/.ssh/known_hosts",
        "/etc/hosts",
        "~/.bash_history"
      ],
      "answer": 0,
      "explanation": "authorized_keys에는 해당 계정의 접속을 허용할 공개키를 등록한다. known_hosts는 클라이언트가 접속한 서버의 호스트 키를 기억한다.",
      "memory": "허용할 사용자 키 authorized_keys",
      "kind": "개념"
    },
    {
      "id": "q107",
      "topic": "network",
      "page": 21,
      "red": false,
      "prompt": "목적지까지 거치는 라우터 경로를 조사하는 명령은?",
      "options": [
        "traceroute",
        "arp",
        "nslookup",
        "lpq"
      ],
      "answer": 0,
      "explanation": "traceroute는 경로의 홉을 추적한다. arp는 주소 대응 테이블, nslookup은 DNS 질의, lpq는 인쇄 큐 조회이다.",
      "memory": "경로 trace / 연결 ping / 이름 nslookup",
      "kind": "개념"
    },
    {
      "id": "q108",
      "topic": "network",
      "page": 21,
      "red": false,
      "prompt": "숫자로 TCP의 수신 대기 소켓을 확인하는 명령은?",
      "options": [
        "ss -ltn",
        "ss -u",
        "ip route show",
        "ip neigh"
      ],
      "answer": 0,
      "explanation": "ss에서 -l은 listening, -t는 TCP, -n은 숫자 표기이다. ip route show는 라우팅 테이블, ip neigh는 이웃 주소 정보를 보여준다.",
      "memory": "listen TCP numeric → -ltn",
      "kind": "개념"
    },
    {
      "id": "q109",
      "topic": "network",
      "page": 21,
      "red": false,
      "prompt": "로그인한 다음 보여 주는 안내문을 담는 전통적인 파일은?",
      "options": [
        "/etc/motd",
        "/etc/issue",
        "/etc/issue.net",
        "/etc/fstab"
      ],
      "answer": 0,
      "explanation": "motd는 message of the day로 로그인 후 안내이다. issue는 로컬 로그인 전, issue.net은 네트워크 서비스의 로그인 전 안내에 쓰이며 실제 표시는 서비스 설정에 따라 달라진다.",
      "memory": "로그인 후 motd / 로그인 전 issue",
      "kind": "개념"
    },
    {
      "id": "q110",
      "topic": "network",
      "page": 21,
      "red": false,
      "prompt": "리눅스에서 라우팅 테이블을 조회하는 ip 명령은?",
      "options": [
        "ip route show",
        "ip neigh",
        "ip addr show",
        "ip link show"
      ],
      "answer": 0,
      "explanation": "route는 경로, neigh는 이웃 IP·MAC 대응, addr는 주소, link는 링크 장치 정보를 다룬다.",
      "memory": "route 경로 / addr 주소 / neigh 이웃",
      "kind": "개념"
    },
    {
      "id": "q111",
      "topic": "application",
      "page": 22,
      "red": true,
      "prompt": "물리 서버의 커널을 공유하며 응용 프로그램을 격리하는 방식은?",
      "options": [
        "컨테이너",
        "모든 게스트가 독립 커널을 갖는 가상 머신",
        "RAID",
        "NFS"
      ],
      "answer": 0,
      "explanation": "컨테이너는 호스트 커널을 공유한다. 일반적인 가상 머신은 각 게스트가 자체 커널을 구동한다. RAID는 저장 장치 구성, NFS는 파일 공유이다.",
      "memory": "컨테이너는 커널 공유",
      "kind": "개념"
    },
    {
      "id": "q112",
      "topic": "application",
      "page": 22,
      "red": true,
      "prompt": "컨테이너 배포·확장·복구를 관리하는 오케스트레이션 플랫폼은?",
      "options": [
        "Kubernetes",
        "GIMP",
        "CUPS",
        "Bash"
      ],
      "answer": 0,
      "explanation": "Kubernetes는 컨테이너화된 워크로드의 배포·확장 등을 조정한다. GIMP는 이미지 편집, CUPS는 인쇄, Bash는 셸이다.",
      "memory": "컨테이너 운영 자동화 = Kubernetes",
      "kind": "개념"
    },
    {
      "id": "q113",
      "topic": "application",
      "page": 22,
      "red": true,
      "prompt": "고전적인 반가상화와 전가상화를 구분하는 핵심 설명은?",
      "options": [
        "반가상화는 게스트 OS 수정, 전가상화는 수정 없이 실행",
        "전가상화만 반드시 게스트 OS를 수정",
        "둘 다 저장 공간만 가상화",
        "반가상화는 물리 메모리가 필요 없음"
      ],
      "answer": 0,
      "explanation": "고전적인 구분에서 반가상화는 게스트가 하이퍼바이저와 협력하도록 수정하고 전가상화는 수정하지 않은 게스트를 지원한다. 전가상화에서도 반가상화 I/O 드라이버를 쓸 수 있다.",
      "memory": "반가상화 수정 / 전가상화 원형 OS",
      "kind": "개념"
    },
    {
      "id": "q114",
      "topic": "application",
      "page": 22,
      "red": true,
      "prompt": "주 노드 장애 시 다른 노드가 서비스를 이어받는 것이 핵심인 클러스터는?",
      "options": [
        "HA",
        "HPC",
        "단일 서버",
        "RAID 0"
      ],
      "answer": 0,
      "explanation": "HA는 고가용성으로 서비스 중단을 줄이는 데 목적이 있다. HPC는 계산 성능, 부하분산은 여러 노드에 요청을 나누는 데 초점을 둔다.",
      "memory": "HA = 계속 서비스 / HPC = 계산",
      "kind": "개념"
    },
    {
      "id": "q115",
      "topic": "application",
      "page": 22,
      "red": true,
      "prompt": "여러 컴퓨터로 과학 계산을 병렬 수행하는 Beowulf 유형은?",
      "options": [
        "HPC 클러스터",
        "프린터 클러스터",
        "DNS 캐시",
        "단일 컨테이너"
      ],
      "answer": 0,
      "explanation": "HPC는 High Performance Computing으로 여러 노드의 계산 자원을 활용한다. Beowulf는 고성능 계산 클러스터의 대표적인 접근이다.",
      "memory": "병렬 과학 계산 = HPC",
      "kind": "개념"
    },
    {
      "id": "q116",
      "topic": "application",
      "page": 22,
      "red": true,
      "prompt": "가상 서버·스토리지·네트워크를 제공받고 사용자가 OS를 관리하는 서비스는?",
      "options": [
        "IaaS",
        "PaaS",
        "SaaS",
        "FaaS"
      ],
      "answer": 0,
      "explanation": "IaaS는 인프라를 제공하고 사용자가 OS와 응용을 관리한다. PaaS는 개발·실행 플랫폼, SaaS는 완성된 응용, FaaS는 함수 실행 서비스이다.",
      "memory": "I 인프라 / P 플랫폼 / S 소프트웨어",
      "kind": "개념"
    },
    {
      "id": "q117",
      "topic": "application",
      "page": 22,
      "red": true,
      "prompt": "사용자가 브라우저로 완성된 업무용 응용 서비스를 이용하는 모델은?",
      "options": [
        "SaaS",
        "IaaS",
        "물리 서버 구매",
        "RAID"
      ],
      "answer": 0,
      "explanation": "SaaS는 소프트웨어 기능을 서비스로 제공한다. IaaS는 가상 서버 등 기반 자원을 제공해 더 많은 관리를 사용자가 맡는다.",
      "memory": "완성된 앱을 사용 = SaaS",
      "kind": "개념"
    },
    {
      "id": "q118",
      "topic": "application",
      "page": 22,
      "red": true,
      "prompt": "가상 디스크 형식의 대표 연결로 올바른 것은?",
      "options": [
        "VMware — VMDK",
        "VMware — PNG",
        "VirtualBox — MP3",
        "KVM — CSS"
      ],
      "answer": 0,
      "explanation": "VMDK는 VMware 가상 디스크 형식으로 알려져 있다. VirtualBox의 대표적인 자체 형식은 VDI이며 여러 형식을 지원하므로 전용·유일한 형식이라고 외우지는 않는다.",
      "memory": "VMware VMDK / VirtualBox VDI",
      "kind": "개념"
    },
    {
      "id": "q119",
      "topic": "application",
      "page": 22,
      "red": true,
      "prompt": "대규모 데이터 분산 저장·처리 프레임워크는?",
      "options": [
        "Hadoop",
        "R",
        "CUPS",
        "nano"
      ],
      "answer": 0,
      "explanation": "Hadoop은 분산 저장·처리 생태계이다. R은 통계 분석·시각화 언어, CUPS는 인쇄, nano는 편집기이다.",
      "memory": "Hadoop 분산 처리 / R 통계 분석",
      "kind": "개념"
    },
    {
      "id": "q120",
      "topic": "application",
      "page": 22,
      "red": true,
      "prompt": "다음 중 리눅스 기반 운영체제가 아닌 것은?",
      "options": [
        "QNX",
        "Android",
        "Tizen",
        "webOS"
      ],
      "answer": 0,
      "explanation": "QNX는 독자적인 마이크로커널 기반의 유닉스 계열 실시간 운영체제이다. Android, Tizen, webOS는 리눅스 커널을 기반으로 한다.",
      "memory": "유닉스 계열이라고 모두 리눅스는 아님",
      "kind": "개념"
    },
    {
      "id": "q121",
      "topic": "application",
      "page": 22,
      "red": false,
      "prompt": "서버 구성 관리와 배포를 자동화하는 도구는?",
      "options": [
        "Ansible",
        "Inkscape",
        "LibreOffice",
        "ALSA"
      ],
      "answer": 0,
      "explanation": "Ansible은 구성 관리·프로비저닝·배포 자동화 도구이다. 다른 보기는 각각 그래픽 편집, 오피스, 오디오 관련이다.",
      "memory": "구성·배포 자동화 Ansible",
      "kind": "개념"
    },
    {
      "id": "q122",
      "topic": "application",
      "page": 22,
      "red": false,
      "prompt": "클라우드 인프라를 구축·관리하는 오픈소스 플랫폼은?",
      "options": [
        "OpenStack",
        "OpenBox",
        "OpenSSH",
        "OpenGL"
      ],
      "answer": 0,
      "explanation": "OpenStack은 컴퓨트·스토리지·네트워크 등 클라우드 인프라를 관리한다. OpenBox는 윈도 매니저, OpenSSH는 원격 접속 도구, OpenGL은 그래픽 API이다.",
      "memory": "클라우드 인프라 OpenStack",
      "kind": "개념"
    },
    {
      "id": "q123",
      "topic": "application",
      "page": 23,
      "red": true,
      "prompt": "교육용 소형 싱글 보드 컴퓨터의 대표 사례는?",
      "options": [
        "Raspberry Pi",
        "Kubernetes",
        "Cassandra",
        "GNOME"
      ],
      "answer": 0,
      "explanation": "Raspberry Pi는 소형 싱글 보드 컴퓨터 제품군이다. Kubernetes는 컨테이너 관리, Cassandra는 분산 데이터베이스, GNOME은 데스크톱 환경이다.",
      "memory": "교육용 작은 컴퓨터 Raspberry Pi",
      "kind": "개념"
    },
    {
      "id": "q124",
      "topic": "application",
      "page": 23,
      "red": true,
      "prompt": "Arduino를 가장 적절히 설명한 것은?",
      "options": [
        "마이크로컨트롤러 중심의 오픈소스 전자 개발 플랫폼",
        "리눅스 전용 패키지 저장소",
        "X 서버 인증 프로토콜",
        "소프트웨어 RAID 레벨"
      ],
      "answer": 0,
      "explanation": "전통적인 Arduino 보드는 마이크로컨트롤러 기반이며 센서·액추에이터 제어 등에 쓰인다. 일반적인 PC용 운영체제를 실행하는 컴퓨터와 구분한다.",
      "memory": "Arduino 제어 보드 / Raspberry Pi 컴퓨터",
      "kind": "개념"
    },
    {
      "id": "q125",
      "topic": "application",
      "page": 23,
      "red": true,
      "prompt": "IoT의 핵심 개념은?",
      "options": [
        "사물에 센서·통신 기능을 넣어 네트워크로 연결",
        "모든 디스크를 하나의 파티션으로 포맷",
        "메일을 파일로 압축",
        "셸의 실행 권한 변경"
      ],
      "answer": 0,
      "explanation": "IoT는 Internet of Things로 사물이 데이터를 수집·교환하고 제어되는 연결 환경이다. 나머지는 저장 장치나 파일·권한 작업이다.",
      "memory": "Things = 인터넷에 연결되는 사물",
      "kind": "개념"
    },
    {
      "id": "q126",
      "topic": "application",
      "page": 23,
      "red": true,
      "prompt": "RHEL 호환 배포판으로 함께 묶을 수 있는 것은?",
      "options": [
        "Rocky Linux, AlmaLinux",
        "Ubuntu, Debian",
        "Arch Linux, Gentoo",
        "QNX, iOS"
      ],
      "answer": 0,
      "explanation": "Rocky Linux와 AlmaLinux는 RHEL 호환 생태계의 배포판이다. Ubuntu는 Debian 계열이며 QNX와 iOS는 리눅스 배포판이 아니다.",
      "memory": "RHEL 계열 Rocky·Alma",
      "kind": "개념"
    },
    {
      "id": "q127",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "chmod 754 report.txt 실행 후 일반 권한 표기는?",
      "options": [
        "rwxr-xr--",
        "rwxr-xr-x",
        "rwxr--r--",
        "rw-r-xr--"
      ],
      "answer": 0,
      "explanation": "소유자·그룹·기타 순서로 각 숫자를 읽는다. 7=rwx / 5=r-x / 4=r--이므로 rwxr-xr--이다.",
      "memory": "r=4, w=2, x=1을 각 자리에서 더한다.",
      "kind": "계산"
    },
    {
      "id": "q128",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "chmod 640 report.txt 실행 후 일반 권한 표기는?",
      "options": [
        "rw-r-----",
        "rw-r----x",
        "rw-r-x---",
        "rwxr-----"
      ],
      "answer": 0,
      "explanation": "소유자·그룹·기타 순서로 각 숫자를 읽는다. 6=rw- / 4=r-- / 0=---이므로 rw-r-----이다.",
      "memory": "r=4, w=2, x=1을 각 자리에서 더한다.",
      "kind": "계산"
    },
    {
      "id": "q129",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "chmod 751 report.txt 실행 후 일반 권한 표기는?",
      "options": [
        "rwxr-x--x",
        "rwxr-x---",
        "rwxr----x",
        "rw-r-x--x"
      ],
      "answer": 0,
      "explanation": "소유자·그룹·기타 순서로 각 숫자를 읽는다. 7=rwx / 5=r-x / 1=--x이므로 rwxr-x--x이다.",
      "memory": "r=4, w=2, x=1을 각 자리에서 더한다.",
      "kind": "계산"
    },
    {
      "id": "q130",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "chmod 604 report.txt 실행 후 일반 권한 표기는?",
      "options": [
        "rw----r--",
        "rw----r-x",
        "rw---xr--",
        "rwx---r--"
      ],
      "answer": 0,
      "explanation": "소유자·그룹·기타 순서로 각 숫자를 읽는다. 6=rw- / 0=--- / 4=r--이므로 rw----r--이다.",
      "memory": "r=4, w=2, x=1을 각 자리에서 더한다.",
      "kind": "계산"
    },
    {
      "id": "q131",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "chmod 750 report.txt 실행 후 일반 권한 표기는?",
      "options": [
        "rwxr-x---",
        "rwxr-x--x",
        "rwxr-----",
        "rw-r-x---"
      ],
      "answer": 0,
      "explanation": "소유자·그룹·기타 순서로 각 숫자를 읽는다. 7=rwx / 5=r-x / 0=---이므로 rwxr-x---이다.",
      "memory": "r=4, w=2, x=1을 각 자리에서 더한다.",
      "kind": "계산"
    },
    {
      "id": "q132",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "chmod 644 report.txt 실행 후 일반 권한 표기는?",
      "options": [
        "rw-r--r--",
        "rw-r--r-x",
        "rw-r-xr--",
        "rwxr--r--"
      ],
      "answer": 0,
      "explanation": "소유자·그룹·기타 순서로 각 숫자를 읽는다. 6=rw- / 4=r-- / 4=r--이므로 rw-r--r--이다.",
      "memory": "r=4, w=2, x=1을 각 자리에서 더한다.",
      "kind": "계산"
    },
    {
      "id": "q133",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "chmod 711 report.txt 실행 후 일반 권한 표기는?",
      "options": [
        "rwx--x--x",
        "rwx--x---",
        "rwx-----x",
        "rw---x--x"
      ],
      "answer": 0,
      "explanation": "소유자·그룹·기타 순서로 각 숫자를 읽는다. 7=rwx / 1=--x / 1=--x이므로 rwx--x--x이다.",
      "memory": "r=4, w=2, x=1을 각 자리에서 더한다.",
      "kind": "계산"
    },
    {
      "id": "q134",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "chmod 660 report.txt 실행 후 일반 권한 표기는?",
      "options": [
        "rw-rw----",
        "rw-rw---x",
        "rw-rwx---",
        "rwxrw----"
      ],
      "answer": 0,
      "explanation": "소유자·그룹·기타 순서로 각 숫자를 읽는다. 6=rw- / 6=rw- / 0=---이므로 rw-rw----이다.",
      "memory": "r=4, w=2, x=1을 각 자리에서 더한다.",
      "kind": "계산"
    },
    {
      "id": "q135",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "기본 ACL이 없고 생성 요청 권한이 666일 때, umask 022를 적용한 새 일반 파일의 권한은?",
      "options": [
        "644",
        "645",
        "654",
        "744"
      ],
      "answer": 0,
      "explanation": "umask는 뺄셈이 아니라 해당 권한 비트를 끈다. 666 & ~022 = 644. 일반 파일은 보통 처음부터 실행 권한을 요청하지 않는다.",
      "memory": "요청 권한 AND (NOT umask). 없는 비트는 빼지 않는다.",
      "kind": "계산"
    },
    {
      "id": "q136",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "기본 ACL이 없고 생성 요청 권한이 777일 때, umask 022를 적용한 새 디렉터리의 권한은?",
      "options": [
        "755",
        "754",
        "745",
        "655"
      ],
      "answer": 0,
      "explanation": "umask는 뺄셈이 아니라 해당 권한 비트를 끈다. 777 & ~022 = 755. 일반 파일은 보통 처음부터 실행 권한을 요청하지 않는다.",
      "memory": "요청 권한 AND (NOT umask). 없는 비트는 빼지 않는다.",
      "kind": "계산"
    },
    {
      "id": "q137",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "기본 ACL이 없고 생성 요청 권한이 666일 때, umask 027를 적용한 새 일반 파일의 권한은?",
      "options": [
        "640",
        "641",
        "650",
        "740"
      ],
      "answer": 0,
      "explanation": "umask는 뺄셈이 아니라 해당 권한 비트를 끈다. 666 & ~027 = 640. 일반 파일은 보통 처음부터 실행 권한을 요청하지 않는다.",
      "memory": "요청 권한 AND (NOT umask). 없는 비트는 빼지 않는다.",
      "kind": "계산"
    },
    {
      "id": "q138",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "기본 ACL이 없고 생성 요청 권한이 777일 때, umask 027를 적용한 새 디렉터리의 권한은?",
      "options": [
        "750",
        "751",
        "740",
        "650"
      ],
      "answer": 0,
      "explanation": "umask는 뺄셈이 아니라 해당 권한 비트를 끈다. 777 & ~027 = 750. 일반 파일은 보통 처음부터 실행 권한을 요청하지 않는다.",
      "memory": "요청 권한 AND (NOT umask). 없는 비트는 빼지 않는다.",
      "kind": "계산"
    },
    {
      "id": "q139",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "기본 ACL이 없고 생성 요청 권한이 666일 때, umask 077를 적용한 새 일반 파일의 권한은?",
      "options": [
        "600",
        "601",
        "610",
        "700"
      ],
      "answer": 0,
      "explanation": "umask는 뺄셈이 아니라 해당 권한 비트를 끈다. 666 & ~077 = 600. 일반 파일은 보통 처음부터 실행 권한을 요청하지 않는다.",
      "memory": "요청 권한 AND (NOT umask). 없는 비트는 빼지 않는다.",
      "kind": "계산"
    },
    {
      "id": "q140",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "기본 ACL이 없고 생성 요청 권한이 777일 때, umask 077를 적용한 새 디렉터리의 권한은?",
      "options": [
        "700",
        "701",
        "710",
        "600"
      ],
      "answer": 0,
      "explanation": "umask는 뺄셈이 아니라 해당 권한 비트를 끈다. 777 & ~077 = 700. 일반 파일은 보통 처음부터 실행 권한을 요청하지 않는다.",
      "memory": "요청 권한 AND (NOT umask). 없는 비트는 빼지 않는다.",
      "kind": "계산"
    },
    {
      "id": "q141",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "기본 ACL이 없고 생성 요청 권한이 666일 때, umask 002를 적용한 새 일반 파일의 권한은?",
      "options": [
        "664",
        "665",
        "674",
        "764"
      ],
      "answer": 0,
      "explanation": "umask는 뺄셈이 아니라 해당 권한 비트를 끈다. 666 & ~002 = 664. 일반 파일은 보통 처음부터 실행 권한을 요청하지 않는다.",
      "memory": "요청 권한 AND (NOT umask). 없는 비트는 빼지 않는다.",
      "kind": "계산"
    },
    {
      "id": "q142",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "기본 ACL이 없고 생성 요청 권한이 777일 때, umask 002를 적용한 새 디렉터리의 권한은?",
      "options": [
        "775",
        "774",
        "765",
        "675"
      ],
      "answer": 0,
      "explanation": "umask는 뺄셈이 아니라 해당 권한 비트를 끈다. 777 & ~002 = 775. 일반 파일은 보통 처음부터 실행 권한을 요청하지 않는다.",
      "memory": "요청 권한 AND (NOT umask). 없는 비트는 빼지 않는다.",
      "kind": "계산"
    },
    {
      "id": "q143",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "기본 ACL이 없고 생성 요청 권한이 666일 때, umask 023를 적용한 새 일반 파일의 권한은?",
      "options": [
        "644",
        "645",
        "654",
        "744"
      ],
      "answer": 0,
      "explanation": "umask는 뺄셈이 아니라 해당 권한 비트를 끈다. 666 & ~023 = 644. 일반 파일은 보통 처음부터 실행 권한을 요청하지 않는다.",
      "memory": "요청 권한 AND (NOT umask). 없는 비트는 빼지 않는다.",
      "kind": "계산"
    },
    {
      "id": "q144",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "기본 ACL이 없고 생성 요청 권한이 777일 때, umask 023를 적용한 새 디렉터리의 권한은?",
      "options": [
        "754",
        "755",
        "744",
        "654"
      ],
      "answer": 0,
      "explanation": "umask는 뺄셈이 아니라 해당 권한 비트를 끈다. 777 & ~023 = 754. 일반 파일은 보통 처음부터 실행 권한을 요청하지 않는다.",
      "memory": "요청 권한 AND (NOT umask). 없는 비트는 빼지 않는다.",
      "kind": "계산"
    },
    {
      "id": "q145",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "기본 ACL이 없고 생성 요청 권한이 666일 때, umask 026를 적용한 새 일반 파일의 권한은?",
      "options": [
        "640",
        "641",
        "650",
        "740"
      ],
      "answer": 0,
      "explanation": "umask는 뺄셈이 아니라 해당 권한 비트를 끈다. 666 & ~026 = 640. 일반 파일은 보통 처음부터 실행 권한을 요청하지 않는다.",
      "memory": "요청 권한 AND (NOT umask). 없는 비트는 빼지 않는다.",
      "kind": "계산"
    },
    {
      "id": "q146",
      "topic": "files",
      "page": 5,
      "red": false,
      "prompt": "기본 ACL이 없고 생성 요청 권한이 777일 때, umask 026를 적용한 새 디렉터리의 권한은?",
      "options": [
        "751",
        "750",
        "741",
        "651"
      ],
      "answer": 0,
      "explanation": "umask는 뺄셈이 아니라 해당 권한 비트를 끈다. 777 & ~026 = 751. 일반 파일은 보통 처음부터 실행 권한을 요청하지 않는다.",
      "memory": "요청 권한 AND (NOT umask). 없는 비트는 빼지 않는다.",
      "kind": "계산"
    },
    {
      "id": "q147",
      "topic": "device",
      "page": 15,
      "red": false,
      "prompt": "각 2 TB인 동일 디스크 4개로 RAID 5을 구성한다. 파일 시스템 오버헤드를 제외한 가용 용량은?",
      "options": [
        "6 TB",
        "8 TB",
        "4 TB",
        "10 TB"
      ],
      "answer": 0,
      "explanation": "실제 배열 참여 디스크는 4−0=4개이다. RAID 5의 데이터 용량은 3×2=6 TB이다. 패리티 상당분 1개를 제외한다.",
      "memory": "RAID 0: n / 1(2개): 1 / 5: n−1 / 6: n−2",
      "kind": "계산"
    },
    {
      "id": "q148",
      "topic": "device",
      "page": 15,
      "red": false,
      "prompt": "각 4 TB인 동일 디스크 6개(이 중 핫스페어 1개)로 RAID 5을 구성한다. 파일 시스템 오버헤드를 제외한 가용 용량은?",
      "options": [
        "16 TB",
        "24 TB",
        "12 TB",
        "20 TB"
      ],
      "answer": 0,
      "explanation": "실제 배열 참여 디스크는 6−1=5개이다. RAID 5의 데이터 용량은 4×4=16 TB이다. 패리티 상당분 1개를 제외한다.",
      "memory": "RAID 0: n / 1(2개): 1 / 5: n−1 / 6: n−2",
      "kind": "계산"
    },
    {
      "id": "q149",
      "topic": "device",
      "page": 15,
      "red": false,
      "prompt": "각 10 TB인 동일 디스크 8개(이 중 핫스페어 1개)로 RAID 5을 구성한다. 파일 시스템 오버헤드를 제외한 가용 용량은?",
      "options": [
        "60 TB",
        "80 TB",
        "50 TB",
        "70 TB"
      ],
      "answer": 0,
      "explanation": "실제 배열 참여 디스크는 8−1=7개이다. RAID 5의 데이터 용량은 6×10=60 TB이다. 패리티 상당분 1개를 제외한다.",
      "memory": "RAID 0: n / 1(2개): 1 / 5: n−1 / 6: n−2",
      "kind": "계산"
    },
    {
      "id": "q150",
      "topic": "device",
      "page": 15,
      "red": false,
      "prompt": "각 3 TB인 동일 디스크 4개로 RAID 6을 구성한다. 파일 시스템 오버헤드를 제외한 가용 용량은?",
      "options": [
        "6 TB",
        "12 TB",
        "9 TB",
        "15 TB"
      ],
      "answer": 0,
      "explanation": "실제 배열 참여 디스크는 4−0=4개이다. RAID 6의 데이터 용량은 2×3=6 TB이다. 패리티 상당분 2개를 제외한다.",
      "memory": "RAID 0: n / 1(2개): 1 / 5: n−1 / 6: n−2",
      "kind": "계산"
    },
    {
      "id": "q151",
      "topic": "device",
      "page": 15,
      "red": false,
      "prompt": "각 2 TB인 동일 디스크 7개로 RAID 6을 구성한다. 파일 시스템 오버헤드를 제외한 가용 용량은?",
      "options": [
        "10 TB",
        "14 TB",
        "12 TB",
        "16 TB"
      ],
      "answer": 0,
      "explanation": "실제 배열 참여 디스크는 7−0=7개이다. RAID 6의 데이터 용량은 5×2=10 TB이다. 패리티 상당분 2개를 제외한다.",
      "memory": "RAID 0: n / 1(2개): 1 / 5: n−1 / 6: n−2",
      "kind": "계산"
    },
    {
      "id": "q152",
      "topic": "device",
      "page": 15,
      "red": false,
      "prompt": "각 4 TB인 동일 디스크 8개(이 중 핫스페어 1개)로 RAID 6을 구성한다. 파일 시스템 오버헤드를 제외한 가용 용량은?",
      "options": [
        "20 TB",
        "32 TB",
        "24 TB",
        "28 TB"
      ],
      "answer": 0,
      "explanation": "실제 배열 참여 디스크는 8−1=7개이다. RAID 6의 데이터 용량은 5×4=20 TB이다. 패리티 상당분 2개를 제외한다.",
      "memory": "RAID 0: n / 1(2개): 1 / 5: n−1 / 6: n−2",
      "kind": "계산"
    },
    {
      "id": "q153",
      "topic": "device",
      "page": 15,
      "red": true,
      "prompt": "각 2 TB인 동일 디스크 3개로 RAID 0을 구성한다. 파일 시스템 오버헤드를 제외한 가용 용량은?",
      "options": [
        "6 TB",
        "4 TB",
        "2 TB",
        "8 TB"
      ],
      "answer": 0,
      "explanation": "실제 배열 참여 디스크는 3−0=3개이다. RAID 0의 데이터 용량은 3×2=6 TB이다. 패리티 디스크 상당분을 차감하지 않는다.",
      "memory": "RAID 0: n / 1(2개): 1 / 5: n−1 / 6: n−2",
      "kind": "계산"
    },
    {
      "id": "q154",
      "topic": "device",
      "page": 15,
      "red": false,
      "prompt": "각 6 TB인 동일 디스크 2개로 RAID 1을 구성한다. 파일 시스템 오버헤드를 제외한 가용 용량은?",
      "options": [
        "6 TB",
        "12 TB",
        "18 TB",
        "24 TB"
      ],
      "answer": 0,
      "explanation": "실제 배열 참여 디스크는 2−0=2개이다. 2개 미러링은 한 디스크 용량이므로 6 TB이다.",
      "memory": "RAID 0: n / 1(2개): 1 / 5: n−1 / 6: n−2",
      "kind": "계산"
    },
    {
      "id": "q155",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "호스트 192.168.7.78/26가 속한 서브넷의 네트워크 주소는?",
      "options": [
        "192.168.7.64",
        "192.168.7.127",
        "192.168.7.65",
        "192.168.7.126"
      ],
      "answer": 0,
      "explanation": "/26의 블록 크기는 2^6=64이다. 소속 구간은 192.168.7.64 ~ 192.168.7.127. 첫 주소는 네트워크, 마지막은 브로드캐스트이다.",
      "memory": "블록 크기 → 소속 구간 → 처음/마지막",
      "kind": "계산"
    },
    {
      "id": "q156",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "호스트 192.168.7.78/26가 속한 서브넷의 브로드캐스트 주소는?",
      "options": [
        "192.168.7.127",
        "192.168.7.64",
        "192.168.7.65",
        "192.168.7.126"
      ],
      "answer": 0,
      "explanation": "/26의 블록 크기는 2^6=64이다. 소속 구간은 192.168.7.64 ~ 192.168.7.127. 첫 주소는 네트워크, 마지막은 브로드캐스트이다.",
      "memory": "블록 크기 → 소속 구간 → 처음/마지막",
      "kind": "계산"
    },
    {
      "id": "q157",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "호스트 192.168.12.142/27가 속한 서브넷의 네트워크 주소는?",
      "options": [
        "192.168.12.128",
        "192.168.12.159",
        "192.168.12.129",
        "192.168.12.158"
      ],
      "answer": 0,
      "explanation": "/27의 블록 크기는 2^5=32이다. 소속 구간은 192.168.12.128 ~ 192.168.12.159. 첫 주소는 네트워크, 마지막은 브로드캐스트이다.",
      "memory": "블록 크기 → 소속 구간 → 처음/마지막",
      "kind": "계산"
    },
    {
      "id": "q158",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "호스트 192.168.12.142/27가 속한 서브넷의 브로드캐스트 주소는?",
      "options": [
        "192.168.12.159",
        "192.168.12.128",
        "192.168.12.129",
        "192.168.12.158"
      ],
      "answer": 0,
      "explanation": "/27의 블록 크기는 2^5=32이다. 소속 구간은 192.168.12.128 ~ 192.168.12.159. 첫 주소는 네트워크, 마지막은 브로드캐스트이다.",
      "memory": "블록 크기 → 소속 구간 → 처음/마지막",
      "kind": "계산"
    },
    {
      "id": "q159",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "호스트 192.168.30.201/28가 속한 서브넷의 네트워크 주소는?",
      "options": [
        "192.168.30.192",
        "192.168.30.207",
        "192.168.30.193",
        "192.168.30.206"
      ],
      "answer": 0,
      "explanation": "/28의 블록 크기는 2^4=16이다. 소속 구간은 192.168.30.192 ~ 192.168.30.207. 첫 주소는 네트워크, 마지막은 브로드캐스트이다.",
      "memory": "블록 크기 → 소속 구간 → 처음/마지막",
      "kind": "계산"
    },
    {
      "id": "q160",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "호스트 192.168.30.201/28가 속한 서브넷의 브로드캐스트 주소는?",
      "options": [
        "192.168.30.207",
        "192.168.30.192",
        "192.168.30.193",
        "192.168.30.206"
      ],
      "answer": 0,
      "explanation": "/28의 블록 크기는 2^4=16이다. 소속 구간은 192.168.30.192 ~ 192.168.30.207. 첫 주소는 네트워크, 마지막은 브로드캐스트이다.",
      "memory": "블록 크기 → 소속 구간 → 처음/마지막",
      "kind": "계산"
    },
    {
      "id": "q161",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "호스트 192.168.8.91/25가 속한 서브넷의 네트워크 주소는?",
      "options": [
        "192.168.8.0",
        "192.168.8.127",
        "192.168.8.1",
        "192.168.8.126"
      ],
      "answer": 0,
      "explanation": "/25의 블록 크기는 2^7=128이다. 소속 구간은 192.168.8.0 ~ 192.168.8.127. 첫 주소는 네트워크, 마지막은 브로드캐스트이다.",
      "memory": "블록 크기 → 소속 구간 → 처음/마지막",
      "kind": "계산"
    },
    {
      "id": "q162",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "호스트 192.168.8.91/25가 속한 서브넷의 브로드캐스트 주소는?",
      "options": [
        "192.168.8.127",
        "192.168.8.0",
        "192.168.8.1",
        "192.168.8.126"
      ],
      "answer": 0,
      "explanation": "/25의 블록 크기는 2^7=128이다. 소속 구간은 192.168.8.0 ~ 192.168.8.127. 첫 주소는 네트워크, 마지막은 브로드캐스트이다.",
      "memory": "블록 크기 → 소속 구간 → 처음/마지막",
      "kind": "계산"
    },
    {
      "id": "q163",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "일반적인 IPv4 /25 서브넷 하나에서 네트워크·브로드캐스트 주소를 제외한 사용 가능한 주소 수는? (게이트웨이용 주소는 추가 차감하지 않음)",
      "options": [
        "126",
        "128",
        "127",
        "125"
      ],
      "answer": 0,
      "explanation": "호스트 비트는 32−25=7개이다. 전체 128개에서 네트워크·브로드캐스트 2개를 제외하면 126개이다. 별도 예약 조건이 없으므로 게이트웨이 몫을 추가로 빼지 않는다.",
      "memory": "사용 가능 = 2^(호스트 비트) − 2",
      "kind": "계산"
    },
    {
      "id": "q164",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "일반적인 IPv4 /26 서브넷 하나에서 네트워크·브로드캐스트 주소를 제외한 사용 가능한 주소 수는? (게이트웨이용 주소는 추가 차감하지 않음)",
      "options": [
        "62",
        "64",
        "63",
        "61"
      ],
      "answer": 0,
      "explanation": "호스트 비트는 32−26=6개이다. 전체 64개에서 네트워크·브로드캐스트 2개를 제외하면 62개이다. 별도 예약 조건이 없으므로 게이트웨이 몫을 추가로 빼지 않는다.",
      "memory": "사용 가능 = 2^(호스트 비트) − 2",
      "kind": "계산"
    },
    {
      "id": "q165",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "일반적인 IPv4 /27 서브넷 하나에서 네트워크·브로드캐스트 주소를 제외한 사용 가능한 주소 수는? (게이트웨이용 주소는 추가 차감하지 않음)",
      "options": [
        "30",
        "32",
        "31",
        "29"
      ],
      "answer": 0,
      "explanation": "호스트 비트는 32−27=5개이다. 전체 32개에서 네트워크·브로드캐스트 2개를 제외하면 30개이다. 별도 예약 조건이 없으므로 게이트웨이 몫을 추가로 빼지 않는다.",
      "memory": "사용 가능 = 2^(호스트 비트) − 2",
      "kind": "계산"
    },
    {
      "id": "q166",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "일반적인 IPv4 /28 서브넷 하나에서 네트워크·브로드캐스트 주소를 제외한 사용 가능한 주소 수는? (게이트웨이용 주소는 추가 차감하지 않음)",
      "options": [
        "14",
        "16",
        "15",
        "13"
      ],
      "answer": 0,
      "explanation": "호스트 비트는 32−28=4개이다. 전체 16개에서 네트워크·브로드캐스트 2개를 제외하면 14개이다. 별도 예약 조건이 없으므로 게이트웨이 몫을 추가로 빼지 않는다.",
      "memory": "사용 가능 = 2^(호스트 비트) − 2",
      "kind": "계산"
    },
    {
      "id": "q167",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "일반적인 IPv4 /29 서브넷 하나에서 네트워크·브로드캐스트 주소를 제외한 사용 가능한 주소 수는? (게이트웨이용 주소는 추가 차감하지 않음)",
      "options": [
        "6",
        "8",
        "7",
        "5"
      ],
      "answer": 0,
      "explanation": "호스트 비트는 32−29=3개이다. 전체 8개에서 네트워크·브로드캐스트 2개를 제외하면 6개이다. 별도 예약 조건이 없으므로 게이트웨이 몫을 추가로 빼지 않는다.",
      "memory": "사용 가능 = 2^(호스트 비트) − 2",
      "kind": "계산"
    },
    {
      "id": "q168",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "IPv4 프리픽스 /20에 해당하는 서브넷 마스크는?",
      "options": [
        "255.255.240.0",
        "255.255.224.0",
        "255.255.248.0",
        "255.255.192.0"
      ],
      "answer": 0,
      "explanation": "왼쪽부터 1을 20개 채운다. 8비트가 찬 옥텟은 255이다. 결과는 255.255.240.0이다.",
      "memory": "옥텟의 1 개수: 1→128, 2→192, 3→224, 4→240, 5→248",
      "kind": "계산"
    },
    {
      "id": "q169",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "IPv4 프리픽스 /24에 해당하는 서브넷 마스크는?",
      "options": [
        "255.255.255.0",
        "255.255.254.0",
        "255.255.255.128",
        "255.255.252.0"
      ],
      "answer": 0,
      "explanation": "왼쪽부터 1을 24개 채운다. 8비트가 찬 옥텟은 255이다. 결과는 255.255.255.0이다.",
      "memory": "옥텟의 1 개수: 1→128, 2→192, 3→224, 4→240, 5→248",
      "kind": "계산"
    },
    {
      "id": "q170",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "IPv4 프리픽스 /26에 해당하는 서브넷 마스크는?",
      "options": [
        "255.255.255.192",
        "255.255.255.128",
        "255.255.255.224",
        "255.255.255.0"
      ],
      "answer": 0,
      "explanation": "왼쪽부터 1을 26개 채운다. 8비트가 찬 옥텟은 255이다. 결과는 255.255.255.192이다.",
      "memory": "옥텟의 1 개수: 1→128, 2→192, 3→224, 4→240, 5→248",
      "kind": "계산"
    },
    {
      "id": "q171",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "IPv4 프리픽스 /27에 해당하는 서브넷 마스크는?",
      "options": [
        "255.255.255.224",
        "255.255.255.192",
        "255.255.255.240",
        "255.255.255.128"
      ],
      "answer": 0,
      "explanation": "왼쪽부터 1을 27개 채운다. 8비트가 찬 옥텟은 255이다. 결과는 255.255.255.224이다.",
      "memory": "옥텟의 1 개수: 1→128, 2→192, 3→224, 4→240, 5→248",
      "kind": "계산"
    },
    {
      "id": "q172",
      "topic": "network",
      "page": 20,
      "red": false,
      "prompt": "IPv4 프리픽스 /28에 해당하는 서브넷 마스크는?",
      "options": [
        "255.255.255.240",
        "255.255.255.224",
        "255.255.255.248",
        "255.255.255.192"
      ],
      "answer": 0,
      "explanation": "왼쪽부터 1을 28개 채운다. 8비트가 찬 옥텟은 255이다. 결과는 255.255.255.240이다.",
      "memory": "옥텟의 1 개수: 1→128, 2→192, 3→224, 4→240, 5→248",
      "kind": "계산"
    },
    {
      "id": "q173",
      "topic": "process",
      "page": 10,
      "red": true,
      "prompt": "사용자 crontab의 시간 부분이 */15 * * * *일 때 실행 일정은?",
      "options": [
        "매시간 0·15·30·45분",
        "매시간 15분에만",
        "매일 15시에",
        "매월 15일에"
      ],
      "answer": 0,
      "explanation": "분 필드 */15는 0부터 15분 간격이다.",
      "memory": "분 시 일 월 요일 / , 나열 / - 범위 / */ 간격",
      "kind": "적용"
    },
    {
      "id": "q174",
      "topic": "process",
      "page": 10,
      "red": true,
      "prompt": "사용자 crontab의 시간 부분이 5 2 * * 0일 때 실행 일정은?",
      "options": [
        "매주 일요일 02:05",
        "매주 일요일 05:02",
        "매일 02:05",
        "매월 2일 00:05"
      ],
      "answer": 0,
      "explanation": "요일 0은 일요일이다. 앞의 5는 분, 2는 시이다.",
      "memory": "분 시 일 월 요일 / , 나열 / - 범위 / */ 간격",
      "kind": "적용"
    },
    {
      "id": "q175",
      "topic": "process",
      "page": 10,
      "red": true,
      "prompt": "사용자 crontab의 시간 부분이 0 18 1 * *일 때 실행 일정은?",
      "options": [
        "매월 1일 18:00",
        "매주 월요일 18:00",
        "매일 01:18",
        "매년 1월 18일"
      ],
      "answer": 0,
      "explanation": "일 필드가 1이고 월·요일에는 제한이 없다.",
      "memory": "분 시 일 월 요일 / , 나열 / - 범위 / */ 간격",
      "kind": "적용"
    },
    {
      "id": "q176",
      "topic": "process",
      "page": 10,
      "red": true,
      "prompt": "사용자 crontab의 시간 부분이 10 8 * * 1,3,5일 때 실행 일정은?",
      "options": [
        "매주 월·수·금 08:10",
        "매주 월~금 08:10",
        "매주 월·수·금 10:08",
        "매월 1·3·5일 08:10"
      ],
      "answer": 0,
      "explanation": "쉼표는 나열이다. 범위를 지정하는 하이픈과 다르다.",
      "memory": "분 시 일 월 요일 / , 나열 / - 범위 / */ 간격",
      "kind": "적용"
    },
    {
      "id": "basic-001",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "현재 작업 디렉터리의 경로를 출력하는 명령은?",
      "options": [
        "pwd",
        "ls",
        "cd",
        "mkdir"
      ],
      "answer": 0,
      "explanation": "pwd는 현재 경로, ls는 디렉터리 항목 목록을 출력합니다.",
      "memory": "pwd는 현재 경로, ls는 디렉터리 항목 목록을 출력합니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/coreutils.html"
    },
    {
      "id": "basic-002",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "숨김 항목까지 긴 형식으로 목록을 확인하려면?",
      "options": [
        "ls -al",
        "pwd -a",
        "cd -l",
        "mkdir -a"
      ],
      "answer": 0,
      "explanation": "ls의 -a는 숨김 항목 포함, -l은 자세한 목록입니다.",
      "memory": "ls의 -a는 숨김 항목 포함, -l은 자세한 목록입니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/coreutils.html"
    },
    {
      "id": "basic-003",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "상위 디렉터리로 이동하려면?",
      "options": [
        "cd ..",
        "pwd ..",
        "ls ..",
        "mkdir .."
      ],
      "answer": 0,
      "explanation": "cd는 이동합니다. ls ..는 상위 디렉터리 내용을 볼 뿐 현재 위치는 바꾸지 않습니다.",
      "memory": "cd는 이동합니다. ls ..는 상위 디렉터리 내용을 볼 뿐 현재 위치는 바꾸지 않습니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://www.gnu.org/software/bash/manual/bash.html"
    },
    {
      "id": "basic-004",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "없는 상위 경로까지 만들면서 work/log 디렉터리를 생성하려면?",
      "options": [
        "mkdir -p work/log",
        "touch work/log",
        "rmdir work/log",
        "cd work/log"
      ],
      "answer": 0,
      "explanation": "mkdir -p는 필요한 상위 디렉터리를 함께 만듭니다.",
      "memory": "mkdir -p는 필요한 상위 디렉터리를 함께 만듭니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/coreutils.html"
    },
    {
      "id": "basic-005",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "rmdir와 rm -r의 차이를 올바르게 설명한 것은?",
      "options": [
        "rmdir는 빈 디렉터리만, rm -r은 내용이 있는 디렉터리도 제거한다",
        "둘 다 빈 디렉터리만 제거한다",
        "rmdir는 파일 복사, rm -r은 이동이다",
        "둘 다 휴지통으로 이동한다"
      ],
      "answer": 0,
      "explanation": "rmdir는 빈 디렉터리 제거용입니다. rm -r은 하위 항목까지 삭제하며 휴지통으로 보내지 않습니다.",
      "memory": "rmdir는 빈 디렉터리 제거용입니다. rm -r은 하위 항목까지 삭제하며 휴지통으로 보내지 않습니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/coreutils.html"
    },
    {
      "id": "basic-006",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "내용이 있는 기존 파일 memo.txt에 touch memo.txt를 실행하면?",
      "options": [
        "기존 내용을 유지하며 시간 정보를 갱신한다",
        "파일 내용을 모두 비운다",
        "파일을 삭제한다",
        "파일을 디렉터리로 바꾼다"
      ],
      "answer": 0,
      "explanation": "touch는 시간 갱신 명령입니다. 파일이 없을 때 기본적으로 빈 파일을 만듭니다.",
      "memory": "touch는 시간 갱신 명령입니다. 파일이 없을 때 기본적으로 빈 파일을 만듭니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/coreutils.html"
    },
    {
      "id": "basic-007",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "원본 a.txt를 남기고 b.txt를 만든 뒤 b.txt의 이름을 c.txt로 바꾸려면?",
      "options": [
        "cp a.txt b.txt 후 mv b.txt c.txt",
        "mv a.txt b.txt 후 cp b.txt c.txt",
        "rm a.txt 후 touch c.txt",
        "cp a.txt b.txt 후 rmdir b.txt"
      ],
      "answer": 0,
      "explanation": "cp는 원본을 남겨 복사하고 mv는 이동 또는 이름 변경을 합니다.",
      "memory": "cp는 원본을 남겨 복사하고 mv는 이동 또는 이름 변경을 합니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/coreutils.html"
    },
    {
      "id": "basic-008",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "파일 a.txt와 b.txt 내용을 순서대로 출력하려면?",
      "options": [
        "cat a.txt b.txt",
        "cp a.txt b.txt",
        "mv a.txt b.txt",
        "touch a.txt b.txt"
      ],
      "answer": 0,
      "explanation": "cat은 여러 파일 내용을 순서대로 표준 출력에 이어 보여줍니다.",
      "memory": "cat은 여러 파일 내용을 순서대로 표준 출력에 이어 보여줍니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/coreutils.html"
    },
    {
      "id": "basic-009",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "파일 앞 5줄만 확인하려면?",
      "options": [
        "head -n 5 app.log",
        "tail -n 5 app.log",
        "cat -n app.log",
        "ls -l app.log"
      ],
      "answer": 0,
      "explanation": "head는 앞부분, tail은 뒷부분입니다. cat -n은 줄 번호를 붙여 출력합니다.",
      "memory": "head는 앞부분, tail은 뒷부분입니다. cat -n은 줄 번호를 붙여 출력합니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/coreutils.html"
    },
    {
      "id": "basic-010",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "파일의 마지막 20줄을 확인하려면?",
      "options": [
        "tail -n 20 app.log",
        "head -n 20 app.log",
        "touch app.log",
        "pwd app.log"
      ],
      "answer": 0,
      "explanation": "tail -n 20은 파일 끝 20줄을 출력합니다.",
      "memory": "tail -n 20은 파일 끝 20줄을 출력합니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/coreutils.html"
    },
    {
      "id": "basic-011",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "로그 파일에 새로 추가되는 내용을 계속 보려면?",
      "options": [
        "tail -f app.log",
        "head -n 10 app.log",
        "cat app.log",
        "ls -al app.log"
      ],
      "answer": 0,
      "explanation": "tail -f는 끝에 추가되는 내용을 계속 관찰합니다.",
      "memory": "tail -f는 끝에 추가되는 내용을 계속 관찰합니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/coreutils.html"
    },
    {
      "id": "basic-012",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "more와 less의 공통 역할은?",
      "options": [
        "긴 텍스트를 페이지 단위로 보기",
        "파일의 소유자 변경",
        "압축 파일 생성",
        "프로세스 종료"
      ],
      "answer": 0,
      "explanation": "more와 less는 텍스트 페이저입니다. less는 앞뒤 이동과 검색에 편리합니다.",
      "memory": "more와 less는 텍스트 페이저입니다. less는 앞뒤 이동과 검색에 편리합니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/coreutils.html"
    },
    {
      "id": "basic-013",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "현재 디렉터리 아래에서 이름이 .log로 끝나는 파일을 찾으려면?",
      "options": [
        "find . -name '*.log'",
        "grep '*.log' .",
        "which '*.log'",
        "whereis '*.log'"
      ],
      "answer": 0,
      "explanation": "find는 경로 아래에서 이름 등의 조건으로 찾습니다. 패턴은 따옴표로 감쌉니다.",
      "memory": "find는 경로 아래에서 이름 등의 조건으로 찾습니다. 패턴은 따옴표로 감쌉니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://www.gnu.org/software/findutils/manual/html_mono/find.html"
    },
    {
      "id": "basic-014",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "app.log 내용에서 ERROR가 있는 줄을 줄 번호와 함께 찾으려면?",
      "options": [
        "grep -n ERROR app.log",
        "find app.log -name ERROR",
        "which ERROR",
        "whereis app.log"
      ],
      "answer": 0,
      "explanation": "grep -n은 패턴과 일치하는 줄에 줄 번호를 붙입니다.",
      "memory": "grep -n은 패턴과 일치하는 줄에 줄 번호를 붙입니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://www.gnu.org/software/grep/manual/grep.html"
    },
    {
      "id": "basic-015",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "일반적으로 PATH에서 실행 파일의 위치를 찾는 명령은?",
      "options": [
        "which",
        "grep",
        "head",
        "who"
      ],
      "answer": 0,
      "explanation": "which는 PATH에서 실행 파일을 검색합니다. 셸 내장 명령·함수 해석까지 확인하려면 type을 사용합니다.",
      "memory": "which는 PATH에서 실행 파일을 검색합니다. 셸 내장 명령·함수 해석까지 확인하려면 type을 사용합니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://www.gnu.org/software/bash/manual/bash.html"
    },
    {
      "id": "basic-016",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "명령의 바이너리·소스·매뉴얼 위치를 찾는 도구는?",
      "options": [
        "whereis",
        "grep",
        "tail",
        "jobs"
      ],
      "answer": 0,
      "explanation": "whereis는 명령 관련 바이너리·소스·매뉴얼 위치를 찾습니다.",
      "memory": "whereis는 명령 관련 바이너리·소스·매뉴얼 위치를 찾습니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://man7.org/linux/man-pages/man1/whereis.1.html"
    },
    {
      "id": "basic-017",
      "topic": "package",
      "page": 0,
      "red": false,
      "prompt": "docs 디렉터리와 하위 항목을 ZIP으로 묶어 압축하려면?",
      "options": [
        "zip -r backup.zip docs/",
        "gzip docs/",
        "gunzip backup.zip",
        "unzip -r docs/"
      ],
      "answer": 0,
      "explanation": "zip -r은 디렉터리의 하위 항목까지 ZIP 파일에 포함합니다. gzip은 ZIP 생성 명령이 아닙니다.",
      "memory": "zip -r은 디렉터리의 하위 항목까지 ZIP 파일에 포함합니다. gzip은 ZIP 생성 명령이 아닙니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://infozip.sourceforge.net/"
    },
    {
      "id": "basic-018",
      "topic": "package",
      "page": 0,
      "red": false,
      "prompt": "backup.zip과 app.log.gz를 각각 압축 해제하는 명령 조합은?",
      "options": [
        "unzip backup.zip / gunzip app.log.gz",
        "gunzip backup.zip / unzip app.log.gz",
        "tar -cf backup.zip / gzip app.log.gz",
        "zip backup.zip / gzip app.log.gz"
      ],
      "answer": 0,
      "explanation": "ZIP은 unzip, gzip 형식은 gunzip 또는 gzip -d로 해제합니다.",
      "memory": "ZIP은 unzip, gzip 형식은 gunzip 또는 gzip -d로 해제합니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://infozip.sourceforge.net/"
    },
    {
      "id": "basic-019",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "alice 계정과 홈 디렉터리를 함께 만들려면?",
      "options": [
        "useradd -m alice",
        "su - alice",
        "passwd alice",
        "who alice"
      ],
      "answer": 0,
      "explanation": "useradd -m은 계정과 홈 디렉터리를 생성합니다.",
      "memory": "useradd -m은 계정과 홈 디렉터리를 생성합니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://man7.org/linux/man-pages/man8/useradd.8.html"
    },
    {
      "id": "basic-020",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "계정을 삭제하며 홈 디렉터리와 메일 스풀도 제거하는 명령은?",
      "options": [
        "userdel -r alice",
        "passwd -r alice",
        "su - alice",
        "useradd -r alice"
      ],
      "answer": 0,
      "explanation": "userdel -r의 r은 홈·메일 스풀 제거입니다. useradd -r은 시스템 계정 생성으로 뜻이 다릅니다.",
      "memory": "userdel -r의 r은 홈·메일 스풀 제거입니다. useradd -r은 시스템 계정 생성으로 뜻이 다릅니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://man7.org/linux/man-pages/man8/userdel.8.html"
    },
    {
      "id": "basic-021",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "현재 사용자의 암호를 변경하는 명령은?",
      "options": [
        "passwd",
        "whoami",
        "useradd",
        "chown"
      ],
      "answer": 0,
      "explanation": "passwd는 암호 변경 명령이고 /etc/passwd는 계정 정보 파일입니다.",
      "memory": "passwd는 암호 변경 명령이고 /etc/passwd는 계정 정보 파일입니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://man7.org/linux/man-pages/man1/passwd.1.html"
    },
    {
      "id": "basic-022",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "기존 alice 사용자로 로그인과 유사한 환경을 갖추어 전환하려면?",
      "options": [
        "su - alice",
        "useradd alice",
        "userdel alice",
        "passwd alice"
      ],
      "answer": 0,
      "explanation": "su -는 로그인과 유사한 환경으로 사용자 전환을 합니다. 계정 생성은 useradd입니다.",
      "memory": "su -는 로그인과 유사한 환경으로 사용자 전환을 합니다. 계정 생성은 useradd입니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://man7.org/linux/man-pages/man1/su.1.html"
    },
    {
      "id": "basic-023",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "systemd 환경에서 10분 뒤 시스템 종료를 예약하려면?",
      "options": [
        "shutdown -h +10",
        "reboot +10",
        "date +10",
        "who -h"
      ],
      "answer": 0,
      "explanation": "shutdown의 +10은 10분 뒤를 뜻합니다.",
      "memory": "shutdown의 +10은 10분 뒤를 뜻합니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://man7.org/linux/man-pages/man8/shutdown.8.html"
    },
    {
      "id": "basic-024",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "systemd 환경에서 예약한 shutdown을 취소하려면?",
      "options": [
        "shutdown -c",
        "shutdown -r now",
        "reboot",
        "date -c"
      ],
      "answer": 0,
      "explanation": "shutdown -c는 예약된 종료를 취소합니다.",
      "memory": "shutdown -c는 예약된 종료를 취소합니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://man7.org/linux/man-pages/man8/shutdown.8.html"
    },
    {
      "id": "basic-025",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "시스템을 재부팅하도록 요청하는 명령은?",
      "options": [
        "reboot",
        "who",
        "date",
        "pwd"
      ],
      "answer": 0,
      "explanation": "reboot는 재부팅 요청이며 shutdown -r now도 즉시 재부팅 요청입니다.",
      "memory": "reboot는 재부팅 요청이며 shutdown -r now도 즉시 재부팅 요청입니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://man7.org/linux/man-pages/man8/reboot.8.html"
    },
    {
      "id": "basic-026",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "현재 날짜와 시간을 출력하는 명령은?",
      "options": [
        "date",
        "whoami",
        "jobs",
        "pwd"
      ],
      "answer": 0,
      "explanation": "date는 날짜·시간을 표시합니다. date +%F로 연-월-일 형식을 지정할 수 있습니다.",
      "memory": "date는 날짜·시간을 표시합니다. date +%F로 연-월-일 형식을 지정할 수 있습니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/coreutils.html"
    },
    {
      "id": "basic-027",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "who와 whoami의 차이는?",
      "options": [
        "who는 로그인 세션, whoami는 현재 유효 사용자 이름",
        "who는 현재 경로, whoami는 파일 목록",
        "who는 계정 생성, whoami는 계정 삭제",
        "둘 다 모든 계정의 암호를 출력한다"
      ],
      "answer": 0,
      "explanation": "who는 로그인 세션 정보를, whoami는 현재 유효 사용자 이름을 출력합니다.",
      "memory": "who는 로그인 세션 정보를, whoami는 현재 유효 사용자 이름을 출력합니다.",
      "kind": "자체 제작 · 기본 명령어",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/coreutils.html"
    },
    {
      "id": "recall-001",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "ls -l 출력이 다음과 같다. 숫자 3과 1200의 의미는?\n-rw-r--r-- 3 alice dev 1200 Sep 11 10:00 memo.txt",
      "options": [
        "3은 하드 링크 수, 1200은 파일 크기(바이트)",
        "3은 파일 크기, 1200은 PID",
        "3은 소유자 UID, 1200은 그룹 GID",
        "3은 수정 횟수, 1200은 디스크 여유 공간"
      ],
      "answer": 0,
      "explanation": "첫 필드 뒤 숫자는 하드 링크 수입니다. 소유자 alice, 그룹 dev 다음 1200은 일반 파일 크기(바이트)입니다.",
      "memory": "첫 필드 뒤 숫자는 하드 링크 수입니다. 소유자 alice, 그룹 dev 다음 1200은 일반 파일 크기(바이트)입니다.",
      "kind": "자체 제작 · 복기 유형 보완",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/html_node/What-information-is-listed.html",
      "recallEvidence": "복기에 ls -l 필드와 s 의미가 언급됨. 제시된 전체 출력·질문·보기는 재구성."
    },
    {
      "id": "recall-002",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "기본 ls -l 출력의 날짜·시간 필드는 일반적으로 무엇인가?",
      "options": [
        "파일 내용의 최종 수정 시각(mtime)",
        "항상 파일 생성 시각",
        "마지막 로그인 시각",
        "현재 시스템 시각"
      ],
      "answer": 0,
      "explanation": "기본 ls -l의 시간은 mtime입니다. -u나 -c 등 옵션으로 다른 시간 정보를 선택할 수 있습니다.",
      "memory": "기본 ls -l의 시간은 mtime입니다. -u나 -c 등 옵션으로 다른 시간 정보를 선택할 수 있습니다.",
      "kind": "자체 제작 · 복기 유형 보완",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/html_node/What-information-is-listed.html",
      "recallEvidence": "복기에 ls -l 필드와 s 의미가 언급됨. 제시된 전체 출력·질문·보기는 재구성."
    },
    {
      "id": "recall-003",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "일반 실행 파일 권한이 -rwsr-xr-x이다. 소유자 실행 위치의 s는?",
      "options": [
        "Set-UID와 소유자 실행 비트가 함께 설정됨",
        "Set-GID만 설정됨",
        "Sticky bit만 설정됨",
        "소유자 실행 비트가 없는 Set-UID"
      ],
      "answer": 0,
      "explanation": "소유자 실행 위치의 s는 Set-UID입니다. 그룹 실행 위치라면 Set-GID이며 Sticky bit는 기타 사용자 실행 위치의 t/T입니다. 실제 실행에 적용되는지는 파일 종류·마운트 옵션 등의 제약도 받습니다.",
      "memory": "소유자 실행 위치의 s는 Set-UID입니다. 그룹 실행 위치라면 Set-GID이며 Sticky bit는 기타 사용자 실행 위치의 t/T입니다. 실제 실행에 적용되는지는 파일 종류·마운트 옵션 등의 제약도 받습니다.",
      "kind": "자체 제작 · 복기 유형 보완",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/html_node/Mode-Structure.html",
      "recallEvidence": "복기에 ls -l 필드와 s 의미가 언급됨. 제시된 전체 출력·질문·보기는 재구성."
    },
    {
      "id": "recall-004",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "다음 권한에서 특수 비트를 순서대로 연결한 것은?\n-rwxr-sr-x / drwxrwxrwt",
      "options": [
        "Set-GID / Sticky bit",
        "Set-UID / Set-GID",
        "Sticky bit / Set-UID",
        "Set-UID / Sticky bit"
      ],
      "answer": 0,
      "explanation": "그룹 실행 위치 s는 Set-GID, 기타 사용자 실행 위치 t는 Sticky bit입니다. Sticky bit 디렉터리는 일반적으로 파일 소유자·디렉터리 소유자·권한 있는 관리자에게 삭제를 허용합니다.",
      "memory": "그룹 실행 위치 s는 Set-GID, 기타 사용자 실행 위치 t는 Sticky bit입니다. Sticky bit 디렉터리는 일반적으로 파일 소유자·디렉터리 소유자·권한 있는 관리자에게 삭제를 허용합니다.",
      "kind": "자체 제작 · 복기 유형 보완",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/html_node/Mode-Structure.html",
      "recallEvidence": "복기에 ls -l 필드와 s 의미가 언급됨. 제시된 전체 출력·질문·보기는 재구성."
    },
    {
      "id": "recall-005",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "초기 환경에 LM_RECALL 변수가 없고 시작 파일을 읽지 않는 Bash에서 실행한다. 출력은?\nLM_RECALL=linux; bash --noprofile --norc -c 'printf \"<%s>\\n\" \"$LM_RECALL\"' ",
      "options": [
        "<>",
        "<linux>",
        "<$LM_RECALL>",
        "<bash>"
      ],
      "answer": 0,
      "explanation": "export하지 않은 변수는 새 Bash 실행 환경으로 전달되지 않습니다. 자식의 LM_RECALL은 미설정이므로 빈 문자열입니다.",
      "memory": "export하지 않은 변수는 새 Bash 실행 환경으로 전달되지 않습니다. 자식의 LM_RECALL은 미설정이므로 빈 문자열입니다.",
      "kind": "자체 제작 · 복기 유형 보완",
      "authored": true,
      "reference": "https://www.gnu.org/software/bash/manual/html_node/Environment.html",
      "recallEvidence": "복기에 set/env/echo·변수 범위·unalias·다른 셸 실행 결과가 언급됨. 세부 명령·값·보기는 확장 구성."
    },
    {
      "id": "recall-006",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "초기 환경에 LM_RECALL 변수가 없고 시작 파일을 읽지 않는 Bash에서 실행한다. 출력은?\nexport LM_RECALL=linux; bash --noprofile --norc -c 'echo \"$LM_RECALL\"' ",
      "options": [
        "linux",
        "빈 줄",
        "$LM_RECALL",
        "export"
      ],
      "answer": 0,
      "explanation": "export는 이후 실행하는 자식 프로세스의 환경에 변수를 넣습니다. 이미 실행 중인 다른 터미널 전체를 바꾸는 명령은 아닙니다.",
      "memory": "export는 이후 실행하는 자식 프로세스의 환경에 변수를 넣습니다. 이미 실행 중인 다른 터미널 전체를 바꾸는 명령은 아닙니다.",
      "kind": "자체 제작 · 복기 유형 보완",
      "authored": true,
      "reference": "https://www.gnu.org/software/bash/manual/html_node/Environment.html",
      "recallEvidence": "복기에 set/env/echo·변수 범위·unalias·다른 셸 실행 결과가 언급됨. 세부 명령·값·보기는 확장 구성."
    },
    {
      "id": "recall-007",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "초기 환경에 LM_RECALL 변수가 없고 시작 파일을 읽지 않는 Bash에서 실행한다. 마지막 출력은?\nexport LM_RECALL=parent; bash --noprofile --norc -c 'LM_RECALL=child'; echo \"$LM_RECALL\"",
      "options": [
        "parent",
        "child",
        "빈 줄",
        "parent child"
      ],
      "answer": 0,
      "explanation": "자식 프로세스에서 변수 값을 바꿔도 부모 셸의 변수는 바뀌지 않습니다.",
      "memory": "자식 프로세스에서 변수 값을 바꿔도 부모 셸의 변수는 바뀌지 않습니다.",
      "kind": "자체 제작 · 복기 유형 보완",
      "authored": true,
      "reference": "https://www.gnu.org/software/bash/manual/html_node/Command-Execution-Environment.html",
      "recallEvidence": "복기에 set/env/echo·변수 범위·unalias·다른 셸 실행 결과가 언급됨. 세부 명령·값·보기는 확장 구성."
    },
    {
      "id": "recall-008",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "초기 환경에 LM_RECALL 변수가 없고 시작 파일을 읽지 않는 Bash에서 실행한다. 두 출력의 순서는?\nLM_RECALL=linux; echo '$LM_RECALL'; echo \"$LM_RECALL\"",
      "options": [
        "$LM_RECALL 다음 linux",
        "linux 다음 linux",
        "빈 줄 다음 linux",
        "linux 다음 $LM_RECALL"
      ],
      "answer": 0,
      "explanation": "작은따옴표는 변수 확장을 막고 큰따옴표 안에서는 변수 확장이 일어납니다.",
      "memory": "작은따옴표는 변수 확장을 막고 큰따옴표 안에서는 변수 확장이 일어납니다.",
      "kind": "자체 제작 · 복기 유형 보완",
      "authored": true,
      "reference": "https://www.gnu.org/software/bash/manual/html_node/Quoting.html",
      "recallEvidence": "복기에 set/env/echo·변수 범위·unalias·다른 셸 실행 결과가 언급됨. 세부 명령·값·보기는 확장 구성."
    },
    {
      "id": "recall-009",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "Bash에서 인자 없이 실행한 set, env와 echo \"$PATH\"의 역할을 올바르게 연결하면?",
      "options": [
        "set: 셸 변수·함수 표시 / env: 환경 표시 / echo: PATH 값 출력",
        "set: 환경만 표시 / env: 모든 셸 함수 표시 / echo: PATH 삭제",
        "set: 변수 삭제 / env: 파일 검색 / echo: 셸 변경",
        "세 명령 모두 시스템 전체의 환경을 변경"
      ],
      "answer": 0,
      "explanation": "인자 없는 set은 Bash 변수와 함수를 표시하며 env는 전달받은 환경을 보여줍니다. echo \"$PATH\"는 PATH의 값을 출력합니다.",
      "memory": "인자 없는 set은 Bash 변수와 함수를 표시하며 env는 전달받은 환경을 보여줍니다. echo \"$PATH\"는 PATH의 값을 출력합니다.",
      "kind": "자체 제작 · 복기 유형 보완",
      "authored": true,
      "reference": "https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html",
      "recallEvidence": "복기에 set/env/echo·변수 범위·unalias·다른 셸 실행 결과가 언급됨. 세부 명령·값·보기는 확장 구성."
    },
    {
      "id": "recall-010",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "환경변수의 적용 범위에 대한 정확한 설명은?",
      "options": [
        "프로세스가 환경을 가지며 자식 실행 시 전달된다",
        "설정 즉시 모든 사용자·터미널에 자동 적용된다",
        "자식이 바꾸면 부모 값도 자동 변경된다",
        "셸 변수와 환경변수는 항상 별개의 값으로 중복 저장된다"
      ],
      "answer": 0,
      "explanation": "환경은 프로세스별입니다. Bash 변수에 export 속성을 주면 자식 실행 환경에 포함됩니다. 시스템 전체가 공유하는 전역 저장소가 아닙니다.",
      "memory": "환경은 프로세스별입니다. Bash 변수에 export 속성을 주면 자식 실행 환경에 포함됩니다. 시스템 전체가 공유하는 전역 저장소가 아닙니다.",
      "kind": "자체 제작 · 복기 유형 보완",
      "authored": true,
      "reference": "https://www.gnu.org/software/bash/manual/html_node/Environment.html",
      "recallEvidence": "복기에 set/env/echo·변수 범위·unalias·다른 셸 실행 결과가 언급됨. 세부 명령·값·보기는 확장 구성."
    },
    {
      "id": "recall-011",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "alias ll='ls -al'을 설정했다. 현재 셸에서 ll 별칭만 해제하려면?",
      "options": [
        "unalias ll",
        "unalias ls -al",
        "unset ll",
        "rm ll"
      ],
      "answer": 0,
      "explanation": "unalias 뒤에는 별칭 이름을 씁니다. 원래 명령 문자열이나 파일 이름을 삭제하는 것이 아닙니다.",
      "memory": "unalias 뒤에는 별칭 이름을 씁니다. 원래 명령 문자열이나 파일 이름을 삭제하는 것이 아닙니다.",
      "kind": "자체 제작 · 복기 유형 보완",
      "authored": true,
      "reference": "https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html",
      "recallEvidence": "복기에 set/env/echo·변수 범위·unalias·다른 셸 실행 결과가 언급됨. 세부 명령·값·보기는 확장 구성."
    },
    {
      "id": "recall-012",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "Bash의 unalias -a는 무엇을 하는가?",
      "options": [
        "현재 셸의 모든 별칭 해제",
        "모든 환경변수 삭제",
        "모든 실행 파일 삭제",
        "모든 사용자의 .bashrc 수정"
      ],
      "answer": 0,
      "explanation": "-a는 현재 셸의 모든 별칭을 해제합니다. .bashrc의 정의를 지우지 않으므로 새 셸에서 다시 설정될 수 있습니다.",
      "memory": "-a는 현재 셸의 모든 별칭을 해제합니다. .bashrc의 정의를 지우지 않으므로 새 셸에서 다시 설정될 수 있습니다.",
      "kind": "자체 제작 · 복기 유형 보완",
      "authored": true,
      "reference": "https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html",
      "recallEvidence": "복기에 set/env/echo·변수 범위·unalias·다른 셸 실행 결과가 언급됨. 세부 명령·값·보기는 확장 구성."
    },
    {
      "id": "recall-013",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "초기 환경에 LM_RECALL 변수가 없고 시작 파일을 읽지 않는 Bash에서 실행한다. 명령 결과를 결정하는 셸에 대한 설명은?\nsh -c 'echo hello' ",
      "options": [
        "sh로 실행된 프로그램이 문자열을 해석한다",
        "부모가 Bash이면 항상 Bash 문법만 적용된다",
        "로그인 셸이 자동으로 영구 변경된다",
        "어떤 셸에서 실행하든 모든 문법은 동일하다"
      ],
      "answer": 0,
      "explanation": "부모 Bash는 sh를 실행합니다. -c 문자열은 실행된 sh가 해석하며 /bin/sh가 가리키는 구현은 시스템에 따라 다릅니다. 이것만으로 로그인 셸 설정이 바뀌지는 않습니다.",
      "memory": "부모 Bash는 sh를 실행합니다. -c 문자열은 실행된 sh가 해석하며 /bin/sh가 가리키는 구현은 시스템에 따라 다릅니다. 이것만으로 로그인 셸 설정이 바뀌지는 않습니다.",
      "kind": "자체 제작 · 복기 유형 보완",
      "authored": true,
      "reference": "https://www.gnu.org/software/bash/manual/html_node/Command-Execution-Environment.html",
      "recallEvidence": "복기에 set/env/echo·변수 범위·unalias·다른 셸 실행 결과가 언급됨. 세부 명령·값·보기는 확장 구성."
    },
    {
      "id": "recall-014",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "초기 환경에 LM_RECALL 변수가 없고 시작 파일을 읽지 않는 Bash에서 실행한다. f.sh 내용은 LM_RECALL=child 한 줄이다.\nLM_RECALL=parent; bash --noprofile --norc f.sh; echo \"$LM_RECALL\"; source ./f.sh; echo \"$LM_RECALL\"\n두 출력은?",
      "options": [
        "parent 다음 child",
        "child 다음 child",
        "parent 다음 parent",
        "빈 줄 다음 child"
      ],
      "answer": 0,
      "explanation": "bash f.sh는 자식 셸에서 실행하므로 부모 값은 유지됩니다. source는 현재 셸에서 파일을 읽어 실행하므로 현재 값이 바뀝니다.",
      "memory": "bash f.sh는 자식 셸에서 실행하므로 부모 값은 유지됩니다. source는 현재 셸에서 파일을 읽어 실행하므로 현재 값이 바뀝니다.",
      "kind": "자체 제작 · 복기 유형 보완",
      "authored": true,
      "reference": "https://www.gnu.org/software/bash/manual/html_node/Command-Execution-Environment.html",
      "recallEvidence": "복기에 set/env/echo·변수 범위·unalias·다른 셸 실행 결과가 언급됨. 세부 명령·값·보기는 확장 구성."
    },
    {
      "id": "recall-015",
      "topic": "xwindow",
      "page": 0,
      "red": false,
      "prompt": "Rocky Linux 8/9의 표준 설치에서 시스템·서비스 관리에 사용하는 조합은?",
      "options": [
        "systemd / systemctl",
        "SysV init / unalias",
        "CUPS / lpq",
        "Bash / chmod"
      ],
      "answer": 0,
      "explanation": "Rocky Linux 8/9의 시스템·서비스 관리는 systemd와 systemctl을 연결합니다. 개인 복기의 Rocky Linux 7이라는 버전 표기는 사용하지 않습니다.",
      "memory": "Rocky Linux 8/9의 시스템·서비스 관리는 systemd와 systemctl을 연결합니다. 개인 복기의 Rocky Linux 7이라는 버전 표기는 사용하지 않습니다.",
      "kind": "자체 제작 · 복기 유형 보완",
      "authored": true,
      "reference": "https://docs.rockylinux.org/ko/books/admin_guide/10-boot/",
      "recallEvidence": "복기에 systemd와 Rocky Linux 7이 언급됨. 버전 오류를 바로잡고 Rocky 8/9 또는 systemctl 조건으로 새로 구성."
    },
    {
      "id": "recall-016",
      "topic": "xwindow",
      "page": 0,
      "red": false,
      "prompt": "systemctl get-default와 systemctl set-default multi-user.target을 구분한 설명은?",
      "options": [
        "기본 부팅 타깃 조회 / 다음 부팅 등에 사용할 기본 타깃 설정",
        "현재 디렉터리 조회 / 파일 권한 변경",
        "프로세스 종료 / 즉시 재부팅",
        "설치 패키지 조회 / 패키지 삭제"
      ],
      "answer": 0,
      "explanation": "get-default는 기본 타깃을 조회하고 set-default는 기본 타깃을 설정합니다. 현재 실행 상태를 즉시 전환하는 isolate와 구분합니다.",
      "memory": "get-default는 기본 타깃을 조회하고 set-default는 기본 타깃을 설정합니다. 현재 실행 상태를 즉시 전환하는 isolate와 구분합니다.",
      "kind": "자체 제작 · 복기 유형 보완",
      "authored": true,
      "reference": "https://www.freedesktop.org/software/systemd/man/latest/systemctl.html",
      "recallEvidence": "복기에 systemd와 Rocky Linux 7이 언급됨. 버전 오류를 바로잡고 Rocky 8/9 또는 systemctl 조건으로 새로 구성."
    },
    {
      "id": "recall-017",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "다음 출력의 전체 용량·사용량·여유 공간을 파일 시스템별로 확인하는 명령은?\nFilesystem   Size  Used  Avail  Use%  Mounted on\n/dev/sdb1    100G   40G    60G   40%  /data",
      "options": [
        "df -h",
        "du -sh /data",
        "ls -l /data",
        "mount -t ext4"
      ],
      "answer": 0,
      "explanation": "df는 파일 시스템 공간 정보를 보여줍니다. 예시 수치는 문제 이해를 위해 단순화했으며 du는 경로가 차지한 디스크 사용량입니다.",
      "memory": "df는 파일 시스템 공간 정보를 보여줍니다. 예시 수치는 문제 이해를 위해 단순화했으며 du는 경로가 차지한 디스크 사용량입니다.",
      "kind": "자체 제작 · 복기 기반 재구성",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/coreutils.html",
      "recallEvidence": "복기에 df와 du 차이 출제가 언급됨. 출력 표와 수치는 새로 구성."
    },
    {
      "id": "recall-018",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "/data 디렉터리 아래 파일들이 차지한 디스크 사용량을 합계 한 줄로 보려면?",
      "options": [
        "du -sh /data",
        "df -h /data",
        "pwd /data",
        "ls -a /data"
      ],
      "answer": 0,
      "explanation": "du -s는 경로 사용량 합계, -h는 읽기 쉬운 단위입니다. df /data는 /data가 속한 파일 시스템의 공간을 보여줍니다.",
      "memory": "du -s는 경로 사용량 합계, -h는 읽기 쉬운 단위입니다. df /data는 /data가 속한 파일 시스템의 공간을 보여줍니다.",
      "kind": "자체 제작 · 복기 기반 재구성",
      "authored": true,
      "reference": "https://www.gnu.org/software/coreutils/manual/coreutils.html",
      "recallEvidence": "복기에 디렉터리별 사용량과 파일 시스템 사용량 구분이 언급됨. 경로·보기는 새로 구성."
    },
    {
      "id": "recall-019",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "이미 /data에 연결된 파일 시스템을 연결 해제하는 명령은?",
      "options": [
        "umount /data",
        "unmount /data",
        "mount -r /data",
        "fsck /data"
      ],
      "answer": 0,
      "explanation": "철자는 umount입니다. fsck는 검사·복구 관련 명령으로 연결 해제가 아닙니다.",
      "memory": "철자는 umount입니다. fsck는 검사·복구 관련 명령으로 연결 해제가 아닙니다.",
      "kind": "자체 제작 · 복기 기반 재구성",
      "authored": true,
      "reference": "https://man7.org/linux/man-pages/man8/umount.8.html",
      "recallEvidence": "복기에 mount/umount 및 철자 혼동이 언급됨. 경로·보기는 새로 구성."
    },
    {
      "id": "recall-020",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "ext4 파일 시스템 /dev/sdb1을 /data에 연결하려면?",
      "options": [
        "mount -t ext4 /dev/sdb1 /data",
        "mount /data /dev/sdb1 -t xfs",
        "umount -t ext4 /data",
        "mkfs.ext4 /data"
      ],
      "answer": 0,
      "explanation": "mount -t 유형 장치 마운트지점 순서입니다. mkfs는 생성·포맷이고 umount는 연결 해제입니다.",
      "memory": "mount -t 유형 장치 마운트지점 순서입니다. mkfs는 생성·포맷이고 umount는 연결 해제입니다.",
      "kind": "자체 제작 · 복기 기반 재구성",
      "authored": true,
      "reference": "https://man7.org/linux/man-pages/man8/mount.8.html",
      "recallEvidence": "복기에 마운트 관련 문제와 뒤에 붙는 인자 확인 필요성이 언급됨. ext4·장치·경로 조건은 추가."
    },
    {
      "id": "recall-021",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "/data를 마운트 해제했을 때 의미로 알맞은 것은?",
      "options": [
        "해당 파일 시스템과 마운트 지점의 연결을 해제함",
        "파일 시스템을 포맷함",
        "모든 파일을 휴지통으로 옮김",
        "손상된 파일을 자동 복구함"
      ],
      "answer": 0,
      "explanation": "umount는 연결 해제입니다. 파일 삭제나 포맷, 파일 시스템 오류 수리와 구분합니다.",
      "memory": "umount는 연결 해제입니다. 파일 삭제나 포맷, 파일 시스템 오류 수리와 구분합니다.",
      "kind": "자체 제작 · 복기 기반 재구성",
      "authored": true,
      "reference": "https://man7.org/linux/man-pages/man8/umount.8.html",
      "recallEvidence": "복기에 마운트 해제와 fsck/XFS가 혼재함. 작업의 의미를 분리한 확장 연습."
    },
    {
      "id": "recall-022",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "마운트된 XFS에 일반적인 오프라인 점검·복구를 수행할 때 맞는 설명은?",
      "options": [
        "사용을 중지하고 마운트를 해제한 뒤 xfs_repair로 점검·복구한다",
        "mkfs.xfs로 기존 파일 시스템을 복구한다",
        "unmount 명령이 파일 시스템 오류를 수리한다",
        "e2fsck가 XFS 전용 복구 도구이다"
      ],
      "answer": 0,
      "explanation": "일반적인 xfs_repair 복구 대상은 마운트 해제 상태여야 합니다. mkfs.xfs는 새 파일 시스템 생성이고 e2fsck는 ext 계열 도구입니다.",
      "memory": "일반적인 xfs_repair 복구 대상은 마운트 해제 상태여야 합니다. mkfs.xfs는 새 파일 시스템 생성이고 e2fsck는 ext 계열 도구입니다.",
      "kind": "자체 제작 · 복기 기반 재구성",
      "authored": true,
      "reference": "https://man7.org/linux/man-pages/man8/xfs_repair.8.html",
      "recallEvidence": "복기의 fsck xfs 해제는 원문이 불명확함. XFS 오프라인 복구 조건을 새로 명시한 확장 연습."
    },
    {
      "id": "recall-023",
      "topic": "files",
      "page": 0,
      "red": false,
      "prompt": "마운트 해제한 파일 시스템에 xfs_repair -n /dev/sdb1을 실행하는 목적은?",
      "options": [
        "파일 시스템을 수정하지 않고 점검한다",
        "강제로 로그를 지운다",
        "새 파일 시스템을 만든다",
        "파일 시스템을 마운트한다"
      ],
      "answer": 0,
      "explanation": "xfs_repair -n은 수정 없는 점검입니다. -L처럼 로그를 강제로 지우는 옵션과 다릅니다.",
      "memory": "xfs_repair -n은 수정 없는 점검입니다. -L처럼 로그를 강제로 지우는 옵션과 다릅니다.",
      "kind": "자체 제작 · 복기 기반 재구성",
      "authored": true,
      "reference": "https://man7.org/linux/man-pages/man8/xfs_repair.8.html",
      "recallEvidence": "복기에 XFS 점검 관련 표현만 있음. -n 옵션·장치·보기는 추가한 확장 연습."
    },
    {
      "id": "recall-024",
      "topic": "process",
      "page": 0,
      "red": false,
      "prompt": "작업 제어가 가능한 대화형 Bash에서 sleep 100 &를 실행하면?",
      "options": [
        "셸은 명령 완료를 기다리지 않고 다음 입력을 받을 수 있다",
        "sleep이 종료될 때까지 반드시 입력할 수 없다",
        "sleep을 즉시 강제 종료한다",
        "sleep의 PID를 100으로 설정한다"
      ],
      "answer": 0,
      "explanation": "끝의 &는 비동기 백그라운드 실행을 요청합니다. 100은 sleep 대기 시간이지 PID나 작업 번호가 아닙니다.",
      "memory": "끝의 &는 비동기 백그라운드 실행을 요청합니다. 100은 sleep 대기 시간이지 PID나 작업 번호가 아닙니다.",
      "kind": "자체 제작 · 복기 기반 재구성",
      "authored": true,
      "reference": "https://www.gnu.org/software/bash/manual/bash.html#Job-Control",
      "recallEvidence": "복기에 sleep 100 & 예시와 Background/Foreground 구분이 직접 언급됨. 질문·보기는 재구성."
    },
    {
      "id": "recall-025",
      "topic": "process",
      "page": 0,
      "red": false,
      "prompt": "대화형 Bash의 jobs 출력이 [2]+ Stopped sleep 100 이다. 이 작업을 백그라운드에서 재개하려면?",
      "options": [
        "bg %2",
        "fg %2",
        "bg 100",
        "kill -9 2"
      ],
      "answer": 0,
      "explanation": "bg %2는 셸 작업 번호 2를 백그라운드에서 재개합니다. fg는 포그라운드로 가져옵니다. sleep의 100과 작업 번호 2를 구분하세요.",
      "memory": "bg %2는 셸 작업 번호 2를 백그라운드에서 재개합니다. fg는 포그라운드로 가져옵니다. sleep의 100과 작업 번호 2를 구분하세요.",
      "kind": "자체 제작 · 복기 기반 재구성",
      "authored": true,
      "reference": "https://www.gnu.org/software/bash/manual/bash.html#Job-Control-Builtins",
      "recallEvidence": "복기에 bg/fg가 언급됨. Stopped 출력·작업 번호·명령 조건은 새로 구성."
    },
    {
      "id": "recall-026",
      "topic": "process",
      "page": 0,
      "red": false,
      "prompt": "작업 번호 2를 포그라운드로 전환하는 명령과 현재 셸의 작업 목록 명령은?",
      "options": [
        "fg %2 / jobs",
        "bg %2 / ps -ef",
        "kill %2 / top",
        "fg 100 / pwd"
      ],
      "answer": 0,
      "explanation": "fg %2는 작업 번호 2를 앞으로 가져오고 jobs는 현재 셸의 작업 목록을 보여줍니다.",
      "memory": "fg %2는 작업 번호 2를 앞으로 가져오고 jobs는 현재 셸의 작업 목록을 보여줍니다.",
      "kind": "자체 제작 · 복기 기반 재구성",
      "authored": true,
      "reference": "https://www.gnu.org/software/bash/manual/bash.html#Job-Control-Builtins",
      "recallEvidence": "복기에 Foreground/Background 단어와 bg/fg가 언급됨. 작업 번호와 목록 조회는 확장 연습."
    },
    {
      "id": "recall-027",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "시작 파일을 읽지 않는 Bash에서 다음을 순서대로 실행한다. 두 출력은?\nLM_RECALL=parent\nenv LM_RECALL=child bash --noprofile --norc -c 'echo \"$LM_RECALL\"'\necho \"$LM_RECALL\"",
      "options": [
        "child 다음 parent",
        "parent 다음 child",
        "child 다음 child",
        "빈 줄 다음 parent"
      ],
      "answer": 0,
      "explanation": "env는 실행할 명령의 환경을 지정할 수 있습니다. 자식 환경에 child를 넣어도 부모 셸의 parent는 바뀌지 않습니다.",
      "memory": "env는 실행할 명령의 환경을 지정할 수 있습니다. 자식 환경에 child를 넣어도 부모 셸의 parent는 바뀌지 않습니다.",
      "kind": "자체 제작 · 복기 기반 재구성",
      "authored": true,
      "reference": "https://www.gnu.org/software/bash/manual/bash.html#Environment",
      "recallEvidence": "복기에 env와 셸 실행 결과 유형이 언급됨. 변수 이름·값·실행 문자열은 검증용으로 새로 구성."
    },
    {
      "id": "recall-028",
      "topic": "shell",
      "page": 0,
      "red": false,
      "prompt": "Bash에서 PATH=/opt/tools:/usr/bin을 설정한 뒤 echo \"$PATH\"를 실행하면?",
      "options": [
        "/opt/tools:/usr/bin",
        "$PATH",
        "/opt/tools 안의 파일 목록",
        "현재 작업 디렉터리"
      ],
      "answer": 0,
      "explanation": "echo \"$PATH\"는 변수 값을 출력합니다. PATH의 콜론은 명령 검색 디렉터리의 구분자입니다.",
      "memory": "echo \"$PATH\"는 변수 값을 출력합니다. PATH의 콜론은 명령 검색 디렉터리의 구분자입니다.",
      "kind": "자체 제작 · 복기 기반 재구성",
      "authored": true,
      "reference": "https://www.gnu.org/software/bash/manual/bash.html#Shell-Variables",
      "recallEvidence": "복기에 echo $PATH 예시가 직접 언급됨. PATH 값과 보기는 새로 구성."
    }
  ]
};
