<template>
  <HeaderBar />
  <div class="container">
    <router-view @alert="showAlert" @notice="showNotice" />
  </div>
  <div v-if="isNoticeVisible" class="flash-notification">
    <NoticeFlash :notice="notice" @dismissNotice="dismissNotice" />
  </div>
  <div v-if="isAlertVisible" class="flash-notification">
    <AlertFlash :alert="alert" @dismissAlert="dismissAlert" />
  </div>
  <NavBar />
</template>

<script>
import axios from 'axios'
import NavBar from './components/Shared/NavBar.vue'
import HeaderBar from './components/Shared/HeaderBar.vue'
import NoticeFlash from './components/NoticeFlash.vue'
import AlertFlash from './components/AlertFlash.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    HeaderBar,
    NoticeFlash,
    AlertFlash
  },
  data() {
    return {
      isNoticeVisible: false,
      notice: "This is a notice",
      isAlertVisible: false,
      alert: "This is a alert",
    }
  },
  methods: {
    showNotice(notice) {
      this.notice = notice;
      this.isNoticeVisible = true;
      setTimeout(() => {
        this.isNoticeVisible = false;
      }, 15000);
    },
    dismissNotice() {
      this.isNoticeVisible = false;
      this.notice = "";
    },
    showAlert(alert) {
      this.alert = alert;
      this.isAlertVisible = true;
    },
    dismissAlert() {
      this.isAlertVisible = false;
      this.alert = "";
    },
  },
  async created() {
    try {
      // set user state to Current_user upon creating App
      const response = await axios.get('users/current_user')
      this.$store.dispatch('user', response.data)
    } catch (error) {
      // console.error('An error occurred while logging in:', error);
      this.showAlert('Please Login')
    }
  }
}
</script>

<style lang="scss">
.container {
  // padding-top: 16px;
  // padding-bottom: 8vh;
  width: 80%;
  // margin: 60px auto 50px;
  margin: 80px auto 50px;
  text-align: center;
}

.flash-notification {
  position: fixed;
  top: 40px;
  right: 20px;
  z-index: 9999;
}
</style>
