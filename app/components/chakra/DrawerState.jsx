import { 
    useDisclosure,
    Drawer
} from '@chakra-ui/react'
import { cloneElement } from 'react'

const DrawerState = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { children, ...rest } = props

    const button = children?.filter(e => e?.type?.render?.displayName === "Button")[0]
    const drawerBody = children?.filter(e => e?.type?.render?.displayName !== "Button")

    let e = cloneElement(button, { onClick: onOpen })

  return (
    <>
      {e && !isOpen ? e : null}
      <Drawer {...rest} isOpen={isOpen} onClose={onClose}>
        {drawerBody ? drawerBody : null}
      </Drawer>
    </>
  )
}
export default DrawerState