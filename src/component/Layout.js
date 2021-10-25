import Head from 'next/head';
import Navbar from './Navbar';
import { Container} from "@material-ui/core";

const Layout = ({ children }) => (
    <>
        <Head>
            <title>Note App</title>
        </Head>
        <Navbar />
        <Container>
            {children}
        </Container>
    </>
)

export default Layout;