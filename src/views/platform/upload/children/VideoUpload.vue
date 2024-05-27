<!--
 * @Author: YourName
 * @Date: 2024-05-22 17:39:45
 * @LastEditTime: 2024-05-27 23:16:09
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_web\src\views\platform\upload\children\VideoUpload.vue
 * 版权声明
-->
<template>
  <div class="upload-body">
    <!-- 上传前 -->
    <div class="upload-body-content" v-show="!currentVideo">
      <el-upload
        class="upload-wrp"
        drag
        :show-file-list="false"
        :before-upload="handleVideoUploadbefore"
        :auto-upload="true"
        accept="mp4"
      >
        <svg-icon
          name="upload"
          class="el-icon--upload"
          width="85px"
          height="85px"
        ></svg-icon>
        <div class="el-upload__text">拖拽至此处也可上传</div>
        <el-button type="primary" class="el-upload__button">
          点击上传视频
        </el-button>
        <!-- <div class="el-upload__text">当shengheduilie前sheng'he'dui'lie</div> -->
      </el-upload>
      <div class="footer-item">
        <span class="i-list i-1">
          <a target="_blank" class="title">禁止发布的视频内容</a>
        </span>
        <span class="i-list i-1">
          <span class="title">视频大小</span>
          <span class="title-block">
            <span>网页端上传的文件大小上限为300M</span>
            <br />
            <span>视频内容时长最大10小时</span>
            <br />
          </span>
        </span>
        <span class="i-list i-1">
          <span class="title">视频格式</span>
          <span class="title-block">
            <span>网页端、桌面客户端推荐上传的格式为：mp4</span>
            <br />
            <span>暂不允许上传其他格式</span>
            <br />
          </span>
        </span>
        <span class="i-list i-1">
          <span class="title">视频码率</span>
          <span class="title-block">
            <span>推荐视频分辨率：1280*720 或者 1920*1080</span>
            <br />
            <span>网站不提供转码、压制服务</span>
            <br />
          </span>
        </span>
      </div>
      <div class="footer-item">
        <span>
          上传视频，即表示您已同意
          <a target="_blank">balabala使用协议</a>
          与
          <a target="_blank">balabala社区公约</a>
          ，请勿上传色情，反动等违法视频。
        </span>
      </div>
      <div class="footer-item">
        <span class="i-list">第三方工具</span>
        <span class="i-list i-2">
          <svg-icon
            name="uploadMin"
            width="15"
            height="15"
            style="vertical-align: sub"
          ></svg-icon>
          <a
            class="zip"
            href="//dl.hdslb.com/video-press/xiaowantoolsrev194.zip"
          >
            小丸压制工具
          </a>
        </span>
      </div>
    </div>
    <!-- 上传后 -->
    <div class="content" v-show="currentVideo">
      <div class="content-title">
        <div class="content-title-box">
          <div class="content-title-text">发布视频</div>
        </div>
      </div>
      <div class="video-file">
        <div class="title">
          <div class="title-text">{{ video.vname }}</div>
        </div>
        <div class="file">
          <div class="video-icon-wrp">
            <svg-icon name="videoBlue" width="40" height="50"></svg-icon>
          </div>
          <div class="file-detail">
            <el-progress
              :percentage="state.percentage"
              :color="state.isFailed ? 'red' : '#43ce5b'"
              :duration="5"
            >
              <div class="file-status">
                <div class="file-status-left">
                  <div class="file-status-text" v-show="state.isFailed">
                    <svg-icon name="failed" width="20"></svg-icon>
                    <span>上传失败</span>
                  </div>
                  <div
                    class="file-status-text"
                    v-show="state.percentage < 100 && !state.isFailed"
                  >
                    <svg-icon name="uploading" width="20"></svg-icon>
                    <span>上传中</span>
                  </div>
                  <div
                    class="file-status-text"
                    v-show="state.percentage >= 100"
                  >
                    <svg-icon name="success" width="20"></svg-icon>
                    <span>上传成功</span>
                  </div>
                  <span style="margin-left: 5px">{{ state.percentage }}%</span>
                </div>
                <el-upload
                  :show-file-list="false"
                  :before-upload="handleVideoUploadbefore"
                  accept="mp4"
                >
                  <div class="file-status-manage file-status-manage-refresh">
                    <svg-icon name="reUpload" width="24"></svg-icon>
                    更换视频
                  </div>
                </el-upload>
              </div>
            </el-progress>
          </div>
        </div>
      </div>
    </div>
    <el-form
      class="upload-form"
      ref="uploadRef"
      :model="uploadForm"
      :rules="rules"
      v-show="currentVideo"
    >
      <div class="title">
        <span class="label" style="width: 120px">基本设置</span>
      </div>
      <!-- 封面 -->
      <el-form-item
        class="form-item"
        label="封面"
        props="cover"
        :rules="[{ required: true }]"
      >
        <div class="cover-container">
          <el-image :src="video.coverImageURL">
            <template #error>
              <div class="image-slot"></div>
            </template>
          </el-image>
        </div>
        <div class="cover-right">
          <el-button class="change-cover-btn" @click="openCoverDialog">
            更改封面
          </el-button>
          <span class="cover-tips">系统默认截取视频第一秒作为封面</span>
          <span class="cover-tips">*部分情况下您的封面将以4:3比例展示</span>
        </div>
      </el-form-item>
      <el-form-item class="form-item" label="标题" props="title">
        <el-input
          v-model="uploadForm.title"
          maxlength="80"
          placeholder="内容亮点"
          show-word-limit
          type="text"
        />
      </el-form-item>
      <el-form-item
        class="form-item"
        label="类型"
        props="type"
        :rules="[{ required: true }]"
      >
        <el-radio-group v-model="uploadForm.type">
          <el-radio value="1">转载</el-radio>
          <el-radio value="2">自制</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        class="form-item"
        label="分区"
        props="category"
        :rules="[{ required: true }]"
      >
        <category-select
          :category="uploadForm.category"
          @category="setCategory"
        ></category-select>
      </el-form-item>
      <el-form-item class="form-item" label="标签" props="tag">
        <tag-input
          ref="tagsRef"
          v-if="currentVideo"
          :category="uploadForm.category"
        ></tag-input>
      </el-form-item>
      <el-form-item class="form-item" label="简介" props="descr">
        <el-input
          class="desc-text"
          v-model="uploadForm.descr"
          placeholder="填写更全面的相关信息，让更多的人能找到你的视频吧(:"
          type="textarea"
        />
      </el-form-item>
      <el-form-item
        class="form-item"
        style="padding-left: 132px; margin-top: 32px"
      >
        <div class="submit-container">
          <!-- <span class="submit-draft" @click="draft">存草稿</span> -->
          <el-button
            style="padding: 12px 30px"
            size="large"
            type="primary"
            @click="handleUploadForm(uploadRef)"
          >
            立即投稿
          </el-button>
          <!-- <span class="submit-add" @click="submit"></span> -->
        </div>
      </el-form-item>
    </el-form>
    <!-- 用于裁剪视频封面的元素 -->
    <video
      :src="video.videoURL"
      ref="uploadVideoElement"
      style="display: none"
    ></video>
    <!-- 用于生成原画的画布 -->
    <canvas ref="canvasElement" style="display: none"></canvas>
  </div>
  <cover-dialog
    ref="coverDialogRef"
    :coverImageUrl="video.coverImageURL"
    @changeCoverImgUrl="changeCoverImgUrl"
    :videoUrl="video.videoURL"
    :vname="video.vname"
    :videoDuration="video.videoDuration"
    :videoRef="uploadVideoElement"
    :sliderImages="video.sliderImages"
  ></cover-dialog>
