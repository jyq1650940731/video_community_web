<!--
 * @Author: YourName
 * @Date: 2024-05-24 16:35:24
 * @LastEditTime: 2024-05-25 17:57:46
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_web\src\views\platform\upload\children\coverDIalog.vue
 * 版权声明
-->

<template>
  <!-- 封面裁剪框 -->
  <div class="cover-dialog">
    <el-dialog
      v-model="coverDialog.visible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      align-center
    >
      <div class="cover-dialog-header">
        <div class="header-tab">
          <div
            class="header-tab-item"
            :class="coverDialog.coverType == 1 ? 'currentTab' : ''"
            @click="coverDialog.coverType = 1"
          >
            <div class="tab-text">截取封面</div>
            <div class="tab-line"></div>
          </div>
          <div
            class="header-tab-item"
            :class="coverDialog.coverType == 2 ? 'currentTab' : ''"
            @click="coverDialog.coverType = 2"
          >
            <div class="tab-text">上传封面</div>
            <div class="tab-line"></div>
          </div>
        </div>
      </div>
      <div class="cover-dialog-body">
        <div class="cover-cropper-text">拖拽选框裁剪</div>
        <div
          class="cover-cut-content"
          :class="
            coverDialog.coverType == 1 ? 'pick-version' : 'upload-version'
          "
        >
          <div
            class="cover-cut-content-pick"
            :style="coverDialog.coverType == 1 ? '' : 'display: none;'"
          >
            <!-- 裁剪组件 -->
            <cropper-comp
              :imgURL="coverDialog.newCoverImage"
              v-model:cutOrder="coverDialog.cutOrder1"
              :title="vname"
              @cut="changeCover"
            ></cropper-comp>

            <!-- 进度条组件 -->
            <div class="cover-cut-content-pick-bar">
              <div class="cover-slider" ref="coverSliderRef">
                <player-progress
                  style="top: 20px; visibility: hidden"
                  :currentPer="coverDialog.currentPer"
                  @changeCurrent="changeCurrentPer"
                ></player-progress>
                <div
                  class="slider-handle"
                  ref="sliderHandleRef"
                  :style="`left: ${coverDialog.currentPer * 100}%;`"
                ></div>
                <div
                  class="cover-slider-image-list"
                  v-if="sliderImages.length == 7"
                >
                  <div
                    class="cover-slider-image"
                    v-for="index in 7"
                    :key="index"
                    :style="`background: url(${sliderImages[index - 1]}) center center / cover no-repeat;`"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="cover-cut-content-upload"
            :style="coverDialog.coverType == 2 ? '' : 'display: none;'"
          >
            <div
              class="cover-select-content-upload"
              :style="coverDialog.newOptionImage ? 'display: none;' : ''"
            >
              <div class="cover-select-content-upload-box">
                <el-upload
                  class="upload-wrp"
                  drag
                  :show-file-list="false"
                  :before-upload="handleImageUploadbefore"
                  :auto-upload="true"
                >
                  <svg-icon
                    name="upload"
                    class="el-icon--upload"
                    width="85px"
                    height="85px"
                  ></svg-icon>
                  <div class="upload-text-main">拖拽图片到此或点击上传</div>
                  <div class="upload-text-sub">
                    建议上传4:3比例高清图片，尺寸≥1200*900
                  </div>
                </el-upload>
              </div>
            </div>
            <div v-if="coverDialog.newOptionImage">
              <!-- 裁剪组件 -->
              <cropper-comp
                :imgURL="coverDialog.newOptionImage"
                v-model:cutOrder="coverDialog.cutOrder2"
                :title="vname"
                @cut="changeCover"
              ></cropper-comp>
              <!-- 更换图片按钮 -->
              <el-upload
                :show-file-list="false"
                :before-upload="handleImageUploadbefore"
              >
                <div class="reselect">
                  <div class="file-status-manage refresh">
                    <svg-icon name="reUpload" width="16"></svg-icon>
                    <span>重换封面</span>
                  </div>
                </div>
              </el-upload>
            </div>
          </div>
        </div>
      </div>
      <div class="cover-dialog-footer">
        <div
          class="cover-dialog-submit"
          v-show="coverDialog.coverType == 1 || coverDialog.newOptionImage"
          @click="sendOrder"
        >
          <span>完成</span>
        </div>
      </div>
    </el-dialog>
    <canvas ref="cutCanvasRef" style="display: none"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { UploadProps } from 'element-plus';

