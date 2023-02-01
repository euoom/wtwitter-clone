import {Link} from "react-router-dom";

function Navigation({userObj}) {

    return <nav>
        <ul style={{display: "flex"}}>
            <li style={{margin: "20px"}}><Link to="/">게시판</Link></li>
            <li style={{margin: "20px"}}><Link to="/Profile">{userObj.displayName}의 프로필</Link></li>
        </ul>
        <hr/>
    </nav>

}

export default Navigation
