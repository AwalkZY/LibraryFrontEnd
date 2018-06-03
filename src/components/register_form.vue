<template>
    <form class="form-horizontal" role="form">
        <div class="form-group">
            <label for="inputName" class="col-md-2 control-label">Name</label>
            <div class="col-md-10">
                <input type="text" class="form-control" id="inputName" v-model="inputName" placeholder="Username">
            </div>
            <div class="col-md-10 col-md-offset-2">
                <small>* 6-16 bits, only contain dot, underline, letters and digits.</small>
            </div>
        </div>
        <div class="form-group">
            <label for="inputPassword" class="col-md-2 control-label">Password</label>
            <div class="col-md-10">
                <input type="password" class="form-control" id="inputPassword" v-model="inputPass" placeholder="Password">
            </div>
            <div class="col-md-10 col-md-offset-2">
                <small>* 6-16 bits, only contain dot, underline, letters and digits.</small>
            </div>
        </div>
        <div class="form-group">
            <label for="confirmedPassword" class="col-md-2 control-label">Confirm</label>
            <div class="col-md-10">
                <input type="password" class="form-control" id="confirmedPassword" v-model="confirmed" placeholder="Please repeat your Password">
            </div>
            <div class="col-md-10 col-md-offset-2">
                <small>* Should be the same as password.</small>
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmail" class="col-md-2 control-label">Email</label>
            <div class="col-md-10">
                <input type="email" class="form-control" id="inputEmail" v-model="inputEmail" placeholder="Email">
            </div>
            <div class="col-md-10 col-md-offset-2">
                <small>* The email should be valid.</small>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-md-4 col-md-offset-2">
                <label class="radio" for="radio4a">
                    <input type="radio" name="optionsRadios" data-toggle="radio" value="M" id="radio4a" v-model="inputSex" required="" checked="" class="custom-radio"><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>
                    I'm a gentleman.
                </label>
            </div>
            <div class="col-md-4">
                <label class="radio" for="radio4b">
                    <input type="radio" name="optionsRadios" data-toggle="radio" value="F" id="radio4b" v-model="inputSex" required="" checked="" class="custom-radio"><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>
                    I'm a lady.
                </label>
            </div>
        </div>
        <div class="form-group">
            <div class="col-md-offset-2 col-md-10">
                <label class="checkbox" for="checkbox3">
                    <input type="checkbox" data-toggle="checkbox" v-model="checked" value="1" id="checkbox3" required="" class="custom-checkbox"><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>
                    I have checked these all information.
                </label>
            </div>
        </div>
        <div class="form-group">
            <div class="col-md-offset-3 col-md-2">
                <button id="registerButton" @click.prevent="tryToSubmit()" class="btn btn-primary">Submit</button>
            </div>
            <div class="col-md-offset-1 col-md-2">
                <button type="button" id="closeRegister" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </form>
</template>
<script>
    export default{
        data(){
            return{
                inputName:"",
                inputPass:"",
                inputEmail:"",
                confirmed:"",
                inputSex:"",
                checked:""
            }
        },
        methods:{
            clear(){
                this.inputName = "";
                this.inputPass = "";
                this.inputEmail = "";
                this.confirmed = "";
                this.inputSex = "";
                this.checked = "";
            },
            tryToSubmit(){
                let testStr = /^[a-zA-Z0-9_.]{6,16}$/;
                //console.log(this.inputEmail);
                if (!testStr.test(this.inputName)){
                    swal("Error!","The format of name is invalid!", "error");
                }
                if (!testStr.test(this.inputPass)){
                    swal("Error!","The format of password is invalid!", "error");
                }
                if (this.inputPass !== this.confirmed){
                    swal("Error!","The confirmed password doesn't agree with the former one!", "error");
                }
                if (this.inputSex === ""){
                    swal("Error!","Please input your gender information!", "error");
                }
                testStr = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if (!testStr.test(this.inputEmail)){
                    swal("Error!","The format of email is invalid!", "error");
                }
                if (this.checked === ""){
                    swal("Error!","Please check your information and click the checkbox!", "error");
                }
                let that = this;
                $.ajax({
                    type: "post",
                    url: "http://120.78.131.195:8081/awalk_Library_backEnd/LibraryServer/user/register",
                    data: {
                        "name": that.inputName,
                        "pass": that.inputPass,
                        "sex": that.inputSex,
                        "email": that.inputEmail
                    },
                    success: function (data) {
                        let status = JSON.parse(data)['status'];
                        if (status === "failure")
                        {
                            swal("Error!", JSON.parse(data)['info'], "error");
                        }
                        else {
                            swal("Correct!","Successfully register! Please back to the index page and login!", "success");
                            that.clear();
                            $("#closeRegister").trigger("click");
                        }
                    }
                });
            }
        }
    }
</script>