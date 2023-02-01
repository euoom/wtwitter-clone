import React from "react";
import AuthForm from 'components/AuthForm'
import {authService, GithubAuthProvider, GoogleAuthProvider} from "fBase";

function Auth() {
    async function onGoogleClick() {
        await authService.signInWithPopup(new GoogleAuthProvider())
    }

    async function onGithubClick() {
        await authService.signInWithPopup(new GithubAuthProvider())
    }

    return <>
        <AuthForm/>
        <hr/>
        <button onClick={onGoogleClick}> 구글 계정으로 로그인</button>
        <button onClick={onGithubClick}> 깃허브 계정으로 로그인</button>
    </>

}

export default Auth