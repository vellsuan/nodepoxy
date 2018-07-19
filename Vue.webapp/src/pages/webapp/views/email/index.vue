<template>
  <div class="emaiPtlist">
    <div class="emaillist">
      <x-header :left-options="{showBack: true,backText: ''}">个人信息</x-header>
      <div class="borderOne"></div>
      <div class="emaiPtone">
        <div class="borderLine">
          <div class="emailItem">
            <div class="emailItemCd">
              <div class="emailImg">
                <img src="../../assets/image/Smile@2x.png" alt="">
                <span>姓名</span>
              </div>
              <div>
                <div class="emailRight" v-text="userName">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="emaiPt">
        <div class="borderLine">
          <div class="emailItem">
            <div class="emailItemCd">
              <div class="emailImg">
                <img src="../../assets/image/sex@2x.png" alt="">
                <span>性别</span>
              </div>
              <div>
                <div class="emailRight" v-text="sexName">
                  呵呵呵呵
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="emaiPt">
        <div class="borderLine">
          <div class="emailItem">
            <div class="emailItemCd">
              <div class="emailImg">
                <img src="../../assets/image/calendar@2x.png" alt="">
                <span>生日</span>
              </div>
              <div>
                <div class="emailRight" v-text="birthday">
                  呵呵呵呵
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="emaiPt">
        <div class="borderLine">
          <div class="emailItem">
            <div class="emailItemCd">
              <div class="emailImg">
                <img src="../../assets/image/supplier-features@2x.png" alt="">
                <span>证件类型</span>
              </div>
              <div>
                <div class="emailRight" v-text="idCode">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="emaiPt">
        <div class="borderLine">
          <div class="emailItem">
            <div class="emailItemCd">
              <div class="emailImg">
                <img src="../../assets/image/bussiness-card@2x.png" alt="">
                <span>证件号码</span>
              </div>
              <div>
                <div class="emailRight" v-text="idNumber">
                  呵呵呵呵
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="emaiPt">
        <div class="borderLine">
          <div class="emailItem">
            <div class="emailItemCd">
              <div class="emailImg">
                <img :class="{imgwidth:true}" src="../../assets/image/Mobile-phone@2x.png" alt="">
                <span>绑定手机号</span>
              </div>
              <div>
                <div class="emailRight" v-text="phone">
                  呵呵呵呵
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="emaiPt emaiPtlast">
        <div>
          <div class="emailItem">
            <div class="emailItemCd">
              <div class="emailImg">
                <img src="../../assets/image/email@2x.png" alt="">
                <span>邮箱</span>
              </div>
              <div class="emaIn">
                <x-input v-model="email" text-align="right" is-type="email"></x-input>
                <!-- <div class="emailRight" v-text="email" >

                 </div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="emailPhone">
      <p>*若个人信息有误，请拨打电话:<span>400-890-6655</span>修改</p>
    </div>
    <div class="emailBtn" @click="emailUp">
      保存
    </div>
  </div>
</template>
<script>
  import {XHeader, Cell, Group, XInput, Toast} from 'vux'

  export default {
    components: {
      XHeader,
      Cell,
      Group,
      XInput
    },
    data() {
      return {
        sexName: '',
        birthday: '',
        idCode: '',
        idNumber: '',
        phone: '',
        sexCode: '',
        userId: '',
        userName: '',
        unionid: '', //微信识别码
        vacode: '', //短信验证码
        email: ''
      }
    },
    methods: {

      //上送修改邮箱
      //方法的时候加一个ture参数作为弹窗判断
      emailUp: function () {
        let _t = this;



        var myreg = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;

        if (!myreg.test(this.email)) {
          this.dilog('邮箱格式不正确');
          return false
        }
        let parmse = {
          url: 'USER0105',
          data: {
            email: this.email,
            userId: this.userId
          }
        };
        this.api.post(parmse, response => {
          this.$router.back()

          /*window.history.go(-1);*/
        }, true)
      }
    },
    mounted() {

      let _t = this;

      let userinfo = this.$store.state.userinfo;
      this.birthday = userinfo.birthday || '';
      this.idNumber = userinfo.idNumber || '';
      this.phone = userinfo.phone || '';
      this.sexCode = userinfo || '';
      this.userId = userinfo.userId || '';
      if (userinfo.sex == 1) {
        this.sexName = '男'
      } else if (userinfo.sex == 2) {
        this.sexName = '女'
      } else {
        this.sexName = ''
      }
      this.userName = userinfo.userName || '';
      this.unionid = userinfo || ''; //微信识别码
      this.vacode = userinfo || '';//短信验证码

      if (localStorage.email) {
        this.email = localStorage.email;

      } else {
        this.email = userinfo.email || ''
      }
      let paramsDI = {
        url: 'DICT0202',
        data: {}
      };
      this.api.post(paramsDI, response => {
        let arr = response && response.list || [];

        for (let i = 0; i < arr.length; i++) {

          if (arr[i].value == userinfo.idCode) {
            this.idCode = arr[i].label
          }
        }
        /*this.idCode = userinfo.idCode || '';*/
      })

    }, watch: {
      email(curVal, oldVal) {
        console.log(curVal);
        localStorage.email = curVal;
      }
    }

  }
</script>
<style lang='less'>
  .emaiPtlist {
    height: 100%;
    background: #e5e5e5;
    .emailPhone {
      margin-left: 30px;
      margin-top: 32px;
      font-size: 22px;
      font-weight: normal;
      font-stretch: normal;
      color: #747474;
      span {
        font-size: 22px;
        font-weight: normal;
        color: #ec4b3f;
      }
    }
    .emailBtn {
      margin: auto;
      margin-top: 84px;
      width: 630px;
      height: 82px;
      background-image: linear-gradient(90deg,
      #26b9ea 0%,
      #38d0f0 100%),
      linear-gradient(
        #49c3f1,
        #49c3f1);
      background-blend-mode: normal,
      normal;
      border-radius: 41px;
      font-size: 34px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 92px;
      text-align: center;
      color: #ffffff;
    }
  }

  .emaillist {
    /* height: 100%;*/
    /* background: #e5e5e5;*/
    .borderOne {
      height: 2px;
      overflow: hidden;
      background: #b2b2b2;

    }

  }

  .emaiPtone {

    background: #fff;
    margin-top: 20px;
  }

  .emaiPt {
    background: #fff;
    position: relative;
  }

  .emailItem {
    display: flex;
    .emailRight {
      font-size: 28px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 92px;
      color: #747474;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      width: 300px;
      text-align:right;
    }
    .emailItemCd {

      display: flex;
      flex: 1;
      justify-content: space-between;
      height: 92px;
      align-items: center;
      padding-left: 30px;
      padding-right: 30px;
      font-size: 28px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 92px;

      color: #2d2d2d;
    }
    .emailImg {
      img {
        width: 38px;
        height: 38px;
        margin-right: 28px;
      }
      .imgwidth {
        width: 28px;
      }
    }
    .emaIn{
      flex:1;
    }
  }

  .emaiPt:before {
    /*  border-bottom: 1px solid #e5e5e5;*/
    content: "  ";
    position: absolute;
    left: 30px;
    top: 0;

    width: 100%;
    height: 2px;
    background-color: #e0e0e0;
    /* 如果不用 background-color, 使用 border-top:1px solid #e0e0e0; */
    -webkit-transform: scaleY(.25);
    transform: scaleY(.25);
  }

  .emaiPtlist .reg-form label {
    line-height: inherit;
  }

</style>
