<script setup>
// import Swal from 'sweetalert2'
import { useTheme } from 'vuetify'
const theme = useTheme();
const password = ref('')
const passwordconfirm = ref('')
const showPassword = ref(false)
const errMsg = ref()
// show password
function toggleVisibility() {
    showPassword.value = !showPassword.value;
}

// Update Password
async function resetpassword() {// password reset for user
    const supabase = useSupabaseClient()
    try {
        if (password.value == passwordconfirm.value) {
            const { data, error } = await supabase.auth.updateUser({// update user info
                password: password.value
            })
            if (error) {
                console.log(error);
                errMsg.value = error.msg// display error if passwords not match
                throw error
            } else {
                errMsg.value = ''
                // display success message
                console.log("updated")

                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Password updated successfully',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    password.value = ''
                    passwordconfirm.value = ''
                })
            }
        } else {
            errMsg.value = 'Password does not match'
        }

    } catch (error) {
        console.log(error)
        errMsg.value = error // display error message from API
    }
}
</script>
<template>
    <div class="py-5">
        <h1 class="text-2xl font-semibold">Reset password:</h1>
        <form @submit.prevent="resetpassword" class="p-5">
            <div class="password grid md:grid-cols-2">
                <div class="1 p-2">
                    <label for="password" :class="theme.global.current.value.dark ? 'text-white' : 'text-zinc-800'"
                        class="labelp text-left rounded-md text-lg font-semibold">Enter
                        New
                        password:</label>
                    <div :class="theme.global.current.value.dark ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-black'"
                        class="pass mt-2 outline outline-1 px-2 outline-zinc-700 rounded-lg my-auto w-11/12 mx-auto flex">
                        <input id="pass" name="password" v-model="password" placeholder="password"
                            class="text-black outline-none bg-transparent text-lg py-3 w-full   "
                            :class="theme.global.current.value.dark ? 'text-white' : 'text-black'"
                            :type="showPassword ? 'text' : 'password'" required>
                        <div class="my-auto m-2">
                            <v-icon class="my-auto" size="25" @click="toggleVisibility">
                                {{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                        </div>
                    </div>
                </div>
                <div class="2 p-2">
                    <label for="password" :class="theme.global.current.value.dark ? 'text-white' : 'text-zinc-800'"
                        class="labelp text-left rounded-md text-lg font-semibold">Confirm
                        New
                        password:</label>
                    <div :class="theme.global.current.value.dark ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-black'"
                        class="pass mt-2 outline outline-1 px-2 outline-zinc-700 rounded-lg my-auto w-11/12 mx-auto flex">
                        <input id="pass2" name="password" v-model="passwordconfirm" placeholder="Confirm password"
                            class="text-black outline-none bg-transparent text-lg py-3 w-full   "
                            :class="theme.global.current.value.dark ? 'text-white' : 'text-black'"
                            :type="showPassword ? 'text' : 'password'" required>
                        <div class="my-auto m-2">
                            <v-icon class="my-auto" size="25" @click="toggleVisibility">
                                {{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                        </div>
                    </div>
                </div>

            </div>
            <p v-if="errMsg" class=" text-md text-red-700">{{ errMsg }}</p>
            <v-btn type="submit" class="ma-5 flex w-1/3 justify-center" min-height="40" color="primary">Reset</v-btn>
        </form>
    </div>
</template>