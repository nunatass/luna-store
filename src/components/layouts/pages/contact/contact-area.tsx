'use client';
import { ContactForm } from './contact-form';

import { EmailIcon } from '@/components/icons';
import { socialData } from '@/data/social-data';

export const ContactArea = () => {
  return (
    <section className="container pb-20 pt-8">
      <div className="flex flex-row bg-white px-10 py-12 drop-shadow-md">
        <div className="w-full space-y-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-medium md:text-3xl">Sent A Message</h2>
            <p>
              For any questions regarding our products or for assistance with
              your order, please email us and you will receive a response within{' '}
              <span className="font-semibold">1-3 business days.</span>
            </p>
            <p>
              If you are emailing about your order, please make sure to include
              the order number or the email address used at checkout in your
              message. Thank you!{' '}
            </p>
          </div>
          <div className="flex w-full flex-col items-center gap-10 md:flex-row lg:gap-20">
            <ContactForm />
            <div className="grid h-max w-full grid-cols-1 gap-4 sm:grid-cols-2 md:w-[60%] md:grid-cols-1">
              <div className="flex items-center gap-4">
                <EmailIcon />
                <div className="">
                  <p data-info="mail" className="text-md text-gray-600">
                    support@stellastone.store
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex gap-2 p-2">
                  {socialData.map(({ link, id, icon: Icon }) => (
                    <a
                      href={link}
                      key={id}
                      target="_blank"
                      className="ring-[1px] ring-black"
                    >
                      <div className="bg-white p-2 transition-all duration-300 ease-in-out md:hover:bg-black md:hover:text-white">
                        <Icon className="h-4 w-4" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
