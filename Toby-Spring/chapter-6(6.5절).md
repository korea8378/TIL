# toby-spring

## 05월 31일

### keyword

#### 스프링 AOP

#### 자동 프록시 생성
- 투명한 부가기능을 적용하여 타깃 코드는 깔끔한 채로 남아 있고, 부가기능은 한 번만 만들어 모든 타깃과 메소드에서 재사용이 가능하고, 타깃의 적용 메소드를 선정하는 방식도 독립적으로 작성할 수 있도록 분리 하였다.
- 프록시 팩토리 빈 방식의 접근 방법의 한계라고 생각했던 두가지 문제 중 하나는 해결하였다.
- 해결 한 문제
  - 부가기능이 타깃 오브젝트마다 새로 만들어지는 문제는 스프링 ProxyFactoryBean의 어드바이스를 통해 해결하였다.
- 남은 한개의 문제
  - 부가기능의 적용 필요한 타깃 오브젝트마다 거의 비슷한 내용의 ProxyFactoryBean 빈 설정정보를 반복적으로 추가하여야 한다.

#### 빈 후처리기를 이용한 자동 프록시 생성기
- 스프링은 OCP의 가장 중요한 요소인 유연한 확장이라는 개념을 스프링 컨테이너 자신에게도 다양한 방법으로 적용하고 있다.
- 스프링은 컨테이너로서 제공하는 기능 중에서 변하지 않는 핵심적인 부분외에는 대부분 확장할 수 있도록 확장 포인트를 제공해준다.
- 확장 포인트로서는 BeanPostProcessor 인터페이스를 구현해서 만드는 빈 후처리기가 있다.
- 빈 후처리기는 이름 그대로 스프링 빈 오브젝트로 만들어지고 난 후에, 빈 오브젝트를 다시 가공할 수 있게 해준다.
- 스프링이 제공하는 빈 후처리기 중의 하나인 DefaultAdvisorAutoProxyCreator를 이용 해보자
- DefaultAdvisorAutoProxyCreator는 어드바이저를 이용한 자동 프록시 생성기다.
- 스프링은 빈 후처리기가 빈으로 등록되어 있으면 빈 오브젝트가 생성될 때마다 빈 후처리기에 보내서 후처리 작업을 요청한다.
- 빈 후처리기는 빈 호브젝트의 프로퍼티를 강제로 수정할 수도 있고 별도의 초기화 작업을 수행할 수도 있다. 따라서 스프링이 설정을 참고해서 만든 오브젝트가 아닌 다른 오브젝트를 빈으로 등록시키는 것이 가능하다.
![AOP-12](/Toby-Spring/img/AOP-12.png)
- 적용할 빈을 선정하는 로직이 추가된 포인트컷이 담긴 어드바이저를 등록하고 빈 후처리기를 사용하면 일일이 ProxyFactoryBean 빈을 등록하지 않아도 타깃 오브젝트에 자동으로 프록시가 적용되게 할 수 있다.

#### 확장된 포인트컷
- 포인트컷은 클래스 필터와 메소드 매처 두 가지를 돌려주는 메소드를 갖고 있다.
- 실제 포인트컷의 선별 로직은 이 두 가지 타입의 오브젝트에 담겨 있다.
```{.java}
public interface Pointcut {
  ClassFilter getClassFilter();
  MethodMatcher getMethodMatcher();
}
```
- Pointcut 선정 기능을 모두 적용한다면 먼저 프록시를 적용할 클래스인지 판다하고 나서, 적용 대상 클래스인 경우에는 어드바이스를 적용할 메소드인지 확인하는 식으로 동작한다.
- 모든 빈에 대해 프록시 자동 적용 대상을 선별해야 하는 빈 후처리기인 DefaultAdvisorAutoProxyCreator는 클래스와 메소드 선정 알고르짐을 모두 갖고 있는 포인트컷이 필요하다.

