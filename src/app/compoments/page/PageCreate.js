import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../actions/posts";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../commons/BackButton";
import DateFormat from "../../hooks/date";
import { selectUser } from "../../modules/userSlice";
const PageCreate = () => {
  const dispatch = useDispatch(); // getState
  const navigate = useNavigate();
  const users = useSelector(selectUser);
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const addSubmit = (e) => {
    e.preventDefault();
    if (inputs.title !== "" && inputs.body !== "") {
      const datas = {
        createdAt: DateFormat(),
        views: 0,
        userId: users.id,
        ...inputs,
      };
      dispatch(addPost(datas)).then(() => {
        navigate("/");
        // history.push("/");
      });
    } else {
      alert("값을 입력하세요");
    }
  };
  return (
    <div className='flex justify-center'>
      <div className=' max-w-[800px] min-w-[500px] w-full mt-8'>
        <div className='my-5 font-bold text-2xl mb-12'>
          <h1>글 작성</h1>
        </div>
        <div className=''>
          <form
            id='form-group'
            className={"mt-10 flex flex-col justify-center"}
          >
            <div className='col-span-full pb-12'>
              <label
                htmlFor='title'
                className='block text-lg leading-6 text-gray-900 font-bold pb-2'
              >
                제목
              </label>
              <div className='mt-2'>
                {/* <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'> */}
                <input
                  type='text'
                  name='title'
                  id='title'
                  value={inputs.title}
                  onChange={handleChange}
                  className='block   w-full rounded-md bg-transparent py-1.5 px-2 pl-1shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600  text-gray-900 placeholder:text-gray-400  '
                  placeholder='text'
                />
              </div>
            </div>
            <div className='col-span-full'>
              <label
                htmlFor='body'
                className='block text-lg leading-6 text-gray-900 font-bold pb-2'
              >
                내용
              </label>
              <div className='mt-2'>
                <textarea
                  name='body'
                  id='body'
                  rows='3'
                  value={inputs.body}
                  onChange={handleChange}
                  placeholder='text'
                  className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <div className='flex justify-center mt-7'>
          <button
            className='border-2 border-solid border-black rounded w-24 mr-5'
            onClick={addSubmit}
          >
            submit
          </button>
          <BackButton />
        </div>
      </div>
    </div>
  );
};

export default PageCreate;
