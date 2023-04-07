<template>
<div>
    <div class="text-center">
     <div style="font-size:1.2rem; font-weight:bold; color:black;">리뷰 쓰기</div>
     
      <v-rating
        v-model="score"
        background-color="rightgray"
        color="indigo"
        large>
      </v-rating> 

    </div>
    <div class="review">
      
        <v-textarea 
          filled
          v-model="content"
          auto-grow
          label="리뷰를 작성해주세요"
          rows="4"
          row-height="30"
          counter="300"> 
        </v-textarea>

<!--
           :include-styling="false"
           v-on:vdropzone-thumbnail="thumbnail"
               -->
        <vue-dropzone ref="myVueDropzone" id="customdropzone" :options="dropzoneOptions" 
              v-on:vdropzone-sending="sendingEvent" 
              v-on:vdropzone-success="successEvent" 
              v-on:vdropzone-complete="completeEvent" 
              v-on:vdropzone-error="errorEvent" 
              v-on:vdropzone-file-added="fileAdded" 
              v-on:vdropzone-max-files-exceeded="maxFileEvent" 
              :useCustomSlot=true >
          <div class="dropzone-custom-content">
              <br>
              <v-icon class="dropzone-custom-title">mdi-camera</v-icon>
              <h3 class="dropzone-custom-title">사진 불러오기</h3>
          </div>
        </vue-dropzone>

   
        <v-btn color="primary" class="rv_write_btn" v-on:click="review_write">완료</v-btn>   
      
    </div>
 </div>       
</template>

<script>
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.min.css'
  
  export default {
    components: {
      vueDropzone: vue2Dropzone
    },
    computed: {
      store() {
        return this.$store.getters.store;
      },
      user_id() {
        return this.$store.getters.user_id;
      },
      table_id() {
        return this.$store.getters.table_id;
      }
    },
    data() {
      return {
        rid :"",
        score : 0,
        content:"",
        content_url:"",
        review:"",
        // dropzone_err: false,
        // 문서: https://rowanwins.github.io/vue-dropzone/docs/dist/index.html#/props  옵션 참조 https://www.dropzonejs.com/#configuration-options
        dropzoneOptions: {
          url: 'https://3.34.149.33/App2/cu_review',
          autoProcessQueue: false,
          uploadMultiple :false,
          renameFile : "image",
          resizeWidth : 800,
          addRemoveLinks: true,
          // maxFilesize: 1,  추가시 errorEvent 발생해서 우선 제거
          // timeout : 30000,  기본 30초
          // previewTemplate: this.template(),
          //  headers: { "My-Awesome-Header": "header value" }
        }
      }
    },
    created() {
        this.$store.commit("is_back",true);
        // this.dropzone_err = false;

        let rid =  this.$route.params.rid;
        
        if (rid > 0)
          this.fetchData(this.$route.params.rid);
    },
    methods: {
    
      sendingEvent (file, xhr, formData) {

        console.log("sendingEvent", file, xhr,formData);

        formData.append('store_id', this.store.store_id);
        formData.append('user_id', this.user_id);
        formData.append('gb', "1");
        formData.append('status', "N");
        formData.append('score', this.score);
        formData.append('content', this.content);
      },
      maxFileEvent(file){
        this.$store.commit("loading", false);
        console.log("maxFileEvent", file);
      },
      errorEvent (file, message, xhr) {
        // this.dropzone_err  = true;
        this.$store.commit("loading", false);
        this.showToast("등록 실패 - "+ message);
        console.log("errorEvent", file, message,xhr);

        //this.$refs.myVueDropzone.removeAllFiles();
        this.$refs.myVueDropzone.enable();
        
      },
      successEvent(file, response){

        console.log("successEvent", file, response);
        // this.dropzone_err  = false;

        this.$store.commit("loading", false);
        
        this.showToast("리뷰가 등록되었습니다.");
        this.$router.push("/menu/" + this.store.store_id + "/" + this.table_id);
        
      },
      completeEvent(response){
        this.$store.commit("loading", false);
        console.log("completeEvent", response);
      },
      fetchData(rid) {

        let param = {
          rid: rid
        };

        this.$store.commit("loading", true);

        this.$store.dispatch("r_review", param).then(res => {

          this.$store.commit('loading', false)

          this.review = res.data;
          this.score = res.data.score;
          this.content = res.data.content;
          
        });
      },
      review_write(){

        // this.dropzone_err = false;

        console.log('destroyDropzone',this.$refs.myVueDropzone)
        console.log('this.$refs.myVueDropzone.getActiveFiles().length',this.$refs.myVueDropzone.getActiveFiles().length);
  
        if (this.content.length < 10) {
          this.showToast("10글자 이상 리뷰를 입력하세요");
        } 
        else if (this.score < 1 ) {
          this.showToast("평점을 입력하세요");
        } 
        else
        {
          this.$store.commit("loading", true);
          if (this.$refs.myVueDropzone.getActiveFiles().length == 0)
            this.cu_review();
          else
            this.$refs.myVueDropzone.processQueue();
        }
        
        
      },
      cu_review()
      {
        console.log('cu_review');

        let param = {
          store_id: this.store.store_id,
          user_id : this.user_id,
          gb :"1",
          status :"N",
          score : this.score,
          content : this.content
        };

        this.$store.commit("loading", true);
      
        this.$store.dispatch("cu_review", param).then(res => {

          this.$store.commit('loading', false);

          if (res.data.result =="SUCCESS")
          {
            this.showToast("리뷰가 등록되었습니다.");
            this.$router.push("/menu/" + this.store.store_id + "/" + this.table_id);
          }
          else
          {
            this.showToast("리뷰작성을 완료하지 못했습니다. 통신상태를 확인하세요");
          }
          
        });
      }
    }      
  }
</script>

<style>

.dropzone .dz-preview {
  margin: 0px;
  display: block;
}

.dropzone {
    padding: 0px !important;
}

.dropzone .dz-preview .dz-image img {
    width: 100%;
    height: 100%;
}
</style>

<style scoped>


.review{
  padding: 1rem;
}
.text-center {
    margin-top: 1rem;
}
.theme--light.v-btn {
    color: #ffffff;
}
.rv_write_btn {
  width: 100%;
  margin-top: 1rem;
}
.image-upload > input
{
    display: none;
}

</style>