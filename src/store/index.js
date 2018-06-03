import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import book from './modules/book'
import record from './modules/record'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        user,book,record
    },
    strict: debug
})