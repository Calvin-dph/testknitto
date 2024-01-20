import { useGetTodosQuery, useGetPageQuery, useGetPostQuery, useCreatePostMutation } from '../features/apiSlice';
import { useState } from 'react';
import AddTodoForm from './form';
import Style from './style.module.css';
import { title } from 'process';


const itemsPerPage = 10;

const TodoList = ({data, initialTodos}) => {
  const [sortBy, setSortBy] = useState('input');

  const [currentPage, setCurrentPage] = useState(1);
  const { data: allTodos, isError: todosError, isLoading: todosLoading } = useGetTodosQuery();
  const { data: page, isError: pageError, isLoading: pageLoading } = useGetPageQuery({
    _start: (currentPage - 1) * 10,
    _limit: 10,
  });

  if (todosLoading || pageLoading) {
    return <div>Loading...</div>;
  }
  if (todosError || pageError) {
    return <div>Error loading todos</div>;
  }

  const totalPages = Math.ceil(allTodos.length / 10);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const displayedTodos = allTodos.slice(start, end);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  
  return (
    <div className={Style.container}>
      <h1>Todo List</h1>
      <AddTodoForm/>
      <ul>
        <div className={Style.jdl}>
          <h4>Title</h4>
          <h4>Status</h4>
        </div>
        
        {displayedTodos.map(todo => (
          <li key={todo.id}>
          <div className={Style.row}>
            <strong>{todo.title}</strong>
              <label>{todo.completed ? 'Completed' : 'Not Completed'}</label>
            </div>
          </li>
        ))}
      </ul>
      <div className={Style.btn}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span>Page {currentPage} / {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const { data } = await useGetTodosQuery();

  return { props: { data } };
}

export default TodoList;
