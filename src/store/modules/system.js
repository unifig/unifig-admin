import request from '@/utils/request'

const system = {
  state: {
    roleArr: [],
  },
  getters: {
    roleObj: state => {
      let mapObj = {};
      state.roleArr.forEach((item) => {
        mapObj[item.id] = item.name;
      })
      return mapObj;
    }
  },
  mutations: {
    GetRoleArr: (state, payload) => {
      state.roleArr = payload;
    }
  },
  actions: {
    GetRoleArr: ({
      commit
    }) => {
      return new Promise((resolve) => {
        request({
          url: 'ro/sys/role/list',
          mthods: 'get',
          params: {
            page: 1,
            limit: 1000,
            pageNum: 1
          }
        }).then(res => {
          let resData = res.data.map(item => {
            return {
              id: item.roleId,
              name: item.roleName
            }
          })
          resolve(resData);
          commit('GetRoleArr', resData)
        })
      })
    }
  }
}
export default system
