<template>
    <div>
        <el-upload
            v-show="!sortShow"
            accept="image/jpeg, image/jpg, image/png"
            class="uploader"
            list-type="picture-card"
            :action="api"
            ref="uploadImg"
            :file-list="parent_list"
            :limit="limitMax"
            :on-success="handleSuccess"
            :on-preview="preview"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :multiple="limitMax === 1 ? false : true"
        >
           <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip el-upload__tip hauto newTip">
                <slot></slot>
            </div>
        </el-upload>
        <el-dialog :visible.sync="key" :append-to-body="true">
            <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <template v-if="isSort && limitMax > 1">
            <draggable
                v-show="sortShow"
                v-model="parent_list"
                :options="{animation: 150}"
                @start="drag = true"
                @end="drag = false"
                class="parent"
            >
                <div class="pr" v-for="(item, index) in parent_list" :key="index">
                    <template v-if="item.url">
                        <el-image :src="item.url" alt style="width: 100px; height: 100px;"></el-image>
                    </template>
                </div>
            </draggable>
            <div class="sortBtn" v-show="parent_list.length > 0">
                <el-button
                    size="medium"
                    type="danger"
                    @click.native="sortShow = !sortShow"
                >{{sortShow ? this.$t('exit') : this.$t('in')}}{{this.$t('sort')}}</el-button>
            </div>
        </template>
    </div>
</template>
<script>
import draggable from "vuedraggable";
import baseURL from '@/api/baseUrl';
import { addManagement } from '@/api/api';
export default {
    name:'uploadImg',
    props:{
        maxSize:{
            type:Number,
            default:5
        },
        limitMax:{
            type:Number,
            default:1
        },
        isSort:{
            type:Boolean,
            default:true
        },
        fileList:''
    }, 
    data() {
      return {
        api:baseURL.DOMIN+'/file_upload',
        sortShow : false,
        dialogImageUrl : "",
        key:false
      };
    },
    components:{draggable},
    computed:{
        parent_list(){
            if(typeof this.fileList === 'string') {
                return this.fileList === '' ? [] : [{ url:this.fileList }];
            }else{
                return this.fileList.map((x) => ({ url: x }))
            }
        },
    },
    methods: {
      change_imgList(arr){
          this.$emit('changeImgList',arr)
      },
      handleSuccess(res, file,fileList) {
          console.log(fileList)
        for(let i = 0;i<fileList.length;i++){
			if(fileList[i].response){
			}else if(!fileList[i].url.includes('blob:http')){
			}else{
				return
			}
        }
        const arr = fileList.map((x) => x?.response?.data || x.url);
        this.change_imgList(arr);
      },
      preview(file){
        if (file.url === undefined) return;
        this.dialogImageUrl = file.url;
        this.key = true;
      },
      handleRemove(e,fileList){
          console.log(fileList)
        const arr = fileList.map((x) => x?.response?.data || x.url);
        this.change_imgList(arr);
      },
      beforeUpload(file) {
        const format = 
            file.type==='image/jpg' ||
            file.type==='image/jpeg' ||
            file.type==='image/png' ||
            file.type==='image/gif' 
        if (!format) {
        this.$message.error("请上传jpg、jpeg、png、gif格式");
        return false;
        }
        if (file.size > 1024 * 1024 * this.maxSize) {
            this.$message.error(`图片大小不能超过${this.maxSize}M`);
            return false;
        }
        return true;
      }
    }
}
</script>
<style land="scss" scoped>
 
</style>