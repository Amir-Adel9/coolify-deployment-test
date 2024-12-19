import { Image } from "@/types/global.types"
import { deleteCookie } from "@/utils/cookies"
import httpClient from "@/utils/http-client"
import { create } from "zustand"

interface UserStore {
  name: string
  email: string
  createdAt: string
  role: string
  permissions: string[]
  phoneNumber: string
  isVerified: boolean
  isBanned: boolean
  image: Image
  isAuthenticated: boolean
  setUser: (user: {
    name: string
    email: string
    phoneNumber: string
    isVerified: boolean
    isBanned: boolean
    image: Image
    isAuthenticated: boolean
  }) => void
  getUser: () => void
  logout: () => void
}

export const useUser = create<UserStore>()((set) => ({
  name: "",
  email: "",
  phoneNumber: "",
  createdAt: "",
  role: "",
  permissions: [],
  isVerified: false,
  isBanned: false,
  image: {
    id: 0,
    full_path_large: "",
    full_path_small: "",
    order: 0,
  },
  isAuthenticated: false,
  setUser: (user: {
    name: string
    email: string
    phoneNumber: string
    isVerified: boolean
    isBanned: boolean
    image: Image
    isAuthenticated: boolean
  }) => set(user),
  getUser: async () => {
    await httpClient.get("/dashboard/profile").then((res) => {
      const userData = res.data.data.user
      console.log(userData.permissions)
      useUser.setState({
        name: userData.name,
        email: userData.email,
        createdAt: userData.created_at,
        role: userData.role,
        permissions: userData.permissions,
      })
    })
  },
  logout: () => {
    httpClient.post("/auth/logout").then(() => {
      deleteCookie("token")
      set({
        name: "",
        email: "",
        phoneNumber: "",
        createdAt: "",
        role: "",
        permissions: [],
        isVerified: false,
        isBanned: false,
        image: {
          id: 0,
          full_path_large: "",
          full_path_small: "",
          order: 0,
        },
        isAuthenticated: false,
      })
    })
  },
}))
