import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface ResetPasswordStore {
  email: string
  otp: string
  currentView: "email" | "otp" | "new-password"
  resendOTPTimer: number
  isResendOTPDisabled: boolean
  setEmail: (email: string) => void
  setOTP: (otp: string) => void
  setCurrentView: (currentView: "email" | "otp" | "new-password") => void
  startResendOTPTimer: () => void
  resumeResendOTPTimer: () => void
}

export const useResetPassword = create<ResetPasswordStore>()(
  persist(
    (set) => ({
      email: "",
      otp: "",
      currentView: "email",
      resendOTPTimer: 0,
      isResendOTPDisabled: false,
      setEmail: (email: string) => set({ email }),
      setOTP: (otp: string) => set({ otp }),
      setCurrentView: (currentView: "email" | "otp" | "new-password") =>
        set({ currentView }),
      startResendOTPTimer: () => {
        set({ resendOTPTimer: 60, isResendOTPDisabled: true })
        const interval = setInterval(() => {
          set((state) => {
            if (state.resendOTPTimer <= 1) {
              clearInterval(interval)
              return { resendOTPTimer: 0, isResendOTPDisabled: false }
            }
            return { resendOTPTimer: state.resendOTPTimer - 1 }
          })
        }, 1000)
      },
      resumeResendOTPTimer: () => {
        const interval = setInterval(() => {
          set((currentState) => {
            if (currentState.resendOTPTimer <= 1) {
              clearInterval(interval)
              return { resendOTPTimer: 0, isResendOTPDisabled: false }
            }
            return { resendOTPTimer: currentState.resendOTPTimer - 1 }
          })
        }, 1000)
      },
    }),
    {
      name: "reset-password",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        email: state.email,
        resendOTPTimer: state.resendOTPTimer,
        isResendOTPDisabled: state.isResendOTPDisabled,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.resendOTPTimer !== 0 && state?.isResendOTPDisabled)
          state.resumeResendOTPTimer()
      },
    },
  ),
)
