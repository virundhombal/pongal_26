import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- CONFIGURATION ---
const PRICE_PER_COUPON = 165;
const PAYEE_VPA = "msanthoshnagaraj-2@okhdfcbank";
const PAYEE_NAME = "Santhosh Nagaraj .m";

// CHANGE THIS: Replace with your actual local IP address for LAN hosting
const BACKEND_URL = "https://iodimetric-malakai-indiscriminately.ngrok-free.dev";

// --- INLINE SVG ICONS (Dependency-Free) ---
const Icon = ({ paths, size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>{paths}</svg>
);

const UserIcon = (p) => <Icon {...p} paths={<><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>} />;
const MailIcon = (p) => <Icon {...p} paths={<><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>} />;
const HashIcon = (p) => <Icon {...p} paths={<><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></>} />;
const TicketIcon = (p) => <Icon {...p} paths={<><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/></>} />;
const CreditCardIcon = (p) => <Icon {...p} paths={<><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></>} />;
const PartyPopperIcon = (p) => <Icon {...p} paths={<><path d="M5.8 11.3 2 22l10.7-3.8Z" /><path d="M4 3h.01" /><path d="M22 8h-.01" /><path d="m22 2-1.5 1.5" /><path d="m15 8.5-4.5 4.5" /></>} />;

const App = () => {
  const initialState = { name: '', rollNumber: '', emailId: '', utrId: '', quantity: 1 };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [upiUrl, setUpiUrl] = useState('');

  // Generate the dynamic UPI payment link
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
      await axios.post(`${BACKEND_URL}/submit`, formData);
      setSubmitted(true);
    } catch (err) {
      alert(`Submission failed. Ensure your backend server is running on ${BACKEND_URL}`);
    }
    setLoading(false);
  };

  const handleBookMore = () => {
    setFormData(initialState);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-yellow-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-[2rem] shadow-brutal p-8 md:p-12 max-w-md w-full text-center border-4 border-black">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center border-4 border-orange-500 shadow-brutal-sm">
              <PartyPopperIcon className="text-orange-600 w-10 h-10" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-2 italic festive-title uppercase tracking-tight leading-tight">SUCCESS!</h2>
          <p className="text-lg font-bold text-gray-700 mb-8 leading-snug">Registration confirmed! Check <span className="text-blue-600 break-all underline">{formData.emailId}</span> for your QR ticket.</p>
          <button onClick={handleBookMore} className="w-full bg-orange-500 text-white font-black py-5 rounded-2xl shadow-brutal-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest text-lg border-4 border-black">
            Book More Coupons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-8 bg-orange-500 relative overflow-x-hidden">

      {/* Background Decor */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20 animate-spin-slow pointer-events-none hidden md:block"></div>

      <div className="max-w-6xl w-full bg-white rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3.5rem] shadow-brutal md:shadow-brutal-lg flex flex-col md:flex-row border-4 border-black overflow-hidden relative z-10">

        {/* Banner Section */}
        <div className="w-full md:w-[42%] bg-yellow-400 p-5 sm:p-8 md:p-12 text-black flex flex-col justify-between border-b-4 md:border-b-0 md:border-r-4 border-black">
          <div className="text-center md:text-left">
            <h1 className="text-[clamp(2.25rem,10vw,4.5rem)] font-black leading-[1.1] uppercase mb-4 md:mb-6 tracking-tight transform md:-skew-x-3 festive-title">
              Pongal <span className="text-orange-600">Food</span> Feast.
            </h1>

            <div className="mt-2 md:mt-8 p-4 md:p-6 bg-white border-4 border-black shadow-brutal rounded-3xl text-center">
              <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Scan to Pay</p>
              <div className="text-3xl md:text-4xl font-black text-orange-600 mb-4 italic tracking-tight">₹{formData.quantity * PRICE_PER_COUPON}</div>

              <div className="bg-white p-2 border-2 border-black inline-block rounded-xl mb-4">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`}
                  alt="QR"
                  className="w-28 h-28 sm:w-40 sm:h-40 md:w-44 md:h-44"
                />
              </div>
              <p className="text-[10px] font-bold uppercase text-gray-600 leading-snug">
                Pre-filled for {formData.quantity} {formData.quantity === 1 ? 'Person' : 'People'}
              </p>
            </div>
          </div>

          <div className="hidden md:block mt-6">
            <p className="text-xs font-black uppercase italic tracking-widest text-orange-800 bg-white inline-block px-3 py-1.5 rotate-2 border-2 border-black">
              QR Coupon Sent via Email
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-[58%] p-5 sm:p-10 lg:p-16 relative bg-white">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase italic leading-tight festive-title tracking-tight">Register Details</h2>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Pay first, then enter UTR below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[10px] font-black text-orange-600 uppercase flex items-center gap-1.5 leading-none"><UserIcon size={12}/> Name</label>
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-gray-100 outline-none font-bold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-orange-600 uppercase flex items-center gap-1.5 leading-none"><HashIcon size={12}/> Roll No.</label>
                <input type="text" placeholder="23CS001" className="w-full px-4 py-3 bg-gray-100 outline-none font-bold" value={formData.rollNumber} onChange={e => setFormData({...formData, rollNumber: e.target.value})} required />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-orange-600 uppercase flex items-center gap-1.5 leading-none"><TicketIcon size={12}/> Qty</label>
                <select className="w-full px-4 py-3 bg-gray-100 font-black cursor-pointer appearance-none" value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}>
                  {[1, 2, 3, 5, 10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>)}
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[10px] font-black text-orange-600 uppercase flex items-center gap-1.5 leading-none"><MailIcon size={12}/> Gmail Address</label>
                <input type="email" placeholder="example@gmail.com" className="w-full px-4 py-3 bg-gray-100 outline-none font-bold" value={formData.emailId} onChange={e => setFormData({...formData, emailId: e.target.value})} required />
              </div>

              <div className="sm:col-span-2 space-y-1 p-4 bg-orange-50 border-4 border-dashed border-orange-200 rounded-2xl mt-1">
                <label className="text-[10px] font-black text-orange-600 uppercase flex items-center gap-2 leading-none">
                  <CreditCardIcon size={12} /> Payment UTR / Transaction ID
                </label>
                <input
                  type="text"
                  placeholder="Paste 12-digit UTR ID here"
                  className="w-full px-4 py-3.5 mt-2 bg-white border-4 border-black rounded-xl font-black text-orange-600 outline-none"
                  value={formData.utrId}
                  onChange={e => setFormData({...formData, utrId: e.target.value})}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white font-black py-4 md:py-5 rounded-2xl border-4 border-black shadow-brutal active:shadow-none transition-all uppercase tracking-widest text-lg"
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
