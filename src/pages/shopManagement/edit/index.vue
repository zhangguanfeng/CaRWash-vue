<template>
    <div>
        <div class="box">
            <el-page-header @back="$router.go(-1)"></el-page-header>
        </div>
        <el-card class="content mt20">
            <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item :label="$t('shop')" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('address')" prop="address">
                    <el-input @click.native = "openMap" v-model="ruleForm.address" disabled size = "medium"></el-input>
                </el-form-item>
                <el-form-item :label="$t('introduce')" prop="description">
                    <el-input v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item :label="$t('phone')" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item :label="$t('shopManagement.scoped')" prop="service_range">
                    <el-input v-model="ruleForm.service_range"></el-input>
                </el-form-item>
                <el-form-item :label="$t('shopManagement.business')" prop="open_hours">
                    <el-time-select
                        placeholder="起始时间"
                        v-model="ruleForm.startTime"
                        :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '23:30'
                        }">
                    </el-time-select>
                    <el-time-select
                        placeholder="结束时间"
                        v-model="ruleForm.endTime"
                        :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '23:30',
                        minTime: ruleForm.startTime
                        }">
                    </el-time-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                </el-form-item>
            </el-form>
            <!-- 店铺地址 -->
            <el-dialog
            title="选择地址"
            :visible.sync="mapDialog"
            width="50%"
            :before-close="mapClose">
            <vue-map-small @sendData = "getMapData" ></vue-map-small>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
import vueMapSmall from '@/components/global/vueMap'
import {getStoreDetail} from '@/api/api'
export default {
    name:'shopEdit',
    data(){
        return {
            // 地图弹窗
            mapDialog: false,
            // 修改之后地图
            // locationInfo: {},
            ruleForm:{
                name: '',
                address: '',
                description: '',
                phone: '',
                service_range: '',
                startTime: '',
                endTime: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入代理店名称', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '请选择地址', trigger: 'change' }
                ],
                description: [
                    { required: true, message: '请输入代理店介绍', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入联系方式', trigger: 'blur' }
                ],
                service_range: [
                    { required: true, message: '请选择服务范围', trigger: 'change' }
                ],
                open_hours: [
                    { required: true, message: '请选择营业时间', trigger: 'change' }
                ]
            }
        }
    },
    components: {
        vueMapSmall
    },
    methods:{
        async submitForm(formName) {
            await this.$refs[formName].validate()
        },
        // 地图传值
        getMapData (data) {
            console.log('getMap',data)
        this.mapDialog = data.status
        this.ruleForm.address = data.mapInfo.name
        // this.storeInfo.gpsX = data.mapInfo.gpsX
        // this.storeInfo.gpsY = data.mapInfo.gpsY
        },
        // 地图弹窗关闭
        mapClose (done) {
            done()
        },
        // 打开地图
        openMap () {
        this.mapDialog = true
        },
    },
    async create(){
        const res = await getService()
        console.log('service',res)
        this.ruleForm = res
    },
    
}
</script>
<style land="scss" scoped>
    .el-date-editor{
        margin-right:10px;
    }
</style>