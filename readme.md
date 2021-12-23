### 6. 뉴스
* 라우팅 설정 : (<https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/router/index.js#L35>)
:one: ./router/index.js -> 뉴스 추가 : '/news/add' 으로 설정
:two: ./router/index.js -> 뉴스 보기 : '/news/view' 으로 설정
:three: ./router/index.js -> 뉴스 목록 : '/news/list' 으로 설정
:four: ./router/index.js -> 뉴스 수정 : '/news/edit' 으로 설정

* 컴포넌트 설정 : (<https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/router/index.js#L37>)
:one: ./router/index.js -> 뉴스 추가 : '../views/news/Add.vue' 으로 설정
:two: ./router/index.js -> 뉴스 보기 : '../views/news/View.vue' 으로 설정
:three: ./router/index.js -> 뉴스 목록 : '../views/news/List.vue' 으로 설정
:four: ./router/index.js -> 뉴스 수정 : '../views/news/Edit.vue' 으로 설정

#### 뉴스 추가
 * [Add.vue](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/news/Add.vue)
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
