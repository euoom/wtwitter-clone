import {useState} from "react";
import {useNavigate} from "react-router-dom"
import {authService, dbService, storageService} from "fBase";

function Profile({userObj, refreshUser}) {
    const [newDisplayName, setNewDisplayName] = useState('')
    const navigate = useNavigate()

    async function onLogOutClick() {
        await dbService.terminate()
        await authService.signOut()
        navigate('/')
    }

    function onNameChange(event) {
        const {target: {_, value}} = event
        setNewDisplayName(value)
    }

    async function onSubmit(event) {
        event.preventDefault()
        if (newDisplayName !== "" && newDisplayName !== userObj.displayName) {
            await userObj.updateProfile({displayName: newDisplayName})
            refreshUser()
        }
    }

    return <>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="변경할 닉네임을 알려줘" value={newDisplayName} onChange={onNameChange}/>
            <input type="submit" value="변경완료!"/>
        </form>
        <input type="button" value="로그아웃" onClick={onLogOutClick}/>
    </>

}

export default Profile
