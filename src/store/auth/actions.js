/*
export function someAction (context) {
}
*/
export const login = ({ commit }, form) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  commit('LOGIN_OK', form);
};
