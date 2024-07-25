<template>
  <div class="account-info">
    <div class="header">
      <span class="header-icon"></span>
      <span class="header-text">我的信息</span>
    </div>
    <div class="info-wrap">
      <form ref="formRef" :model="form" @submit.prevent>
        <div class="form-item user-nick-name">
          <label class="form-item__label">昵称:</label>
          <div class="form-item__content">
            <el-input
              type="text"
              placeholder="你的昵称"
              v-model="form.nickname"
              maxlength="24"
            />
          </div>
        </div>
        <div class="form-item user-uid">
          <label class="form-item__label">UID:</label>
          <div class="form-item__content">
            <span class="user-uid-text">{{ useUser.userinfo.uid }}</span>
          </div>
        </div>
        <div class="form-item user-my-sign">
          <label class="form-item__label">我的签名:</label>
          <div class="form-item__content">
            <el-input
              type="textarea"
              placeholder="设置您的签名"
              v-model="form.description"
              maxlength="100"
              resize="none"
              rows="2"
            />
          </div>
        </div>
        <div class="form-item user-my-sex">
          <label class="form-item__label">性别:</label>
          <div class="form-item__content">
            <div class="radio-group">
              <span
                class="radio-item"
                :class="{ check: form.gender === 1 }"
                @click="
                  () => {
                    form.gender = 1;
                  }
                "
              >
                男
              </span>
              <span
                class="radio-item"
                :class="{ check: form.gender === 0 }"
                @click="
                  () => {
                    form.gender = 0;
                  }
                "
              >
                女
              </span>
              <span
                class="radio-item"
                :class="{ check: form.gender === 2 }"
                @click="
                  () => {
                    form.gender = 2;
                  }
                "
              >
                保密
              </span>
            </div>
          </div>
        </div>
        <div class="form-item submit-btn">
          <div class="form-item__content">
            <div class="padding-dom"></div>
            <div class="btn-wrap">
              <div class="btn" :class="{ enable: hadChanged }" @click="submit">
                保存
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { getNicknameLength } from '@/utils/utils';

import { upDataAvatar, upDataUserinfo } from '@/api/user';
import { useUserStore } from '@/stores/modules/user';

const useUser = useUserStore();
const formRef = ref();
const form = reactive({
  nickname: '',
  description: '',
  gender: 2,
});
const state = reactive({
  isLoading: false,
});

onMounted(() => {
  if (useUser.userinfo.nickname) {
    form.nickname = useUser.userinfo.nickname;
    form.description = useUser.userinfo.description;
    form.gender = useUser.userinfo.gender;
  }
});

const hadChanged = computed(
  () =>
    form.nickname !== useUser.userinfo.nickname ||
    form.description !== useUser.userinfo.description ||
    form.gender !== useUser.userinfo.gender,
);

const submit = async () => {
  if (!hadChanged.value || state.isLoading) return;
  if (form.nickname.length === 0) {
    ElMessage.warning('昵称不能为空白');
    return;
  }
  if (getNicknameLength(form.nickname) > 32) {
    ElMessage.warning('昵称过长');
    return;
  }
  state.isLoading = true;
  const formData = new FormData();
  formData.append('nickname', form.nickname);
  formData.append('description', form.description);
  formData.append('gender', form.gender);
  try {
    const res = await upDataUserinfo(formData);
    ElMessage.success('信息更新成功');
    useUser.userinfo.nickname = form.nickname;
    useUser.userinfo.description = form.description;
    useUser.userinfo.gender = form.gender;
  } finally {
    state.isLoading = false;
  }
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
  background-color: var(--brand_blue);
  border-radius: 4px;
}

.header-text {
  float: left;
  margin: 17px 0 0 5px;
  color: var(--brand_blue);
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

.user-my-sex,
.user-my-sign,
.user-nick-name,
.user-uid,
.submit-btn {
  float: left;
  width: 789px;
}

.form-item__label {
  vertical-align: middle;
  font-size: 14px;
  color: #606266;
  box-sizing: border-box;
  width: 95px;
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

.user-nick-name .el-input {
  float: left;
  width: 225px;
  height: 30px;
  margin-right: 40px;
}

.user-nick-name /deep/ .el-input__wrapper {
  padding: 0px 15px;
}

.user-uid-text {
  color: var(--text3);
}

.user-my-sign .el-textarea {
  float: left;
  width: 618px;
  height: 88px;
  resize: none;
}

.user-my-sign /deep/ .el-textarea__inner {
  height: 88px;
  padding: 5px 15px;
}

.el-textarea /deep/ .el-textarea__inner::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.el-textarea /deep/ .el-textarea__inner::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ccc;
}

.radio-item {
  margin-right: 20px;
  padding: 5px 8px;
  border: 1px solid #bfcbd9;
  border-radius: 5px;
  background: #f4f4f4;
  color: #717171;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  text-align: center;
}

.radio-item.check {
  background-color: var(--brand_blue);
  border-color: var(--brand_blue);
  color: #fff;
}

.padding-dom {
  width: 789px;
  height: 39px;
  border-bottom: 1px solid #e5e9ef;
  margin-bottom: 40px;
}

.btn-wrap {
  float: left;
  width: 789px;
  height: 36px;
  position: relative;
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
  background: var(--brand_blue);
  color: #fff;
}
</style>
