<template>
    <header>
        <div class="wrapper">
            <NuxtLink to="/">
                <LogoSvg/>
            </NuxtLink>
            <div class="links">
                <div class="link link__purple" @click="scrollPageTo('#about')" v-if="$store.state.uid == null">about</div>
                <a href="https://t.me/kkarlson" class="link" target="_blank">
                    <svg width="24px" version="1.0" fill="#4df8ce" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        height="24px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                    <path d="M84.16,14.148l-71.047,29.57c0,0-3.359,1.221-3.099,3.473c0.267,2.256,3.008,3.288,3.008,3.288l17.877,6.382
                        c0,0,5.396,18.772,6.458,22.344c1.062,3.562,1.914,3.646,1.914,3.646c0.989,0.456,1.888-0.27,1.888-0.27l11.55-11.169L70.71,86.054
                        c4.869,2.253,6.641-2.441,6.641-2.441L90,15.935C90,11.427,84.16,14.148,84.16,14.148z M71.582,78.17L52.324,62.51l-5.976,5.777
                        l1.314-12.291l25.67-24.329L38.341,52.441l-15.521-5.54l59.217-24.648L71.582,78.17z"/>
                    </svg>
                </a>
                <a href="https://www.linkedin.com/in/stokalskyi" class="link" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" viewBox="0 0 24 24" fill="none" stroke="#4df8ce" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                </a>
                <!-- <NuxtLink to="/" class="link link__pink" v-if="$store.state.uid == null">resume</NuxtLink> -->
                <NuxtLink to="admin" class="link link__pink" v-if="$store.state.uid && $route.name != 'Admin'">Cabinet</NuxtLink>
                <div class="link link__purple" v-if="$store.state.uid" @click="logout">logout</div>
            </div>
        </div>
    </header>
</template>

<script>
import { getAuth, signOut } from "firebase/auth"
import { mapMutations } from 'vuex'

export default {
    methods: {
        scrollPageTo(block) {
            if (document.querySelector(block) ) {
                this.$gsap.to(window, { duration: .7, scrollTo: block });
            } else {
                this.$router.push({path: '/', hash: block});
            }
        },

        ...mapMutations([
            'updateAuth',
        ]),

        logout() {
            const auth = getAuth();
            signOut(auth).then(() => {
                localStorage.removeItem('logged_in');
                this.updateAuth(null);

                this.$notify({
                    title: 'Success',
                    duration: 3000,
                    type: 'warn',
                    text: 'You are sign out!'
                });

                if ( this.$route.name == 'Admin' ) {
                    this.$router.push({path: 'login'});
                }
            }).catch((error) => {
                this.$notify({
					title: 'Error',
					duration: 4000,
					type: 'error',
					text: error.message,
				});
                console.error(error);
            });
        }
    },
}
</script>

<style lang="sass">
    .links
        display: flex
        align-items: center
</style>
