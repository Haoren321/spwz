<template>
  <div id="uploadVideo">
    <template>
      <Upload
        ref="upload"
        :before-upload = "handleUpload"
        action="/api/getupload.php"
        enctype="multipart/form-data"
        :on-success="uploadSuccess"
        name="video">
        <Button icon="ios-cloud-upload-outline">Upload files</Button>
      </Upload>
      <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div>
    </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      file:null,
      loadingStatus:false
    }
  },
  methods: {
    handleUpload(file){
      this.file = file;
      //console.log(this.file)
      return false;
    },
    upload () {
      this.loadingStatus = true;
      //this.file = null;
      this.loadingStatus = false;    
      //let keyID = Math.random().toString().substr(2);
      this.$refs.upload.post(this.file);
      //console.log(this.file);
      },
      uploadSuccess(res,file,fillist){
        console.log(res);
      }    
  }
}
</script>
