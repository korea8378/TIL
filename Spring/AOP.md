# Spring

## 02월 05일

### AOP

횡단 관심사
- EJB2 아키텍처는 일부 영역에서 관심사를 거의 완벽하게 분리하였습니다.
- 예를 들어 트랜잭션, 보안, 일부 영속적인 동작은 소스 코드가 아니라 배치 기술자에서 정의합니다.
- AOP는 횡단 관심사에 대처해 모듈성을 확보하는 일반적인 방법론입니다.
- AOP에서 관점이라는 모듈 구성 개념은 “특정 관심사를 지원하려면 시스템에서 특정 지점들이 동작하는 방식을 일관성 있게 바꿔야 한다”라고 명시 하고 있습니다. 명시는 간결한 선언이나 프로그래밍 매커니즘으로 수행합니다.
- AOP 프레임워크는 대상 코드에 영향을 미치지 않는 상태로 동작 방식을 변경을 합니다.
![AOP1](/Spring/img/AOP1.png)

AOP란
- Spring의 핵심 개념중 하나인 DI가 애플리케이션 모듈들 간의 결합도를 낮춰준다면
- AOP는 애플리케이션 전체에 걸쳐 사용되는 기능을 재사용하도록 지원하는 것입니다.
- 관점(관심) 지향 프로그래밍이라고 부릅니다.
- 대표적 예 : 로깅, 트랜잭션, 보안등
- 각각의 모듈들의 주 목적 외에 필요한 부가적인 기능들 입니다.
- 공통된 기능을 재사용하는 기법입니다.
![AOP2](/Spring/img/AOP2.png)

AOP의 장점 2가지
- 어플리케이션 전체에 흩어진 공통 기능이 하나의 장소에서 관리된다는 점
- 다른 서비스 모듈들이 본인의 목적에만 충실하고 그외 사항들은 신경쓰지 않아도 된다는 점

AOP 용어
1. 타켓(Target)
    - 부가기능을 부여할 대상을 얘기합니다.
2. 에스펙트(Aspect)
    - 객체지향 모듈을 오브젝트라 부르는것과 비슷하게 부가기능 모듈을 애스펙트라고 부르며, 핵심기능에 부가되어 의미를 갖는 특별한 모듈이라고 생각하시면 됩니다.  
3. 어드바이스(Advice)
    - 실질적으로 부가기능을 담은 구현체를 얘기합니다.
    - 어드바이스의 경우 타켓 오브젝트에 종속되지 않기 때문에 순수하게 구가기능에만 집중 할 수 있습니다.
4. 포인트컷(PointCut)
    - 부가기능이 적용될 대상(메서드)를 선정하는 방법을 얘기합니다.
    - 즉, 어드바이스를 적용할 조인포인트를 선별하는 기능을 정의한 모듈을 얘기합니다.
5. 조인포인트(JoinPoint)
    - 어드바이스가 적용될 수 있는 위치를 얘기합니다.
    - 다른 AOP프레임워크와 달리 Spring에서는 메서드 조인포인트만 제공하고 있습니다.
6. 프록시(Proxy)
    - 타켓을 감싸서 타켓의 요청을 대신 받아주는 랩핑(Wrapping) 오브젝트입니다.
    - 호출자(클라이언트)에서 타켓을 호출하게 되면 타켓이 아닌 타켓을 감싸고 있는 프록시가 호출되어, 타켓 메서드 실행전에 선처리, 타켓 메서드 실행한 후, 후처리를 실행시키도록 구성되어 있습니다.
7. 인트로덕션(Introduction)
    - 타켓 클래스에 코드 변경없이 신규 메서드나 멤버변수를 추가하는 기능을 얘기합니다.
8. 위빙(Weaving)
    - 지정된 객체에 에스팩트를 적용해서 새로운 프록시 객체를 생성하는 과정을 얘기합니다.
    - 예를 들면 A라는 객체 트랜잭션 애스팩트가 지정되어 있다면, A라는 객체가 실행되기전 커넥션을 오픈하고 실행이 끝나면 커넥션을 종료하는 기능이 추가된 프록시 객체가 생성되고, 이 프록시 객체가 앞으로 A 객체가 호출되는 시점에서 사용됩니다. 이때의 프록시객체가 생성되는 과정을 위빙이라 생각하시면 됩니다.

