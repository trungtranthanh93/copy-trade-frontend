<template>
  <q-layout>
    <q-page
      :class="{
        'window-height window-width row justify-center items-center':
          !$q.platform.is.mobile,
        'window-height window-width justify-center items-center':
          $q.platform.is.mobile,
      }"
    >
      <template v-if="!$q.platform.is.mobile">
        <div class="column row">
          <q-card
            square
            class="q-pa-md q-ma-none no-shadow bg-grey-3"
            style="width: 320px"
          >
            <q-card-section class="q-mb-md">
              <p class="text-weight-bolder text-center text-uppercase text-h5">
                App copytrade
              </p>
            </q-card-section>
            <q-card-section class="q-mt-xl q-mb-md">
              <p class="text-weight-bolder text-center text-h6">Đăng ký tài khoản</p>
            </q-card-section>
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input
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
                <q-input
                dense
                square
                filled
                clearable
                v-model="username"
                type="text"
                label="Biệt danh"
                :rules="[(val) => !!val || 'Hãy điền biệt danh của bạn']"
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
                    size="md"
                    class="full-width bg-accent"
                    label="Đăng ký"
                    @click="onSubmit()"
                  />
                </div>
                <div class="col-6">
                  <p class="text-no-wrap text-grey-1 text-caption text-right">
                    <a href="/login">Đăng nhập</a>
                  </p>
                </div>
              </div>
            </q-card-actions>
            <q-card-section> </q-card-section>
          </q-card>
        </div>
      </template>
      <template v-else>
        <q-card
          square
          class="q-pa-md q-ma-none full-width full-height no-shadow bg-grey-3"
          style="width: 320px"
        >
          <q-card-section class="q-mb-md">
            <p class="text-weight-bolder text-center text-uppercase text-h5">
              App copytrade
            </p>
          </q-card-section>
          <q-card-section class="q-mt-xl q-mb-md">
            <p class="text-weight-bolder text-center text-h6">Đăng ký tài khoản</p>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
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
              <q-input
                dense
                square
                filled
                clearable
                v-model="username"
                type="text"
                label="Biệt danh"
                :rules="[(val) => !!val || 'Hãy điền biệt danh của bạn']"
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
              <div class="col-12">
                <q-btn
                  outline
                  size="md"
                  class="full-width bg-accent"
                  label="Đăng ký"
                  @click="onSubmit()"
                />
              </div>
              <div class="col-6">
                <p class="text-no-wrap text-grey-1 text-caption text-right">
                  <a href="/">Đăng nhập</a>
                </p>
              </div>
            </div>
          </q-card-actions>
          <q-card-section> </q-card-section>
        </q-card>
      </template>
    </q-page>
  </q-layout>
</template>

<script>
import { useQuasar, QSpinnerFacebook } from 'quasar';
import { ref } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const $router = useRouter();
    const $q = useQuasar();
    const email = ref(null);
    const password = ref(null);
    const username = ref(null);
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
        username: username.value,
        isActive: false,
        role: 0
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      try {
        let response = await api.post('/users', data);
        if (response.status !== 200 && response.status !== 201) {
          throw new Error();
        }
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Đăng ký thành công',
          position: 'top',
        });
        $q.loading.value = false;
        $router.push('/');
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Đăng ký thất bại ! Vui lòng đăng ký lại',
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
      username
    };
  },
};
</script>
<style></style>
