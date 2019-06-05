# toby-spring

## 06월 5일

### keyword

#### 트랜잭션
- 트랜잭션의 기본 개념은 더 이상 쪼갤 수 없는 최소 단위의 작업이다.
- 트랜잭션이라고 모두 같은 방식을 동작하는 것은 아니다.
- 트랜잭션 경계 안에서 진행된 작업은 commit()을 통해 모두 성공하든지 아니면 rollback()을 통해 모두 취소돼야 한다.

#### 트랜잭션의 동작 방식에 영향을 줄수 있는 네가지 속성
#### 1.트랜잭션 전파
- 트랜잭션 전파란 트랜잭션의 경계에서 이미 진행 중인 트랜잭션이 있을 때 또는 없을 때 어떻게 동작할 것인가를 결정하는 방식을 말한다.
![AOP-13](/Toby-Spring/img/AOP-13.png)
- 위 그림 같이 각각 독립적인 트랜잭션 경계를 가진 두 개의 코드가 있다고 하자.
- 그런데 A의 트랜잭션이 시작되고 아직 끝나지 않은 시점에서 B를 호출 했다면 B의 코드는 어떤 트랜잭션 안에서 동작해야 할까?
- 여러가지 시나리오를 생각 해보자
  - A에서 트랜잭션이 시작돼서 진행 중이라면 B의 코드는 새로운 트랜잭션을 만들지 않고 A에서 이미 시작한 트랜잭션에 참여할 수 있다. 이 경우 B를 호출한 작업까지 마치고 (2)의 코드를 진행하던 중에 예외가 발생했다고 하자. 이경우에는 A와 B의 코드에서 진행했던 모든 DB 작업이 다 취소된다. A와 B가 하나의 트랜잭션으로 묶여 있기 때문이다.
  - B의 트랜잭션은 이미 앞에서 시작한 A의 트랜잭션과 무관하게 독립적인 트랜잭션을 만들수 있다면, 이 경우 B의 트랜잭션 경계를 빠져나오는 순간 B의 트랜잭션은 독자적으로 커밋 또는 롤백될 것이고, A 트랜잭션은 그에 영향을 받지 않고 진행될 것이다.
- 독자적인 트랜잭션 경계를 가진 코드에 대해 이미 진행 중인 트랜잭션이 어떻게 영향을 미칠 수 있는가를 정의하는 것이 트랜잭션 전파 속성이다.
- 트랜잭션 전파 속성
  - PROPAGATION_REQUIRED
    - 가장 많이 사용되는 트랜잭션 전파속성이다.
    - 진행 중인 트랜잭션이 없으면 새로 시작하고, 이미 시작된 트랜잭션이 있으면 이에 참여한다.
    - A와 B가 모두 PROPAGATION_REQUIRED로 선언되어 있다면, A, B, A->B, B->A와 같은 네가지 조합된 트랜잭션이 가능하다.
  - PROPAGATION_REQUIRES_NEW
    - 항상 새로운 트랜잭션을 시작한다.
    - 앞에서 시작된 트랜잭션이 있든 없든 상관없이 새로운 트랜잭션을 만들어서 독자적으로 동작하게 한다.
    - 독립적인 트랜잭션이 보장돼야 하는 코드에 적용할 수 있다.
  - PROPAGATION_NOT_SUPPORTED
    - 이 속성을 사용하면 트랜잭션이 없이 동작하도록 만들 수도 있다.
    - 진행 중인 트랜잭션이 있어도 무시한다.
    - 트랜잭션을 무시하는 속성을 두는 데는 이유가 있다.
    - 트랜잭션 경계설정은 보통 AOP를 이용해 한 번에 많은 메소드에 동시에 적용하는 방법을 사용한다.
    - AOP의 포인트컷을 이용하면 복잡해질 수 있다.
    - 전파속성을 통해 트랜잭션을 무시하는게 간편하다.
