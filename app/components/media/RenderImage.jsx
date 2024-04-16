import Image from "next/image"
import { Box } from "@chakra-ui/react"

const RenderImage = (props) => {
    const { objectFit, priority, quality, src, position, ...rest } = props
    return (
        <Box 
            as="div" 
            position={position ? position : "relative"}
            overflow="hidden"
            {...rest}
        >
            <Image 
                style={{objectFit: objectFit ? objectFit : null}} 
                quality={quality} 
                priority={priority} 
                fill={true} 
                src={src}
            />
        </Box>
    )
}
export default RenderImage