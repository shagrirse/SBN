import { defineStore } from 'pinia';
import type { RouteLocation } from 'vue-router';
import supabase from '@/lib/supabaseClient';

type State = {
    currentUser: any;
    redirectRoute: Partial<RouteLocation> | null;
};

type Getters = {
    isAuthenticated(): boolean;
};

type Actions = {
    loadUser(): void;
    clearUser(): void;
    saveRedirectRoute(route: Partial<RouteLocation>): void;
    loadRedirectRoute(): void;
    clearRedirectRoute(): void;
    getCookie(): string | undefined;
};

export const useAuthStore = defineStore<'auth', State, Getters, Actions>(
    'auth', {
    state() {
        return {
            currentUser: null,
            redirectRoute: null
        };
    },
    getters: {
        isAuthenticated() {
            return !!this.currentUser;
        }
    },
    actions: {
        async loadUser() {
            const cookie = this.getCookie();
            if (cookie) {
                this.currentUser = await supabase.auth.getUser(cookie);
            }
        },
        getCookie() {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; access_token=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift();
            // Add a default return value if the condition is not met
            return undefined;
        },
        clearUser() {
            this.currentUser = null;
        },
        saveRedirectRoute(route: Partial<RouteLocation>) {
            const { name, params, query, hash } = route;

            localStorage.setItem(
                'redirectRoute',
                JSON.stringify({
                    name,
                    params,
                    query,
                    hash
                })
            );
        },
        loadRedirectRoute() {
            const route = JSON.parse(
                localStorage.getItem('redirectRoute') || 'null'
            ) as Partial<RouteLocation> | null;

            this.redirectRoute = route;
        },
        clearRedirectRoute() {
            localStorage.removeItem('redirectRoute');
            this.redirectRoute = null;
            }
        }
    }
);