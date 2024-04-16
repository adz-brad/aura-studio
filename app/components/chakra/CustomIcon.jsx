import { Icon } from '@chakra-ui/react'
import * as icons from 'react-icons/io5'

const CustomIcon = ({name, ...rest}) => {
    if(name){
        const UseIcon = icons[`${name}`]
        if(UseIcon){ 
            return <Icon as={UseIcon} {...rest}/>
        }
    }
    else { return <Icon {...rest}/> }
}
export default CustomIcon