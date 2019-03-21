# 인프런(백기선님)

## 3월 21일

### Spring을 이용하여 ORM 사용
- Spring data jpa를 이용하여 사용하고 있다.

#### Hibernate 관련 설정(properties)
- spring.jpa.hibernate.ddl-auto : 새롭게 디비스키마 생성, 업데이트, 검증 등을 할 수 있다.
- spring.jpa.show-sql : 실행되는 sql문을 확인 할 수가 있다.
- spring.jpa.properties.hibernate.format : 실행되는 sql문을 좀 더 깔끔 format으로 보여준다.
- @Enity : 엔티티와 맵핑해주는 어노테이션
- @Id : 기본키
- @GenerateValue : 기본키 생성 전략
- @Column : 컬럼 매핑정보

#### ibernateJpaAutoConfiguration
- HibernateJpa 자동설정 클래스
- 상속된 상위 클래스로가면 entitymanagerFactory가 있다.
- 그렇기때문에 entityManager를 사용 할 수 있게 된다.
- 결론은 jpa에 사용되는 모든 빈들을 자동으로 설정해준다.

#### entityManager
- entityManager를 통해서 데이터베이스에 영속화를 할 수 있다.

#### spring.jpa.hibernate.ddl-auto 주의점
- Update 사용시 디비스키마가 엔티티에 맞게 새롭게 추가 될 수는 있지만
- 엔티티에 필드를 지우면 디비스키마가 엔티티에 맞게 삭제되지는 않는다.

#### 엔티티 맵핑
- @Entity
- @Table
- @Id
- @GenerateValue
- @Column
- @Temporal
- @Transient

#### Value 타입 맵핑
- 엔티티 타입과 Value 타입 구분
    - 식별자가 있어야 하는가.
    - 독립적으로 존재해야 하는가. 
- Value 타입 종류
    - 기본 타입 (String, Date, Boolean, ...)
    - Composite Value 타입
    - Collection Value 타입
    - 기본 타입의 콜렉션
    - 컴포짓 타입의 콜렉션
    - 
- Composite Value 타입 맵핑
    - @Embeddable
    - @Embedded
    - @AttributeOverrides 
<pre><code>
@Embeddable
public class Address {

    private String street;

    private String city;

    private String state;

    private String zipCode;

}

  // Account

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "street", column = @Column(name = "home_street"))
    })
    private Address address;

</code></pre>

#### 관계 맵핑
- 관계에는 항상 두 엔티티가 존재 합니다.
    - 둘 중 하나는 그 관계의 주인(owning)이고
    - 다른 쪽은 종속된(non-owning) 쪽입니다.
    - 해당 관계의 반대쪽 레퍼런스를 가지고 있는 쪽이 주인

- 단방향에서의 관계의 주인은 명확합니다.
    - 관계를 정의한 쪽이 그 관계의 주인입니다. 
- 단방향 @ManyToOne
    - 기본값은 FK 생성 
- 단방향 @OneToMany
    - 기본값은 조인 테이블 생성 
- 양방향
    - FK 가지고 있는 쪽이 오너 따라서 기본값은 @ManyToOne 가지고 있는 쪽이 주인.
    - 주인이 아닌쪽(@OneToMany쪽)에서 mappedBy 사용해서 관계를 맺고 있는 필드를 설정해야 합니다. 
- 양방향
    - @ManyToOne (이쪽이 주인)
    - @OneToMany(mappedBy)
    - 주인한테 관계를 설정해야 DB에 반영이 됩니다. 


