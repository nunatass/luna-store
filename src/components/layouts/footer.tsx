import Image from 'next/image';
import Link from 'next/link';

import paymentOptionImg from '@/assets/img/footer/payments-icons.svg';
import logo from '@/assets/img/logo/logo-dark.svg';
import { EmailIcon } from '@/components/icons';
import { footerData } from '@/data/footer-data';
import { socialData } from '@/data/social-data';

export const Footer = () => {
  return (
    <footer className="z-[50] bg-[#f5f5f5]">
      <div className="container flex flex-col gap-8 px-6 py-10 md:py-20">
        <div className="grid grid-cols-1 justify-between gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:flex">
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="logo">
              <Image src={logo} alt="logo" className="w-44" />
            </Link>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <EmailIcon />
                  <p className="transition-all duration-300 ease-in-out md:hover:text-[#be844c]">
                    <Link href="/contact">support@stellastone.store</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {footerData.map((data) => (
            <div key={data.title} className="flex flex-col gap-2">
              <h4 className="text-xl font-medium">{data.title}</h4>
              <ul className="ml-4	flex list-disc flex-col gap-4 text-sm text-gray-600">
                {data.menu.map((item) => (
                  <li
                    key={item.label}
                    className="transition-all duration-300 ease-in-out md:hover:text-black"
                  >
                    <Link href={item.link} aria-label={item.label}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex w-full flex-col gap-4 lg:w-[33%]">
            <h4 className="text-xl font-medium">Subscribe.</h4>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">COMING SOON!</span> Sign up for
                10% OFF your first order. Plus, get exclusive early access to
                amazing sales, special discounts and the chance to win free
                jewelry!
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-base font-medium">Follow Us On:</h4>
              <div className="flex gap-2">
                {socialData.map(({ link, id, icon: Icon }) => (
                  <a href={link} key={id} target="_blank" aria-label={link}>
                    <div className="bg-white p-2 transition-all duration-300 ease-in-out md:hover:bg-black md:hover:text-white">
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
              <p>
                © {new Date().getFullYear()} Stella Stone. All Rights Reserved.
              </p>
            </div>
            <Image src={paymentOptionImg} alt="pay" className="w-96" />
          </div>
        </div>
      </div>
    </footer>
  );
};
