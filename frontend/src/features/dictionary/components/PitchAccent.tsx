type Props = {
  pattern: string
}

const PitchAccent = ({ pattern }: Props) => {
  return (
    <span className="font-mono font-semibold tracking-widest mt-2">
      {[...pattern].map((char, index) => (
        <span
          key={index}
          className={char === "H" ? "text-red-500" : "text-blue-500"}
        >
          {char}
        </span>
      ))}
    </span>
  )
}

export default PitchAccent
