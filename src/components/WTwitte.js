import {useState} from "react";
import {dbService, storageService} from "../fBase";

function WTwitte({wTwitteObj, isOwner}) {
    const [editing, setEditing] = useState(false)
    const [newWTwitte, setNewWTwitte] = useState('')

    async function onDeleteClick() {
        const ok = window.confirm('정말로 지울꺼에요?')
        if (!ok) return

        await dbService.doc(`wTwittes/${wTwitteObj.id}`).delete()
        if (wTwitteObj.attachmentUrl !== "")
            await storageService.ref(wTwitteObj.attachmentUrl).delete()
    }

    function toggleEditing() {
        setEditing(function (prev) {
            return !prev
        })
    }

    async function onSubmit(event) {
        event.preventDefault()
        await dbService.doc(`wTwittes/${wTwitteObj.id}`).update({text: newWTwitte})
        setEditing(false)
    }

    function onChange(event) {
        const {target: {value}} = event
        setNewWTwitte(value)
    }

    return <>
        {editing ?
            <>
                <form onSubmit={onSubmit}>
                    <input type="text" value={newWTwitte} onChange={onChange}/>
                    <input type="submit" value="수정완료!"/>
                </form>
                <button onClick={toggleEditing}>취소</button>
                <br/>
            </>
            : <div style={{margin: "10px"}}>
                {wTwitteObj.attachmentUrl &&
                <>
                    <img src={wTwitteObj.attachmentUrl} alt=""/><br/>
                </>
                }
                {wTwitteObj.text}<br/>
                {isOwner &&
                <>
                    <button onClick={toggleEditing}>수정</button>
                    <button onClick={onDeleteClick}>삭제</button>
                </>
                }
            </div>
        }
    </>

}

export default WTwitte