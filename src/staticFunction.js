export default {
  methods: {
    formatPrice(value, type) {
      value += '';
      if (value == '' || isNaN(value)) return value;
      else if (type === 'auction') {
        return value.replace(/[^0-9]/g,"")
      }
      else if (type === 'receipt') {
        if (value !== null|| undefined !== value)
          return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      else if (type === 'coupon') {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' 원';
      }
      else {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    hideToast() {
      this.$store.commit('toast', {
        toast: false,
        msg: ''
      })
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
    showToast(msg) {
      console.log('toast',msg);

      this.$store.commit('toast', {
        toast: true,
        toast_msg: msg,
        timeout :2000
      })

      // if (this.toastTimer) clearTimeout(this.toastTimer)
      //   this.toastTimer = setTimeout(() => {
      //     this.$store.commit('toast', {
      //       toast: false,
      //       toast_msg: ''
      //     })
      //   }, 2000)
    },
    urlError(e) {
      e.target.src = this.default_img;
    },
    isNumber(s) {
      s += ''; // 문자열로 변환
      s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
      if (s == '' || isNaN(s)) return false;
      return true;
    },
    timeCalc(chk_st_dt, chk_ed_dt) {

      //console.log('timeCalc !!!!');

      let today = new Date();
      let t_date = '';
      let year = today.getFullYear();
      let month = today.getMonth()+1;
      if (month < 10) month = '0' + month;
      let date = today.getDate();
      if (date < 10) date = '0' + date;
      let hour = today.getHours();
      if (hour < 10) hour = '' + '0' + hour;
      let min = today.getMinutes();
      if (min < 10) min = '0' + min;


      let st_dt = year + '' + month + '' + date + chk_st_dt;
      let ed_dt = year + '' + month + '' + date + chk_ed_dt;
      t_date = year + '' + month + '' + date + '' + hour + '' + min;

      // return true;
      //console.log('22',st_dt, ed_dt, t_date);
      if (eval(t_date) >= eval(st_dt) && eval(t_date) <= eval(ed_dt)) {
        return true;
      }
      else {
        return false
      }
    },
    timeSaleDesc(st_time1, ed_time1, st_time2, ed_time2) {
      let time_str = '';
      let half_front = '';
      let half_back = '';

      // console.log(st_time1);

      if (st_time1 !== '' && ed_time1 !== '') {
        half_front = st_time1.split('').splice(0,2).join('');
        half_back = st_time1.split('').splice(2,2).join('');
        time_str += half_front + ':';
        // if (half_back !== '00')
          time_str += half_back
        time_str += ' ~ ';

        half_front = ed_time1.split('').splice(0,2).join('');
        half_back = ed_time1.split('').splice(2,2).join('');
        time_str += half_front + ':';
        // if (half_back !== '00')
          time_str += half_back;

      }

      if (st_time2 !== '' && ed_time2 !== '') {
        time_str += ' / ';
        half_front = st_time2.split('').splice(0,2).join('');
        half_back = st_time2.split('').splice(2,2).join('');
        time_str += half_front + ':';
        // if (half_back !== '00')
          time_str += half_back;
        time_str += ' ~ ';

        half_front = ed_time2.split('').splice(0,2).join('');
        half_back = ed_time2.split('').splice(2,2).join('');
        time_str += half_front + ':';
        // if (half_back !== '00')
          time_str += half_back ;
      }

      return time_str;
    }
  }
};
