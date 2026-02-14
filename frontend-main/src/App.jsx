import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { BrowserMultiFormatReader } from '@zxing/library'; // The scanner tool
import './App.css';

function App() {
  const [role, setRole] = useState(null); 
  const [step, setStep] = useState('login'); 
  const [cart, setCart] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [scanInput, setScanInput] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef(null);

  const foodMenu = [
    { id: 1, name: "Samosa", price: 15 },
    { id: 2, name: "Masala Dosa", price: 50 },
    { id: 3, name: "Coffee", price: 20 },
    { id: 4, name: "Veg Biryani", price: 80 },
  ];

  // LOGIC: Camera Scanner for Shopkeeper
  useEffect(() => {
    let codeReader;
    if (isScanning && role === 'shopkeeper') {
      codeReader = new BrowserMultiFormatReader();
      codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) {
          setScanInput(result.getText());
          setIsScanning(false);
          codeReader.reset();
        }
      });
    }
    return () => {
      if (codeReader) codeReader.reset();
    };
  }, [isScanning, role]);

  const addToCart = (item) => setCart([...cart, item]);
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const charge = item.price > 50 ? 5 : 3;
      return total + item.price + charge;
    }, 0);
  };

  const simulatePaymentCheck = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setOrderId("QQ-" + Math.floor(Math.random() * 9000));
      setIsVerifying(false);
      setStep('pickup');
    }, 3000); 
  };

  const handleVerifyOrder = () => {
    if (scanInput.startsWith("QQ-")) {
      setVerifyResult("VALID: Payment Received. Prepare Food.");
    } else {
      setVerifyResult("INVALID: No record found.");
    }
  };

  if (!role) {
    return (
      <div className="app-container" style={{textAlign: 'center'}}>
        <h2>QuickQ</h2>
        <p>Select your role:</p>
        <button className="btn-pay" onClick={() => setRole('student')}>I am a Student</button>
        <button className="btn-pay" style={{marginTop: '15px', background: '#4a5568'}} onClick={() => setRole('shopkeeper')}>I am a Shopkeeper</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2 style={{ color: '#2d3748', margin: 0 }}>QuickQ {role === 'shopkeeper' && "(Staff)"}</h2>
        <button onClick={() => {setRole(null); setStep('login'); setVerifyResult(null); setIsScanning(false);}} className="logout-btn">Switch Role</button>
      </div>

      {role === 'student' ? (
        /* STUDENT SIDE */
        <>
          {step === 'login' && (
            <div className="card">
              <h3>Student Login</h3>
              <input type="email" placeholder="Email" className="input-style" />
              <input type="password" placeholder="Password" className="input-style" />
              <button className="btn-pay" onClick={() => setStep('menu')}>Login</button>
            </div>
          )}

          {step === 'menu' && (
            <div>
              <h3>Select Meals</h3>
              {foodMenu.map(item => (
                <div key={item.id} className="food-item">
                  <span>{item.name} (₹{item.price})</span>
                  <button onClick={() => addToCart(item)} className="add-btn">Add +</button>
                </div>
              ))}
              {cart.length > 0 && (
                <div className="card">
                  <h4>Total: ₹{calculateTotal()}</h4>
                  <button className="btn-pay" onClick={() => setStep('payment')}>Proceed to Pay</button>
                </div>
              )}
            </div>
          )}

          {step === 'payment' && (
            <div className="card" style={{textAlign: 'center'}}>
              <h3>Scan to Pay</h3>
              <div className="payment-qr">
                <QRCodeSVG value={`upi://pay?pa=canteen@upi&am=${calculateTotal()}`} size={180} />
              </div>
              {isVerifying ? (
                <div className="verifying"><p>🔄 Verifying Payment...</p></div>
              ) : (
                <button className="btn-pay" style={{background: '#38a169'}} onClick={simulatePaymentCheck}>Verify Transaction</button>
              )}
            </div>
          )}

          {step === 'pickup' && (
            <div className="card" style={{textAlign: 'center'}}>
              <h3 style={{color: '#38a169'}}>Order Confirmed!</h3>
              <QRCodeSVG value={orderId} size={180} />
              <p>ID: <b>{orderId}</b></p>
              <button className="btn-pay" onClick={() => {setStep('menu'); setCart([]);}}>New Order</button>
            </div>
          )}
        </>
      ) : (
        /* SHOPKEEPER SIDE WITH SCANNER */
        <div className="card" style={{textAlign: 'center'}}>
          <h3>Verify Student Pickup</h3>
          
          {isScanning ? (
            <div>
              <video ref={videoRef} style={{ width: '100%', borderRadius: '10px', background: '#000' }} />
              <button className="btn-pay" style={{background: '#e53e3e', marginTop: '10px'}} onClick={() => setIsScanning(false)}>Cancel Scan</button>
            </div>
          ) : (
            <>
              <button className="btn-pay" style={{background: '#4a5568', marginBottom: '20px'}} onClick={() => setIsScanning(true)}>
                📷 Open Scanner
              </button>
              <input 
                type="text" 
                placeholder="Or type ID (e.g. QQ-1234)" 
                className="input-style" 
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
              />
              <button className="btn-pay" onClick={handleVerifyOrder}>Verify ID</button>
            </>
          )}
          
          {verifyResult && (
            <div className="verifying" style={{marginTop: '20px', background: verifyResult.includes("VALID") ? '#f0fff4' : '#fff5f5'}}>
              <p style={{color: verifyResult.includes("VALID") ? '#2f855a' : '#c53030'}}>{verifyResult}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;