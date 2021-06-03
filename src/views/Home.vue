<template>
<div class="container">
  <div class="columns is-centered">
    <div class="column is-half m-3">
    <HelloWorld />
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  
};
</script>