</template>
<script lang="ts" setup name="videoUpload">
import type { uploadType } from '@/types/form';
import SparkMD5 from 'spark-md5';
import { askCurrentChunk, uploadCurrentChunk } from '@/api/video';
import { UploadProps, UploadRawFile } from 'element-plus';
import CoverDialog from './CoverDIalog.vue';
import { categoryType } from '@/types/info';
import { uploadFormApi } from '@/api/video';

const emit = defineEmits(['changeNavBarShow']);
const currentVideo = ref<UploadRawFile>();
const uploadRef = ref();
const uploadVideoElement = ref();
const tagsRef = ref();
const coverDialogRef = ref();
const canvasElement = ref();
const video = reactive({
  vname: '',
  chunkSize: 10 * 1024 * 1024,
  currentChunkIndex: 0,
  videoURL: '',
  videoDuration: 0,
  coverImageURL: '',
  sliderImages: [],
});

const uploadForm = reactive<uploadType>({
  coverURL: '',
  title: '',
  type: '1',
  category: [
    { id: 'anime', name: '番剧' },
    { id: 'finish', name: '完结动画' },
  ], // 投稿分区,
  descr: '这家伙很懒~',
});

const state = reactive({
  customColor: '#43ce5b',
  percentage: 0,
  isFailed: false,
  isPause: false,
  isCancel: false,
});
const fileHash = ref();

