# IU FanSite - NodeJS
## 내용
express를 사용하여 라우팅 & 미들웨어 정의, MySQL데이터 베이스 연결
- - -
## NodeJs 핵심 기술
### 1. 서버 환경설정
* [app.js](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/app.js#L11)
: 웹 서버 PORT설정 process.env.PORT로 설정, 없을시에는 3000번 포트로 설정

### 2. header 연결 허용
* [app.js](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/app.js#L26)
: 응답헤더 설정으로 CORS 접근 허용
```
res.header("Access-Control-Allow-Origin", "*");
// 도메인 요청 권한 부여
res.header("Access-Control-Allow-Headers", "*");
// 브라우저 헤더 허용
```
### 3. 라우팅 구현
- - -
:one: ['/member'](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/routes/member.js)

1. route등록 : [/member](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/app.js#L39)(app.use로 라우터 등록)

2. route mode 설정 : [/routes/member.js](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/routes/member.js)
(mode로 요청이 들어오면 switch case로 해당 모드 선택후 실행)

* [join](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/routes/member.js#L13) (회원가입 처리)
: models/member의 join(data) 메서드를 실행, 완료시 값을 json으로 반환

* [update](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/routes/member.js#L22) (회원정보 수정)
: models/member의 update(data) 메서드를 실행, 완료시 값을 json으로 반환

* [login](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/routes/member.js#L30) (로그인)
: models/member의 login(data) 메서드를 실행, 완료시 값을 json으로 반환

* [getMember](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/routes/member.js#L39) (토큰으로 회원정보 조회)
: models/member의 getByToken(data.token) 메서드를 실행, 완료시 값을 json으로 반환

3. route 로직 [/models/member.js](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/models/member.js)
(DB(Mysql) 연동)

* [join(data)](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/models/member.js#L14) (회원가입 로직)
```
ㄱ. checkJoinData() 메서드로 요청data 회원가입 유효성 검사
ㄴ. sequelize로 요청data Mysql에 INSERT 처리
ㄷ. password bcrypt로 암호화
ㄹ. 휴대전화번호 정규 표현식으로 숫자로만 처리
```

* [update(data)](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/models/member.js#L52) (회원정보 수정)
```
ㄱ. token, memNm 누락시 에러 메세지 출력
ㄴ. checkPassword(memPw, memPwRe)메서드로 요청데이터 비밀번호 체크
ㄷ. checkPassword(cellPhone)메서드로 전화번호 숫자로만 설정, 휴대전화 패턴설정, 패턴과 맞지 않을시 에러메세지 출력
ㄹ. sequelize로 해당 member token으로 멤버 지정후 이름, 전화번호, 비밀번호 Mysql에 UPDATE 처리
```

* [login(data)](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/models/member.js#L112) (로그인)
```
ㄱ. 아이디, 비밀번호 data 유무 체크 없을 시 에러 메세지 출력
ㄴ. get(memId) 메서드로 회원정보 조회 후 아이디가 없을시 에러 메시지 출력
ㄷ. bcrypt.compare로 요청data의 비밀번호와 DB의 비밀번호 일치 확인 후 불일치시 에러메세지 출력
ㄹ. generateToken(data.memId)메서드로 요청data의 아이디에 토큰, 토큰익스파이어즈 Mysql에 UPDATE 처리
ㄹ. sequelize로 해당 member token으로 멤버 지정후 이름, 전화번호, 비밀번호 Mysql에 UPDATE 처리
```

* [get(memNo, isLogin)](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/models/member.js#L241) (회원정보 조회)
```
sequelize로 join()은 memberNo , login()은 memberId로 Mysql 회원정보 조회
```

* [generateToken(memId)](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/models/member.js#L273) (토큰 발급)
```
ㄱ. login()메소드 실행시에 요청데이터의 멤버아이디로 발급한다.
ㄴ. token을 crypto 모듈로 'md5' 해시 알고리즘을 사용, Date.now()메소드를 변환하여 16진수로 인코딩.
ㄷ. tokenExpires를 현재시각에서 2시간 빠르게 설정
ㄹ. sequelize로 해당 memId로 지정 후 Mysql에 token, tokenExpires UPDATE 처리
```
- - -
:two: ['/news'](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/routes/news.js)

1. route등록 : [/member](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/app.js#L40)(app.use로 라우터 등록)

2. route mode 설정 : [/routes/member.js](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/routes/news.js)
(mode로 요청이 들어오면 switch case로 해당 모드 선택후 실행)

* [add](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/routes/news.js#L13) (뉴스추가)
: models/news의 addNews(data) 메서드를 실행, 완료시 값을 json으로 반환

* [add](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/routes/news.js#L13) (뉴스추가)
: models/news의 addNews(data) 메서드를 실행, 완료시 값을 json으로 반환

* [add](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/routes/news.js#L13) (뉴스추가)
: models/news의 addNews(data) 메서드를 실행, 완료시 값을 json으로 반환

* [add](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/routes/news.js#L13) (뉴스추가)
: models/news의 addNews(data) 메서드를 실행, 완료시 값을 json으로 반환

* [add](https://github.com/leeyh77777/FanSite/blob/main/fansite_server/routes/news.js#L13) (뉴스추가)
: models/news의 addNews(data) 메서드를 실행, 완료시 값을 json으로 반환

:three: '/board'

:four: '/file'

:five: 없는페이지 처리 라우터

:six: 에러페이지


### 4. DB 연결

### 5. 파일 업로드




