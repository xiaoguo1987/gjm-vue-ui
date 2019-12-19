<template>
  <div>
  <input type="text" v-model="usename" placeholder="用户名">
  <input type="text" v-model="pwd" placeholder="密码">
   <!-- <div class="g-recaptcha" data-sitekey="6Lctv8UUAAAAAKzyfep-w64g8JZzpr4us71uO-Wu"></div>-->
    <button @click="login">登录</button>
  </div>
</template>

<script>
    export default {
        name: "login",
        data() {
          return {
            usename:"",
            pwd:""
          }
        },
        methods:{
          login(){
            this.$axios.get('/api/login/login?useName=test&password=123456')
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                alert("不好意思，大爷，图表请求数据失败啦!");
                console.log(error);
              });
          }
        }

    }

</script>

<style scoped>

</style>
