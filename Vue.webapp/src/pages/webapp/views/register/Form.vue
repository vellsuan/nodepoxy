<template>

	<div class="reg-form">
    <div class="reg-formPrt">
      <div class="reg-input">
        <group>
          <x-input class="Regname" title="姓名" ref="reg_name" v-model="userName" name="username" required
                   placeholder="请输入姓名"
                   placeholder-align="right" text-align="right" is-type="china-name" label-width="90px">

          </x-input>

          <!--  <popup-picker title="性别" ref="ref_sex"
                          @on-change="changeSex"
                          :columns="1"
                          class="sele Regname" required
                          :data="sexArr"
                          v-model="sexVal" show-name>

            </popup-picker>

            <x-input class="noheight">

            </x-input>-->

          <!-- <calendar class="calen Regname" title="出生日期" required v-model="birthday" disable-future></calendar>-->
          <popup-picker title="证件类型"
                        @on-change="changeCard"
                        class="sele Regname parentSele"
                        :columns="1"
                        required :data="cardArr"
                        v-model="cardVal" show-name>

          </popup-picker>

          <x-input v-if="typeinput" class="Regname" name="idNumber"
                   :min="15" :max="18"
                   :title='`<span style="${style}">证件号</span>`'
                   ref="reg_cardNum" placeholder="请输入证件号"
                   v-model="idNumber" text-align="right" placeholder-align="right" autocapitalize="characters">
          </x-input>
          <x-input v-else class="Regname" name="idNumber"
                   type="text"
                   :title='`<span style="${style}">证件号</span>`'
                   ref="reg_cardNum" placeholder="请输入证件号"
                   v-model="idNumber" text-align="right" placeholder-align="right" autocapitalize="characters">
          </x-input>
          <x-input class="Regname" title="手机号码" ref="reg_phone" v-model="phone" required placeholder-align="right"
                   name="mobile"
                   placeholder="请输入手机号码" text-align="right" keyboard="number" is-type="china-mobile"></x-input>
          <!-- <x-input class="Regname" title="邮箱" ref="reg_email" v-model="email" placeholder-align="right"
                    name="emile"
                    placeholder="请输入邮箱号码" text-align="right" keyboard="number" is-type="email"></x-input>-->
          <x-input title="验证码" ref="reg_code" v-model="vacode" required placeholder-align="right" text-align="right"
                   class="weui-vcode Regname inputWidth">
            <slot>
              <button slot="right" :class="{btn:true,disBtn:disBtn}" type="button" :disabled="nofunCl" mini
                      @click="getCode">{{msg}}
              </button>
            </slot>
          </x-input>

        </group>
      </div>
    </div>
    <div class="reg-buttonP">
      <div class="reg-button">
        <x-button class="for-btn" plain @click.native="submit" text="绑定"></x-button>
        <p class="fontFoter">*所填信息请与体检预留信息保持一致</p>
      </div>
    </div>

  </div>

</template>

