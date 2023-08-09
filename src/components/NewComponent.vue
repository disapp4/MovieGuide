


<script lang="ts">
import { defineComponent, inject } from "vue";
import { userRoleKey, useUserRole } from "../globalRole";
import { User } from "../models/User.js";

type Data = {
    user: User | null
}

export default defineComponent({
    data(): Data {
        return {
            user: null
        };
    },
    created() {
        const userRole = inject(userRoleKey);
        this.user = userRole?.user || null;

    }, methods: {

    },
    computed: { user1() {

            return this.user?.roles.includes("ROLE_ADMIN")


        },
        user2() {
            return this.user?.id
        },
        user3() {
            console.log(useUserRole().user.value?.id);

        },
        user4() {

            return this.user?.hasRole("ROLE_ADMIN") ;
        },


    }

});
</script>
<template>
    <div>
        <p> {{ user1 }}</p>
        <p> {{ user2 }}</p>
        <p>{{user3}} </p>
     <p>{{user4()}} </p>
        <p v-if="user ">Пользователь: {{ user.username }}</p>

        <p v-else>Пользователь не авторизован</p>

    </div>
</template>