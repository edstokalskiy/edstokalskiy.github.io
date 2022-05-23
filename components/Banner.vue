<template>
    <div class="banner">
        <div class="banner__outer"></div>
        <div class="banner__inner">
            <h3>Technology that I used</h3>
            <ul>
                <li v-for="(technology, i) of technologies" :key="i">
                    <a :href="technology.link" target="_blank" class="link" v-if="technology.link">{{technology.name}}</a>
                    <p v-else>{{technology.name}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                technologies: [
                    {
                        name: 'vue.js',
                        link: 'https://vuejs.org/'
                    },
                    {
                        name: 'vue router',
                        link: 'https://router.vuejs.org/'
                    },
                    {
                        name: 'vuex',
                        link: 'https://vuex.vuejs.org/'
                    },
                    {
                        name: 'gsap',
                        link: 'https://greensock.com/gsap/'
                    },
                    {
                        name: 'nuxt',
                        link: 'https://nuxtjs.org/'
                    },
                    {
                        name: 'REST API',
                    },
                    {
                        name: 'jquery',
                    },
                    {
                        name: 'firebase',
                        link: 'https://firebase.google.com'
                    },
                    {
                        name: 'sass',
                    },
                    {
                        name: 'css',
                    },
                    {
                        name: 'javascript',
                    },
                    {
                        name: 'git',
                    },
                    {
                        name: 'gitlab',
                        link: 'https://about.gitlab.com/'
                    },
                    {
                        name: 'scss',
                    },
                    {
                        name: 'docker (basic)',
                        link: 'https://www.docker.com/'
                    },
                    {
                        name: 'vuelidate',
                        link: 'https://vuelidate.js.org/'
                    },
                    {
                        name: 'chart.js',
                        link: 'https://www.chartjs.org/'
                    },
                    {
                        name: 'fullPage.js',
                        link: 'https://alvarotrigo.com/fullPage/'
                    },
                    {
                        name: 'laravel mix',
                        link: 'https://laravel-mix.com/'
                    },
                    {
                        name: 'blade templates',
                        link: 'https://laravel.com/docs/9.x/blade'
                    },
                    {
                        name: 'laravel (basic)',
                        link: 'https://laravel.com/'
                    },
                    {
                        name: 'google maps',
                        link: 'https://developers.google.com/maps'
                    },
                    {
                        name: '2gis-maps',
                        link: 'https://api.2gis.ru/doc/maps/ru/quickstart/'
                    },
                    {
                        name: 'gira',
                    },
                    {
                        name: 'worksection',
                    },
                    {
                        name: 'some input masks',
                    },
                    {
                        name: 'some sliders',
                    },
                ]
            }
        }
    }
</script>

<style lang="sass">
    .banner
        padding: 15px 4px 4px 4px
        background: linear-gradient(to right, $red,  $purple, $red)
        position: relative
        display: flex
        width: 708px
        margin: 0 auto
        margin-bottom: 200px
        &::after
            content: ''
            position: absolute
            left: 4px
            top: 3px
            width: 6px
            height: 4px
            border: 2px solid #120458
        &::before
            content: ''
            position: absolute
            left: 16px
            top: 3px
            width: 6px
            height: 4px
            border: 2px solid #120458
        *
            text-align: center
        h3
            font-size: 22px
            line-height: 26px
            margin: 10px 10px 30px 10px
        &__outer
            position: absolute
            left: 0
            top: 0
            width: 100%
            height: 100%
            background: linear-gradient(to right, $red,  $purple, $red)
            z-index: -1
        &__inner
            background: $blue
            width: 700px
            padding: 15px 10px
        ul
            display: flex
            align-items: center
            justify-content: center
            flex-wrap: wrap
            li
                margin: 0 30px 15px 30px
                p
                    padding: 0
                    margin: 0
                a
                    text-decoration: underline
                a,
                p
                    font-size: 20px
                    line-height: 24px
                    display: inline-block
                    margin: 0
                    text-transform: lowercase
                &:nth-of-type(1)
                    color: $white
                &:nth-of-type(n + 1)
                    color: $red
                &:nth-of-type(2n + 1)
                    color: $purple
                &:nth-of-type(3n + 1)
                    color: $pink
                &:nth-of-type(4n + 1)
                    color: $lightPurple
</style>