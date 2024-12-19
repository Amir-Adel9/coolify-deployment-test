import clsx from "clsx"

const Container = ({
  children,
  fullWidth,
}: {
  children: React.ReactNode
  fullWidth?: boolean
}) => {
  return (
    <div
      className={clsx(
        "bg-white p-5 border border-border rounded mx-auto",
        fullWidth ? "w-[100%]" : "sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%]",
      )}
    >
      {children}
    </div>
  )
}

export default Container
