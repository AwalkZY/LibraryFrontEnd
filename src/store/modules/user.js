import router from '../../router'

const state = {
    userList:[],
    isAdmin:false,
    isLogin:false,
    email:"",
    sex:"",
    token:"",
    userID:0,
    username:"",
    password:""
};

const actions = {
    delUser: function({commit},input){
        let token = localStorage.getItem("token");
        if (token === null || token === undefined) return;
        $.ajax({
            type: "get",
            url: "http://120.78.131.195:8081/awalk_Library_backEnd/LibraryServer/user/delUser",
            data: {
                "id": input.id,
                "token": token
            },
            success: function (data) {
                let status = JSON.parse(data)['status'];
                if (status === "failure")
                {
                    swal("Error!", JSON.parse(data)['info'], "error");
                }
                else {
                    if (String(JSON.parse(data)['data']) === "0"){
                        swal("Error!", "Sorry, you can't delete Root Admin!", "error");
                        return;
                    }
                    swal("Correct!","Successfully delete!", "success");
                    commit("delFromList",input.id);
                }
            }
        })
    },
    Login: function ({commit},input){
        $.ajax({
            type: "post",
            url: "http://120.78.131.195:8081/awalk_Library_backEnd/LibraryServer/user/login",
            data: {
                "name": input.username,
                "pass": input.password
            },
            success: function (data) {
                let status = JSON.parse(data)['status'];
                if (status === "failure")
                {
                    swal("Error!", JSON.parse(data)['info'], "error");
                }
                else {
                    swal("Correct!","Successfully login!", "success");
                    let rData = JSON.parse(data)['data'][0];
                    commit("InitUser",rData);
                }
            }
        })
    },
    getAllUsers: function({commit}){
        let token = localStorage.getItem("token");
        if (token === null || token === undefined) return;
        $.ajax({
            type: "get",
            url: "http://120.78.131.195:8081/awalk_Library_backEnd/LibraryServer/user/getUser",
            data: {
                "token": token
            },
            success: function (data) {
                let status = JSON.parse(data)['status'];
                if (status === "failure")
                {
                    swal("Error!", JSON.parse(data)['info'], "error");
                }
                else {
                    let rData = JSON.parse(data)['data'];
                    commit("LoadAllUsers",rData);
                }
            }
        })
    },
    Logout: function({commit}){
        router.push('/');
        commit("Cancel");
        swal("Correct!","Successfully log out!", "success");
    },
    InitByToken:function({commit}){
        let token = localStorage.getItem("token");
        if (token === null) return;
        $.ajax({
            type: "get",
            url: "http://120.78.131.195:8081/awalk_Library_backEnd/LibraryServer/user/getUserByToken",
            data: {
                "token": token
            },
            success: function (data) {
                let status = JSON.parse(data)['status'];
                if (status === "failure")
                {
                    swal("Error!", JSON.parse(data)['info'], "error");
                }
                else {
                    swal("Correct!","Welcome back!", "success");
                    let rData = JSON.parse(data)['data'][0];
                    commit("InitUser",rData);
                }
            }
        })
    }

};

const mutations = {
    LoadAllUsers: function(state,Data){
        state.userList = Data.sort((a,b) => (a.id > b.id));
    },
    InitUser: function(state,Data){
        state.isLogin = true;
        state.userID = Data["id"];
        state.sex = Data["sex"];
        state.token = Data["token"];
        state.email = Data["email"];
        state.username = Data["name"];
        state.isAdmin = Data["admin"] !== 0;
        localStorage.setItem("token",state.token);
    },
    setName:function(state,val){
        state.username = val;
    },
    setPass:function(state,val){
        state.password = val;
    },
    Cancel:function(state){
        state.isLogin = false;
        state.isAdmin = false;
        state.token = "";
        localStorage.removeItem("token");
    },
    delFromList:function(state,userID){
        state.userList = state.userList.filter(x => x.id !== userID);
    }
};

const getters = {
    getUserToken:state => state.token,
    getUserID:state => state.userID,
    isAdmin:state => state.isAdmin,
    isLogin:state => state.isLogin,
    name:state => state.username,
    pass:state => state.password,
    sex:state => state.sex
};

export default {
    state,
    getters,
    actions,
    mutations
}