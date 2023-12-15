import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export async function authGuard(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): Promise<void> {
    const authStore = useAuthStore();
    
    await authStore.loadUser();
    if (!to.meta.authRequired || authStore.isAuthenticated) {
        return next();
    } else {
        authStore.saveRedirectRoute(to);
        return next({ name: 'signin' });
    }
}