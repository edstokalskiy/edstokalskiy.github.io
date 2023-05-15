<template>
  <v-row justify="center">
    <v-dialog
      v-model="bookingIsOpen"
      max-width="800px"
    >
      <v-card>
        <div class="pa-10">
          <v-menu
            v-model="datePickerState"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Оберіть дату початку"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="datePickerState = false"
            ></v-date-picker>
          </v-menu>
          <v-dialog
            ref="dialog"
            v-model="timePickerIsOpen"
            :return-value.sync="time"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="time"
                label="Оберіть час початку"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timePickerIsOpen"
              v-model="time"
              full-width
              format="24hr"
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="timePickerIsOpen = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dialog.save(time)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
          <v-text-field
            v-model="countDays"
            label="Кількість днів"
            required
            type="number"
          ></v-text-field>
          <div v-if="$v.$invalid && $v.$anyDirty" class="error my-5 px-2">Усі поля обов'язкові</div>
          <v-btn
            color="success"
            class="mr-4"
            @click="submit"
          >
            Орендувати
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-row>

</template>

<script>
import {mapMutations, mapState} from "vuex";
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Booking',
  mixins: [validationMixin],
  validations() {
    return {
      countDays: { required },
      date: { required },
      time: { required },
    }
  },

  data() {
    return {
      today: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date: null,
      datePickerState: false,
      time: null,
      timePickerIsOpen: false,
      countDays: '',
    }
  },
  computed: {
    ...mapState({
      bookingIsOpenState: 'bookingIsOpen',
    }),

    bookingIsOpen: {
      get () {
        return this.bookingIsOpenState;
      },
      set (value) {
        if (!value) {
          this.updateBookingVisibilityStatus(false);
          this.setBookingId(null);
          this.clearForm();
        }
      }
    }

  },
  watch: {

  },
  mounted() {
    this.date = this.today;
  },
  methods: {
    ...mapMutations(['updateBookingVisibilityStatus', 'bookSite', 'setBookingId']),

    submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const {date, time, countDays} = this;
        this.bookSite({
          date,
          time,
          countDays
        });
        this.bookingIsOpen = false;
      }
    },

    clearForm() {
      this.time = null;
      this.date = this.today;
      this.countDays = '';
      this.$v.$reset();
    }

  },
}
</script>

<style>

</style>