import {
  login,
  logout,
  getInfo
} from '@/api/login'
import {
  getToken,
  setToken,
  setName,
  getName,
  removeToken,
  removeDeptId,
  removeDeptArr,
  removeDeptArrOther,
} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: getName(),
    admin_id: null,
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ID: (state, id) => {
      state.admin_id = id
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim();
      const passwordType = userInfo.passwordType ? userInfo.passwordType : null;
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, passwordType).then(response => {
          const data = response.data
          const tokenStr = data.tokenHead + data.token
          const name = response.data.userName;
          setToken(tokenStr)
          setName(name)
          commit('SET_TOKEN', tokenStr)
          commit('SET_NAME', name)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          // console.log(data, data.username, 'name2')
          // commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.icon)
          commit('SET_ID', data.icon)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeDeptId();
          removeDeptArr();
          removeDeptArrOther();
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