- 트랜잭션 매니저를 통해 트랜잭션을 시작하려고 할때 getTransaction()이라는 메소드를 사용하는 이유는 바로 트랜잭션 전파 속성이 있기 때문이다.
- 트랜잭션 매니저의 getTransaction() 메소드는 항상 트랜잭션을 새로 시작하는 것이 아니다. 트랜잭션 전파 속성과 현재 진행중인 트랜잭션이 존재하는지 여부에 따라서 새로운 트랜잭션을 시작할 수도 있고, 이미 진행중인 트랜잭션에 참여하기만 할 수도 있다.

#### 2.격리수준
- 모든 DB 트랜잭션은 격리수준을 갖고 있어야 한다.
- 서버환경에서는 여러 개의 트랜잭션이 동시에 진행될 수 있다. 가능하다면 모든 트랜잭션이 순차적으로 진행돼서 다른 트랜잭션의 작업에 독립적인 것이 좋겠지만, 그러자면 성능이 크게 떨어질 수 밖에 없다.
- 적절하게 격리수준을 조정해서 가능한 많은 트랜잭션을 동시에 진행시키면서도 문제가 발생하지 않게 하는 제어가 필요하다.
- 격리수준은 기본적으로 DB에 설정되어 있지만 JDBC 드라이버나 DataSource 등에서 재설정할 수 있고, 필요하다면 트랜잭션 다위로 격리수준을 조정할 수 있다.
- 기본적으로 DB나 DataSource에 설정된 디폴트 격리수준을 따르는 편이 좋지만, 특별한 작업을 수행하는 메소드의 경우는 독자적인 격리수준을 지정할 필요가 있다.

#### 3.제한시간
- 트랜잭션을 수행하는 제한시간을 설정할 수 있다.
- 제한시간은 트랜잭션을 직접 시작할 수 있는 PROPAGATION_REQUIRED나 PROPAGATION_REQUIRES_NEW와 함계 사용해야만 의미가 있다.

#### 4.읽기전용
- 읽기전용으로 설정해두면 트랜잭션 내에서 데이터를 조작하는 시도를 막아줄 수 있다. 또한 데이터 액세스 기술에 따라서 성능이 향상될 수도 있다.

#### 트랜잭션 인터셉터와 트랜잭션 속성
- 메소드별로 다른 트랜잭션 정의를 적용하려면 어드바이스의 기능을 확장해야 한다.
- 메소드 이름 패턴에 따라 다른 트랜잭션가 적용되도록 구현하면 된다.

#### TransactionInterceptor
- 스프링에는 편리하게 트랜잭션 경계설정 어드바이스로 사용할 수 있도록 만들어진 TransactionInterceptor이 존재한다.
- TransactionInterceptor는 트랜잭션 정의를 메소드 이름 패턴을 이용해서 다르게 지정할 수 있는 방법을 제공해준다.
- TransactionInterceptor는 PlatformTransactionManager와 Properties 타입의 두가지 프로퍼티를 갖고 있다.
- Properties 타입인 두 번째 프로퍼티 이름은 transactionAttributes로, 트랜잭션 속성을 정의한 프로퍼티다.
- 스프링에서 제공하는 TransactionInterceptor에는 기본적으로 두 가지 종류의 예외처리 방식이 있다.
  - 런타임 예외가 발생하면 트랜잭션은 롤백된다.
  - 타깃 메소드가 런타임 예외가 아닌 체크 예외를 던지는 경우에는 이것을 예외상왕으로 해석하지 않고 일종의 비즈니스 로직에 따른, 의미가 있는 리턴 방식의 한 가지로 인식해서 트랜잭션을 커밋해버린다.
- TransactionInterceptor는 위의 두가지 종류의 예외처리 방식을 따르지 않을 수도 있다.
  - 특정 체크 예외의 경우는 트랜잭션을 롤백
  - 특정 런타임 예외에 대해서는 트랜잭션을 커밋

