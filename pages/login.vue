<template>
  <div class="login-background">
    <div class="central-column">
      <el-card>
        <div slot="header">
          <span>Авторизация</span>
        </div>
        <el-form
          class="login-form"
          :label-position="'top'"
          :model="loginForm"
          @keydown.enter.native="login"
        >
          <el-form-item class="form-item" label="Почта:">
            <el-input v-model="loginForm.email"></el-input>
          </el-form-item>
          <el-form-item class="form-item" label="Пароль:">
            <el-input v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <div class="login-button">
            <el-button @click="login"> Войти </el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
    }
  },
  beforeCreate() {
    if (this.$store.state.isAuthenticated) {
      this.$router.push('/')
    }
  },
  methods: {
    login() {
      this.$store.dispatch('authorize', this.loginForm)
    },
  },
}
</script>

<style lang="scss" scoped>
.login-background {
  text-align: center;
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: lightcyan;
}

.central-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-form {
  text-align: left;
  width: 20em;
}

.login-button {
  text-align: center;
}
</style>
