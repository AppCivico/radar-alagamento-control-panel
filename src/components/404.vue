<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo-radar.png" class="center-block logo">
          <div class="text-center col-sm-6 col-sm-offset-3">
            <h1>Ops!</h1>
            <h4>Essa página não existe.</h4>
            <router-link to="/">Ir para a página inicial.</router-link>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'NotFound'
  }
</script>

<style scoped>
  .text-center {
    color: #000;
  }
</style>