<script>
	import {
		Group,
		XInput,
		XButton,
		Selector,
		Calendar,
		PopupPicker
	} from 'vux'
  import {ToastPlugin} from 'vux'
  import {Validator} from 'vee-validate';
	export default {
		components: {
			Group,
			XInput,
			XButton,
			Selector,
			Calendar,
      PopupPicker,
      ToastPlugin
		},
		data() {
			return {
        nofunCl: false,
        channel: '',
        email: '',
        first_name: '',
        last_name: '',
				userId: '', //用户ID
				userName: '', //用户名
				phone: '', //手机号
				birthday: '1980-01-01', //出生日期
				idNumber: '', //证件号码
				cardArr: [],
				sexArr: [],
				sexVal: [], //性别
				cardVal: [], //证件类型
				vacode: '', //短信验证码
				disBtn: false,
        typeinput: true,
				msg: "获取验证码",
				style: '',
				cardnum: function(value) {
					var val = (function() {
						var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
						if(reg.test(value) === false) {
							return false
						}
						return true
					})();
					return {
						valid: val === true,
						msg: '必须是233'
					}
				},
			}
		},
		methods: {

			changeSex(val) {
				this.sexVal = val;
			},
			changeCard(val) {
				this.cardVal = val;
        if (this.cardVal[0] != '01') {
          this.typeinput = false
        } else {
          this.typeinput = true

        }
			},
			doParent: function(val) {
				this.$emit('add', val)
			},
			onFocus(val, $event) {
				console.log('on focus', val, $event)
			},
			submit() {

        if (this.$refs.reg_name.valid && /* this.$refs.reg_email.valid &&*/ this.$refs.reg_phone.valid && this.$refs.reg_code) {
          //判断类型
          let idNumberType = false;

          //默认验证结果
          function IdentityCodeValid(code) {
            var city = {
              11: "北京",
              12: "天津",
              13: "河北",
              14: "山西",
              15: "内蒙古",
              21: "辽宁",
              22: "吉林",
              23: "黑龙江 ",
              31: "上海",
              32: "江苏",
              33: "浙江",
              34: "安徽",
              35: "福建",
              36: "江西",
              37: "山东",
              41: "河南",
              42: "湖北 ",
              43: "湖南",
              44: "广东",
              45: "广西",
              46: "海南",
              50: "重庆",
              51: "四川",
              52: "贵州",
              53: "云南",
              54: "西藏 ",
              61: "陕西",
              62: "甘肃",
              63: "青海",
              64: "宁夏",
              65: "新疆",
              71: "台湾",
              81: "香港",
              82: "澳门",
              91: "国外 "
            };
            var tip = "";
            var pass = true;

            if (!code || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
              tip = "身份证号格式错误";
              pass = false;
            }

            else if (!city[code.substr(0, 2)]) {
              tip = "地址编码错误";
              pass = false;
            }
            else {
              //18位身份证需要验证最后一位校验位
              if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                  ai = code[i];
                  wi = factor[i];
                  sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                  tip = "校验位错误";
                  pass = false;
                }
              }
            }
            if (!pass)

              console.log(tip);
            return {result: pass, msg: tip};
          }

          //证件类型为身份证的时候在验证
          if (this.cardVal[0] == '01') {


          var idNumberRsult = IdentityCodeValid(this.idNumber);
            idNumberType = idNumberRsult.result;
            //為身份證验证独立弹窗，因为是上送前的验证
            if(!idNumberRsult.result){//校验未通过时弹框
              this.dilog(idNumberRsult.msg);
            }
          } else {
            //不是身份证自动通过
            idNumberType = true;
          }
          //身份证通过在上送参数
          if (idNumberType) {
            let params = {
              url: '/mdtc/bindPhone',
              data: {
                idCode: this.cardVal[0] || '',
                idNumber: this.idNumber || '',
                phone: this.phone || '',
                userId: this.userId || '',
                userName: this.userName || '',
                unionid: this.userinfo.unionid, //微信识别码
                vacode: this.vacode || '', //短信验证码
                /* birthday: this.birthday || '',*/
                /* sexCode: this.sexVal[0] || '',*/
                /* email: this.email || ''*/
              }
            };

            //绑定个人信息
            let _t = this;
            this.api.post(params, response => {

              this.$router.push({
                path: "/"
              })
            }, true, function () {
              _t.vacode = ''
            })
          }

          return false

				} else {
					this.$emit("add", true)
				}
			},
			getCode() { //获取验证码
        let _t = this;
        /*	if(this.disBtn) {
                      return;
                  }*/
        let pramese = {
          url: 'CM100001',
          data: {
            channel: _t.channel,
            phone: _t.phone
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


			}
		},

    mounted() {

      this.userinfo = this.$store.state && this.$store.state.userinfo || "";
			this.userId = this.userinfo.userId;
      this.channel = this.userinfo.channel;
			let that = this;

      let paramsCT = {
        url: 'DICT0201',
        data: {}
      };
      this.api.post(paramsCT, response => {
				let arr = response && response.list || [];
				for(let i = 0; i < arr.length; i++) {
					this.sexVal[0] = arr[0].value;
					this.sexArr.push({
						name: arr[i].label,
						value: arr[i].value,
					})
				}
			});
			// 证件类型
      let paramsDI = {
        url: 'DICT0202',
        data: {}
      };
      this.api.post(paramsDI, response => {

        console.log(response);
        let arr = response && response.list || [];

        for (let i = 0; i < arr.length; i++) {
          this.cardVal[0] = arr[0].value;
          this.cardArr.push({
            name: arr[i].label,
            value: arr[i].value
          })

        }
      })
		}

	}
</script>

