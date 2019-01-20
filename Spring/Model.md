# Spring

## 01월 20일

### Model

#### 도메인(Domain)
- 소프트웨어로 해결하고자 하는 문제영역, 즉 도메인에 해당된다.
- Ex)온라인 서점 : 검색, 구매, 장바구니 등 책을 조회, 구매, 결제 배송등의 기능을 제공해야하는데 이때 온라인 서점은 소프트웨어로 해결 하고자 하는 문제영역, 즉 도메인에 해당된다.

#### 도메인 모델
- 도메인 모델은 특정 도메인을 개념적으로 표현한 것이다.
- 도메인 모델은 기본적으로 도메인 자체를 이해하기 위한 개념 모델이다. 
- Ex)주문 도메인 : 쇼핑몰에서 주문을 하려면 상품을 몇개 살지 선택하고 배송지를 입력한다. 선택한 상품의 총 지불 금액을 계산하고 결제 수단을 선택한다. 주문한 뒤에도 배송 전이면 배송지 주소를 변경하거나 주문을 취소 할 수도 있다.
- 도메인을 이해하려면 도메인이 제공하는 기능과 도메인의 주요 데이터 구성을 파악해야 한다

#### MVC 
- Model / View/ Controller의 약자
- Model : 무엇을 할지 정의합니다. 비지니스 로직에서의 알고리즘, 데이터 등의 기능을 합니다.
- Controller : 어떻게 할지를 정의합니다. 화면의 처리기능과 Model과 View를 연결시켜주는 역활
- View : 화면을 보여주는 역활

#### DAO(Data Access Object)
- 실제로 DB에 접근하는 객체이다.
- Service와 DB를 연결하는 고리의 역할

#### DTO(Data Transfer Object)
- 계층간 데이터 교환을 위한 객체이다.
- Request와 Response용 DTO는 View를 위한 클래스

#### VO(Value Object)
- 연속성 없는, 불변의 값 오브젝트
-  DB에서 애플리케이션으로 데이터를 빼온 경우 그 값을 VO라고 한다.
- VO는 값을 통해 동등성 기반으로 식별한다.

#### VO vs DTO
- VO와 DTO 둘다 데이터를 저장하는 용도이다.
- 각각 밀접한 영역을 구분해서 사용한다.
- VO는 DTO와 동일한 개념이지만 read only 속성을 갖는다.
- VO는 특정한 비즈니스 값을 담는 객체이고, DTO는 Layer간의 통신 용도로 오고가는 객체를 말한다.

#### Domain Package(Entity)
- 실제 DB의 테이블과 매칭될 클래스
- Database에서 하나의 Row는 Entity이다. 
- 연속성과 식별성을 갖는 오브젝트
- 최대한 외부에서 Entity 클래스의 getter method를 사용하지 않도록 해당 클래스 안에서 필요한 로직 method을 구현한다.

#### Entity 클래스와 DTO 클래스를 분리하는 이유
- View Layer와 DB Layer의 역할을 철저하게 분리하기 위함이다.
- 테이블과 매핑되는 Entity 클래스가 변경되면 여러 클래스에 영향을 끼치게 되는 반면 View와 통신하는 DTO 클래스(Request / Response 클래스)는 자주 변경되므로 분리해야 한다.
- Domain Model을 아무리 잘 설계했다고 해도 각 View 내에서 Domain Model의 getter만을 이용해서 원하는 정보를 표시하기가 어려운 경우가 종종 있다. 이런 경우 Domain Model 내에 Presentation을 위한 필드나 로직을 추가하게 되는데, 이러한 방식이 모델링의 순수성을 깨고 Domain Model 객체를 망가뜨리게 된다.
- 또한 Domain Model을 복잡하게 조합한 형태의 Presentation 요구사항들이 있기 때문에 Domain Model을 직접 사용하는 것은 어렵다.
- 즉 DTO는 Domain Model을 복사한 형태로, 다양한 Presentation Logic을 추가한 정도로 사용하며 Domain Model 객체는 Persistent만을 위해서 사용한다.

#### Domain Model Everywhere
- Repository, Service, Controller, View가 모두 Entity Model을 가지고 동작하는 방식입니다.
- 이 방식은 Domain의 Entity 객체가 Repository 뿐 아니라, Controller, View에 표현되는 방법까지 가지게 됩니다. 이렇게 되면 Entity Model이 매우 커지게 됩니다. 그리고 객체의 “단일책임원칙”을 위반하게 되는 단점을 가지고 있습니다.
- 장점
  - 개발하기에 빠르고 편리합니다.
- 단점 
  - 복잡한 View의 표현이 매우 힘듭니다.
  - Domain Model에서 View Logic이 포함되기 때문에 Domain Model의 순수성이 떨어지고 객체의 단일 책임원칙을 위반하게 됩니다.
  - REST 서버와 같이 외부와의 통신 API에 사용하게 되는 경우에는 Domain Model이 변경되면 API가 바뀌게 되기 때문에 큰 문제를 야기할 수 있습니다.

#### Pure Domain Model
- Domain Model은 서비스와 Repository에서만 사용하고, Controller와 View애서는 DTO를 새로 만들어서 사용하는 방법입니다. 이는 Domain의 순수성을 지키게 되는 큰 장점을 가지고 있습니다. View에서만 DTO를 사용하는 것이 BL의 변화에 따른 View의 변경을 격리 할 수 있는 좋은 방법이 됩니다.
- 장점
  - 순수한 Domain Model - 객체지향적인 OOP 모델
- 단점
  - DTO를 따로 만드는 것이 귀찮고, 성가시고, 괴롭다.
  - DTO는 또 다른 중복 코드를 만들어낸다. 
  - DTO와 Domain Model간의 Convert를 따로 만들어줘야지 된다. 
  - anti-pattern 중 하나입니다. 사용하지 않아야지 된다고들 이야기합니다.



#### 참조 
- 도메인 모델 : http://wonwoo.ml/index.php/post/917
- 도메인 모델 : http://javacan.tistory.com/entry/what-is-a-domain-model
- MVC패턴 : https://medium.com/@jang.wangsu/%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4-mvc-%ED%8C%A8%ED%84%B4%EC%9D%B4%EB%9E%80-1d74fac6e256
- DAO, DTO, Entity class의 차이 : https://gmlwjd9405.github.io/2018/12/25/difference-dao-dto-entity.html
- Entity, VO, Domain, DTO : http://virusworld.tistory.com/80
- VO, DTO 구분해서 사용하기 : https://blog.hanumoka.net/2018/08/28/programing-etc-20180828-VO-Value-Object-vs-DTO-Data-Transfer-Object/
- Model 기술 정리 및 비교 : http://netframework.tistory.com/entry/16-Model-%EA%B8%B0%EC%88%A0-%EC%A0%95%EB%A6%AC-%EB%B0%8F-%EB%B9%84%EA%B5%90
- 

