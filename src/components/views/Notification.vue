<template>
  <div class="modal fade in" id="notification">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Cancelar" @click="clearFields()">
            <span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title">Nova notificação</h4>
        </div>
        <form @submit.prevent="validate()">
          <div class="modal-body">
            <p>Insira aqui os dados referentes a nova notifição que você deseja enviar:</p>
            <div class="form-group">
              <div :class="`form-group ${this.validation.errors.description ? 'has-error' : ''}`">
                <label htmlFor="description">Descrição
                <p class="help-block">Essa será a mensagem exibida na notificação, prefira mensagens curtas e objetivas.</p>
                  <input
                    type="text"
                    name="description"
                    v-model="notification.description"
                    class="form-control"
                    placeholder="Exemplo: Transbordamento de córrego"
                  />
                </label>
                <span class="help-block">{{this.validation.errors.description}}</span>
              </div>
              <div :class="`form-group ${this.validation.errors.level ? 'has-error' : ''}`">
                <label htmlFor="level">Nível
                <p class="help-block">Selecione a gravidade da notificação.</p>
                  <select name="level" class="form-control" v-model="notification.level">
                    <option v-for="(value, key) in levels" :value="key">{{ value }}</option>
                  </select>
                </label>
                <span class="help-block">{{this.validation.errors.level}}</span>
              </div>
              <div :class="`form-group ${this.validation.errors.districts ? 'has-error' : ''}`">
                <label htmlFor="districts">Distrito(s)</label>
                <p class="help-block">Selecione quais distritos serão notificados.</p>
                <select name="districts[]" class="form-control zones" multiple="multiple">
                  <optgroup :label="zone.name" v-for="zone in zones">
                    <option v-for="district in zone.districts" :value="district.id">{{ district.name }}</option>
                  </optgroup>
                </select>
                <span class="help-block">{{this.validation.errors.districts}}</span>
              </div>
              <template v-if="this.formMsg !== ''">
                <hr />
                <p>{{ this.formMsg }}</p>
              </template>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-default pull-left"
              data-dismiss="modal" @click="clearFields()"
            >
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary">
              Enviar
            </button>
          </div>
        </form>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</template>

<script>
import $ from 'jquery'
import api from '../../api'
import { validate } from '../../filters'
import '../../../static/js/plugins/select2/select2.min.js'
import '../../../static/js/plugins/select2/select2.min.css'

export default {
  name: 'Notification',
  props: ['alert'],
  data () {
    return {
      validation: {
        status: false,
        errors: {}
      },
      formMsg: '',
      levels: {
        attention: 'Atenção',
        alert: 'Alerta',
        emergency: 'Emergência',
        overflow: 'Enchente'
      },
      notification: {
        description: '',
        level: '',
        districts: []
      },
      zones: [],
      selectedDistricts: []
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    }
  },
  mounted () {
    this.getDistricts()
  },
  methods: {
    getDistricts () {
      var vm = this
      api.request('get', '/zone')
        .then((response) => {
          const zones = response.data.results
          this.zones = zones
        }, (err) => {
          console.error(err)
        }).then(() => {
          $('.zones').select2({
            dropdownParent: $('#notification'),
            width: '100%',
            placeholder: 'Selecione um ou mais distritos',
            language: {
              noResults () {
                return 'Nenhum resultado encontrado'
              }
            }
          })
          .val(this.value)
          .trigger('change')
          // emit event on change.
          .on('change', function () {
            vm.notification.districts = $(this).val()
          })
        })
    },
    logout () {
      this.$store.commit('SET_USER', null)
      this.$store.commit('SET_TOKEN', null)

      if (window.localStorage) {
        window.localStorage.setItem('user', null)
        window.localStorage.setItem('token', null)
      }

      this.$router.push('/login')
    },
    validate () {
      const {notification} = this
      const validation = validate(notification)

      if (!validation.status) {
        this.validation = validation
      } else {
        notification.sensor_sample_id = this.alert.id

        api.request('post', `/admin/alert?api_key=${this.token}`, notification)
        .then((response) => {
          this.formMsg = `Notificação enviada com sucesso, ${response.data.pushed_to_users} usuários notificados`
          this.clearFields()
          this.clearErrors()
        }, (err) => {
          if (err.response.status === 403) {
            console.log('Sem autorizando, deslogando ...');
            this.logout();
          }
          this.formMsg = `Notificação não enviada. Erro: ${err}`
        })
      }
    },
    clearFields () {
      this.notification = {
        description: '',
        level: '',
        districts: []
      }
      this.clearErrors()
    },
    clearErrors () {
      this.validation = {
        status: false,
        errors: {}
      }
    }
  }
}
</script>

<style>
  label {
    width: 100%;
  }
  .help-block {
    font-weight: normal;
  }
  .select2-container--default .select2-selection--multiple .select2-selection__choice {
    background-color: #069694;
    border: 1px solid #00504f;
  }
  .select2-container--default .select2-selection--multiple .select2-selection__choice__remove {
    color: #fff;
  }
</style>
