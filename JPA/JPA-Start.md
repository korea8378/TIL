# JPA

## 11월 8일

### JPA start

#### MAVEN으로 프로젝트 시작(persistence.xml설정을 하기 위해)

#### JPA 하이버네이트, H2 의존성 추가

#### 엔티티 매니저 팩토리
* persistence.xml의 설정 정보를 사용해서 엔티니 매니저 팩토리를 생성해야 한다.
* 이때 persistence 클래스를 사용하는데 이 클래스는 매니저 팩토리를 생성해서 JPA를 사용 할 수 있게 준비한다.
* persistence.xml의 설정 정보를 읽어서 JPA를 동작시키기 위한 기반 객체를 만들고 JPA 구현체에  따라서는 데이터베이스 커넥션 풀도 생성하므로 엔티티 매니저 팩토리를 생성하는 비용은 아주 크다.
* 엔티티 매니저 팩토리는 애플리케이션 전체에 딱 한번만 생성하고 공유해서 사용해야 한다.

#### 엔티티 매니저
* 엔티티 매니저 팩토리에서 엔티티 매니저를 생성한다.
* 엔티티 매너저를 사용해서 엔티티를 데이터베이스에 등록/수정/삭제/조회 할 수 있다.
* 내부에 데이터베이스 커넥션을 유지하면서 데이터베이스와 통신
* 엔티티매니저는 데이터베이스 커넥션과 밀접한 관계가 있으므로 스레드간에 공유하거나 재사용하면 안 된다.

#### 트랜잭션 관리
* JPA를 사용하면 항상 트랜잭션 안에서 데이터를 변경 해야한다.
* 트랜잭션을 시작하려면 엔티티 매니저에서 트랜잭션 API를 받아와야 한다.

<pre><code>
public class JpaMain {
    public static void main(String[] args) {

        //엔티티 매니저 팩토리 - 생성
        EntityManagerFactory emf =
                Persistence.createEntityManagerFactory("jpabook");

        //엔티티 매니저 - 생성
        EntityManager em = emf.createEntityManager();

        //트랜잭션 - 획득
        EntityTransaction tx = em.getTransaction();

        try {

            tx.begin(); //트랜잭션 - 시작
            logic(em); //비즈니스 로직 실행
            tx.commit(); //트랜잭션 - 커밋

        } catch (Exception e) {

            tx.rollback(); //트랜잭션 - 롤백

        } finally {

            em.close(); //엔티티 매니저 - 종료
        }

        emf.close(); //엔티티 매니저 팩토리 - 종료

    }

    //비즈니스 로직
    private static void logic(EntityManager em) {

        String id = "id1";
        Member member = new Member();
        member.setId(id);
        member.setUsername("동준");
        member.setAge(20);

        //등록
        em.persist(member);

        //수정
        member.setAge(26);

        //한 건 조회
        Member findMember = em.find(Member.class, id);
        System.out.println("findMember=" + findMember.getUsername() + ", age=" + findMember.getAge());

        //목록 조회
        List<Member> members =
                em.createQuery("SELECT m from Member m",Member.class)
                .getResultList();
        System.out.println("members.size=" + members.size());

        //삭제
        em.remove(member);

    }
}
</code></pre>

#### JPQL
* 엔티티 객체를 대상으로 쿼리한다. 클래스와 필드를 대상으로 쿼리한다.

#### SQL
* 데이터베이스 테이블을 대상으로 쿼리한다.
