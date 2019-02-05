# Spring

## 02월 05일

### POJO
- 순수하게 도메인에 초점을 맞춥니다.
- 엔터프라이즈 프레임워크에 (그리고 다른 도메인에도) 의존하지 않습니다.
- 따라서 테스트가 개념적으로 더 쉽고 간단합니다.

#### POJO 개념을 사용하지 않은 예시
##### 1. JMS
<pre><code>
public class ExampleListener implements MessageListener {

  public void onMessage(Message message) {
    if (message instanceof TextMessage) {
      try {
        System.out.println(((TextMessage) message).getText());
      }
      catch (JMSException ex) {
        throw new RuntimeException(ex);
      }
    }
    else {
      throw new IllegalArgumentException("Message must be of type TextMessage");
    }
  }

}
</code></pre>
- JMS를 사용하기 위해 MessageListener 인터페이스를 상속 받아야 합니다.
- 하지만, 다음과 같이 구현하면 JMS라는 특정 환경에 종속되게 되고 다른 메시징 솔루션을 적용하기 어려워집니다.
- Listener가 많은 경우, AMQP나 다른 솔루션으로 교체할 경우 더더욱 어려울 것입니다.

##### 2. EJB2
<pre><code>
public interface BankLocal extends java.ejb.EJBLocalObject {
	String getStreetAddr1() throws EJBEXception;
	String getStreetAddr2() throws EJBEXception;
	String getCity() throws EJBException;
	String getState() throws EJBException;
	String getZipCode() throws EJBException;
	….
}
public abstract class Bank implements java.ejb.EntityBean {
	//비즈니스 논리
	public abstract String getStreetAddr1();
	public abstract String getStreetAddr2();
	public abstract String getCity();
	public abstract String getState();
	….

	//EJB 컨테이너 논리
	public abstract void setId(Integer id);
	public abstract Integer getId();
	public Integer ejbCreate(Integer id) {…}
	…
}
</code></pre>
- EJB1과 EJB2 아키텍처는 관심사를 적절히 분리하지 못했기에 유기적인 성장이 어려웠습니다.
- 클라이언트가 사용할(프로세스 내) 지역 인터페이스나 (다른 JVM에 있는) 원격 인터페이스를 정의해야 합니다.
- 비즈니스 논리는 EJB2 애플리케이션 ‘컨테이너’에 강하게 결합됩니다.
- 클래스를 생성할 때는 컨테이너에서 파생해야 하며 컨테이너가 요구하는 다양한 생명주기 메서드도 제공해야 합니다.
- 이렇듯 비즈니스 논리가 덩키 큰 컨테이너와 밀접하게 결합된 탓에 독자적인 단위 테스트가 어렵습니다.
- EJB2 코드는 프레임워크 밖에서 재사용하기란 사실상 불가능합니다.

#### POJO 개념을 사용한 예시
##### 1. JMS(어노테이션)
<pre><code>
@Component
public class ExampleListener {

  @JmsListener(destination = "myDestination")
  public void processOrder(String message) {
    System.out.println(message);
  }
</code></pre>
- 위의 코드는 어떠한 인터페이스에 종속되지 않습니다. 
- @JmsListerner라는 어노테이션을 이용하여 JMS 서비스와 연동합니다.
- 다른 솔루션을 사용하고 싶은 경우, @RabbitListener로 바꿔주기만 하면됩니다.

##### 2. EJB3(어노테이션)
<pre><code>
@Entity
@Table(name = “BANKS”)
public class Bank implements java.io.Serializable {
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Embeddable
	public class Address {
		protected String streetAddr1;
		protected String streetAddr2;
		protected String city;
		protected String state;
		protected String zipCode;
	}
	
	@Embedded
	private Address address;

	…
}
</code></pre>
- 자바코드가 아닌 어노테이션 기반으로 코드 작성
- 기존의 EJB2 코드보다 위코드가 훨씬 간결합니다.
- 일부 상세한 엔티티 정보는 어노테이션에 포함되어 그대로 남아 있지만, 모든 정보가 어노테이션 속에 있으므로 코드 자체는 깔끔해집니다.

POJO의 조건
1. 특정 규약약에 종속 되지 않는다.
    - 단일 상속제한 때문에 객체지향적인 설계기법 적용하기가 어려워집니다.
    - 다른 환경으로의 이전이 어렵습니다.
2. 특정 환경에 종속되지 않는다.
    - 다른 환경에서 사용하기가 어렵습니다.
    - 비즈니스 로직과 기술적인 내용을 담은 웹정보 코드가 섞여 이해하기 어려워집니다.
    - 웹서버에 올리지 않고 독립적으로 테스트하기가 어려워집니다.
3. 단일 책임 원칙을 지키는 클래스
    - POJO란 객체지향적인 원리에 충실하면서, 특정환경과 규약에 종속되지 않아 필요에 따라 재사용 될 수 있는 방식으로 설계된 오브젝트입니다.

POJO프레임워크
- 대표적으로 스프링프레임워크

참조
- Clean Code
- POJO란? : https://happyer16.tistory.com/entry/POJOplain-old-java-object%EB%9E%80