const props = defineProps([
  'coverImageUrl',
  'vname',
  'videoDuration',
  'videoRef',
  'sliderImages',
]);
const emit = defineEmits(['changeCoverImgUrl']);
const cutCanvasRef = ref();
const sliderHandleRef = ref();
const coverSliderRef = ref();

const coverDialog = reactive({
  visible: false,
  coverType: 1,
  cutOrder1: false,
  cutOrder2: false,
  currentPer: 0.00001,
  newCoverImage: props.coverImageUrl,
  newOptionImage: '',
});

watch(
  () => props.coverImageUrl,
  (newval) => {
    coverDialog.newCoverImage = newval;
  },
);

const handleImageUploadbefore: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/png' && rawFile.type != 'image/jpeg') {
    ElMessage.error('图片只接收jpg或png格式哦!');
    return false;
  } else if (rawFile.size > 5 * 1024 * 1024) {
    ElMessage.error('只能上传5M的图片哦!');
    return false;
  }
  coverDialog.newOptionImage = URL.createObjectURL(rawFile);
  return false;
};

const showCoverDialog = () => {
  coverDialog.visible = true;
  setTimeout(() => {
    initDrag();
  }, 100);
};

const changeCover = (url: string) => {
  // emit('changeCoverImgUrl', coverDialog.newCoverImage);
  coverDialog.visible = false;
  // coverDialog.newCoverImage = '';
};

const sendOrder = () => {
  if (coverDialog.coverType === 1) {
    emit('changeCoverImgUrl', coverDialog.newCoverImage);
  } else {
    emit('changeCoverImgUrl', coverDialog.newOptionImage);
  }
  coverDialog.visible = false;
};

// 进度
const changeCurrentPer = (curr: number) => {
  coverDialog.currentPer = curr;
  const currentTime = curr * props.videoDuration;
  selectCoverSlice(currentTime);
};

// 初始化拖动
const initDrag = () => {
  const coverSlider = coverSliderRef.value;
  const sliderHandle = sliderHandleRef.value;

  let isDragging = false; // 是否正在拖动
  let offsetX, currPer;

  // 鼠标按下事件处理程序
  sliderHandle.addEventListener('mousedown', () => {
    isDragging = true;
  });

  // 移动端 按下
  sliderHandle.addEventListener('touchstart', () => {
    isDragging = true;
  });

  // 鼠标移动事件处理程序
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    offsetX = e.clientX - coverSlider.getBoundingClientRect().left; // 鼠标相对进度条左侧的X偏移
    currPer = offsetX / coverSlider.getBoundingClientRect().width; // 计算进度比例
    // 边界值判定
    currPer = Math.max(0.00001, currPer);
    currPer = Math.min(0.99999, currPer);
    coverDialog.currentPer = currPer; // 更新
    const currentTime = currPer * props.videoDuration;
    selectCoverSlice(currentTime);
  });

  // 移动端 移动
  document.addEventListener(
    'touchmove',
    (e) => {
      if (!isDragging) return;
      e.preventDefault();
      offsetX = e.touches[0].clientX - coverSlider.getBoundingClientRect().left;
      currPer = offsetX / coverSlider.getBoundingClientRect().width; // 计算进度比例
      // 边界值判定
      currPer = Math.max(0.00001, currPer);
      currPer = Math.min(0.99999, currPer);
      coverDialog.currentPer = currPer; // 更新
      const currentTime = currPer * props.videoDuration;
      selectCoverSlice(currentTime);
    },
    { passive: false },
  );

  // 鼠标释放事件处理程序
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // 移动端 松开
  document.addEventListener('touchend', () => {
    isDragging = false;
  });
};

