import { Clock, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Hours</h3>
            <div className="flex items-start space-x-2">
              <Clock className="w-5 h-5 mt-1" />
              <div>
                <p>Monday - Friday: 7:00 AM - 8:00 PM</p>
                <p>Saturday: 10:00 AM - 8:00 PM</p>
                <p>Sunday: 10:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <div className="flex items-start space-x-2">
              <MapPin className="w-5 h-5 mt-1" />
              <div>
                <p>R. Pinheiro Machado, 86-126 </p>
                <p>Laranjeiras, Rio de Janeiro - RJ, 22231-230</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <p>(555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <p>info@fluminenselibrary.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Fluminense Library. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}