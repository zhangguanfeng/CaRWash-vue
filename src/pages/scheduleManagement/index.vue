<template>
    <div>
        <!-- 搜索部分. -->
        <el-card class="search_card" shadow="hover">
        <!-- 上半部分 -->
        <div class="search_card_top">
            <h2>{{$t('search_title')}}</h2>
        </div>
        <!-- 下半部分 -->
        <div class="search_card_bottom">
            <el-input :placeholder="$t('inputCategory')" class="searchByCategory" clearable
            v-model="filter.searchByCategory">
            </el-input>
            <el-input :placeholder="$t('inputUserID')" class="searchByID" clearable v-model="filter.searchByID">
            </el-input>
            <el-date-picker v-model="filter.orderTime" type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="orderTime">
            </el-date-picker>
            <el-input :placeholder="$t('inputShop')" class="searchByShop" clearable v-model="filter.searchByShop">
            </el-input>
            <el-button class="search" round>{{$t('search_zh')}}</el-button>
        </div>
        </el-card>
        <div class="fiveIcon mt20">
            <ul>
                <li>
                    <router-link to="/operating/addGoods">
                        <i class="el-icon-present"></i>
                        <p>全部日程</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/operating/classification">
                        <i class="el-icon-pie-chart"></i>
                        <p>未洗车</p>
                    </router-link>
                </li>
                <li>
                    <a href>
                        <i class="el-icon-delete"></i>
                        <p>已完成</p>
                    </a>
                </li>
                <li>
                    <router-link to="/operating/comments">
                        <i class="el-icon-edit-outline"></i>
                        <p>未找到车辆</p>
                    </router-link>
                </li>
				<li>
                    <router-link to="/operating/store">
                        <i class="el-icon-edit-outline"></i>
                        <p>延迟日程</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'scheduleManagement',
    data(){
        return {
            filter:{
                searchByCategory: '',
                searchByID: '',
                searchByShop: '',
                orderTime: ''
            },
        }
    },
}
</script>
<style lang='scss' scoped>
// 搜索部分
.search_card /deep/ {
  margin-bottom: 15px;
  .search_card_top {
    margin-bottom: 20px;
  }
  .search_card_bottom {
    height: 50px;
    width: 1200px;
    display: flex;
    justify-content: space-between;
    .searchByCategory,
    .searchByID,
    .orderTime,
    .searchByShop {
      position: relative;
      width: 245px;
      z-index: 0;
      input {
        height: 50px;
        padding: 0 8px 0 47px;
      }
      input:focus {
        border: 1.5px solid #545c64ac;
      }
      i {
        display: none;
      }
    }
    .searchByCategory:before {
      content: "\e699";
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      position: absolute;
      top: 3px;
      left: 10px;
      font-size: 30px;
      color: #545c64ac;
    }
    .searchByID:before {
      content: "\e696";
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      position: absolute;
      top: 3px;
      left: 10px;
      font-size: 28px;
      color: #545c64ac;
    }
    .searchByShop:before {
      content: "\e62f";
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      position: absolute;
      top: 3px;
      left: 10px;
      font-size: 28px;
      color: #545c64ac;
    }
    .orderTime:before {
      content: "\e665";
      z-index: 99;
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      position: absolute;
      top: 3px;
      left: 10px;
      font-size: 28px;
      color: #545c64ac;
    }
    .search {
      width: 100px;
      height: 45px;
      color: white;
      border-radius: 10px;
      background-color: #545c64ac;
      // border: none;
      transition: all 0.3s linear;
    }
    .search:hover {
      border: none;
      background-color: #545c6466;
      transition: all 0.3s linear;
    }
  }
}
.fiveIcon {
    width: 100%;
    display: flex;
    ul {
        display: flex;
        width: 100%;
        li {
            width: 20%;
            display: flex;
            justify-content: center;
            align-items: center;
            a {
                width: 60%;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 5px;
                padding: 20px 0;
                color: #fff;
                flex-direction: column;
                transition: all 0.5s;
                -webkit-transition: all 0.5s;
                -moz-transition: all 0.5s;
                -o-transition: all 0.5s;
                box-shadow: 0 5px 10px rgba(100, 100, 100, 0.2);
                i {
                    font-size: 32px;
                    margin-bottom: 5px;
                    transition: all 0.5s;
                    -webkit-transition: all 0.5s;
                    -moz-transition: all 0.5s;
                    -o-transition: all 0.5s;
                }
                &:hover {
                    background: #0000fe;
                }
            }
        }
        li:nth-child(1) a {
            background: #36cfca;
        }
        li:nth-child(1):hover a {
            background: #30a19d;
        }
        li:nth-child(2) a {
            background: #597cf4;
        }
        li:nth-child(2):hover a {
            background: #1e3a9a;
        }
        li:nth-child(3) a {
            background: #9253df;
        }
        li:nth-child(3):hover a {
            background: #693e9e;
        }
        li:nth-child(4) a {
            background: #73d13d;
        }
        li:nth-child(4):hover a {
            background: #589a32;
        }
        li:nth-child(5) a {
            background: #ffa940;
        }
        li:nth-child(5):hover a {
            background: #cb8835;
        }
    }
}
</style>