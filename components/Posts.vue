<template>
    <div>
        <h3>projects</h3>
        <div class="posts" v-if="posts != null">
            <a :href="post.link" 
                v-for="(post, i) of $store.state.posts"
                class="posts__item" 
                target="_blank"  
                :key="i">
                <div class="posts__item-card">
                    <div class="posts__item-img" 
                         :lazy-background="post.image">
                    </div>
                </div>
                <p>{{post.title}}</p>
                <p class="posts__item-description">{{post.description}}</p>
            </a>
            <img class="posts__line-down" width="24" src="~/assets/img/line_down.svg" alt="Line down">
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { getDatabase, ref, child, get } from "firebase/database"
import { initializeApp } from "firebase/app"

export default {
    data() {
        return {
            text: null,
        }
    },

    computed: {
        ...mapGetters([
            'posts',
        ])
    },

    methods: {
        ...mapMutations([
			'initApp',
            'getPosts',
        ]),

        getSnapshot(dbRef, key) {
            get(child(dbRef, key)).then((snapshot) => {
                if (snapshot.exists()) {
                    let res = snapshot.val();
                    console.log(typeof res);
                    this.getPosts(snapshot.val());
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        },

        getData() {
            let db = getDatabase();
            const dbRef = ref(db);
            this.getSnapshot(dbRef, 'posts');
        }
    },
    
    mounted() {
        this.initApp(initializeApp(this.$store.state.firebaseConfig));
        if ( !this.$store.state.posts ) {
            this.getData();
        }
    }
}

</script>

<style lang="sass" scoped>
    $delayTo: .4s
    $delayFrom: .1s

    h3
        text-align: center
        color: #4df8ce
        margin-bottom: 140px
        letter-spacing: 8px
        background: #120458
        padding: 5px 0
    .posts
        display: flex
        align-items: flex-start
        flex-wrap: wrap
        justify-content: flex-start
        margin: 0 auto
        width: calc( (265px + 60px) * 3 )
        max-width: 100%
        position: relative
        &__line-down
            position: absolute
            left: 50%
            top: 0
            transform: translate(-50%, -100%)
            z-index: -1
        &__item
            width: 265px
            display: block
            margin: 15px 30px
            p
                margin: 0
                margin-top: 0.75em
                font-size: 1.4em
                line-height: 120%
                transform: translateX(0)
                transition: transform $delayFrom
            &-description
                font-size: 12px !important
                line-height: 120% !important
                margin-top: 0.5em !important
            &-card
                padding: 15px 2px 4px 2px
                background: $purple
                position: relative
                transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)
                transition: transform $delayFrom
                &::after
                    content: ""
                    position: absolute
                    width: 100%
                    height: 100%
                    top: 0
                    left: 0
                    background: linear-gradient(to right, $red,  $purple, $red)
                    transform-style: preserve-3d
                    transition: transform $delayFrom
                    z-index: -1
                // &::after
                //     content: ''
                //     position: absolute
                //     left: 4px
                //     top: 3px
                //     width: 6px
                //     height: 4px
                //     border: 2px solid #120458
                //     z-index: -1
                &::before
                    content: ''
                    position: absolute
                    left: 4px
                    top: 3px
                    width: 6px
                    height: 4px
                    border: 2px solid #120458
            &:hover
                .posts__item-card
                    background: linear-gradient(to right, $red,  $purple, $red)
                    transform: translate3d(-2%, -2.5%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(-5deg) skew(0deg, 0deg)
                    transform-style: preserve-3d
                    transition: transform $delayTo
                    &:after
                        transform: translate3d(2%, 2.5%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(5deg) skew(0deg, 0deg)
                        transform-style: preserve-3d
                        transition: transform $delayTo
                p
                    transform: translateX(7px)
                    transition: transform $delayTo
                .posts__item-img
                    opacity: 1
                    transition: opacity $delayFrom

            &-img
                border: 3px solid $blue
                width: 100%
                height: 165px
                background-size: cover 
                background-position: 50% 50%
                opacity: .92
                transition: opacity $delayTo
</style>