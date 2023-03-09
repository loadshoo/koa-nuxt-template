<template>
    <div>
        IndexPage
    </div>
</template>

<script>
import request from "@/utils/request"

export default {
    name: 'IndexPage',
    mounted() {
        const params = {
            userName: 'userName',
            password: 'password'
        }
        request.post('/login', params).then(res => {
            // console.log(res);
        })
        setTimeout(() => {
            request.get('/test').then(res => {
                // console.log(res);
            })
        }, 5000)
        
    },
    methods: {
        
    }
}
</script>
