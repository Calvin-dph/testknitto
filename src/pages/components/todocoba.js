import { useGetTodosQuery, useGetPageQuery, useGetPostQuery, useCreatePostMutation } from '../features/apiSlice';
import { useState } from 'react';
import AddTodoForm from './form';


const itemsPerPage = 10;

const TodoCoba = ({data}) => {

  console.log(data);




  return (
    <div>
      <h1>Todo List Coba</h1>
      <AddTodoForm/>

      </div>
  );
};

export async function getServerSideProps() {
  const { data } = await useGetTodosQuery().toPromise();

  return { props: { data } };
}

export default TodoCoba;
