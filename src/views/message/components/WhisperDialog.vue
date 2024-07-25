<!--
 * @Author: YourName
 * @Date: 2024-06-17 11:20:21
 * @LastEditTime: 2024-06-23 06:14:22
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_web\src\views\message\components\WhisperDialog.vue
 * 版权声明
-->
<template>
  <div class="dialog">
    <div class="title">
      <span>{{ state.user.nickname }}</span>
      <div class="action-menu"></div>
    </div>
    <!-- 聊天记录组件 -->
    <message-list :mid="state.mid"></message-list>
    <!-- 发送框 -->
    <div class="send-box">
      <div class="row">
        <div class="space-margin emoji" ref="emojiRef">
          <svg
            t="1702369380130"
            @click="state.emojiBoxShow = !state.emojiBoxShow"
            class="icon"
            title="表情"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4229"
            id="mx_n_1702369380130"
            width="24"
            height="24"
          >
            <path
              d="M512 989.866667C249.173333 989.866667 34.133333 776.533333 34.133333 512 34.133333 249.173333 249.173333 34.133333 512 34.133333s477.866667 215.04 477.866667 477.866667c0 264.533333-215.04 477.866667-477.866667 477.866667z m0-904.533334C276.48 85.333333 85.333333 276.48 85.333333 512s191.146667 426.666667 426.666667 426.666667 426.666667-191.146667 426.666667-426.666667S747.52 85.333333 512 85.333333z"
              p-id="4230"
            ></path>
            <path
              d="M512 783.75822187c-136.53333333 0-191.14666667-107.40622187-192.96711147-111.0471104-3.64088853-9.10222187-3.64088853-18.2044448 1.8204448-27.30666667 5.46133333-7.28177813 14.5635552-12.74311147 23.66577814-12.74311146h338.60266666c9.10222187 0 18.2044448 5.46133333 23.66577707 12.74311146 5.46133333 7.28177813 5.46133333 18.2044448 1.8204448 27.30666667-5.46133333 3.64088853-60.07466667 111.04711147-196.608 111.0471104z m-112.8675552-96.4835552c23.66577813 20.02488853 60.07466667 41.87022187 112.8675552 41.87022187 52.79288853 0 89.20177813-21.84533333 112.8675552-41.87022187H399.1324448zM704.96711147 494.3075552c-7.28177813 0-14.5635552-1.8204448-20.0248896-7.28177706l-72.81777707-72.81777814c-10.92266667-10.92266667-10.92266667-27.30666667 0-38.22933333l72.81777707-72.81777813c10.92266667-10.92266667 27.30666667-10.92266667 38.22933333 0 10.92266667 10.92266667 10.92266667 27.30666667 0 38.22933333l-52.79288853 52.7928896 52.79288853 52.79288853c10.92266667 10.92266667 10.92266667 27.30666667 0 38.22933334-3.64088853 7.28177813-10.92266667 9.10222187-18.20444373 9.10222186zM319.03288853 494.3075552c-7.28177813 0-14.5635552-1.8204448-20.02488853-7.28177706-10.92266667-10.92266667-10.92266667-27.30666667 0-38.22933334l52.79288853-52.7928896-52.79288853-52.79288853c-10.92266667-10.92266667-10.92266667-27.30666667 0-38.22933333 10.92266667-10.92266667 27.30666667-10.92266667 38.22933333 0l72.81777814 72.81777813c10.92266667 10.92266667 10.92266667 27.30666667 0 38.22933333l-72.81777814 72.81777707c-3.64088853 3.64088853-10.92266667 5.46133333-18.2044448 5.46133333z"
              p-id="4231"
            ></path>
          </svg>
          <!-- 表情选择组件 -->
          <emoji-box
            v-model:show="state.emojiBoxShow"
            @insertEmoji="insertEmoji"
          ></emoji-box>
        </div>
      </div>
      <!-- 自制输入框 可识别转换表情  -->
      <!-- 不建议复制，要的话一定要纯文本，否则会有奇怪的标签 -->
      <div class="input-box">
        <div
          ref="editorRef"
          class="core-style"
          contenteditable="true"
          @input="handleInput"
          @compositionstart="state.isComposite = true"
          @compositionend="compositionend"
          @click="(e) => handleEditorClick(e)"
          @keydown="handleKeyDown"
          @paste="handlePaste"
          style="height: 60px"
        ></div>
        <div class="indicator">
          <span :class="{ 'too-much': state.input.length > 500 }">
            {{ state.input.length }}
          </span>
          /
          <span>500</span>
        </div>
      </div>
      <div class="row right">
        <button
          class="btn-box send-btn"
          @click="sendMsg"
          :title="`enter 发送\nshift + enter 换行`"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="WhisperDialog">
