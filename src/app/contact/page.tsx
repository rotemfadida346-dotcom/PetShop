import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Mail, MessageCircle, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "יש לכם שאלות? נשמח לעזור! צרו קשר עם צוות Pawsome.",
};

export default function ContactPage() {
  return (
    <div className="bg-card min-h-screen">
      <section className="bg-gradient-to-b from-gray-50 to-white border-b border-border">
        <Container size="md">
          <div className="py-12 md:py-16 text-center px-4">
            <div className="text-4xl md:text-5xl mb-4">📞</div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">נשמח לעזור לכם!</h1>
            <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              יש לכם שאלות על מוצר? צריכים עזרה בבחירה? או סתם רוצים לשוחח? 
              <strong className="text-text-primary"> הצוות שלנו זמין ומחכה לשמוע מכם.</strong>
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:0509555350" className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors w-full sm:w-auto justify-center">
                <Phone className="h-5 w-5" />
                050-9555350
              </a>
              <a href="https://wa.me/9720509555350" className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors w-full sm:w-auto justify-center">
                <MessageCircle className="h-5 w-5" />
                וואטסאפ
              </a>
              <a href="mailto:hello@pawsome.co.il" className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-400 transition-colors w-full sm:w-auto justify-center">
                <Mail className="h-5 w-5" />
                אימייל
              </a>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-surface rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-text-primary mb-6">שלחו לנו הודעה</h2>
              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                    שם מלא
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="איך קוראים לכם?"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                    אימייל
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                    נושא
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="במה אנחנו יכולים לעזור?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                    הודעה
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="כתבו את ההודעה שלכם כאן..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <MessageCircle className="h-4 w-4" />
                  שלחו הודעה
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-6">פרטי התקשרות</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">אימייל</h3>
                      <p className="text-text-secondary text-sm">hello@pawsome.co.il</p>
                      <p className="text-text-muted text-xs mt-1">נענה תוך 24 שעות</p>
                    </div>
                  </div>

                  <a href="tel:0509555350" className="flex items-start gap-4 hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">טלפון</h3>
                      <p className="text-emerald-600 font-bold text-lg" dir="ltr">050-9555350</p>
                      <p className="text-text-muted text-xs mt-1">א׳-ה׳ 9:00-18:00, ו׳ 9:00-13:00, מוצ״ש מצאת השבת-22:00</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">כתובת</h3>
                      <p className="text-text-secondary text-sm">רחוב הכלבים 123</p>
                      <p className="text-text-secondary text-sm">תל אביב, 6100001</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">שעות פעילות</h3>
                      <p className="text-text-secondary text-sm">ראשון-חמישי: 9:00-18:00</p>
                      <p className="text-text-secondary text-sm">שישי: 9:00-14:00</p>
                      <p className="text-text-secondary text-sm">שבת: סגור</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-accent-200 to-accent-400 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-3">יש שאלה דחופה?</h3>
                <p className="text-white/90 text-sm mb-5">
                  בדקו את דף השאלות הנפוצות — רוב התשובות שם!
                </p>
                <a href="/faq">
                  <Button variant="outline" className="bg-white text-accent-200 hover:bg-white/90 border-0">
                    לשאלות נפוצות
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
