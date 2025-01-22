import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="Library Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Welcome to Fluminense Library</h1>
            <p className="text-xl mb-8">
              Discover a world of knowledge in our carefully curated collection of books,
              journals, and digital resources.
            </p>
            <Link
              to="/books"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg inline-block transition-colors"
            >
              Explore Our Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Library?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-amber-600" />
              <h3 className="text-xl font-semibold mb-2">Extensive Collection</h3>
              <p className="text-gray-600">
                Access thousands of books, journals, and digital resources
              </p>
            </div>
            <div className="text-center p-6">
              <Clock className="w-12 h-12 mx-auto mb-4 text-amber-600" />
              <h3 className="text-xl font-semibold mb-2">Extended Hours</h3>
              <p className="text-gray-600">
                Open early and late to accommodate your schedule
              </p>
            </div>
            <div className="text-center p-6">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-amber-600" />
              <h3 className="text-xl font-semibold mb-2">Prime Location</h3>
              <p className="text-gray-600">
                Easily accessible in the heart of the city
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Reading?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of book lovers and get access to our entire collection.
          </p>
          <Link
            to="/login"
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg inline-block transition-colors"
          >
            Become a Member
          </Link>
        </div>
      </section>
    </div>
  );
}