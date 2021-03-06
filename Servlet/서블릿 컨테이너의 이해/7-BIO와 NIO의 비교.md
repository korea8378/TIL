# 서블릿 컨테이너의 이해

## 2월 28일

### 7.BIO와 NIO의 비교

#### 일반적인 프론트엔드 웹 서비스 구성
- 서블릿 컨테이너는 외부와 HTTP로 통신하는 서블릿을 관리하므로 웹 서비스 구성 요소 중 클라이언트와 가장 가까운 프론트엔드에 위치합니다.
- 하지만 실제로는 서블릿 컨테이너를 외부로 노출해 서비스하기보다는 Nginx, Apache, IIS와 같은 웹 서버를 앞에 세워 서블릿 컨테이너와 통신하는 구성이 좀 더 일반적입니다.

#### 웹 서버를 앞에 세워 서블릿 컨테이너와 통신하는 구성의 장점
- 첫 번째, 이미지 및 HTML 파일 같은 동적으로 생성되지 않는 static 파일은 전문적인 웹 서버가 좀 더 효율적으로 처리할 수 있습니다.왜냐하면, 개별 OS에 특화된 시스템 콜을 호출하는 데 제약이 없는 네이티브 바이너리로 제공되는 웹 서버에 비해 JVM이 추상화된 레벨로 한 번 더 감싼 I/O를 사용해야 하는 서블릿 컨테이너는 성능상 제약이 분명히 있기 때문입니다.
- 두 번째, 동시에 동작 가능한 스레드의 수가 전체 웹 서비스의 단위 시간당 처리량 throughput을 제한합니다. Java 1.4가 java.nio를 제공하기 전까지 모든 I/O는 블로킹 모드로만 동작했습니다. 따라서 클라이언트가 접근하면 서블릿 컨테이너는 해당 클라이언트와 연결된 소켓을 처리하는 스레드를 할당해야 했습니다. 일반적으로 한 대의 기계가 연결할 수 있는 소켓의 수는 유지할 수 있는 스레드의 수보다 훨씬 큽니다. 스레드가 프로세스보다 공유하는 메모리가 크다 할지라도 필요한 리소스의 크기를 무시할 수 없기 때문입니다.
- 세 번째, 네트워크 I/O 성능은 CPU 연산 처리 능력에 비해서는 매우 낮으므로, 할당된 스레드는 네트워크 지연 때문에 대부분의 시간을 대기하는데 보냅니다.
- 따라서 일반적인 웹서비스 시스템은 서블릿 컨테이너의 앞단에 OS 레벨에서 지원하되는 non-blocking I/O를 사용해 동시 처리 능력을 높인 웹 서버를 세우고, 서블릿 컨테이너에는 서블릿을 동작하게 하는 데 집중시켜 전체 시스템의 처리량을 최대한 높입니다.

#### BIO vs NIO
- BIO - I/O 처리시 Blocking(동시에 여러 I/O Stream처리스 요청마다 스레드를 할당)
- NIO - I/O 처리시 Non-Blocking(셀렉터, 채널, 버퍼를 통하여 하나의 스레드로 폴링하여 처리)
- [Java IO vs. NIO](https://www.javatpoint.com/java-nio-vs-input-output)
- [Java Network IO (BIO,NIO,AIO)](https://programmer.group/java-network-io-bio-nio-aio.html)
- [서블릿 컨테이너 관점에서 BIO VS NIO](http://guruble.com/bio-vs-nio/)
- [멈추지 않고 기다리기(Non-blocking)와 비동기(Asynchronous) 그리고 동시성(Concurrency)](https://tech.peoplefund.co.kr/2017/08/02/non-blocking-asynchronous-concurrency.html)



