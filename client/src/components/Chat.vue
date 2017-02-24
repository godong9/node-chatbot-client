<template>
  <div class="chat">
        <nav id="nav_container">
            <p class="text-center vertical-center">{{coach_name}}</p>
        </nav>
        <div id="chat_container">
            <div v-for="item in chat_histories" class="row chat-item">
              <div v-if="item.is_user" class="user-chat">
                <div class="my-img-item col-xs-4 col-md-4">
                </div>
                <div class="talk-bubble tri-right border round right-in col-xs-7 col-md-7">
                  {{item.text}}
                </div>
                <div class="col-xs-1 col-md-1">
                </div>
              </div>
              <div v-else class="coach-chat">
                <div class="coach-img-item col-xs-3 col-md-3">
                    <img class="coach-img img-circle" :src="item.coach_img">
                </div>
                <div class="talk-bubble tri-right border round left-in col-xs-8 col-md-8">
                    {{item.text}}
                </div>
                <div class="col-xs-1 col-md-1">
                </div>
              </div>
            </div>
        </div>
        <div id="input_container" class="row">
            <div class="form-group col-xs-10 col-md-10">
                <input id="message_input" v-on:keyup.enter="send_message" v-model="current_message" type="text" class="form-control" placeholder="대화를 입력해주세요.">
            </div>
            <div class="btn-group col-xs-2 col-md-2" v-on:click="send_message">
                <p id="msg_send_btn" class="text-center vertical-center">전송</p>
            </div>
        </div>
        <div id="cmd_container">
            <ul>
              <li v-for="item in commands" class="vertical-center" v-on:click="click_cmd">
                  {{item.cmd}}
              </li>
          </ul>
        </div>
  </div>
</template>