#### 포인트컷 테스트
```{.java}
@Test
	public void classNamePointcutAdvisor() {
		NameMatchMethodPointcut classMethodPointcut = new NameMatchMethodPointcut() {  
			public ClassFilter getClassFilter() {
				return new ClassFilter() {
					public boolean matches(Class<?> clazz) {
						return clazz.getSimpleName().startsWith("HelloT");
					}
				};
			}
		};
		classMethodPointcut.setMappedName("sayH*");

		checkAdviced(new HelloTarget(), classMethodPointcut, true);  

		class HelloWorld extends HelloTarget {};
		checkAdviced(new HelloWorld(), classMethodPointcut, false);  
		
		class HelloToby extends HelloTarget {};
		checkAdviced(new HelloToby(), classMethodPointcut, true);
	}


	private void checkAdviced(Object target, Pointcut pointcut, boolean adviced) { 
		ProxyFactoryBean pfBean = new ProxyFactoryBean();
		pfBean.setTarget(target);
		pfBean.addAdvisor(new DefaultPointcutAdvisor(pointcut, new UppercaseAdvice()));
		Hello proxiedHello = (Hello) pfBean.getObject();
		
		if (adviced) {
			assertThat(proxiedHello.sayHello("Toby"), is("HELLO TOBY"));
			assertThat(proxiedHello.sayHi("Toby"), is("HI TOBY"));
			assertThat(proxiedHello.sayThankYou("Toby"), is("Thank You Toby"));
		}
		else {
			assertThat(proxiedHello.sayHello("Toby"), is("Hello Toby"));
			assertThat(proxiedHello.sayHi("Toby"), is("Hi Toby"));
			assertThat(proxiedHello.sayThankYou("Toby"), is("Thank You Toby"));
		}
	}
```

#### DefaultAdvisorAutoProxyCreator의 적용
#### 클래스 필터를 적용한 포인트컷 작성
```{.java}
public class NameMatchClassMethodPointcut extends NameMatchMethodPointcut {
	public void setMappedClassName(String mappedClassName) {
		this.setClassFilter(new SimpleClassFilter(mappedClassName));
	}
	
	static class SimpleClassFilter implements ClassFilter {
		String mappedName;
		
		private SimpleClassFilter(String mappedName) {
			this.mappedName = mappedName;
		}

		public boolean matches(Class<?> clazz) {
			return PatternMatchUtils.simpleMatch(mappedName, clazz.getSimpleName());
		}
	}
}
```

#### 어드바이저를 이용하는 자동 프록시 생성기 등록
```{.java}
<bean class="org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator" />
```
- 적용할 자동 프록시 생성기인 DefaultAdvisorAutoProxyCreator는 등록된 빈 중에서도 Advisor 인터페이스를 구현한 것을 모두 찾는다.
- 생성되는 모든 빈에 대해 어드바이저의 포인트컷을 적용해보면서 프록시 적용 대상을 선정한다.
- 빈 클래스가 프록시 선정 대상이라면 프록시를 만들어 원래 빈 오브젝트와 바꿔치기한다.
- 원래 빈 오브젝트는 프록시 뒤에 연결돼서 프록시를 통해서만 접근 가능하게 바뀌는 것이다. 

#### 포인트컷 등록
```{.java}
	<bean id="transactionPointcut" class="springbook.user.service.NameMatchClassMethodPointcut">
		<property name="mappedClassName" value="*ServiceImpl" />
		<property name="mappedName" value="upgrade*" />
	</bean>
```
- ServiceImpl로 이름이 끝나는 클래스와 upgrade로 시작하는 메소드를 선정해주는 포인트 컷이다.

#### 어드바이스와 어드바이저
- 어드바이저를 이용하는 자동 프록시 생성기인 DefaultAdvisorAutoProxyCreator에 의해 자동수집되고, 프록시 대상 선정 과정에 참여하며, 자동생성된 프록시에 다이내믹하게 DI 돼서 동작하는 어드바이저가 된다.