import { reactive, ref } from 'vue';
import { useUserStore } from '@/stores/modules/user';
import { useMessageStore } from '@/stores/modules/message';
import EmojiJson from '@/assets/json/emoji.json';
import { updateWhisperOnline, updateWhisperOutline } from '@/api/message';
import { useSocketStore } from '@/stores/modules/websocket';
const route = useRoute();
const useUser = useUserStore();
const useMessage = useMessageStore();
const useSocket = useSocketStore();
const editorRef = ref();
const emojiRef = ref();
const escapeRegExp = (string: string) => {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
};
const state = reactive({
  baseUrl: window.location.origin,
  mid: 0, // 当前聊天的对象的uid
  // 当前聊天的对象的用户信息 这里只列出相关列用于页面挂载，挂载后会整个user更新
  user: {
    uid: null as null | number,
    nickname: '',
  },
  myId: null as null | number, // 暂存自己的uid 以便登录过期时可以发送离线请求
  emojiBoxShow: false, // 表情框显示的双向绑定
  input: '', // 保存输入的内容
  emojiMap: EmojiJson, // 表情列表
  isComposite: false, // 是否正在输入中文
  rangeOfEditor: null as null | Range, // 保存光标位置
});
// 更新对方用户 以及缓存自己的id
const updateUser = () => {
  let i = useMessage.chatList.findIndex((item) => item.user.uid === state.mid);
  state.user = useMessage.chatList[i].user;
  state.myId = useMessage.chatList[i].chat.anotherId;
};

// 更新窗口在线状态
const updateOnline = async () => {
  console.log('加入新窗口');
  await updateWhisperOnline({
    from: state.user.uid,
    to: state.myId,
  });
};
// 更新聊天窗口离开状态
const updateOutline = async () => {
  console.log('离开当前窗口');
  await updateWhisperOutline({
    from: state.user.uid,
    to: state.mid,
  });
};

// 发送消息
const sendMsg = () => {
  if (state.user.uid === useUser.userinfo.uid) {
    ElMessage.error('不能给自己发消息哦~');
    return;
  }
  if (state.input.length > 500) {
    ElMessage.error('字数超过限制');
    return;
  } else if (state.input.length === 0) {
    ElMessage.error('随便说点吧');
    return;
  }
  if (!useSocket.exhibitWs) {
    ElMessage.error('服务已断开，请刷新后尝试');
    return;
  }

  const msgJson = {
    code: 101,
    anotherId: state.user.uid,
    content: state.input,
  };

  useSocket.exhibitWs.send(msgJson);

  // 清空文本
  editorRef.value.innerHTML = '';
  state.input = '';
};

///////// 事件 /////////
// 初始化内容
const init = () => {
  // 清空文本
  editorRef.value.innerHTML = '';
  state.input = '';
  state.rangeOfEditor = null;
};

// 点击空白处关闭表情框
const handleOutsideClick = (event: any) => {
  const emoji = emojiRef.value;
  if (emoji && !emoji.contains(event.target)) {
    state.emojiBoxShow = false;
  }
};

