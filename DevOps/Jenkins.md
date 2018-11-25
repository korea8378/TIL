# Algorithm

## 11월 25일

### Jenkins

### 무서운 존재(두 얼굴을 가지고 있다.)
![jenkins-2](/DevOps/img/jenkins-2.png)
![jenkins-1](/DevOps/img/jenkins-1.png)
* * *

## 지속 적인 통합을 가능하게 해주는 툴(빌드/테스트)

* * *
## 특징
* GUI 제공
* 소스 코드 체크아웃
* 분산 빌드
* 지속적인 빌드 및 테스트 자동화 배포 자동화(이기능을 위해 사용 중)
* 테스트 보고서 작성
* Groovy script를 이용한 Job Scheduling 기능
* CLI 제공
* 실행 결과를 통보하고 결과물을 저장
* ....등(많은기능들이 있지만 아직 다 사용해보지는 못했다 앞으로 조금씩 늘려보자)

* * *
## Travis와의 비교
![travis](/DevOps/img/travis.png)
* Jenkins를 사용한다고 하면 대부분 사람들이 Travis를 사용하라고 한다.
* Jenkins과 Travis에 비해 설치와 사용자 정의 수준이 생각보다 오래 걸리고 어렵다.
* Jenkins는 서버를 따로 두고 설치해야하지만 Travis는 클라우드 서비스(GitHub에서 제공)를 지원하기 때문에 설치가 필요없다.(Jenkins 설치하다가 멘탈 붕괴...)
* Travis는 프로젝트내에 .travis.yml파일 만들어 설정을 하게된다.
* 서버를 따로 두고 설치하면서까지 Jenkins를 쓰는 이유는 방대한 플러그인, 높은 수준의 사용자 커스터 마이징 등 떄문이라고 한다.
* Travis는 여러환경에서 테스트해야하는 오픈 소스에 이상적이면 Jenkinsms 높은 수준의 사용자 정의가 필요한 대규모 프로젝트에 더 적합하다.(상황에 맞게 사용하자)

* * *
## Jenkins 설치(linux-centos기준)
* 현재 jenkins를 다운받게 된다면 기본적으로 java 8을 설치 되어 있어야지 실행이 가능하다.

### java 설치
#### 1.java version 확인
![version-1](/DevOps/img/version-1.png)
#### 2.설치 가능한 java version 확인
![version-2](/DevOps/img/version-2.png)
#### 3.java 8 설치
![version-3](/DevOps/img/version-3.png)
#### 4.java 8 선택
![version-4](/DevOps/img/version-4.png)
#### 5.java version 확인
![version-5](/DevOps/img/version-5.png)

### jenkins 설치
#### 1.Jenkins 설치를 위한 yum레파지토리 설정
* sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
* sudo rpm --import http://pkg.jenkins-ci.org/redhat/jenkins-ci.org.key
![yumjenkins-1](/DevOps/img/yumjenkins-1.png)
#### 2.Jenkins 설치
* sudo yum install jenkins
![yumjenkins-2](/DevOps/img/yumjenkins-2.png)
#### 3.Jenkins port 설정
* sudo vi /etc/sysconfig/jenkins
![yumjenkins-3](/DevOps/img/yumjenkins-3.png)
#### 4.Jenkins service 시작
* sudo service jenkins start
![yumjenkins-4](/DevOps/img/yumjenkins-4.png)
#### 5.Jenkins 사이트 접속(자신의 서버 IP입력)
![yumjenkins-5](/DevOps/img/yumjenkins-5.png)
#### 6.접속시 비번 입력 화면(검은색 네모상자부분을 보면 비번 위치파일을 알려준다.)
![yumjenkins-6](/DevOps/img/yumjenkins-6.png)
#### 7.cat을 이용하여 비밀번호를 복사 해오자
![yumjenkins-7](/DevOps/img/yumjenkins-7.png)
#### 8.복사한 비밀번호를 입력 후 하단의 continue 클릭
![yumjenkins-8](/DevOps/img/yumjenkins-8.png)
#### 9.왼쪽을 선택하여 기본적으로 제공하는 플러그인을들 설치하자
![yumjenkins-9](/DevOps/img/yumjenkins-9.png)
#### 10.설치 화면
* 정상적으로 다 설치가 되는지 확인하자 실패되는것들은 적용되지 않을 수 있으니 추후 플러그인을 다시 설치해야한다.
* git 제대로 설치 되지 않으면 추후 github hooks기능을 사용 못 할 수도 있다.
![yumjenkins-10](/DevOps/img/yumjenkins-10.png)
#### 11.admin 유저 추가
![yumjenkins-11](/DevOps/img/yumjenkins-11.png)
#### 12.접속 URL 설정
![yumjenkins-12](/DevOps/img/yumjenkins-12.png)
#### 13.Jenkins is Ready
![yumjenkins-13](/DevOps/img/yumjenkins-13.png)
#### 14.Jenkins에 오신 걸 환영합니다.(이제 무서운 아저씨를 볼 수 있다.!!)
![yumjenkins-14](/DevOps/img/yumjenkins-14.png)

