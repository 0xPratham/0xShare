import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Button
} from '@chakra-ui/react'
import { useState } from 'react'
import { fetchFromAPI } from '../helpers/fetchfromapi'
import { invoices } from '../lib/types'
import AuthCheck from '../Components/AuthCheck'
import { useToast } from '@chakra-ui/react'
import Seo from '../Components/Seo'

const Invoices = () => {
    const toast = useToast()
    const [data, setData] = useState<Array<invoices>>([])
    const [loading, setLoading] = useState<boolean>(false)

    const show_toast = (title: string, description?: string) => {
        return toast({
            title,
            description,
            status: 'error',
            duration: 5000,
            isClosable: true
        })
    }

    const fetch_invoices = async () => {
        setLoading(true)
        const data = await fetchFromAPI('/api/invoices', 'POST')
        if (data.msg) {
            show_toast('Error', data.msg)
            setLoading(false)
            return
        }
        setLoading(false)
        setData(data)
        return
    }
    return (
        <>
            <Seo title="0xShare - Invoices" url="/invoices" />
            <AuthCheck>
                <Box
                    display={'flex'}
                    justifyContent={'center'}
                    as="section"
                    py="14"
                    px={{ base: '4', md: '56' }}
                    mt="9"
                >
                    {data.length > 0 ? (
                        <>
                            <TableContainer>
                                <Table size="lg">
                                    <Thead>
                                        <Tr>
                                            <Th>invoice id</Th>
                                            <Th isNumeric>amount paid</Th>
                                            <Th>date</Th>
                                            <Th>pdf</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {data &&
                                            data?.map(invoice => {
                                                return (
                                                    <Tr key={invoice.id}>
                                                        <Td>{invoice.id}</Td>
                                                        <Td isNumeric>
                                                            {
                                                                invoice.amount_paid
                                                            }
                                                            .00
                                                        </Td>
                                                        <Td>
                                                            {new Date(
                                                                invoice.date *
                                                                    1000
                                                            ).toDateString()}
                                                        </Td>
                                                        <Td>
                                                            <Button>
                                                                <a
                                                                    href={
                                                                        invoice.pdf
                                                                    }
                                                                >
                                                                    Download PDF
                                                                </a>
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                )
                                            })}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </>
                    ) : (
                        <Button onClick={fetch_invoices} isLoading={loading}>
                            Fetch Invoices
                        </Button>
                    )}
                </Box>
            </AuthCheck>
        </>
    )
}

export default Invoices
