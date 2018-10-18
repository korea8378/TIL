# SPRING-BOOT

## 10월 18일

### Spring-boot 개요

#### 특징
* Application을 만들때 빠르고 쉽게 만들 수 있다.
* Spring 사용시 가장 널리 사용 되는 설정들은 기본적(설정)으로 제공 해준다.
* Spring platform & third party libraries를 기본적(설정)으로 제공한다.
 
#### Goals
* Spring 개발시 더 빠르고 쉽게 개발 할 수 있도록 도와준다.
* spring에서 기본적으로 사용하던 설정들은 spring-boot는 기본적으로 제공해준다.
* 기본적인 설정을 커스텀마이징이 가능하다.
* xml설정을 더 이상 사용하지 않는다.
* 공통적인 다양한 None-functional(보안, 메트릭, 상태 확인등)에 대해서도 지원을 해준다.

#### Spring-Boot 시작 어노테이션
<pre><code>
@SpringBootApplication
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan
Application.class가 있는 위치로부터 ComponentScan을 시작한다.
</pre></code>


#### 의존성관리
* Spring-boot-dependencies를 통하여 의존성들을 관리(버전,관련된 의존성)한다
* 개발자가 관리 해야 할 의존성들을 알아서 관리해준다.
* 하나의 의존성에 연관되어 있는 다른 의존성의 버전들을 알아서 맞게 해준다.
* 버전 명시를 하지 않아도 된다.
* 특별히 원하는 버전이 있을 경우 오버라이딩을 통해서 사용 할 수 있다.

#### 의존성추가
* MavenRepository 사이트를 통해서 추가(Maven, Gradle)
* Spring-Boot가 관리 해주는 의존성(버전 명시를 안 해도 된다.)
* Spring-Boot가 관리 안해주는 의존성(버전 명시를 해야 한다.)
* 기존 의존성 버전 변경하기(오버라이딩을 통해서 해라)

#### Bean 등록 과정
* @ComponentScan -> @EnableAutoConfiguration
* @ComPonentScan
* @Component, @Configuration, @Repostitory, @Service, @Controller, @RestController

#### 자동 설정
* spring.factories
* Spring-boot-autoconfigure -> META-INF -> spring.factories
* spring.factories안에 정의 되어있는 키값(@Configuration으로 정의되어 있는 class 리스트)들을 보고 자동설정을 수행한다.
* @ConditionalON~~을 사용하여 어떠한 상항일때 이렇게 사용하라는 조건을 정의 할 수 있다.
* spring.factories안에 있는 수많은 class들이 @ConditionalON을 통하여 조건에 맞게 bean으로 등록 된다.

#### 자동 설정 만들기
1. 의존성 추가(autoconfigure, autoconfigure-processor)
2. @Configuration 파일작성
3. Src/main/resource/META-INF에 spring.factories 파일추가
4. Spring.factories 안에 자동 설정 파일 추가
5. gradle(gradlew) publishToMavenLocal 사용하여 mavenlocal에 의존성 추가
6. gradle dependencies에 추가하여 사용
  * 실습 - https://github.com/korea8378/Spring-boot 

#### 자동 설정 사용법
* @ConditionalON~~을 사용하여 조건을 걸어 사용여부(오버라이딩)를 정할 수 있다.
* 빈재정의(Properties로 bean등록하기)
* @ConfigurationProperties(“class”), @EnableConfigurationProperties(“class”) 두개의 어노테이션사용
* Bean을 등록 하지 않고 application.properties에서 bean의 값을 정의하여 사용 할 수 있다.

#### @ConfigurationProperties 
![ConfigurationProperties](/Spring/img/ConfigurationProperties.png)

#### @EnableConfigutaionProperties
![EnableConfigutaionProperties](/Spring/img/EnableConfigurationProperties.png)

#### application.properties
![ApplicationProperties](/Spring/img/applicationProperties.png)