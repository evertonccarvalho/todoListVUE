<template>
  <q-page class="q-pa-lg">
    <q-table
      flat
      bordered
      title="Treats"
      :rows="tasks"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top>
        <span class="text-h5">Artigos</span>
        <q-space />
        <q-btn color="primary" label="Novo" :to="{ name: 'formPost' }" />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            @click="handleDeleteTask(props.row.id)"
            dense
            flat
            round
            color="negative"
            icon="delete"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import taskService from 'src/services/TaskService';

import { useQuasar } from 'quasar';
export default defineComponent({
  setup() {
    const tasks = ref<{ title: string; done: boolean }[]>([]);

    const { list, remove } = taskService();

    interface TableColumn {
      name: string;
      label: string;
      field: string;
      required?: boolean;
      align?: 'left' | 'right' | 'center';
      sortable?: boolean;
      // Outras propriedades...
    }

    const columns: TableColumn[] = [
      {
        name: 'id',
        required: true,
        label: 'ID',
        field: 'id',
        align: 'left',
        sortable: true,
      },
      {
        name: 'title',
        label: 'Title',
        field: 'title',
        align: 'left',
        sortable: true,
      },
      {
        name: 'author',
        label: 'Author',
        field: 'author',
        align: 'left',
        sortable: true,
      },
      {
        name: 'actions',
        label: 'Actions',
        field: 'actions',
        align: 'right',
      },
    ];

    const $q = useQuasar();
    onMounted(() => {
      getTasks();
    });

    const getTasks = async () => {
      try {
        const data = await list();
        tasks.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    const handleDeleteTask = async (id: number) => {
      try {
        $q.dialog({
          title: 'Remover',
          message: 'Você realmente deseja excluir a tarefa?',
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(id);
          $q.notify({
            message: 'Tarefa apagada com sucesso',
            icon: 'check',
            color: 'positive',
          });
          await getTasks();
        });
      } catch (error) {
        $q.notify({
          message: 'Erro ao apagar tarefa',
          icon: 'times',
          color: 'negative',
        });
      }
    };
    return {
      tasks,
      columns,
      handleDeleteTask,
    };
  },
});
</script>
