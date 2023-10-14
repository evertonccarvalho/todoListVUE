<template>
  <q-page padding>
    <q-form @submit="onSubmit" @reset="onReset" class="row q-col-gutter-sm">
      <q-input
        class="col-lg-6 col-x12"
        lazy-rules
        outlined
        v-model="form.title"
        label="Titulo"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        outlined
        v-model="form.author"
        label="Author"
        lazy-rules
        class="col-lg-6 col-x12"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div class="col-lg-12 col-x12">
        <q-editor v-model="form.content" min-height="5rem" />
      </div>

      <div class="col-12 q-gutter-sm">
        <q-btn
          label="salvar"
          color="primary"
          class="float-right"
          icon="save"
          type="submit"
        />
        <q-btn
          label="cancelar"
          color="white"
          class="float-right"
          text-color="primary"
          :to="{ name: 'form' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import taskService from 'src/services/TaskService';
import { useQuasar } from 'quasar'; // Certifique-se de importar useQuasar
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'FormPost',
  setup() {
    const $q = useQuasar();
    const { post } = taskService();
    const router = useRouter();

    const form = ref({
      title: '',
      content: '',
      author: '',
    });

    const onSubmit = async () => {
      try {
        await post(form.value);
        $q.notify({
          message: 'Tarefa Enviada com sucesso',
          icon: 'check',
          color: 'positive',
        });
        router.push({ name: 'artigos' });
      } catch (error) {
        console.error(error);
      }
    };
    return { form, onSubmit };
  },
});
</script>

<style></style>