* * *
## Jenkins 설치를 하면서 겪은 시행 착오
* Travis의 경우는 설치형이 아니기 때문에 구글링을 하여 금방 프로젝트에 적용 할 수 있다.
* AWS 프리티어 계정을 사용하지말자. EC2에 설치하여 사용하게되면 사양이 낮아서 돌아가다가 가끔 서버가 뻗어 버린다....
* java version을 내가 설치한 Jenkins version과 호환이 되는지 확인하자.(보통 ec2는 java 7이다. 최근 jenkins는 java 8부터 돌아간다.)
* port번호를 신경쓰자. tomcat은 default port 8080이다. jenkins는 동일하다. 서버를 docker로 쪼개서 같이 쓸 경우 주의하자
  * sudo vim /etc/sysconfig/jenkins을 이용하여 JENKINS_PROT를 변경하자.
![port](/DevOps/img/port.png)
* docker pull jenkins 통해 jenkins를 사용 할 경우 jenkins버전을 확인 해보자(제대로된 이미지?버전?이 아니면 jenkins plugin설치가 제대로 되지 않는다.....)
* 모든게 정상적으로 설치가 되어야한다.
![getting](/DevOps/img/getting.png)

* * *
## GitHub hooK 연결
### GitHub tonken 받기
#### 1.GitHub에서 사용자 setting 클릭
![hook-1](/DevOps/img/hook-1.png)
#### 2.왼쪽 하단의 Developer setting 클릭
![hook-2](/DevOps/img/hook-2.png)
#### 3.Personal access tokens 클릭
![hook-3](/DevOps/img/hook-3.png)
#### 4.Token 발급 받기
* 이름 정의
* repo, admin:repo-hook에 대한 권한을 할당 받자 / Generate token클릭
![hook-4](/DevOps/img/hook-4.png)
#### 5.Token 번호 복사
![hook-5](/DevOps/img/hook-5.png)

### Jenkins에 등록
#### 1.Jenkins > Jenkins관리 > 시스템 설정 순으로 클릭
![hook-6](/DevOps/img/hook-6.png)
#### 2.GitHub > add github server 클릭
![hook-7](/DevOps/img/hook-7.png)
#### 3.add > jenkins 클릭
![hook-8](/DevOps/img/hook-8.png)
#### 4.kind > secret text 클릭
* secre에 github에서 발급 받은 Token입력
* ID에 github ID 입력 / add 클릭
<br>
![hook-9](/DevOps/img/hook-9.png)
#### 5.Credentals에 추가한 아이디 선택 및 이름 지정
![hook-10](/DevOps/img/hook-10.png)
#### 6.Test Connection을 통하여 연결 테스트
![hook-11](/DevOps/img/hook-11.png)

