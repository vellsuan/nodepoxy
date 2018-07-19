<template>
  <div style="height: 100%;width: 100%">
    <div v-if="domshow"></div>
    <div v-else :class="{rignVerify:true,note:true}" v-bind:style="{backgroundImage: 'url(' + imgUrl + ')'}">
      <div class="rignVerifyOne">

      <x-input class="Regname" v-model="userName" name="username" required
               placeholder="请输入姓名"
               placeholder-align="left" text-align="left" is-type="china-name" label-width="90px">
        <slot>
          <div slot="label" class="leftimg">
            <img src="../../assets/image/nameicon.png" alt="">
          </div>
        </slot>
      </x-input>
      <x-input class="Regname RegnameTop" title="手机号码" v-model="phone" required placeholder-align="left"
               name="mobile"
               placeholder="请输入手机号码" text-align="left" keyboard="number" is-type="china-mobile">
        <slot>
          <div slot="label" class="leftimg">
            <img src="../../assets/image/phoneicon.png" alt="">
          </div>
        </slot>
      </x-input>
      <x-input ref="reg_code" v-model="vacode" required placeholder-align="left" text-align="left"
               class="weui-vcode Regname inputWidth RegnameTop" placeholder="验证码">
        <slot>
          <div slot="label" class="leftimg">
            <img src="../../assets/image/phoneicon.png" alt="">
          </div>
        </slot>

        <slot>
          <div slot="right" :class="{divbtn:true,disBtn:disBtn}" type="button" :disabled="nofunCl" mini
               @click="getCode">{{msg}}
          </div>
        </slot>
      </x-input>
        <div :bind="asdasd"></div>
      <x-button class="qiandao" @click.native="qianclick">活动签到</x-button>
    </div>
  </div>
  </div>
</template>
<script>

  import {
    Group,
    XInput,
    XButton,
    Calendar,
    PopupPicker
  } from 'vux'
  import {ToastPlugin} from 'vux'

  export default {
    components: {
      Group,
      XInput,
      XButton,
      Calendar,
      PopupPicker,
      ToastPlugin
    },
    created() {
      this.usermsg();
    },
    data() {
      return {

        domshow: true,
        nofunCl: false,
        phone: '', //手机号
        vacode: '', //短信验证码
        msg: "获取验证码",
        userName: '', //用户名
        disBtn: false,
        phvalue: '',
        imgUrl: "",

      }
    },
    methods: {
      getCode() { //获取验证码
        let _t = this;
        let pramese = {
          url: 'CM100001',
          data: {
            channel: this.userinfo.channel,
            phone: this.phone
          }
        };
        if (pramese.data.phone !== '') {
          let sec = 60;
          /*this.disBtn = true;*/
          this.msg = "60秒后重发";
          this.nofunCl = true;
          let timer = setInterval(() => {

            sec--;
            this.msg = sec + "秒后重发";
            /*	this.disBtn = true;*/
            if (sec <= 1) {
              this.msg = "获取验证码";
              /*	this.disBtn = false;*/
              this.nofunCl = false;
              clearInterval(timer)
            }
          }, 1000);
          this.api.post(pramese
            , response => {
            });
        } else {
          this.api.post(pramese
            , response => {

            });
        }

      },
      usermsg() {


        let _t = this;
        _t.api.post({
          url: 'SIGN0206',
          data: {}
        }, response => {
          let imgUrl = response.entity.imgUrl;
          _t.imgUrl = this.api.healthhost() + imgUrl
        });
        let userparams = {
          url: '/mdtc/uc/getUserInfo',
          data: {}
        };

        _t.api.post(userparams, response => {

          this.userinfo = response && response.user || {};
          //验证是否绑定用户信息

          if (response.user && response.user.phone === null || response.user && response.user.phone === '') {
            //没绑定直接跳签到页面直接在当前页面验证
            _t.domshow = false;
          } else {
            //绑定了验证签到没有，签到了直接跳签到成功页面 没签到 跳签到页面
            let yanzheng = {
              url: 'SIGN0101',
              data: {
                phone: response.user.phone
                // phone: 13932952737
              }
            };

            _t.api.post(yanzheng, response => {
              //未签到页 rignVerify
              console.log('未签到');
              _t.domshow = false;
            }, false, function () {
              //签到
              _t.domshow = true;
              console.log('已签到');
              _t.$router.push('/verifyReturn');

            })
          }
          //未签到页rignVerify
        });
      },
      qianclick() {
        let _t = this;
        let userparams = {
          url: '/mdtc/uc/getUserInfo',
          data: {}
        };
        _t.api.post(userparams, response => {
          let qianparams = {
            url: 'SIGN0102',
            data: {
              nickName: response.user.nickName,
              phone: _t.phone,
              unionid: response.user.unionid,
              userName: _t.userName,
              vacode: _t.vacode
            }
          };
          this.api.post(qianparams, response => {
            //签到成功
            _t.$router.push('/verifyReturn');
          }, false, function () {
            //未签到
            console.log('ssss')
          })
        })

      }
    },


  }
</script>
<style lang='less'>
  #app .rignVerify .weui-cell:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 0PX;
    border-top: 1PX solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0);
    transform: scaleY(0);
    left: 15PX;
  }

  .rignVerify {
    height: 100%;
    position: relative;
    // background: url("../../assets/image/riightVerify.png") no-repeat center;
    background-size: 100% 100%;
    .rignVerifyOne {
      display: flex;
      position: absolute;
      top: 290px;
      left: 0;
      right: 0;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      /*  div:nth-child(1){
           background-color:rgba(0,0,0,0);;
        }*/
      .Regname {
        //  opacity:0.7;
        color: #b2b2b2;
        padding: 0;
        background: #fff;
        border-radius: 100px;
        width: 580px;
        height: 92px;
      }
      .RegnameTop {
        margin-top: 20px;
      }
    }

    .qiandao {
      background: #38bdf0;
      border-radius: 100px;
      width: 580px;
      height: 88px;
      font-size: 32px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      margin-top: 60px;
    }
    .divbtn {
      font-size: 30px;
      letter-spacing: 0;
      text-align: left;
      color: #38bdf0;
      display: inline-block;
      margin-right: 30px;
      border-left: 1px solid #b2b2b2;
      padding: 10px 20px;

    }
    .btn.disBtn {

      background-color: #a0a0a0
    }

    .btn.disBtn:active {
      background-color: #a0a0a0;
    }
    .btn:before {
      border: none;
      border-left: 1px solid rgb(187, 187, 187);
    }
    .leftimg img {
      //background:#ffffff;
      width: 36px;
      margin-left: 40px;
      margin-right: 30px;
      height: 38px;
    }
    .weui-input {
      font-size: 30px;

      letter-spacing: 0;
      text-align: left;
    }

  }

</style>
