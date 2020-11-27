import React, { useEffect } from 'react'
import Link from 'next/link'
import Styled from '@emotion/styled'
import { DB } from '../services/firebase'
    
const About = () => {

    useEffect(() => {
        DB.collection('Leaderboard').orderBy("score.food", "desc").limit(10).onSnapshot(querySnapshot => {
            var dataSnapshot = []
            querySnapshot.forEach(doc => {
                dataSnapshot.push(doc.data().nickname + " " + doc.data().score.food)
            })
            console.log("updating leaderboard")
            console.log(dataSnapshot.join(", "))
        })
    }, [])

    return (
        <Wrapper>
            <Link href="/"><a className="linktest">home</a></Link>
        </Wrapper>
    )
}
    
const Wrapper = Styled.div(() =>`
    
`)
    
export default About