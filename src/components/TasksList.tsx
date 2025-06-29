import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Task } from '../types/Task';
import { CreateTaskForm } from './CreateTaskForm';

export const TasksList = () => {
  const query = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await axios.get<Task[]>('/api/tasks');
      return response.data;
    },
  });

  if (query.isLoading) return <div>loading</div>;

  return (
    <>
      <CreateTaskForm />
      <ul>
        {query.data?.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </>
  );
};
