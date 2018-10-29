# SPRING-BOOT

## 10월 30일

### 스프링 부트 활용 소개

#### Log Level
* SpringApplication생성시 args를 debug를 주면 debug모드로 실행가능하다.
* Default : INFO 레벨

#### Failure
* Log를 좀 더 보기 좋게 꾸며준다.

#### Banner
* resource에 banner.txt를 만들어서 banner로 사용 가능하다.

#### ApplicationEvent 등록
* applicationEvent 등록시 언제 event가 발생하는지 파악을 하자
* applicationStarting경우는 bean으로 등록해도 applicationContext가 만들어지고 전에 event가 발생하기 때문에 주의를 해야한다.

#### WebApplicationType 설정
* .setWebApplicationType()으로 none, servlet등으로 설정 가능
* sevlet, webflux 의존성이 둘다 있을경우 servlet이 우선시 된다.
* Webflux 사용할 경우 Type을 reactive로 설정 해준다.

#### ApplicationArguments
* -Dfoo : -D는 JVMArguments로 취급한다.
* —bar : —는 ApplicationArguments로 취급한다.

#### ApplicationRunner
* application이 실행한 뒤 뭔가 실행하고 싶을 때

#### @Order(1)
* 우선순위를 지정 할 수있다.