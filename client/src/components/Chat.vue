<template>
  <div class="chat">
        <nav id="nav_container">
            <p class="text-center vertical-center">{{coach_name}}</p>
        </nav>
        <div id="chat_container">
            <div v-for="item in chat_histories" class="row chat-item">
              <div v-if="item.coach_type > 0" class="coach-chat">
                <div class="coach-img-item col-xs-3 col-md-3">
                    <img class="coach-img img-circle" :src="item.coach_img">
                </div>
                <div class="talk-bubble tri-right border round left-in col-xs-8 col-md-8">
                    {{item.text}}
                </div>
                <div class="col-xs-1 col-md-1">
                </div>
              </div>
              <div v-else class="user-chat">
                <div class="my-img-item col-xs-4 col-md-4">
                </div>
                <div class="talk-bubble tri-right border round right-in col-xs-7 col-md-7">
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
  let coach_name = '무서운형';
  let chat_histories = [
    {
      coach_type: 1,
      coach_img: '/static/images/coach_1_angry.gif',
      text: '가아너힘ㄴ어하ㅣ먼ㅇ하ㄴㅁㅇㅎㅁㄴㅇㅎgdsgadsㅣㅓㅁㄴ아ㅣ험닝허ㅣㅁㄴㅇ허ㅣㅏㅁㄴ어힘넝히ㅏ먼이ㅏ험닝허미낭ㅎ'
    },
    {
      coach_type: 2,
      coach_img: '/static/images/coach_1_angry.gif',
      text: '코치대화2'
    },
    {
      coach_type: 3,
      coach_img: '/static/images/coach_1_angry.gif',
      text: '코치대화3'
    },
    {
      text: '유저대화'
    },
    {
      text: '유저대화'
    },
  ];
  let commands = [
    {
      cmd: '식사 기록'
    },
    {
      cmd: '식사 조회'
    },
    {
      cmd: '운동 기록'
    },
    {
      cmd: '운동 조회'
    },
    {
      cmd: '몸무게 기록'
    },
    {
      cmd: '몸무게 조회'
    },
    {
      cmd: '미션 기록'
    },
    {
      cmd: '미션 조회'
    },
  ];

  export default {
    name: 'chat',
    data() {
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
        if (!this.current_message) {
          alert("대화 내용을 입력해주세요!");
          return false;
        }
        if (this.is_sending) {
          alert("요청 중입니다. 잠시 후 다시 시도해주세요!");
          return false;
        }
        this.chat_histories.push({
          text: this.current_message
        });

        this.current_message = '';
        //TODO: is_sending 트루로 변경하고 서버로 데이터 전송 후 응답오면 is_sending 팔스로 변경
        this.is_sending = true;
        this.is_sending = false;
        $('#chat_container').animate({ scrollTop: $('#chat_container').height() }, 100);
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


</style>