// 处理输入事件 将图片的HTML换成表情代号
const handleInput = () => {
  if (state.isComposite) return; // 如果正在输入拼音 就终止触发函数

  const editorContent = editorRef.value.innerHTML;
  let updatedContent = editorContent.toString();

  // 替换带有图片的HTML为表情代号
  for (var i = 0; i < state.emojiMap.length; i++) {
    const emojiCode = state.emojiMap[i].name;
    const emojiUrl = state.emojiMap[i].url;
    const emojiImgTag = `<img src="${emojiUrl}" alt="${emojiCode}" title="${emojiCode}" class="msg-input_emoji" contenteditable="false" draggable="false">`;
    const emojiImgTagCopy = `<img src="${state.baseUrl}${emojiUrl}" alt="${emojiCode}" title="${emojiCode}" class="msg-input_emoji" contenteditable="false" draggable="false" style="font-family: &quot;Harmony Font&quot;; font-size: 14px;">`;
    const emojiTmgTagCopy2 = `<img src="${state.baseUrl}${emojiUrl}" alt="${emojiCode}" title="${emojiCode}"  class="msg-input_emoji" contenteditable="false" draggable="false" style="background-color: transparent; font-size: 14px; font-family: &quot;Harmony Font&quot;;">`;
    const emojiTmgTagCopy3 = `<img src="${emojiUrl}" alt="${emojiCode}" title="${emojiCode}" class="msg-input_emoji" contenteditable="false" draggable="false" style="background-color: transparent; font-size: 14px; font-family: &quot;Harmony Font&quot;;">`;
    // 全部替换
    updatedContent = updatedContent.replace(
      new RegExp(escapeRegExp(emojiImgTag), 'g'),
      emojiCode,
    );
    updatedContent = updatedContent.replace(
      new RegExp(escapeRegExp(emojiImgTagCopy), 'g'),
      emojiCode,
    );
    updatedContent = updatedContent.replace(
      new RegExp(escapeRegExp(emojiTmgTagCopy2), 'g'),
      emojiCode,
    );
    updatedContent = updatedContent.replace(
      new RegExp(escapeRegExp(emojiTmgTagCopy3), 'g'),
      emojiCode,
    );
  }

  // 替换隐藏的<span>标签 复制的内容可能会有携带 (不建议复制，要的话一定要纯文本，否则会有奇怪的标签)
  const spanStart = '<span style="background-color: transparent;">';
  const spanEnd = '</span>';
  const br = '<br>';
  const divStart = '<div>';
  const divEnd = '</div>';
  updatedContent = updatedContent.replace(
    new RegExp(escapeRegExp(spanStart), 'g'),
    '',
  );
  updatedContent = updatedContent.replace(
    new RegExp(escapeRegExp(spanEnd), 'g'),
    '',
  );
  updatedContent = updatedContent.replace(
    new RegExp(escapeRegExp(br), 'g'),
    '',
  );
  updatedContent = updatedContent.replace(
    new RegExp(escapeRegExp(divStart), 'g'),
    '',
  );
  updatedContent = updatedContent.replace(
    new RegExp(escapeRegExp(divEnd), 'g'),
    '',
  );

  // 更新格式化后的 input 数据
  state.input = updatedContent;
};