#### 포인트컷 표현식을 이용한 포인트컷
- 리플렉션 API를 통해서 클래스와 메소드의 이름, 정의된 패키지, 파라미터, 리턴 값은 물론이고 부여된 애노테이션이나 구현한 인터페이스, 상속한 클래스등의 정보까지도 알아낼 수 있다.
- 하지만 리플렉션 API는 코드를 작성하기가 제법 번거롭다는 단점이 있다. 또한 리플렉션 API를 이용해 메타정보를 비교하는 방법은 조건이 달리질 때마다 포인트컷 구현 코드를 수정해야 하는 번거로움도 있다.
- 스프링은 아주 간단하고 효과적인 방법으로 포인트컷의 클래스와 메소드를 선정하는 알고리즘을 작성할 수 있는 방법을 제공한다.
- 정규식이나 JSP의 EL과 비슷한 일종의 표현식 언어를 사용해서 포인트컷을 작성할 수 있도록 하는 방법이다.
- 이것을 포인트컷 표현식이라고 부른다.

#### 포인트컷 표현식
- 포인트컷 표현식을 지원하는 포인트컷을 적용하려면 AspectExpressionPointcut 클래스를 사용하면 된다.
- 앞선 사용하였던 NameMatchClassMethodPointcut은 클래스필터와 메소드선정을 위한 메소드 매처 두가지를 각각 제공해야 했다.
- 하지만 AspectExpressionPointcut은 클래스와 메소드의 선정 알고리즘을 포인트컷 표현식을 이용해 한 번에 지정할 수 있게 해준다.
- 스프링에서 사용하는 포인트컷 표현식은 AspectJ라는 유명한 프레임워크에서 제공하는 것을 가져와 일부 문법을 확장해서 사용하는 것이다.

#### 포인트컷 표현식 문법
- 포인트컷 지시자 중에서 가장 대푝적으로 사용되는 것은 execution()이다.
```{.java}
@Test
	public void methodSignaturePointcut() throws SecurityException, NoSuchMethodException {
		AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();
		pointcut.setExpression(
				"execution(* minus(int,int))");
		
		assertThat(pointcut.getClassFilter().matches(Target.class) &&
				   pointcut.getMethodMatcher().matches(
					  Target.class.getMethod("minus", int.class, int.class), null), is(true));
		
		assertThat(pointcut.getClassFilter().matches(Target.class) &&
				   pointcut.getMethodMatcher().matches(
					  Target.class.getMethod("plus", int.class, int.class), null), is(false));

		assertThat(pointcut.getClassFilter().matches(Bean.class) &&
				pointcut.getMethodMatcher().matches(
						Target.class.getMethod("method"), null), is(false));
	}
```
- AspectExpressionPointcut 클래스의 오브젝트를 만들고 포인트컷 표현식을 expression 프로퍼티에 넣어주면 포인트컷을 사용할 준비가 된다.
- 포인트컷 표현식은 메소드 시그니처를 execution() 안에 넣어서 작성한다.
- execution()은 메소드를 실행에 대한 포인트컷이라는 의미이다.

#### 포인트컷 표현식을 이용하는 포인트컷 적용
- AspectJ 포인트컷 표현식은 메소드를 선정하는 데 편리하게 쓸 수 있는 강력한 표현식 언어이다.
- execution()외에도 몇 가지 표현식 스타일을 갖고 있다.
- 대표적으로 스프링에서 사용될 때 빈의 이름으로 비교하는 bean()이 있다.
- 특정 애노테이션 타입, 메소드, 파라미터에 적용되어 있는 것을 보고 메소드를 선정하게 하는 포인트컷도 만들수 있다.
```{.java}
//변경 전
<bean id="transactionPointcut" class="springbook.user.service.NameMatchClassMethodPointcut">
		<property name="mappedClassName" value="*ServiceImpl" />
		<property name="mappedName" value="upgrade*" />
</bean>

//변경 후
<bean id="transactionPointcut" class="org.springframework.aop.aspectj.AspectJExpressionPointcut">
		<property name="expression" value="execution(* *..*ServiceImpl.upgrade*(..))" />
</bean>
```
- 이제 NameMatchclassMethodPointcut과 같이 직접 만든 포인트컷 구현 클래스를 사용할 일은 없다.

