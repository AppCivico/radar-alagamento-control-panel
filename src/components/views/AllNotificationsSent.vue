<template>
  <section class="content">
    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="notifications-sent_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="notifications-sent_length" class="dataTables_length">

                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table aria-describedby="notifications-sent_info" role="grid" id="notifications-sent" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th aria-sort="ascending" aria-controls="notifications-sent" tabindex="0" class="sorting_asc">ID</th>
                        <th aria-controls="notifications-sent" tabindex="0" class="sorting">Descrição</th>
                        <th aria-controls="notifications-sent" tabindex="0" class="sorting">Nível</th>
                        <th aria-controls="notifications-sent" tabindex="0" class="sorting">Distritos alertados</th>
                        <th aria-controls="notifications-sent" tabindex="0" class="sorting">Usuários notificados</th>
                        <th aria-controls="notifications-sent" tabindex="0" class="sorting">ID do alerta</th>
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
                        </tr>
                      </template>
                      <template v-else>
                        <tr>
                          <td colspan="6">
                            <div class="callout callout-info">
                              <p>Você ainda não enviou nenhuma notificação</p>
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
  name: 'NotificationsSent',
  data () {
    return {
      notifications: [],
      selectednotification: {},
      levels: {
        attention: 'Atenção',
        alert: 'Alerta',
        emergency: 'Emergência',
        overflow: 'Enchente'
      }
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
    loadNotifications () {
      api.request('get', `/admin/alert?api_key=${this.token}`)
        .then((response) => {
          this.notifications = response.data.results
        }, (err) => {
          console.error(err)
        }).then(() => $('#notifications-sent').DataTable({
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
