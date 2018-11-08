# SPRING-BOOT

## 11월 8일

### 테스트

#### Spring-boot-starter-test 의존성을 추가

#### Test
* @Runwith(SpringRunner.class)
* @SpringBootTest
* test시 두개의 어노테이션 같이 사용

#### @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
* 서블릿컨테이너를 직접 띄우지 않고 mock 서블릿을 만든다.(Test용)
* @AutoConfigureMockMvc을 이용하여 MockMVC를 주입받는다.

#### webEnvironment
* MOCK: mock servlet environment (내장 톰캣 구동 안함)
* RANDON_PORT, DEFINED_PORT (내장 톰캣 사용 함)
* NONE : 서블릿 환경 제공 안함
<pre><code>
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc //MockMVC를 주입 받는다.

@Autowired
MockMvc mockMvc;

@Test
public void hello() throws Exception {
    mockMvc.perform(get("/hello”)) //mockMVC에서 /hello를 요청 할 경우
            .andExpect(status().isOk()) //http상태코드가 200이면
            .andExpect(content().string("hellodongjun")) //반환되는 콘텐츠 내용이 hellodongjun인지
            .andDo(print()); //요청이 왔다는 걸 출력한다.
}
</code></pre>

#### @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
* restTemplate, TestRestTempalte, webClient을 사용하여 테스트
* RestTemplate(restController에게 요청 할때 사용)

<pre><code>
String result = testRestTemplate.getForObject("/hello", String.class);
assertThat(result).isEqualTo("hellodongjun");
</code></pre>

#### @MockBean
* ApplicationContext에 들어있는 빈을 Mock으로 만든 객체로 교체함
* 모든 @Test 마다 자동으로 리셋

<pre><code>
@MockBean
SampleService mockSampleService;
//controller만 test하고싶을때 service를 MockBean을 만들어준다.
when(mockSampleService.getName()).thenReturn("dongjun");
//MockService에 요청한 메소드의 반환값을 설정
</code></pre>

#### WebTestClient
* 비동기화 방식의 테스트를 사용 할 수 있다(asynchronous)
* compile('org.springframework.boot:spring-boot-starter-webflux') 의존성 추가

<pre><code>
@Autowired
WebTestClient webTestClient; //asynchronous(비동기화) 기본적인 사용하는 restController는 synchronous(동기화)

webTestClient.get().uri("/hello").exchange()
        .expectStatus().isOk()
        .expectBody(String.class)
        .isEqualTo("hellodongjun");
</code></pre>

#### 슬라이스 테스트(layout별로 test를 하고 싶을때)
* json만을 위한 test
<pre><code>
@JsonTest

@Autowired
JacksonTester<실험할 도메인>
</code></pre>

* @WebMvcTest(SampleController.class)
  * Controller만을 위한 test(의존성이 따 끊김 그렇기때문에 의존성을 다 연결해줘야함/service)

* @WebFluxTest
* @DataJpaTest
* ….