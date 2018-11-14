# SPRING-BOOT

## 11월 14일

### Spring WEB MVC-3

#### Template engine
* 동적 컨텐츠를 생성하기 위해서 사용

#### 스프링부트가 자동 설정을 지원하는 템플릿 엔진
* Freemarker
* Groovy
* Thymeleaf(스프링부트 권장)
* Mustache

#### JSP를 권장하지는 않는 이유
* JAR 패키징 할 때는 동작하지 않고, WAR 패키징 해야 한다.
* Undertow는 JSP를 지원하지 않는다.

#### Thymeleaf 사용하기
* https://www.thymeleaf.org/
* https://www.thymeleaf.org/doc/articles/standarddialect5minutes.html
* 의존성 추가: spring-boot-starter-thymeleaf
* 템플릿 파일 위치: /src/main/resources/template/
* 예제: https://github.com/thymeleaf/thymeleafexamples-stsm/blob/3.0-master/src/main/webapp/WEB-INF/templates/seedstartermng.html