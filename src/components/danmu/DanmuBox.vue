<template>
  <div class="danmu-box" :class="{ 'is-open': state.isOpen }">
    <div class="box-header" @click="changeBoxState">
      <div class="arrow">
        <el-icon class="icon-xiajiantou">
          <ArrowDown />
        </el-icon>
      </div>
      <div class="title">弹幕列表</div>
    </div>
    <div class="box-body" id="danmu-box-body" ref="boxRef" style="height: 0px">
      <div :style="`height: ${boxHeight - 44}px; overflow: hidden;`">
        <div class="table-header">
          <div
            class="btn-time"
            @click="handleResort(useDanmu.sortType === 1 ? 2 : 1)"
          >
            时间
            <span
              class="btn-icon"
              :style="
                useDanmu.sortType === 2 ? 'transform: rotate(180deg);' : ''
              "
            >
              <svg
                v-if="useDanmu.sortType === 1 || useDanmu.sortType === 2"
                t="1703521678193"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4190"
                id="mx_n_1703521678194"
                width="100%"
                height="100%"
              >
                <path
                  d="M513.14147073 768.58829205c-12.66872461 0-24.8085135-5.09964346-33.67662059-14.14942196L70.7988117 337.4625982c-18.22977994-18.59794446-17.92753049-48.45304726 0.67202119-66.68121997 18.59794446-18.22656391 48.45465606-17.92753049 66.68121997 0.67202117l374.98941787 382.6147692L888.13089019 271.4533994c18.22656391-18.60116048 48.08005952-18.90501713 66.68121996-0.67202117 18.60116048 18.22977994 18.90180111 48.08327553 0.67202117 66.68121997L546.81809132 754.43887009C537.94998425 763.4886486 525.81180415 768.58829205 513.14147073 768.58829205z"
                  p-id="4191"
                ></path>
              </svg>
            </span>
          </div>
          <div
            class="btn-text"
            @click="handleResort(useDanmu.sortType === 3 ? 4 : 3)"
          >
            弹幕内容
            <span
              class="btn-icon"
              :style="
                useDanmu.sortType === 4 ? 'transform: rotate(180deg);' : ''
              "
            >
              <svg
                v-if="useDanmu.sortType === 3 || useDanmu.sortType === 4"
                t="1703521678193"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4190"
                id="mx_n_1703521678194"
                width="100%"
                height="100%"
              >
                <path
                  d="M513.14147073 768.58829205c-12.66872461 0-24.8085135-5.09964346-33.67662059-14.14942196L70.7988117 337.4625982c-18.22977994-18.59794446-17.92753049-48.45304726 0.67202119-66.68121997 18.59794446-18.22656391 48.45465606-17.92753049 66.68121997 0.67202117l374.98941787 382.6147692L888.13089019 271.4533994c18.22656391-18.60116048 48.08005952-18.90501713 66.68121996-0.67202117 18.60116048 18.22977994 18.90180111 48.08327553 0.67202117 66.68121997L546.81809132 754.43887009C537.94998425 763.4886486 525.81180415 768.58829205 513.14147073 768.58829205z"
                  p-id="4191"
                ></path>
              </svg>
            </span>
          </div>
          <div
            class="btn-date"
            @click="handleResort(useDanmu.sortType === 5 ? 6 : 5)"
          >
            发送时间
            <span
              class="btn-icon"
              :style="
                useDanmu.sortType === 6 ? 'transform: rotate(180deg);' : ''
              "
            >
              <svg
                v-if="useDanmu.sortType === 5 || useDanmu.sortType === 6"
                t="1703521678193"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4190"
                id="mx_n_1703521678194"
                width="100%"
                height="100%"
              >
                <path
                  d="M513.14147073 768.58829205c-12.66872461 0-24.8085135-5.09964346-33.67662059-14.14942196L70.7988117 337.4625982c-18.22977994-18.59794446-17.92753049-48.45304726 0.67202119-66.68121997 18.59794446-18.22656391 48.45465606-17.92753049 66.68121997 0.67202117l374.98941787 382.6147692L888.13089019 271.4533994c18.22656391-18.60116048 48.08005952-18.90501713 66.68121996-0.67202117 18.60116048 18.22977994 18.90180111 48.08327553 0.67202117 66.68121997L546.81809132 754.43887009C537.94998425 763.4886486 525.81180415 768.58829205 513.14147073 768.58829205z"
                  p-id="4191"
                ></path>
              </svg>
            </span>
          </div>
        </div>
        <div class="table-body" :style="`height: ${boxHeight - 115}px;`">
          <ul class="dm-list">
            <li
              class="dm-item"
              v-for="(item, index) in useDanmu.dataList"
              :key="index"
            >
              <div
                class="dm-info-row"
                @dblclick="handleDblClick(item.timePoint)"
              >
                <span class="dm-info-time">
                  {{ handleTime(item.timePoint) }}
                </span>
                <span class="dm-info-text" :title="item.content">
                  {{ item.content }}
                </span>
                <span class="dm-info-date">
                  {{ handleDateTime2(item.createDate) }}
                </span>
                <span class="dm-info-report-btn" @dblclick.stop="stopOption">
                  举报
                </span>
                <!-- <span
                  class="dm-info-delete-btn"
                  v-if="
                    this.$store.state.user.uid &&
                    (authorId === this.$store.state.user.uid ||
                      item.uid === this.$store.state.user.uid)
                  "
                  @click.stop="beforeDelete(item.id)"
                  @dblclick.stop="stopOption"
                >
                  删除
                </span> -->
              </div>
            </li>
          </ul>
        </div>
        <div class="table-footer">
          <div class="btn-history">
            查看历史弹幕
            <!-- 日历组件 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleTime, handleDateTime2 } from '@/utils/utils.js';
