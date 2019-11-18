<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
      UE.Editor.prototype.getActionUrl = function (action) {
        if (action == 'config') {
          return 'http://localhost:8888/static/UE/config.json'
          // return 'https://api.zhengjl.com/rm/cms/ueditor/config'
        }
        if (action == 'uploadimage' || action == 'uploadfile') {
          return 'https://api.zhengjl.com/rm/cms/feil/ueitorFeil'
        }
      }
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
