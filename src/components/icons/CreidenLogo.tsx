import criedenWhiteLogo from "@/assets/images/creiden_white.webp"

const CreidenLogo = ({
  className,
}: {
  className?: string
}) => {
  return (
    <img
      src={criedenWhiteLogo}
      alt='Creiden Logo'
      className={`object-cover scale-[0.8] ${className}`}
      draggable={false}
    />
  )
}

export default CreidenLogo
