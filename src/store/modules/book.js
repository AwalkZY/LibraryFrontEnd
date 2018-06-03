const state = {
    bookList:[],
    isLoading:false
};

const getters = {
    isLoading: state => state.isLoading,
    books: state => state.bookList
};

const actions = {
    editBook:function({commit},input){
        $.ajax({
            type: "post",
            url: "http://120.78.131.195:8081/awalk_Library_backEnd/LibraryServer/book/editBook",
            data: {
                "token": localStorage.getItem("token"),
                "id":input.id,
                "author":input.author,
                "title":input.title,
                "number":input.number
            },
            success: function (data) {
                let status = JSON.parse(data)['status'];
                if (status === "failure")
                {
                    swal("Error!", JSON.parse(data)['info'], "error");
                }
                else {
                    swal("Success!","Successfully edit this book!","success");
                    commit("editBook",input);
                }
            }
        })
    },
    getAllBooks:function({commit}){
        let token = localStorage.getItem("token");
        if (token === null || token === undefined) return;
        $.ajax({
            type: "get",
            url: "http://120.78.131.195:8081/awalk_Library_backEnd/LibraryServer/book/getBook",
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
                    commit("updateBookList",JSON.parse(data)['data']);
                }
            }
        })
    },
    delBook:function({commit},bookID){
        let token = localStorage.getItem("token");
        if (token === null || token === undefined) return;
        $.ajax({
            type: "get",
            url: "http://120.78.131.195:8081/awalk_Library_backEnd/LibraryServer/book/delBook",
            data: {
                "token": token,
                "id":bookID
            },
            success: function (data) {
                let status = JSON.parse(data)['status'];
                if (status === "failure")
                {
                    swal("Error!", JSON.parse(data)['info'], "error");
                }
                else {
                    swal("Success!", "You successfully delete this book!", "success");
                    commit("delBook",bookID);
                }
            }
        })
    },
    lendBook:function({commit},bookID){
        let token = localStorage.getItem("token");
        if (token === null || token === undefined) return;
        $.ajax({
            type: "get",
            url: "http://120.78.131.195:8081/awalk_Library_backEnd/LibraryServer/book/lendBook",
            data: {
                "token": token,
                "id":bookID
            },
            success: function (data) {
                let status = JSON.parse(data)['status'];
                if (status === "failure")
                {
                    swal("Error!", JSON.parse(data)['info'], "error");
                }
                else {
                    swal("Success!", "You successfully lend this book!", "success");
                    commit("lendBook",bookID);
                }
            }
        })
    }
};

const mutations = {
    updateBookList(state,Data){
        state.bookList = Data.sort((a,b) => a.id > b.id);
    },
    lendBook(state,bookID){
        state.bookList = state.bookList.map(x => {
            if (x.id === bookID) x.number--;
            return x;
        })
    },
    load(state){
        state.isLoading = true;
    },
    unload(state){
        state.isLoading = false;
    },
    editBook(state,input){
        state.bookList = state.bookList.map(x => {
            if (x.id === input.id) x = input;
            return x;
        })
    },
    delBook(state,input){
        state.bookList = state.bookList.filter(x => String(x.id) !== String(input));
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