### Github와 Jenkins Hook 연결
* hook이란 github repository에서 특정 브랜치를 지정하여 push나 pr 특정 이벤트를 발생 되면 jenkins가 Github repository에서 프로젝트를 들고와 빌드/테스트를 할 수 있다. 추가적으로 스크립트를 정의해 배포까지 가능하다.
#### 1.프로젝트 생성
![hook-12](/DevOps/img/hook-12.png)
#### 2.프로젝트 설정
![hook-13](/DevOps/img/hook-13.png)
#### 3.소스 코드 관리 > git 선택
![hook-14](/DevOps/img/hook-14.png)
#### 4.Github repository 연결
* 해당 서버에 git이 깔려있지 않아서 repository를 땡겨 올 수 없다고 에러가 뜨는 메시지를 확인 할 수 있다.
* 젠킨스를 설치한 서버에 git을 설치해줘야 한다.(이것 때문에 오래 걸렸다....)
* 하단에 해결법 있음
<br>
![hook-15](/DevOps/img/hook-15.png)
#### 5.GitHub 유저를 추가하기
* Github Id & Password 입력 하여 
<br>
![hook-16](/DevOps/img/hook-16.png)
#### 6.Branches to build 설정
* master 기준으로 master에 push 하거나 이번트가 발생 하면 jenkins에서 hook을 통하여 프로젝트르 빌드/테스트를 한다.
* feature, develop등 다른 브랜치에서 hook을 발생 하고싶으면 add branch를 통해 추가 시켜주자(이것 때문에 또 오래 걸렸다...)
![hook-17](/DevOps/img/hook-17.png)
#### 7.빌드 유발 > GitHub hook 트리거 설정
![hook-18](/DevOps/img/hook-18.png)
#### 8.excute shell 선택
* 빌드시 실행 할 스크립트 설정
<br>
![hook-19](/DevOps/img/hook-19.png)
#### 9.Buil > 쉘 스크립트 작성
* gradle을 사용했기 때문 task를 clean test build를 하였다.(빌드/테스트)
<br>
![hook-20](/DevOps/img/hook-20.png)
* * * 

### GitHub webHook 설정
#### 1.hook 설정할 repository > setting 클릭
![webhook-1](/DevOps/img/webhook-1.png)
#### 2.webhooks 클릭
![webhook-2](/DevOps/img/webhook-2.png)
#### 3.이미 등록 되어 있는 webhook 확인
![webhook-3](/DevOps/img/webhook-3.png)
#### 4.Let me select individual events 클릭
* 기본적으로 push에 대한 hook만이 적용 되어 있다.
* PR에서도 적용을 하려면 pull Requests를 클릭하자.
* Update Webhook을 클릭 하여 업데이트 하자 반드시.
![webhook-4](/DevOps/img/webhook-4.png)
#### 5.하단에서 초록색 체크 표시 확인
* 태그를 클릭하면 상세페이지를 볼 수 있다.
* 초록색 체크 표시로 정상적으로 연결되어 있다는 걸 표시해준다.
* 연결이 되지 않는다면 빨간색 에러 모양이 뜬다.
![webhook-5](/DevOps/img/webhook-5.png)
#### 6.Redeliver 버튼 클릭
* 재연결을 하여 업데이트된 정보가 적용 되는지 확인하자.
<br>
![webhook-6](/DevOps/img/webhook-6.png)
#### 7.Redeliver 버튼 클릭
* 새로고침을 몇번 해주자
<br>
![webhook-7](/DevOps/img/webhook-7.png)

* * *
## hook 하면서 겪은 시행 착오
* 4.Github repository 연결에서 jenkins가 설치 되어있는 서버에 git 설치 되어 있지 않아 연결이 되지 않았다. git이 설치 되어 있는지 확인하고 없으면 설치하자.
![git-1](/DevOps/img/git-1.png)
![git-2](/DevOps/img/git-2.png)

* * *
## 대망의 hook test
#### 1.git add. commit push
![hooktest-1](/DevOps/img/hooktest-1.png)
#### 2.Github repository commit 확인
![hooktest-3](/DevOps/img/hooktest-3.png)
#### 3.jenkins build 시작
![hooktest-2](/DevOps/img/hooktest-2.png)
#### 4.build history 클릭
* 콘솔을 클릭하면 현쟁 진행중인 task를 확인 할 수 있다.
![hooktest-4](/DevOps/img/hooktest-4.png)
#### 5.build 결과 확인(아싸 성공!!!)
![hooktest-5](/DevOps/img/hooktest-5.png)
#### 6.build history 확인
![hooktest-6](/DevOps/img/hooktest-6.png)
#### 7.프로젝트 날씨 확인
* jenkins가 무서운이유 빌드가 실패하면 날씨가 번개&비로 바뀐다.(기분 안 좋게 한다.)
![hooktest-7](/DevOps/img/hooktest-7.png)

* * *

## TO DO
* 브랜치 설정을 추가해 PR시 빌드/테스트 적용해보기
* 배포해보기
* Docker를 이용한 배포해보기

* * *

## 결론
* 네이버 클라우드에 Jenkins 서버를 자체적으로 만들어 놓은게 있다.(설치 불필요?!!)
* Travis와 Jenkins를 둘 다 경험 해보는게 좋은 거 같다.(둘이 설정법이 좀 많이 다르다.)
* Jenkins는 무서운 아저씨가 맞다.

* * *