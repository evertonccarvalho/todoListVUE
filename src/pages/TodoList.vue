<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-form @submit="onSubmit" class="col">
        <q-input
          v-model="form.title"
          lazy-rules
          filled
          square
          bg-color="white"
          label="Adcionar Tarefa"
          dense
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:before>
            <q-icon name="event" />
          </template>

          <template v-slot:hint> Field hint </template>

          <div>
            <q-btn
              round
              dense
              flat
              icon="save"
              color="primary"
              class="float-right"
              type="submit"
            />
          </div>
        </q-input>
      </q-form>
    </div>
    <div class="q-pa-md">
      <div class="q-gutter-sm">
        <q-list class="bg-white" separetor bordered>
          <q-item
            v-for="(task, id) in tasks"
            :key="id"
            @click="task.done = !task.done"
            :class="{ done: task.done }"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-checkbox
                v-model="task.done"
                class="no-pointer-events"
                color="primary"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ task.title }}</q-item-label>
            </q-item-section>
            <q-item-section v-if="task.done" side>
              <q-btn
                @click.stop="handleDeleteTask(id)"
                dense
                flat
                round
                color="primary"
                icon="delete"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import taskService from 'src/services/TaskService'; // Certifique-se de importar taskService
import { useQuasar } from 'quasar'; // Certifique-se de importar useQuasar
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const tasks = ref<{ title: string; done: boolean }[]>([]);
    const { list, remove, post } = taskService();
    const $q = useQuasar();
    const router = useRouter();

    onMounted(() => {
      getTasks();
    });

    const getTasks = async () => {
      tasks.value = await list();
    };

    const handleDeleteTask = async (id: number) => {
      $q.dialog({
        title: 'Remover',
        message: 'Você realmente deseja excluir a tarefa?',
        cancel: true,
        persistent: true,
      })
        .onOk(async () => {
          await remove(id);
          $q.notify({
            message: 'Tarefa apagada com sucesso',
            icon: 'check',
            color: 'positive',
          });
          getTasks();
        })
        .onCancel(() => {
          $q.notify({
            message: 'Ação de exclusão cancelada',
            icon: 'info',
            color: 'primary',
          });
        });
    };

    const form = ref({
      title: '',
      done: false,
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

    return {
      onSubmit,
      form,
      tasks,
      handleDeleteTask,
    };
  },
});
</script>

<style lang="scss">
.done {
  background-color: rgb(221, 221, 221);
  .q-item__label {
    text-decoration: line-through;
    color: primary;
  }
}
</style>