// 选择视频帧
const selectCoverSlice = (time: number) => {
  // 获取视频元素
  const video = props.videoRef;
  video.crossOrigin = 'anonymous'; // 解决跨域问题，也就是提示污染资源无法转换视频
  video.currentTime = time;
  // 在视频可以播放时获取这一秒图像
  video.oncanplay = () => {
    // 获取画布元素
    const canvas = cutCanvasRef.value;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // 将视频的这一帧绘制到画布上
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    // 将画布内容转换为图像数据URL
    coverDialog.newCoverImage = canvas.toDataURL('image/jpeg');
  };
};

defineExpose({ showCoverDialog });
</script>
<style lang="scss" scoped>
.cover-dialog-header,
.cover-dialog-footer {
  width: 800px;
}
.cover-dialog-header {
  border-bottom: 1px solid #e7e7e7;
}

.cover-dialog-footer {
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover-cropper-text {
  margin-top: 17px;
  padding: 0 30px;
  color: #18191c;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.cover-dialog-submit {
  width: 128px;
  font-size: 16px;
  padding: 12px 16px;
  color: #fff;
  background-color: var(--el-color-primary);
  display: inline-block;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  position: relative;
  line-height: 1;
  &:hover {
    background: var(--el-color-primary-light-3);
  }
}
.cover-cut-content-upload {
  height: 100%;
}
.cover-select-content-upload {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cover-select-content-upload-box {
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 500px;
  height: 260px;
  .upload-text-main {
    height: 18px;
    font-weight: 400;
    line-height: 18px;
    color: #00a1d6;
    margin-top: 5px;
    margin-bottom: 8px;
  }
  .upload-text-sub {
    height: 16px;
    font-weight: 400;
    font-size: 13px;
    line-height: 17px;
    color: #9499a0;
  }
  :deep() {
    .upload-wrp {
      width: 100%;
      height: 100%;
    }
    .el-upload {
      height: 100%;
      .el-upload-dragger {
        height: 100%;
      }
    }
  }
}
/* element 元素 */
.cover-dialog :deep() {
  .el-dialog__body {
    margin: -30px 0 0 0;
    padding: 0;
  }
}

.header-tab {
  padding: 0 32px;
  height: 61px;
  display: flex;
}

.header-tab-item {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 29px;
}

.tab-text {
  color: #18191c;
  font-weight: 500;
  font-size: 16px;
  padding: 20px 0 18px 0;
}

.tab-line {
  height: 3px;
  width: 66px;
}

.currentTab .tab-text {
  color: var(--el-color-primary);
}

.currentTab .tab-line {
  background-color: var(--el-color-primary);
}

.desc-text {
  width: 80%;
  margin-top: 12px;
}

.pick-version {
  padding: 0 30px;
  height: 450px;
  transition: height 0.5s;
}

.upload-version {
  padding: 0 30px;
  height: 372px;
  transition: height 0.5s;
}
.cover-dialog-body {
  position: relative;
}
.reselect {
  position: absolute;
  top: -5px;
  left: 122px;
  width: 94px;
}
.file-status-manage {
  color: var(--el-color-primary);
  cursor: pointer;
  user-select: none;
  font-size: 13px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  span {
    margin-left: 5px;
  }
}

//进度条
.cover-cut-content-pick-bar {
  margin-top: 20px;
  margin-left: 12px;
  width: 704px;
  height: 60px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  .slider-handle {
    position: absolute;
    z-index: 5;
    width: 12px;
    height: 66px;
    cursor: pointer;
    background: url('@/assets/images/slider-handle.png');
    box-sizing: border-box;
    background-size: cover;
    border-radius: 4px;
    top: -3px;
    transform: translateX(-50%);
  }
  .cover-slider {
    position: relative;
    background: #e7e7e7;
    box-shadow:
      0 0 2px rgba(0, 0, 0, 0.04),
      0 4px 10px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    height: 60px;
  }

  .cover-slider-image-list {
    display: flex;
    position: absolute;
    top: 0;
    width: 100%;
    justify-content: center;
  }

  .cover-slider-image {
    height: 60px;
    width: 100px;
  }
}
</style>
