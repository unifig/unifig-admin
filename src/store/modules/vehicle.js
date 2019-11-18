import {
  getDeptArr
} from '@/api/vehicle'
const vehicle = {
  state: {
    allDept: [],
  },

  mutations: {
    GETALLDEPT: (state, data) => {
      state.allDept = data;
    }
  },
  actions: {
    // 获取全部机构
    GetAllDept({
      commit
    }) {
      function deepMap(data) {
        for (let i = 0, j = data.length; i < j; i++) {
          data[i].label = data[i].name;
          data[i].value = data[i].deptId;
          if (data[i].children) {
            deepMap(data[i].children)
          }
        }
        return data
      }
      return new Promise((resolve, reject) => {
        getDeptArr()
          .then(res => {
            let resData = deepMap(res.data.options);
            commit('GETALLDEPT', resData)
            resolve(resData)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }

}
export default vehicle
