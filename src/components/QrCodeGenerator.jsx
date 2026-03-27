import { useState, useRef } from 'react'
import QRCode from 'react-qr-code'
import './QrCodeGenerator.css'

export default function QrCodeGenerator() {
  const [text, setText] = useState('')
  const [qrValue, setQrValue] = useState('')
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const qrRef = useRef(null)

  const handleGenerate = () => {
    if (text.trim()) setQrValue(text)
  }

  const handleDownload = () => {
    const svg = qrRef.current?.querySelector('svg')
    if (!svg) return

    const padding = 16
    const qrSize = 256
    const canvasSize = qrSize + padding * 2

    // Serializar el SVG
    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    // Dibujar en canvas para exportar como PNG
    const canvas = document.createElement('canvas')
    canvas.width = canvasSize
    canvas.height = canvasSize
    
    const img = new Image()
    img.onload = () => {
      const ctx = canvas.getContext('2d')
      // Fondo con el color elegido
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvasSize, canvasSize)
      ctx.drawImage(img, padding, padding, qrSize, qrSize)

      const link = document.createElement('a')
      link.download = 'qrcode.png'
      link.href = canvas.toDataURL('image/png')
      link.click()

      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  return (
    <div className="qr-code-generator">
      <h1>QR Code Generator</h1>
      <p>Enter the text you want to convert into a QR code:</p>
      <input
        className='input-text'
        type="text"
        placeholder="Enter text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className='color-picker'>
        <span className='color'>
          <p>Foreground Color:</p>
          <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
        </span>
        <span className='color'>
          <p>Background Color:</p>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        </span>
      </div>
      <button onClick={handleGenerate}>Generate QR Code</button>
      {qrValue && (
        <>
          <div className='card' ref={qrRef} style={{ backgroundColor: bgColor }}>
            <QRCode value={qrValue} fgColor={fgColor} bgColor={bgColor} />
          </div>
          <button onClick={handleDownload}>Download PNG</button>
        </>
      )}
    </div>
  )
}