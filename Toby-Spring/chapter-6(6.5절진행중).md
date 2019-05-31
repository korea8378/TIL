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