watch(currentVideo, (newVal, oldVal) => {
  if (newVal) emit('changeNavBarShow', false);
});

//提交
const handleUploadForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      let cover = null;
      fetch(video.coverImageURL)
        .then((response) => response.blob())
        .then(async (blob) => {
          cover = new File([blob], fileHash.value + Date.now() + '.jpg', {
            type: 'image/jpeg',
          });
          console.log(cover);
          const formData = new FormData();
          formData.append('cover', cover);
          formData.append('hash', fileHash.value);
          formData.append('title', uploadForm.title);
          formData.append('type', uploadForm.type);
          formData.append('duration', video.videoDuration);
          formData.append('mcid', uploadForm.category[0].id);
          formData.append('scid', uploadForm.category[1].id);
          let tags = '';
          tagsRef.value.tags.forEach((tag) => {
            tags = tags + tag + '\n';
          });
          formData.append('tags', tags);
          formData.append('descr', uploadForm.descr);
          try {
            await uploadFormApi(formData);
            ElMessage.success('投件稿成功!');
            initState();
            currentVideo.value = null;
            emit('changeNavBarShow', true);
          } catch (e) {}
        });
    } else {
      console.log('error submit!', fields);
    }
  });
};

// 上传视频前处理
const handleVideoUploadbefore: UploadProps['beforeUpload'] = async (
  rawFile,
) => {
  if (rawFile.type !== 'video/mp4') {
    ElMessage.error('视频必须是MP4格式!');
    return false;
  } else if (rawFile.size > 300 * 1024 * 1024) {
    ElMessage.error('视频最大不能超过300MB!');
    return false;
  }
  initState();
  currentVideo.value = rawFile;
  video.vname = rawFile.name.split('.mp4')[0];
  uploadForm.title = video.vname;
  fileHash.value = await creatHash(rawFile);
  initCover(rawFile);
  handleVideoUpload(rawFile);

  return false;
};

//上传视频
const handleVideoUpload = async (rawFile: UploadRawFile) => {
  const chunks = createChunks(rawFile);
  const { result } = await askCurrentChunk({ hash: fileHash.value });
  video.currentChunkIndex = result;

  for (
    video.currentChunkIndex;
    video.currentChunkIndex < chunks.length;
    video.currentChunkIndex++
  ) {
    const currentChunk = chunks[video.currentChunkIndex];
    const formData = new FormData();
    formData.append('currentChunk', currentChunk); // 当前分片上传
    formData.append('hash', fileHash.value); //完整文件hash值
    formData.append('index', video.currentChunkIndex); // 分片索引
    try {
      const { message } = await uploadCurrentChunk(formData);
      if (message == '分片已存在') {
        state.percentage = 100;
      }
      state.percentage = Math.round(
        ((video.currentChunkIndex + 1) / chunks.length) * 100,
      );
      if (state.percentage == 100) break;
    } catch (e) {
      console.log('上传失败');
      state.isFailed = true;
      state.isPause = true;
    }
  }
};

//封面更换
const openCoverDialog = () => {
  coverDialogRef.value.showCoverDialog();
};

const initState = () => {
  video.videoURL = '';
  video.coverImageURL = '';
  video.sliderImages = [];
  state.customColor = '#43ce5b';
  state.percentage = 0;
  state.isFailed = false;
};

