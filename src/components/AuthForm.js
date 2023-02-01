import React, {useState} from "react";
import {authService} from "fBase"

function AuthForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isNewAccount, setIsNewAccount] = useState(false)
    const [error, setError] = useState('')

    function onEmailChange(event) {
        const {target: {value}} = event
        setEmail(value)
    }

    function onPasswordChange(event) {
        const {target: {value}} = event
        setPassword(value)
    }

    async function onSubmit(event) {
        event.preventDefault()
        try {
            if (isNewAccount) {
                await authService.createUserWithEmailAndPassword(email, password)
            } else {
                await authService.signInWithEmailAndPassword(email, password)
            }
        } catch (error) {
            setError(error.message)
        }
    }

    function toggleAccount() {
        setIsNewAccount(!isNewAccount)
    }

    return <>
        <form onSubmit={onSubmit}>
            <input type="email" value={email} onChange={onEmailChange} placeholder="이메일 주소를 입력해주세요"/><br/>
            <input type="password" value={password} onChange={onPasswordChange} placeholder="비밀번호를 입력해주세요"/><br/>
            <input type="submit" value={isNewAccount ? "회원가입!" : "로그인!"}/><br/>
            {error && <span>{error}</span>}
        </form>
        <span onClick={toggleAccount}>{isNewAccount ? "로그인모드로 전환" : "회원가입하러 가기"}</span>
    </>

}

export default AuthForm