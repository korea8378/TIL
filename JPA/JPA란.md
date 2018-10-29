# JPA

## 10월 26일

### JAVA PERSISTENCE API

#### 자바 진영의 ORM

#### Object Relational Mapping

* 기존의 SQL에서는 반복적인 CRUD를 작성해야 했다.
* 기존에는 데이터 중심의 테이블 맵핑
* 객체 모델링과 관계형 데이터베이스 사이의 차이점을 해결
* 반복적인 CRUD SQL 알아서 처리
* JPA를 사용하는 개발자는 SQL을 직접 작성하는 것이 아니라 어떤 SQL이 실행될지 생각만 하면 된다.

#### SQL의 문제점
1. SQL 쿼리를 이용하여 CRUD를 하게 된다면 무의미한 반복적인 작업을 하게된다.
  * SELECT : 쿼리문 작성 -> 쿼리문 실행 -> 조회결과를 객체로 맵핑
  * INSERT : 쿼리문 작성 -> 쿼리문 전달 -> 쿼리문 실행
  * 개발자는 SQL과 JDBC API를 사용해서 변환 작업을 해주어야 한다.
  * 테이블이 많아진다면 똑같은 변환작업을 계속해야하기 때문에 생산성을 저하 시킨다. 
2. SQL에 의존적인 개발
  * CRUD가 완성된 테이블이 존재한다고 가정하에 추후 테이블에 컬럼이 추가가 된다면 테이블에 관련된 CRUD sql문을 고쳐야하는 상황이 발생이 된다.
  * 연관된 객체를 추가 하게 된다면 DAO에서 어떤 메소드를 통해 호출 되는지 SQL문을 보고 파악해야한다.
3. 요약
  * 진정한 의미의 계층 분할이 어렵다.
  * 엔티티를 신뢰할 수 없다.
  * SQL에 의존적인 개발을 피하기 어렵다.

#### SQL의 문제점 해결(JPA)
<pre><code>
저장기능
jpa.persist(member)

조회기능
String memberId = “helloId”;
Member member = jpa.find(Member.class, memberId);

수정기능
Member member = jpa.find(Member.class, memberId);
Member.setName(“이름변경”);

연관된 객체 조회
Member member = jpa.find(Member.class, memberId);
Team team = member.getTeam();
</pre></code>
* jpa를 사용하게되면 SQL에 의존적으로 개발하지 않아도 된다.
* 조회와 저장,수정시 일일이 맵핑을 해주지 않기 때문에 생산성이 올라간다.(매핑x)
* 객체 or 테이블이 바뀌더라도 SQL에 의존적으로 개발하지 않아도 된다.(매핑 문제)
* 연관된 객체를 조회할때 외래키로 일일이 찾아서 조회해야 했지만(객체지향 개념x) jpa를 통해서 객체 지향적으로 연관된 객체를 가질수 있다.


#### 데이터베이스와 객체 패러다임
* 데이터베이스에는 추상화, 상속, 다형성 같은 개념이없다.
* member라는 객체가 team객체를 가지고 있을때 데이터베이스 적으로 teamid를 가지고 있어야하기 때문에 객체 패러다임에 어긋난다. Member 객체가 teamid를  가지고 있더라도 team객체를 참조 할 수 없다. 
* team 객체로 저장하게되면 데이터베이스는 데이터 중심이기때문에 객체를 저장 할 수는 없다. team객체의 teamid를 조회해서 teamid로 저장해야한다.
* SQL을 사용하게되면 데이터베이스와 객체의 패러다임을 개발자가 직접 해결해야한다.

#### 연관된 객체 그래프 탐색
* 객체의 연관관계가 구성 되어 있을 경우 SQL을 직접 다루면 처음 실행하는 SQL에 따라 객체 그래프를 어디까지 탐색할 수 있는지 정해진다.
* JPA에서는 지연로딩,즉시로딩등을 통해서 쉽게 연관된 객체 그래프 탐색이 가능하다.

#### 비교
* SQL로 구현 했을 경우
<pre><code>
String memberId = “100”;
Member member1 = memberDAO.getMember(memberId);
Member member2 = memberDAO.getMember(memberId);

member1 == member2; 다르다
인스턴스화 개념으로 작용되기때문에 같은 객체라고 볼 수 없다.//따로 구현해야함 
</pre></code>

* JPA로 구현 했을 경우
<pre><code>
String memberId = “100”;
Member member1 = jpa.find(memberId);
Member member2 = jpa.find(memberId);

member1 == member2; 같다
JPA경우는 같은 객체로 조회되는 것을 보장한다.
</pre></code>

#### 정리
* JPA를 사용하게된다면 데이터베이스와 객체의 패러다임을 개발자가 직접해결 할 필요 없이 JPA가 해결해준다.
* 자바컬렉션을 사용 하듯이 사용이 가능하다.
* 생산성 증가!!!!