//初始化封面
const initCover = (rawFile: UploadRawFile) => {
  if (!uploadVideoElement.value) return;
  video.videoURL = URL.createObjectURL(rawFile);
  uploadVideoElement.value.crossOrigin = 'anonymous';
  uploadVideoElement.value.currentTime = 1;

  //播放时触发
  uploadVideoElement.value.oncanplay = async () => {
    // 获取视频总时长
    video.videoDuration = uploadVideoElement.value.duration;
    //获取画布元素
    canvasElement.value.width = uploadVideoElement.value.videoWidth;
    canvasElement.value.height = uploadVideoElement.value.videoHeight;
    // 将视频的这一帧绘制到画布上
    const context = canvasElement.value.getContext('2d');
    context.drawImage(
      uploadVideoElement.value,
      0,
      0,
      canvasElement.value.width,
      canvasElement.value.height,
    );
    // 将画布内容转换为图像数据URL
    const imgUrl = canvasElement.value.toDataURL('image/jpeg');
    createCover(imgUrl); // 从原图裁剪中间部分作为封面展示
    await createSliderImages();
  };
};

const createSliderImages = async () => {
  // 获取视频元素
  const videoEl = uploadVideoElement.value;
  videoEl.crossOrigin = 'anonymous'; // 解决跨域问题，也就是提示污染资源无法转换视频
  for (let i = 1; i < 14; i += 2) {
    // 截中间的7张
    videoEl.currentTime = Math.floor(video.videoDuration * (i * 0.07143));
    await new Promise<void>((resolve) => {
      videoEl.oncanplay = () => {
        const canvas = canvasElement.value;
        canvas.width = videoEl.videoWidth;
        canvas.height = videoEl.videoHeight;

        const context = canvas.getContext('2d');
        context.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
        video.sliderImages.push(canvas.toDataURL('image/jpeg'));
        resolve();
      };
    });
  }
};

// 生成切片
const createChunks = (file: UploadRawFile) => {
  const result = [];
  for (let i = 0; i < file.size; i += video.chunkSize) {
    result.push(file.slice(i, i + video.chunkSize));
  }
  return result;
};

//生成封面
const createCover = (imgUrl: string) => {
  const img = new Image();
  img.src = imgUrl;
  const canvas = canvasElement.value;
  const ctx = canvas.getContext('2d');
  // 定义所需的宽高比例
  const targetAspectRatio = 16 / 9;
  img.onload = () => {
    const srcWidth = img.width;
    const srcHeight = img.height;
    const srcAspectRatio = srcWidth / srcHeight;
    let targetWidth = srcWidth;
    let targetHeight = srcHeight;
    // 如果原始图像的宽高比例较大（宽长高短），根据目标宽高比例来计算宽度
    if (srcAspectRatio > targetAspectRatio) {
      targetWidth = srcHeight * targetAspectRatio;
    }
    // 否则（宽短高长），根据目标宽高比例来计算高度
    else {
      targetHeight = srcWidth / targetAspectRatio;
    }
    // 计算裁剪后的图像在画布上的位置
    const offsetX = (srcWidth - targetWidth) / 2;
    const offsetY = (srcHeight - targetHeight) / 2;
    // 设置 Canvas 的宽高为目标宽高
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 在 Canvas 上绘制裁剪后的图像
    ctx.drawImage(
      img,
      offsetX,
      offsetY,
      targetWidth,
      targetHeight,
      0,
      0,
      targetWidth,
      targetHeight,
    );
    // 将 Canvas 转换为DataURL并返回
    video.coverImageURL = canvas.toDataURL('image/jpeg');
  };
};

// 根据文件名和大小组合的字符串生成hash值
const creatHash = (file: UploadRawFile) => {
  return new Promise((resolve) => {
    const spark = new SparkMD5();
    spark.append(file.name + file.size.toString());

    resolve(spark.end());
  });
};

// 通信
const changeCoverImgUrl = (newUrl: string) => {
  video.coverImageURL = newUrl;
};
const setCategory = (newVal: categoryType[]) => {
  uploadForm.category = newVal;
};

