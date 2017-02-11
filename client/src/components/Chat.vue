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
                <input type="text" class="form-control">
            </div>
            <div class="btn-group col-xs-2 col-md-2">
                <p id="msg_send_btn" class="text-center vertical-center">전송</p>
            </div>
        </div>
        <div id="cmd_container">
            <ul>
              <li v-for="item in commands" class="vertical-center">
                  {{item.text}}
              </li>
          </ul>
        </div>
  </div>
</template>

<script>
let coach_name = '무서운형';
let chat_histories = [
  {
    coach_type: 1,
    coach_img: '/static/images/coach_1_angry.gif',
    text: '코치대화1'
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
    text: '식사 기록'
  },
  {
    text: '식사 조회'
  },
  {
    text: '운동 기록'
  },
  {
    text: '운동 조회'
  },
  {
    text: '몸무게 기록'
  },
  {
    text: '몸무게 조회'
  },
  {
    text: '미션 기록'
  },
  {
    text: '미션 조회'
  },
];


export default {
  name: 'chat',
  data() {
    return {
      coach_name: coach_name,
      chat_histories: chat_histories,
      commands: commands
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
