<template>
    <div>
        <div class="modal fade" id="EditBooks" tabindex="-1" role="dialog" aria-labelledby="EditBooks">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="EditBooksLabel">EditBook</h4>
                    </div>
                    <div class="modal-body" style="overflow:auto">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="inputAuthor" class="col-md-2 control-label">Author</label>
                                <div class="col-md-10">
                                    <input type="text" class="form-control" id="inputAuthor" v-model="editAuthor" placeholder="Author">
                                </div>
                                <div class="col-md-10 col-md-offset-2">
                                    <small>* 1-16 bits, only contain dot, underline, letters and digits.</small>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputTitle" class="col-md-2 control-label">Title</label>
                                <div class="col-md-10">
                                    <input type="text" class="form-control" id="inputTitle" v-model="editTitle" placeholder="Title">
                                </div>
                                <div class="col-md-10 col-md-offset-2">
                                    <small>* 1-16 bits, only contain dot, underline, letters and digits.</small>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputNumber" class="col-md-2 control-label">Number</label>
                                <div class="col-md-10">
                                    <input type="text" class="form-control" id="inputNumber" v-model="editNumber" placeholder="Number">
                                </div>
                                <div class="col-md-10 col-md-offset-2">
                                    <small>* 1-6 bits, only contain digits.</small>
                                </div>
                            </div>
                        </form>
                        <div class="col-md-2 col-md-offset-4">
                            <button class="btn btn-sm btn-primary" @click="submitEdit">Submit</button>
                        </div>
                        <div class="col-md-2 col-md-offset-1">
                            <button class="btn btn-sm btn-default" id="closeEditBook" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="AddBooks" tabindex="-1" role="dialog" aria-labelledby="AddBooks">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="AddBooksLabel">AddBook</h4>
                    </div>
                    <div class="modal-body" style="overflow-y:auto">
                        <table class="table table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>Author</th>
                                    <th>Title</th>
                                    <th>Number</th>
                                    <th>State</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="id in numOfItems">
                                    <td>
                                        <input type="text" class="form-control" :id="'inputAuthor'+String(id-1)" v-model="inputAuthor[id-1]" placeholder="Author"/>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" :id="'inputTitle'+String(id-1)" v-model="inputTitle[id-1]" placeholder="Title"/>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" :id="'inputNumber'+String(id-1)" v-model="inputNumber[id-1]" placeholder="Number"/>
                                    </td>
                                    <td>
                                        {{isDealt[id-1] == 2 ? "Done." : (isDealt[id-1] == 1 ? "Error" : "Not yet.")}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="progress">
                            <div class="progress-bar" :style="{width:curDeal*100/numOfItems+'%'}"></div>
                            <div class="progress-bar progress-bar-danger" :style="{width:this.errorArr.length*100/numOfItems+'%'}"></div>
                        </div>
                        <div class="col-md-1 col-md-offset-3">
                            <button :class="['btn btn-sm btn-info addButton',{'disabled':isLoading}]" @click="add()">Add one</button>
                        </div>
                        <div class="col-md-1 col-md-offset-1">
                            <button :class="['btn btn-sm btn-info addButton',{'disabled':isLoading}]" @click="sub()" :style="'disabled'">Sub one</button>
                        </div>
                        <div class="col-md-1 col-md-offset-1">
                            <button class="btn btn-sm btn-primary" @click="check">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tile">
            <h5>BookList</h5>
            <hr/>
            <div class="row">

                <label for="searchTitle" class="col-md-2">Search by title:</label>
                <div class="col-md-3">
                    <input id="searchTitle" class="form-control" type="text" v-model="searchTitle" placeholder="Please input the title here"/>
                </div>
                <label for="searchAuthor" class="col-md-2">Search by author:</label>
                <div class="col-md-3">
                    <input id="searchAuthor" class="form-control" type="text" v-model="searchAuthor" placeholder="Please input the author here"/>
                </div>
                <div class="col-md-2">
                    <button v-if="isAdmin" class="btn btn-sm btn-info" data-toggle="modal" data-target="#AddBooks"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>Add New Books</button>
                </div>
            </div>
            <hr/>
            <table class="table table-hover table-striped">
                <thead>
                <tr>
                    <th>id</th>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Number</th>
                    <th>Operations</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="book in searchedBooks">
                    <td>{{book.id}}</td>
                    <td>{{book.author}}</td>
                    <td>{{book.title}}</td>
                    <td>{{book.number}}</td>
                    <td>
                        <button v-if="isAdmin" @click="readyToEmit(book.id,book.author,book.title,book.number)" class="btn btn-primary btn-sm">Edit</button>
                        <button @click="lendBook(book.id)" class="btn btn-info btn-sm">Lend</button>
                        <button v-if="isAdmin" @click="deleteBook(book.id)" class="btn btn-danger btn-sm">Delete</button>
                        <button id="emitModal" style="display: none" data-toggle="modal" data-target="#EditBooks" class="btn btn-primary"></button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions ,mapMutations} from 'vuex'
    export default {
        data(){
            return{
                numOfItems:1,
                curDeal:0,
                curBookID:0,
                searchTitle:"",
                searchAuthor:"",
                inputAuthor:[""],
                inputTitle:[""],
                inputNumber:[""],
                isDealt:[],
                errorArr:[],
                editAuthor:"",
                editTitle:"",
                editNumber:""
            }
        },
        mounted(){
            if (localStorage.getItem("token") === undefined || localStorage.getItem("token") === null)
                router.push('/');
            this.$store.dispatch('getAllBooks');
        },
        computed:{
            ...mapGetters(['isAdmin','books','isLoading']),
            searchedBooks(){
                return this.books.filter(x => (x.title.indexOf(this.searchTitle) !== -1 && x.author.indexOf(this.searchAuthor) !== -1));
            }
        },
        methods:{
            ...mapActions(['lendBook','editBook','delBook']),
            ...mapMutations(['load','unload']),
            deleteBook(bookID){
                this.delBook(bookID);
            },
            readyToEmit(bookID,bookAuthor,bookTitle,bookNumber){
                this.curBookID = bookID;
                this.editAuthor = bookAuthor;
                this.editTitle = bookTitle;
                this.editNumber = bookNumber;
                $("#emitModal").trigger("click");
            },
            submitEdit(){
                let testStr = /^[0-9]{1,6}$/;
                if (!testStr.test(this.editNumber)){
                    swal("Error!","The format of number is invalid!", "error");
                    return;
                }
                testStr = /^[a-zA-Z0-9_. ']{1,100}$/;
                if (!testStr.test(this.editAuthor)){
                    swal("Error!","The format of author is invalid!", "error");
                    return;
                }
                if (!testStr.test(this.editAuthor)){
                    swal("Error!","The format of title is invalid!", "error");
                    return;
                }
                $("#closeEditBook").trigger("click");
                this.editBook({"id":this.curBookID,"author":this.editAuthor,"title":this.editTitle,"number":this.editNumber});

            },
            check(){
                for (let i = 0; i < this.numOfItems; i++)
                {
                    let testStr = /^[0-9]{1,6}$/;
                    if (!testStr.test(this.inputNumber[i])){
                        swal("Error!","The format of number is invalid!", "error");
                        return;
                    }
                    testStr = /^[a-zA-Z0-9_. ']{1,100}$/;
                    if (!testStr.test(this.inputAuthor[i])){
                        swal("Error!","The format of author is invalid!", "error");
                        return;
                    }
                    if (!testStr.test(this.inputTitle[i])){
                        swal("Error!","The format of title is invalid!", "error");
                        return;
                    }
                }
                this.load();
                this.errorArr = [];
                for (let i = 0; i < this.numOfItems; i++)
                {
                    if (this.isDealt[i] === 2) continue;
                    let that = this;
                    $.ajax({
                        type: "post",
                        url: "http://120.78.131.195:8081/awalk_Library_backEnd/LibraryServer/book/addBook",
                        data: {
                            "token":localStorage.getItem("token"),
                            "number": that.inputNumber[i],
                            "author": that.inputAuthor[i],
                            "title": that.inputTitle[i]
                        },
                        async:false,
                        success: function (data) {
                            let status = JSON.parse(data)['status'];
                            if (status === "failure") {
                                that.errorArr.push(i+1);
                                that.$set(that.isDealt,i,1);
                            }
                            else {
                                that.$set(that.isDealt,i,2);
                                that.curDeal++;
                            }
                            if (that.curDeal+that.errorArr.length === that.numOfItems)
                            {
                                if (that.errorArr.length > 0)
                                    swal("Error!","Error found at No."+that.errorArr.sort().join(","),"error");
                                else swal("Success!","Successfully add these books!");
                                that.unload();
                            }
                        }
                    })
                }
                this.unload();
            },
            add(){
                if (this.isLoading) return;
                this.numOfItems++;
                this.isDealt[this.numOfItems-1] = false;
                this.inputAuthor[this.numOfItems-1] = "";
                this.inputTitle[this.numOfItems-1] = "";
                this.inputNumber[this.numOfItems-1] = "";
            },
            sub(){
                if (this.isLoading) return;
                if (this.isDealt[this.numOfItems-1]) this.curDeal--;
                this.$set(this.isDealt,this.numOfItems-1,false);
                this.$set(this.inputAuthor,this.numOfItems-1,"");
                this.$set(this.inputTitle,this.numOfItems-1,"");
                this.$set(this.inputNumber,this.numOfItems-1,"");
                if (this.numOfItems-1 > 0) this.numOfItems--;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    td,tfoot{
        text-align: center;
    }
</style>
