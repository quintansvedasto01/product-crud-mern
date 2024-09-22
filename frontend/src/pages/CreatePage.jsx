import { useState } from 'react'
import { 
    Container, Box, Input, 
    Button, VStack, Heading, 
    useColorModeValue, useToast  
} from '@chakra-ui/react'
import { useProductStore } from '../store/product.store'

const CreatePage = () => {

    const [product, setProduct] = useState({
        name: '',
        price: 0,
        image: ''
    })
    const { createProduct } = useProductStore()
    const toast = useToast()

    const handleAddProduct = async () => {
        const {success, message} = await createProduct(product)
        
        toast({
            title: !success ? 'Error' : 'Success',
            description: message,
            status: !success ? 'error' : 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right'
        })

        if(success){
            setProduct({ 
                name: '', 
                price: '', 
                image: '' 
            })
        }
    }

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>

                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={product.name}
                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        />
                        <Input
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        />
                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={product.image}
                            onChange={(e) => setProduct({ ...product, image: e.target.value })}
                        />

                        <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default CreatePage