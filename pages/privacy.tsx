import { VStack, Heading, Text, Stack } from '@chakra-ui/react'
import Seo from '../Components/Seo'

const privacyPolicy = () => {
    const style = {
        marginTop: '1.5rem'
    }
    return (
        <>
            <Seo title="0xShare - Privacy Policy" url="/privacy" />
            <VStack mt={10}>
                <Text fontSize="sm">Current as of Sep 17th 2022</Text>
                <Heading
                    bgClip="text"
                    bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
                    style={{ marginBottom: '30px' }}
                >
                    Privacy Policy
                </Heading>
                <Stack overflow="hidden" maxW="4xl">
                    <Text fontSize="xl">
                        This privacy policy sets out how 0xShare uses and
                        protects any information that you give 0xShare when you
                        use this website.
                    </Text>
                    <Text style={style} fontSize="xl">
                        0xShare is committed to ensuring that your privacy is
                        protected. Should we ask you to provide certain
                        information by which you can be identified when using
                        this website, and then you can be assured that it will
                        only be used in accordance with this privacy statement.
                    </Text>
                    <Text style={style} fontSize="xl">
                        0xShare may change this policy from time to time by
                        updating this page. You should check this page from time
                        to time to ensure that you are happy with any changes.
                    </Text>
                    <Heading style={style} size="md">
                        We may collect the following information:
                    </Heading>
                    <Text style={style} fontSize="xl">
                        1. Name and job title
                        <br />
                        2. Contact information including email address
                        <br /> 3. Demographic information such as postcode,
                        preferences and interests
                        <br /> 4. Other information relevant to customer surveys
                        and/or offers
                    </Text>
                    <Heading style={style} size="md">
                        What we do with the information we gather
                    </Heading>
                    <Text style={style} fontSize="xl">
                        We require this information to understand your needs and
                        provide you with a better service, and in particular for
                        the following reasons:
                    </Text>
                    <Text style={style} fontSize="xl">
                        1. Internal record keeping.
                        <br />
                        2. We may use the information to improve our products
                        and services.
                        <br />
                        3. We may periodically send promotional emails about new
                        products, special offers or other information which we
                        think you may find interesting using the email address
                        which you have provided. <br />
                        4. From time to time, we may also use your information
                        to contact you for market research purposes. We may
                        contact you by email, phone, fax or mail. We may use the
                        information to customise the website according to your
                        interests.
                    </Text>
                    <Text style={style} fontSize="xl">
                        We are committed to ensuring that your information is
                        secure. In order to prevent unauthorised access or
                        disclosure we have put in suitable measures.
                    </Text>
                    <Heading style={style} size="md">
                        How we use cookies
                    </Heading>
                    <Text style={style} fontSize="xl">
                        A cookie is a small file which asks permission to be
                        placed on your computer hard drive. Once you agree, the
                        file is added and the cookie helps analyses web traffic
                        or lets you know when you visit a particular site.
                        Cookies allow web applications to respond to you as an
                        individual. The web application can tailor its
                        operations to your needs, likes and dislikes by
                        gathering and remembering information about your
                        preferences.
                    </Text>
                    <Text style={style} fontSize="xl">
                        We use traffic log cookies to identify which pages are
                        being used. This helps us analyses data about webpage
                        traffic and improve our website in order to tailor it to
                        customer needs. We only use this information for
                        statistical analysis purposes and then the data is
                        removed from the system.
                    </Text>
                    <Text style={style} fontSize="xl">
                        Overall, cookies help us provide you with a better
                        website, by enabling us to monitor which pages you find
                        useful and which you do not. A cookie in no way gives us
                        access to your computer or any information about you,
                        other than the data you choose to share with us.
                    </Text>
                    <Text style={style} fontSize="xl">
                        You can choose to accept or decline cookies. Most web
                        browsers automatically accept cookies, but you can
                        usually modify your browser setting to decline cookies
                        if you prefer. This may prevent you from taking full
                        advantage of the website.
                    </Text>
                    <Heading style={style} size="md">
                        Controlling your personal information
                    </Heading>
                    <Text style={style} fontSize="xl">
                        You may choose to restrict the collection or use of your
                        personal information in the following ways:
                    </Text>
                    <Text style={style} fontSize="xl">
                        1. whenever you are asked to fill in a form on the
                        website, look for the box that you can click to indicate
                        that you do not want the information to be used by
                        anybody for direct marketing purposes
                        <br />
                        2. if you have previously agreed to us using your
                        personal information for direct marketing purposes, you
                        may change your mind at any time by writing to or
                        emailing us at pentesterpratham@gmail.com
                    </Text>
                    <Text style={style} fontSize="xl">
                        We will not sell, distribute or lease your personal
                        information to third parties unless we have your
                        permission or are required by law to do so. We may use
                        your personal information to send you promotional
                        information about third parties which we think you may
                        find interesting if you tell us that you wish this to
                        happen.
                    </Text>
                    <Text style={style} fontSize="xl">
                        If you believe that any information we are holding on
                        you is incorrect or incomplete, please write to or email
                        us as soon as possible, at the above address. We will
                        promptly correct any information found to be incorrect.
                    </Text>
                    <Heading style={style} size="md">
                        Anonymous files
                    </Heading>
                    <Text style={style} fontSize="xl">
                        We don&apos;t store any logs of your files and after
                        30min the files have been removed from the server in all
                        pricing plans.
                    </Text>
                </Stack>
            </VStack>
        </>
    )
}

export default privacyPolicy
