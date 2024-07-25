<!--
 * @Author: YourName
 * @Date: 2024-05-22 14:35:24
 * @LastEditTime: 2024-06-18 19:00:12
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_web\src\views\video\components\BalaComment.vue
 * 版权声明
-->
<template>
  <div class="comment-container" ref="containerRef">
    <u-comment :config="config" @submit="submit" @like="like" relative-time>
      <!-- <template>用户信息导航栏卡槽</template> -->
      <!-- <template #info>用户信息卡槽</template> -->
      <!-- <template #card>用户信息卡片卡槽</template> -->
      <u-comment-nav v-model="latest" @sorted="sorted"></u-comment-nav>
    </u-comment>
  </div>
</template>

<script setup lang="ts">
import emoji from '@/assets/emoji/emoji';
import { reactive, ref } from 'vue';
import { CommentApi, ConfigApi, SubmitParamApi, UToast } from 'undraw-ui';
import { useUserStore } from '@/stores/modules/user';
import { addComment, getCommentTreeByVid } from '@/api/comment';
import { handleDate } from '@/utils/utils.js';

const props = defineProps(['video', 'up']);
const useUser = useUserStore();
const config = reactive<ConfigApi>({
  user: {
    id: useUser.userinfo.uid,
    username: useUser.userinfo.nickname,
    avatar: useUser.userinfo.avatarUrl,
    likeIds: [],
  },
  emoji: emoji,
  comments: [],
});

const state = reactive({
  disable: false,
  // 当前页数
  pageNum: 1,
  // 页大小
  pageSize: 10,
  more: false,
});

watch(
  () => props.video.vid,
  (newVal) => {
    if (newVal) getCommentData(0);
  },
);

const containerRef = ref();

//排序
const latest = ref(true);
const sorted = (l: boolean) => {
  latest.value = l;
  getCommentData(0);
};

//获取评论
const getCommentData = async (offset: number) => {
  const type = latest.value ? 2 : 1;
  const { result } = await getCommentTreeByVid({
    vid: props.video.vid,
    offset,
    type,
  });
  config.comments = convertComment(result.comments);
  state.more = result.more;
};

const toLogin = () => {};

// 提交评论事件
const submit = async ({
  content,
  parentId,
  files,
  reply,
  finish,
}: SubmitParamApi) => {
  console.log('提交评论: ' + content, parentId, files);
  console.log(reply);
  let rid: number;
  let pid: number;
  let uid: number;
  if (parentId) pid = Number(parentId);
  else pid = 0;
  if (!reply) {
    uid = props.up.uid;
    rid = 0;
  } else {
    uid = Number(reply.uid);
    rid = Number(reply.id);
  }

  const {
    result: { id, replies, parentId: fPid, love, createTime },
  } = await addComment({
    vid: props.video.vid,
    rootId: rid,
    parentId: pid,
    toUserId: uid,
    content: content,
  });

  const comment: CommentApi = {
    id: id,
    parentId: fPid,
    uid: config.user.id,
    address: '来自杭州',
    content,
    likes: love,
    createTime,
    user: {
      username: config.user.username,
      avatar: config.user.avatar,
      homeLink: `/${rid}`,
    },
    reply: null,
  };

  finish(comment);
  UToast({ message: '评论成功!', type: 'info' });
};
// 点赞按钮事件 将评论id返回后端判断是否点赞，然后在处理点赞状态
const like = (id: string, finish: () => void) => {
  console.log('点赞: ' + id);
  setTimeout(() => {
    finish();
  }, 200);
};

const convertComment = (data: any, level = 1) => {
  const comments: CommentApi[] = [];
  data.forEach((item: any) => {
    const comment: CommentApi = {
      id: item.id,
      parentId: item.parentId,
      uid: item.user.uid,
      address: '来自杭州',
      content: item.content,
      likes: item.love,
      createTime: handleUploadDate(item.createTime),
      user: {
        username: item.user.nickname,
        avatar: item.user.avatarUrl,
      },
      reply: null,
    };
    if (item.replies && item.replies.length)
      comment.reply = {
        total: item.replies.length,
        list: convertComment(item.replies, level++),
      };
    comments.push(comment);
  });
  return comments;
};

// 处理投稿时间
const handleUploadDate = (date: any) => {
  return handleDate(date);
};
</script>
<style lang="scss" scoped></style>
