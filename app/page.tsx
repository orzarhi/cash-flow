import { buttonVariants } from '@/components/ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <main className="flex flex-col justify-center items-center min-h-screen text-center space-y-16 px-2">
      <section className="w-full max-w-4xl px-4 md:mt-0">
        <div className="flex justify-center gap-2  mt-7 items-center">
          {/* <Image
            src="/logo.webp"
            className="inline-block"
            alt="Cash Flow Logo"
            width={50}
            height={50}
          /> */}
          <h1 className="text-4xl md:text-6xl font-bold">Cash-Flow</h1>
        </div>
        <p className="text-lg md:text-xl mt-4">
          נהל את הוצאות בניית הבית שלך בצורה פשוטה ויעילה. דע לאן כל שקל נעלם ותקבל תמונה
          ברורה על התקציב שלך.
        </p>
      </section>

      <section className="w-full max-w-7xl px-4">
        <div className="absolute mx-auto left-0 right-0 -mt-5">
          <h2 className="text-3xl font-bold">תכונות עיקריות</h2>
          <Image
            src="/line.png"
            alt="line"
            className="relative mx-auto bottom-12"
            width={300}
            height={10}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center border rounded-lg shadow-sm p-6">
            <h3 className="text-xl md:text-2xl font-semibold">
              <span className="inline-block sm:block">🔍</span> ניתוח הוצאות
            </h3>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              קבל תובנות מעמיקות על ההוצאות שלך ותוכנן את התקציב בצורה חכמה יותר.
            </p>
          </div>

          <div className="text-center border rounded-lg shadow-sm p-6">
            <h3 className="text-xl md:text-2xl font-semibold">
              <span className="inline-block sm:block">⚙️</span> ניהול תשלומים
            </h3>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              קבל שליטה מלאה על כל התשלומים שלך, כולל תאריכי פירעון וזמנים, כדי למנוע
              עיכובים והוצאות לא מתוכננות.
            </p>
          </div>

          <div className="text-center border rounded-lg shadow-sm p-6">
            <h3 className="text-xl md:text-2xl font-semibold">
              <span className="inline-block sm:block">📈</span> סקירות ודו&quot;ח
            </h3>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              קבל דוחות ברורים על ההוצאות שלך עם גרפים שממחישים את המצב הכלכלי שלך.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-5">
        <h2 className="text-4xl font-extrabold">צעד ראשון לניהול תקציבכם!</h2>
        <p className="text-muted-foreground text-center mt-2 text-base md:text-lg">
          הצטרפו אלינו עכשיו, צרו חשבון בחינם ותתחילו לשלוט בהוצאות שלכם בקלות וביעילות.
        </p>

        {!user?.id ? (
          <Link
            href="/api/auth/login"
            className={buttonVariants({
              className: 'w-48 my-4 mb-8',
            })}
          >
            התחל עכשיו
          </Link>
        ) : (
          <Link
            href="/expense/upsert"
            className={buttonVariants({
              className: 'w-48 my-4 mb-8',
            })}
          >
            התחל עכשיו
          </Link>
        )}
      </section>
    </main>
  );
}
