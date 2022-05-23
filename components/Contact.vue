<template>
    <form ref="contact">
        <h3>Contact me!</h3>
        <div class="input-field" :class="{ error : $v.$error && !$v.name.required  }">
            <input type="text" autocomplete="off" v-model="$v.name.$model" placeholder="Your name" name="name" id="name">
        </div>
        <div class="input-field" :class="{ error : $v.$error && (!$v.email.required || !$v.email.email)  }">
            <input type="email" autocomplete="off" v-model="$v.email.$model" placeholder="email" name="email" id="email">
        </div>
        <div class="input-field">
            <div class="btn" @click="submit()">Submit</div>
        </div>
    </form>
</template>

<script>
import { mapMutations } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import { initializeApp } from "firebase/app"
import { getDatabase, ref, set, get, child } from "firebase/database"

export default {
    data() {
        return {
            name: '',
            email: '',
            db: null,
            counter: null,
        }
    },

    validations: {
		name: {
			required,
		},
		email: {
			required,
            email
		},
	},

    methods: {
        ...mapMutations([
			'initApp',
        ]),

        formSending(count) {
            set(ref(this.db, 'contact/' + count ), {
                name: this.name,
                email: this.email,
            }).then((res) => {
                this.$notify({
                    title: 'Success',
                    duration: 4000,
                    type: 'success',
                    text: 'Thanks'
                });
                this.$refs.contact.reset();
            })
            .catch((error) => {
                console.error(error.message);
                this.$notify({
                    title: 'Error',
                    duration: 4000,
                    type: 'error',
                    text: error.message,
                });
            });
        },

        submit() {
			this.$v.$touch();
            if ( !this.$v.$invalid ) {
                this.checkCount();
			} else {
				this.$notify({
					duration: 3000,
					type: 'warn',
					text: "Check form fields",
				});
			}
		},

        checkCount() {
            let dbRef = ref(this.db);
            get(child(dbRef, 'contact')).then((snapshot) => {
                if (snapshot.exists()) {
                    let data = snapshot.val();
                    let count = Object.keys(data).length;
                    this.formSending(count);
                } else {
                    this.formSending(0);
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    },

    mounted() {
        this.initApp(initializeApp(this.$store.state.firebaseConfig));
        this.db = getDatabase();

    },

}

</script>

<style lang="sass">
    h3
        margin: 50px auto
        text-align: center
    form
        margin: 120px auto
</style>