<template>
  <div class="player-progress-area">
    <div
      class="player-progress-wrap"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="progressRef"
    >
      <div class="player-progress" :class="isActive ? 'state-active' : ''">
        <div class="player-progress-schedule-wrap">
          <div class="player-progress-schedule">
            <div
              class="player-progress-schedule-buffer"
              :style="`transform: scaleX(${bufferPer});`"
            ></div>
            <div
              class="player-progress-schedule-current"
              :style="`transform: scaleX(${currentPer});`"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
let inTimer; // 节流计时器
let outTimer;
const progressRef = ref();
const isActive = ref(false);
const isDragging = ref(false);
const emit = defineEmits(['changeCurrent']);
const props = withDefaults(
  defineProps<{
    bufferPer?: number;
    currentPer?: number;
    activing?: boolean;
  }>(),
  {
    bufferPer: 0.00001,
    currentPer: 0.00001,
    activing: false,
  },
);

const handleMouseEnter = () => {
  inTimer = setTimeout(() => {
    isActive.value = true;
  }, 200);
};
const handleMouseLeave = () => {
  clearTimeout(inTimer); // 清除显示计时器防止快速经过时的闪烁
  if (!isDragging.value) {
    outTimer = setTimeout(() => {
      isActive.value = false;
    }, 50);
  }
};

onMounted(() => {
  console.log(props.activing);
  initDrag();
});

watch(
  () => props.activing,
  (newVal, oldVal) => {
    clearTimeout(outTimer);
    isDragging.value = newVal;
    isActive.value = newVal;
  },
);

// 初始化拖动
const initDrag = () => {
  const progress = progressRef.value;
  let offsetX, currPer;

  // 鼠标按下事件处理程序
  progress.addEventListener('mousedown', (e) => {
    isDragging.value = true;
    isActive.value = true;
    offsetX = e.clientX - progress.getBoundingClientRect().left; // 鼠标相对进度条左侧的X偏移
    currPer = offsetX / progress.getBoundingClientRect().width; // 计算进度比例

    emit('changeCurrent', currPer); // 更新
  });

  // 鼠标移动事件处理程序
  document.addEventListener('mousemove', (e) => {
    if (!isDragging.value) return;
    offsetX = e.clientX - progress.getBoundingClientRect().left; // 鼠标相对进度条左侧的X偏移
    currPer = offsetX / progress.getBoundingClientRect().width; // 计算进度比例
    // 边界值判定
    currPer = Math.max(0.00001, currPer);
    currPer = Math.min(0.99999, currPer);
    emit('changeCurrent', currPer); // 更新
  });
  // 鼠标释放事件处理程序
  document.addEventListener('mouseup', () => {
    isDragging.value = false;
    isActive.value = false;
  });
};
</script>

<style scoped>
.player-progress-area {
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.player-progress-wrap {
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 16px;
  padding-bottom: 6px;
}

.player-progress {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 2px;
  position: relative;
  width: 100%;
}

.state-active {
  height: 4px;
}

.player-progress-schedule-wrap {
  position: absolute;
  height: 100%;
  width: 100%;
}

.player-progress-schedule {
  background-color: hsla(0, 0%, 100%, 0.2);
  border-radius: 1.5px;
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
}

.player-progress-schedule-buffer {
  background-color: hsla(0, 0%, 100%, 0.3);
}

.player-progress-schedule-current {
  background-color: var(--brand_pink);
}

.player-progress-schedule-buffer,
.player-progress-schedule-current {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
</style>
