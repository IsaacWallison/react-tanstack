import axios from 'axios';
import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const CreateTaskForm = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/tasks', { title });
      return response.data;
    },
    onSuccess: () => {
      setTitle('');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Which task to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <button type="button" onClick={() => mutation.mutate()}>
        Create
      </button>
    </form>
  );
};
