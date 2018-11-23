# SPRING-BOOT

## 11월 24일

### 스프링 시큐리티

#### 의존성 추가
* org.springframework.boot:spring-boot-starter-security

#### 컨트롤러 없이 뷰를 반환해주는 방법
<pre><code>
@Configuration 확장
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/hello").setViewName("hello");
    }
}
</code></pre>

#### 스프링 시큐리티
* 웹시큐리티
* 메소드 시큐리티
* 다양한 인증 방법 지원
  * LDAP, 폼 인증, basic인증, OAuth, …

#### 스프링 부트 시큐리티 자동 설정
* 시큐리티 적용시 모든 요청은 다 스프링 시큐리티를 통한 인증이 필요하게된다.
* 기본적으로 폼인증, basic인증이 적용됨
* Accept header에 따라 인증 방식이 달라진다.(기본적으로 text_html)
* 스프링 시큐리티 추가시 기존의 테스트 코드가 에러가 날 수 있다.
* 스프링 시큐리티 test 의존성을 추가하여 test코드에 mock유저를 만들어 적용 할 수 있다.

#### 스프링 부트 시큐리티 설정 파일
* SecurityAutoConfiguration : 이벤트 퍼블리셔, 어떠한 상황마다 이벤트 발생 시킴, 이벤트 핸들러를 통해서 로직을 만들 수 있다.
* UserDetailsServiceAutoConfiguration : 랜덤한 유저를 하나 생성해서 인증하게 한다. Conditional을 맞게 적용시키면 랜덤 유저를 생성하지 않는다.



