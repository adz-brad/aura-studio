import { Link as NextLink } from "next/link"
import { Link } from '@chakra-ui/react'

const InternalLink = ({type,title,text,href,children,...rest}) => {
  const props = rest
  if(href){
    return (
      <Link 
        as={NextLink} 
        title={title ? title : text ? text : `Link to page at: ${href}`}
        href={href}
        {...props}
        //style={{textDecoration: 'none'}}
      >
        {text ? text : children}
      </Link>
    )
  }
  else {
    return (
      <Link 
        title={title ? title : text ? text : `Internal Page Link`}
        {...props}
        //style={{textDecoration: 'none'}}
      >
        {text ? text : children}
      </Link>
    )
  }
}
export default InternalLink