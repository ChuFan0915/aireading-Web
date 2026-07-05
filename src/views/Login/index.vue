<script setup lang="ts">
import { onMounted, ref,computed} from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { apiLogin,apiRegister,apiSendCode } from '@/utils/serves'
import { setToken } from '@/utils/auth'
const router = useRouter()
const message = useMessage()

const activeTab = ref<'login' | 'register'>('login')
const loading = ref(false)
const count=ref(0)
let timer:any=null
function validateEmail(email:string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// 名言状态
const quote = ref({
  content: '读书不是为了拿学位或谋生，而是为了获得一种内在的平静。',
  author: '赫尔曼·黑塞',
  origin: '《悉达多》'
})

// 获取名言
const fetchQuote = async () => {
  try {
    const response = await fetch('https://v1.hitokoto.cn/?c=d&c=i')
    const data = await response.json()
    quote.value = {
      content: data.hitokoto,
      author: data.from_who || '佚名',
      origin: data.from
    }
  } catch (err) {
    console.log('获取名言失败:', err)
  }
}

const loginForm = ref({
  account: '',
  password: ''
})

const registerForm = ref({
  account: '',
  email: '',
  comfirmCode:'',
  password: '',
  confirmPassword: ''
})

onMounted(() => {
  fetchQuote()
})

const handleLogin = async () => {
  if (!loginForm.value.account || !loginForm.value.password) {
    message.warning('请填写完整信息')
    return
  }
  loading.value=true
  try{
    const params:any={
      username:loginForm.value.account,
      password:loginForm.value.password
    }
    const res:any=await apiLogin(params)
    if(res.code=='200'){
        setToken(res.data.token)
        message.success('登录成功')
        router.push('/')
    }
  }catch(error){
    console.log(error,'---错误');
    
    message.warning('登录失败,请稍后再试')
  }finally{
    loading.value=false
  }
}

const handleRegister = async () => {
  if (!registerForm.value.account || !registerForm.value.email || !registerForm.value.password || !registerForm.value.confirmPassword) {
    message.warning('请填写完整信息')
    return
  }
  loading.value=true
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    message.error('两次密码不一致')
    return
  } 
  try{
    const params:any={
        account:registerForm.value.account,
        email:registerForm.value.email,
        password:registerForm.value.password,
        code:registerForm.value.comfirmCode,
        confirmPassword:registerForm.value.confirmPassword
    }
    const res:any=await apiRegister(params)
    if(res.code=='201'){
      message.success('注册成功,请返回登录')
    }
  }catch(err){
    console.log(err);
  }finally{
    loading.value=false
  }
}
const options = computed(() => {
  return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
    const prefix = registerForm.value.email.split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix
    }
  })
})
const handleEmit=async()=>{
  if(count.value>0) return
  if(!registerForm.value.email){
    message.warning('请正确填写邮箱')
    return
  }
  const isEamil=validateEmail(registerForm.value.email)
  if(!isEamil){
    message.warning('请检查邮箱正确格式')
    return
  }
  try{ 
    const params={
      email:registerForm.value.email
    }  
    const res:any=await apiSendCode(params)
    if(res.code=='200'){
      message.success('验证码已发出')
    }else{
      message.error('请检查邮箱格式')
    }
  }catch(error){
    console.log(error);
    
  }
  // 写一个定时器
  // 先给这个value设个值
  count.value=60
  timer=setInterval(()=>{
    if(count.value>0){
      count.value--
    }else{
      // 清理定时器
      clearInterval(timer)
      timer=null
    }
  },1000)
}
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center "
  >
    <div class="w-300 max-w-sm">
      <div class="mb-10 text-center">
        <h1 class="mt-4 text-2xl font-semibold tracking-tight text-[#1d1d1f] mb-2">
           读吧
        </h1>
      </div>

      <!-- 登录卡片 -->
      <div class="rounded-2xl  shadow-sm dark:bg-neutral-800">
        <n-tabs v-model:value="activeTab" type="segment" size="small">
          <n-tab-pane name="login" tab="登录">
            <n-form class="mt-5" @submit.prevent="handleLogin">
              <n-space vertical :size="16">
                <n-input
                  v-model:value="loginForm.account"
                  placeholder="账户"
                  autocomplete="username"
                  size="large"
                />
                <n-input
                  v-model:value="loginForm.password"
                  type="password"
                  show-password-on="click"
                  placeholder="密码"
                  autocomplete="current-password"
                  size="large"
                />
                <n-button
                  block
                  :loading="loading"
                  attr-type="submit"
                  size="large"
                  class="!rounded-xl !bg-[#1d1d1f] !text-white hover:!bg-[#2d2d2f] dark:!bg-[#f5f5f7] dark:!text-[#1d1d1f] dark:hover:!bg-[#e5e5e7]"
                >
                  登录
                </n-button>
              </n-space>
            </n-form>
          </n-tab-pane>

          <n-tab-pane name="register" tab="注册">
            <n-form class="mt-5" @submit.prevent="handleRegister">
              <n-space vertical :size="16">
                <n-input
                  v-model:value="registerForm.account"
                  placeholder="账户"
                  autocomplete="username"
                  size="large"
                />
                <n-auto-complete
                  v-model:value="registerForm.email"
                  placeholder="邮箱"
                  autocomplete="tel"
                  :options
                  clearable
                  size="large"
                >
                <template #suffix>
                  <n-button
                  size="small"
                  @click="handleEmit"
                  
                  >
                  {{ 
                  count>0?`还剩${count}s重新发送验证码`:'发送验证码'
                  }}
                  </n-button>
                </template>
                </n-auto-complete>
                <n-input
                v-model:value="registerForm.comfirmCode"
                placeholder="验证码"
                size="large"
                />
                
                <n-input
                  v-model:value="registerForm.password"
                  type="password"
                  show-password-on="click"
                  placeholder="至少6位密码"
                  autocomplete="new-password"
                  size="large"
                />
                <n-input
                  v-model:value="registerForm.confirmPassword"
                  type="password"
                  show-password-on="click"
                  placeholder="再次输入密码"
                  autocomplete="new-password"
                  size="large"
                />
                <n-button
                  block
                  :loading="loading"
                  attr-type="submit"
                  size="large"
                  class="!rounded-xl !bg-[#1d1d1f] !text-white hover:!bg-[#2d2d2f] dark:!bg-[#f5f5f7] dark:!text-[#1d1d1f] dark:hover:!bg-[#e5e5e7]"
                >
                  创建账号
                </n-button>
              </n-space>
            </n-form>
          </n-tab-pane>
        </n-tabs>
      </div>

      <div class="mt-8 text-center">
        <p class="text-xs leading-relaxed text-[#86868b] italic">
          "{{ quote.content }}"
        </p>
        <p class="mt-1 text-[10px] text-[#a1a1a6]">
          —— {{ quote.author }}《{{ quote.origin }}》
        </p>
      </div>
    </div>
  </div>
</template>
