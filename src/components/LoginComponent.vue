<template>
    <div id="container">
        <div id="section">
            <h1><strong>CITY HUNT</strong></h1>
            <h3>LOG IN</h3>
            <ion-button shape="round" expand="block" @click="loginFB()">
                <ion-icon :icon="logoFacebook"></ion-icon>
                Login via Facebook
            </ion-button>
            <ion-button disabled shape="round" expand="block" fill="outline">
                <ion-icon :icon="logoTwitter"></ion-icon>
                Login via Twitter
            </ion-button>
            <h4>Or</h4>
            <ion-button shape="round" expand="block" color="danger" @click="loginGuest()">
                <ion-icon :icon="person"></ion-icon>
                Play as a Guess
            </ion-button>
            <ion-button shape="round" expand="block" color="warning" router-link="/admin">
                <ion-icon :icon="person"></ion-icon>
                Admin
            </ion-button>
        </div>
    </div>
</template>

<script>
import { IonButton, IonIcon, useIonRouter } from '@ionic/vue';
import { defineComponent } from 'vue';
import { logoFacebook, logoTwitter, person } from 'ionicons/icons';
import { FacebookLogin } from '@capacitor-community/facebook-login';

export default defineComponent({
    name: 'LoginComponent',
    components: { IonButton, IonIcon },
    setup() {
        const ionRouter = useIonRouter()
        return {
            ionRouter,
            logoFacebook,
            logoTwitter,
            person
        }
    },
    data() {
        return {
            user: {
                platform: '',
                name: '',
                email: '',
            },
            twitter: {
                api_key: 'TKj0yx7DDiuJCB7XW2rQvvhUR',
                secret: 'MYeGGFWvPiFlhc1X5KtRsmO1wPFDoqPS9ECnGuoBttG0jPrPVN',
                token: 'AAAAAAAAAAAAAAAAAAAAAJXabQEAAAAAtUr6Pnlx9ZDm9IuUv9dAbtY7Zlo%3DVD2QecIXsdaxHoVJvd0rApIkYDHvqEjOUlpvDwLqRYVePuQCUH',
            }
        }
    },
    methods: {
        async loginFB() {
            const FACEBOOK_PERMISSIONS = ['email'];
            const result = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });

            if (result.accessToken) {
            // Login successful.
                const res = await FacebookLogin.getProfile({ 
                    fields: ['email','name'] 
                })
                this.user.platform = 'facebook'
                this.user.name = res.name
                this.user.email = res.email
                this.$store.dispatch("addUser",{
                    user: this.user
                })
                this.ionRouter.push('/tabs')
                console.log(`Facebook access token is ${result.accessToken.token}`);
            }
        },
        loginGuest() {
            this.user.platform = 'guest'
            this.user.name = 'guest'
            this.user.email = 'guest'
            this.$store.dispatch("addUser",{
                user: this.user
            })
            this.ionRouter.push('/tabs')
        }
    }
})
</script>

<style scoped>
#container {
    background-image: url('~/public/assets/mountain.jpg');
    background-size: cover;
    text-align: center;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container a {
    text-decoration: none;
}

ion-button {
    margin-top: 2rem;
    margin-bottom: 2rem;
}

#section {
    margin: auto 2rem;
    min-height: 70%;
    padding: 1rem 2rem;
    text-align: center;
    backdrop-filter: blur(4px) saturate(180%);
    -webkit-backdrop-filter: blur(4px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
</style>