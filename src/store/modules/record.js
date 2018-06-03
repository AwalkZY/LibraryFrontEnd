import user from "./user";

const state = {
    auditRecord:[]
};

const getters = {
    auditRecord: state => state.auditRecord
};

const actions = {
    getAllRecords:function({commit}){
        commit("clear");
        let token = localStorage.getItem("token");
        if (token === null || token === undefined) return;
        $.ajax({
            type: "get",
            url: "http://120.78.131.195:8081/awalk_Library_backEnd/LibraryServer/record/getMyRecord",
            data: {
                "token":localStorage.getItem("token")
            },
            success: function (data) {
                let status = JSON.parse(data)['status'];
                if (status === "failure")
                {
                    swal("No information found", "This user has never lent a book.", "info");
                }
                else {
                    commit("updateRecords",JSON.parse(data)['data']);
                }
            }
        });
    }
};

const mutations = {
    updateRecords(state,Data){
        state.auditRecord = Data.sort((a,b) => (a.giveback > b.giveback || (a.giveback === b.giveback && a.returnTime < b.returnTime)));
    },
    clear(state){
        state.auditRecord = [];
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