#### 타입 패턴과 클래스 이름 패턴
- 클래스 이름 패턴과 포인트컷 표현식에서 사용하는 타입 패턴은 중요한 차이점이 있다.
- 포인트컷 표현식의 클래스 이름에 적용되는 패턴은 클래스 이름 패턴이 아니라 타입 패턴이다.
```{.java}
  static class TestUserService extends UserServiceImpl {
		private String id = "madnite1"; // users(3).getId()
		
		protected void upgradeLevel(User user) {
			if (user.getId().equals(this.id)) throw new TestUserServiceException();  
			super.upgradeLevel(user);  
		}
	}
```
- TestUserService의 타입은 TestUserService, UserServiceImpl(슈퍼클래스), UserService(구현 인터페이스) 세개의 타입을 가지고 있다.
- 포인트컷 표현식은 인터페이스, 슈퍼클래스의 타입도 인식 해준다.

#### AOP란 무엇인가?
#### 트랜잭션 서비스 추상화
- 트랜잭션 상화란 인터페이스와 DI를 통해 무것을 하는지는 남기고, 그것을 얻허게 하는지를 분리하는 것이다.
- 어떻게 할지는 더 이상 비즈니스 로직 코드에는 영향을 주지 않고 독깁적으로 변경할 수 있게 된다.

#### 프록시와 데코레이터 패턴
- DI를 이용해 데코레이터 패턴을 적용 하였다.(트랜잭션과 비즈니스 로직 분리)
- 투명한 부가기능 부여를 가능하게 하는 데코레이터 패턴의 적용 덕에 비즈니스 로직을 담당하는 클래스도 자신을 사용하는 클라이언트와 DI 관계를 맺을 이유를 찾게 됐다.
- 클라이언트가 인터페이스와 DI를 통해 접근하도록 설계하도록, 데코레이터 패턴을 적용해서, 비즈니스 로직을 담은 클래스의 코드에는 전혀 영향을 주지 않으면서 트랜잭션이라는 부가기능을 자유롭게 부여할 수 있는 구조를 만들었다.
- 데코레이턴 패턴을 통하여 비즈니스 로직 코드는 트랜잭션과 같은 성격이 다른 코드로부터 자유로워졌고, 독립적으로 로직을 검증하는 고립된 단위 테스트를 만들 수도 있게 됐다.

#### 다이내믹 프록시와 프록시 팩토리 빈
- 비즈니스 로직 인터페이스의 모든 메소드마다 트랜잭션 기능을 부여하는 코드를 넣어 프록시 클래스를 만드는 작업이 오히려 큰 짐이 됐다.
- 트랜잭션 기능을 부여하지 않아도 되는 메소드조차 프록시로서 위임 기능이 필요하기 때문에 일일이 다 구현을 해줘야 했다.
- 그래서 프록시 클래스 없이도 프록시 오브젝트를 런타임 시에 만들어주는 JDK 다이내믹 프록시 기술을 적용했다.
- 동일한 기능의 프록시를 여러 오브젝트에 적용할 경우 오브젝트 단위로는 중복이 일어나는 문제는 해결하지 못했다.
- 스프링의 프록시 팩토리 빈을 이용해서 다이내믹 프록시 생성 방법에 DI를 도입하였다.

#### 자동 프록시 생성 방법과 포인트컷
- 트랜잭션 적용 대상이 되는 빈마다 일일이 프록시 팩토리 빈을 설정해줘야 한다는 부담이 남아 있었다.
- 이를 해결하기 위해서 스프링 컨테이너의 빈 생성 후처리 기법을 활용해 컨테이너 초기화 시점에서 자동으로 프록시를 만들어주는 방법을 도입했다.
- 프록시를 적용할 대상을 일일이 지정하지 않고 패턴을 이용해 자동으로 선정할 수 있도록, 클래스를 선정하는 기능을 담은 확장된 포인트컷을 사용했다.
- 이로 인해 트랜잭션 부가기능을 어디에 적용하는지에 대한 정보를 포인트컷이라는 독립적인 정보로 완전히 분리할 수 있었다.

