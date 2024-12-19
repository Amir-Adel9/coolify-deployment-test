const LoadingDots = () => {
  return (
    <div className='flex gap-1 justify-center'>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className='h-[5px] w-[5px] rounded-full bg-background animate-bounce'
          style={{
            animationDelay: `${index * 0.15}s`,
            animationDuration: "0.75s",
          }}
        />
      ))}
    </div>
  )
}

export default LoadingDots
