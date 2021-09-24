/*
export function someMutation (state) {
}
*/
export const LOGIN_OK = (state, user) => {
    state.User.userName = user.data.username
    state.User.email = user.data.email
    state.loggedIn = true
}