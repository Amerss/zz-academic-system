<template>
  <DashBoard>
    <el-upload
      class="upload-demo my-5"
      drag
      action=""
      multiple
      accept=".doc,.docx"
      :http-request="myUpload"
      :on-preview="onPreview"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽文件或 <em>点击上传</em></div>
    </el-upload>

    <el-card>
      <div v-show="!display" class="text-center text-green-default">暂无预览</div>
      <div v-show="display" class="flex justify-center mb-2" @click="display = false">
        <el-button type="danger">取消预览</el-button>
        <el-button type="primary" v-print="printSetting">打印</el-button>
      </div>
      <div id="printMe" v-show="display" ref="wordPDF" style="width: 100%; height: auto"></div>
    </el-card>
  </DashBoard>
</template>

<script setup lang="ts">
import type { UploadFile, UploadRequestOptions } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { renderAsync } from 'docx-preview'
import print from 'vue3-print-nb'
import { ElMessage } from 'element-plus'

const wordPDF = ref<any>(null)

let display = ref<boolean>(false)

const options = {
  className: 'docx', // 默认和文档样式类的类名/前缀
  inWrapper: true, //  启用围绕文档内容渲染包装器
  ignoreWidth: false, //  禁止页面渲染宽度
  ignoreHeight: false, //  禁止页面渲染高度
  ignoreFonts: false, //  禁止字体渲染
  breakPages: true, //  在分页符上启用分页
  ignoreLastRenderedPageBreak: true, //  禁用lastRenderedPageBreak元素的分页
  experimental: false, //  启用实验性功能（制表符停止计算）
  trimXmlDeclaration: true, //   如果为真，xml声明将在解析之前从xml文档中删除
  debug: false, //  启用额外的日志记录
  useBase64URL: true, // 如果为true，图片、字体等将被转换为base 64 URL，否则使用URL.createObjectURL
  useMathMLPolyfill: false, //  包括用于 chrome、edge 等的 MathML polyfill。
  showChanges: false // 启用文档更改（插入/删除）的实验性呈现
}

const myUpload = (content: UploadRequestOptions): XMLHttpRequest | Promise<unknown> => {
  let suffix = content.file.name.slice(content.file.name.lastIndexOf('.') + 1)
  if (suffix !== 'doc' && suffix !== 'docx') {
    ElMessage({
      type: 'error',
      message: '文件格式不正确,请上传.docx\.doc文件'
    })
    return Promise.reject('文件格式不正确,请上传.docx\.doc文件')
  } else if (
    content.file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    ElMessage({
      type: 'error',
      message: '找不到中心目录的末尾:这可能为一个zip文件'
    })
    return Promise.reject('找不到中心目录的末尾:这可能为一个zip文件')
  } else {
    ElMessage({
      type: 'success',
      message: '上传成功'
    })
    return Promise.resolve('上传成功')
  }
}

const onPreview = (uploadFile: UploadFile) => {
  display.value = true
  renderAsync(uploadFile.raw, wordPDF.value, undefined, options)
}

const vPrint = print
const printSetting = ref({
  id: 'printMe',
  preview: true, // 是否启动预览模式，默认是false
  previewPrintBtnLabel: '预览结束，开始打印', // 打印预览的标题下方的按钮文本，点击可进入打印
  zIndex: 20002 // 预览窗口的z-index，默认是20002，最好比默认值更高
})
</script>

<style lang="scss" scoped></style>
