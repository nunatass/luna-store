import Image from 'next/image';
import Link from 'next/link';

import pay from '@/assets/img/footer/footer-pay.png';
import logo from '@/assets/img/logo/logo.svg';
import { Email, Location } from '@/components/icons';
import { socialData } from '@/data/social-data';

export const Footer = () => {
  return (
    <footer className="bg-[#f5f5f5]">
      <div className="container flex flex-col py-10 md:py-20 px-12 gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex justify-between gap-y-8">
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>

            <div className="flex flex-col gap-6">
              <div>
                <span className="text-sm">Got Questions? Call us</span>
                <h4 className="font-medium text-2xl transition-all duration-300 ease-in-out hover:text-[#be844c]">
                  <a href="tel:670-413-90-762">+670 413 90 762</a>
                </h4>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Email />
                  <p className="transition-all duration-300 ease-in-out hover:text-[#be844c]">
                    <a href="mailto:shofy@support.com">
                      swe.hamedhasan@gmail.com
                    </a>
                  </p>
                </div>
                <div className="tp-footer-contact-item d-flex align-items-start">
                  <div className="flex items-start gap-2">
                    <Location />

                    <p className="transition-all duration-300 ease-in-out hover:text-[#be844c]">
                      <a
                        href="https://www.google.com/maps/place/Sleepy+Hollow+Rd,+Gouverneur,+NY+13642,+USA/@44.3304966,-75.4552367,17z/data=!3m1!4b1!4m6!3m5!1s0x4cccddac8972c5eb:0x56286024afff537a!8m2!3d44.3304928!4d-75.453048!16s%2Fg%2F1tdsjdj4"
                        target="_blank"
                      >
                        79 Sleepy Hollow St. <br /> Jamaica, New York 1432
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-medium text-xl">My Account</h4>
            <ul className="list-disc	text-sm text-gray-600 flex flex-col gap-4 ml-4">
              <li className="transition-all duration-300 ease-in-out hover:text-black">
                <a href="#">Track Orders</a>
              </li>
              <li className="transition-all duration-300 ease-in-out hover:text-black">
                <a href="#">Shipping</a>
              </li>
              <li className="transition-all duration-300 ease-in-out hover:text-black">
                <a href="#">Wishlist</a>
              </li>
              <li className="transition-all duration-300 ease-in-out hover:text-black">
                <a href="#">My Account</a>
              </li>
              <li className="transition-all duration-300 ease-in-out hover:text-black">
                <a href="#">Order History</a>
              </li>
              <li className="transition-all duration-300 ease-in-out hover:text-black">
                <a href="#">Returns</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-medium text-xl">Information</h4>
            <ul className="list-disc	text-sm text-gray-600 flex flex-col gap-4 ml-4">
              <li className="transition-all duration-300 ease-in-out hover:text-black">
                <a href="#">Our Story</a>
              </li>
              <li className="transition-all duration-300 ease-in-out hover:text-black">
                <a href="#">Careers</a>
              </li>
              <li className="transition-all duration-300 ease-in-out hover:text-black">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="transition-all duration-300 ease-in-out hover:text-black">
                <a href="#">Terms & Conditions</a>
              </li>
              <li className="transition-all duration-300 ease-in-out hover:text-black">
                <a href="#">Latest News</a>
              </li>
              <li className="transition-all duration-300 ease-in-out hover:text-black">
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-medium text-xl">Subscribe.</h4>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-600">
                Our conversation is just getting started
              </p>

              <form action="#">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="py-4 px-2.5 outline-none	lg:min-w-72"
                  />
                  <button
                    type="submit"
                    aria-label="button subscribe"
                    className="bg-black py-4 text-white px-2 hover:bg-[#be844c] transition-all duration-300 ease-in-out"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>

            <div className="flex flex-col">
              <h4 className="font-medium font-base">Follow Us On</h4>
              <div className="flex gap-2 p-2">
                {socialData.map(({ link, id, icon: Icon }) => (
                  <a href={link} key={id} target="_blank">
                    <div className="bg-white p-2 transition-all duration-300 ease-in-out hover:bg-black hover:text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container border-t-[1px] border-gray-200 py-4">
          <div className="flex flex-col lg:flex-row gap-y-8 lg:items-center lg:justify-between ">
            <div className="col-md-6">
              <div className="tp-footer-copyright">
                <p>© {new Date().getFullYear()} All Rights Reserved Luna</p>
              </div>
            </div>
            <Image src={pay} alt="pay" />
          </div>
        </div>
      </div>
    </footer>
  );
};
