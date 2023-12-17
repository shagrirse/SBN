import { defineStore } from 'pinia';
import { usePostsStore } from './posts';
import type { RouteLocation } from 'vue-router';
import supabase from '@/lib/supabaseClient';

type State = {
    currentUser: any;
    redirectRoute: Partial<RouteLocation> | null;
    userDetails: any;
};

type Getters = {
    isAuthenticated(): boolean;
    getUser(): any;
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
            redirectRoute: null,
            userDetails: null
        };
    },
    getters: {
        isAuthenticated() {
            return !!this.currentUser;
        },
        async getUser() {
            return this.userDetails;
        }
    },
    actions: {
        async loadUser() {
            const cookie = this.getCookie();
            if (cookie) {
                this.currentUser = await supabase.auth.getUser(cookie);
            }
            if (this.currentUser) {
                fetch(`${import.meta.env.VITE_FASTIFY}/api/users/me`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Access-Control-Allow-Credentials': 'true',
                    }
                }).then(response => response.json())
                    .then(user => {
                        this.userDetails = user.data[0];
                    });
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
            this.$reset();
            // Delete cookie
            document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            usePostsStore().$reset();
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