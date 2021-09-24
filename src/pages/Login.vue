<template>
  <q-layout>
    <q-page
      class="window-height window-width row justify-center items-center"
      style="background: linear-gradient(135deg, #ea5c54 0%, #bb6dec 100%)"
    >
      <div class="column">
        <div class="row">
          <q-card
            square
            dark
            class="q-pa-md q-ma-none no-shadow bg-grey-10"
            style="width: 320px"
          >
            <q-card-section class="q-mb-md">
              <p
                class="
                  text-weight-bolder
                  text-grey-1
                  text-center
                  text-uppercase
                  text-h5
                "
              >
                App copytrade
              </p>
            </q-card-section>
            <q-card-section class="q-mt-xl q-mb-md">
              <p class="text-weight-bolder text-grey-2 text-center text-h6">
                Đăng nhập
              </p>
            </q-card-section>
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input
                  dark
                  dense
                  square
                  filled
                  clearable
                  v-model="email"
                  type="email"
                  label="Email"
                  :rules="[
                    (val) => !!val || 'Hãy điền email của bạn',
                    isValidEmail,
                  ]"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
                <q-input
                  dark
                  dense
                  square
                  filled
                  clearable
                  v-model="password"
                  type="password"
                  label="Password"
                  :rules="[(val) => !!val || 'Hãy điền password của bạn']"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
              </q-form>
            </q-card-section>
            <q-card-actions>
              <div class="row full-width items-center">
                <div class="col-6">
                  <q-btn
                    outline
                    rounded
                    size="md"
                    color="deep-orange"
                    class="full-width text-white"
                    label="Đăng nhập"
                    @click="onSubmit()"
                  />
                </div>
                <div class="col-6">
                  <p class="text-no-wrap text-grey-1 text-caption text-right">
                    <a href="/register">Đăng ký tài khoản</a>
                  </p>
                </div>
              </div>
            </q-card-actions>
            <q-card-section> </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { useQuasar, QSpinnerFacebook } from 'quasar';
import { ref } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router'

export default {
  setup() {
    const $router = useRouter();
    const $q = useQuasar();
    const email = ref(null);
    const password = ref(null);
    const isPwd = ref(true);
    function isValidEmail() {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(email.value) || 'Hãy nhập đúng định dạng email';
    }

    async function onSubmit() {
      $q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'purple',
        message: 'Đang xử lý đăng nhập....',
        messageColor: 'black',
      });
      let data = {
        email: email.value,
        password: password.value,
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      try {
        let response = await api.post('/auth/login', data);
        if (response.status !== 200 && response.status !== 201) {
          throw new Error();
        }
        let user = response.data.user;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('jwt', response.data.access_token )
        if(user.role === 0) {
          $router.push('/user')
        } else {
          $router.push('/admin')
        }
        $q.loading.value = false;
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Đăng nhập thất bại ! Vui lòng đăng nhập lại',
          icon: 'report_problem',
        });
      } finally {
        $q.loading.hide();
      }
    }

    return {
      email,
      onSubmit,
      password,
      isPwd,
      isValidEmail,
    };
  },
};
</script>
<style></style>
