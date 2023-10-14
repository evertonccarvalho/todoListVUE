import useApi from 'src/composables/UseApi';

export default function taskService() {
  const { list, post, remove, update } = useApi('tasks');

  return { list, post, remove, update };
}
