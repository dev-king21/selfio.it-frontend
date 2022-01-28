import { Fab } from '@mui/material'
import Image from 'next/image'
import styles from '../styles/Selfie.module.css'
import { PhotoCamera } from '@mui/icons-material'
import { useSelector } from 'react-redux'

interface Props {
    action: React.MouseEventHandler<HTMLButtonElement>
}

const CameraPlaceholder = ({ action }: Props) => {

    const { event } = useSelector((state: any) => state.global)


    return (
        <>

            <Image
                alt="background"
                className="full-absolute"
                src="/images/splash_screen.jpg"
                objectFit='contain'
                layout="fill"
            />

            <div className="bg-color" />

            <div className="full-absolute flex-col">

                {
                    event && event.background &&
                    <Image
                        className="bg-logo"
                        alt="logo"
                        src="/images/logo.png"
                        width={160}
                        height={136}
                    />
                }

                <div className="bg-title">
                    Share your selfie
                </div>
            </div>

            <div className="full-absolute flex-col-bottom">
                <Fab
                    color="primary"
                    className="fab"
                    onClick={action}
                >
                    <PhotoCamera style={{ color: 'white' }} />
                </Fab>
            </div>
        </>
    )
}

export default CameraPlaceholder