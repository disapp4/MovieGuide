

import { reactive, InjectionKey, toRefs } from 'vue';
import { User } from "./models/User";

interface UserRole {
    // @ts-ignore
    user: User | null;
}

const userRole: UserRole = reactive({
    user: null,
});

export const userRoleKey: InjectionKey<UserRole> = Symbol('userRole');

export function useUserRole() {
    return toRefs(userRole);
}