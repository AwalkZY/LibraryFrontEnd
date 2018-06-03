<template>
    <div>
        <div class="modal fade" id="Audit" tabindex="-1" role="dialog" aria-labelledby="auditLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="auditLabel">Record For {{curUser}}</h4>
                    </div>
                    <div class="modal-body">
                        <table class="table table-hover table-striped">
                            <thead>
                            <tr>
                                <th>Author</th>
                                <th>Title</th>
                                <th>lendTime</th>
                                <th>returnTime</th>
                                <th>isReturn</th>
                                <th>Operation</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(record,index) in auditRecord">
                                <td>{{record.book_author}}</td>
                                <td>{{record.book_title}}</td>
                                <td>{{record.lendTime}}</td>
                                <td>{{record.returnTime}}</td>
                                <td>{{record.giveback == 0 ? "No" : "Yes"}}</td>
                                <td>
                                    <button v-if="record.giveback == 0" @click="returnBook(index,curUserID,record.book_id)" class="btn btn-info btn-sm">Return</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <button type="button" id="closeRegister" style="display: none" class="btn btn-default" data-dismiss="modal"></button>
                </div>
            </div>
        </div>
        <div class="tile">
            <h5>Userlist</h5>
            <hr/>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Sex</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users">
                        <td>{{user.id}}</td>
                        <td>{{user.name}}</td>
                        <td>{{user.sex}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.admin}}</td>
                        <td>
                            <button @click="auditUser(user.name,user.id)" class="btn btn-info btn-sm">Audit Record</button>
                            <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm">Delete</button>
                            <button id="emitModal" style="display: none" data-toggle="modal" data-target="#Audit" class="btn btn-primary"></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        data(){
            return{
                curUser:"",
                auditRecord:{},
                curUserID:0
            }
        },
        mounted(){
            if (localStorage.getItem("token") === undefined || localStorage.getItem("token") === null)
                router.push('/');
        },
        created(){
            this.$store.dispatch('getAllUsers');
        },
        computed:{
            users:{
                get(){
                    return this.$store.state.user.userList;
                }
            }
        },
        methods:{
            deleteUser(userID){
                this.$store.dispatch("delUser",{id:userID});
            },
            auditUser(username,userID){
                this.curUser = username;
                let that = this;
                $.ajax({
                    type: "get",
                    url: "http://120.78.131.195:8081/awalk_Library_backEnd/LibraryServer/record/getRecord",
                    data: {
                        "id":userID,
                        "token":localStorage.getItem("token")
                    },
                    success: function (data) {
                        let status = JSON.parse(data)['status'];
                        if (status === "failure")
                        {
                            swal("No information found", "This user has never lent a book.", "info");
                        }
                        else {
                            that.auditRecord = JSON.parse(data)['data'].sort((a,b) => (a.giveback >= b.giveback));
                            that.curUserID = userID;
                            $("#emitModal").trigger("click");
                        }
                    }
                });
            },
            returnBook(index,userID,bookID){
                let that = this;
                $.ajax({
                    type: "get",
                    url: "http://120.78.131.195:8081/awalk_Library_backEnd/LibraryServer/book/returnBook",
                    data: {
                        "book_id":bookID,
                        "token":localStorage.getItem("token"),
                        "user_id":userID
                    },
                    success: function (data) {
                        let status = JSON.parse(data)['status'];
                        if (status === "failure")
                        {
                            console.log(data);
                            swal("No information found", "This user has never lent such a book.", "info");
                        }
                        else {
                            swal("Success!", "This book is successfully returned.", "success");
                            that.auditRecord[index].giveback = 1;
                        }
                    }
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .modal-dialog{
        width:80%
    }
    td{
        text-align: center;
    }
</style>
