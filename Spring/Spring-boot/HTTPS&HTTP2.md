# SPRING-BOOT

## 10월 18일

### Spring-boot https & http2

#### HTTPS 키생성
* keytool -genkey -alias spring -storetype PKCS12 -keyalg RSA -keysize 2048 -keystore keystore.p12 -validity 4000

#### HTTPS - application.properties 설정
<pre><code>
server.ssl.key-store= keystore.p12
server.ssl.key-store-type= PKCS12
server.ssl.key-store-password= 123456
server.ssl.key-keyAlias= spring
</pre></code>

#### HTTPS 처리 절차
1. 인증서를 통하여 신뢰하는 사이트인지 확인을 한다.
2. 기본적으로 브라우저에 CA 리스트들이 올라가 있다.
3. 인증서는 CA에서 인증서를 만들어서 발급 해준다.
4. 서비스하는 곳에서 서비스 내용과 공개키(서비스)를 CA에 보낸다.
5. CA에서 공개키와 서비스 내용을 같이 자신의 비밀키로 암호화해서 인증서를 만든다.
6. 사용자는 서버에서 보내 준 인증서와 암호화된 값(비밀키로)받아서 CA리스트에서 확인후 공개키로 복호화 한다.
7. 복호화가 되면 인증된 사이트라고 볼 수 있다.
8. 복호화된 공개키로 자신의 값을 암호화 시켜 서비스하는곳에 보낸다.
9. 서비스하는곳은 비밀키로 값을 복호화 해서 두개의 값을 합쳐 대칭키로 만든다.

#### HTTP2 사용
* HTTP2를 사용하기 위해서는 HTTPS(SSL)이 적용 되어 있어야한다.
* 톰캣 8.5버전에서 사용하려면 복잡한 설정이 필요로 한다.
* 되도록이면 8.5버전에서 사용하지 말자
* Jdk 9.0, tomcat9이상 추천

#### HTTP2 - application.properties 설정
* server.http2.enable= true

