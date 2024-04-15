/*
 * @Description:
 * @Version: 2.0
 * @Autor: 史小雷
 * @Date: 2021-08-15 16:02:02
 * @LastEditors: shiXl
 * @LastEditTime: 2021-11-16 23:44:15
 */
/**
 * api管理
 */
import request from "../utils/request";
export default {
  login(params) {
    return request({
      url: "/users/login",
      method: "post",
      data: params,
    });
  },
  noticeCount(params) {
    // 待审批通知数量
    return request({
      url: "/leave/count",
      method: "get",
      data: {},
      mock: false,
    });
  },
  getMenuList(params) {
    // 获取菜单列表
    return request({
      url: "/menu/list",
      method: "get",
      data: params,
      mock: false,
    });
  },
  getPermissionList() {
    // 获取用户对应的权限菜单
    return request({
      url: "/users/getPermissionList",
      method: "get",
      data: {},
      mock: false,
    });
  },
  getUserList(params) {
    // 获用户列表
    return request({
      url: "/users/list",
      method: "get",
      data: params,
      mock: false,
    });
  },
  getAllUserList(params) {
    // 获用所有户列表
    return request({
      url: "/users/all/list",
      method: "get",
      data: {},
      mock: false,
    });
  },
  userDel(params) {
    // 删除单个用户/多个用户
    return request({
      url: "/users/delete",
      method: "post",
      data: params,
      mock: false,
    });
  },
  updatePwd(params) {
    // 更新用户密码
    return request({
      url: "/users/updatePwd",
      method: "post",
      data: params,
      mock: false,
    });
  },
  getRoleAllList() {
    // 角色名称列表(全部)
    return request({
      url: "/roles/allList",
      method: "get",
      data: {},
      mock: false,
    });
  },
  getRoleList(params) {
    // 角色列表
    return request({
      url: "/roles/list",
      method: "get",
      data: params,
      mock: false,
    });
  },
  roleOperate(params) {
    //角色操作= 创建、编辑、删除
    return request({
      url: "/roles/operate",
      method: "post",
      data: params,
      mock: false,
    });
  },
  updatePermission(params) {
    // 更新角色权限
    return request({
      url: "/roles/update/permission",
      method: "post",
      data: params,
      mock: false,
    });
  },
  getDeptList(params) {
    //部门列表
    return request({
      url: "/dept/list",
      method: "get",
      data: params,
      mock: false,
    });
  },
  deptOperate(params) {
    //部门创建、编辑、删除
    return request({
      url: "/dept/operate",
      method: "post",
      data: params,
      mock: false,
    });
  },
  userSubmit(params) {
    // 编辑/创建 - 用户列表
    return request({
      url: "/users/operate",
      method: "post",
      data: params,
      mock: false,
    });
  },
  menuSubmit(params) {
    // 编辑/创建 - 菜单列表
    return request({
      url: "/menu/operate",
      method: "post",
      data: params,
      mock: false,
    });
  },
  // 审批管理
  getApplyList(params) {
    return request({
      url: "/leave/list",
      method: "get",
      data: params,
      mock: false,
    });
  },
  leaveOperate(params) {
    return request({
      url: "/leave/operate",
      method: "post",
      data: params,
      mock: false,
    });
  },
  leaveApprove(params) {
    return request({
      url: "/leave/approve",
      method: "post",
      data: params,
      mock: false,
    });
  },
  getCaptcha(params) {
    return request({
      url: "/captcha/getCaptcha",
      method: "get",
      data: params,
      mock: false,
    });
  },
  verifyCaptcha(params) {
    return request({
      url: "/captcha/verifyCaptcha",
      method: "post",
      data: params,
      mock: false,
    });
  },
};
