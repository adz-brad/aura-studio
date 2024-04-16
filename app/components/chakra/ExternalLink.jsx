import { Link as NextLink } from "next/link"
import { Link } from '@chakra-ui/react'

const ExternalLink = ({ type,title,text,href,...rest}) => {
  const props = rest
  if(type === 'internal' && href){
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
export default ExternalLink