import { useDanmuStore } from '@/stores/modules/danmu';
import { defineProps, reactive, ref } from 'vue';
const useDanmu = useDanmuStore();
const props = defineProps({
  boxHeight: {
    type: Number,
    default() {
      return 442;
    },
  },
});
const boxRef = ref();
const state = reactive({
  isOpen: false, // 是否展开
  sortType: 0, // 排序方式 0默认日期升序 1时间升序 2时间降序 3内容升序 4内容降序 5日期升序 6日期降序
  dmList: [], // 弹幕列表
});
const changeBoxState = () => {
  state.isOpen = !state.isOpen;
  const boxBody = boxRef.value;
  if (state.isOpen) {
    boxBody.style.cssText = `height: ${props.boxHeight - 44}px;`;
    setTimeout(() => {
      boxBody.style.cssText = '';
    }, 300);
  } else {
    boxBody.style.cssText = `height: ${props.boxHeight - 44}px;`;
    setTimeout(() => {
      boxBody.style.cssText = 'height: 0px;';
    }, 0);
  }
};
// 改变排序方式
const handleResort = (type: number) => {
  useDanmu.sortType = type;
  useDanmu.updataList(useDanmu.dataList, type);
};
// 双击弹幕跳转播放
const handleDblClick = (time: any) => {
  //   this.$emit('jump', time > 0.5 ? time - 0.5 : 0);
};
const stopOption = () => {
  return;
};
</script>

<style scoped>
.danmu-box {
  width: 100%;
  margin-bottom: 18px;
  position: relative;
  min-height: 44px;
  border-radius: 6px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.box-header {
  background: #f1f2f3;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: var(--text1);
  cursor: pointer;
  height: 100%;
  position: relative;
  width: 100%;
}

.box-header,
.arrow {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  vertical-align: middle;
}

.arrow {
  bottom: 0;
  height: 14px;
  margin: auto;
  position: absolute;
  right: 16px;
  top: 0;
}

.arrow .icon-xiajiantou {
  transition: transform 0.3s;
  transform: rotate(0);
  font-weight: 600;
}

.is-open .arrow .icon-xiajiantou {
  transform: rotate(180deg);
}

.title {
  font-size: 15px;
  font-weight: 500;
  height: 44px;
  line-height: 44px;
  padding: 0 10px 0 16px;
  position: relative;
}

.box-body {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-transition: height 0.3s;
  transition: height 0.3s;
  width: 100%;
  background-color: #fff;
  position: relative;
}

.table-header {
  background-color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.btn-time,
.btn-text,
.btn-date {
  border: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: var(--text2);
  fill: var(--text2);
  cursor: pointer;
  display: inline-block;
  font-size: 12px;
  height: 32px;
  line-height: 32px;
  padding: 0 6px;
  position: relative;
}

.btn-time {
  padding-left: 16px;
  padding-right: 0;
  text-align: left;
  width: 60px;
}

.btn-text {
  -webkit-box-flex: 1;
  -ms-flex: auto;
  flex: auto;
  text-align: left;
}

.btn-date {
  text-align: left;
  width: 88px;
}

.btn-icon {
  display: inline-block;
  font-size: 0;
  height: 10px;
  line-height: 0;
  position: absolute;
  right: 5px;
  top: 11px;
  -webkit-transform-origin: center;
  transform-origin: center;
  width: 10px;
}

.btn-date .btn-icon {
  right: 16px;
}

.table-body {
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #fff;
}

.table-body::-webkit-scrollbar {
  width: 6px;
}

.table-body::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #ccc;
}

.dm-list {
  width: 100%;
}

ul {
  list-style: none;
  outline: none;
}

.dm-item {
  height: 24px;
}

.dm-info-row {
  color: var(--text2);
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  position: relative;
}

.dm-info-row span {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  padding: 0 6px;
  pointer-events: none;
  vertical-align: top;
}

.dm-info-time {
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  overflow: hidden;
  padding-left: 16px !important;
  position: relative;
  text-align: left;
  width: 66px;
}

.dm-info-text {
  -webkit-box-flex: 1;
  color: var(--text2);
  -ms-flex: auto;
  flex: auto;
  overflow: hidden;
  pointer-events: auto !important;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dm-info-date {
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  overflow: hidden;
  white-space: nowrap;
  width: 82px;
  padding-right: 0 !important;
}

.dm-info-row:hover .dm-info-date {
  display: none;
}

.dm-info-report-btn,
.dm-info-delete-btn {
  background: #fff;
  border: 1px solid var(--brand_pink);
  border-radius: 2px;
  color: var(--brand_pink);
  display: none !important;
  height: 20px;
  line-height: 20px;
  margin-left: 10px;
  pointer-events: auto !important;
  position: absolute;
  right: 10px;
  text-align: center;
  top: 1px;
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;
  width: 70px;
}

.dm-info-delete-btn {
  right: 90px;
}

.dm-info-row:hover .dm-info-report-btn,
.dm-info-row:hover .dm-info-delete-btn {
  display: inline-block !important;
}

.dm-info-report-btn:hover,
.dm-info-delete-btn:hover {
  background-color: var(--brand_pink);
  color: #fff;
}

.table-footer {
  cursor: not-allowed;
  height: 31px;
  margin-top: 8px;
  position: relative;
  width: auto;
  z-index: 2;
}

.btn-history {
  background-color: #f1f2f3;
  border-radius: 6px;
  color: var(--text2);
  cursor: pointer;
  height: 31px;
  line-height: 31px;
  text-align: center;
  width: 100%;
}
</style>