#### 부가기능의 모듈화
- 관심사가 같은 코드를 분리해 한데 모으는 것은 소프트웨어 개발의 가장 기본이 되는 원칙이다.
- 그렇게 관심사가 같은 코드를 객체지향 설계 원칙에 따라 분리하고, 서로 낮은 결합도를 가진 채로 독립적이고 유연하게 확장할 수 있는 모듈로 만드는 것이다.
- 코드를 분리하고, 한데 모으고, 인터페이스를 도입하고, DI를 통해 런타임 시에 의존관계를 만들어줌으로써 대부분의 문제를 해결할 수 있었다.
- 트랜잭션 같은 부가기능은 핵심기능과 같은 방식으로는 모듈화하기가 매우 힘들다.
- 부가기능이기 때문에 스스로는 독립적인 방식으로 존해서는 적용되기 어렵기 때문이다.
- 지금까지 해온 모든 작업은 핵심기능에 부여되는 부가기능을 효과적으로 모듈화하는 방법을 찾는 것이었고, 어드바이스와 포인트컷을 결합한 어드바이저가 단순하지만 이런 특성을 가진 모듈의 원시적인 형태로 만들지게 됐다.

#### AOP: 애스펙트 지향 프로그래밍
- 애스펙트란 그 자체로 애플리케이션의 핵심기능을 담고 있지는 않지만, 애플리케이션을 구성하는 중요한 한 가지 요소이고, 핵심기능에 부가되어 의미를 갖는 특별한 모듈을 가리킨다.
- 애스펙트는 부가될 기능을 저의한 코드인 어드바이스와, 어드바이스를 어디에 적용할지를 결정하는 포인트컷을 함계 갖고 있다.
- 어드바이저는 아주 단순한 형태의 애스펙트라고 볼 수 있다.
- 부가기능이 핵심기능의 모듈에 침투해 들어가면 설계와 코드가 모두 지저분해진다.
- 게다가 이런 부가기능 코드는 여기저기 메소드에 마구 흩어져 코드 중복이 발생 한다.
- 애플리케이션의 핵심적인 기능에서 부가적인 기능을 분리해서 애스펙트라는 독특한 모듈로 만들어서 설계하고 개발하는 방법을 애스펙트 지향 프로그래밍 또는 약자로 AOP라고 부른다.
- AOP는 OOP를 돕는 보조적인 기술이지 OOP를 완전히 대체하는 새로운 개념은 아니다.
- AOP는 애스펙트를 분리함으로써 핵심 기능을 설계하고 구현할 때 객체지향적인 가치를 지킬 수 있도록 도와주는 것이라고 보면 된다.
- AOP는 결국 애플리케이션을 다양한 측면에서 독립적으로 모델링하고, 설계하고, 개발할 수 있도록 만들어주는 것이다.
- 애플리케이션을 특정한 관점을 기준으로 바라볼 수 있게 해준다는 의미에서 AOP를 관점 지향 프로그래밍이라도 한다.

#### AOP 적용 기술
#### 프록시를 이용한 AOP
- 스프링 AOP의 부가기능을 담은 어드바이스가 적용되는 대상은 오브젝트의 메소드다.
- 프록식 방법을 사용했기 때문에 메소드 호출과정에 참여해서 부가기능을 제공해주게 되어 있다.
- 타깃의 메소드를 호출하는 전후에 다양한 부가기능을 제공할 수 있다.
- 독립적으로 개발한 부가기능 모듈을 당양한 타깃 오브젝트의 메소드에 다이내믹하게 적용해주기 위해 가장 중요한 역할을 맡고 있는 게 프록시다.
- 그래서 스프링 AOP는 프록시 방식의 AOP라고 할 수 있다.

