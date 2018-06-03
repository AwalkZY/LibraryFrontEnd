<template>
  <div>
      <div class="modal fade" id="Register" tabindex="-1" role="dialog" aria-labelledby="registerLabel">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 class="modal-title" id="registerLabel">Register</h4>
                  </div>
                  <div class="modal-body">
                        <register_form></register_form>
                  </div>
              </div>
          </div>
      </div>

    <nav_bar></nav_bar>

      <div class="container">
              <div class="col-sm-12 col-md-12">
                  <transition mode="out-in" name="fade">
                      <router-view></router-view>
                  </transition>
              </div>
      </div>
  </div>
</template>

<script>
    import register_form from './components/register_form'
    import nav_bar from './components/nav_bar'
    export default {
        components: {register_form,nav_bar}
    }
</script>

<style scope>
    small{
        font-size:12px;
    }
</style>
