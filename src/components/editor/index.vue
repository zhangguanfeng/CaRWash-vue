<!--
 * @Author: your name
 * @Date: 2020-07-03 10:59:57
 * @LastEditTime: 2020-07-23 17:12:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mipinshopmall\src\components\editor\editor.vue
-->
<template>
    <div id="wangeditor">
        <div ref="editor" style="text-align: left;"></div>
    </div>
</template>

<script>
import E from "wangeditor";
export default {
    name: "editorTxt",
	props: ["editHtml","text"],
	model:{
		prop:"text",
		event:"change_text"
	},
    data() {
        return {
            editor: null,
            editorContent: ""
        };
	},
	computed:{
		get_text(){
			return this.text
		}
	},
	watch:{
		get_text(){
			this.editHtml ? this.editor.txt.html(this.editHtml) : this.editor.txt.html(this.text);
		}
	},
    methods: {
        valueClear() {
            this.editor.txt.clear();
		},
		clear(text = ''){
			this.editor.txt.html(text)
		}
    },
    mounted() {
        
        this.editor = new E(this.$refs.editor);
        console.log(this.editor)
        // 编辑器事件, 每次改变会获取其html内容
        this.editor.config.onchange = html => {
			this.editHtml ? this.$emit("sendHtml", html) : this.$emit("change_text",html);
        };
        // 自定义onchange触发的延迟时间, 默认为200ms
        this.editor.config.onchangeTimeout = 1;
        // 设置文件上传的参数名称
        this.editor.config.uploadFileName = "file";
        // 配置tab上传图片服务器路径
        this.editor.config.uploadImgServer =
            "http://152.136.202.78:8080/admin/article/imgUpload";
        // debug模式
        this.editor.config.debug = true;
        // 配置菜单
        this.editor.config.menus = [
            "head", // 标题
            "bold", // 粗体
            "fontSize", // 字号
            "fontName", // 字体
            "italic", // 斜体
            "underline", // 下划线
            "strikeThrough", // 删除线
            "foreColor", // 文字颜色
            "backColor", // 背景颜色
            "link", // 插入链接
            "list", // 列表
            "justify", // 对齐方式
            "quote", // 引用
            // 'emoticon', // 表情
            "image", // 插入图片
            "table", // 表格
            "code", // 插入代码
            "undo", // 撤销
            "redo" // 重复
        ];
        // 层级
        this.editor.config.zIndex = 9;
        this.editor.create();
		this.editHtml ? this.editor.txt.html(this.editHtml) : this.editor.txt.html(this.text);
    }
};
</script>

<style>
</style>