Loggin AOP
1. Configutaion
<pre><code>
@Configuration
@EnableAspectJAutoProxy
public class AspectJConfig {
}
</code></pre>
2. Aspect
<pre><code>
@Aspect
@Component
public class TestAspect {

	private static final Logger logger = LoggerFactory.getLogger(TestAspect.class);
	
	@Before("execution(* com.example.service.*.*Aop(..))")
	public void onBeforeHandler(JoinPoint joinPoint) {
		logger.info("=============== onBeforeThing");
	}
	
	@After("execution(* com.example.service.*.*Aop(..))")
	public void onAfterHandler(JoinPoint joinPoint) {
		logger.info("=============== onAfterHandler");
	}
	
	@AfterReturning(pointcut = "execution(* com.example.service.*.*Aop(..))",
					returning = "str")
	public void onAfterReturningHandler(JoinPoint joinPoint, Object str) {
		logger.info("@AfterReturning : " + str);
		logger.info("=============== onAfterReturningHandler");
	}
	
	@Pointcut("execution(* com.example.service.*.*Aop(..))")
	public void onPointcut(JoinPoint joinPoint) {
		logger.info("=============== onPointcut");
	}
}

</code></pre>

3. Controller, Service
<pre><code>
@RestController
public class TestController {

	@Autowired
	private TestService service;

	@GetMapping(value = "/noAop")
	public String noAop(){
		return service.test();
	}
	
	@GetMapping(value = "/aop")
	public String aop(){
		return service.testAop();
	}
}

@Service
public class TestServiceImpl implements TestService {

	private static final Logger logger = LoggerFactory.getLogger(TestServiceImpl.class);
	
	@Override
	public String test() {
		String msg = "Hello, Spring Boot No AOP";
		logger.info(msg);
		return msg;
	}
	
	@Override
	public String testAop() {
		String msg = "Hello, Spring Boot AOP";
		logger.info(msg);
		return msg;
	}
}
</code></pre>

어노테이션
- @Before (이전)
    - 어드바이스 타겟 메소드가 호출되기 전에 어드바이스 기능을 수행
<pre><code>
@Before("execution(* com.jsonobject.example.*.*(..))")
public void doSomethingBefore(JoinPoint joinPoint) {

}
</code></pre>
- @After (이후)
    - 타겟 메소드의 결과에 관계없이(즉 성공, 예외 관계없이) 타겟 메소드가 완료 되면 어드바이스 기능을 수행
<pre><code>
@After("execution(* com.jsonobject.example.*.*(..))")
public void doSomethingAfter(JoinPoint joinPoint) {

}
</code></pre>
- @AfterReturning (정상적 반환 이후)
    - 타겟 메소드가 성공적으로 결과값을 반환 후에 어드바이스 기능을 수행
<pre><code>
@AfterReturning(pointcut = "execution(* com.jsonobject.example.*.*(..))", returning = "result")
public void doSomethingAfterReturning(JoinPoint joinPoint, Object result) {

}
</code></pre>
- @AfterThrowing (예외 발생 이후)
    - 타겟 메소드가 수행 중 예외를 던지게 되면 어드바이스 기능을 수행
- @Around (메소드 실행 전후)
    - 어드바이스가 타겟 메소드를 감싸서 타겟 메소드 호출전과 후에 어드바이스 기능을 수행
<pre><code>
@Around("@annotation(someAnnotation)")
public Object doSomethingAround(final ProceedingJoinPoint joinPoint, final SomeAnnotation someAnnotation) {

    Object result = joinPoint.proceed();

    return result;
}
</code></pre>

포인트컷 표현식
- “execution(* com.blogcode.board.BoardService.getBoards(..))"
- 지정자 : execution
- 타켓 명세 : (* com.blogcode.board.BoardService.getBoards(..))
![AOP3](/Spring/img/AOP3.png)
- 9개의 지정자 
    - args()
    - @args()
    - execution()
    - within()
    - @within()
    - this()
    - target()
    - @target()
    - @annotaion

참조
- Clean Code
- AOP 정리 (3) : https://jojoldu.tistory.com/71
- Introduction to Spring AOP : https://www.baeldung.com/spring-aop
- Spring Boot, AspectJ 스타일의 Spring AOP 구현하기 : https://jsonobject.tistory.com/247
- Spring Boot - AOP : https://heowc.github.io/2018/02/07/spring-boot-aop/


