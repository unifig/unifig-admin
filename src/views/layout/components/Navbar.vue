<template>
	<div class="navbar-wrap">
		<el-menu class="navbar" mode="horizontal">
		<!-- <img src="../../../assets/images/logo@2x.png" alt="" class="img"> -->
		<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
		<span class="out right" @click="logout">
			<img src="../../../assets/images/tuichu@2x.png" alt>退出
		</span>
		<span style="float: right;margin-right: 30px;">{{admin}}</span>
		</el-menu>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import {getMechanismArr} from '@/api/navbar';
import {
  setDeptId,
  getDeptId,
  setDeptArr,
  getDeptArr,
  setDeptArrOther,
  getDeptArrOther
} from '@/utils/auth'

export default {
	components: {
		Breadcrumb,
		Hamburger
	},
  	data() {
		return {
			admin: this.$store.state.user.name ? this.$store.state.user.name : null,
		};
  	},
	created() {

	},
	computed: {
		...mapGetters(["sidebar", "avatar"])
	},
	methods: {
		/**
		 * 收缩导航栏
		 */
		toggleSideBar() {
			this.$store.dispatch("ToggleSideBar");
		},
		/**
		 * 退出登陆
		 */
		logout() {
			this.$store.dispatch("LogOut").then(() => {
				location.reload(); // 为了重新实例化vue-router对象 避免bug
			});
		},
		
	}
};
</script>

<style lang="scss" scoped>
.navbar-wrap {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 70px;
	z-index: 100;
	.dept-label {
		margin-left: 50px;
	}
	.dept-select {
		margin-left: 10px;
	}
	.dept-wrap {
		font-size: 12px;
			.tip {
				padding: 0 20px;
			}
		.out {
			padding-right: 20px;
			color: red;
			cursor: pointer;
		}
	}
}

.navbar {
	height: 70px;
	line-height: 70px;
	border-radius: 0px !important;
	.hamburger-container {
		line-height: 77px;
		height: 70px;
		float: left;
		padding: 0 10px;
		margin-left: 24px;
	}
	.img {
		// height: 20px;
		width: 100px;
		display: inline-block;
		float: left;
		margin-top: 10px;
		margin-left: 24px;
	}
	.title {
		display: inline-block;
		line-height: 70px;
		color: #ea3037;
		float: left;
		margin-right: 28px;
		margin-left: 64px;
		font-size: 26px;
		font-weight: 700;
	}
	.titleNav {
		float: left;
		font-weight: 700;
		margin-right: 50px;
		font-size: 22px;
	}
	.dept-label {
		font-size: 16px;
		color: #000;
		margin-right: 12px;
		&:focus {
			outline: none;
		}
	}
	.el-cascader {
		&:focus {
			outline: none;
		}
		input {
			height: 36px !important;
			line-height: 36px !important;
		}
	}
	.out {
		width: 80px;
		height: 30px;
		font-size: 15px;
		display: inline-block;
		border: 1px solid #f73b42;
		color: #f73b42;
		border-radius: 15px;
		text-align: center;
		line-height: 30px;
		margin-top: 20px;
		margin-right: 20px;
		&:hover {
			cursor: pointer;
		}
		img {
			display: inline-block;
			margin-right: 10px;
			height: 15px;
			width: 15px;
			vertical-align: text-bottom;
		}
	}
	.screenfull {
		position: absolute;
		right: 90px;
		top: 16px;
		color: red;
	}
	.msg {
		position: relative;
		i {
			position: absolute;
			font-style: normal;
			background-color: #ea3037;
			width: 14px;
			height: 14px;
			color: #fff;
			line-height: 14px;
			font-size: 12px;
			border-radius: 50%;
			text-align: center;
			top: -8px;
			right: -4px;
		}
	}
	.avatar-container {
		height: 70px;
		display: inline-block;
		position: absolute;
		top: 0;
		right: 35px;
		.avatar-wrapper {
			cursor: pointer;
			margin-top: 5px;
			position: relative;
			.user-avatar {
				width: 40px;
				height: 40px;
				border-radius: 10px;
			}
			.el-icon-caret-bottom {
				position: absolute;
				right: -20px;
				top: 25px;
				font-size: 12px;
			}
		}
  	}
}
</style>

