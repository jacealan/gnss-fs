import type { NextApiRequest, NextApiResponse } from "next"
import formidable from "formidable"
import path from "path"
import fs from "fs/promises"
import { nanoid } from "nanoid"

export const config = {
  api: {
    //next에서는 기본으로 bodyParser가 작동되므로 false로 해준다.
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let savedFileName: string = ""
  //local에 저장할 path
  const imgStoragePath = path.join(
    // process.cwd() + "/src" + "/public" + "/images"
    process.cwd() + "/public/uploads"
  )
  // console.log(imgStoragePath)

  //fs모듈을 사용하여path에 폴더가 없을때엔 생성하도록 할 수 있다.
  try {
    await fs.readdir(imgStoragePath)
  } catch {
    await fs.mkdir(imgStoragePath)
  }

  //추후 s3 버켓으로 보내려고 default는 false로 하였다.
  /** true일시 로컬에 저장 */
  const readFile = (req: NextApiRequest, saveLocally: boolean = false) => {
    const options: formidable.Options = {}

    if (saveLocally) {
      //true일때 option객체에 path와 filename을 저장
      options.uploadDir = imgStoragePath
      options.filename = (name, ext, path, form) => {
        //   savedFileName = Date.now().toString() + "_" + path.originalFilename
        console.log(2, path.originalFilename)
        console.log(
          1,
          path.originalFilename!.split(".")[
            path.originalFilename!.split(".").length - 1
          ]
        )
        const fileExt: string | null =
          path.originalFilename!.split(".")[
            path.originalFilename!.split(".").length - 1
          ]
        savedFileName = `${Date.now().toString()}_${nanoid()}.${fileExt}`
        return savedFileName
      }
      console.log("saveLocally")
    }

    return new Promise<{
      fields: formidable.Fields
      files: formidable.Files
    }>((resolve, rejects) => {
      const form = formidable(options)

      form.parse(req, (err, fields, files) => {
        if (err) {
          rejects(err)
        }
        // console.log(1, fields)
        resolve({ fields, files })
      })
    })
  }

  const data = await readFile(req, true)
  // console.log(2, data.files.img[0])
  // console.log(savedFileName)

  //files
  // console.log(data.files.img) //img Blob

  //fields
  // console.log(data.fields.imgToBase64) //img base64
  // console.log(data.fields.text) //작성한 text를 확인가능

  return res.status(201).json({ message: "OK", savedFileName: savedFileName })
}
