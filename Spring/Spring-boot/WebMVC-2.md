# SPRING-BOOT

## 11월 14일

### Spring WEB MVC-2

#### 정적 리소스 맵핑 : /**

#### 기본 리소스 위치
* classpath : /static
* classpath : /public
* classpath : /resources/
* classpath : /META-INF/resources
* 예)”/hello.html” => /static/hello.html
* spring.mvc.static-path-pattern : 맵핑 설정 변경 가능
* spring.mvc.staitc-locations : 리소스 찾을 위치 변경 가능(기존의 사용하는거 사용 못함)

#### 정적리소스 캐싱
* 이미 받은 정적파일을 다시 요청 했을때 정적파일 내용이 바뀌지 않으면 304응답을 보낸다(캐싱처리)

#### resourceHandlers 확장
<pre><code>
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override //기존의 핸들러를 유지하면서 핸들러를 정의해서 추가하겠다.
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/m/**")
                .addResourceLocations("classpath:/m/")
                .setCachePeriod(20);
    }
}
</code></pre>

#### 웹 JAR
* 웹에 관련된 파일들도 JAR로 만들수 있다.
* react, javascript, vue 등등
* 버전 생략하고 사용 : webjars-locator-core 의존성 추가

#### Root index(정적, 동적)
* 정적 : index.html로 기본 리소스 위치에 생성
* 동적 : index.템플릿(타임리프,프리마커등)로 기본 리소스 위치에 생성
* 둘 다 없으면 에러 페이지

#### 파비콘(브라우저 탭창에 있는 아이콘)
* favicon.io
* 기본 리소스 위치에 생성하면 자동으로 적용
