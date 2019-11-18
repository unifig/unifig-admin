<template>
  <div class="app-container">
    <el-card class="content-section">
      <div class="title">
        <i class="icon"></i>系统管理-权限
      </div>
    </el-card>
    <el-card class="operate-container">
      <i class="el-icon-tickets"></i>
      <span>权限列表</span>
      <el-button type="primary" class="right" size="mini" @click="add">新增</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="dataList" :data="dataList" border @select-change="changeParent" row-key="menuId">
        <!--<el-table-column label="编号" width="60" align="center" type="index"></el-table-column>-->
        <el-table-column label="名称" width="180" align="center" prop="name"></el-table-column>
        <el-table-column label="上级菜单" align="center" prop="parentName"></el-table-column>
        <el-table-column label="类型" width="180" align="center">
          <template slot-scope="scope">
            {{scope.row.type == 0 ? '目录' : scope.row.type == 1 ? '菜单' : '按钮'}}
          </template>
        </el-table-column>
        <el-table-column label="排序" width="180" align="center" prop="orderNum"></el-table-column>
        <el-table-column label="菜单url" width="180" align="center" prop="url"></el-table-column>
        <el-table-column label="授权标识" width="180" align="center" prop="perms"></el-table-column>
        <el-table-column label="状态" width="180" align="center">
          <template slot-scope="scope">
            {{scope.row.status == 0 ? '有效' : '无效'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="addnext(scope.row.menuId, scope.row.type, scope.row)"
                       v-if="scope.row.type != 2">新增
            </el-button>
            <el-button size="mini" type="text" @click="update(scope.row.menuId, scope.row.type)">修改</el-button>
            <el-button size="mini" type="text" class="color-danger" @click="del(scope.row.menuId)">
              <span class="color-danger">删除</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--<div class="pagination-container">-->
    <!--<el-pagination-->
    <!--background-->
    <!--@size-change="handleSizeChange"-->
    <!--@current-change="handleCurrentChange"-->
    <!--layout="total, sizes,prev, pager, next,jumper"-->
    <!--:current-page.sync="listQuery.page"-->
    <!--:page-size="listQuery.limit"-->
    <!--:page-sizes="[5,10,15]"-->
    <!--:total="total"-->
    <!--&gt;</el-pagination>-->
    <!--</div>-->
  </div>
</template>
<script>
  import {formatDate} from "@/utils/date";
  import {getList} from "@/api/meanList";
  import {deleteAuthority} from "@/api/system";
  
  const defaultListQuery = {
    page: 1,
    limit: 5,
    userId: 1
  };
  export default {
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        parentIds: [],
        childrenIds: [],
        dataList: [],
        total: null,
        listLoading: false,
      }
    },
    created() {
      this.getList();
    },
    
    methods: {
      // 1.列表
      getList() {
        getList({
          date: new Date()
        }).then((res) => {
          if (res.success) {
            this.dataList = this.toTree(res.data, 0)
            this.total = this.dataList.length
          }
        }).catch((res) => {
        })
      },
      //2.新增权限
      add() {
        this.$router.push(
          {
            name: "authority-detail",
            query: {
              type: 'first'
            }
          });
      },
      // 3. 修改权限
      update(id, type) {
        this.$router.push(
          {
            name: "authority-detail",
            query: {
              id: id,
              type: type == 0 ? 'first' : type == 1 ? 'second' : 'third'
            }
          }
        );
      },
      // 4.删除权限
      del(id) {
        this.$confirm("此操作将删除该权限，是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(res => {
          deleteAuthority({menuIds:id}).then(res=>{
            if (res.code == 0) {
              this.$message.success('删除成功');
              this.getList()
            } else {
              this.$message.error('删除出错');
            }
          })
        });
      },
      // 新增次级权限
      addnext(id, type, data) {
        // let
        if (type == 0) {
          this.$router.push(
            {
              name: "authority-detail",
              query: {
                type: 'second',
                parentId: data.menuId,
                parentName: data.name
              }
            });
        } else if (type == 1) {
          this.$router.push(
            {
              name: "authority-detail",
              query: {
                type: 'third',
                parentId: data.menuId,
                parentName: data.name
              }
            });
        }
      },
      changeChildren(val) {
        console.log(val);
      },
      changeParent(val) {
        // console.log(val);
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      toTree(data, parentId) {
        var tree = [];
        var temp;
        for (var i = 0; i < data.length; i++) {
          if (data[i].parentId == parentId) {
            let obj = data[i];
            // let obj = {
            //   id: data[i].menuId,
            //   label: data[i].name
            // };
            temp = this.toTree(data, data[i].menuId);
            if (temp.length > 0) {
              obj.children = temp;
            }
            tree.push(obj);
          }
        }
        return tree;
      }
    }
  };
</script>
<style scoped>
  .app-container >>> .el-card__body{
    padding-top: 0;
  }
</style>





