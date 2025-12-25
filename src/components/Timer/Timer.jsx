import { useState, useEffect } from "react";

function Timer() {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // تحقق من وجود تاريخ نهاية محفوظ
    let endDate = localStorage.getItem("countdownEndDate");

    if (!endDate) {
      // إذا لم يكن موجود، احسب 90 يوم من الآن
      const now = new Date();
      const end = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
      endDate = end.toISOString();
      localStorage.setItem("countdownEndDate", endDate);
    }

    const countdownInterval = setInterval(() => {
      const now = new Date();
      const end = new Date(endDate);
      const diff = Math.max(0, Math.floor((end - now) / 1000)); // الفرق بالثواني

      setTimeLeft(diff);

      // لو انتهى الوقت احذف من التخزين (اختياري)
      if (diff <= 0) {
        clearInterval(countdownInterval);
        localStorage.removeItem("countdownEndDate");
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const days = Math.floor(timeLeft / (60 * 60 * 24));
  const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="counter">
      <div className="days bg-danger text-light">{String(days).padStart(2, '0')}</div><b>:</b>
      <div className="hours bg-danger text-light">{String(hours).padStart(2, '0')}</div><b>:</b>
      <div className="min bg-danger text-light">{String(minutes).padStart(2, '0')}</div><b>:</b>
      <div className="sec bg-danger text-light">{String(seconds).padStart(2, '0')}</div>
    </div>
  );
}

export default Timer;
