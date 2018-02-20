<template>
  <section class='content'>
    <div class='row center-block'>
      <div class='col-md-12'>
        <div class='box'>
          <!-- /.box-header -->
          <div class='box-body'>
            <div class='dataTables_wrapper form-inline dt-bootstrap' id='sensors_wrapper'>
              <div class='row'>
                <div class='col-sm-6'>
                  <div id='sensor-data_length' class='dataTables_length'>

                  </div>
                </div>
              </div>

              <div class='row'>
                <div class='col-sm-12 table-responsive'>
                  <table aria-describedby='sensor-data_info' role='grid' id='sensor-data' class='table table-bordered table-striped dataTable'>
                    <thead>
                      <tr role='row'>
                        <th aria-sort='ascending' aria-controls='sensor-data' tabindex='0' class='sorting_asc'>ID</th>
                        <th aria-controls='sensor-data' tabindex='0' class='sorting'>Data</th>
                        <th aria-controls='sensor-data' tabindex='0' class='sorting'>Valor</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <template v-if='sensorData.length > 0'>
                        <tr v-for='data in sensorData' role='row'>
                          <td class='sorting_1'>{{data.id}}</td>
                          <td>{{data.event_ts}}</td>
                          <td>{{data.value}}</td>
                          <td>
                            <button type='button' class='btn btn-danger center-block' data-toggle='modal' data-target='#notification' @click='newNotification(data)'>
                                Criar notificação
                              </button>
                          </td>
                        </tr>
                      </template>
                      <template v-else>
                        <tr>
                          <td colspan='4'>
                            <div class="callout callout-info" v-if="loaded">
                              <p>Este sensor não enviou informações</p>
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
                        <th colspan='1' rowspan='1'>ID</th>
                        <th colspan='1' rowspan='1'>Data</th>
                        <th colspan='1' rowspan='1'>Valor</th>
                        <th colspan='1' rowspan='1'></th>
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
    <Notification :alert='this.selectedData' />
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
  name: 'Sensor',
  props: ['id'],
  data () {
    return {
      sensorData: [],
      selectedData: {},
      loaded: false
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
    this.loadData()
  },
  methods: {
    loadData () {
      api.request('get', `/sensor/${this.$route.params.id}/sample?api_key=${this.token}&rows=100`)
        .then((response) => {
          this.sensorData = response.data.results
          this.loaded = true
        }, (err) => {
          console.error(err)
        }).then(() => $('#sensor-data').DataTable({
          'language': {
            'lengthMenu': 'Mostrar _MENU_ por página',
            'zeroRecords': 'Nenhum sensor encontrado',
            'info': 'Página _PAGE_ de _PAGES_',
            'infoEmpty': 'Nenhum sensora encontrado',
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
    newNotification (data) {
      this.selectedData = data
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
