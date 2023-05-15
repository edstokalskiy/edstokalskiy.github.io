<template>
  <v-row justify="center">
    <v-dialog
      v-model="formIsOpen"
      max-width="800px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          Додати сайт
        </v-btn>
      </template>
      <v-card>
        <form class="py-5 px-5">
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="url"
                :error-messages="urlErrors"
                label="Сайт"
                required
                @input="$v.url.$touch()"
                @blur="$v.url.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="attendance"
                :error-messages="attendanceErrors"
                label="Відвідуваність"
                type="number"
                required
                @input="$v.attendance.$touch()"
                @blur="$v.attendance.$touch()"
              ></v-text-field>
              <v-checkbox
                v-model="hidden"
                label="Приховати сайт?"
              ></v-checkbox>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-select
                v-model="advertisingType"
                :items="advertisingTypes"
                :error-messages="advertisingTypeErrors"
                label="Позиція"
                item-text="title"
                item-value="id"
                required
                return-object
                @change="$v.advertisingType.$touch()"
                @blur="$v.advertisingType.$touch()"
              ></v-select>
              <v-text-field
                v-model="price"
                :error-messages="priceErrors"
                label="Ціна позиції"
                required
                type="number"
                @input="$v.price.$touch()"
                @blur="$v.price.$touch()"
              ></v-text-field>
              <v-select
                v-model="lang"
                :items="langs"
                :error-messages="langErrors"
                label="Мова"
                item-text="title"
                item-value="code"
                required
                return-object
                @change="$v.lang.$touch()"
                @blur="$v.lang.$touch()"
              ></v-select>
            </v-col>
          </v-row>
          <v-btn
            color="success"
            class="mr-4"
            @click="submit"
          >
            {{ buttonTitle }}
          </v-btn>
          <v-btn @click="clear">
            Стерти
          </v-btn>
        </form>
      </v-card>
    </v-dialog>
  </v-row>

</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, helpers } from 'vuelidate/lib/validators'

import { advertisingTypes, langs } from '@/variables'
import {mapGetters, mapMutations, mapState} from "vuex";

const uniq = (param) =>
  helpers.withParams(
    { type: 'uniq', value: param },
    (value) => param.isEditable || !helpers.req(value) || param.urls.indexOf(value) === -1
  )

export default {
  mixins: [validationMixin],

  validations() {
    return {
      url: {
        required,
        mustBeUniq: uniq({
          isEditable: this.isEditableStatus,
          urls: this.getSitesUrls
        }),
      },
      price: { required },
      advertisingType: { required },
      attendance: { required },
      lang: { required }
    }
  },

  data() {
    return {
      url: '',
      price: '',
      attendance: '',
      advertisingType: null,
      lang: null,
      hidden: false,
      id: null,
      advertisingTypes,
      langs,
      isEditableStatus: false,
    }
  },
  computed: {
    ...mapState({
      formIsOpenState: 'formIsOpen',
    }),

    ...mapGetters(['getEditableSiteData', 'getSitesUrls']),

    buttonTitle() {
      return this.isEditableStatus && 'Змінити' || 'Додати';
    },

    formIsOpen: {
      get () {
        return this.formIsOpenState;
      },
      set (value) {
        if (!value) {
          this.setEditableSiteId(null);
        }
        this.updateFormVisibilityStatus(value);
      }
    },

    advertisingTypeErrors () {
      const errors = []
      if (!this.$v.advertisingType.$dirty) return errors
      !this.$v.advertisingType.required && errors.push('Type is required')
      return errors
    },
    urlErrors () {
      const errors = []
      if (!this.$v.url.$dirty) return errors
      !this.$v.url.required && errors.push('Url is required.')
      !this.$v.url.mustBeUniq && errors.push('This url already exist.')
      return errors
    },
    priceErrors () {
      const errors = []
      if (!this.$v.price.$dirty) return errors
      !this.$v.price.required && errors.push('Price is required')
      return errors
    },
    attendanceErrors () {
      const errors = []
      if (!this.$v.attendance.$dirty) return errors
      !this.$v.attendance.required && errors.push('Attendance is required.')
      return errors
    },
    langErrors () {
      const errors = []
      if (!this.$v.lang.$dirty) return errors
      !this.$v.lang.required && errors.push('Lang is required.')
      return errors
    },
  },
  watch: {
    formIsOpen(val) {
      if (this.getEditableSiteData && val) {
        const { url, price, attendance, advertisingType, lang, visibility, id } = this.getEditableSiteData;
        this.isEditableStatus = true;
        this.url = url;
        this.price = price;
        this.attendance = attendance;
        this.advertisingType = advertisingType;
        this.lang = lang;
        this.hidden = !visibility;
        this.id = id;
      } else {
        this.clear();
        this.isEditableStatus = false;
      }
    }
  },
  methods: {
    ...mapMutations({
      saveSite: 'addSite',
      updateFormVisibilityStatus: 'updateFormVisibilityStatus',
      setEditableSiteId: 'setEditableSiteId',
      updateSite: 'updateSiteById',
    }),

    submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const data = {
          url: this.url,
          visibility: !this.hidden,
          attendance: +this.attendance,
          price: +this.price,
          lang: this.lang,
          advertisingType: this.advertisingType,
        };

        if (!this.isEditableStatus) {
          this.saveSite(data);
        } else {
          this.updateSite({id: this.id, data});
        }

        this.formIsOpen = false;
      }
    },
    clear () {
      this.$v.$reset()
      this.url = '';
      this.price = '';
      this.attendance = '';
      this.advertisingType = null;
      this.lang = null;
      this.hidden = false;
      this.id = null;
    },
  },
}
</script>

<style>

</style>