import { Link } from "react-router-dom";
import Page from "./Page";

const Page404 = () => {

return (
    <Page>
        <p>
            This is not the page that you are looking for!<br />
            <Link to='/'>Go Home</Link>
        </p>
    </Page>
    
);
};

export default Page404;