import { useState, useEffect } from 'react';

export const useScrollReload = () => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.touches[0].clientY); // נקודת התחלה של הנגיעה
    };

    const handleTouchMove = (e: TouchEvent) => {
      setTouchEnd(e.touches[0].clientY); // מעדכן את המיקום הנוכחי של הנגיעה
    };

    const handleTouchEnd = () => {
      if (touchStart < touchEnd - 50 && window.scrollY === 0) {
        // בודק אם יש "משיכה כלפי מטה" כשהעמוד נמצא למעלה
        window.location.reload();
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [touchStart, touchEnd]);
};
