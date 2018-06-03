<template>
    <div class="tile">
        <h5>RecordList</h5>
        <hr/>
        <table class="table table-hover table-striped">
            <thead>
            <tr>
                <th>id</th>
                <th>Author</th>
                <th>Title</th>
                <th>lendTime</th>
                <th>returnTime</th>
                <th>isReturned</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="record in auditRecord">
                <td>{{record.id}}</td>
                <td>{{record.book_author}}</td>
                <td>{{record.book_title}}</td>
                <td>{{record.lendTime}}</td>
                <td>{{record.returnTime}}</td>
                <td>{{record.giveback == 0 ? "No" : "Yes"}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        mounted(){
            if (localStorage.getItem("token") === undefined || localStorage.getItem("token") === null)
                router.push('/');
            this.$store.dispatch("getAllRecords");
        },
        computed:{
            ...mapGetters(["auditRecord"])
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
