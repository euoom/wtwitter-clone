import {useEffect, useState} from "react";
import AppRouter from "components/Router"
import {authService} from "fBase";

function App() {
    const [init, setInit] = useState(false)
    const [userObj, setUserObj] = useState(null)

    useEffect(function () {
        authService.onAuthStateChanged(function (user) {
            user
                ? setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: function (args) {
                        return user.updateProfile(args)
                    },
                })
                : setUserObj(null)
            setInit(true)
        })
    }, [])

    function refreshUser() {
        const user = authService.currentUser
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: function (args) {
                return user.updateProfile(args)
            },
        })
    }

    return <div className="App">
        {init
            ? (<AppRouter userObj={userObj} refreshUser={refreshUser} isLoggedIn={Boolean(userObj)}/>)
            : ("파이어베이스 로딩중")
        }
    </div>

}

export default App;
