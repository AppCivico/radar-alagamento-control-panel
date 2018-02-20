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
                  <div id='sensors_length' class='dataTables_length'>

                  </div>
                </div>
              </div>

              <div class='row'>
                <div class='col-sm-12 table-responsive'>
                  <table aria-describedby='sensors_info' role='grid' id='sensors' class='table table-bordered table-striped dataTable'>
                    <thead>
                      <tr role='row'>
                        <th aria-sort='ascending' aria-controls='Sensors' tabindex='0' class='sorting_asc'>ID</th>
                        <th aria-controls='sensors' tabindex='0' class='sorting'>Título</th>
                        <th aria-controls='sensors' tabindex='0' class='sorting'>Data</th>
                        <th aria-controls='sensors' tabindex='0' class='sorting'>Fonte</th>
                        <th aria-controls='sensors' tabindex='0' class='sorting'>Tipo</th>
                        <th aria-controls='sensors' tabindex='0' class='sorting'>Descrição</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <template v-if='sensors.length > 0'>
                        <tr v-for='sensor in sensors' role='row'>
                          <td class='sorting_1'>{{sensor.id}}</td>
                          <td>{{sensor.name}}</td>
                          <td>{{sensor.created_at | formatDate}}</td>
                          <td>{{sensor.source.name}}</td>
                          <td>{{sensor.type}}</td>
                          <td>{{sensor.description}}</td>
                          <td>
                            <router-link :to="`/sensor/${sensor.id}`">
                              <button type='button' class='btn btn-default center-block'>
                                Ver dados do sensor
                              </button>
                            </router-link>
                          </td>
                        </tr>
                      </template>
                      <template v-else>
                        <tr>
                          <td colspan='7'>
                            <div class="callout callout-info" v-if="loaded">
                              <p>Nenhum sensor localizado</p>
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
  </section>
</template>

<script>
import $ from 'jquery'
// Require needed datatables modules
import 'datatables.net'
import 'datatables.net-bs'

import api from '../../api'

export default {
  name: 'Sensors',
  data () {
    return {
      sensors: [],
      loaded: false
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    }
  },
  mounted () {
    this.loadSensors()
  },
  methods: {
    loadSensors () {
      api.request('get', `/sensor?api_key=${this.token}`)
        .then((response) => {
          this.sensors = response.data.results
          this.loaded = true
        }, (err) => {
          console.error(err)
        }).then(() => $('#sensors').DataTable({
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
