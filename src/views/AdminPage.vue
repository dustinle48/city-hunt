<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/"></ion-back-button>
                </ion-buttons>
                <ion-title>Admin</ion-title>
            </ion-toolbar>
        </ion-header>
    <ion-content :fullscreen="true">
        <AdminComponent />
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
import AdminComponent from '@/components/AdminComponent.vue'
export default {
    name: 'AdminPage',
    components: { AdminComponent, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonBackButton },
}
</script>

<style scoped>

</style>