<style lang="less">
  /* #app{height: auto}*/
  .reg-formPrt {
    padding-left: 30px;
    padding-right: 30px;
  }

  //没有内容时候会被改变盒子模型
  .reg-form {
    .vux-popup-picker-value {
      display: inline-block;
    }
  }

  /*加了4px高度要修改*/
  .weui-cell__hd {
    padding-top: 4px;
  }
  .reg-form .weui-cell:before {
    left: 0;

  }


  .reg-form .vux-cell-box {

    line-height: 96px;
  }

  .reg-form .vux-cell-box:before {
    /* transform: scaleY(1);
     border-top: 1PX solid #e5e5e5;*/
    left: 0;
  }

  .reg-form .weui-cell {
    margin: 0;
    /*line-height: 100%;*/
    padding: 0;
    padding-right: 20px;
    padding-left: 20px;
  }
	.reg-form {
    /* padding-left: 30px;
      padding-right: 30px;*/

		flex: 1;
    /*background-color: rgb(241, 241, 241);*/
	}

  .reg-form .weui-cells {
		margin-top: 0;
	}

  .reg-buttonP {

    background-color: rgb(241, 241, 241);
  }
  .reg-form .reg-input {
    /* margin: -72px 18px 0;*/
    margin-top: -72px;
    /* margin-left: 18px;
     margin-right: 18px;*/
    padding-left: 20px;
    padding-right: 20px;
    /*	padding: 6px;*/
		border-radius: 18px;
		font-size: 28px;

    background: #fff;
		overflow: hidden;
	}

  .vux-x-input {
		height: 70px;
	}

  .vux-selector {
		height: 90px;
	}

  .sele .weui-label {
		width: 500px;
	}

  .sele option {
		color: #747474;
	}

  .reg-form .vux-no-group-title::before,
	.reg-form .vux-no-group-title::after {
		content: '';
		border: none;
	}

  .reg-form .weui-cell__ft button,
	.reg-form .weui-cell__ft button:active {
    /*width: 180px;*/
		background: #ffffff;
		color: #a0a0a0;

  }

  .reg-form .weui-cell__ft button::before {
		content: "";
		border-left: 1px solid #b8b8b8;
		padding-right: 30px;
	}

  .reg-form .weui-cell__ft button::after {
		content: "";
		border: none;
	}

  .reg-form .reg-button {
		width: 450px;

    height: 186px;
    margin: auto;
    /* padding-top: 37px;*/
    margin-top: 37px;

		background: url("../../assets/image/reg-btn-bg.png") center 80px no-repeat;
		background-size: 100%;

  }

  .reg-form .for-btn,
	.reg-form .for-btn:active {
		height: 92px;
		border: none;
		font-size: 36px;

    color: #fff;
		background: url("../../assets/image/reg-btn.png") center no-repeat;
		background-size: 100%;
		-webkit-border-radius: 40px;
		-moz-border-radius: 40px;
		border-radius: 40px;
	}

  .reg-form .weui-vcode .btn {
    /*border-radius: 10px;
        height: 80px;
        color: #fff;
        background-color: #38bdf0;
        border: #38bdf0*/
    border: none;

    font-size: 28px;
    font-weight: normal;
    font-stretch: normal;
    /*line-height: 40px;
*/
    color: #a0a0a0;
	}

  .reg-form .weui-vcode .btn.disBtn {
		background-color: #a0a0a0
	}

  .reg-form .weui-vcode .btn.disBtn:active {
		background-color: #a0a0a0;
	}

  /*按钮点击颜色*/
  /*.reg-form .weui-vcode .btn:active {
		background-color: #38bdf0;
	}*/

  .reg-form .weui-vcode .btn:before {
		border: none;
    border-left: 1px solid rgb(187, 187, 187);
	}

  .inline-calendar th {
		text-align: center;
	}

  .calen label {
    /*font-size: 34px;*/
    color: #333;
    line-height: 100%;
  }

  .reg-form label {
    line-height: 100%;
  }
  .Regname {

    min-width: 610px;
    line-height: 96px;
    height: 96px;
    padding: 0;
    margin: 0;
    /*不知道为什么不居中*/
    padding-top: 2px;
    font-size: 28px;
    font-weight: normal;
    font-stretch: normal;
  }

  .Regname:nth-child(1) {
    .weui-cell__hd {
      padding-top: 8px;
    }
    input {
      padding-top: 8px;
    }
  }

  input::placeholder {
    color: #999;
    font-size: 28px;
    font-family: Arial, "Microsoft Yahei", "Helvetica Neue", Helvetica, sans-serif;
    font-weight: normal;
    font-stretch: normal;
  }

  .regFormPt {
    padding-right: 20px;
    padding-left: 20px;
  }

  .reg-form {
    /*  background: -webkit-gradient(linear,center top,center bottom,from(#fff), to(rgb(241, 241, 241)));*/
    background-color: rgb(241, 241, 241);
    height: auto;
    position: absolute;
    top: 600px;
  }

  /*解决缺少一根0.5px线的问题空标签站位*/
  .noheight {
    height: 0;
  }

  /* .parentSele {
     display: flex;
     div {
       flex: 1;
     }
   }*/

</style>