#### 바이트코드 생성과 조작을 통한 AOP
- AOP 기술의 원조이자, 가장 강력 AOP 프레임워크로 꼽히는 AspectJ는 프록시를 사용하지 않는 대표적인 AOP 기술이다.
- 스프링도 AspectJ의 뛰어난 포인트컷 표현식을 차용해서 사용할 만큼 매우 성숙하고 발전한 AOP 기술이다.
- AspectJ는 프록시처럼 간접적인 방법이 아니라, 타깃 오브젝트를 뜯어 고쳐서 부가기능을 직접 넣어주는 직접적인 방법을 사용한다.
- 부가기능을 넣는다고 타깃 오브젝트의 소스코드를 수정할 수는 없으니, 컴파일된 타깃의 클래스 파일 자체를 수정하거나 클래스가 JVM에 로딩되는 시점을 가로채서 바이트코드를 조작하는 복잡한 방법을 사용한다.
- 소스코드를 수정하지는 않으므로 개발자는 계속해서 비즈니스 로직에 충실한 코드를 만들 수 있다.
- Aspectj는 왜 컴파일 된 클래스 파일 수정이나 바이트 코드 조작과 같은 복잡한 방법을 사용할까?
	- 첫째, 바이트코드를 조작해서 타깃 오브젝트를 직접 수정해버리면 스프링과 같은 DI 컨테이너의 도움을 받아서 자동 프록시 생성 방식을 사용하지 않아도 AOP를 적용할 수 있기 때문이다. 스프링과 같은 컨테이너가 사용되지 않는 환경에서도 손쉽게 AOP의 적용 가능해진다.
	- 둘째, 프록시 방식보다 훨씬 강력하고 유연한 AOP가 가능하기 때문이다. 프록시를 AOP의 핵심 매커니즘으로 사용하면 부가기능을 부여할 대상은 클라이너트가 호출 할 때 사용하는 메소드로 제한된다. 하지만 바이트코드를 직접 조작해서 AOP를 적용하면 오브젝트의 생성, 필드 값의 조회와 조작, 스태틱 초기화 등의 다양한 작업에 부가기능을 부여해줄 수 있다.
- 일반적인 AOP를 적용하는 데는 프록시 방식의 스프링 AOP로도 충분하다.

#### AOP의 용어
- 타깃
	- 타깃은 부가기능을 부여할 대상이다. 핵심 기능을 담은 클래스일 수도 있지만 경우에 따라서는 다른 부가기능을 제공하는 프록시 오브젝트일 수도 있다.
- 어드바이스
	- 어드바이스는 타깃에게 제공할 부가기능을 담은 모듈이다. 어드바이스는 오브젝트로 정의되기도 하지만 메소드 레벨에서 정의할 수도 있다.
- 조인 포인트
	- 조인 포인트란 어드바이스가 적용될 수 있는 위치를 말한다. 스프링의 프록시 AOP에서 조인 포인트는 메소드의 실행 단계뿐이다. 타깃 오브젝트가 구현한 인터페이스의 모든 메소드는 조인 포인트가 된다.
- 포인트 컷
	- 포인트컷이란 어드바이스를 적용할 조인 포인트를 선별하는 작업 또는 그 기능을 정의한 모듈을 말한다. 스프링 AOP의 조인 포인트는 메소드의 실행이므로 스프링의 포인틐것은 메소드를 선정하는 기능을 갖고 있다. 그래서 포인트컷 표현식은 메소드의 실행이라는 의미인 execution으로 시작하고, 메소드의 시그니처를 비교하는 방법으로 주로 이용한다.
- 프록시
	- 프록시는 클라이언트와 타깃 사이에 투명하게 존재하면서 부가기능을 제공하는 오브젝트다. DI를 통해 타깃 대신 클라이언트에게 주입되며, 클아이언트의 메소드 호출을 대신 받아서 타깃에 위임해주면서, 그 과정에서 부가기능을 부여한다. 스프링은 프록시를 이용해 AOP를 지원한다.
- 어드바이저
	- 어드바이저는 포인트컷과 어드바이스를 하나씩 갖고 있는 오브젝트다. 어드바이저는 어떤 부가기능(어드바이스)을 어디(포인트컷)에 전달할 것인가를 알고 있는 AOP의 가장 기본이 되는 모듈이다. 스프링은 자동 프록시 생성기가 어드바이저를 AOP 작업의 정보로 활용한다. 어드바이저는 스프링 AOP에서만 사용되는 특별한 용어이고, 일반적인 AOP에서는 사용되지 않는다.
