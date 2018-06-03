<template>
    <div class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="javascript:void(0)">Library</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li>
                        <router-link :to="{ path: '/', activeClass: 'active' }">Helper</router-link>
                    </li>
                    <li>
                        <router-link :to="{ path: '/Booklist', activeClass: 'active' }">Book List</router-link>
                    </li>
                    <li>
                        <router-link :to="{ path: '/Recordlist', activeClass: 'active' }">My Record</router-link>
                    </li>
                    <li v-if="isAdmin">
                        <router-link :to="{ path: '/Userlist', activeClass: 'active' }">User List</router-link>
                    </li>
                </ul>

                <form class="navbar-form navbar-right" role="form">
                    <div v-if="!isLogin">
                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                        <div class="form-group">
                            <input type="text" placeholder="Username" v-model="name" class="form-control">
                        </div>
                        <span class="glyphicon glyphicon-lock" aria-hidden="true"></span>
                        <div class="form-group">
                            <input type="password" placeholder="Password" v-model="pass" class="form-control">
                        </div>
                        <button class="btn btn-primary" @click="submit">Sign in</button>
                        <button data-toggle="modal" data-target="#Register" class="btn btn-primary" >Register</button>
                    </div>
                    <div v-else>
                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                        <span class="call">{{isAdmin ? "Admin&nbsp;&nbsp;" : ((sex == "M") ? "Sir&nbsp;&nbsp;" : "Madam&nbsp;&nbsp;")}} </span>
                        <span class="username">{{name}}</span>
                        <button class="btn btn-primary" @click="Logout">Logout</button>
                    </div>
                </form>
            </div><!--/.nav-collapse -->
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        mounted(){
            this.$store.dispatch('InitByToken');
        },
        computed:{
            ...mapGetters(['isAdmin','isLogin','sex']),
            name:{
                get(){
                    return this.$store.state.user.username;
                },
                set(val){
                    this.$store.commit('setName',val);
                }
            },
            pass:{
                get(){
                    return this.$store.state.user.password;
                },
                set(val){
                    this.$store.commit('setPass',val);
                }
            }
        },
        methods:{
            ...mapActions(['Login','Logout']),
            submit(){
                this.Login({"username":this.$store.state.user.username,"password":this.$store.state.user.password})
            }
        }
    }
</script>

<style scoped>
    .username{
        margin-right:10px;
    }
    .call{
        color:#3498DB;
    }
</style>