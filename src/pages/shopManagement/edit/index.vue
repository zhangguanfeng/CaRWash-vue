<template>
    <div>
        <div class="box">
            <el-page-header @back="$router.go(-1)" :content="content"></el-page-header>
        </div>
        <el-card class="content mt20">
            <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item :label="$t('shop')" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('address')" prop="address">
                    <!-- <el-input @click.native = "openMap" v-model="ruleForm.address" disabled size = "medium"></el-input> -->
                    <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item :label="$t('introduce')" prop="description">
                    <el-input v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item :label="$t('phone')" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item :label="$t('shopManagement.scoped')" prop="area">
                    <el-cascader
                        :value="value"
                        @change="selectArea"
                        :options="serviceAreaList"
                        :props="props"
                        clearable
                    ></el-cascader>
                </el-form-item>
                <el-form-item :label="$t('shopManagement.business')" prop="open_hours">
                    <el-time-select
                        :placeholder="$t('startTime')"
                        v-model="startTime"
                        :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '23:30'
                        }">
                    </el-time-select>
                    <el-time-select
                        :placeholder="$t('endTime')"
                        v-model="endTime"
                        :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '23:30',
                        minTime: startTime
                        }">
                    </el-time-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">{{id === undefined ? $t('btnTip.add'):$t('btnTip.edit')}}</el-button>
                </el-form-item>
            </el-form>
            <!-- 店铺地址 -->
            <!-- <el-dialog
            title="选择地址"
            :visible.sync="mapDialog"
            width="50%"
            :before-close="mapClose">
            <vue-map-small @sendData = "getMapData" ></vue-map-small>
            </el-dialog> -->
        </el-card>
    </div>
</template>
<script>
// import vueMapSmall from '@/components/global/vueMap'
import {getStoreDetail, getServiceArea, editStore, addStore} from '@/api/api'
export default {
    name:'shopEdit',
    data(){
        return {
            props: { multiple: true },
            startTime:'',
            endTime:'',
            // 地图弹窗
            mapDialog: false,
            // 修改之后地图
            // locationInfo: {},
            ruleForm:{
                name: '',
                address: '',
                description: '',
                phone: '',
                area: [],
                open_hours: ''
            },
            rules: {
                name: [
                    { required: true, message: this.$t('shopManagement').inputName, trigger: 'blur' },
                ],
                address: [
                    { required: true, message: this.$t('shopManagement').inputAddress, trigger: 'change' }
                ],
                description: [
                    { required: true, message: this.$t('shopManagement').inputShopDesc, trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: this.$t('inputContact'), trigger: 'blur' }
                ],
                area: [
                    { required: true, message: this.$t('shopManagement').selectScoped, trigger: 'change' }
                ],
                open_hours: [
                    { required: true, message: this.$t('shopManagement').selectBusiness, trigger: 'change' }
                ]
            },
            serviceAreaList:[],
            value:[]
        }
    },
    // components: {
    //     vueMapSmall
    // },
    computed:{
        id(){
			return Number.isNaN(Number(this.$route.query.id)) ? undefined : Number(this.$route.query.id)
        },
        content(){
			return this.id === undefined ? this.$t('shopManagement').addShop : this.$t('shopManagement').editShop
		},
    },
    watch:{
        startTime(){
            const arr = this.ruleForm.open_hours.split('-')
            arr[0]=this.startTime
            this.ruleForm.open_hours=arr.join('-')
        },
        endTime(){
            const arr = this.ruleForm.open_hours.split('-')
            arr[1]=this.endTime
            this.ruleForm.open_hours=arr.join('-')
        }
    },
    methods:{
        selectArea(e){
            console.log(e)
            this.value=e
            this.ruleForm.area=e.map(item=>item[1])
        },
        async submitForm(formName) {
            await this.$refs[formName].validate()
            if(this.id === undefined){
               await addStore(this.ruleForm)
            }else{
                await editStore(this.ruleForm)
            }
            this.$router.go(-1)
        },
        // 地图传值
        // getMapData (data) {
        //     console.log('getMap',data)
        // this.mapDialog = data.status
        // this.ruleForm.address = data.mapInfo.name
        // // this.storeInfo.gpsX = data.mapInfo.gpsX
        // // this.storeInfo.gpsY = data.mapInfo.gpsY
        // },
        // // 地图弹窗关闭
        // mapClose (done) {
        //     done()
        // },
        // // 打开地图
        // openMap () {
        // this.mapDialog = true
        // },
        async get_info(){
            const information = await getStoreDetail(this.id)
            this.ruleForm = information
            this.startTime = information.open_hours.split('-')[0]
            this.endTime = information.open_hours.split('-')[1]
            information.area.forEach(item=>this.serviceAreaList.forEach((serviceItem)=>serviceItem.children.forEach(cc=>{
                if(cc.id===item.id){
                    this.value.push([serviceItem.id,item.id])
                }
            })))
            
        },
    },
    async created(){
        const res = await getServiceArea()
        res.list.forEach(item=>{
            item.label=item.name
            item.value=item.id
            item.children.forEach(item=>{
                item.label=item.name
                item.value=item.id
            })
        })
        this.serviceAreaList =res.list
        if(this.id === undefined) return
		this.get_info()
    },
    
}
</script>
<style land="scss" scoped>
    .el-date-editor{
        margin-right:10px;
    }
</style>