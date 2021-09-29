<script>
import { useRouter } from 'vue-router';
import { onBeforeMount } from 'vue';

export default {
  setup() {
    const $router = useRouter();
    onBeforeMount(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
      $router.push('/');
    });
  },
};
</script>