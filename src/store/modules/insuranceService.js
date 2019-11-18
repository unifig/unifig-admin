import {
  customerDataorganization
} from '@/api/insuranceService'
const insuranceService = {
  state: {
    allDept: [],
  },

  mutations: {
    GetAllDeptme: (state, data) => {
      state.allDept = data;
    }
  },
  actions: {
    // 获取全部机构
    GetAllDeptme({
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
        customerDataorganization({resultType:1})
          .then(res => {
            let resData = deepMap(res.data.options);
            commit('GetAllDeptme', resData)
            resolve(resData)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }

}
export default insuranceService
