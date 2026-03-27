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
        type="text"
        placeholder="Enter text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div style={{ marginTop: '10px' }}>
        <span>
          Foreground Color:
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
          />
        </span>
        <span style={{ marginLeft: '10px' }}>
          Background Color:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </span>
      </div>
      <button onClick={handleGenerate} style={{ marginTop: '10px' }}>Generate QR Code</button>
      {qrValue && (
        <div style={{ marginTop: '20px' }}>
          <QRCode value={qrValue} fgColor={fgColor} bgColor={bgColor} />
        </div>
      )}
    </div>
  )
}