<template>
  <div class="cropper">
    <div class="cropper-body">
      <div class="cropper-body-left">
        <div class="img-wrp">
          <img :src="imgURL" alt="" ref="originImage" />
          <div
            class="showPosition"
            ref="showPositionRef"
            :style="`top: ${originHeightOffset}px;
                                left: ${originWidthOffset}px;
                                width: ${originShowWidth}px;
                                height: ${originShowHeight}px;`"
          >
            <!-- 裁剪框 -->
            <div
              class="crop-box"
              ref="cropBoxRef"
              :style="`width: ${state.boxWidth}px;
                                    height: ${state.boxHeight}px;
                                    top: ${state.boxTop}px;
                                    left: ${state.boxLeft}px;`"
            >
              <!-- 中间移动块 -->
              <div class="crop-box-move" ref="cropBoxMoveRef"></div>
              <!-- 内侧左蒙版 -->
              <div class="crop-box-marking-left"></div>
              <!-- 内侧右蒙版 -->
              <div class="crop-box-marking-right"></div>
              <!-- 内侧上蒙版 不可见 -->
              <div class="crop-box-marking-top"></div>
              <!-- 内侧下蒙版 不可见 -->
              <div class="crop-box-marking-bottom"></div>
              <!-- 左上控块 -->
              <div
                class="cropper-point point-lt"
                @mousedown.passive="(e) => startResize('lt', e)"
              ></div>
              <!-- 右上控块 -->
              <div
                class="cropper-point point-rt"
                @mousedown.passive="(e) => startResize('rt', e)"
              ></div>
              <!-- 左下控块 -->
              <div
                class="cropper-point point-lb"
                @mousedown.passive="(e) => startResize('lb', e)"
              ></div>
              <!-- 右下控块 -->
              <div
                class="cropper-point point-rb"
                @mousedown.passive="(e) => startResize('rb', e)"
              ></div>
            </div>
            <!-- 上蒙版 -->
            <div
              class="marking marking-top"
              :style="`width: ${state.boxWidth}px;
                                    height: ${state.boxTop}px;
                                    top: 0px;
                                    left: ${state.boxLeft}px;`"
            ></div>
            <!-- 右蒙版 -->
            <div
              class="marking marking-right"
              :style="`width: ${originShowWidth - (state.boxLeft + state.boxWidth)}px;
                                    height: ${originShowHeight}px;
                                    top: 0px;
                                    left: ${state.boxLeft + state.boxWidth}px;`"
            ></div>
            <!-- 下蒙版 -->
            <div
              class="marking marking-bottom"
              :style="`width: ${state.boxWidth}px;
                                    height: ${originShowHeight - (state.boxTop + state.boxHeight)}px;
                                    top: ${state.boxTop + state.boxHeight}px;
                                    left: ${state.boxLeft}px;`"
            ></div>
            <!-- 左蒙版 -->
            <div
              class="marking marking-left"
              :style="`width: ${state.boxLeft}px;
                                    height: ${originShowHeight}px;
                                    top: 0px;
                                    left: 0px;`"
            ></div>
          </div>
        </div>
        <div class="tips-wrp">
          <div>当前分辨率 {{ cutWidth }}*{{ cutHeight }}</div>
          <div>*部分情况下您的封面将以4:3比例展示</div>
        </div>
      </div>
      <div class="cropper-body-right">
        <div class="preview-item">
          <div class="preview-title">16:9效果预览</div>
          <div class="preview-card">
            <div class="pic169">
              <img
                :src="imgURL"
                alt=""
                :style="`width: ${prev169Width}px;
                                        height: ${prev169Height}px;
                                        transform: translateX(-${prev169OffsetX}px) translateY(-${prev169OffsetY}px);`"
              />
            </div>
            <div class="title">
              <span>{{ vname }}</span>
            </div>
          </div>
        </div>
        <div class="preview-item">
          <div class="preview-title">4:3效果预览</div>
          <div class="preview-card">
            <div class="pic43">
              <img
                :src="imgURL"
                alt=""
                :style="`width: ${prev43Width}px;
                                        height: ${prev43Height}px;
                                        transform: translateX(-${prev43OffsetX}px) translateY(-${prev43OffsetY}px);`"
              />
            </div>
            <div class="title">
              <span>{{ vname }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <canvas ref="cropperCanvas" style="display: none"></canvas>
  </div>
</template>

<script setup lang="ts" name="CropperComp">
import { computed, onMounted, reactive, ref, watch } from 'vue';
// const emit = defineEmits(['cut', 'cutOrder']);
const props = defineProps(['imgURL', 'cutOrder', 'vname']);
const cropperCanvas = ref();
const cropBoxMoveRef = ref();
const cropBoxRef = ref();
const showPositionRef = ref();

const state = reactive({
  width: 0, // 原图的宽
  height: 0, // 原图的高
  boxWidth: 0, // 裁剪框宽
  boxHeight: 0, // 裁剪框高
  boxTop: 0, // 裁剪框的上偏移量 上蒙版的高度
  boxLeft: 0, // 裁剪框的左偏移量 左蒙版的宽度
  isResizing: false, // 是否正在缩放
  resizeDirection: '', // 缩放方向
  startX: 0, // 鼠标按下时的X坐标
  startBoxWidth: 0, // 鼠标按下时的裁剪框宽度
  startBoxHeight: 0, // 鼠标按下时的裁剪框高度
  startBoxLeft: 0, // 鼠标按下时的裁剪框左偏移量
  startBoxTop: 0, // 鼠标按下时的裁剪框上偏移量
});
onMounted(() => {
  updateOrigin();
  initDrag();
});
//
// watch(props.imgURL, (newVal) => {
//   if (newVal) updateOrigin();
// });
// watch(props.cutOrder, (newVal) => {
//   if (newVal) cut();
// });

const updateOrigin = () => {
  const img = new Image();
  img.src = props.imgURL;
  img.onload = () => {
    state.width = img.width;
    state.height = img.height;
    setTimeout(() => {
      initBox(); // 初始化裁剪框
    }, 1); // 异步延时等待初始值更新完
  };
};
// 初始化拖动
const initDrag = () => {
  const cropBoxMove = cropBoxMoveRef.value; // 获取crop-box-move元素
  const cropBox = cropBoxRef.value; // 获取crop-box元素
  const showPosition = showPositionRef.value; // 获取showPosition元素

  let isDragging = false; // 是否正在拖动
  let offsetX, offsetY;

  // 鼠标按下事件处理程序
  cropBoxMove.addEventListener(
    'mousedown',
    (e) => {
      isDragging = true;
      offsetX = e.clientX - cropBox.getBoundingClientRect().left; // 鼠标相对crop-box的X偏移
      offsetY = e.clientY - cropBox.getBoundingClientRect().top; // 鼠标相对crop-box的Y偏移
    },
    { passive: true },
  );

  // 鼠标移动事件处理程序
  document.addEventListener(
    'mousemove',
    (e) => {
      if (!isDragging) return;

      // 计算新的crop-box位置
      let left =
        e.clientX - offsetX - showPosition.getBoundingClientRect().left;
      let top = e.clientY - offsetY - showPosition.getBoundingClientRect().top;

      // 限制crop-box在showPosition内部
      left = Math.max(0, left);
      left = Math.min(showPosition.offsetWidth - cropBox.offsetWidth, left);
      top = Math.max(0, top);
      top = Math.min(showPosition.offsetHeight - cropBox.offsetHeight, top);

      // 设置新位置
      state.boxLeft = left;
      state.boxTop = top;
    },
    { passive: true },
  );

  // 鼠标释放事件处理程序
  document.addEventListener(
    'mouseup',
    () => {
      isDragging = false;
    },
    { passive: true },
  );
};

const startResize = (resizeDirection, event) => {
  state.isResizing = true;
  state.resizeDirection = resizeDirection;
  // 记录按下时的状态
  state.startX = event.clientX;
  state.startBoxWidth = state.boxWidth;
  state.startBoxHeight = state.boxHeight;
  state.startBoxLeft = state.boxLeft;
  state.startBoxTop = state.boxTop;
  // 添加全局事件监听器
  window.addEventListener('mousemove', resize, { passive: true });
  window.addEventListener('touchmove', resize, { passive: true });
  window.addEventListener('mouseup', stopResize, { passive: true });
  window.addEventListener('touchend', stopResize, { passive: true });
};

// 缩放中
const resize = (event) => {
  if (!state.isResizing) return;
  // 根据event值来判断是移动端还是电脑端
  const clientX =
    event.touches && event.touches.length > 0
      ? event.touches[0].clientX
      : event.clientX;

  const deltaX = clientX - state.startX;
  // 根据不同的缩放方向，计算新的尺寸和位置
  if (state.resizeDirection == 'lt') {
    // 左上缩放
    // 计算新的宽度和左偏移量
    const newWidth = state.startBoxWidth - deltaX;
    const newLeft = state.startBoxLeft + deltaX;

    // 比例缩放
    const newHeight = newWidth / (16 / 9);
    const newTop = state.startBoxTop + (state.startBoxHeight - newHeight);
    // 边界检查
    if (
      newWidth >= 64 &&
      newWidth <= originShowWidth.value &&
      newLeft >= 0 &&
      newTop >= 0
    ) {
      state.boxWidth = newWidth;
      state.boxHeight = newHeight;
      state.boxLeft = newLeft;
      state.boxTop = newTop;
    }
  } else if (state.resizeDirection == 'rt') {
    // 右上缩放
    const newWidth = state.startBoxWidth + deltaX;
    // 比例缩放
    const newHeight = newWidth / (16 / 9);
    const newTop = state.startBoxTop + (state.startBoxHeight - newHeight);
    // 边界检查
    if (
      newWidth >= 64 &&
      newWidth + state.startBoxLeft <= originShowWidth.value &&
      newTop >= 0
    ) {
      state.boxWidth = newWidth;
      state.boxHeight = newHeight;
      state.boxTop = newTop;
    }
  } else if (state.resizeDirection == 'lb') {
    // 左下缩放
    const newWidth = state.startBoxWidth - deltaX;
    const newLeft = state.startBoxLeft + deltaX;
    // 比例缩放
    const newHeight = newWidth / (16 / 9);
    // 边界检查
    if (
      newWidth >= 64 &&
      newWidth <= originShowWidth.value &&
      newLeft >= 0 &&
      state.startBoxTop + newHeight <= originShowHeight.value
    ) {
      state.boxWidth = newWidth;
      state.boxHeight = newHeight;
      state.boxLeft = newLeft;
    }
  } else if (state.resizeDirection == 'rb') {
    // 右下缩放
    const newWidth = state.startBoxWidth + deltaX;
    // 比例缩放
    const newHeight = newWidth / (16 / 9);
    // 边界检查
    if (
      newWidth >= 64 &&
      newWidth + state.startBoxLeft <= originShowWidth.value &&
      state.startBoxTop + newHeight <= originShowHeight.value
    ) {
      state.boxWidth = newWidth;
      state.boxHeight = newHeight;
    }
  }
  // // 阻止默认事件
  // if (!(event.touches && event.touches.length > 0)) {
  //   event.preventDefault();
  // }
};

// 停止缩放
const stopResize = () => {
  // 清除事件监听器
  window.removeEventListener('mousemove', resize);
  window.removeEventListener('touchmove', resize);
  window.removeEventListener('mouseup', stopResize);
  window.removeEventListener('touchend', stopResize);
  // 重置缩放状态
  state.isResizing = false;
  state.resizeDirection = '';
};

const cut = () => {
  const img = new Image();
  img.src = props.imgURL;
  const canvas = cropperCanvas.value;
  canvas.width = cutWidth;
  canvas.height = cutHeight;
  const ctx = canvas.getContext('2d');
  img.onload = () => {
    ctx.drawImage(
      img,
      cutOffsetX,
      cutOffsetY,
      cutWidth,
      cutHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    // emit('cutOrder', false);
    // $emit('update:cutOrder', false); // 裁剪完改回false
    // $emit('cut', canvas.toDataURL('image/jpeg'));
  };
};

//
const initBox = () => {
  // 如果是较宽图片，以原图呈现高初始化
  if (originAspectRatio.value > 16 / 9) {
    state.boxHeight = 0.9 * originShowHeight.value;
    state.boxWidth = (state.boxHeight * 16) / 9;
    state.boxTop = (originShowHeight.value - state.boxHeight) / 2;
    state.boxLeft = (480 - state.boxWidth) / 2;
  }
  // 否则以原图呈现宽初始化
  else {
    state.boxWidth = 0.9 * originShowWidth.value;
    state.boxHeight = state.boxWidth / (16 / 9);
    state.boxTop = (270 - state.boxHeight) / 2;
    state.boxLeft = (originShowWidth.value - state.boxWidth) / 2;
  }
};

//计算属性
const originAspectRatio = computed(() => {
  return state.width / state.height;
});
// 计算原图呈现宽
const originShowWidth = computed(() => {
  // 如果原图较高，重新计算呈现宽，否则就480
  if (originAspectRatio.value < 16 / 9) {
    return 270 * originAspectRatio.value;
  } else {
    return 480;
  }
});

// 计算原图呈现高
const originShowHeight = computed(() => {
  // 如果原图较宽，重新计算呈现高，否则就270
  if (originAspectRatio.value > 16 / 9) {
    return 480 / originAspectRatio.value;
  } else {
    return 270;
  }
});

// 计算原图相对 img-wrp 的宽偏移量
const originWidthOffset = computed(() => {
  // 如果原图较高，计算左右偏移量，否则就0
  if (originAspectRatio.value < 16 / 9) {
    // 先根据固定高计算呈现宽
    const showWidth = 270 * originAspectRatio.value;
    return (480 - showWidth) / 2;
  } else {
    return 0;
  }
});

// 计算原图相对 img-wrp 的高偏移量
const originHeightOffset = computed(() => {
  // 如果原图较宽，计算上下偏移量，否则就0
  if (originAspectRatio.value > 16 / 9) {
    // 先根据固定宽计算呈现高
    const showHeight = 480 / originAspectRatio.value;
    return (270 - showHeight) / 2;
  } else {
    return 0;
  }
});

// 根据裁剪框的位置和大小按比例计算裁剪后的图片信息
// 左偏移 像素
const cutOffsetX = computed(() => {
  return Math.floor((state.boxLeft / originShowWidth.value) * state.width);
});
// 上偏移 像素
const cutOffsetY = computed(() => {
  return Math.floor((state.boxTop / originShowHeight.value) * state.height);
});
// 裁剪图宽 像素
const cutWidth = computed(() => {
  return Math.floor((state.boxWidth / originShowWidth.value) * state.width);
});
// 裁剪图高 像素
const cutHeight = computed(() => {
  return Math.floor((state.boxHeight / originShowHeight.value) * state.height);
});

// 计算16:9预览图相关
// 实际宽度
const prev169Width = computed(() => {
  return 224 * (originShowWidth.value / state.boxWidth);
});
// 实际高度
const prev169Height = computed(() => {
  return 126 * (originShowHeight.value / state.boxHeight);
});
// 实际偏移X
const prev169OffsetX = computed(() => {
  return prev169Width.value * (state.boxLeft / originShowWidth.value);
});
// 实际偏移Y
const prev169OffsetY = computed(() => {
  return prev169Height.value * (state.boxTop / originShowHeight.value);
});

// 计算4:3预览图相关
// 实际宽度
const prev43Width = computed(() => {
  return 224 * (originShowWidth.value / (state.boxWidth * 0.75));
});
// 实际高度
const prev43Height = computed(() => {
  return 168 * (originShowHeight.value / state.boxHeight);
});
// 实际偏移X
const prev43OffsetX = computed(() => {
  return (
    prev43Width.value *
    ((state.boxWidth * 0.125 + state.boxLeft) / originShowWidth.value)
  );
});
// 实际偏移Y
const prev43OffsetY = computed(() => {
  return prev43Height.value * (state.boxTop / originShowHeight.value);
});
</script>

<style scoped>
.cropper {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.cropper-body {
  display: flex;
  position: relative;
}
.cover-dialog-body {
  position: relative;
}
.cropper-body-left {
  padding-top: 15px;
  width: 480px;
}

.img-wrp {
  height: 270px;
  width: 100%;
  border-radius: 4px;
  background-color: #000;
  overflow: hidden;
  text-align: center;
  position: relative;
}

.img-wrp > img {
  width: 100%;
  height: 100%;
  object-fit: scale-down;
}

.showPosition {
  position: absolute;
}

.crop-box {
  position: relative;
  border: 1px solid #fff;
  box-sizing: border-box;
}

.crop-box-move {
  z-index: 9;
  position: absolute;
  cursor: move;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.crop-box-marking-left {
  z-index: 8;
  position: absolute;
  width: 12.5%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  border-right: 1px dashed rgba(255, 111, 111, 0.6);
  left: 0;
  top: 0;
}

.crop-box-marking-right {
  z-index: 8;
  position: absolute;
  width: 12.5%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  border-left: 1px dashed rgba(255, 111, 111, 0.6);
  right: 0;
  top: 0;
}

.crop-box-marking-top {
  z-index: 7;
  position: absolute;
  height: 12.5%;
  width: 100%;
  left: 0;
  top: 0;
}

.crop-box-marking-bottom {
  z-index: 7;
  position: absolute;
  height: 12.5%;
  width: 100%;
  left: 0;
  bottom: 0;
}

.cropper-point {
  position: absolute;
  background-color: #fff;
  height: 12.5px;
  opacity: 1;
  width: 12.5px;
  border-radius: 50%;
  z-index: 10;
}

.point-lt {
  cursor: nwse-resize;
  left: -6px;
  top: -6px;
}

.point-rt {
  cursor: nesw-resize;
  right: -6px;
  top: -6px;
}

.point-lb {
  cursor: nesw-resize;
  left: -6px;
  bottom: -6px;
}

.point-rb {
  cursor: nwse-resize;
  right: -6px;
  bottom: -6px;
}

.marking {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
}

.tips-wrp {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: var(--text2);
  margin-top: 12px;
}

.cropper-body-right {
  position: absolute;
  right: 0;
  transform: scale(0.62);
  transform-origin: right 0;
  padding-right: 50px;
}

.preview-item {
  margin-top: 18px;
}

.preview-title {
  margin-bottom: 10px;
  position: relative;
  font-weight: 400;
  text-align: left;
  font-size: 20px;
  color: #19181c;
}

.preview-card {
  width: 224px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.pic169 {
  position: relative;
  overflow: hidden;
  height: 126px;
  width: 100%;
  border-radius: 8px 8px 0 0;
  background-color: var(--graph_bg_regular);
}
.pic43 {
  position: relative;
  overflow: hidden;
  height: 168px;
  width: 100%;
  border-radius: 8px 8px 0 0;
  background-color: var(--graph_bg_regular);
}

.title {
  height: 65px;
  width: 100%;
}

.title span {
  margin: 8px 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #212121;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  word-break: break-all;
}
</style>
