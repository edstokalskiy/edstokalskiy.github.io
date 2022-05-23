<template>
	<div class="wrapper">
		<div class="admin">
			<h3>Add new project</h3>
			<form ref="project">
				<div class="input-field" :class="{ error : $v.$error && !$v.title.required  }">
					<input type="text" autocomplete="off" v-model="$v.title.$model" placeholder="Project name" name="title" id="title">
				</div>
				<div class="input-field" :class="{ error : $v.$error && !$v.description.required  }">
					<input type="text" autocomplete="off" v-model="$v.description.$model" placeholder="Project description" name="description" id="description">
				</div>
				<div class="input-field" :class="{ error : $v.$error && !$v.image.required  }">
					<input type="text" autocomplete="off" v-model="$v.image.$model" placeholder="Project snapshot" name="image" id="image">
				</div>
				<div class="input-field" :class="{ error : $v.$error && !$v.link.required  }">
					<input type="text" autocomplete="off" v-model="$v.link.$model" placeholder="Project link" name="link" id="link">
				</div>
				<div class="input-field">
					<div class="btn" @click="submit()">Submit</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import { initializeApp } from "firebase/app"
import { getDatabase, ref, child, set, get } from "firebase/database"
import { required } from 'vuelidate/lib/validators'

export default {
	data() {
        return {
            database: null,
			description: '',
			image: '',
			link: '',
			title: '',
			postCount: 0,
			db: null,
        }
    },
	validations: {
		description: {
			required,
		},
		image: {
			required,
		},
		link: {
			required,
		},
		title: {
			required,
		},
	},
	methods: {
		...mapMutations([
			'initApp',
			'updateAuth',
        ]),
		
    	submit() {
			this.$v.$touch();
            if ( !this.$v.$invalid ) {
				let now = new Date();
				let time = now.getTime();

				set(ref(this.db, 'posts/' + this.postCount ), {
					description: this.description,
					image: this.image,
					link: this.link,
					slug: 'id-' + time,
					title: this.title,
					id: time,
				}).then((res) => {
					this.$notify({
						title: 'Success',
						duration: 4000,
						type: 'success',
						text: 'Project added'
					});
					this.$refs.project.reset();
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

				this.postCount++;
			} else {
				this.$notify({
					duration: 3000,
					type: 'warn',
					text: "Check form fields",
				});
			}
		}
	},
	mounted() {
        if ( this.$store.state.uid == null && localStorage.getItem('logged_in') == undefined ) {
            this.$router.push({path: 'login'});
        } else if( localStorage.getItem('logged_in') != undefined  ) {
			this.updateAuth(1);
		}

		this.initApp(initializeApp(this.$store.state.firebaseConfig));

		this.db = getDatabase();
		
		const dbRef = ref(this.db);
		get(child(dbRef, 'posts')).then((snapshot) => {
			if (snapshot.exists()) {
				let data = snapshot.val();
				this.postCount = Object.keys(data).length;
			} else {
				this.postCount = 0;
				console.log("No data available");
			}
		}).catch((error) => {
			console.error(error);
		});
	},
};
</script>

<style lang="sass">
	h3
		text-align: center
		margin-bottom: 30px
</style>
