<template>
  <div class="login-background">
    <div class="login-form">
      <el-form>
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  beforeCreate() {
    if (this.$store.state.isAuthenticated) {
      this.$router.push('/')
    }
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
  background-image: url('@/assets/images/login-background.gif');
}

.login-form {
  text-align: center;
}
</style>
