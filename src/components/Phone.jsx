export default function Phone({ children, className = '' }) {
  return (
    <div className={`phone-mockup-container ${className}`}>
      <img src="/iphonescren.png" alt="" className="phone-frame" />
      <div className="phone-screen">{children}</div>
    </div>
  );
}
