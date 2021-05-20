<template>
  <div class="dev-links">
    <ul class="nav-list">
      <li class="nav-item">
        <nuxt-link class="nav-link" to="/user"> Логин </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link class="nav-link" to="/users"> Пользователи </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.dev-links {
  position: fixed;
  right: 150px;
  top: 50%;
}
</style>