<script>
  let is_sending = false;
  let current_message = '';
  let coach_name = '기본형(남)';
  let chat_histories = [];
  let coach_hi_message = {
    type: 1,
    emotion: 'hi',
    text: '안녕, 반가워!'
  };
  let commands = [
    {
      cmd: '식사 기록'
    },
    {
      cmd: '식사 보기'
    },
    {
      cmd: '운동 기록'
    },
    {
      cmd: '운동 보기'
    },
    {
      cmd: '몸무게 기록'
    },
    {
      cmd: '몸무게 보기'
    },
    {
      cmd: '미션 기록'
    },
    {
      cmd: '미션 보기'
    },
  ];

  export default {
    name: 'chat',
    data() {
      let self = this;
      let i = 0;

      HttpUtil.getData('/users', {}, function(err, data) {
        self.coach_name = data.coachType;
      });

      HttpUtil.getData('/messages', {}, function(err, data) {
        for (i = 0; i < data.messages.length; i++) {
          let item = data.messages[i];
          if (item.isUser) {
            self.add_user_history(item.text);
          } else {
            item.type = 2;
            item.emotion = 'tell';
            self.add_coach_history(item);
          }
        }
        self.add_coach_history(coach_hi_message);
      });

      return {
        is_sending: is_sending,
        current_message: current_message,
        coach_name: coach_name,
        chat_histories: chat_histories,
        commands: commands
      };
    },
    methods: {
      send_message() {
        let self = this;
        if (!this.current_message) {
          return false;
        }
        if (this.is_sending) {
          alert("요청 중입니다. 잠시 후 다시 시도해주세요!");
          return false;
        }
        let userMessage = this.current_message;
        self.add_user_history(userMessage);

        self.current_message = '';
        self.is_sending = true;

        HttpUtil.postData('/messages/ask', {text: userMessage}, function(err, data) {
          self.is_sending = false;
          data.type = 2;
          data.emotion = 'like';

          self.add_coach_history(data);
          self.scroll_to_bottom();
        });
      },
      add_user_history(user_message) {
        this.chat_histories.push({
          is_user: true,
          text: user_message
        });
        this.scroll_to_bottom();
      },
      add_coach_history(coach_message) {
        coach_message.img = '/static/images/coach_' + coach_message.type + '_' + coach_message.emotion + '.gif';
        this.chat_histories.push({
          coach_type: coach_message.type,
          coach_img: coach_message.img,
          text: coach_message.text
        });
        this.scroll_to_bottom();
      },
      scroll_to_bottom() {
        this.$nextTick(() => {
          $('#chat_container').animate({ scrollTop: $('#chat_container').prop("scrollHeight") }, 500);
        });
      },
      click_cmd(event) {
        this.current_message = $(event.target).text().trim() + ' ';
        $('#message_input').focus();
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  /* nav_container start */
  #nav_container {
    height: 8%;
    background-color: #60579D;
  }

  #nav_container > p {
    font-size: 20px;
    color: white;
  }
  /* nav_container end */

  /* chat_container start */
  #chat_container {
    height: 78%;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  #chat_container > .chat-item {
    padding: 10px;
  }

  #chat_container .talk-bubble {
    margin-bottom: 15px;
  }

  #chat_container .coach-img-item {
    height: 100%;
  }

  #chat_container .coach-img {
    width: 100%;
  }


  /* General CSS Setup */
  body{
    background-color: lightblue;
    font-family: "Ubuntu-Italic", "Lucida Sans", helvetica, sans;
  }

  /* container */
  .container {
    padding: 5% 5%;
  }

  /* CSS talk bubble */
  .talk-bubble {
    display: inline-block;
    position: relative;
    height: auto;
    padding: 10px;
    background-color: white;
  }
  .border{
    border: 3px solid #666;
  }
  .round{
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
  }

  /* Right triangle placed top left flush. */
  .tri-right.border.left-top:before {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: -40px;
    right: auto;
    top: -8px;
    bottom: auto;
    border: 32px solid;
    border-color: #666 transparent transparent transparent;
  }
  .tri-right.left-top:after{
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: -20px;
    right: auto;
    top: 0px;
    bottom: auto;
    border: 22px solid;
    border-color: lightyellow transparent transparent transparent;
  }

  /* Right triangle, left side slightly down */
  .tri-right.border.left-in:before {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: -17px;
    right: auto;
    top: 7px;
    bottom: auto;
    border: 8px solid;
    border-color: #666 #666 transparent transparent
  }
  .tri-right.left-in:after{
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: -9px;
    right: auto;
    top: 10px;
    bottom: auto;
    border: 6px solid;
    border-color: white white transparent transparent;
  }

  /*Right triangle, placed bottom left side slightly in*/
  .tri-right.border.btm-left:before {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: -8px;
    right: auto;
    top: auto;
    bottom: -40px;
    border: 32px solid;
    border-color: transparent transparent transparent #666;
  }
  .tri-right.btm-left:after{
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: 0px;
    right: auto;
    top: auto;
    bottom: -20px;
    border: 22px solid;
    border-color: transparent transparent transparent lightyellow;
  }

  /*Right triangle, placed bottom left side slightly in*/
  .tri-right.border.btm-left-in:before {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: 12px;
    right: auto;
    top: auto;
    bottom: -22px;
    border: 10px solid;
    border-color: #666 transparent transparent #666;
  }
  .tri-right.btm-left-in:after{
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: 15px;
    right: auto;
    top: auto;
    bottom: -15px;
    border: 8px solid;
    border-color: white transparent transparent white;
  }

  /*Right triangle, placed bottom right side slightly in*/
  .tri-right.border.btm-right-in:before {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: auto;
    right: 30px;
    bottom: -40px;
    border: 20px solid;
    border-color: #666 #666 transparent transparent;
  }
  .tri-right.btm-right-in:after{
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: auto;
    right: 38px;
    bottom: -20px;
    border: 12px solid;
    border-color: lightyellow lightyellow transparent transparent;
  }
  /*
      left: -8px;
    right: auto;
    top: auto;
      bottom: -40px;
      border: 32px solid;
      border-color: transparent transparent transparent #666;
      left: 0px;
    right: auto;
    top: auto;
      bottom: -20px;
      border: 22px solid;
      border-color: transparent transparent transparent lightyellow;

  /*Right triangle, placed bottom right side slightly in*/
  .tri-right.border.btm-right:before {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: auto;
    right: -8px;
    bottom: -40px;
    border: 20px solid;
    border-color: #666 #666 transparent transparent;
  }
  .tri-right.btm-right:after{
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: auto;
    right: 0px;
    bottom: -20px;
    border: 12px solid;
    border-color: lightyellow lightyellow transparent transparent;
  }

  /* Right triangle, right side slightly down*/
  .tri-right.border.right-in:before {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: auto;
    right: -21px;
    top: 10px;
    bottom: auto;
    border: 10px solid;
    border-color: #666 transparent transparent #666;
  }
  .tri-right.right-in:after{
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: auto;
    right: -13px;
    top: 13px;
    bottom: auto;
    border: 7px solid;
    border-color: white transparent transparent white;
  }

  /* Right triangle placed top right flush. */
  .tri-right.border.right-top:before {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: auto;
    right: -40px;
    top: -8px;
    bottom: auto;
    border: 32px solid;
    border-color: #666 transparent transparent transparent;
  }
  .tri-right.right-top:after{
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: auto;
    right: -20px;
    top: 0px;
    bottom: auto;
    border: 20px solid;
    border-color: lightyellow transparent transparent transparent;
  }

  /* talk bubble contents */
  .talktext{
    padding: 1em;
    text-align: left;
    line-height: 1.5em;
  }
  .talktext p{
    /* remove webkit p margins */
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
  }


  /* chat_container end */

  /* input_container start */
  #input_container {
    height: 8%;
    padding: 8px;
    margin: 0px;
  }

  #input_container > div {
    height: 100%;
    margin: 0px;
    padding: 0px 2px;
  }

  #input_container .btn-group {
    background-color: #60579D;
    color: white;
  }

  #input_container .form-control {
    height: 100%;
  }
  /* input_container end */

  #msg_send_btn {
    margin: 0px;
  }

  #cmd_container {
    width: 100%;
    height: 6%;
    padding: 2px 12px;
    overflow-x: scroll;
    overflow-y: hidden;
    outline: none;
  }

  #cmd_container > ul {
    width: 170%;
    height: 100%;
    padding: 0px;
    margin: 0px;
    list-style: none;
  }

  #cmd_container > ul > li {
    float: left;
    font-size: 16px;
    top: 40%;
    margin: 0px 8px;
  }

</style>
