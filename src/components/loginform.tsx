// 'use client'
// import React, { useState } from "react"
// import { useRouter } from "next/navigation"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { LoginPOST } from "@/JSON/login"

// export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     try {
//         const login: LoginPOST = {
//             username: email,
//             Password: password,
//         }
//       const res = await fetch("http://localhost:8080/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(login)
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         throw new Error(data.message || "Login failed")
//       }

//       // Save token
//       localStorage.setItem("authToken", data.data)

//       // Decode token
//       const decoded = JSON.parse(atob(data.data.split('.')[1])) // hoặc dùng jwt-decode nếu muốn
//       setUser(decoded)

//       router.push("/") // điều hướng sau khi login thành công
//     } catch (err: any) {
//       setError(err.message || "Something went wrong")
//     }
//   }

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl">Login</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-6">
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <div className="flex items-center">
//                   <Label htmlFor="password">Password</Label>
//                   <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
//                     Forgot your password?
//                   </a>
//                 </div>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               {error && <p className="text-sm text-red-500">{error}</p>}
//               <Button type="submit" className="w-full">
//                 Login
//               </Button>
//             </div>
//             <div className="mt-4 text-center text-sm">
//               Don&apos;t have an account?{" "}
//               <a href="/register" className="underline underline-offset-4">
//                 Sign up
//               </a>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
