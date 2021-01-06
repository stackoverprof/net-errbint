import Fade from './Fade'

const PageTransition = ({transition, children}) => {

    switch (transition) {
        case 'fade': return <Fade>{children}</Fade>
        default: return <>{children}</>
    }
}

export default PageTransition