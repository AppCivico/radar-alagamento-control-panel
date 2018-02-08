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
            <div class="form-group">
              <h4>Dados:</h4>
              <div :class="`form-group ${this.validation.errors.description ? 'has-error' : ''}`">
                <label htmlFor="description">Descrição
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
                  <select name="level" class="form-control" v-model="notification.level">
                    <option v-for="(value, key) in levels" :value="key">{{ value }}</option>
                  </select>
                </label>
                <span class="help-block">{{this.validation.errors.level}}</span>
              </div>
              <div :class="`form-group ${this.validation.errors.districts ? 'has-error' : ''}`">
                <label htmlFor="districts">Distrito
                  <select name="districts" class="form-control" v-model="notification.districts" multiple>
                   <option v-for="district in districts" :value="district.id">{{ district.name }}</option>
                  </select>
                </label>
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
import api from '../../api'
import { validate } from '../../filters'

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
      districts: [],
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
      api.request('get', '/zone')
        .then((response) => {
          const zones = response.data.results
          const districts = []
          zones.map((item) => { item.districts.map((item) => districts.push(item)) })
          // districts = districts.sort((a, b) => b.name < a.name)
          this.districts = districts
        }, (err) => {
          console.error(err)
        })
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
        }, (err) => {
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
    }
  }
}
</script>

<style scoped>
  label {
    width: 100%;
  }
</style>
