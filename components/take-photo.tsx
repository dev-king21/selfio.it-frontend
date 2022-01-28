import { useState, useRef, useEffect } from "react"
import Image from 'next/image'
import Webcam from "react-webcam"
import { Fab, Button } from "@mui/material"
import useInterval from '../utils/use-interval'
import {
    PhotoCamera,
    SwitchCamera,
    Collections,
    Check,
    Clear
} from '@mui/icons-material'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from "react-redux"

const TakePhoto = () => {

    const webcamRef = useRef<any>(null)
    const canvasRef = useRef<any>(null)

    const [facingMode, setFacingMode] = useState(true)
    const [selfie, setSelfie] = useState<string | any>(null)
    const [countdown, setCountdown] = useState<number | null>(null)
    const [accepted, setAccepted] = useState(false)
    const { business, event } = useSelector((state: any) => state.global)

    const videoConstraints = {
        audio: false,
        width: { ideal: 4096 },
        height: { ideal: 3072 },
        facingMode: facingMode ? "user" : "environment"
    }

    useInterval(() => {
        if (countdown == 0) {
            setCountdown(null)
            capturePhoto()
            return
        }

        console.log('countdown time', countdown)
        if (countdown != null)
            setCountdown(countdown - 1)
    }, countdown != null ? 1000 : null)


    const capturePhoto = () => {

        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot({
                width: webcamRef.current.video.videoWidth,
                height: webcamRef.current.video.videoHeight
            })
            const canvas = canvasRef.current;

            const ctx = canvas.getContext('2d');

            const image = new window.Image();
            image.onload = function () {
                if (ctx) {
                    console.log(image.width, image.height, webcamRef.current.video.videoWidth, webcamRef.current.video.videoHeight)

                    const ratio = image.width / window.outerWidth
                    canvas.width = window.outerWidth
                    canvas.height = image.height / ratio
                    ctx.drawImage(
                        image,
                        0,
                        0,
                        image.width,
                        image.height,
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    )
                    setSelfie(canvas.toDataURL('image/jpeg'))
                }
            };
            image.src = imageSrc;
        }
    }

    const switchCamera = () => {
        setFacingMode(!facingMode)
    }

    const optionsPanel =
        <div className="options-wrapper">
            <Image
                className="options-btn"
                alt="frame"
                src="/images/ic_share.png"
                width={50}
                height={50}
            />

            {
                business &&
                <>
                    {
                        event && event.whatsapp == 1 &&
                        <Image
                            className="options-btn"
                            alt="frame"
                            src="/images/ic_whatsapp.png"
                            width={50}
                            height={50}
                        />
                    }

                    {
                        event && event.sms == 1 &&
                        <Image
                            className="options-btn"
                            alt="frame"
                            src="/images/ic_sms.png"
                            width={50}
                            height={50}
                        />
                    }

                    {
                        event && event.email == 1 &&
                        <Image
                            className="options-btn"
                            alt="frame"
                            src="/images/ic_email.png"
                            width={50}
                            height={50}
                        />
                    }

                    <Image
                        className="options-btn"
                        alt="frame"
                        src="/images/ic_print.png"
                        width={50}
                        height={50}
                    />

                </>
            }

            {
                event && event.share == 1 &&
                <Image
                    className="options-btn"
                    alt="frame"
                    src="/images/ic_gif.png"
                    width={50}
                    height={50}
                />

            }


        </div>

    const controlPanel =
        <div className="photo-control-wrapper">
            <div className="photo-control">
                {
                    !selfie ?
                        <>
                            <Fab
                                color="primary"
                                onClick={switchCamera}
                            >
                                <Collections style={{ color: 'white' }} />
                            </Fab>
                            <Fab
                                color="primary"
                                onClick={() => setCountdown(6)}
                            >
                                <PhotoCamera style={{ color: 'white' }} />
                            </Fab>
                            <Fab
                                color="primary"
                                onClick={switchCamera}
                            >
                                <SwitchCamera style={{ color: 'white' }} />
                            </Fab>
                        </>
                        :
                        <>
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<Check />}
                                onClick={() => setAccepted(true)}
                            >
                                Accept
                            </Button>
                            <Button
                                variant="contained"
                                color="warning"
                                startIcon={<Clear />}
                                onClick={() => setSelfie(null)}
                            >
                                Decline
                            </Button>
                        </>
                }
            </div>
        </div>

    const countdownTimer =
        <CircularProgressbar
            className="countdown-timer"
            value={100 * countdown! / 6}
            minValue={1}
            text={`${countdown}`}
            counterClockwise={true}
            styles={{
                path: {
                    // Path color
                    stroke: `#cc0000`,
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'round'
                },
                text: {
                    // Text color
                    fill: '#fff',
                    // Text size
                    fontSize: '44px',
                    fontWeight: 'bold'
                }
            }}
        />


    return (
        <>
            <div className="webcam-wrapper">
                <Webcam
                    audio={false}
                    className="webcam"
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    style={{ display: selfie ? 'none' : '' }}
                />
                <canvas
                    ref={canvasRef}
                    className="photo-canvas"
                    style={{ display: !selfie ? 'none' : '' }}
                />
            </div>

            <Image
                className="overlay-frame"
                alt="frame"
                src="/images/print_overlay.png"
                layout="fill"
            />

            {accepted && optionsPanel}
            {!accepted && controlPanel}
            {!accepted && countdown != null && countdownTimer}
        </>
    )
}

export default TakePhoto