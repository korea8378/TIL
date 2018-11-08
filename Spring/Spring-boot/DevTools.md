# SPRING-BOOT

## 11월 8일

### devtools

* compile('org.springframework.boot:spring-boot-devtools') 의존성 추가
* 자동설정들이 바뀌게 된다.

#### cash
* 캐시를 다끔
* 테임리프, 프리마커 캐시를 끈다

#### restart(서버만 다시시작/완벽히 적용이 되지 않는다)
* 클래스패스에 있는 파일이 변경 될 때마다 자동으로 재시작(개발자가 직접 리스타트하는 것보다 빠름)

#### 라이브릴로드(서버와 브라우저 다시시작)
* 브라우저에 플러그인 설치를 해야함

#### 글로벌 설정
* ~/.spring-boot-devtools.properties
* 1순위 외부설정

#### 의존성을 추가하지않고
* 설정되는걸 따로 외부설정으로 만들어 사용해보자(캐시정도?)