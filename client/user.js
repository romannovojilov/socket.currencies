export function getUser(getUserInfo) {
    if (!sessionStorage.getItem('user')) {
        let user = { id: Date.now() };
        user = {
            ...user,
            ...getUserInfo()
        };
        sessionStorage.setItem('user', JSON.stringify(user));
    }
    return sessionStorage.getItem('user');
}