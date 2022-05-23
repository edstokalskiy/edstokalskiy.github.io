<template>
  <div class="wrapper">
	<form id="login">
		<h3>Login</h3>
		<div class="input-field" :class="{ error : (!$v.email.required || !$v.email.email)  }">
			<input type="email"  v-model="$v.email.$model" placeholder="email" name="email" id="email">
		</div>
		<div class="input-field" :class="{ error : !$v.password.required }">
			<input type="text" v-model="$v.password.$model" placeholder="password" name="pass" id="pass">
		</div>
		<div class="input-field">
			<div class="btn" @click="submit()">Submit</div>
		</div>
	</form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { required, email  } from 'vuelidate/lib/validators'

export default {
	data() {
        return {
            app: null,
			email: '',
			password: '',
			user: '',
        }
    },
	validations: {
		password: {
			required,
		},
		email: {
			required,
			email
		},
	},
	methods: {
		...mapMutations([
            'updateAuth',
			'initApp',
			'getDB',
        ]),
		submit() {
			this.$v.$touch();
            if ( !this.$v.$invalid ) {
				const auth = getAuth();
				signInWithEmailAndPassword(auth, this.email, this.password)
				.then((userCredential) => {
					const user = userCredential.user;
					this.updateAuth(user.uid);

					if ( localStorage.getItem('logged_in') == undefined ) {
						this.saveUser();
					}

					this.$notify({
						title: 'Success',
						duration: 4000,
						type: 'success',
						text: 'Logged in!'
					});
					
					this.$router.push({path: 'admin'});
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
			} else {
				this.$notify({
					duration: 3000,
					type: 'warn',
					text: "Check form fields",
				});
			}
		},

		compareTime() {
			let timeCreating = localStorage.getItem('logged_in');
			let timeNow = new Date().getTime();
			let diffInTime = timeNow - timeCreating;
			let diffInDays = diffInTime / (1000 * 3600 * 24);
			if ( diffInDays > 1 ) {
				localStorage.removeItem('logged_in');
			} else {
				this.$router.push({path: 'admin'});
			}
		},

		saveUser() {
			let dateCreating = new Date();
			localStorage.setItem('logged_in', dateCreating.getTime());
		},

		checkAuth() {
			if ( localStorage.getItem('logged_in') != undefined ) {
				this.compareTime();
			}
		},


	},
	mounted() {
		this.initApp(initializeApp(this.$store.state.firebaseConfig));

		this.checkAuth();
	},
};
</script>

<style lang="sass">
	h3
		margin-bottom: 30px
</style>
