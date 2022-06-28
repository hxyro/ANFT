import { useState, useCallback, useRef } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../utils/cropImage'

export function Drop({ off, success }) {
    const inputref = useRef()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [imageSrc, setImageSrc] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)
    const [error, setError] = useState(null)

    const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, 0)
            setCroppedImage(croppedImage)
            setImageSrc(null)
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, imageSrc])
    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.addEventListener('load', () => {
                setImageSrc(reader.result)
            })
        }
    }

    const convertBlobToBase64 = async (blobUrl) => {
        const res = await fetch(blobUrl)
        const blob = await res.blob()
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        const base64 = await new Promise((res, _rej) => {
            reader.onload = (e) => res(e.target.result)
        })
        return base64
    }

    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) u8arr[n] = bstr.charCodeAt(n)
        return new File([u8arr], filename, { type: mime })
    }

    const cancel = () => {
        setName('')
        setPrice(0)
        setCroppedImage(null)
        off()
    }
    const onSubmit = async () => {
        const img64 = await convertBlobToBase64(croppedImage)
        const img = dataURLtoFile(img64, 'yehh')
        try {
            const url = await fetch('http://localhost:8080/get/s3url').then(
                async (res) => await res.json()
            )
            if (url) {
                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: img,
                })

                const imageurl = url.split('?')[0]
                console.log(imageurl)

                const response = await fetch('http://localhost:8080/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        imageUrl: imageurl,
                        price,
                        name,
                        user: 'kek',
                    }),
                }).then(async (res) => await res.json())

                console.log(response)
                if (response.success) {
                    success()
                } else {
                    setError(response.error)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="popUpContainerDrop">
            {imageSrc ? (
                <div>
                    <div className="crop-container">
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={16 / 9}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <div className="crop-button-container">
                        <button className="crop-button" onClick={showCroppedImage}>
                            Crop
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="formContainer">
                        {error ? (
                            <div className="errorContainer">
                                <p>{error}</p>
                            </div>
                        ) : null}
                        {croppedImage ? (
                            <div className="box">
                                <img src={croppedImage} alt="" />
                            </div>
                        ) : null}
                        <form>
                            {croppedImage ? null : (
                                <div className="selectbutton">
                                    <button type="button" onClick={() => inputref.current.click()}>
                                        Select File
                                    </button>
                                </div>
                            )}
                            <div>
                                <input
                                    required
                                    ref={inputref}
                                    type="file"
                                    accept="image/*"
                                    onChange={onFileChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <div>
                                <input
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="name"
                                />
                            </div>
                            <div>
                                <input
                                    required
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    type="number"
                                    placeholder="price"
                                />
                            </div>

                            <button type="button" onClick={cancel}>
                                Cancel
                            </button>
                            {croppedImage ? (
                                name ? (
                                    price ? (
                                        <button type="button" onClick={onSubmit}>
                                            Upload
                                        </button>
                                    ) : null
                                ) : null
                            ) : null}
                        </form>
                    </div>
                </>
            )}
        </div>
    )
}
