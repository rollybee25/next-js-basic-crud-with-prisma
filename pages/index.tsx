import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { useState } from 'react'
import { prisma } from "../lib/prisma";

interface Notes{
  notes: {
    title: string,
    content: string,
    id: string
  }[]
}

interface FormData {
  title: string,
  content: string,
  id: string
}

const Home = ({notes}: Notes) => {

  const [form, setForm] = useState<FormData>({title: '', content: '', id: ''})
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath);
  }

  async function create(data: FormData) {
    try {
      fetch('http://localhost:3000/api/create', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(() => {
        setForm({title: '', content: '', id: ''})
        refreshData()
      })
    } catch (error) {
      console.log(error);
    }
  }

  async function updateNote(data: FormData, id: string) {
    
    try {

      

      fetch(`http://localhost:3000/api/note/${id}`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      }).then( () => {
        setForm({title: '', content: '', id: ''})
        refreshData()
      })
    } catch (error) {
      console.log(error)
    }
   }

 async function deleteNote(id: string) {
  try {
    fetch(`http://localhost:3000/api/note/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    }).then( () => {
      refreshData()
    })
  } catch (error) {
    console.log(error)
  }
 }

  const handleSubmit =async (data:FormData) => {
    try {
      create(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate =async (data:FormData) => {
    try {
      updateNote(data, form.id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1 className='mt-4 text-2xl font-bold text-center'>Notes</h1>
      {form.title ? 
      
      <form onSubmit={ e => {
          e.preventDefault()
          handleUpdate(form)
      }} className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch">
        <input type="text" 
          placeholder='Title'
          value={form.title}
          onChange = {e => setForm({...form, title: e.target.value})}
          className="p-1 border-2 border-gray-600 rounded"
        />

        <textarea
          placeholder='Content'
          value={form.content}
          onChange = {e => setForm({...form, content: e.target.value})}
          className="p-1 border-2 border-gray-600 rounded"
        />

      <div className="flex items-stretch w-auto min-w-[50%] max-w-min mx-auto">
        <button type='submit' className='w-auto p-1 text-white bg-green-500 rounded'>Update</button>
        <button onClick={()=> setForm({title: '', content: '', id: ''})} className='p-1 text-white bg-blue-500 rounded'>Cancel</button>
      </div>
      


      </form>
      
      :
      
      <form onSubmit={ e => {
          e.preventDefault()
          handleSubmit(form)
      }} className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch">
        <input type="text" 
          placeholder='Title'
          value={form.title}
          onChange = {e => setForm({...form, title: e.target.value})}
          className="p-1 border-2 border-gray-600 rounded"
        />

        <textarea
          placeholder='Content'
          value={form.content}
          onChange = {e => setForm({...form, content: e.target.value})}
          className="p-1 border-2 border-gray-600 rounded"
        />

      <button type='submit' className='p-1 text-white bg-blue-500 rounded'>Add</button>


      </form>
      
      
      }
        
      
      
      <div className='w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch'>
        <ul>
          {notes.map(note => (
            <li key={note.id} className="p-2 border-b border-gray-600">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="font-bold">{note.title}</h3>
                  <p className="text-small">{note.content}</p>
                </div>
                <button onClick={()=> setForm({title: note.title, content: note.content, id: note.id})} className="px-3 text-white bg-blue-500 rounded">Update</button>
                <button onClick={()=> deleteNote(note.id)} className="px-3 text-white bg-red-500 rounded">X</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps =async () => {
  const notes = await prisma.note.findMany({
    select: {
      id: true,
      title: true,
      content: true
    }
  })

  return {
    props: {
      notes
    }
  }
}
