import { Link as NextLink } from "next/link"
import { Link } from '@chakra-ui/react'

const AnchorLink = ({title,text,href,...rest}) => {
  const props = rest
  if(href){
    return (
      <Link 
        as={NextLink} 
        title={title}
        href={href}
      >
        {title}
      </Link>
    )
  }
}
export default AnchorLink