// 在光标位置插入表情代号
const insertEmoji = (emoji: any) => {
  // 构建图标元素
  const img = document.createElement('img');

  img.src = emoji.url;
  img.alt = emoji.name;
  img.title = emoji.name;
  img.classList.add('msg-input_emoji');
  img.contentEditable = 'false';
  img.draggable = false;
  // 如果从未点过文本框就设置光标位置到文本框
  if (!state.rangeOfEditor) {
    state.rangeOfEditor = new Range();
    state.rangeOfEditor.selectNodeContents(editorRef.value);
  }
  // 如果是选择模式
  if (!state.rangeOfEditor.collapsed) {
    if (
      state.rangeOfEditor.startContainer === state.rangeOfEditor.endContainer &&
      state.rangeOfEditor.startContainer.nodeName === '#text' &&
      state.rangeOfEditor.startOffset === 0 &&
      state.rangeOfEditor.endOffset === state.rangeOfEditor.endContainer.length
    ) {
      // 选中同一段文本的全部 删除该段文本元素
      editorRef.value.removeChild(state.rangeOfEditor.endContainer);
    } else if (
      state.rangeOfEditor.startContainer !== state.rangeOfEditor.endContainer &&
      state.rangeOfEditor.startContainer.nodeName === '#text' &&
      state.rangeOfEditor.endContainer.nodeName === '#text' &&
      state.rangeOfEditor.startOffset === 0 &&
      state.rangeOfEditor.endOffset === state.rangeOfEditor.endContainer.length
    ) {
      // 选中不同两段文本之间的全部 删除该两段段文本之间的全部元素
      const childNodesArray = Array.from(editorRef.value.childNodes);
      const i = childNodesArray.indexOf(state.rangeOfEditor.startContainer);
      const j = childNodesArray.indexOf(state.rangeOfEditor.endContainer);
      for (var k = i; k <= j; k++) {
        editorRef.value.removeChild(editorRef.value.childNodes[i]);
      }
    } else {
      // 否则只删除选中内容
      state.rangeOfEditor.deleteContents();
    }
  }
  // 此时有可能光标在一个文本元素中
  if (state.rangeOfEditor.endContainer.nodeName === '#text') {
    const childNodesArray = Array.from(editorRef.value.childNodes);
    const i = childNodesArray.indexOf(state.rangeOfEditor.endContainer);

    if (
      state.rangeOfEditor.endContainer.length === state.rangeOfEditor.endOffset
    ) {
      // 光标在文本末尾 设置光标到编辑器下文本域后边
      let range = new Range();
      range.selectNodeContents(editorRef.value);
      range.setStart(editorRef.value, i + 1);
      range.setEnd(editorRef.value, i + 1);
      range.collapse(true);
      state.rangeOfEditor = range;
    } else if (state.rangeOfEditor.endOffset === 0) {
      // 光标在文本开头 设置光标到编辑器下文本域前边
      let range = new Range();
      range.selectNodeContents(editorRef.value);
      range.setStart(editorRef.value, i);
      range.setEnd(editorRef.value, i);
      range.collapse(true);
      state.rangeOfEditor = range;
    }
  }
  // 光标位置设置好后在这插入图标
  state.rangeOfEditor.insertNode(img);
  state.rangeOfEditor.collapse(false); // 这个我也不知道为什么要设置false，但是true会出bug
  // 将焦点设置回输入框
  editorRef.value.focus();
  if (!document.getSelection()) return;
  document.getSelection().removeAllRanges();
  document.getSelection().addRange(state.rangeOfEditor);
  // 触发input事件
  editorRef.value.dispatchEvent(new Event('input', { bubbles: true }));
};

// 点击输入框中表情 定位光标位置到表情前面
const handleEditorClick = (event: any) => {
  let target = event.target;
  if (target.tagName.toLowerCase() === 'img') {
    let range = new Range();
    range.setStartBefore(target);
    range.collapse(true);
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
  }
};

const handlePaste = async (event: any) => {
  event.preventDefault();
  try {
    const pastedText = await navigator.clipboard.readText();
    insertTextAtCursor(pastedText);
  } catch (error) {
    // console.error('Failed to read clipboard data:', error);
  }
};

const insertTextAtCursor = (text: string) => {
  const selection = window.getSelection();
  if (!selection) return;
  const range = selection.getRangeAt(0);
  // 创建一个新的文本节点并插入到选区中
  const textNode = document.createTextNode(text);
  range.deleteContents();
  range.insertNode(textNode);
  // 将光标移动到插入文本的末尾
  range.setStartAfter(textNode);
  range.setEndAfter(textNode);
  selection.removeAllRanges();
  selection.addRange(range);
};

