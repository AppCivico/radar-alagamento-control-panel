<template>
  <section class='content'>
    <div class='row center-block'>
      <div class='col-md-12'>
        <div class='box'>
          <!-- /.box-header -->
          <div class='box-body'>
            <div class='dataTables_wrapper form-inline dt-bootstrap' id='alerts_wrapper'>
              <div class='row'>
                <div class='col-sm-6'>
                  <div id='alerts_length' class='dataTables_length'>

                  </div>
                </div>
              </div>

              <div class='row'>
                <div class='col-sm-12 table-responsive'>
                  <table aria-describedby='alerts_info' role='grid' id='alerts' class='table table-bordered table-striped dataTable'>
                    <thead>
                      <tr role='row'>
                        <th aria-sort='ascending' aria-controls='alerts' tabindex='0' class='sorting_asc'>ID</th>
                        <th aria-controls='alerts' tabindex='0' class='sorting'>Title</th>
                        <th aria-controls='alerts' tabindex='0' class='sorting'>Date</th>
                        <th aria-controls='alerts' tabindex='0' class='sorting'>Source</th>
                        <th aria-controls='alerts' tabindex='0' class='sorting'>Type</th>
                        <th aria-controls='alerts' tabindex='0' class='sorting'>Descrição</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <template v-if='alerts.length > 0'>
                        <tr v-for='alert in alerts' role='row'>
                          <td class='sorting_1'>{{alert.id}}</td>
                          <td>{{alert.name}}</td>
                          <td>{{alert.created_at | formatDate}}</td>
                          <td>{{alert.source.name}}</td>
                          <td>{{alert.type}}</td>
                          <td>{{alert.description}}</td>
                          <td>
                            <button type='button' class='btn btn-danger center-block' data-toggle='modal' data-target='#notification' @click='newNotification(alert)'>
                                Criar notificação
                              </button>
                          </td>
                        </tr>
                      </template>
                      <template v-else>
                        <tr>
                          <td colspan='5'>
                            <div class='callout callout-info'>
                              <p>Nenhum alerta localizado</p>
                            </div>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colspan='1' rowspan='1'>ID</th>
                        <th colspan='1' rowspan='1'>Title</th>
                        <th colspan='1' rowspan='1'>Date</th>
                        <th colspan='1' rowspan='1'>Source</th>
                        <th colspan='1' rowspan='1'>Type</th>
                        <th colspan='1' rowspan='1'>Descrição</th>
                        <th />
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
    <Notification :alert='this.selectedAlert' />
  </section>
</template>

<script>
import $ from 'jquery'
// Require needed datatables modules
import 'datatables.net'
import 'datatables.net-bs'

import api from '../../api'
import Notification from './Notification'

export default {
  name: 'Alerts',
  data () {
    return {
      alerts: [],
      selectedAlert: {}
    }
  },
  components: {
    Notification
  },
  computed: {
    token () {
      return this.$store.state.token
    }
  },
  mounted () {
    this.loadAlerts()
  },
  methods: {
    loadAlerts () {
      api.request('get', `/sensor?api_key=${this.token}`)
        .then((response) => {
          this.alerts = response.data.results
        }, (err) => {
          console.error(err)
        }).then(() => $('#alerts').DataTable({
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
    },
    newNotification (alert) {
      this.selectedAlert = alert
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
  content: '\f0dc';
}

table.dataTable thead .sorting_asc:after {
  content: '\f0dd';
}

table.dataTable thead .sorting_desc:after {
  content: '\f0de';
}
</style>
