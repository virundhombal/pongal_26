import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- CONFIGURATION ---
const PRICE_PER_COUPON = 50; 
const PAYEE_VPA = "msanthoshnagaraj-2@okhdfcbank"; 
const PAYEE_NAME = "Santhosh Nagaraj .m";

/**
 * BACKEND URL (NGROK STATIC DOMAIN)
 * ---------------------------------
 * Replace the URL below with your actual Ngrok static domain URL.
 * Ensure it starts with https://
 */
const BACKEND_URL = "https://your-fest-name.ngrok-free.app"; 

// --- INLINE SVG ICONS (Simplified for Performance) ---
const Icon = ({ paths, size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>{paths}</svg>
);

const UserIcon = (p) => <Icon {...p} paths={<><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>} />;
const MailIcon = (p) => <Icon {...p} paths={<><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>} />;
const HashIcon = (p) => <Icon {...p} paths={<><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></>} />;
const TicketIcon = (p) => <Icon {...p} paths={<><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/></>} />;
const CreditCardIcon = (p) => <Icon {...p} paths={<><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></>} />;
const PartyPopperIcon = (p) => <Icon {...p} paths={<><path d="M5.8 11.3 2 22l10.7-3.8Z" /><path d="m22 2-1.5 1.5" /><path d="m15 8.5-4.5 4.5" /></>} />;

const App = () => {
  // Debug log to check if the component is actually loading
  console.log("Pongal App Initialized");

  const [formData, setFormData] = useState({ name: '', rollNumber: '', emailId: '', utrId: '', quantity: 1 });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [upiUrl, setUpiUrl] = useState('');

  useEffect(() => {
    const amount = formData.quantity * PRICE_PER_COUPON;
    const note = formData.name || 'Student'; 
    const url = `upi://pay?pa=${PAYEE_VPA}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    setUpiUrl(url);
  }, [formData.quantity, formData.rollNumber, formData.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Real backend submission using the Ngrok Tunnel
      await axios.post(`${BACKEND_URL}/submit`, formData);
      setSubmitted(true);
    } catch (err) {
      alert(`Backend unreachable. If you are using Ngrok, ensure the tunnel is running at ${BACKEND_URL}`);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-yellow-400 flex items-center justify-center p-6">
        <div className="bg-white rounded-[3rem] shadow-brutal p-10 max-w-md w-full text-center border-4 border-black relative z-10">
          <PartyPopperIcon className="w-16 h-16 text-orange-600 mx-auto mb-6" />
          <h2 className="text-4xl font-black text-gray-900 mb-2 uppercase festive-title">SUCCESS!</h2>
          <p className="text-lg font-bold text-gray-700 mb-8 leading-snug">Registration confirmed! Check <span className="text-blue-600 underline break-all font-black">{formData.emailId}</span> for your QR ticket.</p>
          <button 
            onClick={() => { setSubmitted(false); setFormData({...formData, name: '', utrId: ''}); }} 
            className="w-full bg-orange-500 text-white font-black py-5 rounded-2xl shadow-brutal-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all border-4 border-black uppercase tracking-widest text-lg"
          >
            Book More
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-500 flex items-center justify-center p-3 md:p-8 relative overflow-hidden">
      {/* Decorative Sun */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-yellow-300 rounded-full opacity-30 animate-spin-slow pointer-events-none hidden md:block border-4 border-black"></div>
      
      <div className="max-w-6xl w-full bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-brutal-lg flex flex-col md:flex-row border-4 border-black relative z-10 overflow-hidden text-gray-900">
        
        {/* Banner Section */}
        <div className="md:w-[40%] bg-yellow-400 p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4 border-black flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-black leading-none uppercase mb-6 transform -skew-x-3 festive-title text-black">
            Pongal <br/> <span className="text-orange-600">Food</span> <br/> <span className="bg-white px-2">Feast.</span>
          </h1>
          <div className="mt-8 p-6 bg-white border-4 border-black shadow-brutal rounded-3xl text-center">
            <p className="text-xs font-black uppercase text-gray-500 mb-1">Scan to Pay</p>
            <div className="text-4xl font-black text-orange-600 mb-4 italic tracking-tighter">₹{formData.quantity * PRICE_PER_COUPON}</div>
            <div className="bg-white p-2 border-2 border-black inline-block rounded-xl mb-4">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`} 
                alt="Payment QR" 
                className="w-32 h-32 md:w-44 md:h-44" 
              />
            </div>
            <p className="text-[10px] font-bold text-gray-600 uppercase">Amount for {formData.quantity} person(s)</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-[60%] p-6 sm:p-12 bg-white">
          <h2 className="text-4xl font-black text-gray-900 uppercase italic festive-title mb-8 tracking-tighter">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-2">
                    <UserIcon size={14}/> Student Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 bg-gray-100 font-bold outline-none border-4 border-black rounded-2xl" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-2">
                    <HashIcon size={14}/> Roll No.
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 bg-gray-100 font-bold outline-none border-4 border-black rounded-2xl" 
                    value={formData.rollNumber} 
                    onChange={e => setFormData({...formData, rollNumber: e.target.value})} 
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-2">
                    <TicketIcon size={14}/> Quantity
                  </label>
                  <select 
                    className="w-full px-5 py-4 bg-gray-100 font-black cursor-pointer appearance-none outline-none border-4 border-black rounded-2xl" 
                    value={formData.quantity} 
                    onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}
                  >
                    {[1, 2, 3, 5, 10].map(n => <option key={n} value={n}>{n} PERSON{n > 1 ? 'S' : ''}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-2">
                    <MailIcon size={14}/> Gmail
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-5 py-4 bg-gray-100 font-bold outline-none border-4 border-black rounded-2xl" 
                    value={formData.emailId} 
                    onChange={e => setFormData({...formData, emailId: e.target.value})} 
                    required 
                  />
                </div>
                <div className="md:col-span-2 space-y-1 p-5 bg-orange-50 border-4 border-dashed border-orange-300 rounded-3xl">
                  <label className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-2">
                    <CreditCardIcon size={14}/> UTR / Transaction ID
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter 12-digit ID"
                    className="w-full px-5 py-4 mt-2 bg-white border-4 border-black rounded-2xl font-black text-orange-600 outline-none shadow-brutal-sm" 
                    value={formData.utrId} 
                    onChange={e => setFormData({...formData, utrId: e.target.value})} 
                    required 
                  />
                </div>
             </div>
             <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-orange-500 text-white font-black py-6 rounded-3xl border-4 border-black shadow-brutal active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest text-xl mt-4"
             >
               {loading ? "PROCESSING..." : "GET MY TICKETS!"}
             </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
