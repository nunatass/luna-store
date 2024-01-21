import Image from 'next/image';
import Link from 'next/link';

import pay from '@/assets/img/footer/payments-icons.svg';
import logo from '@/assets/img/logo/logo.svg';
import { EmailIcon, LocationIcon } from '@/components/icons';
import { socialData } from '@/data/social-data';

export const Footer = () => {
  return (
    <footer className="bg-[#f5f5f5]">
      <div className="container flex flex-col gap-8 px-12 py-10 md:py-20">
        <div className="grid grid-cols-1 justify-between gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:flex">
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>

            <div className="flex flex-col gap-6">
              <div>
                <span className="text-sm">Got Questions? Call us</span>
                <h4 className="text-2xl font-medium transition-all duration-300 ease-in-out hover:text-[#be844c]">
                  <a href="tel:670-413-90-762">+251 926 313 652</a>
                </h4>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <EmailIcon />
                  <p className="transition-all duration-300 ease-in-out hover:text-[#be844c]">
                    <a href="support:luna@support.com">luna.store@gmail.com</a>
                  </p>
                </div>
                <div className="tp-footer-contact-item d-flex align-items-start">
                  <div className="flex items-start gap-2">
                    <LocationIcon />

                    <p className="transition-all duration-300 ease-in-out hover:text-[#be844c]">
                      <a
                        href="https://www.google.com/maps/place/Sleepy+Hollow+Rd,+Gouverneur,+NY+13642,+USA/@44.3304966,-75.4552367,17z/data=!3m1!4b1!4m6!3m5!1s0x4cccddac8972c5eb:0x56286024afff537a!8m2!3d44.3304928!4d-75.453048!16s%2Fg%2F1tdsjdj4"
                        target="_blank"
                      >
                        Rua Manuel da Fonseca 8. <br /> Évora, Portugal
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-medium">My Account</h4>
            <ul className="ml-4	flex list-disc flex-col gap-4 text-sm text-gray-600">
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
            <h4 className="text-xl font-medium">Information</h4>
            <ul className="ml-4	flex list-disc flex-col gap-4 text-sm text-gray-600">
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
            <h4 className="text-xl font-medium">Subscribe.</h4>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-600">
                Our conversation is just getting started
              </p>

              <form action="#">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="px-2.5 py-4 outline-none	lg:min-w-72"
                  />
                  <button
                    type="submit"
                    aria-label="button subscribe"
                    className="bg-black px-2 py-4 text-white transition-all duration-300 ease-in-out hover:bg-[#be844c]"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>

            <div className="flex flex-col">
              <h4 className="font-base font-medium">Follow Us On</h4>
              <div className="flex gap-2 p-2">
                {socialData.map(({ link, id, icon: Icon }) => (
                  <a href={link} key={id} target="_blank">
                    <div className="bg-white p-2 transition-all duration-300 ease-in-out hover:bg-black hover:text-white">
                      <Icon className="h-4 w-4" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container border-t-[1px] border-gray-200 py-4">
          <div className="flex flex-col items-center gap-y-8 lg:flex-row lg:justify-between ">
            <div className="font-md text-center text-gray-700 lg:text-left">
              <p>© {new Date().getFullYear()} Luna. All Rights Reserved.</p>
            </div>
            <Image src={pay} alt="pay" className="w-96" />
          </div>
        </div>
      </div>
    </footer>
  );
};
