import {useEffect, useState} from "react";
import WTwitte from "components/WTwitte";
import WTwitteFactory from "components/WTwitteFactory";
import {query, collection, dbService, orderBy, onSnapshot} from "fBase";

function Home({userObj}) {
    const [wTwittes, setWTwittes] = useState([])

    useEffect(function () {
        if (userObj.uid) {
            const q = query(collection(dbService, 'wTwittes'), orderBy('createdAt', 'desc'))
            onSnapshot(q, function (snapshot) {
                const tmp = snapshot.docs.map(function (doc) {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
                setWTwittes(tmp)
            })
        }
    }, [])

    return <>
        <WTwitteFactory userObj={userObj}/><hr/>

        {wTwittes.map(function (wTwitte) {
            return <div key={wTwitte.id}>
                <WTwitte wTwitteObj={wTwitte} isOwner={wTwitte.creatorId === userObj.uid} /><br/>
            </div>
        })}
    </>
}

export default Home
