import { VStack, Heading, Text, Stack } from '@chakra-ui/react'

const privacyPolicy = () => {
    const style = {
        marginTop: '1.5rem'
    }
    return (
        <VStack mt={10}>
            <Text fontSize="sm">Current as of Sep 17th 2022</Text>
            <Heading
                bgClip="text"
                bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
                style={{ marginBottom: '30px' }}
            >
                Terms & Conditions
            </Heading>
            <Stack overflow="hidden" maxW="4xl">
                <Text fontSize="xl">
                    The Website Owner, including subsidiaries and affiliates
                    (“Website” or “Website Owner” or “we” or “us” or “our”)
                    provides the information contained on the website or any of
                    the pages comprising the website (“website”) to visitors
                    (“visitors”) (cumulatively referred to as “you” or “your”
                    hereinafter) subject to the terms and conditions set out in
                    these website terms and conditions, the privacy policy and
                    any other relevant terms and conditions, policies and
                    notices which may be applicable to a specific section or
                    module of the website.
                </Text>
                <Text style={style} fontSize="xl">
                    Welcome to our website. If you continue to browse and use
                    this website you are agreeing to comply with and be bound by
                    the following terms and conditions of use, which together
                    with our privacy policy govern 0xShare relationship with you
                    in relation to this website.
                </Text>
                <Heading style={style} size="md">
                    The use of this website is subject to the following terms of
                    use:
                </Heading>
                <Text style={style} fontSize="xl">
                    1. The content of the pages of this website is for your
                    general information and use only. It is subject to change
                    without notice.
                    <br />
                    2. Neither we nor any third parties provide any warranty or
                    guarantee as to the accuracy, timeliness, performance,
                    completeness or suitability of the information and materials
                    found or offered on this website for any particular purpose.
                    You acknowledge that such information and materials may
                    contain inaccuracies or errors and we expressly exclude
                    liability for any such inaccuracies or errors to the fullest
                    extent permitted by law.
                    <br />
                    3. Your use of any information or materials on this website
                    is entirely at your own risk, for which we shall not be
                    liable. It shall be your own responsibility to ensure that
                    any products, services or information available through this
                    website meet your specific requirements.
                    <br /> 4. This website contains material which is owned by
                    or licensed to us. This material includes, but is not
                    limited to, the design, layout, look, appearance and
                    graphics. Reproduction is prohibited other than in
                    accordance with the copyright notice, which forms part of
                    these terms and conditions.
                    <br /> 5. All trademarks reproduced in this website which
                    are not the property of, or licensed to, the operator are
                    acknowledged on the website.
                    <br /> 6. Unauthorized use of this website may give rise to
                    a claim for damages and/or be a criminal offense.
                    <br /> 7. From time to time this website may also include
                    links to other websites. These links are provided for your
                    convenience to provide further information.
                    <br /> 8. You may not create a link to this website from
                    another website or document without 0xShare’s prior written
                    consent.
                    <br /> 9. Your use of this website and any dispute arising
                    out of such use of the website is subject to the laws of
                    India or other regulatory authority.
                </Text>
                <Text style={style} fontSize="xl">
                    We as a merchant shall be under no liability whatsoever in
                    respect of any loss or damage arising directly or indirectly
                    out of the decline of authorization for any Transaction, on
                    Account of the Cardholder having exceeded the preset limit
                    mutually agreed by us with our acquiring bank from time to
                    time
                </Text>
            </Stack>
        </VStack>
    )
}

export default privacyPolicy
