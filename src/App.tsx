import { useState } from 'react'
import './styles/global.css'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const createUserFormSchema = z.object({
  email: z.string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: z.string()
  .min(6, 'A senha precisa de no mínimo 6 caracteres'),
})

export function App() {
  const [output, setOutput] = useState('')
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
  })

  
  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2)) 
  }

  // High-order function (programação funcional).
  // função que envia uma função e recebe uma função.
  // .map, .reduce, .find.

  return (
    <main className="h-screen bg-zinc-950 text-zinc-300 flex flex-col gap-10 items-center justify-center">
      <form 
        onSubmit={handleSubmit(createUser)}
        className='flex flex-col gap-4 w-full max-w-xs'>
        <div className="flex flex-col gap-1">
          <label htmlFor="">E-mail</label>
          <input 
            type="email" 
            className='border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white'
            {...register('email')}
          />
          {errors.email && <span className='text-red-500 '>{errors.email.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Senha</label>
          <input 
            type="password" 
            className='border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white'
            {...register('password')}
          />
        </div>

        <button 
          type="submit"
          className='bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600'
        >Salvar</button>
      </form>
      <pre>{output}</pre>
    </main>
  )
}


