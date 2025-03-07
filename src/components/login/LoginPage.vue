<template>
    <div class="flex w-100vw flex-column justify-center items-center">



        <div v-if="OnloginForm" class="flex flex-column h-50vh justify-center items-center gap-28">
            <h3 class="w-full text-center headinglogin">
                Login Page
            </h3>
            <input type="text" v-model="loginEmail" placeholder="Email" />
            <input type="password" v-model="loginPassword" placeholder="Password" />
            <button class="mt-10 button" @click="handleLogin">
                Sign In
            </button>

            <p class="mt-10">Or SignIn Using</p>

            <img @click="SignIn" src="/google.svg" style="height: 50px; margin-top: 20px; cursor: pointer;" alt="">

            <h3>
                Dont have an account? <span style="color: #7fe282; cursor: pointer;"
                    @click="OnloginForm = !OnloginForm">Sign Up</span>
            </h3>
        </div>


        <div v-else class="flex flex-column h-50vh justify-center items-center gap-28">
            <h3 class="w-full text-center headinglogin">
                SignUp Page
            </h3>
            <input type="text" v-model="signupEmail" placeholder="Email" />
            <input type="password" v-model="signupPassword" placeholder="Password" />
            <button class="mt-10 button" v-on:click="SignUpProcess">
                Sign Up
            </button>

            <p class="mt-10">Or SignIn Using</p>

            <img @click="SignIn" src="/google.svg" style="height: 50px; margin-top: 20px; cursor: pointer;" alt="">

            <h3>
                Already have an account? <span style="color: #7fe282; cursor: pointer;"
                    @click="OnloginForm = !OnloginForm">Sign In</span>
            </h3>
        </div>


    </div>

</template>

<script>
import { auth, provider } from "@/firebase/firebase";




export default {
    name: "LoginPage",
    data() {
        return {


            loginEmail: "",
            loginPassword: "",
            signupEmail: "",
            signupPassword: "",
            OnloginForm: true,
        }
    },
    methods: {
        SignIn() {

            auth.signInWithPopup(provider)
                .then((result) => {
                    console.log("User Info:", result.user);
                    this.$router.push("/").catch((error) => {
                        console.error("Login Error:", error);
                    });
                })
                .catch((error) => {
                    console.error("Login Error:", error);
                });
        },

        handleLogin() {
            auth.signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    console.log("User Info:", user);
                    this.$router.push("/").catch((error) => {
                        console.error("Login Error:", error);
                    });
                    // ...
                })
                .catch((error) => {
                    // var errorCode = error.code;
                    var errorMessage = error.message;
                    console.error("Login Error:", errorMessage);
                });
        },

        SignUpProcess() {
            auth.createUserWithEmailAndPassword(this.signupEmail, this.signupPassword)
                .then((userCredential) => {
                    console.log("User Info:", userCredential.user);
                    this.$router.push("/").catch((error) => {
                        console.error("Login Error:", error);
                    });
                })
                .catch((error) => {
                    console.log("Error:", error.message);
                });


        }
    },
    created() {

        auth.onAuthStateChanged((user) => {
            if (user) {
                this.$router.push({ name: 'homepage' }).catch((error) => {
                    console.error("Login Error:", error);
                });
            }
        });
    }

}
</script>

<style scoped>
.headinglogin {
    color: black;
    font-size: 29px;
    font-weight: 500;
    letter-spacing: 1px;
    font-family: "Space Mono", monospace;
}

.text-center {
    text-align: center;
}

.w-full {
    width: 100%;
}

.w-100vw {
    width: 100vw;
}

.flex {
    display: flex;
    justify-content: center;

}

.flex-column {
    flex-direction: column;
}

.justify-center {
    justify-content: center;

}

.items-center {
    align-items: center;
}

input {
    border: 1px solid #d9d9d9 !important;
    width: 30vw;
    height: 43px;
    color: #333;
    margin-top: 10px;
    padding-left: 20px;
    border-radius: 5px;

}

.h-50vh {
    height: 77vh;
}

.mt-10 {
    margin-top: 30px;
}

.button {
    background-color: #7fe282;
    width: 10vw;
    height: 5vh;
    color: black;
}

.gap-28 {
    gap: 28px;
}
</style>
