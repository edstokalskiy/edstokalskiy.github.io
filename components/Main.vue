<template>
    <div>
        <div class="wrapper">
            <Banner />
            <Posts />

            <div class="about__wrapper" id="about">
                <h2>About me</h2>
                <p>My name is Stokalskyi Eduard and I love to create all kinds of things. I specialize in Web development, I love tasks with interesting business logic.</p>
                <p>My experience includes the development of large portals, single-page applications, online stores, landing pages, scripting, bug fixing and much more. I always want to receive a variety of tasks.</p>
                <p>I am a native of Ukraine <span class="uk"></span>. I currently live in Kyiv. Due to the current situation in my country, I have to look for a new job. Our company, unfortunately, has lost customers.</p>
                <p>I will be glad to future cooperation!</p>
                <div class="image">
                    <img id="me" src="~/assets/img/me.jpg" width="320" alt="I am">
                </div>
            </div>

            <Contact />
            
        </div>
    </div>
</template>

<script>


export default {
    data() {
        return {}
    },

    methods: {
        animateOnScroll() {

            this.$gsap.to('.banner', {
                x: 400,
                ease: 'Power1.easeInOut',
                scrollTrigger: {
                    trigger: '.posts',
                    pin: true,
                    end: 'bottom',
                    scrub: true
                }
            });
            this.$gsap.to('.banner__outer', {
                x: -400,
                ease: 'Power1.easeInOut',
                scrollTrigger: {
                    trigger: '.posts',
                    pin: true,
                    end: 'bottom',
                    scrub: true
                }
            });
        },


    },

    mounted() {
        this.animateOnScroll();
    },

}

</script>

<style lang="sass">
    .about
        &__wrapper
            margin-top: 8%
            max-width: calc(100% - 350px)
            padding: 60px 0
            position: relative
            p
                &:not(:last-of-type)
                    margin-bottom: 5vh
            .image
                width: 320px
                position: absolute
                right: -20px
                top: 50%
                img
                    transform: translate(100%, -50%) rotate(5deg)
    .uk
        width: 24px
        height: 16px
        display: inline-block
        background: #0066cc
        padding-bottom: 12px
        position: relative
        &::after
            content: ""
            position: absolute
            top: 8px
            height: 8px
            width: 100%
            background: #ffcc00
        
</style>