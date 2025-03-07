<template>
    <button @click="SignIn">
        SignUp With GooGle
    </button>
</template>

<script>
import { auth, provider } from "@/firebase/firebase";



export default {
    name: "LoginPage",
    methods: {
        SignIn() {

            auth.signInWithPopup(provider)
                .then((result) => {
                    console.log("User Info:", result.user);
                    this.$router.push({name:'homepage'})
                })
                .catch((error) => {
                    console.error("Login Error:", error);
                });
        }
    },
    created(){
       
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.$router.push({name:'homepage'})
      } 
    });
    }

}
</script>

<style></style>