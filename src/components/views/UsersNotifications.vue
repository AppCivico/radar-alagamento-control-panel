<template>
  <section class="content">
    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="users-notifications_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="users-notifications_length" class="dataTables_length">

                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table aria-describedby="users-notifications_info" role="grid" id="users-notifications" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th aria-sort="ascending" aria-controls="users-notifications" tabindex="0" class="sorting_asc">ID</th>
                        <th aria-controls="users-notifications" tabindex="0" class="sorting">Descrição</th>
                        <th aria-controls="users-notifications" tabindex="0" class="sorting">Nível</th>
                        <th aria-controls="users-notifications" tabindex="0" class="sorting">Distritos alertados</th>
                        <th aria-controls="users-notifications" tabindex="0" class="sorting">Usuários notificados</th>
                        <th aria-controls="users-notifications" tabindex="0" class="sorting">ID do alerta</th>
                        <th aria-controls="users-notifications" tabindex="0" class="sorting">Desativar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-if="notifications.length > 0">
                        <tr class="notification" v-for="notification in notifications" role="row">
                          <td class="sorting_1">{{notification.id}}</td>
                          <td>{{notification.description}}</td>
                          <td>{{levels[notification.level]}}</td>
                          <td>
                            <p v-for="district in notification.alert_districts">{{district.district.name}}</p>
                          </td>
                          <td>{{notification.pushed_to_users}}</td>
                          <td>{{notification.sensor_sample_id}}</td>
                          <td>
                            <button type='button' class='btn btn-danger center-block' data-toggle='modal' data-target='#notification' @click='deactivate(notification)'>
                                Desativar notificação
                              </button>
                          </td>
                        </tr>
                      </template>
                      <template v-else>
                        <tr>
                          <td colspan="7">
                            <div class="callout callout-info" v-if="loaded">
                              <p>Nenhuma usuário do aplicativo enviou notificações.</p>
                            </div>
                            <div v-else>
                              <p>Carregando informações</p>
                            </div>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colspan="1" rowspan="1">ID</th>
                        <th colspan="1" rowspan="1">Descrição</th>
                        <th colspan="1" rowspan="1">Nível</th>
                        <th colspan="1" rowspan="1">Distritos alertados</th>
                        <th colspan="1" rowspan="1">Usuários notificados</th>
                        <th colspan="1" rowspan="1">ID do alerta</th>
                        <th colspan="1" rowspan="1">Desativar</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery'
// Require needed datatables modules
import 'datatables.net'
import 'datatables.net-bs'

import api from '../../api'

export default {
  name: 'UsersNotifications',
  data () {
    return {
      notifications: [],
      selectednotification: {},
      levels: {
        attention: 'Atenção',
        alert: 'Alerta',
        emergency: 'Emergência',
        overflow: 'Enchente'
      },
      loaded: false
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    }
  },
  mounted () {
    this.loadNotifications()
  },
  methods: {
    deactivate (data) {
      // TODO
      console.log('desativar', data)
    },
    loadNotifications () {
      api.request('get', `/alert/reported?api_key=${this.token}`)
        .then((response) => {
          this.notifications = response.data.results
          this.loaded = true
        }, (err) => {
          console.error(err)
        }).then(() => $('#users-notifications').DataTable({
          'language': {
            'lengthMenu': 'Mostrar _MENU_ por página',
            'zeroRecords': 'Nenhum alerta encontrado',
            'info': 'Página _PAGE_ de _PAGES_',
            'infoEmpty': 'Nenhum alerta encontrado',
            'infoFiltered': '(filtrado de _MAX_)',
            'paginate': {
              'first': 'Primeira',
              'last': 'Última',
              'next': 'Próxima',
              'previous': 'Anterior'
            },
            'loadingRecords': 'Carregando...',
            'processing': 'Processando...',
            'search': 'Busca:'
          }
        }))
    }
  }
}
</script>

<style>
/* Using the bootstrap style, but overriding the font to not draw in
   the Glyphicons Halflings font as an additional requirement for sorting icons.

   An alternative to the solution active below is to use the jquery style
   which uses images, but the color on the images does not match adminlte.

@import url('/static/js/plugins/datatables/jquery.dataTables.min.css');
*/

@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}

table.dataTable thead .sorting:after {
  content: "\f0dc";
}

table.dataTable thead .sorting_asc:after {
  content: "\f0dd";
}

table.dataTable thead .sorting_desc:after {
  content: "\f0de";
}
</style>
