<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Post</router-link> |
      <router-link to="/calculadora">Calculadora</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px !important;
  text-align: center !important;
}

#nav a {
  color: #2c3e50 !important;
}

#nav a.router-link-exact-active {
  color: #42b983 !important;
}
</style>
