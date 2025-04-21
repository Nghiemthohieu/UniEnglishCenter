// 'use client'

// import React, { createContext, useContext, useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'

// // Kiểu dữ liệu của token giải mã
// type JwtPayload = {
//   userId: string
//   email: string
//   role: string
// }

// // Kiểu dữ liệu context
// type AuthContextType = {
//   user: JwtPayload | null
//   setUser: React.Dispatch<React.SetStateAction<JwtPayload | null>>
//   isLoading: boolean
//   logout: () => void
// }

// // Tạo context
// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// type AuthProviderProps = {
//   children: React.ReactNode
// }

// // Provider bao ngoài app
// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<JwtPayload | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     const token = localStorage.getItem("authToken")
//     try {
//       if (token) {
//         const decoded = JSON.parse(atob(token.split('.')[1])) as JwtPayload
//         setUser(decoded)
//       } else {
//         setUser(null)
//       }
//     } catch {
//       localStorage.removeItem("authToken")
//       setUser(null)
//     } finally {
//       setIsLoading(false) // ✅ đảm bảo luôn render sau khi xử lý xong
//     }
//   }, [])

//   // ✅ Hàm logout gọn gàng
//   const logout = () => {
//     localStorage.removeItem("authToken")
//     setUser(null)
//     router.push("/login")
//   }

//   return (
//     <AuthContext.Provider value={{ user, setUser, isLoading, logout }}>
//        {children}
//     </AuthContext.Provider>
//   )
// }

// // Hook để dùng context
// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }
