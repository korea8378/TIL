# toby-spring

## 06월 9일

### keyword

#### 애노테이션 트랜잭션 속성과 포인트컷 
- 클래스나 메소드에 따라 제각각 속성이 다른, 세밀하게 튜닝된 트랜잭션 속성을 적용해야 하는 경우도 있다.
- 이런 경우라면 메소드 이름 패턴을 이용해서 일괄적으로 트랜잭션 속성을 부여하는 방식은 적합하지 않다.
- 기본 속성과 다른 경우가 있을때마다 일일이 포인트컷과 어드바이스를 새로 추가해줘야 하기 때문이다.
- 포인트컷 자체가 지저분해지고 설정파일도 복잡해지기 쉽다.

#### 트랜잭션 어노테이션
- 세밀한 트랜잭션 속성의 제어가 필요한 경우를 위해 스프링이 제공하는 다른 방법이 있다.
- 설정파일에서 패턴으로 분류 가능한 그룹을 만들어서 일괄적으로 속성을 부여하는 대신에 직접 타깃에 트랜잭션 속성정보를 가진 애노테이션을 지정하는 방법이다.
- 애노테션 정의를 읽고 그 내용과 특징을 이해할 수 있도록 애노테이션의 정의에 사용되는 주요 메타애노테이션을 알고 있어야 한다.
```{.java}
package org.springframework.transaction.annotation;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface Transactional {

  String value() default "";
  Propagation propagation() default Propagation.REQUIRED;
  Isolation isolation() default Isolation.DEFAULT;
  int timeout() default TransactionDefinition.TIMEOUT_DEFAULT;
  boolean readOnly() default false;
  Class<? extends Throwable>[] rollbackFor() default {};
  String[] rollbackForClassName() default {};
  Class<? extends Throwable>[] noRollbackFor() default {};
  String[] noRollbackForClassName() default {};
}
```
- @Transactional 애노테이션의 타깃은 메소드와 타입이다. 따라서 메소드, 클래스, 인터페이스에 사용할 수 있다.
- @Transactional 애노테이션을 트랜잭션 속성정보로 사용하도록 지정하면 스프링은 @Transactional이 부여된 모든 오브젝트를 자동으로 타깃 오브젝트로 인식한다.
- 이때 사용되는 포인트컷은 TransactionAttributeSourcePointcut이다.
  - TransactionAttributeSourcePointcut은 스스로 표현식과 같은 선정기준을 갖고 있지 않다.
  - 대신 @Transactional이 타입 레벨이든 메소드 레벨이든 상관없이 부여된 빈 오브젝트를 모두 찾아서 포인트컷의 선정 결과로 돌려준다.
- @Transactional은 기본적으로 트랜잭션 속성ㅇ르 저의하는 것이지만, 동시에 포인트컷의 자동등록에도 사용된다.

#### 대체 정책
- @Transactional을 적용할 때 4단계의 대체 정책을 이용하게 해준다.
- 메소드의 속성을 확인할 때 타깃 메소드, 타킷 클래스, 선언 메서드, 선언 타입의 순서에 따라서 @Transational이 적용됐는지 차례로 확인하고, 가장 먼저 발견되는 속성 정보를 사용하게 하는 방법이다.
  - 타깃 메소드의 @Transactional -> 타킷 클래스의 @Transactional -> 타깃 인터페이스 메소드의 @Transactinal -> 타깃 인터페이스의 @Trasactional
- @Transactional을 사용하면 대체 정책을 잘 활용해서 애노테이션 자체는 최소한으로 사용하면서도 세밀한 제어가 가능하다.
- 프록시 방식 AOP의 종류와 특징, 또는 비 프록시 방식 AOP의 동작원리를 잘 이해하고 있고 그에 따라 @Transactional의 적용 대상을 적절하게 변경해줄 확신이 깄거나, 반드시 인터페이스를 사용하는 타깃에만 트랜잭션을 적용할겠다는 확신이 있다면 인터페이스에 @Transactional을 적용하고, 아니라면 마음 편하게 타깃 클래스와 타깃 메소드에 적용하는 편이 낫다.