// 键盘按下按键的回调
const handleKeyDown = (event: any) => {
  // 检查是否按下了 Shift 键
  const isShiftPressed = event.shiftKey;
  // 检查是否按下的是回车键
  if (event.key === 'Enter' && !isShiftPressed) {
    // 阻止默认行为，即防止单按回车键换行
    event.preventDefault();
    // 发送
    sendMsg();
  }
  // 判断退格键 如果前面是个表情就删掉这个表情
  else if (event.key === 'Backspace') {
    const rangeAt = document.getSelection().getRangeAt(0);
    const startContainer = rangeAt.startContainer;
    const endContainer = rangeAt.endContainer;
    if (
      startContainer.nodeName === 'DIV' &&
      endContainer.nodeName === 'DIV' &&
      rangeAt.collapsed &&
      rangeAt.startOffset > 0 &&
      editorRef.value.childNodes[rangeAt.startOffset - 1].nodeName === 'IMG'
    ) {
      event.preventDefault();
      editorRef.value.removeChild(
        editorRef.value.childNodes[rangeAt.startOffset - 1],
      ); // 删除前面的表情
      // 触发input事件
      editorRef.value.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
  // 判断删除键 如果后面是个表情就删掉这个表情
  else if (event.key === 'Delete') {
    const rangeAt = document.getSelection().getRangeAt(0);
    const startContainer = rangeAt.startContainer;
    const endContainer = rangeAt.endContainer;
    if (
      startContainer.nodeName === 'DIV' &&
      endContainer.nodeName === 'DIV' &&
      rangeAt.collapsed &&
      rangeAt.startOffset < editorRef.value.childNodes.length &&
      editorRef.value.childNodes[rangeAt.startOffset].nodeName === 'IMG'
    ) {
      event.preventDefault();
      editorRef.value.removeChild(
        editorRef.value.childNodes[rangeAt.startOffset],
      ); // 删除后面的表情
      // 触发input事件
      editorRef.value.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
};

// 中文输入完成
const compositionend = () => {
  state.isComposite = false;
  handleInput();
};

// 监听选择器变化 如果是在编辑文本框就更新光标位置
const selectionChange = () => {
  let selection = document.getSelection();
  if (!selection) return;
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    if (
      editorRef.value &&
      editorRef.value.contains(range.commonAncestorContainer)
    ) {
      editorRef.value.rangeOfEditor = range;
    }
  }
};
onMounted(async () => {
  state.mid = Number(route.params.mid);
  updateUser();
  await updateOnline();
  window.addEventListener('click', handleOutsideClick);
  document.addEventListener('selectionchange', selectionChange);
  // window.addEventListener('beforeunload', updateOutline); // beforeunload 事件监听标签页关闭
});
onBeforeUnmount(() => {
  console.log(1234567);
  window.removeEventListener('click', handleOutsideClick);
  document.removeEventListener('selectionchange', selectionChange);
  updateOutline();
  // window.removeEventListener('beforeunload', updateOutline);
});

// 监听路由变化打开对应聊天
watch(
  () => route.path,
  async () => {
    await updateOutline(); // 先从原先的离开
    state.mid = Number(route.params.mid);
    if (!route.params.mid) return;
    init();
    updateUser();
    await updateOnline();
  },
);
</script>

<style scoped lang="scss">
.dialog {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  height: 100%;
}

.title {
  height: 36px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: 1px solid #e9eaec;
  position: relative;
  text-align: center;
  color: #333;
}

.title span {
  font-size: 14px;
}

.action-menu {
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 2;
}

.more {
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #999;
}

.send-box {
  height: 162px;
  border-top: 1px solid #d8d8d8;
  border-bottom-right-radius: 4px;
  background-color: #f4f5f7;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding: 0 16px;
  position: relative;
  z-index: 2;
}

.row {
  height: 48px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.space-margin {
  margin-right: 16px;
}

.emoji {
  position: relative;
}

.emoji .icon {
  fill: #999;
  cursor: pointer;
}

.emoji .icon:hover {
  fill: var(--brand_blue);
}

.input-box {
  position: relative;
}

.core-style {
  width: 100%;
  min-height: 22px;
  max-height: 300px;
  letter-spacing: 1px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: pre-wrap;
  overflow-x: hidden;
  overflow-y: auto;
  color: #222;
  background-color: transparent;
  font-size: 14px;
  vertical-align: baseline;
  outline: none;
  line-height: normal;
  border-radius: 4px;
  word-break: break-word;
  word-wrap: break-word;
}
:deep() {
  .msg-input_emoji {
    height: 30px;
  }
}
.core-style:hover,
.core-style:focus,
.core-style:active {
  background: transparent;
}

.core-style::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: rgba(1, 1, 1, 0);
}

.core-style::-webkit-scrollbar-thumb {
  background: #aaa;
  border-radius: 4px;
}

.indicator {
  color: #c0c0c0;
  position: absolute;
  bottom: -32px;
  right: 100px;
  padding: 1px;
  font-size: 12px;
}

.too-much {
  color: #f00;
}

.row {
  height: 48px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.row.right {
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  height: 46px;
}

.btn-box {
  outline: none;
  cursor: pointer;
  margin: 0;
  position: relative;
  width: 88px;
  height: 30px;
  text-align: center;
  border: 1px solid #e7e7e7;
  font-size: 14px;
  line-height: 14px;
}

.send-btn {
  background-color: #fff;
  border-radius: 4px;
  color: #555;
}
</style>
