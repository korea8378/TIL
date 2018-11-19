# SPRING-BOOT

## 11월 19일

### Spring WEB MVC-4

#### HTMLunit
* hmlt을 test 하기 위한 의존성

#### ExceptionHandler
* 스프링부트에서 제공하는 에러 핸들러
* 스프링부트 실행시 기본적으로 컨트롤러 없으면 뜨는 화면페이지가 에러핸들러에서 제공하는 에러페이지

#### 스프링 @MVC 예외 처리 방법
* @ControllerAdvice
* @ExceptionHandler

#### BasicErrorController
* 기본적으로 제공하는 HTML과 JSON으로 에러 메시지

#### 커스터 마이징 방법
* ErrorController 구현

#### 커스텀 에러 페이지
* 상태 코드 값에 따라 에러페이지를 커스텀 마이징
* Resources-static.error-상태코드로 에러페이지 만들기
* src/main/resources/static|template/error/
* 404.html(상태코드를 명시)
* 5xx.html(500대 코드를 명시)
* ErroViewResolver(좀 더 깊게 커스텀 마이징 가능, Model 이용 가능)

#### HATEOAS
* 서버 : 현재 리소스와 연관된 링크 정보를 클라이언트에게 제공한다.
* 클라이언트 : 연관된 링크 정보를 바탕으로 리소스에 접근한다.
* 연관된 링크 정보
  * Relation(해당 리소스와의 관계)
  * Hypertext Reference(링크)
* Spring-boot-starter-hateoas 의존성 추가
* ObjectMapper 제공
  * spring.jackson.*(web의존성에서도 제공)
  * Jackson2ObjectMapperBuilder
* LinkDiscovers 제공
  * 클라이언트 쪽에서 링크 정보를 Rel 이름으로 찾을때 사용 할 수 있는 XPath 확장 클래스

#### CORS
* Single-Origin Policy : 같은 도메인에서만 리소스를 가지고 올 수 있다(디폴트)
* Cross-Origin Resource Sharing : 서로 다른 도메인에서 리소스를 가지고 올 수 있다
* Origin
  * URI스키마 (http, https)
  * hostname(ldj.me, localhost)
  * 포트 (8080, 8081)

#### 스프링 MVC @CrossOrigin
* @CrossOrigin(origins = “허용할 도메인의 주소”)
* @Controller나 @RequestMapping에 추가하거나 WebMvcConfigurer 사용해서 글로벌 설정
