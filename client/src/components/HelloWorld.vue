<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="账号">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" />
    </el-form-item>
    <el-form-item label="验证码">
      <div style="display:flex">
            <el-input  v-model="form.code" />
            <img @click="resetCode" :src="codeUrl" alt="">
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  password: '',
  code: ''
});
const codeUrl = ref<string>('/api/user/captcha');

const resetCode = () => codeUrl.value + '?' + Math.random();

const onSubmit = async () => { 
  console.log('submit~~', form);
  await fetch('/api/user/create', {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
              'content-type': 'application/json'
          }
    }).then(res => res.json())
}
</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
