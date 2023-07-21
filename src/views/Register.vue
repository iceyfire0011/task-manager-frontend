<template>
    <div class="container">

        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                <!-- Nested Row within Card Body -->
                <div class="row">
                    <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                    <div class="col-lg-7">
                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                            </div>
                            <form class="user">
                                <div class="form-group row">
                                    <input type="text" :model="form.name" class="form-control form-control-user"
                                        id="name" placeholder="Name">
                                </div>
                                <div class="form-group">
                                    <input type="email" :model="form.email" class="form-control form-control-user"
                                        id="exampleInputEmail" placeholder="Email Address">
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" :model="form.password"
                                            class="form-control form-control-user" id="exampleInputPassword"
                                            placeholder="Password">
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="password" :model="form.confirmPassword"
                                            class="form-control form-control-user" id="exampleRepeatPassword"
                                            placeholder="Repeat Password">
                                    </div>
                                </div>
                                <button @click.once="register" class="btn btn-primary btn-user btn-block">
                                    Register Account
                                </button>
                            </form>
                            <hr>
                            <div class="text-center">
                                <a class="small" :href="router.push('/login')">Already have an account? Login!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import axios from 'axios'
import router from '../router/index'
export default {
    name: 'Register',
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            }
        }
    },
    methods: {
        register() {
            axios.post(process.env.VUE_APP_API + '/auth/register', this.form)
                .then(({ data }) => {
                    localStorage.setItem('access_token', data.access_token)
                    router.push('/dashboard')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

}
</script>

<style scoped>

</style>
