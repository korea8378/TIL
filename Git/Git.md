# Git

## 10월 7일

* Organization을 만들어서 study 진행
* issue template 만들기
* Slack & Github hook 연동
* PR 개념 및 등록하기 실습
* gitflow방식으로 하나의 cycle로 실습

## 10월 15일

* git rebase할때는 commit id가 바뀌니 주의하자
* 원격에 있는걸 pull 받아와서 rebase를 해버리면 혼돈이 온다.
* git rebase -i : 커밋 정보를 수정
* git pull --rebase : 브랜치의 현재 상태로 리베이스

### git rebase
1. repository 만들고
2. git으로 remote해주고
3. git checkout -b issue1
4. vi README.md 에서 아무 text추가
5. git add .
6. git commit -m "test"
7. github repository에서 readme.md 수정하면서 master에 커밋
8. git pull --rebase origin master (push 할 branch에 checkout해야 한다)
9. vi 충돌 부분 수정
10. git add
11. git rebase --continue
12. git push origin issue1
13. pr등록시
14. 통과시키고 merge

* 엔터로 cmd git 최싱상태로 만들어주자

#### 처음상태
![After](/Git/img/After.png)

#### 바로 병합 할 경우
![Merge](/Git/img/merge.png)

#### rebase 후 병합 할 경우
![Rebase-before](/Git/img/Rebase-before.png)


## 10월 25일
* PR후 merge시 commit message 남기지 않기