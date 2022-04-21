<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <LoginComponent />
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import LoginComponent from '@/components/LoginComponent.vue';
import { SplashScreen } from '@capacitor/splash-screen';

export default {
    name: 'LoginPage',
    components: {
        LoginComponent,
        IonPage,
        IonContent,
    },
    mounted() {
        this.splashScreen()
    },
    methods: {
        async splashScreen() {
            await SplashScreen.show({
                showDuration: 5000,
                autoHide: true
            });
        }
    }
}
</script>
