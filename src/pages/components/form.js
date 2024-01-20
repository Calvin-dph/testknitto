import { useState } from 'react';
import { useCreatePostMutation, useGetTodosQuery } from '../features/apiSlice';
import Style from './style.module.css';


const AddTodoForm = () => {
  const [title, setTitle] = useState('');
  const [updatePost, result] = useCreatePostMutation();
  const { data: existingTodos, refetch: refetchTodos } = useGetTodosQuery();




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await updatePost({
        title: title,
        userId: 1, 
        completed: false,
      });
      if (error) {
        console.error('Error adding todo:', error);
        return;
      }
      setTitle('');
      console.log('Todo added successfully:', data);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const isLoading = result?.isLoading ?? false;


  return (
    <form className={Style.form} onSubmit={handleSubmit}>
      <label>
        Todo Title:
        <div className={Style.formInput}>
          <input
          required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </label>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding Todo...' : 'Add Todo'}
      </button>
      {result?.isError && <div style={{ color: 'red' }}>Error adding todo</div>}
    </form>
  );
};

export default AddTodoForm;
