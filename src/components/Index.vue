<template>
  <div class="tile container">
          <h5>Helper</h5>
          <hr/>
          <h6>For User</h6>
          <ol>
            <li>
               &nbsp;  The login module is located at the top right-hand corner.  Before any operation on this system, please login first.  Otherwise, request for any page (except for this page)  will be <em>DENIED</em>.
            </li>
            <li>
              &nbsp; The navigation bar is located on the top of this page, including buttons for different functions.
            </li>
            <li>
              &nbsp; Click <em>"Book List"</em> button, users can get the list of all books stored in this library.
              In this page, the request for <em>lending books</em> will be handled.
            </li>
            <li>
              &nbsp; Click <em>"My Record"</em> button, users can get his/her borrowing records.
            </li>
          </ol>
          <h6>For Administrator</h6>
          <ol>
            <li>
              &nbsp; Click <em>"User List"</em>button, admins can get the list of all users.
              In this page, the request for <em>deleting users and auditing records</em> will be handled.
                Besides, the request for <em>returning books</em> will be handled.
            </li>
          </ol>
    <hr/>
    <div class="row">
      <div class="col-md-2 col-md-offset-2">
        <img src="static/img/book.png" style="height: 80px; margin-top: 10%"/>
      </div>
      <div class="col-md-6">
        <p> If any questions, please contact Developer Awalk by emailing <em>awalk@zju.edu.cn</em> </p>
        <hr/>
        <h6> Enjoy Reading! </h6>
      </div>
    </div>

  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li{
    text-align: left;
    font-size: 16px;
  }
  p{
    font-size: 16px !important;
  }
</style>
