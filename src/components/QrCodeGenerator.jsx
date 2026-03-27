import { useState } from 'react'
import QRCode from 'react-qr-code'
import './QrCodeGenerator.css'

export default function QrCodeGenerator() {
  const [text, setText] = useState('')
  const [qrValue, setQrValue] = useState('')
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')

  const handleGenerate = () => {
    if (text.trim()) {
      setQrValue(text)
    }
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
          <p>Foreground Color: </p>
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
          />
        </span>
        <span className='color'>
          <p>Background Color: </p>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </span>
      </div>
      <button onClick={handleGenerate}>Generate QR Code</button>
      {qrValue && (
        <div className='card' style={{ backgroundColor: bgColor }}>
          <QRCode value={qrValue} fgColor={fgColor} bgColor={bgColor} />
        </div>
      )}
    </div>
  )
}