# Architecture

## 10월 21일

1. AWS
2. RDS 셋팅(백업 자동화 x)
  * 고정IP를 할당 해주자 모든 IP할당시 외부 사용자 접근 우려
3. EC2 셋팅(linux)
  * java8설치(spring-boot는 java8부터 사용가능)
4. S3 셋팅(Access Key, Secret Key)
5. IAM 설정(추가사용자 권할 할당)
6. CI(Travis)환경 구축 / 추후 Jenkins로 마이그레이션

## 11월 9일
7. Reverse-Proxy(Nginx)를 이용한 무중단 배포 구축(추후 스크립트 공부)