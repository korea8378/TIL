# Spring

## 01월 17일

### mockito

#### mockito란
- 유닛 테스트를 위한 java mocking framework 입니다.
- JUnit위에서 동작하며 Mocking과 Verification을 도와주는 프레임워크이다. 
- mockito를 사용하면 대부분의 로직을 검증 할 수 있습니다.
- Spring boot test에도 포함되어 있기때문에 사용 할 수 있다.  
- 개발초기에는 보통 mock 객체를 이용해서 테스트 작성을 많이한다.


#### 사용법
#### mock()
- mock 객체를 만들어서 반환합니다.
<pre><code>
public class Person {
    private String name;
    private int age;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}

@Test
public void example(){
    Person p = mock(Person.class);
    assertTrue( p != null );
}
</code></pre>

#### @Mock
- mock()메서드 동일하게 동작 합니다.
<pre><code>
@Mock
Person p;

@Test
public void example1(){
    MockitoAnnotations.initMocks(this);
    assertTrue(p != null);
}
</code></pre>

#### when()
- 특정 Mock 객체를 만들었다면 이 객체로부터 특정 조건을 지정할 수 있습니다. 
- Mock객체의 메서드를 호출 하였을때 특정 값을 지정하여 리턴하게 만들 수 있습니다.
<pre><code>
@Test
public void example(){
    Person p = mock(Person.class);
    when(p.getName()).thenReturn("JDM");
    when(p.getAge()).thenReturn(20);
    assertTrue("JDM".equals(p.getName()));
    assertTrue(20 == p.getAge());
}
</code></pre>

#### given()
- given() 메서드 안에 있는 mock 객체의 메서드는 실제 메서드를 호출 하는 것은 아니고 mock객체의 메서드를 호출할때에 willReturn() 메서드 안에 있는 객체를 리턴한다는 뜻이다.
<pre><code>
@RunWith(MockitoJUnitRunner.class)
public class MockRepositoryTest {

  @Mock
  private MockRepository mockRepository;

  @Test
  public void findBynameTest() {
    //given
    given(mockRepository.findByname("wonwoo")).willReturn(new Account(1L, "wonwoo", "wonwoo@test.com"));
    //when
    final Account account = mockRepository.findByname("wonwoo");
    //then
    verify(mockRepository, times(1)).findByname("wonwoo");
    assertThat(account.getId(), is(1L));
    assertThat(account.getName(), is("wonwoo"));
    assertThat(account.getEmail(), is("wonwoo@test.com"));
  }
}
</code></pre>

#### any(), anyInt(), anyString(), anyObject() ....
- 매개변수가 어떤 값이라도 관계 없다면 any...로 시작하는 메소드를 사용합니다.
- 객체를 매개변수로 직접 넣어 사용한다면 equals를 구현하여 동일한 객체로 인식하게 만들어줘야합니다.
<pre><code>
when(mockIns.getList(anyString(), anyInt()))
    .thenReturn(
        new ArrayList<String>(){
            { this.add("JDM"); this.add("BLOG"); }
        }
    );
</code></pre>

#### doThrow()
- 예외를 던지고 싶으면 doThrow()를 사용 하면됩니다.
<pre><code>
@Test(expected = IllegalArgumentException.class)
public void example(){
    Person p = mock(Person.class);
    doThrow(new IllegalArgumentException()).when(p).setName(eq("JDM"));
    String name = "JDM";
    p.setName(name);
}
</code></pre>

#### doNothing()
- 반환형이 void로 선언된 메서드에 when()을 사용시 사용 할 수 있습니다.
<pre><code>
@Test
public void example(){
    Person p = mock(Person.class);
    doNothing().when(p).setAge(anyInt());
    p.setAge(20);
    verify(p).setAge(anyInt());
}
</code></pre>

#### verify()
- 해당 구문이 호출 되었는지를 체크합니다. 횟수나 타임아웃 시간까지 지정하여 체크 할 수 있습니다.
<pre><code>
@Test
public void example(){
    Person p = mock(Person.class);
    String name = "JDM";
    p.setName(name);
    // n번 호출했는지 체크
    verify(p, times(1)).setName(any(String.class)); // success
    // 호출 안했는지 체크
    verify(p, never()).getName(); // success
    verify(p, never()).setName(eq("ETC")); // success
    verify(p, never()).setName(eq("JDM")); // fail
    // 최소한 1번 이상 호출했는지 체크
    verify(p, atLeastOnce()).setName(any(String.class)); // success
    // 2번 이하 호출 했는지 체크
    verify(p, atMost(2)).setName(any(String.class)); // success
    // 2번 이상 호출 했는지 체크
    verify(p, atLeast(2)).setName(any(String.class)); // fail
    // 지정된 시간(millis)안으로 메소드를 호출 했는지 체크
    verify(p, timeout(100)).setName(any(String.class)); // success
    // 지정된 시간(millis)안으로 1번 이상 메소드를 호출 했는지 체크
    verify(p, timeout(100).atLeast(1)).setName(any(String.class)); // success
}
</code></pre>

#### @InjectMocks
- 클래스 내부에 다른 클래스를 포함 하고 있을 경우 주입받을 수 있도록 해줍니다.
- @Mockdlsk @Spy 어노테이션이 붙은 목 객체를 자신의 멤버 클래스와 일치하면 주입시킵니다.
<pre><code>
public class AuthService{
    private AuthDao dao;
    // some code...
    public boolean isLogin(String id){
        boolean isLogin = dao.isLogin(id);
        if( isLogin ){
            // some code...
        }
        return isLogin;
    }
}
public class AuthDao {
    public boolean isLogin(String id){ //some code ... }
}

@Mock
AuthDao dao;

@InjectMocks
AuthService service;

@Test
public void example(){
    MockitoAnnotations.initMocks(this);
    when(dao.isLogin(eq("JDM"))).thenReturn(true);
    assertTrue(service.isLogin("JDM") == true);
    assertTrue(service.isLogin("ETC") == false);
}
</code></pre>

#### @Spy
- @Spy로 선언된 mock 객체는 mock 메서드stub를 별도로 만들지 않는다면 실제 메소드가 호출됩니다.(spy()로도 사용 가능합니다.)
<pre><code>
Person p = spy(Person.class);
or
Person p = spy(new Person());
or
@Spy Person p;
</code></pre>

#### 참조
- Mockito 사용법 : https://jdm.kr/blog/222
- Mockito를 이용해서 test를 해보자 : http://wonwoo.ml/index.php/post/1453

