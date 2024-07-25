<template>
  <div class="cropper" ref="cropperRef">
    <canvas ref="cropperCanvasRef" style="display: none"></canvas>
    <img :src="imgUrl" alt="" />
    <div
      class="showPosition"
      ref="showPositionRef"
      :style="`top: ${originHeightOffset + 1}px;
                left: ${originWidthOffset + 1}px;
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
        <!-- 左上控块 -->
        <div
          class="cropper-point point-lt"
          @mousedown="(e) => startResize('lt', e)"
          @touchstart="(e) => startResize('lt', e.touches[0])"
        ></div>
        <!-- 右上控块 -->
        <div
          class="cropper-point point-rt"
          @mousedown="(e) => startResize('rt', e)"
          @touchstart="(e) => startResize('rt', e.touches[0])"
        ></div>
        <!-- 左下控块 -->
        <div
          class="cropper-point point-lb"
          @mousedown="(e) => startResize('lb', e)"
          @touchstart="(e) => startResize('lb', e.touches[0])"
        ></div>
        <!-- 右下控块 -->
        <div
          class="cropper-point point-rb"
          @mousedown="(e) => startResize('rb', e)"
          @touchstart="(e) => startResize('rb', e.touches[0])"
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
</template>

<script setup lang="ts">
const cropBoxMoveRef = ref();
const cropBoxRef = ref();
const showPositionRef = ref();
const cropperCanvasRef = ref();
const cropperRef = ref();
const state = reactive({
  cropperWidth: 0, // 整个裁剪组件的宽，挂载时获取
  cropperHeight: 0, // 整个裁剪组件的高，挂载时获取
  width: 1, // 原图的宽
  height: 1, // 原图的高
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
const props = defineProps<{
  imgUrl: string; // 图片映射地址
  wrapWidth: number; // 预览容器宽
  wrapHeight: number; // 预览容器高
  prevWidth: number; // 预览图实际宽
  prevHeight: number; // 预览图实际高
  prevOffsetX: number; // 预览图水平偏移量
  prevOffsetY: number; // 预览图垂直偏移量
  cutOrder: boolean;
}>();
const emit = defineEmits([
  'update:prevWidth',
  'update:prevHeight',
  'update:prevOffsetX',
  'update:prevOffsetY',
  'update:cutOrder',
  'cut',
]);

onMounted(() => {
  const cropperEl = cropperRef.value;
  state.cropperWidth = cropperEl.clientWidth; // 减去左右边线的宽度
  state.cropperHeight = cropperEl.clientHeight; // 减去上下边线的高度
  updateOrigin(); // 初始化原图宽高
  initDrag(); // 初始化拖动，开启监听事件
});

const originAspectRatio = computed(() => state.width / state.height);
// 计算原图呈现宽
const originShowWidth = computed(() => {
  // 如果原图较高，重新计算呈现宽，否则就等于组件宽
  if (originAspectRatio.value < state.cropperWidth / state.cropperHeight) {
    return state.cropperHeight * originAspectRatio.value;
  } else {
    return state.cropperWidth;
  }
});
// 计算原图呈现高
const originShowHeight = computed(() => {
  // 如果原图较宽，重新计算呈现高，否则就等于组件高
  if (originAspectRatio.value > state.cropperWidth / state.cropperHeight) {
    return state.cropperWidth / originAspectRatio.value;
  } else {
    return state.cropperHeight;
  }
});
// 计算原图相对 cropper 的宽偏移量
const originWidthOffset = computed(() => {
  // 如果原图较高，计算左右偏移量，否则就0
  if (originAspectRatio.value < state.cropperWidth / state.cropperHeight) {
    // 先根据固定高计算呈现宽
    const showWidth = state.cropperHeight * originAspectRatio.value;
    return (state.cropperWidth - showWidth) / 2;
  } else {
    return 0;
  }
});
// 计算原图相对 cropper 的高偏移量
const originHeightOffset = computed(() => {
  // 如果原图较宽，计算上下偏移量，否则就0
  if (originAspectRatio.value > state.cropperWidth / state.cropperHeight) {
    // 先根据固定宽计算呈现高
    const showHeight = state.cropperWidth / originAspectRatio.value;
    return (state.cropperHeight - showHeight) / 2;
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
const cutHeight = computed(() => {
  return Math.floor((state.boxHeight / originShowHeight.value) * state.height);
});

// 计算 wrapWidth:wrapHeight 预览图相关
// 实际宽度
const cPrevWidth = computed(() => {
  return props.wrapWidth * (originShowWidth.value / state.boxWidth);
});
// 实际高度
const cPrevHeight = computed(() => {
  return props.wrapHeight * (originShowHeight.value / state.boxHeight);
});
// 实际偏移X
const cPrevOffsetX = computed(() => {
  return cPrevWidth.value * (state.boxLeft / originShowWidth.value);
});
// 实际偏移Y
const cPrevOffsetY = computed(() => {
  return cPrevHeight.value * (state.boxTop / originShowHeight.value);
});
// 图片更换时更新原图宽高值，并且更新裁剪框呈现
const updateOrigin = () => {
  const img = new Image();
  img.src = props.imgUrl;
  img.onload = () => {
    state.width = img.width;
    state.height = img.height;
    setTimeout(() => {
      initBox(); // 初始化裁剪框
    }, 0); // 异步等待初始值更新完
  };
};
// 初始化裁剪框
const initBox = () => {
  // 如果是较宽图片，以原图呈现高初始化
  if (originAspectRatio.value > state.cropperWidth / state.cropperHeight) {
    state.boxHeight = 0.9 * originShowHeight.value;
    state.boxWidth = state.boxHeight * (props.wrapWidth / props.wrapHeight);
    state.boxTop = (originShowHeight.value - state.boxHeight) / 2;
    state.boxLeft = (state.cropperWidth - state.boxWidth) / 2;
  }
  // 否则以原图呈现宽初始化
  else {
    state.boxWidth = 0.9 * originShowWidth.value;
    state.boxHeight = state.boxWidth / (props.wrapWidth / props.wrapHeight);
    state.boxTop = (state.cropperHeight - state.boxHeight) / 2;
    state.boxLeft = (originShowWidth.value - state.boxWidth) / 2;
  }
};
// 初始化拖动
const initDrag = () => {
  const cropBoxMove = cropBoxMoveRef.value; // 获取crop-box-move元素
  const cropBox = cropBoxRef.value; // 获取crop-box元素
  const showPosition = showPositionRef.value; // 获取showPosition元素

  let isDragging = false; // 是否正在拖动
  let offsetX: number, offsetY: number;

  // 鼠标按下事件处理程序
  cropBoxMove.addEventListener(
    'mousedown',
    (e: { clientX: number; clientY: number }) => {
      isDragging = true;
      offsetX = e.clientX - cropBox.getBoundingClientRect().left; // 鼠标相对crop-box的X偏移
      offsetY = e.clientY - cropBox.getBoundingClientRect().top; // 鼠标相对crop-box的Y偏移
    },
  );

  // 鼠标移动事件处理程序
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    // 计算新的crop-box位置
    let left = e.clientX - offsetX - showPosition.getBoundingClientRect().left;
    let top = e.clientY - offsetY - showPosition.getBoundingClientRect().top;

    // 限制crop-box在showPosition内部
    left = Math.max(0, left);
    left = Math.min(showPosition.offsetWidth - cropBox.offsetWidth, left);
    top = Math.max(0, top);
    top = Math.min(showPosition.offsetHeight - cropBox.offsetHeight, top);

    // 设置新位置
    state.boxLeft = left;
    state.boxTop = top;
  });

  // 鼠标释放事件处理程序
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
};
// 开始缩放
const startResize = (resizeDirection: string, event: { clientX: number }) => {
  state.isResizing = true;
  state.resizeDirection = resizeDirection;
  // 记录按下时的状态
  state.startX = event.clientX;
  state.startBoxWidth = state.boxWidth;
  state.startBoxHeight = state.boxHeight;
  state.startBoxLeft = state.boxLeft;
  state.startBoxTop = state.boxTop;
  // 添加全局事件监听器
  window.addEventListener('mousemove', resize);
  window.addEventListener('touchmove', resize);
  window.addEventListener('mouseup', stopResize);
  window.addEventListener('touchend', stopResize);
};
// 缩放中
const resize = (event: {
  touches: string | any[];
  clientX: any;
  preventDefault: () => void;
}) => {
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
    const newHeight = newWidth / (props.wrapWidth / props.wrapHeight);
    const newTop = state.startBoxTop + (state.startBoxHeight - newHeight);
    // 边界检查
    if (
      newHeight >= 5 &&
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
    const newHeight = newWidth / (props.wrapWidth / props.wrapHeight);
    const newTop = state.startBoxTop + (state.startBoxHeight - newHeight);
    // 边界检查
    if (
      newHeight >= 5 &&
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
    const newHeight = newWidth / (props.wrapWidth / props.wrapHeight);
    // 边界检查
    if (
      newHeight >= 5 &&
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
    const newHeight = newWidth / (props.wrapWidth / props.wrapHeight);
    // 边界检查
    if (
      newHeight >= 5 &&
      newWidth + state.startBoxLeft <= originShowWidth.value &&
      state.startBoxTop + newHeight <= originShowHeight.value
    ) {
      state.boxWidth = newWidth;
      state.boxHeight = newHeight;
    }
  }
  // 阻止默认事件
  if (!(event.touches && event.touches.length > 0)) {
    event.preventDefault();
  }
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
  img.src = props.imgUrl;
  const canvas = cropperCanvasRef.value;
  canvas.width = cutWidth.value;
  canvas.height = cutHeight.value;
  const ctx = canvas.getContext('2d');
  img.onload = () => {
    ctx.drawImage(
      img,
      cutOffsetX.value,
      cutOffsetY.value,
      cutWidth.value,
      cutHeight.value,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    emit('update:cutOrder', false); // 裁剪完改回false
    emit('cut', canvas.toDataURL('image/jpeg'));
  };
};

watch(
  () => props.imgUrl,
  (current) => {
    if (current) {
      updateOrigin();
    }
  },
);
watch(
  () => props.cutOrder,
  (current) => {
    console.log(current);
    if (current) {
      cut(); // true就开始裁剪函数
    }
  },
);
watch(cPrevWidth, (current) => {
  emit('update:prevWidth', current);
});
watch(cPrevHeight, (current) => {
  emit('update:prevHeight', current);
});
watch(cPrevOffsetX, (current) => {
  emit('update:prevOffsetX', current);
});
watch(cPrevOffsetY, (current) => {
  emit('update:prevOffsetY', current);
});
</script>

<style scoped>
.cropper {
  height: 100%;
  width: 100%;
  background-color: #000;
  border-radius: 4px;
  border: 1px solid #e5e9ef;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.cropper > img {
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

.cropper-point {
  position: absolute;
  background-color: #f6f7f8;
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
</style>
