# 프로젝트 성패를 결정짓는 데이터 모델링 이야기

## 3월 4일

### 7.Back to the Basic, 정규화 이론

#### 데이터 모델링
- 2차원 표에 어떤 데이터를 어떻게 담는 것이 최적인지 고민하는 과정이다.
- 어떤 데이터를 담아야 하는지 결정하는 것은 그리 어려운 작업이 아니다.
- 업무 요건으로부터 관리해야 할 데이터가 어느 정도 정형화되고, 프로세스나 기능 관점의 모델링 단계에서 다시 한 번 확인하여 누락된 데이터를 발견할 수 있다.
- 다만 물리적으로 존재하지 않아 쉽게 확인할 수 없는 논리적인 데이터 집합은 식별하기 어려울 수 있다.

#### 데이터 이상 현상
- 표를 구성하는 속성의 값을 수정할 때나 표에 새로운 개체를 삽입하거나 삭제할 때 의도하지 않은 다른 데이터에 문제가 발생하는 현상이다.
- 데이터를 어떻게 담아야 할까 고민할까 고민할 때 중요한점은 이러한 이상 현상이 발생하지 않도록 해야 한다는 것이다.
- 데이터 이상 현상의 원인은 데이터가 독립적이지 않고 중복으로 관리되어 데이터 간의 종속성에 계속 영향을 받기 때문이다.

#### 정규화
- 현실의 데이터는 대부분 종속 관계를 맺고 있다. 속성들의 종속성을 분석해서 하나의 종속성이 하나의 표로 관리되도록 분해해가는 과정이 정규화다.
- 종속성을 기준으로 데이터를 어떻게 담는 것이 최적인가에 대한 방법론이 바로 정규화 이론이다.
- 중복을 없애 데이터 이상 현상이 최소화되고, 결국 데이터 무결성이 극대화된 구조가 된다.

#### 함수 종속
- 하나의 집합안에 존재하는 속성 사이의 연관 관계다.
- 집합 내 속성 A가 속성 B의 값을 유일하게 식별하는 결정자면 속성 B는 속성 A에 함수적으로 종속된다.
- 이러한 개별 종속성은 모두 별도로 분리하여, 즉 정규화하여 관리해야 데이터를 안정적인 구조로 관리할 수 있다.

#### 1정규형
- 모든 속성이 값을 반드시 하나만 가져야 한다.
- 어떤 속성이 값을 여러 개 가지고 있거나 물리적으로는 하나만 갖지만 유사한 형태의 반복 속성이 존재해서 논리적으로는 다수의 값을 갖는 것과 마찬가지라면 Basis Parent에서 별도의 엔터티로 분리해야 한다.

#### 2정규형
- 모든 속성이 반드시 주 식별자 전부에 종속되어야 한다.
- 주 식별자 일부에만 종속될 경우에는 해당 종속성을 별도 엔터티로 분리해야 한다.
- 한가지 주목할 점은 1정규화로 생성된 집합은 자식이 되지만, 2정규화 분리된 집합은 부모가 된다는 것이다.

#### 3정규형
- 주 식별자가 아닌 모든 속성이 상호 종속 관계여서는 안된다.
- 일반 속성인 Attrib 1과 Attrib 2 사이에 종속성이 존재한다면 이들은 별도 엔터티로 분리되어야 한다.

#### 정규화의 의의
- 첫째, 속성간의 종속성을 기준으로 성격이 유사한 속성들은 모이고 관계 없는 속성들은 분리된다. 즉, 속성들이 자연스럽게 자기 자리를 찾게 되면서 데이터 집합의 범주화가 이루어진다.
- 둘째, 하나의 주제로 집약된 데이터 구조, 제대로 된 엔터티가 도출된다. 정규화는 함수 종속을 없애고 밀접한 속성을 하나의 표에 집약시키는 체계적인 방법이다. 따라서 데이터는 응집도는 높고 결합도는 낮게 분리된다. 결국 데이터 본질에 충실한 제대로 된 엔터티가 도출될 수 밖에 없다.
- 셋째, 데이터 중복이 최소화된 효율적이고 구조화된 모델이 나온다. 중복에 따른 데이터 이상 현상이 사라지며, 저장 요량 측면에서도 당연히 이익을 보게 된다.
- 넷째, 데이터 간의 종속성을 분석하기 때문에 엔터티명과 더불어 엔터티의 정체성을 가장 잘 표현하는 주 식별자가 정확히 도출된다. 주 식별자는 인스턴스를 구분하는 기준이므로, 집합의 개체 발생 규칙도 검증되어 더 정확해진다.
- 다섯째, 엔터티가 명확하고 정확해졌기 때문에 업부 변경에 따른 확장성이 좋아진다. 속성만 100개가 넘어 그 속을 알기가 어려운 애매한 엔터티를 변경하려 할때의 막막함을 경험한 사람이라면 쉽게 공감하리라 생각된다.
- 여섯째, 결국 데이터를 최적의 상태로 담게 된다. 데이터 중복을 최소함으로써 데이터 무결성을 극대화 한다.
- 일곱째, 정규화된 모델은 그렇지 않은 모델에 비해 대부분 성능이 좋다.

#### 정규화와 관련된 성능 논쟁
- 정규화를 하면 테이블이 늘어나 조인이 증가하는 등 ‘정규화 = 성능 저하”라고 믿는 분들을 있다.
- 정규화로 테이블 수와 조인의 양이 늘어난다고 해서 성능이 무조건 저하되는 것은 아님을 알 수 있다.
- 대부분의 DBMS는 데이터 블록 단위로 읽고 쓴다. 하나의 블록에는 다수의 행이 포함될 수 있다.
- 예를 들어 고객 테이블의 한행이 2K고 한 블록의 크기가 8K라면 한 블록에는 4개의 개체가 담길 수 있다.
- 홍길동 한 사람의 하나의 컬럼만 조회하려 해도 DBMS는 한 블록, 즉 8K를 메모리로 올린다. IO의 최소 단위가 블록이기 대문이다. 
- SQL을 최적화할 때 조회할 레코드의 수가 아닌 블록의 수에 집착하는 이유도 바로 이 때문이다.
- 한 블록에 더 많은 개체가 존재하면 메모리에 한 번 올라간 블록이 다시 사용될 확률도 그만큼 높아진다. 즉, 적중률이 좋아진다.
- 이처럼 모든 속성이 한 테이블에 담겨 있다면 조회하려는 속성의 많고 적음에 상관없이 항상 전체 블록을 읽어야 하지만, 정규화가 잘 되어 있다면 훨씬 적은 블록을 읽고도 원하는 결과를 얻을 수 있다.
- 정규화하면 테이블이 분리되어 조인이 늘어나 성능이 저하된다는 말은 상황에 따라 사실일 수도 있고 아닐 수 있다.

