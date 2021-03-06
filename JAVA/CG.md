# JAVA

## 4월 16일

### 가비지 컬렉터

#### GC(Garbage Collection)

#### GC
- 하나의 객체는 메모리를 점유하고, 필요하지 않으면 메모리에서 해제되어야 한다. 이때 GC 작업에 의해 객체 메모리를 해제(처리)
- ex) String str = "안녕하세요" 
      str = "반갑습니다." <= 새로운 객체를 할당 함으로써 "안녕하세요" 객체는 GC를 통해 메모리 해제


#### 자바 런타임 메모리 영역
##### *Non-heap 메모리 => GC가 발생하지 않는 영역

- 메소드 영역(JVM이 시작 될때 생성) : 
  - 메서드 영역은 모든 JVM스레드에서 공유한다. 
  - Static => 정적변수, 정적메소드
  - 런타임 상수 풀 => 자바의 클래스파일 정보 저장, 필드참조정보(메서드 데이터, 메서드와 생성자 코드)

- JVM 스택 : 스레드가 시작할 때 JVM 스택이 생성된다. 이 스택에는 메서드가 호출되는 정보인 프레임이 저장된다. 지역변수와 임시 결과, 메소드 수행과 리턴에 관련된 정보들도 포함

- 네이티브 메소드 스택 : 자바 코드가 아닌 다른 언어로 된(보통은 C로 된) 코드들이 실행하게 될 때의 스택 정보

- PC 레지스터 : 자바의 스레드들은 각자의 PC(Program Counter) 레지스터를 갖는다. 네이티브한 코드를 제외한 모든 자바 코드들이 수행될 때 JVM의 인스트럭션 주소를 pc레지스트에 보관

##### *heap 메모리 => GC가 발생하는 영역

- 힙(JVM이 시작 될때 생성) :
  - 힙영역에서 GC를 수행(객체가 할당되고 해제 되는 곳)
  - 클래스 인스턴스(객체)와 배열이 쌓이는 메모리다.
  - 여러 스레드에서 공유하는 데이터들이 저장되는 메모리 => 공유 메모리

#### GC의 원리
- 메모리 할당(객체 생성시)
- 사용 중인 메모리 인식
- 사용하지 않는 메모리 인식

#### OutOfMemoryError
- GC가 사용 할 수 있는 메모리 영역보다 더 큰 메모리를 할당하려고 할 때 발생

#### 자바 메모리 heap 영역의 구조
- Youn 영역 => Eden, Survivor1, Survivor2
- Old 영역 => 메모리 영역
- Perm 영역(거의 사용하지 않는 영역 JDK8부터는 없어졌다)
- 처음 객체가 할당 되었을때 Eden영역에 할당이 된다. Eden영역의 메모리가 다차면 GC를 수행한후 살아 남은 객체들은 Survivor1이나 Survivor2로 이동하게 된다.(우선순위는 없다)
- Survivor1과 2로 왔다 갔다 하던 객체들은 Old영역으로 이동하게된다. Eden영역에서 Old영역으로 바로 가는 경우가 있는데 할당한 메모리가 Survivor1,2 보다 큰경우 바로 Old영역으로 이동하게 된다.

#### GC의 종류
- 마이너 GC:Young영역에서 발생하는 GC
- 메이저 GC:Old영역이나 Perm 영역에서 발생하는 GC
- 두가지 GC를 어떻게 사용하냐에 따라서 성능에도 영향을 준다.
- HotSpot JVM에서는 스레드 로컬 할당 버퍼를 사용하여 스레드별 메모리 버퍼를 사용하면 다른 스레드에 영향을 주지 않는 메모리 할당 작업이 가능

#### 5가지 GC방식(자바성능튜닝이야기 p332)
- Serial Collector : Young 영역과 Old 영역이 시리얼하게(연속적) 처리되며 하나의 CPU를 사용한다. Old영역에서 GC알고리즘 => Mark-sweep-compact(표시 -> 스윕(단일 스레드) -> 컴팩션)
- Parallel Collector(스루풋 콜렉터) : 시리얼 콜렉터와 달리 Young 영역에서의 콜렉션을 병렬로 처리 Old영역에서 GC알고리즘 => Mark-sweep-compact(표시 -> 스윕(단일 스레드) -> 컴팩션)
- Parallel compacting Collector : 병렬 콜렉터와 다른 점은 Old역역 GC에서 새로운 알고리즘을 사용 Old영역에서 GC알고리즘 => (표시 -> 종합(멀티 스레드, 앞선 컴팩션된 영역을 별도 점검) -> 컴팩션)
- Concurrent Mark-Sweep Collector(로우 레이턴시 콜렉터) : 힙메모리 영역의 크기가 클때 적합하다. Old영역에서 GC알고리즘 => (표시 -> 컨커런트 -> 재표시 -> 컨커런트 스윕), 2개이상 프로세서를 사용하는 서버에 적당
- Garbage First Collector : 지금까지 Garbage collector와는 다른 메모리 구조를 가지고있다(바둑판 배열). Old영역에서 GC알고리즘 => (초기 -> 기본 구역 스캔 -> 컨커런트 표시 -> 재 표시 -> 청소 -> 복사)

#### 강제로 GC 시키기
- System.gc()
- Runtime.getRuntime().ge()
- 강제로 사용시 현저히 성능이 떨어진다. 반복문에 강제로 넣어서 수행 시켜보자 그럼 얼마나 성능이 떨어지는지 알 수 있다.
- 알맞는 GC를 선택하여 사용을 하자!!!!!! 절대 강제로 사용하지 말자!!!!!!!!