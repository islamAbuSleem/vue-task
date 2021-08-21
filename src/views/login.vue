<template>
  <section class="login">
    <form action="">
      <input type="text" placeholder="email" v-model="Email" />
      <input type="password" placeholder="password" v-model="Password" />
      <button @click.prevent="login">Login</button>
    </form>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      Email: "",
      Password: "",
    };
  },
  methods: {
    async login() {
      try {
        let res = await axios.post(
          "https://taskfrontendapi.azurewebsites.net/api/user/login",
          { Email: this.Email, Password: this.Password }
        );

        if (res.data.token) {
          localStorage.setItem("accessToken", res.data.token);
          this.$router.replace({ name: "countries" });
        }
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  form {
    input {
      padding: 5px;
      margin: 5px;
    }
  }
}
</style>
