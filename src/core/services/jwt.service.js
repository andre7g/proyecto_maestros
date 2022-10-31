const ID_TOKEN_KEY = "id_token";

export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = token => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};
export const destroyRoles = () => {
  window.localStorage.removeItem("roles");
};

export const saveUserId = userId  => {
  window.localStorage.setItem('uId', userId);
};
export const getUserId = () => {
  return window.localStorage.getItem('uId');
};

export const saveUser = user  => {
  window.localStorage.setItem('user', user);
};
export const getUser = () => {
  return window.localStorage.getItem('user');
};

export const saveRolId = rolId  => {
  window.localStorage.setItem('rolId', rolId);
};

export const saveRoles = roles  => {
  let rolesArray = roles.map(a => a.rol_Id);
  window.localStorage.setItem('roles', rolesArray);
};

export const getRoles = ()  => {
  return window.localStorage.getItem('roles');
};

export const getRolId = () => {
  return window.localStorage.getItem('rolId');
};

export default { getToken, saveToken, destroyToken, saveUserId, getUserId, saveRolId, getRolId, saveRoles, getRoles,saveUser,getUser,destroyRoles };
