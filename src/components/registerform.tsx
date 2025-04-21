// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { cn } from '@/lib/utils'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { baseUrl } from '@/lib/fetchdata'
// import { Register } from '@/JSON/Register'

// export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
//   const router = useRouter()
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const register: Register = {
//         name: name,
//         email: email,
//         password: password,
//         confirm_password: confirmPassword,
//     }

//     console.log(register)
  
//     const res = await fetch(`http://localhost:8080/auth/register`, {
//       method: 'POST',
//       body: JSON.stringify(register),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
  
//     const data = await res.json()
  
//     if (res.ok) {
//       alert('Đăng ký thành công!')
//       router.push('/login')
//     } else {
//       alert(data.message || 'Có lỗi xảy ra!')
//     }
//   }

//   return (
//     <div className={cn('flex flex-col gap-6', className)} {...props}>
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl">Register</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-6">
//               <div className="grid gap-2">
//                 <Label htmlFor="name">Name</Label>
//                 <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <Input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
//               </div>
//               <Button type="submit" className="w-full">
//                 Sign up
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
