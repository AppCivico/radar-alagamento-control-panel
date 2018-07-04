<template>
  <ul class="sidebar-menu">
    <li class="header">DADOS</li>
    <router-link tag="li" class="pageLink" to="/">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Sensores</span>
      </a>
    </router-link>
    <li class="header">NOTIFICAÇÕES</li>
    <router-link tag="li" class="pageLink" to="/all-notifications-sent">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Todas</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/notifications-sent">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Enviadas por mim</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/users-notifications">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Enviadas por usuários</span>
      </a>
    </router-link>
  </ul>
</template>
<script>
export default {
  name: 'SidebarMenu',
  mounted () {
    window.dispatchEvent(new Event('resize'))
  }
}
</script>
<style>
  /* override default */
  .sidebar-menu>li>a {
    padding: 12px 15px 12px 15px;
  }

  .sidebar-menu li.active>a>.fa-angle-left, .sidebar-menu li.active>a>.pull-right-container>.fa-angle-left {
    animation-name: rotate;
    animation-duration: .2s;
    animation-fill-mode: forwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }
</style>
