<template>
    <div>
         <div class="box">
            <el-page-header @back="$router.go(-1)" :content="$t('shecheduleManagement').detail"></el-page-header>
        </div>
        <el-card class="content mt20">
            <el-form label-position="left" :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item :label="$t('shecheduleManagement.order')" prop="order">
                    <div>{{ruleForm.order}}</div>
                </el-form-item>
                 <el-form-item :label="$t('shecheduleManagement.userAccount')" prop="userAccount">
                    <div>{{ruleForm.user.account}}</div>
                </el-form-item>
                <el-form-item :label="$t('shecheduleManagement.userPhone')" prop="userPhone">
                    <div>{{ruleForm.user.phone}}</div>
                </el-form-item>
                  <el-form-item :label="$t('shecheduleManagement.staffAccount')" prop="staffAccount">
                    <div>{{ruleForm.staff.account}}</div>
                </el-form-item>
                <el-form-item :label="$t('shecheduleManagement.staffPhone')" prop="staffPhone">
                    <div>{{ruleForm.staff.phone}}</div>
                </el-form-item>
                <el-form-item :label="$t('shecheduleManagement.service_time')" prop="service_time">
                    <div>{{ruleForm.service_time}}</div>
                </el-form-item>
                <el-form-item :label="$t('shecheduleManagement.day_of_week')" prop="day_of_week">
                    <div>{{ruleForm.day_of_week}}</div>
                </el-form-item>
                <el-form-item :label="$t('shecheduleManagement.car_type')" prop="car_type_name">
                    <div>{{ruleForm.car_type_name}}</div>
                </el-form-item>
                <el-form-item :label="$t('shecheduleManagement.car_name')" prop="car_name">
                    <div>{{ruleForm.car_name}}</div>
                </el-form-item>
                <el-form-item :label="$t('shecheduleManagement.car_number')" prop="car_number">
                    <div>{{ruleForm.car_number}}</div>
                </el-form-item>
                <el-form-item :label="$t('shecheduleManagement.address')" prop="address">
                    <div>{{ruleForm.address}}</div>
                </el-form-item>
                <el-form-item :label="$t('shecheduleManagement.address_detail')" prop="address_detail">
                    <div>{{ruleForm.address_detail}}</div>
                </el-form-item>
                 <el-form-item :label="$t('shecheduleManagement.address_code')" prop="address_code">
                    <div>{{ruleForm.address_code}}</div>
                </el-form-item>
                <el-form-item :label="$t('shecheduleManagement.status')" prop="status">
                    <div>{{ruleForm.status}}</div>
                </el-form-item>
                 <el-form-item :label="$t('shecheduleManagement.is_inner_clean')" prop="is_inner_clean">
                    <div>{{ruleForm.is_inner_clean}}</div>
                </el-form-item>
                 <el-form-item :label="$t('shecheduleManagement.store')" prop="store">
                    <div>{{ruleForm.store}}</div>
                </el-form-item>
                 <el-form-item :label="$t('shecheduleManagement.car_color')" prop="car_color">
                    <div>{{ruleForm.car_color}}</div>
                </el-form-item>
                 <el-form-item :label="$t('shecheduleManagement.car_brand')" prop="car_brand">
                    <div>{{ruleForm.car_brand}}</div>
                </el-form-item>
                 <el-form-item :label="$t('shecheduleManagement.car_time')" prop="car_time">
                    <div>{{ruleForm.car_time}}</div>
                </el-form-item>
                 <el-form-item :label="$t('shecheduleManagement.remark')" prop="remark">
                    <div>{{ruleForm.remark}}</div>
                </el-form-item>
                <el-form-item :label="$t('shecheduleManagement.result_image')" prop="result_image">
                    <image v-for="(item,index) in ruleForm.result_image" :key="index" :src="item"></image>
                </el-form-item>
                <el-form-item :label="$t('shecheduleManagement.result_content')" prop="result_content">
                    <div>{{ruleForm.result_content}}</div>
                </el-form-item>
                <el-form-item :label="$t('shecheduleManagement.result_evaluation')" prop="result_evaluation">
                    <div>{{ruleForm.result_evaluation}}</div>
                </el-form-item>
                <el-form-item :label="$t('shecheduleManagement.result_update')" prop="result_update">
                    <div>{{ruleForm.result_update}}</div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import {getScheduleDetail} from '@/api/api'
export default {
    name:'scheduleDetail',
    data(){
        return {
            ruleForm:{
                id:'',
                order:'',
                user:{
                    id:'',
                    account:'',
                    phone:''
                },
                staff:{
                    id:'',
                    account:'',
                    phone:'',
                },
                service_time:'',
                day_of_week:'',
                service_name:'',
                car_type_name:'',
                car_name:'',
                car_number:'',
                address:'',
                address_detail:'',
                address_code:'',
                status:'',
                is_inner_clean:'',
                store:'',
                car_color:'',
                car_brand:'',
                car_time:'',
                remark:'',
                result_image:[],
                result_content:'',
                result_evaluation:'',
                result_update:'',

            },
        }
    },
    computed:{
        id(){
			return Number.isNaN(Number(this.$route.query.id)) ? undefined : Number(this.$route.query.id)
        },
    },
    methods:{
        async get_info(){
            const information = await getScheduleDetail(this.id)
            console.log(information)
            this.ruleForm = information
        }
    },
    created(){
        this.get_info()
    },
}
</script>
<style lang="scss" scoped>

</style>