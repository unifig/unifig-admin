import Cookies from 'js-cookie'

const TokenKey = 'loginToken';
const UserName = 'loginName';
const DeptId = 'deptId';
const DeptArr = 'deptArr';
const DeptArrOther = 'deptArrOther';

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setName(name) {
  return Cookies.set(UserName, name)
}
export function getName() {
  return Cookies.get(UserName)
}



export function removeDeptId() {
  return Cookies.remove(DeptId);
}
export function setDeptId(value) {
  return Cookies.set(DeptId, value);
}
export function getDeptId() {
  return Cookies.get(DeptId);
}

export function removeDeptArr() {
  return Cookies.remove(DeptArr);
}
export function setDeptArr(value) {
  return Cookies.set(DeptArr, value);
}
export function getDeptArr() {
  return Cookies.get(DeptArr);
}

export function removeDeptArrOther() {
  return Cookies.remove(DeptArrOther);
}
export function setDeptArrOther(value) {
  return Cookies.set(DeptArrOther, value);
}
export function getDeptArrOther() {
  return Cookies.get(DeptArrOther);
}
