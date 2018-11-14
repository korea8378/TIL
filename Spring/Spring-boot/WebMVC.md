# SPRING-BOOT

## 11월 13일

### Spring WEB MVC
 
#### Spring-boot-starter-web 의존성
* @RestController, @GetMapping등등
* SpringBoot가 기본적으로 자동설정하여 제공해준다.
* 사용자가 아무런 설정 없이 바로 WEBMVC를 사용가능하다.

#### 스프링 MVC 확장
* @Configuration + WebMvcConfigurer

#### 스프링 MVC 재정의
* @Configuration + @EnableWebMvc

#### HttpMessageConverters
* Http 요청 본문을 객체로 변경하거나, 객체를 Http 응답 본문으로 변경할 때 사용.
* {“username”:”donjon”, “password”:”123”} <-> user
* @ReuquestBody
* @ResponseBody(@RestController 사용시 생략 가능)

#### http 요청시 
* http요청시 contentType에 따라서 converter가 달라진다.
* accept에 따라 응답이 달라진다.
* @Controller는 @ResponseBody는 사용해야한다. 안쓰면 ViewResolver로 타게 된다.

#### WEBMVC
* WEBMVC는 다양한 컨버터를 지원해준다.
* 요청에 맞는 뷰랑 accept 헤더와 맞는 걸 찾아서 실행한다.

#### JSON으로 요청시 JSON으로 컨버터가 되어 response
<pre><code>
@Test
public void createUser_JSON() throws Exception {
    String userJson = "{\"username\":\"dongjun\", \"password\":\"123\"}";
    mockMvc.perform(post("/users/create")
            .contentType(MediaType.APPLICATION_JSON_UTF8)//어떠한 데이터형식으로 보낼지
            .accept(MediaType.APPLICATION_JSON_UTF8)//어떠한 응답으로 받을지
            .content(userJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username",
                        is(equalTo("dongjun"))))
                .andExpect(jsonPath("$.password",
                        is(equalTo("123"))));
}
</code></pre>

#### XML으로 요청시 XML으로 컨버터가 되어 response
* XML은 기본적으로 의존성이 없기때문 의존성을 추가 해줘야한다.
<pre><code>
@Test
public void createUser_JSON2() throws Exception {
    String userJson = "{\"username\":\"dongjun\", \"password\":\"123\"}";
    mockMvc.perform(post("/users/create")
            .contentType(MediaType.APPLICATION_JSON_UTF8)//어떠한 데이터형식으로 보낼지
            .accept(MediaType.APPLICATION_XML)//어떠한 응답으로 받을지
            .content(userJson))
            .andExpect(status().isOk())
            .andExpect(xpath("/User/name").string("dongjun"))
            .andExpect(xpath("/User/password").string("123"));
}
</code></code>



