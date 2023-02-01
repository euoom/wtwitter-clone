import {useState} from "react";
import {dbService, storageService} from "fBase";
import {v4 as uuidv4} from "uuid";

function WTwitteFactory({userObj}) {
    const [wTwitte, setWTwitte] = useState('')
    const [attachment, setAttachment] = useState('')

    async function onSubmit(event) {
        event.preventDefault()
        if (wTwitte === "") {
            return
        }

        let attachmentUrl = ""

        if (attachment !== "") {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
            const response = await attachmentRef.putString(attachment, 'data_url')
            attachmentUrl = await response.ref.getDownloadURL()
        }

        const wTwitteObj = {
            text: wTwitte,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }

        await dbService.collection('wTwittes').add(wTwitteObj)
        setWTwitte('')
        setAttachment('')
        let _ = 1
    }

    function onChange(event) {
        const {target: {value}} = event
        setWTwitte(value)
    }

    function onFileChange(event) {
        const {target: {files}} = event
        const fileReader = new FileReader()

        fileReader.onloadend = function (finishedEvent) {
            const {currentTarget: {result}} = finishedEvent
            setAttachment(result)
        }
        fileReader.readAsDataURL(files[0])
    }

    function onClearAttachment(event) {
        setAttachment('')
    }

    return <>
        <form onSubmit={onSubmit}>
            {attachment ?
                <>
                    <img src={attachment} alt=""/>
                    <button onClick={onClearAttachment}>사진 제거</button><br/>
                </>
                : <>
                    <input type="file" accept="image/*" onChange={onFileChange}/><br/>
                </>
            }
            <input type="text" value={wTwitte} onChange={onChange} placeholder="너의 기분을 알려줄래?"/>
            <input type="submit" value="&rarr;"/>
        </form>

    </>

}

export default WTwitteFactory