#### 메소드 이름 패턴을 이용한 트랜잭션 속성 지정
- Properties 타입의 transactionAttributes 프로퍼티는 메소드 패턴과 트랜잭션 속성키와 값으로 갖는 컬렉션이다.
```{.java}
  PROPAGATION_NAME, ISOLATION_NAME, readOnly, timeout_NNNN, -Exception1, +Exception2

  -Exception1 : 체크 예외 중에서 롤백 대상을 추가할 것을 넣는다. 한 개 이상을 등록할 수 있다.
  +Exception2 : 런타임 예외지만 롤백시키지 않을 예외들을 넣는다. 한 개 이상 등록할 수 있다.
```
- 트랜잭션 속성은 위와 같은 문자열로 정의할 수 있다.
- 이 중에서 트랜잭션 전파 항목만 필수이고 나머지는 다 생략 가능하다.
- 생략하면 모든 DefaultTransactionDefinition에 설정된 디폴트 속성이 부여된다.
- 모든 항목이 구분 가능하기 때문에 순서는 바꿔도 상관없다.
```{.java}
	<bean id="transactionAdvice"
		  class="org.springframework.transaction.interceptor.TransactionInterceptor">
		<property name="transactionManager" ref="transactionManager"/>
		<property name="transactionAttribtues">
			<props>
				<prop key="get*">PROPAGATION_REQUIRED,readOnly,timeout_30</prop>
				<prop key="upgrade*">PROPAGATION_REQUIRES_NEW,ISOLATION_SERIALIZABLE</prop>
			</props>
		</property>
	</bean>
```
- 트랜잭션이 시작되고 다른 메소드를 호출하여 트랜잭션을 참여 하게 되더라도 readOnly나 timeout 등의 속성은 처음 시작될 때가 아니라면 적용되지 않는다.
- 때로는 메소드 이름이 하나 이상의 패턴과 일치하는 경우가 있다. 이때는 메소드 이름 패턴중에서 가장 정확히 일치하는 것이 적용된다.

#### tx 네임스페이스를 이용한 설정 방법
```{.java}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xmlns:tx="http://www.springframework.org/schema/tx"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
						http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
						http://www.springframework.org/schema/aop 
						http://www.springframework.org/schema/aop/spring-aop-3.0.xsd
						http://www.springframework.org/schema/tx 
						http://www.springframework.org/schema/tx/spring-tx-3.0.xsd">
	<tx:advice id="transactionAdvice">

  ...
	<aop:config>
		<aop:advisor advice-ref="transactionAdvice" pointcut="bean(*Service)" />
	</aop:config>

  <tx:advice id="transactionAdvice">
		<tx:attributes>
			<tx:method name="get*" read-only="true"/>
			<tx:method name="*" />
		</tx:attributes> 
	</tx:advice>
```

#### 포인트컷과 트랜잭션 속성의 적용 전략
- 트랜잭션 포인트컷 표현식은 타입 패턴이나 빈 이름을 이용하라
- 공통된 메소드 이름 규칙을 최소한의 트랜잭션 어드바이스와 속성을 정의한다.
- 프록시 방식 AOP는 같은 타깃 오브젝트 내의 메소드를 호출할 때는 적용되지 않는다.
  - 바로 위(세번째) 문제의 해결방법
    - 스프링 API를 이용해 프록시 오브젝트에 대한 레퍼런스를 가져온 뒤에 같은 오브젝트의 메소드 호출도 프록시를 이용하도록 강제하는 방법이다. (복잡해지기때문에 추천x)
    - AspectJ와 같은 타깃의 바이트코드를 직접 조작하는 방식하는 방식의 AOP 기술을 적용하는 것이다.

#### 트랜잭션 경계설정의 일원화
- 트랜잭션 경계설정의 부가기능을 여러 계층에서 중구난방으로 적용하는 건 좋지 않다.
- 일반적으로 특정 계층의 경계를 트랜잭션 경계와 일치시키는 것이 바람직하다.
- 비즈니스 로직을 담고 있는 서비스 계층 오브젝트의 메소드가 트랜잭션 경계를 부여하기에 가장 적절한 대상이다.
