export default function Footer() {
  return (
    <footer className="bg-[#2B293D] text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="font-semibold mb-3">Company Info</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 2: Help */}
          <div>
            <h3 className="font-semibold mb-3">Help</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#">Account Support</a></li>
              <li><a href="#">Listing Events</a></li>
              <li><a href="#">Event Ticketing</a></li>
              <li><a href="#">Ticket Purchase Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#">Concerts & Gigs</a></li>
              <li><a href="#">Festivals & Lifestyle</a></li>
              <li><a href="#">Business & Networking</a></li>
              <li><a href="#">Food & Drinks</a></li>
              <li><a href="#">Performing Arts</a></li>
              <li><a href="#">Sports & Outdoors</a></li>
              <li><a href="#">Exhibitions</a></li>
              <li><a href="#">Workshops, Conferences & Classes</a></li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h3 className="font-semibold mb-3">Follow Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Youtube</a></li>
            </ul>
          </div>

          {/* Column 5: Download the App */}
          <div>
            <h3 className="font-semibold mb-3">Download The App</h3>
            <div className="space-y-10">
              <a href="#">
                <img src="/googleplay.webp" alt="Google Play" className="w-12 mb-5" />
              </a>
              <a href="#">
                <img src="/appstore.png" alt="App Store" className="w-12" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 mt-6 pt-6 text-center text-gray-400 text-sm">
          ©2025 GoEvent. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
