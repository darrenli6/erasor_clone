import React from 'react'

export default function POST(req,res) {
  const {file} = req.body

  const fileBuffer = Buffer.from(file, 'base64')

  const fileStream = fs.createWriteStream(path.join(process.cwd(), 'uploads', file.name))

  fileStream.write(fileBuffer)
  fileStream.end()
}
