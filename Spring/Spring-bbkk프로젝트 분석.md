# SQL

## 10월 9일

### bbkk 소스 분석하기

* MVC 패턴

* Layout
  * Controller -> Service -> Repository

* Lombok
  * @RequiredArgsConstructor 어노테이션은 final이나 @NonNull인 필드 값만 파라미터로 받는 생성자

* Service
  * servcie(interface), serviceimpl(class implement interface)로 나눠서 service layout을 만들자

* @Vaild
  * 객체내의 field들이 Null인지 혹은 타입체크여부를 판단 해주는 어노테이션
  * 단일 객체에서는 정상적으로 동작하지만 collection에서는 동작하지 않기 때문에 Validator interface를 상속하여 CustomValidator을 만들자

* BindingResult
  * 스프링 검증, 잘 못 된 요청을 받으면 Exception 로직으로 메시지를 셋팅 후 response를 해준다.

* @RestControllerAdvice
  * REST 요청에 대한 에러를 핸들링