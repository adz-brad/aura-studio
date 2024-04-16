import { 
    useMediaQuery, 
} from '@chakra-ui/react'

const MediaQuery = ({ width }) => {
    const [ isTrue ] = useMediaQuery(`(min-width: ${width}px)`, {
        ssr: true,
        fallback: false, 
    })
  return (
    <>


    </>
  )
}
export default MediaQuery