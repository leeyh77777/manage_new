3. ./router/index.js -> 뉴스 목록 : '../views/news/List.vue' 으로 설정
4. ./router/index.js -> 뉴스 수정 : '../views/news/Edit.vue' 으로 설정

:one: 뉴스 추가
* Add.vue (<https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/news/Add.vue>)
: 뉴스 추가 컴포넌트 
```
1.Form컴포넌트로 뉴스추가 양식 링크("../../components/news/Form.vue")
2.아래 조건문으로 로그인이 되지 않았을시에 URL "/login"으로 이동
	created() {
        if (!this.$isLogin()) {
            return this.$router.push({ path : "/login"});
        }
    }
```

* Form.vue (<https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/components/news/Form.vue>)
: Form데이터 전송(./components/news/Form.vue)
``` 
1. Content @tiny 에디터 사용
(참조: https://www.tiny.cloud/docs/general-configuration-guide/basic-setup/#basicconfigurationexample)
2. @submit="formSubmit($event)로 데이터입력후 submit 클릭시 해당 메서드 실행.
2. e.preventDefault()로 데이터 전송을 막고 FormData 생성.(AXIOS 사용위해)
3. mode가 add이면 $addNews(/models/news.js)메서드 실행.

```

* addNews()(<https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/models/news.js#L9>)
: 뉴스추가 로직 = $request(url, data, method)메서드로 서버 전송(axios)

:two: 뉴스 보기
* View.vue (<https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/news/View.vue>)
: 뉴스 보기 컴포넌트