#### 트랜잭션 지원 테스트
![AOP-14](/Toby-Spring/img/AOP-14.png)
- 트랜잭션 전파 속성을 이용하여 트랜잭션이 다른 트랜잭션에 참여하게 할 수 있다.
- 선언적 트랜잭션
  - AOP를 이용해 코드 외부에서 트랜잭션의 기능을 부여해주고 속성을 지정 할 수 있게 하는 방법
- 프로그램에 의한 트랜잭션
  - TransactionTemplate이나 개별 데이터 기술의 트랜잭션 API를 사용해 직접 코드 안에서 사용하는 방법
- 스프링은 위의 두가지 방법을 모두 지원한다.

#### 트랜잭션 동기화와 테스트
- AOP 덕분에 프록시를 이용한 트랜잭션 부가기능을 간단하게 애플리케이션 전반에 적용할 수 있다.
- 데이터 액세스 기술에 상관없이, 또 트랜잭션 기술에 상관없이 DAO에서 일어나는 작업들을 하나의 트랜잭션으로 묶어서 추상 레벨에서 관리하게 해주는 트랜잭션 추상화가 없었다면 AOP를 통한 선언적 트랜잭션이나 트랜잭션 전파등은 불가능했을 것이다.

#### 트랜잭션 매니저와 트랜잭션 동기화
- 트랜잭션 추상화 기술의 핵심은 트랜잭션 매니저와 트랜잭션 동기화이다.
- PlatformTransactionaManager 인터페이스를 구현한 트랜잭션 매니저를 통해 구체적인 트랜잭션 기술의 종류에 상관없이 일관된 트랜잭션 제어가 가능했다.
- 트랜잭션 동기화 기술이 있었기에 시작된 트랜잭션 정보를 저장소에 보관해뒀다가 DAO에서 공유 할 수 있었다.
- 트랜잭션 동기화 기술은 트랜잭션 전파를 위해서도 중요한 역할을 한다. 진행 중인 트랜잭션이 있는지 확인하고, 트랜잭션 전파 속성에 따라서 이에 참여할 수 있도록 만들어주는 것도 동기화 기술 덕분이다.

#### 롤백테스트
- 롤백 테스트는 테스트 내의 모든 DB 작업을 하나의 트랜잭션 안에서 동작하게 하고 테스트가 끝나면 무조건 롤백해버리는 테스트를 말한다.
- 롤백 테스트는 DB 작업이 포함된 테스트가 수행돼도 DB에 영향을 주지 않기 때문에 장점이 많다.
- DB를 사용하는 코드를 테스트하는 건 여러 가지 이유로 작성하기 힘들다.

#### 테스를 위한 트랜잭션 애노테이션
- 테스트 코드에서도 트랜잭션 애노테이션을 사용 할 수 있다.
  - @Transactional
    - 테스트에 적용된 @Transactional은 기본벅으로 트랜잭션 강제 롤백시키도록 설정되어 있다.
  - @Rollback(false/default = true)
    - 테스트 메소드 안에서 진행되는 작업을 하나의 트랜잭션으로 묶고 싶기는 하지만 강제 롤백을 원하지 않을 수도 있다. 이경우에 사용한다.
  - @TransactionConfiguration
    - @Transactional은 테스트 클래스에 넣어서 모든 테스트 메소드에 일괄 적요할 수 있지만 @Rollback 애노테이션은 메소드 레벨에만 적용할 수 있다.
    - @TransactionConfiguration을 통해서 클래스 레벨로 부여 할 수 있다.
  - Popagtaion.NEVER
    - 클래스 레벨로 트랜잭션이 지정되어있고 일부 메소드에는 트랜잭션을 지정하고 싶지 않을때 사용한다.
- 위의 네가지 애노테이션을 잘 활용하면 DB가 사용되는 통합 테스트를 만들 때 매우 편리하다.
- DB가 사용되는 통합 테스트는 가능한 한 롤백 테스트로 만드는게 좋다.
- 각 테스트는 자신이 필요한 테스트 데이터를 보충해서 테스트를 진행하게 만들자.(독립적으로 실행 할 수 있게)
- 테스트는 어떤 경우에도 서로 의존하면 안 된다.