- 에스펙트
	- OOP의 클래스와 마찬가지로 애스펙트는 AOP의 기본 모듈이다. 한 개 또는 그 이상의 포인트컷과 어드바이스의 조합으로 만들어지며 보통 싱글톤 형태의 오브젝트로 존재한다. 스프링의 어드바이저는 아주 단순한 애스펙트라고 볼 수도 있다.

#### AOP 네임스페이스
- 스프링의 프록시 방식 AOP를 적용하려면 최소한 네 가지 빈을 등록해야 한다.
	- 자동 프록시 생성기
		- 스프링의 DefaultAdvisorAutoProxyCreator 클래스를 빈으로 등록한다. 다른 빈을 DI 하지도 않고 자신도 DI 되지 않으며 독립적으로 존재한다. 따라서 id도 굳이 필요하지 않다.
		- 애플리케이션 컨텍스트가 빈 오브젝트를 생성하는 과정에 빈 후처리기로 참여한다. 빈으로 등록된 어드바이저를 이용해서 프록시를 자동으로 생성하는 기능을 담당한다.
	- 어드바이스
		- 부가기능을 구현 클래스를 빈으로 등록한다.
	- 포인트 컷
		- 스프링의 AspectJExpressionPointcut을 빈으로 등록하고 expression 프로퍼티에 포인트컷 표현식을 넣어주면 된다. 코드를 작성할 필요는 없다.
	- 어드바이저
		- 스프링의 DefaultPointcutAdvisor 클래스를 빈으로 등록해서 사용한다. 어드바스와 포인트컷을 프로퍼티로 참조하는 것 외에는 기능은 없다. 자동 프록시 생성기에 의해 자동 검색되어 사용된다.
- 스프링에서는 이렇게 AOP를 위해 기계적으로 적용하는 빈들을 간편한 방법으로 등록 할 수 있다.
- 스프링은 AOP와 관련된 태그를 정의해둔 aop 스키마를 제공한다.
- aop 스키마에 정의된 태그는 별도의 네임스페이스를 지정해서 디폴트 네임스페이스의 bean 태그와 구분해서 사용할 수 있다.
```{.java}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xmlns:tx="http://www.springframework.org/schema/tx"
	xsi:schemaLocation="http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-3.0.xsd
		http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-3.0.xsd">
	
	<aop:cofig>
		<aop:pointcut id="transasctionPointcut"
					  expression="execution(* *..*ServiceImpl.upgrade*(..))"/>
		<aop:advisor advice-ref="transactionAdvice" pointcut-ref="transasctionPointcut"/>
	</aop:cofig>
		
</beans>
```
- 포인트컷이나 어드바이저, 자동 포인트컷 생성기 같은 득별한 기능을 가진 빈들은 별도의 스키마에 정의된 전용 태그를 사용해 정의해주면 편리하다.
- 애플리케이션을 구성하는 컴포너는 빈과 컨테이너에 의해 사용되는 기반 기능을 지원하는 빈은 구분이 되는 것이 좋다.

#### 어드바이저 내장 포인트컷
- AspectJ 포인트컷 표현식을 활용하는 포인트컷은 스트링으로 된 표현식을 담은 expression 프로퍼티 하나만 설정해주면 사용할 수 있다.
```{.java}
	<aop:cofig>
		<aop:advisor advice-ref="transactionAdvice" 
			pointcut-ref="execution(* *..*ServiceImpl.upgrade*(..))"/>
	</aop:cofig>
```
- 태그가 하나 줄었으니 포인트컷을 독립적으로 정의하는 것보다 간결해서 보기 좋다.
- 하지만 하나의 포인트컷을 여러 개의 어드바이저에서 공유하려고 하는 경우에는 포인트컷을 독립적인 태그로 등록해야한다.
- 포인트컷을 내장하는 경우에는 태그 하나로 두개의 빈이 등록된다.