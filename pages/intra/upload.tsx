import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import axios, { AxiosResponse } from "axios"
import { Button } from "@chakra-ui/react"
// import FormData from "form-data"

export default function UploadForm() {
  const [img, setImg] = useState<Blob | null>(null)
  const [imgToBase64, setImgToBase64] = useState<string>("")

  const imgRef = useRef<HTMLInputElement>(null)
  const [imgUrl, setImgUrl] = useState<string>("")

  const imgReset = () => {
    if (imgRef.current) {
      imgRef.current.value = ""
      //객체 URL 메모리 누수방지
      URL.revokeObjectURL(imgUrl)
      setImgUrl((_pre) => "")
    }
  }
  const send = async () => {
    if (
      imgRef.current &&
      imgRef.current.files &&
      imgRef.current.files.length > 0
    ) {
      const formData = new FormData()
      formData.append("img", imgRef.current.files[0])
      formData.append("title", "title")
      const result: AxiosResponse<{ savedFileName: string }> = await axios.post(
        "/api/upload",
        formData,
        {
          headers: {
            "Contest-Type": "multipart/form-data",
          },
        }
      )
      // console.log(result.data?.savedFileName)
      //보내고 나면 리셋
      imgReset()
    }
  }

  const imgRendering = () => {
    //window FileReader 사용
    const reader = new window.FileReader()
    if (img) {
      reader.readAsDataURL(img)
      reader.onloadend = () => {
        const base64 = reader.result
        if (base64) {
          //base64를 string으로 변환하여 state 변경
          setImgToBase64((_pre) => base64.toString())
        }
      }
      reader.onerror = () => {
        alert("upload error!!") //실패시
      }
    }
  }

  useEffect(() => {
    //useEffect cleanup 언마운트시 실행
    return imgRendering()
  }, [img]) //img가 바뀔때만 실행

  return (
    <>
      <form
      //  className={img_upload.form}
      >
        <label>file</label>
        <input
          type="file"
          name="cardImg"
          id="card-img--input"
          ref={imgRef}
          onChange={(e: React.ChangeEvent<{ files: FileList | null }>) => {
            if (e.target.files && e.target.files.length > 0) {
              const file = e.target.files[0]
              setImg((_pre) => file)
            }
          }}
        ></input>
        <button
          //  className={img_upload.form_reset}
          onClick={imgReset}
        >
          삭제하기
        </button>
      </form>
      {/* imgToBase64가 있을때만 랜더링 */}
      {imgToBase64 && (
        <>
          <div
          //  className={img_upload.img_container}
          >
            <Image
              // className={img_upload.preView}
              src={imgToBase64} //base64를 직접 img src로 쓸 수 있다.
              alt="preview"
              width={200}
              height={300}
            />
          </div>
          <Button
            onClick={send}
            //  className={img_upload.button}
          >
            submit
          </Button>
        </>
      )}
    </>
  )
}
