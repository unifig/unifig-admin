<template>
    <div class="app-container">
        <el-card class="content-section">
            <div class="title">
                <i class="icon"></i>
                <span>数据管理-数据统计</span>
            </div>
        </el-card>
        <!--  -->
        <div class="content-section">
            <div class='small-title'>
                专享页面点击次数统计数据
                <div class="right">
                    <el-date-picker size='mini'
                        v-model="vipTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
           </div>
           <div class="data-image">
                <ve-scatter :data="vipData">
                </ve-scatter>
           </div>
        </div>
        <!--  -->
        <div class="content-section">
            <div class='small-title'>
                banner点击次数统计
                <el-select v-model="bannerId" size="mini">
                    <el-option v-for="(item) in bannerArr" :key="item"
                        :value="item"
                        :label="item">
                    </el-option>
                </el-select>
                <div class="right">
                    <el-date-picker size='mini'
                        v-model="bannerTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
           </div>
           <div class="data-image">
                <ve-scatter :data="bannerData">
                </ve-scatter>
           </div>
        </div>
        <!--  -->
        <div class="content-section">
            <div class='small-title'>
                导航点击次数统计
                <el-select v-model="navId" size="mini">
                    <el-option v-for="(item) in navArr" :key="item"
                        :value="item"
                        :label="item">
                    </el-option>
                </el-select>
                <div class="right">
                    <el-date-picker size='mini'
                        v-model="navTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
           </div>
           <div class="data-image">
                <ve-scatter :data="navData">
                </ve-scatter>
           </div>
        </div>
        <!--  -->
         <div class="content-section">
            <div class='small-title'>
                文章阅读量统计
                <el-select v-model="navId" size="mini">
                    <el-option v-for="(item) in navArr" :key="item"
                        :value="item"
                        :label="item">
                    </el-option>
                </el-select>
           </div>
           <div class="data-image">
                <ve-scatter :data="navData">
                </ve-scatter>
           </div>
        </div>
        <!--  -->
        <div class="content-section">
            <div class='small-title'>
                活动参与人数数统计
                <el-select v-model="navId" size="mini">
                    <el-option v-for="(item) in navArr" :key="item"
                        :value="item"
                        :label="item">
                    </el-option>
                </el-select>
           </div>
           <div class="data-image">
                <ve-scatter :data="navData">
                </ve-scatter>
           </div>
        </div>
        <!--  -->

    </div>
</template>
<script>
export default {
    data(){
        return{
            vipTime:null,
            vipData:{
                columns: ['日期', '专享页点击量'],
                rows: [
                    { '日期': '1/1', '专享页点击量': 100},
                    { '日期': '1/2', '专享页点击量': 20},
                    { '日期': '1/3', '专享页点击量': 303},
                    { '日期': '1/4', '专享页点击量': 40},
                    { '日期': '1/5', '专享页点击量': 500},
                    { '日期': '1/6', '专享页点击量': 600}
                ]
            },
            bannerTime:null,
            bannerArr:[1,2,3],
            bannerId:null,
            bannerData:{
                columns: ['日期', '专享页点击量'],
                rows: [
                    { '日期': '1/1', '专享页点击量': 100},
                    { '日期': '1/2', '专享页点击量': 20},
                    { '日期': '1/3', '专享页点击量': 303},
                    { '日期': '1/4', '专享页点击量': 40},
                    { '日期': '1/5', '专享页点击量': 500},
                    { '日期': '1/6', '专享页点击量': 600}
                ]
            },
            navTime:null,
            navArr:[1,2,3],
            navId:null,
            navData:{
                columns: ['日期', '专享页点击量'],
                rows: [
                    { '日期': '1/1', '专享页点击量': 100},
                    { '日期': '1/2', '专享页点击量': 20},
                    { '日期': '1/3', '专享页点击量': 303},
                    { '日期': '1/4', '专享页点击量': 40},
                    { '日期': '1/5', '专享页点击量': 500},
                    { '日期': '1/6', '专享页点击量': 600}
                ]
            },
           
        }
    }
}
</script>


