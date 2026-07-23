type Props = {
  current: number
  total: number
}

const CardProgress = ({ current, total }: Props) => {
  return (
    <div>
      {current}/{total}
    </div>
  )
}
export default CardProgress