//表单校验
const rules = reactive<FormRules<RuleForm>>({
  title: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  descr: [{ required: true, message: 'Please input Activity name' }],
});
</script>
<style lang="scss" scoped>
.upload-body {
  padding: 8px 0 16px;
  height: calc(100% - 64px);
  overflow: auto;
  .upload-body-content {
    max-width: 830px;
    margin: 0 auto;

    .upload-wrp {
      margin-top: 95px;
      position: relative;
    }

    .el-upload__text {
      margin-bottom: 20px;
    }
    .el-upload__button {
      padding: 24px 60px;
    }
  }

  .content {
    &-title {
      padding: 10px 10px 10px 31px;
      &-box {
        position: relative;
        font-size: 16px;
        line-height: 22px;
        font-weight: 600;
        color: #212121;
        line-height: 28px;
        height: 70px;
        box-shadow: 0 1px 0 #e7e7e7;
        display: flex;
        align-items: center;
      }
    }
  }

  .video-file {
    width: 80%;
    min-width: 900px;
    .title {
      display: flex;
      position: relative;
      align-items: center;
      font-size: 14px;
      color: #212121;
      line-height: 20px;
      padding: 10px 10px 0 31px;
      .title-text {
        min-width: 100px;
        padding-left: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .file {
      display: flex;
      padding: 20px 0 20px 0;
      .video-icon-wrp {
        margin: 0 10px 0 32px;
        width: 30px;
        height: 38px;
        border-radius: 8px;
      }
    }
    .file-detail {
      flex: 1;

      .el-progress {
        flex-direction: column-reverse;
        padding-left: 8px;
        :deep() {
          .el-progress-bar {
            width: 100%;
          }
          .el-progress__text {
            width: 100%;
          }
          .file-status {
            display: flex;
            margin-bottom: 8px;
            align-items: center;
            .file-status-text {
              span {
                vertical-align: middle;
              }
            }
            .file-status-left {
              flex: 1;
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
    .file-status-manage {
      cursor: pointer;
    }
  }

  .upload-form {
    margin: 12px 30px 0 0;
    background: #fff;
    width: 80%;
    min-width: 900px;
    .title {
      margin: 0 0 0 32px;
      font-size: 16px;
      font-weight: 600;
      color: #222;
      line-height: 22px;
    }
  }
}

.form-item {
  margin: 24px 0 0 32px;
  :deep() {
    .el-form-item__label {
      width: 134px;
      justify-content: flex-start;
      font-size: 16px;
      line-height: 40px;
      height: 40px;
    }
    .el-input {
      line-height: 40px;
      height: 40px;
    }
    .el-input__inner {
      font-size: 14px;
    }
    .el-textarea__inner {
      min-height: 150px !important;
    }
  }
  .cover-container {
    width: 192px;
    height: 108px;
    border-radius: 4px;
    overflow: hidden; /* 隐藏超出容器的部分 */
    .el-image {
      width: 100%;
      height: 100%;
      .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: var(--el-fill-color-light);
        color: var(--el-text-color-secondary);
        font-size: 30px;
      }
      .el-icon {
        font-size: 30px;
      }
    }
  }
  .cover-right {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    .change-cover-btn {
      margin-bottom: 4px;
    }
    .cover-tips {
      text-align: center;
      margin-top: 6px;
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      color: #9499a0;
    }
  }
}

.footer-item {
  margin-top: 18px;
  text-align: center;
  color: #99a2aa;
  fill: #99a2aa;
  font-size: 12px;
  line-height: 20px;
  a:not(.title):not(.zip) {
    color: var(--el-color-primary);
    cursor: pointer;
  }
  .footer-item a:not(.title):not(.zip):hover {
    color: var(--el-color-primary-light-3);
  }
  .i-list {
    margin: 0 10px;
  }
  .i-1 {
    cursor: pointer;
    position: relative;
    &:hover .title-block {
      display: block;
    }
    a {
      color: #99a2aa;
    }
    .title:hover {
      color: var(--el-color-primary);
    }
    .i-2 .zip {
      color: #99a2aa;
      &:hover {
        color: var(--el-color-primary);
        text-decoration: underline;
      }
    }
    .title-block {
      position: absolute;
      font-size: 12px;
      border: 1px solid #f9d199;
      color: #666;
      text-align: left;
      padding: 20px;
      background-color: #fcfae0;
      white-space: nowrap;
      z-index: 10;
      bottom: 28px;
      right: -5px;
      display: none;
    }
    .title-block:after {
      content: '';
      position: absolute;
      width: 14px;
      height: 14px;
      transform: rotate(45deg);
      border: 1px solid;
      border-color: transparent #f9d199 #f9d199 transparent;
      background-color: #fcfae0;
      right: 10px;
      bottom: -8px;
    }
  }
}

:deep() {
  .el-radio__label {
    color: #222222;
  }
}
</style>
