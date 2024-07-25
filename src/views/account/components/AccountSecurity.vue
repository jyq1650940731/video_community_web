<template>
  <div class="account-security">
    <div class="header">
      <span class="header-icon"></span>
      <span class="header-text">账号安全</span>
    </div>
    <div class="info-wrap">
      <div class="form-item password-input">
        <label class="form-item__label">旧密码:</label>
        <div class="form-item__content">
          <el-input
            type="password"
            show-password
            placeholder="输入旧密码"
            v-model="state.password"
            maxlength="50"
          />
        </div>
      </div>
      <div class="form-item password-input">
        <label class="form-item__label">新密码:</label>
        <div class="form-item__content">
          <el-input
            type="password"
            show-password
            placeholder="设置新密码"
            v-model="state.newPassword"
            maxlength="50"
          />
        </div>
      </div>
      <div class="form-item password-input">
        <label class="form-item__label">确认密码:</label>
        <div class="form-item__content">
          <el-input
            type="password"
            show-password
            placeholder="确认新密码"
            v-model="state.confirmPassword"
            maxlength="50"
          />
        </div>
      </div>
      <div class="form-item submit-btn">
        <div class="form-item__content">
          <div class="padding-dom"></div>
          <div class="btn-wrap">
            <div class="btn" :class="{ enable: enable }" @click="submit">
              重置密码
            </div>
          </div>
          <div class="delete-wrap">
            <span class="delete">注销账号</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { upDataPassword } from '@/api/user';
import { useUserStore } from '@/stores/modules/user';
const useUser = useUserStore();
const state = reactive({
  password: '',
  newPassword: '',
  confirmPassword: '',
  isLoading: false,
});

const enable = computed(
  () =>
    state.password !== '' &&
    state.newPassword !== '' &&
    state.confirmPassword !== '',
);

const submit = async () => {
  if (!enable.value || state.isLoading) return;
  if (state.newPassword !== state.confirmPassword) {
    ElMessage.warning('两次输入的新密码不一致');
  }
  state.isLoading = true;
  const formData = new FormData();
  formData.append('pw', state.password);
  formData.append('npw', state.newPassword);
  const res = await upDataPassword(formData);
  state.isLoading = false;
  ElMessageBox.alert('你需要重新登录', '密码重置成功', {
    confirmButtonText: '确认',
    callback: () => {
      useUser.userLogout();
      useUser.setLoginDialogVisible(true);
    },
  });
};
</script>

<style scoped>
.header {
  height: 50px;
  padding-left: 30px;
  border-bottom: 1px solid #ddd;
}

.header-icon {
  float: left;
  width: 4px;
  height: 16px;
  margin-top: 17px;
  background-color: #ff7da1;
  border-radius: 4px;
}

.header-text {
  float: left;
  margin: 17px 0 0 5px;
  color: #ff7da1;
  font-size: 14px;
  cursor: default;
}

.info-wrap {
  padding: 40px 20px 0;
  position: relative;
}

.form-item {
  margin-bottom: 22px;
}

.password-input,
.submit-btn {
  float: left;
  width: 789px;
}

.form-item__label {
  vertical-align: middle;
  font-size: 14px;
  color: #606266;
  box-sizing: border-box;
  width: 260px;
  text-align: right;
  margin-right: 20px;
  float: left;
  line-height: 30px;
  padding: 0;
}

.form-item__content {
  line-height: 30px;
  position: relative;
  font-size: 14px;
}

.el-input {
  position: relative;
  font-size: 14px;
}

.password-input .el-input {
  float: left;
  width: 225px;
  height: 30px;
  margin-right: 40px;
}

.password-input /deep/ .el-input__wrapper {
  padding: 0px 15px;
}

.padding-dom {
  width: 789px;
  height: 30px;
  border-bottom: 1px solid #e5e9ef;
  margin-bottom: 40px;
}

.btn-wrap,
.delete-wrap {
  float: left;
  width: 789px;
  height: 36px;
  position: relative;
  margin-bottom: 20px;
}

.btn {
  height: 36px;
  width: 110px;
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--text2);
  background: #ddd;
  text-align: center;
  line-height: 36px;
  cursor: default;
}

.btn.enable {
  cursor: pointer;
  background: #ff7da1;
  color: #fff;
}

.delete {
  font-size: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--Pi6);
  cursor: pointer;
}

.delete:hover {
  text-decoration: underline;
  color: var(--Pi7);
}
</style>
