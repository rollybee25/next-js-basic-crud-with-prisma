import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState } from 'react';

interface FormData {
	email: string,
	firstName: string,
	password: string,
    lastName: string,
}

const Register: NextPage = (props): JSX.Element => {
	const [formData, setformData] = useState<FormData>({ email: '', firstName: '', lastName: '', password: ''});

	const router = useRouter()

	const refreshData = () => {
		router.replace(router.asPath);
	}

	async function create(data: FormData) {
		try {
		  fetch('http://localhost:3000/api/user/create', {
			body: JSON.stringify(data),
			headers: {
			  'Content-Type': 'application/json'
			},
			method: 'POST'
		  }).then(() => {
			setformData({email: '', firstName: '', lastName: '', password: '' })
			refreshData()
		  })
		} catch (error) {
		  console.log(error);
		}
	  }

	const handleSubmit = async (data:FormData) => {
		try {
			create(data)
		} catch (error) {
			console.log(error)
		}
	}

	return (

		<div className='flex min-h-screen'>
			<Head>
				<title>Denaku | Register</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className='flex items-center justify-center flex-1'>
				<div className='w-[50%]'>
					<p className='mb-2 text-4xl font-semibold'>Welcome to {process.env.SECRET}</p>
					<p className='mb-6 text-gray-500'>Sign up with your email.</p>
					<form onSubmit={ e => {
						e.preventDefault()
						handleSubmit(formData)
					}}
					 className='flex flex-col gap-y-2'>
						<label className="text-sm font-semibold">Email</label>
						<input className='px-2 py-1 border rounded-lg'
							value={formData.email} name='email' placeholder='Please enter your email'
							onChange={({ target }) => setformData({ ...formData, email: target.value })}
						/>
						<label className="text-sm font-semibold">First Name</label>
						<input className='px-2 py-1 border rounded-lg'
							value={formData.firstName} name='firstName' placeholder='Please enter your name'
							onChange={({ target }) => setformData({ ...formData, firstName: target.value })}
						/>
                        <label className="text-sm font-semibold">Last Name</label>
                        <input className='px-2 py-1 border rounded-lg'
							value={formData.lastName} name='lastName' placeholder='Please enter your name'
							onChange={({ target }) => setformData({ ...formData, lastName: target.value })}
						/>
						<label className="text-sm font-semibold">Password</label>
						<input className='px-2 py-1 border rounded-lg'
							value={formData.password} name='password' placeholder='Please enter your password'
							onChange={({ target }) => setformData({ ...formData, password: target.value })}
						/>
						<button className='block py-2 text-sm text-white duration-300 bg-black hover:shadow-xl trasition rounded-xl'>Sign Up</button>
					</form>
				</div>
			</div>
			<div className='relative flex-1 bg-slate-50'
				style={{
					background: "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
					backgroundSize: 'cover'
				}}
			>
				<div className='absolute p-10 text-white left-10 right-10 bottom-10 backdropbackdrop-blur-xl'>
					<p className='mb-1'>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores eos iure natus adipisci facilis quam veritatis magni dolore impedit dignissimos, sequi ab, laboriosam voluptate. Tempore cumque placeat iure voluptate deleniti doloremque consequuntur id, excepturi temporibus magnam harum necessitatibus nostrum. Sunt eaque dignissimos eum animi ullam odio commodi quia tenetur. Nostrum nam voluptate aliquid? Modi, asperiores! Eligendi ratione unde fuga autem minima qui dolor blanditiis culpa iste nostrum laboriosam tenetur voluptas animi consequatur rerum, molestias, optio labore veniam aut! Ducimus quasi tempora ipsum maiores dicta vitae ipsam officia mollitia molestias saepe adipisci fuga velit ipsa aliquid veritatis, perspiciatis ut magni sit?
					</p>
					<p className='text-xl font-semibold text-right'>John Doe</p>
				</div>
			</div>

		</div>
	)
}

export default Register